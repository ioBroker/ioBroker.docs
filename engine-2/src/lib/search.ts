// the package is ESM, this file is compiled to CommonJS - the types have to be resolved as ESM too
import type { Index, Meilisearch } from 'meilisearch' with { 'resolution-mode': 'import' };
import type { AppConfig, Languages, SearchConfig } from '../types';

/**
 * The site search.
 *
 * The index itself is built by the documentation pipeline (`npm run search:index`) and lives in a
 * Meilisearch instance beside this server - here only queries are made. Everything an answer needs
 * is stored in the index, so a hit costs no second lookup, and the full text never travels back:
 * only the piece cropped around the match.
 *
 * The previous engine ran in this process and split its text on spaces and punctuation. Chinese has
 * neither, so a whole sentence became one token and `zh-cn` found nothing but the latin words in
 * it. Meilisearch segments per language, tolerates typos and marks the hits itself.
 */

/**
 * What wraps a hit inside a highlighted field. Control characters, because a document could
 * otherwise write the marks itself - and because nothing that reaches the browser is HTML.
 */
const HIGHLIGHT_PRE = '\u0001';
const HIGHLIGHT_POST = '\u0002';

/** How much text is cropped around a hit, in words */
const CROP_LENGTH = 32;

const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 50;

/** Where a hit belongs. The pipeline decides this per document and stores it in the index */
export const CATEGORIES = ['docs', 'adapters', 'blog'] as const;
export type SearchCategory = (typeof CATEGORIES)[number];

/** A piece of a title or a snippet - `hit` marks what the query matched */
export interface TextPart {
    text: string;
    hit: boolean;
}

export interface SearchHit {
    /** the file below `public/<lang>/`, e.g. `admin/settings.md` */
    path: string;
    /** where the site shows it, as a route of the SPA: `/docs/admin/settings.md` */
    route: string;
    category: SearchCategory;
    /** the first segment of the path, used as the label above a group */
    section: string;
    title: TextPart[];
    snippet: TextPart[];
}

export interface SearchAnswer {
    query: string;
    language: string;
    /** how many documents match, not how many are in `results` */
    total: number;
    offset: number;
    limit: number;
    /** how many hits each category holds, whatever is filtered - for the filter bar */
    categories: Record<SearchCategory, number>;
    results: SearchHit[];
}

/** What the index of a language is called */
export function indexUid(prefix: string, lang: string): string {
    return `${prefix}_${lang}`.replace(/[^a-zA-Z0-9_-]/g, '_');
}

/**
 * Splits a field Meilisearch has marked up into its parts.
 *
 * @param value the field as it comes back, with the marks around every hit
 */
export function parseHighlighted(value: string): TextPart[] {
    const parts: TextPart[] = [];
    let rest = value;

    while (rest) {
        const start = rest.indexOf(HIGHLIGHT_PRE);
        if (start === -1) {
            parts.push({ text: rest, hit: false });
            break;
        }
        if (start > 0) {
            parts.push({ text: rest.slice(0, start), hit: false });
        }
        const end = rest.indexOf(HIGHLIGHT_POST, start);
        if (end === -1) {
            // an opening mark without its closing one - take the remainder as the hit
            parts.push({ text: rest.slice(start + HIGHLIGHT_PRE.length), hit: true });
            break;
        }
        parts.push({ text: rest.slice(start + HIGHLIGHT_PRE.length, end), hit: true });
        rest = rest.slice(end + HIGHLIGHT_POST.length);
    }

    return parts.filter(part => part.text);
}

/** The shape a document of the index has - written by `build-lib/searchIndex.mts` */
interface IndexedDocument {
    path: string;
    route: string;
    category: SearchCategory;
    section: string;
    title: string;
    text: string;
}

let settings: SearchConfig | undefined;

/**
 * The client, built on first use.
 *
 * `meilisearch` is published as ESM only while this server is compiled to CommonJS, so it cannot be
 * required. `module: Node16` leaves a dynamic import alone instead of turning it into a require,
 * which is what makes it loadable at all - and it keeps the package out of the start-up path.
 */
let clientPromise: Promise<Meilisearch> | undefined;

function getClient(): Promise<Meilisearch> | undefined {
    const host = settings?.host;
    if (!host) {
        return undefined;
    }
    clientPromise ||= import('meilisearch').then(
        module => new module.Meilisearch({ host, apiKey: settings?.searchKey || settings?.apiKey }),
    );
    return clientPromise;
}

/** The languages that have an index, so a query for anything else can be answered without asking */
let known: string[] = [];

