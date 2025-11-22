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
const cors_1 = __importDefault(require("cors"));
const express_brute_1 = __importDefault(require("express-brute"));
const logger_1 = __importDefault(require("./logger"));
// HTTP(S) Modul je nach `secure`
const logger = new logger_1.default();
const ExpressBrute = express_brute_1.default.default || express_brute_1.default;
// Bruteforce\-Schutz
const bruteforce = new ExpressBrute(new ExpressBrute.MemoryStore(), {
    freeRetries: 5,
});
const app = {
    app: (0, express_1.default)(),
    server: null,
};
// Port normalisieren
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
    // X\-Frame\-Options
    app.app.use((req, res, next) => {
        res.set('X-Frame-Options', 'SAMEORIGIN');
        next();
    });
    if (config.sites) {
        config.sites.forEach((site) => {
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
    }
    // CORS für adapterref
    app.app.options('/*/adapterref/*', (0, cors_1.default)());
    app.app.use('/*/adapterref/*', (0, cors_1.default)());
    // Statisches Verzeichnis
    console.log(`Serving ${node_path_1.default.join(__dirname, '../..', config.public)}`);
    app.app.use(express_1.default.static(node_path_1.default.join(__dirname, '../..', config.public)));
    app.app.use(body_parser_1.default.json({ limit: 50000000, type: 'application/json' }));
    // Redirect install scripts
    app.app.get('/fix.sh', (req, res) => res.redirect(301, 'https://iobroker.net/fix.sh'));
    app.app.get('/install.sh', (req, res) => res.redirect(301, 'https://iobroker.net/install.sh'));
    app.app.get('/diag.sh', (req, res) => res.redirect(301, 'https://iobroker.net/diag.sh'));
    // Upload\-Endpoint
    // @ts-expect-error
    app.app.post('/', bruteforce.prevent, (req, res) => {
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
        req.brute.reset(() => {
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
    });
    if (!config.secure) {
        app.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET');
            res.header('Access-Control-Allow-Headers', 'Content-Type');
            next();
        });
    }
    // HTTP(S)\-Server erstellen
    if (!config.secure) {
        app.server = node_http_1.default.createServer(app.app);
    }
    else {
        app.server = node_https_1.default.createServer(httpsOptions, app.app);
    }
    // Non\-null Assertion, da nach oben immer gesetzt
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