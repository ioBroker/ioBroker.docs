"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CATEGORIES = void 0;
exports.indexUid = indexUid;
exports.parseHighlighted = parseHighlighted;
exports.search = search;
exports.init = init;
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
exports.CATEGORIES = ['docs', 'adapters', 'blog'];
/** What the index of a language is called */
function indexUid(prefix, lang) {
    return `${prefix}_${lang}`.replace(/[^a-zA-Z0-9_-]/g, '_');
}
/**
 * Splits a field Meilisearch has marked up into its parts.
 *
 * @param value the field as it comes back, with the marks around every hit
 */
function parseHighlighted(value) {
    const parts = [];
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
let settings;
/**
 * The client, built on first use.
 *
 * `meilisearch` is published as ESM only while this server is compiled to CommonJS, so it cannot be
 * required. `module: Node16` leaves a dynamic import alone instead of turning it into a require,
 * which is what makes it loadable at all - and it keeps the package out of the start-up path.
 */
let clientPromise;
function getClient() {
    const host = settings?.host;
    if (!host) {
        return undefined;
    }
    clientPromise ||= import('meilisearch').then(module => new module.Meilisearch({ host, apiKey: settings?.searchKey || settings?.apiKey }));
    return clientPromise;
}
/** The languages that have an index, so a query for anything else can be answered without asking */
let known = [];
function clampLimit(value) {
    if (!value || !Number.isFinite(value) || value < 1) {
        return DEFAULT_LIMIT;
    }
    return Math.min(Math.floor(value), MAX_LIMIT);
}
function emptyCategories() {
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
async function search(options) {
    const query = (options.query || '').trim();
    const limit = clampLimit(options.limit);
    const offset = Math.max(0, Math.floor(options.offset || 0));
    const category = exports.CATEGORIES.includes(options.category)
        ? options.category
        : undefined;
    const answer = {
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
    const index = client.index(indexUid(settings.indexPrefix || 'iobroker_docs', options.language));
    const common = {
        attributesToHighlight: ['title', 'text'],
        attributesToCrop: ['text'],
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
    answer.categories = { ...emptyCategories(), ...counts.facetDistribution?.category };
    answer.results = hits.hits.map(hit => {
        const formatted = hit._formatted;
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
function firstString(value) {
    if (typeof value === 'string') {
        return value;
    }
    return Array.isArray(value) && typeof value[0] === 'string' ? value[0] : undefined;
}
function init(app, config) {
    settings = config.search;
    known = config.LANGUAGES;
    clientPromise = undefined;
    if (!settings?.host) {
        // The site has to work without a search server - it just cannot answer this one route.
        console.warn('No search.host in config.json - /api/search will answer 503');
    }
    else {
        console.log(`Search: ${settings.host}, indexes ${indexUid(settings.indexPrefix || 'iobroker_docs', '<lang>')}`);
    }
    // `/api/search`, not `/search`: the app has a page of that name, and once the router stopped
    // putting its routes behind a "#" the two would have collided - whoever registered first would
    // have answered, and the other would have been unreachable. The `/api/` prefix is the one the
    // product catalogues already use.
    app.get('/api/search', (req, res) => {
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
            .catch((error) => {
            console.error(`Search for ${JSON.stringify(query)} (${language}) failed: ${String(error)}`);
            res.status(503).json({ error: 'search-unavailable' });
        });
    });
}
//# sourceMappingURL=search.js.map