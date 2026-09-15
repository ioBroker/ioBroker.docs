import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkFrontmatter from 'remark-frontmatter';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';
import type { Languages } from '../types.js';
import { crawlerBody, type PageKind } from './crawlerPages.js';
import {
    LANGUAGES,
    contentVersionOf,
    documentTitle,
    escapeHtml,
    readJson,
    text,
    versionOf,
    walk,
    withLanguage,
    type JsonPage,
    type Translated,
} from './siteData.js';

/**
 * What a page tells a crawler about itself.
 *
 * Until now every one of the ~800 adapter pages, the whole documentation and every blog post
 * answered with the one title that stands in `index.html` and with no description at all, because
 * all of it is fetched and rendered in the browser. A crawler that does run JavaScript could read
 * the page but had nothing to tell it apart by; one that does not - and none of the social fetchers
 * do, although robots.txt lets them in by name - saw an empty shell.
 */
export interface PageDescription {
    /** what kind of page it is - the content a crawler gets is built by it */
    kind: PageKind;
    title: string;
    description: string;
    /** the document that carries the text of this page, absolute */
    file?: string;
    /** a picture for the preview, as a path below the site */
    image?: string;
    /** the entry of the index the page comes from - adapters.json or blog.json */
    entry?: JsonPage;
}

/**
 * The agents that get a rendered page.
 *
 * Googlebot and Bing execute JavaScript and would manage without, only slowly and not reliably;
 * the rest - the social fetchers above all - read the markup as it arrives and nothing else. The
 * list is deliberately generous: rendering a page for an agent that did not need it costs one
 * pass through the markdown, once, while missing one means that agent sees nothing.
 */
const CRAWLERS =
    /(googlebot|google-inspectiontool|bingbot|yandex(bot)?|duckduckbot|baiduspider|applebot|petalbot|facebookexternalhit|facebot|meta-external(agent|fetcher)|meta-webindexer|facebookbot|googleother|google-cloudvertexbot|gemini-deep-research|grokbot|xai-grok|grok-deepsearch|xai-bot|bytespider|doubaobot|tiktokspider|perplexity(bot|-user)|screaming frog seo spider|twitterbot|linkedinbot|slackbot|discordbot|whatsapp|telegrambot|ia_archiver|semrushbot|ahrefsbot|gptbot|chatgpt-user|oai-searchbot|claude(bot|-user|-searchbot)|anthropic-ai|deepseekbot)/i;

export function isCrawler(userAgent: string | undefined): boolean {
    return !!userAgent && CRAWLERS.test(userAgent);
}

/** The name of the crawler in a user agent - "googlebot", "bingbot" - or an empty string */
export function crawlerName(userAgent: string | undefined): string {
    return (userAgent && CRAWLERS.exec(userAgent)?.[1]?.toLowerCase()) || '';
}

/**
 * The language for a visitor whose address names none.
 *
 * "/adapters/pvforecast" without `?lang=` is the page in every language, and which one a visitor
 * gets is decided in the browser out of what was stored there. The server has no such store, so
 * `Accept-Language` is all there is to go by, and English is the fallback. A crawler does not come
 * here: without a parameter it gets English, the page `hreflang` names as x-default.
 *
 * @param header the Accept-Language of the request
 */
export function pickLanguage(header: string | undefined): Languages {
    for (const part of (header || '').split(',')) {
        const tag = part.split(';')[0].trim().toLowerCase();
        const found = LANGUAGES.find(lang => tag === lang || tag.startsWith(`${lang}-`));
        if (found) {
            return found;
        }
    }
    return 'en';
}

function describeAdapter(publicDir: string, lang: Languages, slug: string): PageDescription | undefined {
    const adapters = readJson<JsonPage>(path.join(publicDir, 'adapters.json'));
    let found: JsonPage | undefined;
    walk(adapters, (key, page) => {
        if (!found && key === slug && page.content) {
            found = page;
        }
    });
    if (!found) {
        return undefined;
    }
    return {
        kind: 'adapter',
        title: text(found.titleFull, lang) || slug,
        description: text(found.description, lang),
        file: found.content ? path.join(publicDir, lang, found.content) : undefined,
        image: found.icon ? `/${lang}/${found.icon}` : undefined,
        entry: found,
    };
}

function describeDocument(publicDir: string, lang: Languages, docPath: string): PageDescription {
    return {
        kind: 'document',
        title: documentTitle(publicDir, lang, docPath) || docPath.replace(/\.md$/i, ''),
        description: '',
        file: path.join(publicDir, lang, docPath),
    };
}

