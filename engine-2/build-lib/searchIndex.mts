import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';

import { Meilisearch, type Index } from 'meilisearch';

import * as utils from './utils.mts';
import * as consts from './consts.mts';
import type { LanguageCode } from './types.mts';

/**
 * Fills the search index.
 *
 * The index is not built by the web server: it reads what stands here. This step runs after the
 * markdown has been copied into `front-end/public/<lang>/` (step 8), walks that tree and hands
 * every document to Meilisearch - one index per language, because the segmentation of Chinese has
 * nothing to do with the stemming of Russian.
 *
 * Every index is written under a temporary name and then swapped in. A rebuild therefore never
 * leaves the site with half an index: until the swap the old one answers, after it the new one.
 */

/** Where a hit belongs. The same three the server and the front-end know */
type SearchCategory = 'docs' | 'adapters' | 'blog';

interface SearchDocument {
    /** Meilisearch only allows [a-zA-Z0-9_-] here, and paths are none of that - so a digest */
    id: string;
    path: string;
    route: string;
    category: SearchCategory;
    section: string;
    title: string;
    text: string;
}

/**
 * Which language a field is written in.
 *
 * Meilisearch guesses this per document, and guesses badly on short texts - a German heading of
 * three words has been taken for Danish. Naming the language makes the segmentation deterministic,
 * and for Chinese it is what makes the difference between words and one long sentence.
 */
const LOCALES: Record<string, string> = {
    de: 'deu',
    en: 'eng',
    ru: 'rus',
    'zh-cn': 'cmn',
};

/** Documents per request. Large enough to be few requests, small enough to stay under the body limit */
const BATCH_SIZE = 200;

/** Indexing a language takes a while - the default would give up while Meilisearch is still working */
const WAIT = { timeout: 300000 } as const;

/** What the index of a language is called. The server builds the same name in `src/lib/search.ts` */
export function indexUid(prefix: string, lang: string): string {
    return `${prefix}_${lang}`.replace(/[^a-zA-Z0-9_-]/g, '_');
}

/** The two legal texts are pages of their own, everything else below `public/<lang>` is documentation */
const LEGAL_ROUTES: Record<string, string> = {
    'imprint.md': '/imprint',
    'privacy.md': '/policy',
};

/**
 * Markdown with everything taken out that nobody searches for.
 *
 * What stays is the prose and the code - somebody looking for a state name or a config key must
 * find it. What goes are the pieces that only carry markup: images, link targets, HTML, the
 * frontmatter badges, the table pipes and the heading hashes.
 *
 * @param markdown the body of a document, without its header
 */
export function toPlainText(markdown: string): string {
    return (
        markdown
            // fenced code keeps its content, loses its fence and the language
            .replace(/^```[^\n]*$/gm, ' ')
            .replace(/^~~~[^\n]*$/gm, ' ')
            // images carry a file name nobody searches for, links keep their text
            .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
            .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
            // reference style links and the definitions below them
            .replace(/^\s*\[[^\]]+\]:\s*\S+.*$/gm, ' ')
            .replace(/<[^>\n]{1,200}>/g, ' ')
            .replace(/^\s*[*+-]\s+/gm, ' ')
            .replace(/^\s*#{1,6}\s*/gm, ' ')
            .replace(/^\s*>\s?/gm, ' ')
            .replace(/[|*_`~]/g, ' ')
            .replace(/\s+/g, ' ')
            .trim()
    );
}

/**
 * Where the site shows a document, and what kind of page that is.
 *
 * @param docPath the file below `public/<lang>/`, with forward slashes
 */
export function describe(docPath: string): { route: string; category: SearchCategory; section: string } {
    const adapter = /^adapterref\/iobroker\.([^/]+)\/(.+)$/.exec(docPath);
    if (adapter) {
        const [, name, rest] = adapter;
        return {
            // the adapter page shows the readme; everything else beside it is read as a document
            route: rest === 'README.md' ? `/adapters/${name}` : `/docs/${docPath}`,
            category: 'adapters',
            section: name,
        };
    }

    const blog = /^blog\/([^/]+)\.md$/.exec(docPath);
    if (blog) {
        return { route: `/blog/${blog[1]}`, category: 'blog', section: 'blog' };
    }

    if (LEGAL_ROUTES[docPath]) {
        return { route: LEGAL_ROUTES[docPath], category: 'docs', section: '' };
    }

    if (docPath === 'README.md') {
        return { route: '/docs', category: 'docs', section: '' };
    }

    const [first] = docPath.split('/');
    return { route: `/docs/${docPath}`, category: 'docs', section: docPath.includes('/') ? first : '' };
}

