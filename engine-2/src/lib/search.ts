// typescript
import MiniSearchModule from 'minisearch';
import path from 'node:path';
import fs from 'node:fs';
import { getTitle, extractLicenseAndChangelog, extractHeader } from './utils';
import type { AppConfig } from '../types';

type Doc = {
    id: string;
    title: string;
    text: string;
};

type TitleEntry = { title: string };
type TitlesMap = Record<string, Record<string, TitleEntry>>;

// MiniSearch has no clear constructor signature depending on the build, hence `any`.
type MiniSearchInstance = any;
type LangsMap = Record<string, MiniSearchInstance>;

let langs: LangsMap = {};
let titles: TitlesMap = {};

// Some bundles export MiniSearch as the default, others as a named export.
// `as any` ensures the constructor can be used.
const MiniSearch: any = (MiniSearchModule as any).default || (MiniSearchModule as any);

function loadDocuments(lang: string, dir: string, root?: string, docs?: Doc[]): Doc[] {
    if (dir.endsWith('/') || dir.endsWith('\\')) {
        dir = dir.substring(0, dir.length - 1);
    }

    docs ||= [];
    root ||= dir.replace(/\\/g, '/');

    fs.readdirSync(dir).forEach((file: string) => {
        const name = path.join(dir, file);
        const stat = fs.statSync(name);
        if (stat.isDirectory()) {
            loadDocuments(lang, name, root, docs);
        } else if (file.match(/\.md$/)) {
            const text = fs.readFileSync(name).toString('utf-8');
            const headerAndBody = extractHeader(text);
            if (!headerAndBody) {
                return;
            }
            const result = extractLicenseAndChangelog(headerAndBody.body);

            const id = name.replace(/\\/g, '/').replace(`${root}/`, '');
            const title: string = headerAndBody.header?.title || getTitle(result.body);
            if (title.includes('object')) {
                console.log(`Strange title of ${name}: ${JSON.stringify(title)}`);
            }
            titles[lang] ||= {};
            titles[lang][id] = { title };
            docs.push({ id, title, text: result.body });
        }
    });

    return docs;
}

export interface ExpressLikeRequest {
    query?: {
        ln?: string;
        q?: string;
        [key: string]: any;
    };
    [key: string]: any;
}

export interface ExpressLikeResponse {
    json: (body: any) => void;
    [key: string]: any;
}

export interface ExpressLikeApp {
    get: (path: string, handler: (req: ExpressLikeRequest, res: ExpressLikeResponse) => void) => void;
}

export function init(app: ExpressLikeApp, config: AppConfig): void {
    langs = {};
    titles = {};

    config.LANGUAGES.forEach((lang: string) => {
        const documents = loadDocuments(lang, path.join(__dirname, '../../', config.public, lang));
        const miniSearch: MiniSearchInstance = new MiniSearch({
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

// Result type for `search`
export type SearchResult = {
    id: string | number;
    title?: any;
    [key: string]: any;
};

export function search(lang: string, text: string): SearchResult[] {
    if (!langs[lang]) {
        return [{ id: 0, text: 'language unknown' }];
    }

    const mini: MiniSearchInstance = langs[lang];
    const rawResults: any[] = mini.search(text) || [];

    const r: SearchResult[] = rawResults.map((s: any) => {
        const titleInfo = (titles[lang] && titles[lang][s.id as string]) || ({} as TitleEntry);
        // Originally: `s.title = Object.assign({}, s, titles[lang][s.id])`
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
