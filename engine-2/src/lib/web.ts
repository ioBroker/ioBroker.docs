'use strict';

import fs from 'node:fs';
import path from 'node:path';
import httpModule from 'node:http';
import httpsModule from 'node:https';
import express, { Express, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { rateLimit } from 'express-rate-limit';

import Logger from './logger';
import { AppConfig } from '../types';

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
            key: fs.readFileSync(config.certs.key || `${__dirname}/certs/cert.key`),
            cert: fs.readFileSync(config.certs.cert || `${__dirname}/certs/cert.crt`),
            ca: fs.readFileSync(config.certs.chain || `${__dirname}/certs/chain.crt`),
        };
    }

    app.app.disable('x-powered-by');

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
                    redirects = require(site.redirects) as RedirectsMap;
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
    const publicDir = path.join(__dirname, '../..', config.public);
    console.log(`Serving ${publicDir}`);
    app.app.use(express.static(publicDir));

    /**
     * The paths the single page application renders itself. No file lies behind them, so a
     * request that reaches this point - an entry from outside, a reload, a shared link -
     * is answered with the shell and the router in the browser takes it from there.
     * Everything else (the language folders with the markdown, the JSON indexes, the icons)
     * has already been served by `express.static` above and falls through to the 404.
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
    ];
    app.app.get('/{*splat}', (req: Request, res: Response, next: NextFunction): void => {
        const isAppRoute = APP_ROUTES.some(route => req.path === route || req.path.startsWith(`${route}/`));
        if (isAppRoute) {
            res.sendFile(path.join(publicDir, 'index.html'));
        } else {
            next();
        }
    });

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
        if ((req.body as any).html) {
            fs.writeFileSync(target, (req.body as any).html);
        } else {
            fs.writeFileSync(target, typeof req.body === 'object' ? JSON.stringify(req.body) : (req.body as any));
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
    app.server!.listen(port, config.bind as any);

    app.server!.on('error', error => {
        if ((error as any).syscall !== 'listen') {
            throw error;
        }

        const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${String(port)}`;

        switch ((error as any).code) {
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
    app.server!.on('listening', () => {
        const addr = app.server!.address();
        const bind =
            typeof addr === 'string' ? `pipe ${addr}` : `port ${addr && 'port' in addr ? addr.port : 'unknown'}`;

        logger.log(`WEB Side started on ${bind}`);
    });

    return app;
}
