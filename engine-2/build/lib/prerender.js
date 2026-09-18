import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkFrontmatter from 'remark-frontmatter';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';
import { crawlerBody } from './crawlerPages.js';
import { LANGUAGES, contentVersionOf, documentTitle, escapeHtml, readJson, text, versionOf, walk, withLanguage, } from './siteData.js';
/**
 * What the page is, in the form a search engine reads as data.
 *
 * JSON-LD, written into the head and - unlike everything else the server writes there - kept when
 * the app starts: `main.tsx` takes out `[data-prerender]`, and this carries `data-structured-data`
 * instead, so a search engine that runs the app still finds it. A reader who walks on to the next
 * page keeps the block of the page they came in through; nothing reads it but a crawler, and a
 * crawler fetches every address of its own.
 *
 * The site itself and who is behind it stand on the start page; every other kind of page says
 * what it is and where it sits in the site.
 */
function structuredData(kind, route, lang, origin, title, description, picture, entry, day) {
    const url = `${origin}${withLanguage(route, lang)}`;
    const name = title.replace(/ \| ioBroker$/, '');
    const publisher = {
        '@type': 'Organization',
        name: 'ioBroker',
        url: `${origin}/`,
        logo: `${origin}/brand/iobroker-bildmarke-512.png`,
    };
    const blocks = [];
    if (route === '/') {
        blocks.push({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'ioBroker',
            url: `${origin}/`,
            logo: `${origin}/brand/iobroker-bildmarke-512.png`,
            description,
            sameAs: [
                'https://github.com/ioBroker',
                'https://forum.iobroker.net/',
                'https://www.facebook.com/iobroker1/',
                'https://www.instagram.com/iobroker.gmbh/',
            ],
        });
        blocks.push({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'ioBroker',
            url: `${origin}/`,
            inLanguage: lang,
            potentialAction: {
                '@type': 'SearchAction',
                target: {
                    '@type': 'EntryPoint',
                    urlTemplate: `${origin}/search?q={search_term_string}`,
                },
                'query-input': 'required name=search_term_string',
            },
        });
    }
    else if (kind === 'adapter') {
        const adapter = entry;
        blocks.push({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name,
            url,
            description,
            applicationCategory: 'UtilitiesApplication',
            applicationSubCategory: 'ioBroker adapter',
            operatingSystem: 'Linux, Windows, macOS, Docker',
            softwareVersion: adapter?.latestVersion,
            author: adapter?.authors
                ? { '@type': 'Person', name: adapter.authors.replace(/\s*<[^>]*>/g, '') }
                : undefined,
            license: adapter?.license,
            image: picture,
            inLanguage: lang,
            publisher,
        });
    }
    else if (kind === 'post') {
        blocks.push({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: name,
            url,
            description,
            image: picture,
            datePublished: day,
            dateModified: day,
            inLanguage: lang,
            author: publisher,
            publisher,
        });
    }
    else if (kind === 'document') {
        blocks.push({
            '@context': 'https://schema.org',
            '@type': 'TechArticle',
            headline: name,
            url,
            description,
            dateModified: day,
            inLanguage: lang,
            author: publisher,
            publisher,
        });
    }
    // where the page sits: the start page, the section, the page itself
    const section = /^\/(adapters|docs|blog)\//.exec(route)?.[1];
    if (section) {
        blocks.push({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'ioBroker', item: `${origin}${withLanguage('/', lang)}` },
                {
                    '@type': 'ListItem',
                    position: 2,
                    name: text(PLAIN_PAGES[`/${section}`], lang),
                    item: `${origin}${withLanguage(`/${section}`, lang)}`,
                },
                { '@type': 'ListItem', position: 3, name, item: url },
            ],
        });
    }
    return blocks
        .map(block => `<script data-structured-data type="application/ld+json">${JSON.stringify(block).replace(/</g, '\\u003c')}</script>`)
        .join('\n        ');
}
/**
 * The agents that get a rendered page.
 *
 * Googlebot and Bing execute JavaScript and would manage without, only slowly and not reliably;
 * the rest - the social fetchers above all - read the markup as it arrives and nothing else. The
 * list is deliberately generous: rendering a page for an agent that did not need it costs one
 * pass through the markdown, once, while missing one means that agent sees nothing.
 */
