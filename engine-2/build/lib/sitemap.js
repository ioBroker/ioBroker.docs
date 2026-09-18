import fs from 'node:fs';
import path from 'node:path';
import { LANGUAGES, escapeHtml, readJson, versionOf, walk, withLanguage } from './siteData.js';
/** A date of the indexes as a day: "2026-08-05T21:02:10.637Z" and "2018.03.17" both become a day */
function dayOf(value) {
    if (!value) {
        return undefined;
    }
    const iso = /^(\d{4})-(\d{2})-(\d{2})/.exec(value);
    if (iso) {
        return `${iso[1]}-${iso[2]}-${iso[3]}`;
    }
    const dotted = /^(\d{4})\.(\d{2})\.(\d{2})/.exec(value);
    return dotted ? `${dotted[1]}-${dotted[2]}-${dotted[3]}` : undefined;
}
/**
 * The day a document says it was last changed.
 *
 * `lastChanged: "07.09.2026"` in its frontmatter, which is what the documentation maintains by
 * hand and what the page itself shows. The files are rewritten by the pipeline every month
 * whether they changed or not, so their date on disk says nothing; this does.
 */
function documentDay(file) {
    let head;
    try {
        head = fs.readFileSync(file, 'utf-8').slice(0, 600);
    }
    catch {
        return undefined;
    }
    const match = /^lastChanged:\s*"?(\d{2})\.(\d{2})\.(\d{4})"?/m.exec(head);
    return match ? `${match[3]}-${match[2]}-${match[1]}` : undefined;
}
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
            const entry = page;
            add({
                route: `/adapters/${encodeURIComponent(key)}`,
                file: page.content,
                lastmod: dayOf(entry.latestVersionDate) ?? dayOf(entry.published),
            });
        }
    });
    walk(readJson(path.join(publicDir, 'content.json')), (_key, page) => {
        if (page.content) {
            add({ route: `/docs/${encodeURI(page.content)}`, file: page.content });
        }
    });
    const blog = readJson(path.join(publicDir, 'blog.json'))?.pages ?? {};
    Object.entries(blog).forEach(([id, post]) => add({ route: `/blog/${encodeURIComponent(id)}`, file: `blog/${id}.md`, lastmod: dayOf(post.date) }));
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
    const urls = siteRoutes(publicDir).flatMap(({ route, file, lastmod }) => {
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
        return languages.map(lang => {
            /*
             * What the page says about itself first, then what the index knows: a documentation
             * page carries its own `lastChanged`, an adapter the date of its release, a blog post
             * its date. A page that says nothing gets no `lastmod` - a made-up date is worse than
             * none, because a crawler believes it and comes back for nothing.
             */
            const day = (file ? documentDay(path.join(publicDir, lang, file)) : undefined) ?? lastmod;
            return `<url><loc>${escapeHtml(origin + withLanguage(route, lang))}</loc>${day ? `<lastmod>${day}</lastmod>` : ''}${alternates}</url>`;
        });
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