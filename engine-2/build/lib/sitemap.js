import fs from 'node:fs';
import path from 'node:path';
import { LANGUAGES, escapeHtml, readJson, versionOf, walk, withLanguage } from './siteData.js';
/** The addresses of the site: the pages of the app and everything the indexes list */
export function siteRoutes(publicDir) {
    const routes = new Map();
    const add = (entry) => {
        if (!routes.has(entry.route)) {
            routes.set(entry.route, entry);
        }
    };
    ['/', '/installation', '/adapters', '/docs', '/blog', '/productoverview', '/statistics'].forEach(route => add({ route }));
    add({ route: '/imprint', file: 'imprint.md' });
    add({ route: '/policy', file: 'privacy.md' });
    walk(readJson(path.join(publicDir, 'adapters.json')), (key, page) => {
        if (page.content) {
            add({ route: `/adapters/${encodeURIComponent(key)}`, file: page.content });
        }
    });
    walk(readJson(path.join(publicDir, 'content.json')), (_key, page) => {
        if (page.content) {
            add({ route: `/docs/${encodeURI(page.content)}`, file: page.content });
        }
    });
    Object.keys(readJson(path.join(publicDir, 'blog.json'))?.pages ?? {}).forEach(id => add({ route: `/blog/${encodeURIComponent(id)}`, file: `blog/${id}.md` }));
    return [...routes.values()];
}
let cached = null;
/**
 * The sitemap as XML - built again only when one of the indexes changed.
 *
 * @param publicDir the directory the site is served from
 * @param origin scheme and host the site is published under
 */
export function buildSitemap(publicDir, origin) {
    const version = [
        origin,
        ...['adapters.json', 'content.json', 'blog.json'].map(file => versionOf(path.join(publicDir, file))),
    ].join('|');
    if (cached?.version === version) {
        return cached.xml;
    }
    const urls = siteRoutes(publicDir).flatMap(({ route, file }) => {
        // a document that was not translated into a language has no page in it
        const languages = LANGUAGES.filter(lang => !file || fs.existsSync(path.join(publicDir, lang, file)));
        if (!languages.length) {
            return [];
        }
        const fallback = languages.includes('en') ? 'en' : languages[0];
        const alternates = [
            ...languages.map(lang => `<xhtml:link rel="alternate" hreflang="${lang}" href="${escapeHtml(origin + withLanguage(route, lang))}"/>`),
            `<xhtml:link rel="alternate" hreflang="x-default" href="${escapeHtml(origin + withLanguage(route, fallback))}"/>`,
        ].join('');
        return languages.map(lang => `<url><loc>${escapeHtml(origin + withLanguage(route, lang))}</loc>${alternates}</url>`);
    });
    const xml = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
        ...urls,
        '</urlset>',
    ].join('\n');
    cached = { version, xml };
    return xml;
}
//# sourceMappingURL=sitemap.js.map