const CRAWLERS = /(googlebot|google-inspectiontool|bingbot|yandex(bot)?|duckduckbot|baiduspider|applebot|petalbot|facebookexternalhit|facebot|meta-external(agent|fetcher)|meta-webindexer|facebookbot|googleother|google-cloudvertexbot|gemini-deep-research|grokbot|xai-grok|grok-deepsearch|xai-bot|bytespider|doubaobot|tiktokspider|perplexity(bot|-user)|screaming frog seo spider|twitterbot|linkedinbot|slackbot|discordbot|whatsapp|telegrambot|ia_archiver|semrushbot|ahrefsbot|gptbot|chatgpt-user|oai-searchbot|claude(bot|-user|-searchbot)|anthropic-ai|deepseekbot)/i;
export function isCrawler(userAgent) {
    return !!userAgent && CRAWLERS.test(userAgent);
}
/** The name of the crawler in a user agent - "googlebot", "bingbot" - or an empty string */
export function crawlerName(userAgent) {
    return (userAgent && CRAWLERS.exec(userAgent)?.[1]?.toLowerCase()) || '';
}
/**
 * The language for a visitor whose address names none.
 *
 * "/adapters/pvforecast" without `?lang=` is the page in every language, and which one a visitor
 * gets is decided in the browser out of what was stored there. The server has no such store, so
 * `Accept-Language` is all there is to go by, and English is the fallback. A crawler does not come
 * here: without a parameter it gets English, the page `hreflang` names as x-default.
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
        kind: 'adapter',
        title: text(found.titleFull, lang) || slug,
        description: text(found.description, lang),
        file: found.content ? path.join(publicDir, lang, found.content) : undefined,
        image: found.icon ? `/${lang}/${found.icon}` : undefined,
        entry: found,
    };
}
function describeDocument(publicDir, lang, docPath) {
    return {
        kind: 'document',
        title: documentTitle(publicDir, lang, docPath) || docPath.replace(/\.md$/i, ''),
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
        kind: 'post',
        title: text(post.title, lang) || id,
        description: text(post.desc, lang),
        file: path.join(publicDir, lang, 'blog', `${id}.md`),
        /*
         * Not the title banner itself: that is three to five times as wide as it is high and would
         * be cut down the middle. `blogSocial.mts` draws a 1200x630 card out of it at build time
         * and writes it here.
         */
        image: post.social ? `/${post.social}` : undefined,
        imageWide: !!post.social,
        entry: post,
    };
}
/**
 * The pages that are not a document - their text is the interface itself.
 *
 * The same words the app uses for them, out of `front-end/src/i18n`, so that the title does not
 * change under the reader the moment the app starts and writes its own.
 */