function describeBlogPost(publicDir: string, lang: Languages, id: string): PageDescription | undefined {
    const blog = readJson<JsonPage>(path.join(publicDir, 'blog.json'));
    const post = blog?.pages?.[id];
    if (!post) {
        return undefined;
    }
    return {
        kind: 'post',
        title: text(post.title, lang) || id,
        description: text(post.desc, lang),
        file: path.join(publicDir, lang, 'blog', `${id}.md`),
        entry: post,
    };
}

/**
 * The pages that are not a document - their text is the interface itself.
 *
 * The same words the app uses for them, out of `front-end/src/i18n`, so that the title does not
 * change under the reader the moment the app starts and writes its own.
 */
const PLAIN_DESCRIPTIONS: Record<string, Translated> = {
    '/': {
        en: 'Documentation of ioBroker, the open source platform for home and building automation: installation, adapters, tutorials and the blog.',
        de: 'Dokumentation von ioBroker, der Open-Source-Plattform für Haus- und Gebäudeautomatisierung: Installation, Adapter, Anleitungen und Blog.',
        ru: 'Документация ioBroker, платформы с открытым исходным кодом для автоматизации дома и здания: установка, адаптеры, руководства и блог.',
    },
    '/adapters': {
        en: 'All ioBroker adapters with their documentation - what each one connects to and how it is set up.',
        de: 'Alle ioBroker-Adapter mit ihrer Dokumentation - was jeder anbindet und wie er eingerichtet wird.',
        ru: 'Все адаптеры ioBroker с документацией - что подключает каждый и как он настраивается.',
    },
    '/installation': {
        en: 'How to install ioBroker - on Linux, Windows, macOS, Docker and a Raspberry Pi.',
        de: 'ioBroker installieren - unter Linux, Windows, macOS, Docker und auf dem Raspberry Pi.',
        ru: 'Установка ioBroker - в Linux, Windows, macOS, Docker и на Raspberry Pi.',
    },
};

const PLAIN_PAGES: Record<string, Translated> = {
    '/': { en: 'ioBroker', de: 'ioBroker', ru: 'ioBroker' },
    '/adapters': { en: 'Adapters', de: 'Adapter', ru: 'Адаптеры' },
    '/docs': { en: 'Docs', de: 'Doku', ru: 'Документация' },
    '/blog': { en: 'Blog', de: 'Blog', ru: 'Блог' },
    '/installation': { en: 'Installation', de: 'Installation', ru: 'Установка' },
    '/statistics': { en: 'Statistics', de: 'Statistik', ru: 'Статистика' },
    '/productoverview': { en: 'Licenses', de: 'Lizenzen', ru: 'Лицензии' },
    '/imprint': { en: 'Imprint', de: 'Impressum', ru: 'О компании' },
    '/policy': { en: 'Privacy', de: 'Datenschutz', ru: 'Политика конфиденциальности' },
    '/search': { en: 'Search', de: 'Suche', ru: 'Поиск' },
};

/** The legal pages are documents of their own, kept next to the others in every language */
const LEGAL_DOCUMENTS: Record<string, string> = {
    '/imprint': 'imprint.md',
    '/policy': 'privacy.md',
};

/**
 * What the address names.
 *
 * @param pathname the path of the request
 * @param lang the language to answer in
 * @param publicDir the directory the site is served from
 */
export function describePage(pathname: string, lang: Languages, publicDir: string): PageDescription {
    const route = pathname.replace(/\/+$/, '') || '/';

    if (route.startsWith('/adapters/')) {
        const described = describeAdapter(publicDir, lang, decodeURIComponent(route.slice('/adapters/'.length)));
        if (described) {
            return described;
        }
    } else if (route.startsWith('/docs/')) {
        return describeDocument(publicDir, lang, decodeURIComponent(route.slice('/docs/'.length)));
    } else if (route.startsWith('/blog/')) {
        const described = describeBlogPost(publicDir, lang, decodeURIComponent(route.slice('/blog/'.length)));
        if (described) {
            return described;
        }
    } else if (Object.hasOwn(LEGAL_DOCUMENTS, route)) {
        return {
            kind: 'document',
            title: text(PLAIN_PAGES[route], lang),
            description: '',
            file: path.join(publicDir, lang, LEGAL_DOCUMENTS[route]),
        };
    }

    return {
        kind: 'plain',
        title: text(PLAIN_PAGES[route], lang) || 'ioBroker',
        description: text(PLAIN_DESCRIPTIONS[route], lang),
    };
}

