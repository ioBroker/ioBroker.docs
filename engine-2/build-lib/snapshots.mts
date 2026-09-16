/// <reference lib="dom" />
/**
 * Snapshots of the pages as the app draws them, for crawlers.
 *
 * The server can write a page for a crawler out of the markdown and the words of the interface, but
 * that page does not look like the site - and a search engine compares what it is sent with what a
 * reader sees. So this step opens every address of the sitemap in a headless Chrome, lets the app
 * draw it exactly as it does for a reader, and keeps the result: the markup, and the styles the app
 * put into the page while it ran.
 *
 * - The styles: emotion writes them into the CSSOM, not into the markup, so they are read out of
 *   the style sheets. Pages of one kind share them, so each goes into a file named by its content
 *   (`css/<hash>.css`) and is kept once, not once per page.
 * - What is kept per page is noted in `manifest.json`, with the version the server reported for the
 *   page (`X-Page-Version`). A later run draws only what changed, or what is older than
 *   `snapshotMaxAgeDays` - prices and statistics on a page change without its version.
 * - The server hands a snapshot to a crawler only while its version is the current one, and replaces
 *   the head the app wrote for itself: canonical, hreflang and description are the server's.
 *
 * The step needs the site running with the build just made: it reads the addresses from that
 * server's `/sitemap.xml` and draws them from there (`prerender.snapshotBase` in config.json). The
 * app builds some of its addresses out of the port it is reached on, so that has to be the server
 * the site really runs as, not one started on a port of its own.
 */
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import puppeteer, { type Browser, type BrowserContext, type Page } from 'puppeteer';

interface PrerenderSettings {
    snapshotDir?: string;
    snapshotBase?: string;
    snapshotTabs?: number;
    snapshotMaxAgeDays?: number;
    chromePath?: string;
}

interface SnapshotSettings {
    /** the server the pages are drawn from, e.g. http://localhost:5001 */
    base: string;
    dir: string;
    tabs: number;
    maxAgeDays: number;
    chromePath?: string;
}

interface Address {
    lang: string;
    /** the path without a trailing slash, as the server looks the snapshot up */
    route: string;
    /** path and query to open */
    path: string;
}

interface ManifestEntry {
    /** below the snapshot directory */
    file: string;
    /** `X-Page-Version` of the page when it was drawn */
    version: string;
    renderedAt: number;
    /** the stylesheets in css/ the snapshot refers to */
    css: string[];
}

interface Manifest {
    pages: Record<string, ManifestEntry>;
}

export interface SnapshotOptions {
    /** draw only the first addresses of the sitemap - for a short test run */
    limit?: number;
    /** draw from this server instead of the one in config.json */
    base?: string;
    /** draw every page again, whatever version it was drawn in */
    force?: boolean;
    /** pages drawn at the same time, instead of the number in config.json */
    tabs?: number;
    /** leave out the first addresses of the sitemap - with `limit`, any stretch of it for a test run */
    skip?: number;
}

const ENGINE_DIR = path.join(import.meta.dirname, '..');
const DAY = 24 * 60 * 60 * 1000;
/** the statistics page waits for data from another host - a minute and a half is enough for it */
const PAGE_TIMEOUT = 90_000;

function readSettings(options: SnapshotOptions): SnapshotSettings {
    const file = ['config.json', 'config.dist.json']
        .map(name => path.join(ENGINE_DIR, name))
        .find(name => fs.existsSync(name));
    const config = file
        ? (JSON.parse(fs.readFileSync(file, 'utf-8')) as { port?: number; prerender?: PrerenderSettings })
        : {};
    const prerender = config.prerender ?? {};
    return {
        base: (options.base || prerender.snapshotBase || `http://localhost:${config.port || 5001}`).replace(/\/+$/, ''),
        dir: path.resolve(ENGINE_DIR, prerender.snapshotDir || 'prerender-snapshots'),
        // most of the time of a page is waiting for its data, not work of the processor - eight at
        // once draw the site in about half the time four took
        tabs: Math.max(1, Number(options.tabs) || Number(prerender.snapshotTabs) || 4),
        maxAgeDays: Number(prerender.snapshotMaxAgeDays ?? 7),
        chromePath: prerender.chromePath || undefined,
    };
}

/** The file of a page below the snapshot directory: `<lang>/<path>.html`, the start page as `index.html` */
function fileOf(address: Address): string {
    let decoded = address.route;
    try {
        decoded = decodeURIComponent(address.route);
    } catch {
        // a malformed escape - the raw path is cleaned just the same
    }
    const segments = decoded
        .split('/')
        .map(segment => segment.replace(/[^\w.-]/g, '_'))
        .filter(segment => segment && segment !== '.' && segment !== '..');
    return `${[address.lang.replace(/[^\w-]/g, '_'), ...(segments.length ? segments : ['index'])].join('/')}.html`;
}