const PLAIN_DESCRIPTIONS = {
    /*
     * Since the relaunch this is the site itself, not the documentation of a program that lives
     * elsewhere, and the description says so. The old one began with "Documentation of ioBroker",
     * which is what a reader looking for the platform reads as "not what I was looking for".
     */
    '/': {
        en: 'ioBroker connects devices, protocols and online services into one smart home: hundreds of adapters, free automation, your own visualisation.',
        de: 'ioBroker verbindet Geräte, Protokolle und Onlinedienste zu einem Smart Home: hunderte Adapter, freie Automatisierung, eigene Visualisierung.',
        ru: 'ioBroker объединяет устройства, протоколы и онлайн-сервисы в умный дом: сотни адаптеров, свободная автоматизация, своя визуализация.',
    },
    '/adapters': {
        en: 'All ioBroker adapters with their documentation - what each one connects to and how it is set up.',
        de: 'Alle ioBroker-Adapter mit ihrer Dokumentation - was jeder anbindet und wie er eingerichtet wird.',
        ru: 'Все адаптеры ioBroker с документацией - что подключает каждый и как он настраивается.',
    },
    '/installation': {
        en: 'How to install ioBroker - on Linux, Windows, macOS, Docker and a Raspberry Pi.',
        de: 'ioBroker installieren - unter Linux, Windows, macOS, Docker und auf dem Raspberry Pi.',
        ru: 'Установка ioBroker - в Linux, Windows, macOS, Docker и на Raspberry Pi.',
    },
    '/docs': {
        en: 'The ioBroker documentation: basics, installation, configuration, visualisation, development and help with problems.',
        de: 'Die Dokumentation von ioBroker: Grundlagen, Installation, Konfiguration, Visualisierung, Entwicklung und Hilfe bei Problemen.',
        ru: 'Документация ioBroker: основы, установка, настройка, визуализация, разработка и помощь при проблемах.',
    },
    '/blog': {
        en: 'The ioBroker blog: monthly reviews, new adapters, changes in the core and news from the community.',
        de: 'Der ioBroker-Blog: monatliche Rückblicke, neue Adapter, Änderungen im Kern und Neuigkeiten aus der Community.',
        ru: 'Блог ioBroker: месячные обзоры, новые адаптеры, изменения в ядре и новости сообщества.',
    },
    '/productoverview': {
        en: 'The paid ioBroker services at a glance: remote access, voice assistants and adapter licenses.',
        de: 'Die kostenpflichtigen ioBroker-Angebote im Überblick: Fernzugriff, Sprachassistenten und Adapterlizenzen.',
        ru: 'Платные услуги ioBroker: удаленный доступ, голосовые помощники и лицензии на адаптеры.',
    },
    '/statistics': {
        en: 'How many ioBroker installations there are, which adapters are in use and how that develops over time.',
        de: 'Wie viele ioBroker-Installationen es gibt, welche Adapter verbreitet sind und wie sich das über die Zeit entwickelt.',
        ru: 'Сколько установок ioBroker существует, какие адаптеры распространены и как это меняется со временем.',
    },
};
/**
 * What a page calls itself when the address names nothing.
 *
 * The same words as `notFound.title` in `front-end/src/i18n`, where the page itself takes them
 * from. Until 18.09.2026 such an address carried the bare name of the site as its title, which
 * said nothing to a reader with several tabs open and nothing to a log either.
 */
const NOT_FOUND_TITLE = {
    en: 'Page not found',
    de: 'Seite nicht gefunden',
    ru: 'Страница не найдена',
};
const PLAIN_PAGES = {
    /*
     * The title of the home page carries the words a reader searches for. Until 17.09.2026 it was
     * the bare name, eight characters on the most important page of the site, in all three
     * languages the same. Kept short enough that a search engine shows it whole (about 60
     * characters); the name stands first, so a result list still begins with "ioBroker".
     */
    '/': {
        en: 'ioBroker | Open source smart home and building automation',
        de: 'ioBroker | Open Source Smart Home und Gebäudeautomation',
        ru: 'ioBroker | Платформа для умного дома с открытым кодом',
    },
    '/adapters': { en: 'Adapters', de: 'Adapter', ru: 'Адаптеры' },
    '/docs': { en: 'Docs', de: 'Doku', ru: 'Документация' },
    '/blog': { en: 'Blog', de: 'Blog', ru: 'Блог' },
    '/installation': { en: 'Installation', de: 'Installation', ru: 'Установка' },
    '/statistics': { en: 'Statistics', de: 'Statistik', ru: 'Статистика' },
    '/productoverview': { en: 'Licenses', de: 'Lizenzen', ru: 'Лицензии' },
    '/imprint': { en: 'Imprint', de: 'Impressum', ru: 'О компании' },
    '/policy': { en: 'Privacy', de: 'Datenschutz', ru: 'Политика конфиденциальности' },
    '/search': { en: 'Search', de: 'Suche', ru: 'Поиск' },
};
/** The legal pages are documents of their own, kept next to the others in every language */
const LEGAL_DOCUMENTS = {
    '/imprint': 'imprint.md',
    '/policy': 'privacy.md',
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
    else if (Object.hasOwn(LEGAL_DOCUMENTS, route)) {
        return {
            kind: 'document',
            title: text(PLAIN_PAGES[route], lang),
            description: '',
            file: path.join(publicDir, lang, LEGAL_DOCUMENTS[route]),
        };
    }
    return {
        kind: 'plain',
        title: text(PLAIN_PAGES[route], lang) || 'ioBroker',
        description: text(PLAIN_DESCRIPTIONS[route], lang),
    };
}
/*
 * The documents carry HTML of their own - the pictures above all are written as `<img>` with a
 * width, not as markdown. Without `rehype-raw` all of it was dropped, and a crawler read the text
 * without a single picture. It is parsed now and then sanitized like everything else: what is
 * unsafe - scripts, event handlers, styles - still goes.
 */