export interface SearchOptions {
    language: string;
    query: string;
    limit?: number;
    offset?: number;
    category?: string;
}

function clampLimit(value: number | undefined): number {
    if (!value || !Number.isFinite(value) || value < 1) {
        return DEFAULT_LIMIT;
    }
    return Math.min(Math.floor(value), MAX_LIMIT);
}

function emptyCategories(): Record<SearchCategory, number> {
    return { docs: 0, adapters: 0, blog: 0 };
}

/**
 * Asks the index.
 *
 * A category filter narrows the results but not the counts above them: those have to keep saying
 * how much the other categories hold, or the filter bar could never be left again. That is why the
 * counts come from a second query that carries no filter.
 *
 * @param options what to look for, and which slice of it
 */
export async function search(options: SearchOptions): Promise<SearchAnswer> {
    const query = (options.query || '').trim();
    const limit = clampLimit(options.limit);
    const offset = Math.max(0, Math.floor(options.offset || 0));
    const category = CATEGORIES.includes(options.category as SearchCategory)
        ? (options.category as SearchCategory)
        : undefined;

    const answer: SearchAnswer = {
        query,
        language: options.language,
        total: 0,
        offset,
        limit,
        categories: emptyCategories(),
        results: [],
    };

    if (!settings || !query || !known.includes(options.language)) {
        return answer;
    }

    const client = await getClient();
    if (!client) {
        return answer;
    }

    const index: Index<IndexedDocument> = client.index<IndexedDocument>(
        indexUid(settings.indexPrefix || 'iobroker_docs', options.language),
    );

    const common = {
        attributesToHighlight: ['title', 'text'] as string[],
        attributesToCrop: ['text'] as string[],
        cropLength: CROP_LENGTH,
        highlightPreTag: HIGHLIGHT_PRE,
        highlightPostTag: HIGHLIGHT_POST,
        showMatchesPosition: false,
    };

    const [hits, counts] = await Promise.all([
        index.search(query, {
            ...common,
            limit,
            offset,
            filter: category ? `category = "${category}"` : undefined,
        }),
        // only for the numbers above the list, so nothing but the facets is asked for
        index.search(query, { limit: 0, facets: ['category'] }),
    ]);

    answer.total = hits.estimatedTotalHits ?? hits.hits.length;
    answer.categories = { ...emptyCategories(), ...(counts.facetDistribution?.category as Record<string, number>) };

    answer.results = hits.hits.map(hit => {
        const formatted = (hit as unknown as { _formatted?: Partial<IndexedDocument> })._formatted;
        return {
            path: hit.path,
            route: hit.route,
            category: hit.category,
            section: hit.section,
            title: parseHighlighted(formatted?.title || hit.title || ''),
            snippet: parseHighlighted(formatted?.text || ''),
        };
    });

    return answer;
}

export interface ExpressLikeRequest {
    query?: Record<string, unknown>;
    [key: string]: any;
}

export interface ExpressLikeResponse {
    json: (body: any) => void;
    status: (code: number) => ExpressLikeResponse;
    [key: string]: any;
}

export interface ExpressLikeApp {
    get: (path: string, handler: (req: ExpressLikeRequest, res: ExpressLikeResponse) => void) => void;
}

function firstString(value: unknown): string | undefined {
    if (typeof value === 'string') {
        return value;
    }
    return Array.isArray(value) && typeof value[0] === 'string' ? value[0] : undefined;
}

export function init(app: ExpressLikeApp, config: AppConfig): void {
    settings = config.search;
    known = config.LANGUAGES;

    clientPromise = undefined;

    if (!settings?.host) {
        // The site has to work without a search server - it just cannot answer this one route.
        console.warn('No search.host in config.json - /search will answer 503');
    } else {
        console.log(`Search: ${settings.host}, indexes ${indexUid(settings.indexPrefix || 'iobroker_docs', '<lang>')}`);
    }

    app.get('/search', (req, res) => {
        const language = firstString(req.query?.ln) || 'de';
        const query = firstString(req.query?.q) || '';

        if (!settings?.host) {
            res.status(503).json({ error: 'search-unavailable' });
            return;
        }

        search({
            language,
            query,
            limit: Number(firstString(req.query?.limit)),
            offset: Number(firstString(req.query?.offset)),
            category: firstString(req.query?.category),
        })
            .then(answer => res.json(answer))
            .catch((error: unknown) => {
                console.error(`Search for ${JSON.stringify(query)} (${language}) failed: ${String(error)}`);
                res.status(503).json({ error: 'search-unavailable' });
            });
    });
}

/** The languages the server knows about - exported for the pipeline, which builds one index each */
export type { Languages };
