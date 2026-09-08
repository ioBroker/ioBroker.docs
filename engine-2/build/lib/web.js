'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = init;
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const node_http_1 = __importDefault(require("node:http"));
const node_https_1 = __importDefault(require("node:https"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const express_rate_limit_1 = require("express-rate-limit");
const logger_1 = __importDefault(require("./logger"));
// HTTP(S) module depending on `secure`
const logger = new logger_1.default();
// Brute-force protection
// `skipSuccessfulRequests` replaces the former `req.brute.reset()`: only responses >= 400 count.
const bruteforce = (0, express_rate_limit_1.rateLimit)({
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
const app = {
    app: (0, express_1.default)(),
    server: null,
};
// Normalize port
function normalizePort(val) {
    const port = parseInt(String(val), 10);
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
}
function httpGet(url) {
    return new Promise((resolve, reject) => {
        const lib = url.startsWith('https') ? node_https_1.default : node_http_1.default;
        const request = lib.get(url, (response) => {
            if (response.statusCode < 200 || response.statusCode > 299) {
                reject(new Error(`Failed to load page, status code: ${response.statusCode}`));
            }
            const body = [];
            response.on('data', (chunk) => body.push(chunk));
            response.on('end', () => resolve(Buffer.concat(body).toString()));
        });
        request.on('error', (err) => reject(err));
    });
}
function init(config) {
    const port = normalizePort(process.env.PORT || config.port || 443);
    let httpsOptions;
    if (!config.secure) {
        httpsOptions = {};
    }
    else {
        httpsOptions = {
            key: node_fs_1.default.readFileSync(config.certs.key || `${__dirname}/certs/cert.key`),
            cert: node_fs_1.default.readFileSync(config.certs.cert || `${__dirname}/certs/cert.crt`),
            ca: node_fs_1.default.readFileSync(config.certs.chain || `${__dirname}/certs/chain.crt`),
        };
    }
    app.app.disable('x-powered-by');
    // Compress every response. Must be registered before the static handlers below,
    // otherwise the site is delivered uncompressed - nothing else in front of it does gzip.
    app.app.use((0, compression_1.default)());
    // X\-Frame\-Options
    app.app.use((req, res, next) => {
        res.set('X-Frame-Options', 'SAMEORIGIN');
        next();
    });
    config.sites?.forEach((site) => {
        console.log(`Install path ${site.route} => ${site.path}`);
        let redirects;
        if (site.redirects && node_fs_1.default.existsSync(site.redirects)) {
            try {
                redirects = require(site.redirects);
            }
            catch (e) {
                console.error(`Cannot read ${site.redirects}: ${e}`);
            }
        }
        app.app.use(site.route, (req, res, next) => {
            if (req.url.endsWith('.html')) {
                req.url = req.url.replace(/\.html$/, '.htm');
            }
            else if (req.url.endsWith('/')) {
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
            }
            else {
                express_1.default.static(site.path)(req, res, next);
            }
        });
    });
    // CORS for adapterref
    app.app.options('/{*splat}/adapterref/{*rest}', (0, cors_1.default)());
    app.app.use('/{*splat}/adapterref/{*rest}', (0, cors_1.default)());
    // Static directory
    const publicDir = node_path_1.default.join(__dirname, '../..', config.public);
    console.log(`Serving ${publicDir}`);
    app.app.use(express_1.default.static(publicDir));
    /**
     * The pages the single page application renders itself. It addresses them as
     * "/#/adapters", but they are linked from outside as plain "/adapters", and no file
     * lies behind such a path. A request that reaches this point is therefore answered
     * with the shell, which puts the path behind the "#" and lets the router take over.
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
    app.app.get('/{*splat}', (req, res, next) => {
        const isAppRoute = APP_ROUTES.some(route => req.path === route || req.path.startsWith(`${route}/`));
        if (isAppRoute) {
            res.sendFile(node_path_1.default.join(publicDir, 'index.html'));
        }
        else {
            next();
        }
    });
    app.app.get('/api/products/net', (_req, res) => {
        httpGet('https://iobroker.net:3001/api/v1/public/products')
            .then(data => {
            res.setHeader('Content-Type', 'application/json');
            res.send(data);
        })
            .catch(err => {
            console.error(`Error fetching products: ${err}`);
            res.status(500).send('Error fetching products');
        });
    });
    app.app.get('/api/products/pro', (_req, res) => {
        httpGet('https://iobroker.pro:3001/api/v1/public/products')
            .then(data => {
            res.setHeader('Content-Type', 'application/json');
            res.send(data);
        })
            .catch(err => {
            console.error(`Error fetching products: ${err}`);
            res.status(500).send('Error fetching products');
        });
    });
    app.app.get('/api/iobroker/forum.json', (_req, res) => {
        httpGet('https://www.iobroker.net/data/forum.json')
            .then(data => {
            res.setHeader('Content-Type', 'application/json');
            res.send(data);
        })
            .catch(err => {
            console.error(`Error fetching products: ${err}`);
            res.status(500).send('Error fetching products');
        });
    });
    app.app.use(body_parser_1.default.json({ limit: 50000000, type: 'application/json' }));
    // Redirect install scripts
    app.app.get('/fix.sh', (req, res) => res.redirect(301, 'https://iobroker.net/fix.sh'));
    app.app.get('/install.sh', (req, res) => res.redirect(301, 'https://iobroker.net/install.sh'));
    app.app.get('/diag.sh', (req, res) => res.redirect(301, 'https://iobroker.net/diag.sh'));
    // Upload endpoint
    app.app.post('/', bruteforce, (req, res) => {
        const file = req.query.file;
        const secret = req.query.secret;
        if (!file) {
            res.status(501).json({ error: 'no file name found' });
            return;
        }
        if (secret !== config.secret) {
            console.error(`invalid secret ${secret}`);
            res.status(401).json({ error: 'invalid secret' });
            return;
        }
        const dataDir = node_path_1.default.join(config.public, 'data');
        if (!node_fs_1.default.existsSync(dataDir)) {
            node_fs_1.default.mkdirSync(dataDir);
        }
        const safeName = file.replace(/[^.\w]/g, '_');
        const target = node_path_1.default.join(dataDir, safeName);
        console.log(`upload ${target}`);
        if (req.body.html) {
            node_fs_1.default.writeFileSync(target, req.body.html);
        }
        else {
            node_fs_1.default.writeFileSync(target, typeof req.body === 'object' ? JSON.stringify(req.body) : req.body);
        }
        res.json({ result: 'ok' });
    });
    if (!config.secure) {
        app.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET');
            res.header('Access-Control-Allow-Headers', 'Content-Type');
            next();
        });
    }
    // Create HTTP(S) server
    if (!config.secure) {
        app.server = node_http_1.default.createServer(app.app);
    }
    else {
        app.server = node_https_1.default.createServer(httpsOptions, app.app);
    }
    // Non-null assertion, as it is always assigned above
    app.server.listen(port, config.bind);
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
        const addr = app.server.address();
        const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr && 'port' in addr ? addr.port : 'unknown'}`;
        logger.log(`WEB Side started on ${bind}`);
    });
    return app;
}
//# sourceMappingURL=web.js.map