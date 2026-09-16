'use strict';

import fs from 'node:fs';
import path from 'node:path';
import httpModule from 'node:http';
import httpsModule from 'node:https';
import type { Express, Request, Response, NextFunction } from 'express';
import express from 'express';
import { configurePrerender, crawlerName, isCrawler, pickLanguage, renderPage } from './prerender.js';
import { DEFAULT_LANGUAGE, escapeHtml, isLanguage, readJson } from './siteData.js';
import { buildSitemap } from './sitemap.js';
import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import { rateLimit } from 'express-rate-limit';

import Logger from './logger.js';
import type { AppConfig } from '../types.js';

// HTTP(S) module depending on `secure`

const logger = new Logger();

// Brute-force protection
// `skipSuccessfulRequests` replaces the former `req.brute.reset()`: only responses >= 400 count.
const bruteforce = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 5,
    skipSuccessfulRequests: true,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    message: { error: { text: 'Too many requests in this time frame.' } },
    // The server runs directly on 443 without a reverse proxy, so `trust proxy` is intentionally disabled.
    // An `X-Forwarded-For` here can only be spoofed by the client - the warning would be a false positive.
    validate: { xForwardedForHeader: false },
});

// App container
type ServerLike = httpModule.Server | httpsModule.Server;

const app: {
    app: Express;
    server: ServerLike | null;
} = {
    app: express(),
    server: null,
};

// Additional types for configuration and redirects
type SiteConfig = AppConfig['sites'][number];

type RedirectsMap = Record<string, string>;

// Normalize port
function normalizePort(val: string | number): number | string | false {
    const port = parseInt(String(val), 10);

    if (isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }

    return false;
}

function httpGet(url: string): Promise<string> {
    return new Promise((resolve, reject) => {
        const lib = url.startsWith('https') ? httpsModule : httpModule;
        const request = lib.get(url, (response: any) => {
            if (response.statusCode < 200 || response.statusCode > 299) {
                reject(new Error(`Failed to load page, status code: ${response.statusCode}`));
            }
            const body: Uint8Array[] = [];
            response.on('data', (chunk: Uint8Array) => body.push(chunk));
            response.on('end', () => resolve(Buffer.concat(body).toString()));
        });
        request.on('error', (err: Error) => reject(err));
    });
}

/**
 * Answers out of a small cache in front of a host that sends no CORS header.
 *
 * The browser cannot ask those hosts itself, so every visitor's request turns into a request of
 * ours - and the two product catalogues change a few times a year, not a few times a second. When
 * the upstream is unreachable a stale answer is served instead of an error: an old price list is
 * worth more to a reader than an empty page.
 */
const proxyCache = new Map<string, { at: number; body: string }>();

function cachedProxy(url: string, maxAgeMs: number): (req: Request, res: Response) => void {
    return (_req: Request, res: Response): void => {
        const cached = proxyCache.get(url);
        const send = (body: string, state: string): void => {
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Cache-Control', `public, max-age=${Math.round(maxAgeMs / 1000)}`);
            res.setHeader('X-Cache', state);
            res.send(body);
        };

        if (cached && Date.now() - cached.at < maxAgeMs) {
            send(cached.body, 'hit');
            return;
        }

        httpGet(url)
            .then(body => {
                proxyCache.set(url, { at: Date.now(), body });
                send(body, 'miss');
            })
            .catch((error: unknown) => {
                console.error(`Cannot fetch ${url}: ${String(error)}`);
                if (cached) {
                    send(cached.body, 'stale');
                    return;
                }
                res.status(502).json({ error: 'upstream-unavailable' });
            });
    };
}

/** The catalogues are edited by hand and rarely - ten minutes is short enough for that */
const PRODUCTS_CACHE_MS = 10 * 60 * 1000;

/** The forum counter is generated every few hours, so the same order of magnitude fits */
const FORUM_CACHE_MS = 10 * 60 * 1000;

