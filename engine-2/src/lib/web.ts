'use strict';

import fs from 'node:fs';
import path from 'node:path';
import httpModule from 'node:http';
import httpsModule from 'node:https';
import type { Express, Request, Response, NextFunction } from 'express';
import express from 'express';
import { isCrawler, pickLanguage, renderPage } from './prerender.js';
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
    app.app.use(express.static(publicDir));

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
            const language = pickLanguage(req.get('accept-language'));
            const origin = `${req.protocol}://${req.get('host') ?? 'www.iobroker.net'}`;

            const page = renderPage(shell.text, req.path, origin, language, publicDir, forCrawler);

            res.setHeader('Content-Type', 'text/html; charset=utf-8');
            // the answer differs by both, so a cache in between must not mix them up
            res.setHeader('Vary', 'Accept-Language, User-Agent');
            res.setHeader('X-Prerender', `${forCrawler ? 'crawler' : 'app'}-${page.fromCache ? 'hit' : 'miss'}`);
            res.send(page.html);
        } catch (error) {
            // whatever went wrong while describing the page, the shell itself still works
            console.error(`Cannot render ${req.path}: ${String(error)}`);
            res.sendFile(shellFile);
        }
    });
    // The front-end asks these three of its own server, always - the hosts behind them send no
    // CORS header, so a browser cannot reach them directly.
    app.app.get(
        '/api/products/net',
        cachedProxy('https://iobroker.net:3001/api/v1/public/products', PRODUCTS_CACHE_MS),
    );
    app.app.get(
        '/api/products/pro',
        cachedProxy('https://iobroker.pro:3001/api/v1/public/products', PRODUCTS_CACHE_MS),
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