/*
 * The documents carry HTML of their own - the pictures above all are written as `<img>` with a
 * width, not as markdown. Without `rehype-raw` all of it was dropped, and a crawler read the text
 * without a single picture. It is parsed now and then sanitized like everything else: what is
 * unsafe - scripts, event handlers, styles - still goes.
 */
const markdown = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkFrontmatter, ['yaml'])
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeSanitize)
    .use(rehypeStringify);

/** The document as HTML - anything unsafe in it is dropped */
function toHtml(source: string): string {
    try {
        return String(markdown.processSync(source));
    } catch {
        return '';
    }
}

/** The first sentences of a document, for a page that brings no description of its own */
function summarise(html: string): string {
    const plain = html
        .replace(/<[^>]*>/g, ' ')
        .replace(/&[a-z]+;/gi, ' ')
        .replace(/\s+/g, ' ')
        .trim();
    return plain.length > 300 ? `${plain.slice(0, 297).replace(/\s+\S*$/, '')}…` : plain;
}

interface Rendered {
    /** what the page was built from - a page is rebuilt when this changes, and not before */
    hash: string;
    html: string;
    status: 200 | 404;
    version: string;
    snapshot: boolean;
    /** what the entry takes in memory, roughly - see `sizeOf` */
    bytes: number;
}

/**
 * The pages that were built, by address and language.
 *
 * There is no time limit on them. What a page is made of only changes when the build pipeline
 * writes new files, and the hash below says exactly when that happened - a page that did not
 * change keeps the version that was built for it, however long ago that was. A limit on time
 * would only mean throwing away work that is still correct, and after every run of the pipeline
 * the files are rewritten whether their content changed or not, so a date says nothing anyway.
 *
 * The order of the map is the order of use: a page served from here moves to the end, so the one
 * that goes when the cache is full is the one asked for longest ago.
 */
const pageCache = new Map<string, Rendered>();

/**
 * What the cache may take. Measured on 14.09.2026: every page of the site - 801 adapters, 144
 * documents, 35 posts, in three languages, once for crawlers and once for browsers - comes to 5940
 * entries and about 68 MB, 62 MB of it the crawler pages. The former limit by count (4000) did not
 * fit that, and it let a README of 445 KB weigh as much as a page of 2 KB.
 */
let maxBytes = 128 * 1024 * 1024;
/** a limit on the count as well, against a flood of small entries for addresses that do not exist */
const MAX_PAGES = 20000;
let cachedBytes = 0;

/** where every rendered page is written as well, or null - see `configurePrerender` */
let dumpDir: string | null = null;
/** front-end/src - the words of the interface a crawler's page is written with, or null */
let frontEndSrc: string | null = null;
/** where the pipeline step `11.snapshots` keeps the pages as the app draws them, or null */
let snapshotDir: string | null = null;

export interface PrerenderOptions {
    /** memory the page cache may take, in bytes */
    maxBytes?: number;
    /** absolute directory every rendered page is written into as well, to see what was sent; off when empty */
    dumpDir?: string;
    /** front-end/src, absolute - without it a crawler's page carries no texts of the interface */
    frontEndSrc?: string;
    /** absolute directory of the snapshots written by build-lib/snapshots.mts */
    snapshotDir?: string;
}

/** The settings out of config.json - called once when the server starts */
export function configurePrerender(options: PrerenderOptions): void {
    if (options.maxBytes && options.maxBytes > 0) {
        maxBytes = options.maxBytes;
    }
    dumpDir = options.dumpDir ? path.resolve(options.dumpDir) : null;
    frontEndSrc = options.frontEndSrc || null;
    snapshotDir = options.snapshotDir ? path.resolve(options.snapshotDir) : null;
}

/** memory of a string in V8: one byte per character, two once anything beyond Latin-1 is in it */
function sizeOf(value: string): number {
    for (let i = 0; i < value.length; i++) {
        if (value.charCodeAt(i) > 0xff) {
            return 2 * value.length;
        }
    }
    return value.length;
}

/**
 * Where a page goes in the dump directory: `<lang>/<bot|app>/<path>.html`, the start page as
 * `index.html`. The path comes from the request and anybody can write it, so every segment is cut
 * down to harmless characters and "." and ".." are dropped.
 */