const markdown = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkFrontmatter, ['yaml'])
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeSanitize)
    .use(rehypeStringify);
/** The document as HTML - anything unsafe in it is dropped */
function toHtml(source) {
    try {
        return String(markdown.processSync(source));
    }
    catch {
        return '';
    }
}
/**
 * The day a page names for itself, as YYYY-MM-DD, or nothing.
 *
 * `lastChanged: "07.09.2026"` in the frontmatter of a document comes first - it is maintained by
 * hand and is what the page itself shows. Otherwise the date of the entry in the index: the
 * release of an adapter (`latestVersionDate`), the day of a blog post (`2026.08.25`).
 */
function dayOfPage(source, entry) {
    const written = source ? /^lastChanged:\s*"?(\d{2})\.(\d{2})\.(\d{4})"?/m.exec(source.slice(0, 600)) : null;
    if (written) {
        return `${written[3]}-${written[2]}-${written[1]}`;
    }
    const value = entry?.latestVersionDate ?? entry?.date;
    const iso = value ? /^(\d{4})-(\d{2})-(\d{2})/.exec(value) : null;
    if (iso) {
        return `${iso[1]}-${iso[2]}-${iso[3]}`;
    }
    const dotted = value ? /^(\d{4})\.(\d{2})\.(\d{2})/.exec(value) : null;
    return dotted ? `${dotted[1]}-${dotted[2]}-${dotted[3]}` : undefined;
}
/**
 * A description as long as a search engine shows it: 160 characters, cut at a word.
 *
 * Applies to the text a page brings with it as much as to one made from its document. The
 * descriptions in `blog.json` are whole paragraphs - one of them ran to 640 characters, of which
 * a result list showed the first 155 and a preview even fewer.
 */
