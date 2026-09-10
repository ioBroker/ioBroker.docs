import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkFrontmatter from 'remark-frontmatter';
import remarkRehype from 'remark-rehype';
import rehypeSanitize from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';
/**
 * The agents that get a rendered page.
 *
 * Googlebot and Bing execute JavaScript and would manage without, only slowly and not reliably;
 * the rest - the social fetchers above all - read the markup as it arrives and nothing else. The
 * list is deliberately generous: rendering a page for an agent that did not need it costs one
 * pass through the markdown, once, while missing one means that agent sees nothing.
 */
const CRAWLERS = /(googlebot|google-inspectiontool|bingbot|yandex(bot)?|duckduckbot|baiduspider|applebot|petalbot|facebookexternalhit|facebot|meta-external(agent|fetcher)|twitterbot|linkedinbot|slackbot|discordbot|whatsapp|telegrambot|ia_archiver|semrushbot|ahrefsbot)/i;
export function isCrawler(userAgent) {
    return !!userAgent && CRAWLERS.test(userAgent);
}
const LANGUAGES = ['de', 'en', 'ru'];
/**
 * The language to answer in.
 *
 * The address says nothing about it - "/adapters/pvforecast" is the page in every language, and
 * which one a visitor gets is decided in the browser out of what was stored there. A crawler has
 * no such store, so `Accept-Language` is all there is to go by, and English is the fallback.
 *
 * @param header the Accept-Language of the request
 */
export function pickLanguage(header) {
    for (const part of (header || '').split(',')) {
        const tag = part.split(';')[0].trim().toLowerCase();
        const found = LANGUAGES.find(lang => tag === lang || tag.startsWith(`${lang}-`));
        if (found) {
            return found;
        }
    }
    return 'en';
}
const jsonCache = new Map();
function readJson(file) {
    try {
        const { mtimeMs } = fs.statSync(file);
        const cached = jsonCache.get(file);
        if (cached && cached.mtimeMs === mtimeMs) {
            return cached.value;
        }
        const value = JSON.parse(fs.readFileSync(file, 'utf-8'));
        jsonCache.set(file, { mtimeMs, value });
        return value;
    }
    catch {
        return undefined;
    }
}
/** The text of a translated field, falling back through the languages that exist */
function text(value, lang) {
    if (!value) {
        return '';
    }
    if (typeof value === 'string') {
        return value;
    }
    return value[lang] || value.en || value.de || value.ru || '';
}
/** Walk a tree of pages and hand every leaf to the visitor */
function walk(root, visit) {
    Object.entries(root?.pages || {}).forEach(([key, page]) => {
        visit(key, page);
        walk(page, visit);
    });
}
function describeAdapter(publicDir, lang, slug) {
    const adapters = readJson(path.join(publicDir, 'adapters.json'));
    let found;
    walk(adapters, (key, page) => {
        if (!found && key === slug && page.content) {
            found = page;
        }
    });
    if (!found) {
        return undefined;
    }
    return {
        title: text(found.titleFull, lang) || slug,
        description: text(found.description, lang),
        file: found.content ? path.join(publicDir, lang, found.content) : undefined,
        image: found.icon ? `/${lang}/${found.icon}` : undefined,
    };
}
function describeDocument(publicDir, lang, docPath) {
    const content = readJson(path.join(publicDir, 'content.json'));
    let title = '';
    walk(content, (key, page) => {
        if (!title && page.content === docPath) {
            title = text(page.title, lang) || key;
        }
    });
    return {
        title: title || docPath.replace(/\.md$/i, ''),
        description: '',
        file: path.join(publicDir, lang, docPath),
    };
}
function describeBlogPost(publicDir, lang, id) {
    const blog = readJson(path.join(publicDir, 'blog.json'));
    const post = blog?.pages?.[id];
    if (!post) {
        return undefined;
    }
    return {
        title: text(post.title, lang) || id,
        description: text(post.desc, lang),
        file: path.join(publicDir, lang, 'blog', `${id}.md`),
    };
}
/** The pages that are not a document - their text is the interface itself */
const PLAIN_PAGES = {
    '/': { en: 'ioBroker Documentation', de: 'ioBroker Dokumentation', ru: 'Документация ioBroker' },
    '/adapters': { en: 'Adapters', de: 'Adapter', ru: 'Драйверы' },
    '/docs': { en: 'Documentation', de: 'Dokumentation', ru: 'Документация' },
    '/blog': { en: 'Blog', de: 'Blog', ru: 'Блог' },
    '/installation': { en: 'Installation', de: 'Installation', ru: 'Установка' },
    '/statistics': { en: 'Statistics', de: 'Statistik', ru: 'Статистика' },
    '/productoverview': { en: 'Products', de: 'Produkte', ru: 'Продукты' },
    '/imprint': { en: 'Imprint', de: 'Impressum', ru: 'Выходные данные' },
    '/policy': { en: 'Privacy policy', de: 'Datenschutz', ru: 'Политика конфиденциальности' },
    '/search': { en: 'Search', de: 'Suche', ru: 'Поиск' },
};
/**
 * What the address names.
 *
 * @param pathname the path of the request
 * @param lang the language to answer in
 * @param publicDir the directory the site is served from
 */