/** Reads one language out of `front-end/public/` */
export function collectDocuments(lang: LanguageCode): SearchDocument[] {
    const root = `${consts.FRONT_END_DIR}${lang}`;
    if (!fs.existsSync(root)) {
        console.error(`!!!! No documents for ${lang}: ${root} does not exist`);
        return [];
    }

    const documents: SearchDocument[] = [];

    for (const file of utils.getAllFiles(root, true)) {
        const docPath = path.relative(root, file).replace(/\\/g, '/');
        const raw = fs.readFileSync(file, 'utf8');
        const { header, body } = utils.extractHeader(raw);
        // the licence and the changelog of an adapter are a wall of versions - they drown
        // every other hit of that adapter, and nobody searches a readme for them
        const { body: withoutAppendix } = utils.extractLicenseAndChangelog(body);
        const text = toPlainText(withoutAppendix);
        if (!text) {
            continue;
        }

        const title = header?.title || utils.getTitle(raw) || docPath;
        documents.push({
            id: createHash('sha1').update(`${lang}/${docPath}`).digest('hex'),
            path: docPath,
            title,
            text,
            ...describe(docPath),
        });
    }

    return documents;
}

/** What every index is set to before the documents go in */
async function applySettings(index: Index<SearchDocument>, lang: LanguageCode): Promise<void> {
    await index
        .updateSettings({
            // the order matters: a hit in the title outranks one in the text
            searchableAttributes: ['title', 'text'],
            filterableAttributes: ['category', 'section'],
            // the full text must not travel back - the server only needs the cropped piece around a hit
            displayedAttributes: ['path', 'route', 'category', 'section', 'title'],
            localizedAttributes: [{ attributePatterns: ['*'], locales: [LOCALES[lang] || 'eng'] }],
            typoTolerance: {
                enabled: true,
                // "vis" and "iot" are words here, and two letters apart from a dozen others
                minWordSizeForTypos: { oneTypo: 5, twoTypos: 9 },
            },
        })
        .waitTask(WAIT);
}

/**
 * Writes the index of one language and swaps it in.
 *
 * @param client the Meilisearch to write to
 * @param prefix what the indexes are called, `<prefix>_<lang>`
 * @param lang the language to build
 */
async function buildLanguage(client: Meilisearch, prefix: string, lang: LanguageCode): Promise<number> {
    const live = indexUid(prefix, lang);
    const staging = `${live}_building`;

    const documents = collectDocuments(lang);
    if (!documents.length) {
        console.error(`!!!! ${lang}: nothing to index, the index is left as it is`);
        return 0;
    }

    // a leftover from a run that did not finish would otherwise be added to
    await client.deleteIndexIfExists(staging);
    await client.createIndex(staging, { primaryKey: 'id' }).waitTask(WAIT);

    const index = client.index<SearchDocument>(staging);
    await applySettings(index, lang);

    for (let i = 0; i < documents.length; i += BATCH_SIZE) {
        await index.addDocuments(documents.slice(i, i + BATCH_SIZE)).waitTask(WAIT);
    }

    // A swap needs two sides. On the very first run there is nothing to swap with yet, so an empty
    // index is put there first - after the swap it is the one that gets thrown away.
    const exists = await client.getIndex(live).then(
        () => true,
        () => false,
    );
    if (!exists) {
        await client.createIndex(live, { primaryKey: 'id' }).waitTask(WAIT);
    }

    await client.swapIndexes([{ indexes: [staging, live], rename: false }]).waitTask(WAIT);
    await client.deleteIndexIfExists(staging);

    return documents.length;
}

interface SearchSettings {
    host?: string;
    apiKey?: string;
    searchKey?: string;
    indexPrefix?: string;
}

/** The search block of `config.json`, if there is one */
function readSettings(): SearchSettings | undefined {
    const file = path.normalize(`${import.meta.dirname}/../config.json`);
    if (!fs.existsSync(file)) {
        return undefined;
    }
    try {
        return (JSON.parse(fs.readFileSync(file, 'utf8')) as { search?: SearchSettings }).search;
    } catch (error) {
        console.error(`Cannot read ${file}: ${error}`);
        return undefined;
    }
}

/** Builds the index of every language */
export async function buildSearchIndex(): Promise<void> {
    const settings = readSettings();
    if (!settings?.host) {
        console.error('!!!! No "search.host" in config.json - the search index was not built');
        return;
    }

    if (!settings.apiKey) {
        // isHealthy() below needs no key at all, so without this the run would only fall over
        // when it writes - with a 401 that says nothing about which of the two keys is missing
        console.error('!!!! No "search.apiKey" in config.json - writing the index needs the admin key');
        return;
    }

    const prefix = settings.indexPrefix || 'iobroker_docs';
    const client = new Meilisearch({ host: settings.host, apiKey: settings.apiKey });

    if (!(await client.isHealthy())) {
        throw new Error(`Meilisearch at ${settings.host} does not answer`);
    }

    for (const lang of consts.LANGUAGES) {
        const count = await buildLanguage(client, prefix, lang);
        console.log(`Search index ${prefix}_${lang}: ${count} documents`);
    }
}

if (process.argv[1] === import.meta.filename) {
    buildSearchIndex().catch((error: unknown) => {
        console.error(error);
        process.exit(1);
    });
}