function shorten(text) {
    // 49 of the descriptions in blog.json carry a literal "\n" - two characters, not a line break
    const plain = text
        .replace(/\\[rn]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
    return plain.length > 160 ? `${plain.slice(0, 157).replace(/\s+\S*$/, '')}…` : plain;
}
/** The first sentences of a document, for a page that brings no description of its own */
function summarise(html) {
    return shorten(html
        .replace(/<[^>]*>/g, ' ')
        .replace(/&[a-z]+;/gi, ' ')
        .replace(/\s+/g, ' '));
}
/**
 * The pages that were built, by address and language.
 *
 * There is no time limit on them. What a page is made of only changes when the build pipeline
 * writes new files, and the hash below says exactly when that happened - a page that did not
 * change keeps the version that was built for it, however long ago that was. A limit on time
 * would only mean throwing away work that is still correct, and after every run of the pipeline
 * the files are rewritten whether their content changed or not, so a date says nothing anyway.
 *
 * The order of the map is the order of use: a page served from here moves to the end, so the one
 * that goes when the cache is full is the one asked for longest ago.
 */
const pageCache = new Map();
/**
 * What the cache may take. Measured on 14.09.2026: every page of the site - 801 adapters, 144
 * documents, 35 posts, in three languages, once for crawlers and once for browsers - comes to 5940
 * entries and about 68 MB, 62 MB of it the crawler pages. The former limit by count (4000) did not
 * fit that, and it let a README of 445 KB weigh as much as a page of 2 KB.
 */
let maxBytes = 128 * 1024 * 1024;
/** a limit on the count as well, against a flood of small entries for addresses that do not exist */
const MAX_PAGES = 20000;
let cachedBytes = 0;
/** where every rendered page is written as well, or null - see `configurePrerender` */
let dumpDir = null;
/** front-end/src - the words of the interface a crawler's page is written with, or null */
let frontEndSrc = null;
/** where the pipeline step `11.snapshots` keeps the pages as the app draws them, or null */
let snapshotDir = null;
/** The settings out of config.json - called once when the server starts */
export function configurePrerender(options) {
    if (options.maxBytes && options.maxBytes > 0) {
        maxBytes = options.maxBytes;
    }
    dumpDir = options.dumpDir ? path.resolve(options.dumpDir) : null;
    frontEndSrc = options.frontEndSrc || null;
    snapshotDir = options.snapshotDir ? path.resolve(options.snapshotDir) : null;
}
/** memory of a string in V8: one byte per character, two once anything beyond Latin-1 is in it */
function sizeOf(value) {
    for (let i = 0; i < value.length; i++) {
        if (value.charCodeAt(i) > 0xff) {
            return 2 * value.length;
        }
    }
    return value.length;
}
/**
 * Where a page goes in the dump directory: `<lang>/<bot|app>/<path>.html`, the start page as
 * `index.html`. The path comes from the request and anybody can write it, so every segment is cut
 * down to harmless characters and "." and ".." are dropped.
 */
function dumpFileOf(root, lang, forCrawler, pathname) {
    let decoded = pathname;
    try {
        decoded = decodeURIComponent(pathname);
    }
    catch {
        // a malformed escape - the raw path is cleaned just the same
    }
    const segments = decoded
        .split('/')
        .map(segment => segment.replace(/[^\w.-]/g, '_'))
        .filter(segment => segment && segment !== '.' && segment !== '..');
    const file = `${path.join(root, lang, forCrawler ? 'bot' : 'app', ...(segments.length ? segments : ['index']))}.html`;
    return file.startsWith(path.join(root, path.sep)) ? file : null;
}
/** Written in the background - the answer to the request does not wait for the disk */
function dumpPage(file, html) {
    fs.promises
        .mkdir(path.dirname(file), { recursive: true })
        .then(() => fs.promises.writeFile(file, html))
        .catch((error) => console.error(`Cannot write prerendered page ${file}: ${String(error)}`));
}
/** set between the parts of a hash, so that "ab" + "c" and "a" + "bc" do not come out the same */
const SEPARATOR = String.fromCharCode(0);
function hashOf(parts) {
    const hash = crypto.createHash('sha256');
    parts.forEach(part => hash.update(part ?? '').update(SEPARATOR));
    return hash.digest('base64');
}
/**
 * The version of everything a crawler's page is made of besides its own document: the indexes,
 * the statistics, the words of the interface and the installation targets.
 */
function sourcesVersion(publicDir, lang) {
    const files = [
        path.join(publicDir, 'adapters.json'),
        path.join(publicDir, 'content.json'),
        path.join(publicDir, 'blog.json'),
        path.join(publicDir, 'data', 'statistics.json'),
    ];
    if (frontEndSrc) {
        files.push(path.join(frontEndSrc, 'i18n', `${lang}.json`), path.join(frontEndSrc, 'i18n', 'en.json'), path.join(frontEndSrc, 'config', 'installation.json'));
    }
    return files.map(versionOf).join('|');
}
/**
 * The version of what a page shows - the same for a crawler and a reader.
 *
 * The pipeline asks for it (`X-Page-Version`) before it draws a page and draws only what changed
 * since. It is made of the app (the shell names the bundles of this build), the document and the
 * entry of the page, and of the indexes only where the page shows them: the lists on the plain
 * pages, the table of contents beside a document, the other posts beside a post. The indexes
 * change every day, and every page would be drawn again every day if all of them counted.
 */
function pageVersionOf(shell, route, page, source, publicDir) {
    const index = (name) => contentVersionOf(path.join(publicDir, name));
    let data = [];
    if (page.kind === 'plain') {
        data = [
            index('adapters.json'),
            index('content.json'),
            index('blog.json'),
            contentVersionOf(path.join(publicDir, 'data', 'statistics.json')),
        ];
    }
    else if (page.kind === 'document' && route.startsWith('/docs/')) {
        data = [index('content.json')];
    }
    else if (page.kind === 'post') {
        data = [index('blog.json')];
    }
    return hashOf([
        shell,
        page.title,
        page.description,
        page.image,
        source,
        page.entry ? JSON.stringify(page.entry) : '',
        ...data,
    ]);
}
/**
 * The snapshot of a page, when there is one for exactly this version of it.
 *
 * A snapshot of an older version is not used: its text may be out of date, and a crawler that gets
 * other words than a reader would be the one thing all of this is meant to avoid. Until the pipeline
 * has drawn the page again, the crawler gets the page written by the server instead.
 */
function snapshotOf(lang, route, version) {
    if (!snapshotDir) {
        return null;
    }
    const entry = readJson(path.join(snapshotDir, 'manifest.json'))?.pages?.[`${lang}|${route}`];
    if (!entry || entry.version !== version) {
        return null;
    }
    const file = path.resolve(snapshotDir, entry.file);
    if (!file.startsWith(path.join(snapshotDir, path.sep)) || !fs.existsSync(file)) {
        return null;
    }
    return { file, stamp: `${entry.version}|${entry.renderedAt}` };
}
/** what the app writes into the head for itself - in a snapshot it is replaced by the server's tags */
const APP_HEAD_TAGS = /<meta\b[^>]*\b(?:name="(?:description|robots|twitter:[^"]*)"|property="og:[^"]*")[^>]*>\s*|<link\b[^>]*\b(?:rel="canonical"|hreflang=)[^>]*>\s*/gi;
/**
 * A page - the shell or a snapshot - with the language, the title and the head of this address.
 */