function dumpFileOf(root: string, lang: Languages, forCrawler: boolean, pathname: string): string | null {
    let decoded = pathname;
    try {
        decoded = decodeURIComponent(pathname);
    } catch {
        // a malformed escape - the raw path is cleaned just the same
    }
    const segments = decoded
        .split('/')
        .map(segment => segment.replace(/[^\w.-]/g, '_'))
        .filter(segment => segment && segment !== '.' && segment !== '..');
    const file = `${path.join(root, lang, forCrawler ? 'bot' : 'app', ...(segments.length ? segments : ['index']))}.html`;
    return file.startsWith(path.join(root, path.sep)) ? file : null;
}

/** Written in the background - the answer to the request does not wait for the disk */
function dumpPage(file: string, html: string): void {
    fs.promises
        .mkdir(path.dirname(file), { recursive: true })
        .then(() => fs.promises.writeFile(file, html))
        .catch((error: unknown) => console.error(`Cannot write prerendered page ${file}: ${String(error)}`));
}

/** set between the parts of a hash, so that "ab" + "c" and "a" + "bc" do not come out the same */
const SEPARATOR = String.fromCharCode(0);

function hashOf(parts: (string | undefined)[]): string {
    const hash = crypto.createHash('sha256');
    parts.forEach(part => hash.update(part ?? '').update(SEPARATOR));
    return hash.digest('base64');
}

/**
 * The version of everything a crawler's page is made of besides its own document: the indexes,
 * the statistics, the words of the interface and the installation targets.
 */
function sourcesVersion(publicDir: string, lang: Languages): string {
    const files = [
        path.join(publicDir, 'adapters.json'),
        path.join(publicDir, 'content.json'),
        path.join(publicDir, 'blog.json'),
        path.join(publicDir, 'data', 'statistics.json'),
    ];
    if (frontEndSrc) {
        files.push(
            path.join(frontEndSrc, 'i18n', `${lang}.json`),
            path.join(frontEndSrc, 'i18n', 'en.json'),
            path.join(frontEndSrc, 'config', 'installation.json'),
        );
    }
    return files.map(versionOf).join('|');
}

/**
 * The version of what a page shows - the same for a crawler and a reader.
 *
 * The pipeline asks for it (`X-Page-Version`) before it draws a page and draws only what changed
 * since. It is made of the app (the shell names the bundles of this build), the document and the
 * entry of the page, and of the indexes only where the page shows them: the lists on the plain
 * pages, the table of contents beside a document, the other posts beside a post. The indexes
 * change every day, and every page would be drawn again every day if all of them counted.
 */
function pageVersionOf(
    shell: string,
    route: string,
    page: PageDescription,
    source: string | undefined,
    publicDir: string,
): string {
    const index = (name: string): string => contentVersionOf(path.join(publicDir, name));
    let data: string[] = [];
    if (page.kind === 'plain') {
        data = [
            index('adapters.json'),
            index('content.json'),
            index('blog.json'),
            contentVersionOf(path.join(publicDir, 'data', 'statistics.json')),
        ];
    } else if (page.kind === 'document' && route.startsWith('/docs/')) {
        data = [index('content.json')];
    } else if (page.kind === 'post') {
        data = [index('blog.json')];
    }
    return hashOf([
        shell,
        page.title,
        page.description,
        page.image,
        source,
        page.entry ? JSON.stringify(page.entry) : '',
        ...data,
    ]);
}

/** what build-lib/snapshots.mts notes about one snapshot in manifest.json */
interface SnapshotEntry {
    file: string;
    version: string;
    renderedAt: number;
}

/**
 * The snapshot of a page, when there is one for exactly this version of it.
 *
 * A snapshot of an older version is not used: its text may be out of date, and a crawler that gets
 * other words than a reader would be the one thing all of this is meant to avoid. Until the pipeline
 * has drawn the page again, the crawler gets the page written by the server instead.
 */
function snapshotOf(lang: Languages, route: string, version: string): { file: string; stamp: string } | null {
    if (!snapshotDir) {
        return null;
    }
    const entry = readJson<{ pages?: Record<string, SnapshotEntry> }>(path.join(snapshotDir, 'manifest.json'))?.pages?.[
        `${lang}|${route}`
    ];
    if (!entry || entry.version !== version) {
        return null;
    }
    const file = path.resolve(snapshotDir, entry.file);
    if (!file.startsWith(path.join(snapshotDir, path.sep)) || !fs.existsSync(file)) {
        return null;
    }
    return { file, stamp: `${entry.version}|${entry.renderedAt}` };
}