/** Every address of the site in every language, as the server lists them */
async function addressesOf(settings: SnapshotSettings): Promise<Address[]> {
    const response = await fetch(`${settings.base}/sitemap.xml`);
    if (!response.ok) {
        throw new Error(`${settings.base}/sitemap.xml answered ${response.status}`);
    }
    const xml = await response.text();
    return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => {
        const url = new URL(match[1].replace(/&amp;/g, '&'));
        return {
            lang: url.searchParams.get('lang') || 'en',
            route: url.pathname.replace(/\/+$/, '') || '/',
            path: `${url.pathname}${url.search}`,
        };
    });
}

/** Some parts of a page appear only once they are scrolled to - scroll through it once, then back */
async function revealAll(page: Page): Promise<void> {
    await page.evaluate(async () => {
        const step = Math.max(300, Math.round(window.innerHeight * 0.9));
        for (let i = 0, y = 0; i < 40 && y < document.documentElement.scrollHeight; i++, y += step) {
            window.scrollTo(0, y);
            await new Promise(resolve => setTimeout(resolve, 50));
        }
        window.scrollTo(0, 0);
    });
    await new Promise(resolve => setTimeout(resolve, 300));
}

/** errors of the network or of the browser that pass - worth another try */
const TRANSIENT =
    /net::ERR_|ECONNRESET|ECONNREFUSED|ENOBUFS|ETIMEDOUT|fetch failed|timeout|Target closed|Session closed|Protocol error|detached/i;
/** errors after which the browser context of a tab is of no use any more */
const BROKEN = /Target closed|Session closed|Protocol error|detached/i;
const RETRIES = 2;
/** waited before the first retry, twice as long before the second */
const RETRY_DELAY = 3000;
/** pages a tab draws in one context before it takes a new one - the cache of a context only grows */
const CONTEXT_PAGES = 200;

/**
 * Something that may fail for a moment, tried again after a pause.
 *
 * With eight tabs a page failed now and then for no reason of its own - `net::ERR_NO_BUFFER_SPACE`,
 * the machine had run out of sockets for a moment - and was left out until the next run. What fails
 * on the network or in the browser is tried twice more; an answer of the server, a 404, is not.
 *
 * @param label the address, for the log
 * @param attempt what is tried
 * @param afterFailure called with the message before the next try
 */
async function retried<T>(
    label: string,
    attempt: () => Promise<T>,
    afterFailure?: (message: string) => Promise<void> | void,
): Promise<T> {
    for (let round = 1; ; round++) {
        try {
            return await attempt();
        } catch (error) {
            const message =
                error instanceof Error
                    ? `${error.message}${error.cause instanceof Error ? ` (${error.cause.message})` : ''}`
                    : String(error);
            if (round > RETRIES || !TRANSIENT.test(message)) {
                throw error;
            }
            console.warn(`Snapshot of ${label}: ${message} - trying again in ${(RETRY_DELAY * round) / 1000} s`);
            await afterFailure?.(message);
            await new Promise(resolve => setTimeout(resolve, RETRY_DELAY * round));
        }
    }
}

/**
 * The browser context of one tab.
 *
 * Every tab draws one page after another in a context of its own. The tabs do not share the storage
 * the app keeps its language in - a Russian page drawn at the same moment once turned the English
 * start page Russian - and within a tab the pages share the cache and the open connections. A context
 * per page had neither: every page loaded the bundle and the 1.9 MB of adapters.json again over new
 * connections, and with eight tabs Windows ran out of sockets (net::ERR_NO_BUFFER_SPACE).
 */
async function openContext(browser: Browser, settings: SnapshotSettings): Promise<BrowserContext> {
    const context = await browser.createBrowserContext();
    // decided beforehand: the cookie banner is no part of a page
    await context.setCookie({
        name: 'cookieUsage',
        value: 'm',
        domain: new URL(settings.base).hostname,
        path: '/',
    });
    return context;
}