function withHead(page, lang, title, head) {
    const headEnd = page.search(/<\/head>/i);
    let html = headEnd === -1 ? page : page.slice(0, headEnd).replace(APP_HEAD_TAGS, '') + page.slice(headEnd);
    // index.html is written in English - the page says which language it really is in
    html = html.replace(/<html\b[^>]*>/i, tag => /\blang="[^"]*"/i.test(tag)
        ? tag.replace(/\blang="[^"]*"/i, `lang="${lang}"`)
        : tag.replace(/^<html/i, `<html lang="${lang}"`));
    const titleTag = `<title data-prerender>${escapeHtml(title)}</title>`;
    html = /<title[^>]*>[^<]*<\/title>/i.test(html)
        ? html.replace(/<title[^>]*>[^<]*<\/title>/i, titleTag)
        : html.replace(/<\/head>/i, `    ${titleTag}\n    </head>`);
    return html.replace(/<\/head>/i, `    ${head}\n    </head>`);
}
const OG_LOCALES = { de: 'de_DE', en: 'en_GB', ru: 'ru_RU' };
/**
 * The picture a link preview shows when the page brings none of its own.
 *
 * Until 18.09.2026 only adapter pages carried an `og:image`, so a link to the site posted in the
 * forum, on Facebook or in a chat arrived as a bare line of text. This one is 1200 by 630, the
 * size those services ask for.
 *
 * An adapter whose logo is an SVG falls back to it as well: Facebook, WhatsApp and X do not
 * render SVG and show nothing at all rather than the logo.
 */