export function describePage(pathname, lang, publicDir) {
    const route = pathname.replace(/\/+$/, '') || '/';
    if (route.startsWith('/adapters/')) {
        const described = describeAdapter(publicDir, lang, decodeURIComponent(route.slice('/adapters/'.length)));
        if (described) {
            return described;
        }
    }
    else if (route.startsWith('/docs/')) {
        return describeDocument(publicDir, lang, decodeURIComponent(route.slice('/docs/'.length)));
    }
    else if (route.startsWith('/blog/')) {
        const described = describeBlogPost(publicDir, lang, decodeURIComponent(route.slice('/blog/'.length)));
        if (described) {
            return described;
        }
    }
    const plain = PLAIN_PAGES[route];
    return { title: text(plain, lang) || 'ioBroker', description: '' };
}
const markdown = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkFrontmatter, ['yaml'])
    .use(remarkRehype, { allowDangerousHtml: false })
    .use(rehypeSanitize)
    .use(rehypeStringify);
/** The document as HTML - only the text matters here, so anything unsafe is dropped */
function toHtml(source) {
    try {
        return String(markdown.processSync(source));
    }
    catch {
        return '';
    }
}
function escapeHtml(value) {
    return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
/** The first sentences of a document, for a page that brings no description of its own */
function summarise(html) {
    const text = html
        .replace(/<[^>]*>/g, ' ')
        .replace(/&[a-z]+;/gi, ' ')
        .replace(/\s+/g, ' ')
        .trim();
    return text.length > 300 ? `${text.slice(0, 297).replace(/\s+\S*$/, '')}…` : text;
}
/**
 * The pages that were built, by address and language.
 *
 * There is no time limit on them. What a page is made of only changes when the build pipeline
 * writes new files, and the hash below says exactly when that happened - a page that did not
 * change keeps the version that was built for it, however long ago that was. A limit on time
 * would only mean throwing away work that is still correct, and after every run of the pipeline
 * the files are rewritten whether their content changed or not, so a date says nothing anyway.
 */
const pageCache = new Map();
/** Beyond this the oldest entries go - the site has some 3000 addresses in three languages */
const MAX_PAGES = 4000;
function hashOf(parts) {
    const hash = crypto.createHash('sha256');
    parts.forEach(part => hash.update(part ?? ' '));
    return hash.digest('base64');
}
/**
 * The page for a request, with the head filled in - and, for a crawler, with the text in it.
 *
 * A visitor gets the shell as before, only with a title and a description that name this page:
 * putting the text in as well would show it for the moment it takes React to start and then have
 * it replaced, which is a flicker for nothing. A crawler gets the text, because for it there is no
 * moment after.
 *
 * @param shell the contents of index.html
 * @param pathname the path of the request
 * @param origin scheme and host the request came in on, for the addresses in the head
 * @param lang the language to answer in
 * @param publicDir the directory the site is served from
 * @param forCrawler whether to put the text of the document into the page
 * @returns the page, and whether it was already built
 */
export function renderPage(shell, pathname, origin, lang, publicDir, forCrawler) {
    const page = describePage(pathname, lang, publicDir);
    let source;
    if (page.file) {
        try {
            source = fs.readFileSync(page.file, 'utf-8');
        }
        catch {
            source = undefined;
        }
    }
    const key = `${lang}|${forCrawler ? 'bot' : 'app'}|${pathname}`;
    const hash = hashOf([shell, page.title, page.description, page.image, source]);
    const cached = pageCache.get(key);
    if (cached?.hash === hash) {
        return { html: cached.html, fromCache: true };
    }
    const body = source ? toHtml(source) : '';
    const description = page.description || (body ? summarise(body) : '');
    const canonical = `${origin}${pathname.replace(/\/+$/, '') || '/'}`;
    const title = page.title.includes('ioBroker') ? page.title : `${page.title} | ioBroker`;
    const head = [
        `<meta name="description" content="${escapeHtml(description)}">`,
        `<link rel="canonical" href="${escapeHtml(canonical)}">`,
        `<meta property="og:type" content="article">`,
        `<meta property="og:title" content="${escapeHtml(title)}">`,
        `<meta property="og:description" content="${escapeHtml(description)}">`,
        `<meta property="og:url" content="${escapeHtml(canonical)}">`,
        page.image ? `<meta property="og:image" content="${escapeHtml(origin + page.image)}">` : '',
        `<meta name="twitter:card" content="summary">`,
    ]
        .filter(Boolean)
        .join('\n        ');
    let html = shell.replace(/<title>[^<]*<\/title>/i, `<title>${escapeHtml(title)}</title>`);
    if (!/<title>/i.test(html)) {
        html = html.replace('</head>', `    <title>${escapeHtml(title)}</title>\n</head>`);
    }
    html = html.replace('</head>', `    ${head}\n    </head>`);
    if (forCrawler && body) {
        // React replaces whatever stands in the container when it mounts, so this is only ever
        // seen by something that does not run it
        html = html.replace('<div id="root"></div>', `<div id="root">${body}</div>`);
    }
    if (pageCache.size >= MAX_PAGES) {
        const oldest = pageCache.keys().next().value;
        if (oldest !== undefined) {
            pageCache.delete(oldest);
        }
    }
    pageCache.set(key, { hash, html });
    return { html, fromCache: false };
}
/** How many pages are held - for the log line on startup and for the tests */
export function cachedPageCount() {
    return pageCache.size;
}
//# sourceMappingURL=prerender.js.map