/** The page as the app draws it: its markup, and the styles it wrote, each in place of its style tag */
async function draw(
    context: BrowserContext,
    settings: SnapshotSettings,
    address: Address,
): Promise<{ html: string; styles: string[] }> {
    const page = await context.newPage();
    try {
        await page.setViewport({ width: 1440, height: 900 });
        /*
         * The language of the address in every request as well. Chrome sends the language of the
         * machine it runs on, and for an English address - which carries no `?lang=` - the server
         * answers a browser in the language it asks for: on a German machine it looked for the
         * German readme of `waip-web`, which does not exist, and the page failed with 404.
         */
        await page.setExtraHTTPHeaders({ 'Accept-Language': address.lang });
        // the language the address names, also for the English ones without a parameter - set before
        // the app starts, so what the page before it in this tab left in the storage does not count
        await page.evaluateOnNewDocument((lang: string) => {
            try {
                window.localStorage.setItem('lang', lang);
            } catch {
                // storage refused - the address names the language as well
            }
        }, address.lang);
        const response = await page.goto(`${settings.base}${address.path}`, {
            waitUntil: 'networkidle0',
            timeout: PAGE_TIMEOUT,
        });
        if (response?.status() !== 200) {
            throw new Error(`status ${response?.status()}`);
        }
        await revealAll(page);

        return await page.evaluate(() => {
            const styles: string[] = [];
            document.querySelectorAll('style').forEach(style => {
                let css = style.textContent ?? '';
                try {
                    const rules = Array.from(style.sheet?.cssRules ?? [])
                        .map(rule => rule.cssText)
                        .join('\n');
                    if (rules.length > css.length) {
                        css = rules;
                    }
                } catch {
                    // a sheet that cannot be read keeps what stands in the markup
                }
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.setAttribute('data-snapshot-css', String(styles.length));
                style.replaceWith(link);
                styles.push(css);
            });
            return { html: `<!doctype html>\n${document.documentElement.outerHTML}`, styles };
        });
    } finally {
        await page.close();
    }
}

/** the pages of the app - the first segment of their path */
const APP_ROUTES = [
    '',
    'adapters',
    'docs',
    'blog',
    'installation',
    'productoverview',
    'statistics',
    'imprint',
    'policy',
    'search',
];

/**
 * The links of a snapshot, made to lead where a crawler should go.
 *
 * The app writes some of its links absolute, out of the host it runs on (`getLink` in
 * `config/api.ts`): drawn from http://localhost:5001 the navigation led to http://localhost:5001/adapters,
 * drawn from the demo to https://www.iobroker.net:543/adapters. Such a link to a page of the app
 * becomes a path of the site. And the app does not carry the language on its links - it keeps it
 * in the browser - so on a German or Russian page every link led to the English one; here it gets
 * `?lang=` of the page it stands on. Links to other hosts, the profile, the feeds and the files
 * stay as they are.
 */
function localizeLinks(html: string, settings: SnapshotSettings, address: Address): string {
    const own = new Set([new URL(settings.base).hostname, 'www.iobroker.net']);
    return html.replace(/<a\b[^>]*>/gi, tag =>
        tag.replace(/\bhref="([^"]*)"/i, (attribute: string, raw: string) => {
            const value = raw.replace(/&amp;/g, '&');
            let url: URL;
            try {
                // a relative link is read against the page it stands on
                url = new URL(value, `${settings.base}${address.path}`);
            } catch {
                return attribute;
            }
            const isOwn = /^https?:$/.test(url.protocol) && own.has(url.hostname);
            const segment = decodeURIComponent(url.pathname.split('/')[1] ?? '');
            if (!isOwn || !APP_ROUTES.includes(segment) || value.startsWith('#')) {
                return attribute;
            }
            if (address.lang !== 'en' && !url.searchParams.has('lang')) {
                url.searchParams.set('lang', address.lang);
            }
            const target = `${url.pathname}${url.search}${url.hash}`;
            return `href="${target.replace(/&/g, '&amp;').replace(/"/g, '&quot;')}"`;
        }),
    );
}

/** Writes the snapshot and its stylesheets */
function keep(
    settings: SnapshotSettings,
    address: Address,
    drawn: { html: string; styles: string[] },
): {
    file: string;
    css: string[];
} {
    let html = localizeLinks(drawn.html, settings, address);
    const css: string[] = [];
    drawn.styles.forEach((text, index) => {
        const placeholder = `<link rel="stylesheet" data-snapshot-css="${index}">`;
        if (!text.trim()) {
            html = html.replace(placeholder, '');
            return;
        }
        const name = `${crypto.createHash('sha256').update(text).digest('hex').slice(0, 20)}.css`;
        const cssFile = path.join(settings.dir, 'css', name);
        if (!fs.existsSync(cssFile)) {
            fs.writeFileSync(cssFile, text);
        }
        css.push(name);
        html = html.replace(placeholder, `<link rel="stylesheet" href="/prerender-css/${name}">`);
    });

    const file = fileOf(address);
    const target = path.join(settings.dir, file);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, html);
    return { file, css };
}

/**
 * Draws the pages that changed and keeps them for the crawlers.
 *
 * @param options a limit or another server, for a test run
 */
