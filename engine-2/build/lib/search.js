"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = init;
exports.search = search;
// typescript
// @ts-ignore
const minisearch_1 = __importDefault(require("minisearch"));
const node_path_1 = __importDefault(require("node:path"));
const node_fs_1 = __importDefault(require("node:fs"));
const utils_1 = require("./utils");
let langs = {};
let titles = {};
// Einige Bundles exportieren MiniSearch als Default, andere als Named Export.
// `as any` stellt sicher, dass der Konstruktor verwendbar ist.
const MiniSearch = minisearch_1.default.default || minisearch_1.default;
function loadDocuments(lang, dir, root, docs) {
    if (dir.endsWith('/') || dir.endsWith('\\')) {
        dir = dir.substring(0, dir.length - 1);
    }
    docs ||= [];
    root ||= dir.replace(/\\/g, '/');
    node_fs_1.default.readdirSync(dir).forEach((file) => {
        const name = node_path_1.default.join(dir, file);
        const stat = node_fs_1.default.statSync(name);
        if (stat.isDirectory()) {
            loadDocuments(lang, name, root, docs);
        }
        else if (file.match(/\.md$/)) {
            const text = node_fs_1.default.readFileSync(name).toString('utf-8');
            const headerAndBody = (0, utils_1.extractHeader)(text);
            if (!headerAndBody) {
                return;
            }
            const result = (0, utils_1.extractLicenseAndChangelog)(headerAndBody.body);
            const id = name.replace(/\\/g, '/').replace(root + '/', '');
            const title = headerAndBody.header?.title || (0, utils_1.getTitle)(result.body);
            if (title.indexOf('object') !== -1) {
                console.log(`Strange title of ${name}: ${JSON.stringify(title)}`);
            }
            titles[lang] ||= {};
            titles[lang][id] = { title };
            docs.push({ id, title, text: result.body });
        }
    });
    return docs;
}
function init(app, config) {
    langs = {};
    titles = {};
    config.LANGUAGES.forEach((lang) => {
        const documents = loadDocuments(lang, node_path_1.default.join(__dirname, '../../', config.public, lang));
        const miniSearch = new MiniSearch({
            fields: ['title', 'text'],
            searchOptions: {
                boost: { title: 2 },
                // fuzzy: 0.2
            },
        });
        miniSearch.addAll(documents);
        langs[lang] = miniSearch;
    });
    app.get('/search', (req, res) => {
        const lang = req.query?.ln || 'de';
        const q = req.query?.q || '';
        res.json(search(lang, q));
    });
}
function search(lang, text) {
    if (!langs[lang]) {
        return [{ id: 0, text: 'language unknown' }];
    }
    const mini = langs[lang];
    const rawResults = mini.search(text) || [];
    const r = rawResults.map((s) => {
        const titleInfo = (titles[lang] && titles[lang][s.id]) || {};
        // im Original: `s.title = Object.assign({}, s, titles[lang][s.id])`
        s.title = Object.assign({}, s, titleInfo);
        return s;
    });
    if (r.length > 12) {
        const l = r.length;
        r.splice(12, r.length - 1);
        r.push({ id: '...', title: l - 12 });
    }
    return r;
}
// A collection of documents for our examples
// const documents = [
//     { id: 1, title: 'Moby Dick', text: 'Call me Ishmael. Some years ago...' },
//     { id: 2, title: 'Zen and the Art of Motorcycle Maintenance', text: 'I can see by my watch...' },
//     { id: 3, title: 'Neuromancer', text: 'The sky above the port was...' },
//     { id: 4, title: 'Zen and the Art of Archery', text: 'At first sight it must seem...' },
//     // ...and more
// ]
//# sourceMappingURL=search.js.map