export default function init(config: AppConfig): {
    app: Express;
    server: ServerLike | null;
} {
    const port = normalizePort(process.env.PORT || config.port || 443);

    let httpsOptions: httpsModule.ServerOptions | Record<string, never>;
    if (!config.secure) {
        httpsOptions = {};
    } else {
        httpsOptions = {
            key: fs.readFileSync(config.certs.key || `${import.meta.dirname}/certs/cert.key`),
            cert: fs.readFileSync(config.certs.cert || `${import.meta.dirname}/certs/cert.crt`),
            ca: fs.readFileSync(config.certs.chain || `${import.meta.dirname}/certs/chain.crt`),
        };
    }

    app.app.disable('x-powered-by');

    // Compress every response. Must be registered before the static handlers below,
    // otherwise the site is delivered uncompressed - nothing else in front of it does gzip.
    app.app.use(compression());

    // X\-Frame\-Options
    app.app.use((req: Request, res: Response, next: NextFunction) => {
        res.set('X-Frame-Options', 'SAMEORIGIN');
        next();
    });

    config.sites?.forEach((site: SiteConfig) => {
        console.log(`Install path ${site.route} => ${site.path}`);
        let redirects: RedirectsMap | undefined;
        if (site.redirects && fs.existsSync(site.redirects)) {
            try {
                // `require` of a JSON file - the module system has no such thing any more, and
                // reading the file says plainly what was meant by it
                redirects = JSON.parse(fs.readFileSync(site.redirects, 'utf-8')) as RedirectsMap;
            } catch (e) {
                console.error(`Cannot read ${site.redirects}: ${e}`);
            }
        }
        app.app.use(site.route, (req: Request, res: Response, next: NextFunction) => {
            if (req.url.endsWith('.html')) {
                req.url = req.url.replace(/\.html$/, '.htm');
            } else if (req.url.endsWith('/')) {
                req.url += 'index.htm';
            }

            if (redirects) {
                const name = req.url.split('?')[0].replace(/^\//, '');
                if (redirects[name]) {
                    return res.redirect(redirects[name]);
                }
            }

            if (req.url.startsWith('/.git')) {
                res.status(404).send('not found');
            } else {
                express.static(site.path)(req, res, next);
            }
        });
    });

    // CORS for adapterref
    app.app.options('/{*splat}/adapterref/{*rest}', cors());
    app.app.use('/{*splat}/adapterref/{*rest}', cors());

    // Static directory
    const publicDir = path.join(import.meta.dirname, '../..', config.public);
    console.log(`Serving ${publicDir}`);

    /*
     * The prerendered pages: the address the site is published under - not the one a request came
     * in on, or a test server would name itself as the page to index -, where the words of the
     * interface are kept, how much memory the pages may take and whether they go to disk as well.
     */
    const siteOrigin = (config.prerender?.origin || 'https://www.iobroker.net').replace(/\/+$/, '');
    const frontEndSrc = path.join(import.meta.dirname, '../../front-end/src');
    const prerenderDumpDir = config.prerender?.dumpDir
        ? path.resolve(import.meta.dirname, '../..', config.prerender.dumpDir)
        : undefined;
    // written by the pipeline step 11.snapshots - see build-lib/snapshots.mts
    const snapshotDir = path.resolve(
        import.meta.dirname,
        '../..',
        config.prerender?.snapshotDir || 'prerender-snapshots',
    );
    configurePrerender({
        maxBytes: (config.prerender?.maxCacheMB ?? 128) * 1024 * 1024,
        dumpDir: prerenderDumpDir,
        frontEndSrc: fs.existsSync(frontEndSrc) ? frontEndSrc : undefined,
        snapshotDir,
    });
    if (!fs.existsSync(frontEndSrc)) {
        console.warn(`No ${frontEndSrc} - the pages for crawlers carry no texts of the interface`);
    }
    if (prerenderDumpDir) {
        console.log(`Prerendered pages are written to ${prerenderDumpDir}`);
    }
    // a line for every page sent to a crawler - see `prerender.log` in types.d.ts
    const logCrawlers = !!config.prerender?.log;
    /*
     * `index: false`, so that a request for a directory is not answered with the index.html lying
     * in it. The start page went out that way, before the handler below ever saw it, and so was
     * the one page of the site that carried no title and no description of its own.
     */
    app.app.use(express.static(publicDir, { index: false }));
    // the stylesheets of the snapshots - named by their content, so a file never changes
    app.app.use(
        '/prerender-css',
        express.static(path.join(snapshotDir, 'css'), { index: false, immutable: true, maxAge: '365d' }),
    );

    /*
     * The snapshots to look at in a browser: /prerender-snapshots/ lists them, and
     * /prerender-snapshots/en/blog.html shows one. Opened from the disk a snapshot has no styles and
     * no pictures - they are addressed from the root of the site, and only here is that the site.
     * The scripts are left out, so what is seen is the snapshot, not the app drawing itself over it
     * again. And no search engine is to keep these as pages of their own.
     */
    app.app.use(
        '/prerender-snapshots',
        (req: Request, res: Response, next: NextFunction): void => {
            res.setHeader('X-Robots-Tag', 'noindex, nofollow');

            if (req.path === '/') {
                const manifest = readJson<{ pages?: Record<string, { file: string; renderedAt: number }> }>(
                    path.join(snapshotDir, 'manifest.json'),
                );
                const rows = Object.entries(manifest?.pages ?? {})
                    .sort(([a], [b]) => a.localeCompare(b))
                    .map(
                        ([key, entry]) =>
                            `<li><a href="/prerender-snapshots/${escapeHtml(encodeURI(entry.file))}">${escapeHtml(key)}</a> - ${new Date(entry.renderedAt).toISOString()}</li>`,
                    );
                res.type('html').send(
                    `<!doctype html><meta charset="utf-8"><title>Snapshots</title><h1>${rows.length} snapshots</h1><ul>${rows.join('')}</ul>`,
                );
                return;
            }
            // the stylesheets and the manifest are plain files
            if (!req.path.endsWith('.html')) {
                next();
                return;
            }

            let file: string;
            try {
                file = path.resolve(snapshotDir, `.${decodeURIComponent(req.path)}`);
            } catch {
                res.status(400).end();
                return;
            }
            if (!file.startsWith(path.join(snapshotDir, path.sep))) {
                res.status(404).end();
                return;
            }
            fs.readFile(file, 'utf-8', (error, html) => {
                if (error) {
                    res.status(404).type('text').send('No such snapshot');
                    return;
                }
                res.type('html').send(html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ''));
            });
        },
        express.static(snapshotDir, { index: false }),
    );

    /**
     * The pages the single page application renders itself. No file lies behind such a path, so a
     * request that reaches this point is answered with the shell and the router takes over from
     * there. Everything else (the language folders with the markdown, the JSON indexes, the icons)
     * has already been served by `express.static` above and falls through to the 404.
     *
     * The same list exists in `front-end/src/utils/routes.ts` and the two have to agree. Since the
     * router stopped hiding its routes behind a "#", this list is what decides whether reloading a
     * page works or gives a 404 - under the hash router every address reached the server as "/".
     */
    const APP_ROUTES = [
        '/',
        '/installation',
        '/adapters',
        '/blog',
        '/docs',
        '/productoverview',
        '/statistics',
        '/imprint',
        '/policy',
        // the results page; the search API answers at /api/search, so the two no longer collide
        '/search',
    ];
    const shellFile = path.join(publicDir, 'index.html');
    let shell: { mtimeMs: number; text: string } | undefined;

    app.app.get('/{*splat}', (req: Request, res: Response, next: NextFunction): void => {
        const isAppRoute = APP_ROUTES.some(route => req.path === route || req.path.startsWith(`${route}/`));
        if (!isAppRoute) {
            next();
            return;
        }

        try {
            const { mtimeMs } = fs.statSync(shellFile);
            if (shell?.mtimeMs !== mtimeMs) {
                shell = { mtimeMs, text: fs.readFileSync(shellFile, 'utf-8') };
            }

            const forCrawler = isCrawler(req.get('user-agent'));
            /*
             * The language the address names wins. Without one a crawler gets English - the page
             * hreflang calls x-default - and a visitor the language of the browser, as before. A
             * crawler used to get what `Accept-Language` asked for too; most send none, so every
             * address was English to them and German and Russian were never indexed.
             */
            const requested = isLanguage(req.query.lang) ? req.query.lang : undefined;
            const language = requested ?? (forCrawler ? DEFAULT_LANGUAGE : pickLanguage(req.get('accept-language')));

            const started = Date.now();
            const page = renderPage({
                shell: shell.text,
                pathname: req.path,
                origin: siteOrigin,
                lang: language,
                publicDir,
                forCrawler,
            });
            if (logCrawlers && forCrawler) {
                console.log(
                    `Prerender: ${crawlerName(req.get('user-agent'))} ${page.status} ${language} ${req.originalUrl} - ${page.snapshot ? 'snapshot' : 'page of the server'}${page.fromCache ? ' from the cache' : ''}, ${Math.round(Buffer.byteLength(page.html) / 1024)} KB, ${Date.now() - started} ms`,
                );
            }

            res.status(page.status);
            res.setHeader('Content-Type', 'text/html; charset=utf-8');
            // the answer differs by both, so a cache in between must not mix them up
            res.setHeader('Vary', 'Accept-Language, User-Agent');
            // what the pipeline compares before it draws the page again - see build-lib/snapshots.mts
            res.setHeader('X-Page-Version', page.version);
            const variant = forCrawler ? (page.snapshot ? 'crawler-snapshot' : 'crawler') : 'app';
            res.setHeader('X-Prerender', `${variant}-${page.fromCache ? 'hit' : 'miss'}`);
            res.send(page.html);
        } catch (error) {
            // whatever went wrong while describing the page, the shell itself still works
            console.error(`Cannot render ${req.path}: ${String(error)}`);
            res.sendFile(shellFile);
        }
    });

    /** Every page of the site in every language, with the other languages named beside each */
    app.app.get('/sitemap.xml', (_req: Request, res: Response): void => {
        try {
            res.type('application/xml').send(buildSitemap(publicDir, siteOrigin));
        } catch (error) {
            console.error(`Cannot build the sitemap: ${String(error)}`);
            res.status(500).end();
        }
    });

    // The front-end asks these three of its own server, always - the hosts behind them send no
    // CORS header, so a browser cannot reach them directly.
    app.app.get('/api/products/net', cachedProxy('https://iobroker.net/api/v1/public/products', PRODUCTS_CACHE_MS));
    /*
     * The two catalogues are two endpoints, not two hosts. `public/products` holds the adapter
     * licenses and `public/accessProducts` the access licenses (remote access, assistants), and both
     * servers answer both of them with the same bytes. This used to ask `public/products` of
     * iobroker.pro as well, on the assumption that the pro server would answer it with its own
     * catalogue - so the page got the adapter licenses twice and remote access and the assistants
     * not at all. The profile app on iobroker.pro asks for `public/accessProducts`, which is what
     * settles which name is right.
     */
    app.app.get(
        '/api/products/pro',
        cachedProxy('https://iobroker.pro/api/v1/public/accessProducts', PRODUCTS_CACHE_MS),
    );
    app.app.get('/api/iobroker/forum.json', cachedProxy('https://www.iobroker.net/data/forum.json', FORUM_CACHE_MS));
    app.app.use(bodyParser.json({ limit: 50000000, type: 'application/json' }));

    // Redirect install scripts
    app.app.get('/fix.sh', (req: Request, res: Response) => res.redirect(301, 'https://iobroker.net/fix.sh'));
    app.app.get('/install.sh', (req: Request, res: Response) => res.redirect(301, 'https://iobroker.net/install.sh'));
    app.app.get('/diag.sh', (req: Request, res: Response) => res.redirect(301, 'https://iobroker.net/diag.sh'));

    // Upload endpoint
    app.app.post('/', bruteforce, (req: Request, res: Response): void => {
        const file = (req.query as any).file as string | undefined;
        const secret = (req.query as any).secret as string | undefined;

        if (!file) {
            res.status(501).json({ error: 'no file name found' });
            return;
        }
        if (secret !== config.secret) {
            console.error(`invalid secret ${secret}`);
            res.status(401).json({ error: 'invalid secret' });
            return;
        }

        const dataDir = path.join(config.public, 'data');
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir);
        }

        const safeName = file.replace(/[^.\w]/g, '_');
        const target = path.join(dataDir, safeName);

        console.log(`upload ${target}`);
        if (req.body.html) {
            fs.writeFileSync(target, req.body.html);
        } else {
            fs.writeFileSync(target, typeof req.body === 'object' ? JSON.stringify(req.body) : req.body);
        }
        res.json({ result: 'ok' });
    });

    if (!config.secure) {
        app.app.use((req: Request, res: Response, next: NextFunction) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET');
            res.header('Access-Control-Allow-Headers', 'Content-Type');

            next();
        });
    }

    // Create HTTP(S) server
    if (!config.secure) {
        app.server = httpModule.createServer(app.app);
    } else {
        app.server = httpsModule.createServer(httpsOptions, app.app);
    }

    // Non-null assertion, as it is always assigned above
    app.server.listen(port, config.bind as any);

    app.server.on('error', error => {
        if (error.syscall !== 'listen') {
            throw error;
        }

        const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${String(port)}`;

        switch (error.code) {
            case 'EACCES':
                logger.error(`${bind} requires elevated privileges`);
                process.exit(1);
                break;
            case 'EADDRINUSE':
                logger.error(`${bind} is already in use`);
                process.exit(1);
                break;
            default:
                throw error;
        }
    });
    app.server.on('listening', () => {
        const addr = app.server!.address();
        const bind =
            typeof addr === 'string' ? `pipe ${addr}` : `port ${addr && 'port' in addr ? addr.port : 'unknown'}`;

        logger.log(`WEB Side started on ${bind}`);
    });

    return app;
}