export async function buildSnapshots(options: SnapshotOptions = {}): Promise<void> {
    const settings = readSettings(options);
    const manifestFile = path.join(settings.dir, 'manifest.json');
    fs.mkdirSync(path.join(settings.dir, 'css'), { recursive: true });
    const manifest: Manifest = fs.existsSync(manifestFile)
        ? (JSON.parse(fs.readFileSync(manifestFile, 'utf-8')) as Manifest)
        : { pages: {} };
    // written aside and moved over, so the server never reads half a manifest
    const save = (): void => {
        const temporary = `${manifestFile}.tmp`;
        fs.writeFileSync(temporary, JSON.stringify(manifest));
        fs.renameSync(temporary, manifestFile);
    };

    const all = await addressesOf(settings);
    const from = Math.max(0, options.skip ?? 0);
    const addresses = all.slice(from, options.limit ? from + options.limit : undefined);
    console.log(
        `Snapshots: ${addresses.length} addresses from ${settings.base}, ${settings.tabs} tabs, into ${settings.dir}`,
    );

    const browser = await puppeteer.launch({
        headless: true,
        executablePath: settings.chromePath,
        args: ['--no-sandbox', '--disable-dev-shm-usage'],
    });
    const counts = { drawn: 0, unchanged: 0, gone: 0, failed: 0, retried: 0 };
    const queue = [...addresses];
    const started = Date.now();
    let unsaved = 0;

    const work = async (): Promise<void> => {
        // the context of this tab - see `openContext`; the browser closes it at the end of the run
        let context: BrowserContext | null = null;
        let drawnInContext = 0;
        const contextOfTab = async (): Promise<BrowserContext> => {
            if (!context || drawnInContext >= CONTEXT_PAGES) {
                await context?.close().catch(() => undefined);
                context = await openContext(browser, settings);
                drawnInContext = 0;
            }
            drawnInContext++;
            return context;
        };

        for (let address = queue.shift(); address; address = queue.shift()) {
            const key = `${address.lang}|${address.route}`;
            const known = manifest.pages[key];
            try {
                // the same language the page is drawn in - the version is that of the same answer
                const head = await retried(
                    address.path,
                    () =>
                        fetch(`${settings.base}${address.path}`, {
                            method: 'HEAD',
                            headers: { 'Accept-Language': address.lang },
                        }),
                    () => {
                        counts.retried++;
                    },
                );
                if (head.status !== 200) {
                    if (known) {
                        fs.rmSync(path.join(settings.dir, known.file), { force: true });
                        delete manifest.pages[key];
                    }
                    counts.gone++;
                    continue;
                }
                const version = head.headers.get('x-page-version') ?? '';
                const fresh =
                    !options.force &&
                    !!known &&
                    !!version &&
                    known.version === version &&
                    Date.now() - known.renderedAt < settings.maxAgeDays * DAY &&
                    fs.existsSync(path.join(settings.dir, known.file));
                if (fresh) {
                    counts.unchanged++;
                    continue;
                }

                const drawn = await retried(
                    address.path,
                    async () => draw(await contextOfTab(), settings, address),
                    async message => {
                        counts.retried++;
                        // a context that lost its page is of no use any more - the next try opens a new one
                        if (BROKEN.test(message)) {
                            await context?.close().catch(() => undefined);
                            context = null;
                        }
                    },
                );
                const kept = keep(settings, address, drawn);
                manifest.pages[key] = { ...kept, version, renderedAt: Date.now() };
                counts.drawn++;
                if (++unsaved >= 25) {
                    save();
                    unsaved = 0;
                }
            } catch (error) {
                counts.failed++;
                console.warn(
                    `Snapshot of ${address.path} failed: ${error instanceof Error ? error.message : String(error)}`,
                );
            }
            if (counts.drawn && counts.drawn % 100 === 0) {
                console.log(
                    `Snapshots: ${addresses.length - queue.length}/${addresses.length}, ${counts.drawn} drawn, ${counts.unchanged} unchanged`,
                );
            }
        }
    };

    try {
        await Promise.all(Array.from({ length: settings.tabs }, () => work()));
    } finally {
        await browser.close();
    }

    // only a run over the whole sitemap knows what is no longer in it
    if (addresses.length === all.length) {
        // pages that left the sitemap
        const listed = new Set(addresses.map(address => `${address.lang}|${address.route}`));
        for (const [key, entry] of Object.entries(manifest.pages)) {
            if (!listed.has(key)) {
                fs.rmSync(path.join(settings.dir, entry.file), { force: true });
                delete manifest.pages[key];
            }
        }
        // stylesheets no snapshot refers to any more
        const used = new Set(Object.values(manifest.pages).flatMap(entry => entry.css ?? []));
        for (const name of fs.readdirSync(path.join(settings.dir, 'css'))) {
            if (!used.has(name)) {
                fs.rmSync(path.join(settings.dir, 'css', name), { force: true });
            }
        }
    }
    save();

    console.log(
        `Snapshots: ${counts.drawn} drawn, ${counts.unchanged} unchanged, ${counts.gone} gone, ${counts.failed} failed, ${counts.retried} retried in ${Math.round((Date.now() - started) / 1000)} s`,
    );
}