/** what the app writes into the head for itself - in a snapshot it is replaced by the server's tags */
const APP_HEAD_TAGS =
    /<meta\b[^>]*\b(?:name="(?:description|robots|twitter:[^"]*)"|property="og:[^"]*")[^>]*>\s*|<link\b[^>]*\b(?:rel="canonical"|hreflang=)[^>]*>\s*/gi;

/**
 * A page - the shell or a snapshot - with the language, the title and the head of this address.
 */
function withHead(page: string, lang: Languages, title: string, head: string): string {
    const headEnd = page.search(/<\/head>/i);
    let html = headEnd === -1 ? page : page.slice(0, headEnd).replace(APP_HEAD_TAGS, '') + page.slice(headEnd);

    // index.html is written in English - the page says which language it really is in
    html = html.replace(/<html\b[^>]*>/i, tag =>
        /\blang="[^"]*"/i.test(tag)
            ? tag.replace(/\blang="[^"]*"/i, `lang="${lang}"`)
            : tag.replace(/^<html/i, `<html lang="${lang}"`),
    );
    const titleTag = `<title data-prerender>${escapeHtml(title)}</title>`;
    html = /<title[^>]*>[^<]*<\/title>/i.test(html)
        ? html.replace(/<title[^>]*>[^<]*<\/title>/i, titleTag)
        : html.replace(/<\/head>/i, `    ${titleTag}\n    </head>`);
    return html.replace(/<\/head>/i, `    ${head}\n    </head>`);
}

const OG_LOCALES: Record<Languages, string> = { de: 'de_DE', en: 'en_GB', ru: 'ru_RU' };

export interface RenderRequest {
    /** the contents of index.html */
    shell: string;
    /** the path of the request */
    pathname: string;
    /** scheme and host the site is published under, for the addresses in the head */
    origin: string;
    /** the language to answer in */
    lang: Languages;
    /** the directory the site is served from */
    publicDir: string;
    /** whether to write the content of the page into it */
    forCrawler: boolean;
}

export interface RenderResult {
    html: string;
    /** whether it was already built */
    fromCache: boolean;
    /** 404 for an address that names nothing */
    status: 200 | 404;
    /** the version of what the page shows - see `pageVersionOf` */
    version: string;
    /** whether a crawler got the snapshot of the page */
    snapshot: boolean;
}

/**
 * The page for a request, with the head filled in - and, for a crawler, with the content in it.
 *
 * A visitor gets the shell as before, only with a title and a description that name this page:
 * putting the content in as well would show it for the moment it takes React to start and then
 * have it replaced, which is a flicker for nothing. A crawler gets the content, because for it
 * there is no moment after - the snapshot of the page where the pipeline has drawn one, the page
 * written out of the markdown and the words of the interface where it has not.
 *
 * @param request what is asked for
 */