/*
 * The name carries the month the picture was drawn in, and it is bumped whenever the picture
 * changes. Telegram, WhatsApp and Facebook keep the file they once fetched for an address and do
 * not ask again: a new picture under the old name reached nobody who had already shared a link.
 */
const DEFAULT_IMAGE = '/og-default-2026-09.png';
/**
 * The page for a request, with the head filled in - and, for a crawler, with the content in it.
 *
 * A visitor gets the shell as before, only with a title and a description that name this page:
 * putting the content in as well would show it for the moment it takes React to start and then
 * have it replaced, which is a flicker for nothing. A crawler gets the content, because for it
 * there is no moment after - the snapshot of the page where the pipeline has drawn one, the page
 * written out of the markdown and the words of the interface where it has not.
 *
 * @param request what is asked for
 */
export function renderPage(request) {
    const { shell, pathname, origin, lang, publicDir, forCrawler } = request;
    const route = pathname.replace(/\/+$/, '') || '/';
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
    /*
     * An address that names nothing - an adapter that does not exist, a document that is not there -
     * is still answered with the shell, so that the app can show its own "not found". But with 404
     * and without canonical and hreflang, so that a search engine does not keep it as a page.
     */
    const found = page.kind === 'plain' ? Object.hasOwn(PLAIN_PAGES, route) : !!source;
    const status = found ? 200 : 404;
    const version = pageVersionOf(shell, route, page, source, publicDir);
    const snapshot = forCrawler && found ? snapshotOf(lang, route, version) : null;
    const key = `${lang}|${forCrawler ? 'bot' : 'app'}|${pathname}`;
    const hash = hashOf([
        shell,
        origin,
        page.title,
        page.description,
        page.image,
        source,
        // a crawler's page is made of its snapshot, or of the indexes and the words of the interface
        forCrawler ? (snapshot ? `snapshot|${snapshot.stamp}` : sourcesVersion(publicDir, lang)) : '',
    ]);
    const cached = pageCache.get(key);
    if (cached?.hash === hash) {
        // the page just used goes to the end - the one asked for longest ago is dropped first
        pageCache.delete(key);
        pageCache.set(key, cached);
        return { html: cached.html, fromCache: true, status: cached.status, version, snapshot: cached.snapshot };
    }
    const documentHtml = source ? toHtml(source) : '';
    const description = shorten(page.description) || (documentHtml ? summarise(documentHtml) : '');
    const canonical = `${origin}${withLanguage(route, lang)}`;
    /*
     * The day the page names for itself: a documentation page carries `lastChanged` in its
     * frontmatter, a blog post and an adapter their date in the index. The same values the
     * sitemap writes (`sitemap.ts`), and `dateModified` in the structured data below.
     */
    const documentDay = dayOfPage(source, page.entry);
    /*
     * The logo of an adapter is a square and stands beside the text, so that page gets the small
     * card. A blog post brings a card drawn for this purpose, and the fallback is one too, so both
     * get the large one with their size written out - some readers draw nothing without it.
     */
    const ownPicture = !!page.image && !/\.svg$/i.test(page.image);
    const picture = ownPicture ? page.image : DEFAULT_IMAGE;
    const widePicture = !ownPicture || !!page.imageWide;
    const name = found ? page.title : text(NOT_FOUND_TITLE, lang);
    const title = name.includes('ioBroker') ? name : `${name} | ioBroker`;
    const indexable = found && route !== '/search';
    /*
     * Every tag written here carries `data-prerender`, and `main.tsx` takes them out again the
     * moment the app starts. React writes the same tags itself once it has the data, and knows
     * nothing of the ones already in the document - the page ended up with two titles, and the
     * browser goes by whichever stands first. Something that does not run the app never reaches
     * that line and keeps what was sent.
     */
    const head = [
        description ? `<meta data-prerender name="description" content="${escapeHtml(description)}">` : '',
        indexable
            ? `<link data-prerender rel="canonical" href="${escapeHtml(canonical)}">`
            : '<meta data-prerender name="robots" content="noindex, follow">',
        // the same page in the other languages, and the one to take when none of them fits
        ...(indexable
            ? [
                ...LANGUAGES.map(language => `<link data-prerender rel="alternate" hreflang="${language}" href="${escapeHtml(origin + withLanguage(route, language))}">`),
                `<link data-prerender rel="alternate" hreflang="x-default" href="${escapeHtml(origin + route)}">`,
            ]
            : []),
        `<meta data-prerender property="og:type" content="${route === '/' ? 'website' : 'article'}">`,
        `<meta data-prerender property="og:locale" content="${OG_LOCALES[lang]}">`,
        `<meta data-prerender property="og:title" content="${escapeHtml(title)}">`,
        description ? `<meta data-prerender property="og:description" content="${escapeHtml(description)}">` : '',
        `<meta data-prerender property="og:url" content="${escapeHtml(canonical)}">`,
        `<meta data-prerender property="og:image" content="${escapeHtml(origin + picture)}">`,
        widePicture ? '<meta data-prerender property="og:image:width" content="1200">' : '',
        widePicture ? '<meta data-prerender property="og:image:height" content="630">' : '',
        `<meta data-prerender name="twitter:card" content="${widePicture ? 'summary_large_image' : 'summary'}">`,
        indexable
            ? structuredData(page.kind, route, lang, origin, title, description, origin + picture, page.entry, documentDay)
            : '',
    ]
        .filter(Boolean)
        .join('\n        ');
    let snapshotHtml = null;
    if (snapshot) {
        try {
            snapshotHtml = fs.readFileSync(snapshot.file, 'utf-8');
        }
        catch {
            snapshotHtml = null;
        }
    }
    let html;
    if (snapshotHtml) {
        // the page as the app draws it - only its head is the server's
        html = withHead(snapshotHtml, lang, title, head);
    }
    else {
        html = withHead(shell, lang, title, head);
        if (forCrawler) {
            // React replaces whatever stands in the container when it mounts, so this is only ever
            // seen by something that does not run it
            const body = crawlerBody({
                route,
                lang,
                kind: page.kind,
                title: page.title,
                documentHtml,
                file: page.file,
                entry: page.entry,
                publicDir,
                frontEndSrc,
                notFound: !found,
            });
            html = html.replace('<div id="root"></div>', `<div id="root">${body}</div>`);
        }
    }
    const fromSnapshot = !!snapshotHtml;
    if (cached) {
        // the page changed - its old version makes room first
        pageCache.delete(key);
        cachedBytes -= cached.bytes;
    }
    const bytes = sizeOf(html) + sizeOf(key) + hash.length;
    pageCache.set(key, { hash, html, status, version, snapshot: fromSnapshot, bytes });
    cachedBytes += bytes;
    // the oldest go until it fits again - the page just built stays, however large it is
    for (const [oldestKey, oldest] of pageCache) {
        if ((cachedBytes <= maxBytes && pageCache.size <= MAX_PAGES) || oldestKey === key) {
            break;
        }
        pageCache.delete(oldestKey);
        cachedBytes -= oldest.bytes;
    }
    if (dumpDir) {
        const file = dumpFileOf(dumpDir, lang, forCrawler, pathname);
        if (file) {
            dumpPage(file, html);
        }
    }
    return { html, fromCache: false, status, version, snapshot: fromSnapshot };
}
/** How many pages are held - for the log line on startup and for the tests */
export function cachedPageCount() {
    return pageCache.size;
}
/** What the held pages take in memory, roughly */
export function cachedPageBytes() {
    return cachedBytes;
}
//# sourceMappingURL=prerender.js.map