export function renderPage(request: RenderRequest): RenderResult {
    const { shell, pathname, origin, lang, publicDir, forCrawler } = request;
    const route = pathname.replace(/\/+$/, '') || '/';
    const page = describePage(pathname, lang, publicDir);

    let source: string | undefined;
    if (page.file) {
        try {
            source = fs.readFileSync(page.file, 'utf-8');
        } catch {
            source = undefined;
        }
    }
    /*
     * An address that names nothing - an adapter that does not exist, a document that is not there -
     * is still answered with the shell, so that the app can show its own "not found". But with 404
     * and without canonical and hreflang, so that a search engine does not keep it as a page.
     */
    const found = page.kind === 'plain' ? Object.hasOwn(PLAIN_PAGES, route) : !!source;
    const status = found ? 200 : 404;
    const version = pageVersionOf(shell, route, page, source, publicDir);
    const snapshot = forCrawler && found ? snapshotOf(lang, route, version) : null;

    const key = `${lang}|${forCrawler ? 'bot' : 'app'}|${pathname}`;
    const hash = hashOf([
        shell,
        origin,
        page.title,
        page.description,
        page.image,
        source,
        // a crawler's page is made of its snapshot, or of the indexes and the words of the interface
        forCrawler ? (snapshot ? `snapshot|${snapshot.stamp}` : sourcesVersion(publicDir, lang)) : '',
    ]);
    const cached = pageCache.get(key);
    if (cached?.hash === hash) {
        // the page just used goes to the end - the one asked for longest ago is dropped first
        pageCache.delete(key);
        pageCache.set(key, cached);
        return { html: cached.html, fromCache: true, status: cached.status, version, snapshot: cached.snapshot };
    }

    const documentHtml = source ? toHtml(source) : '';
    const description = page.description || (documentHtml ? summarise(documentHtml) : '');
    const canonical = `${origin}${withLanguage(route, lang)}`;
    const title = page.title.includes('ioBroker') ? page.title : `${page.title} | ioBroker`;
    const indexable = found && route !== '/search';

    /*
     * Every tag written here carries `data-prerender`, and `main.tsx` takes them out again the
     * moment the app starts. React writes the same tags itself once it has the data, and knows
     * nothing of the ones already in the document - the page ended up with two titles, and the
     * browser goes by whichever stands first. Something that does not run the app never reaches
     * that line and keeps what was sent.
     */
    const head = [
        description ? `<meta data-prerender name="description" content="${escapeHtml(description)}">` : '',
        indexable
            ? `<link data-prerender rel="canonical" href="${escapeHtml(canonical)}">`
            : '<meta data-prerender name="robots" content="noindex, follow">',
        // the same page in the other languages, and the one to take when none of them fits
        ...(indexable
            ? [
                  ...LANGUAGES.map(
                      language =>
                          `<link data-prerender rel="alternate" hreflang="${language}" href="${escapeHtml(origin + withLanguage(route, language))}">`,
                  ),
                  `<link data-prerender rel="alternate" hreflang="x-default" href="${escapeHtml(origin + route)}">`,
              ]
            : []),
        `<meta data-prerender property="og:type" content="${route === '/' ? 'website' : 'article'}">`,
        `<meta data-prerender property="og:locale" content="${OG_LOCALES[lang]}">`,
        `<meta data-prerender property="og:title" content="${escapeHtml(title)}">`,
        description ? `<meta data-prerender property="og:description" content="${escapeHtml(description)}">` : '',
        `<meta data-prerender property="og:url" content="${escapeHtml(canonical)}">`,
        page.image ? `<meta data-prerender property="og:image" content="${escapeHtml(origin + page.image)}">` : '',
        '<meta data-prerender name="twitter:card" content="summary">',
    ]
        .filter(Boolean)
        .join('\n        ');

    let snapshotHtml: string | null = null;
    if (snapshot) {
        try {
            snapshotHtml = fs.readFileSync(snapshot.file, 'utf-8');
        } catch {
            snapshotHtml = null;
        }
    }

    let html: string;
    if (snapshotHtml) {
        // the page as the app draws it - only its head is the server's
        html = withHead(snapshotHtml, lang, title, head);
    } else {
        html = withHead(shell, lang, title, head);
        if (forCrawler) {
            // React replaces whatever stands in the container when it mounts, so this is only ever
            // seen by something that does not run it
            const body = crawlerBody({
                route,
                lang,
                kind: page.kind,
                title: page.title,
                documentHtml,
                file: page.file,
                entry: page.entry,
                publicDir,
                frontEndSrc,
            });
            html = html.replace('<div id="root"></div>', `<div id="root">${body}</div>`);
        }
    }
    const fromSnapshot = !!snapshotHtml;

    if (cached) {
        // the page changed - its old version makes room first
        pageCache.delete(key);
        cachedBytes -= cached.bytes;
    }
    const bytes = sizeOf(html) + sizeOf(key) + hash.length;
    pageCache.set(key, { hash, html, status, version, snapshot: fromSnapshot, bytes });
    cachedBytes += bytes;

    // the oldest go until it fits again - the page just built stays, however large it is
    for (const [oldestKey, oldest] of pageCache) {
        if ((cachedBytes <= maxBytes && pageCache.size <= MAX_PAGES) || oldestKey === key) {
            break;
        }
        pageCache.delete(oldestKey);
        cachedBytes -= oldest.bytes;
    }

    if (dumpDir) {
        const file = dumpFileOf(dumpDir, lang, forCrawler, pathname);
        if (file) {
            dumpPage(file, html);
        }
    }

    return { html, fromCache: false, status, version, snapshot: fromSnapshot };
}

/** How many pages are held - for the log line on startup and for the tests */
export function cachedPageCount(): number {
    return pageCache.size;
}

/** What the held pages take in memory, roughly */
export function cachedPageBytes(): number {
    return cachedBytes;
}
