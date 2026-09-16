import fs from 'node:fs';
import path from 'node:path';
import type { Languages } from '../types.js';
import { LANGUAGES, escapeHtml, readJson, versionOf, walk, withLanguage, type JsonPage } from './siteData.js';

/**
 * The sitemap: every page of the site, in every language it exists in.
 *
 * The app finds its pages through links drawn in the browser, and a crawler that does not run it
 * finds none of them. robots.txt names this file, so a search engine gets the whole list at once -
 * each address with its other languages beside it, the same pairs `hreflang` names in the pages.
 */

interface SiteRoute {
    route: string;
    /** the markdown behind the page, relative to a language folder - a page without one exists in every language */
    file?: string;
}

/** The addresses of the site: the pages of the app and everything the indexes list */
export function siteRoutes(publicDir: string): SiteRoute[] {
    const routes = new Map<string, SiteRoute>();
    const add = (entry: SiteRoute): void => {
        if (!routes.has(entry.route)) {
            routes.set(entry.route, entry);
        }
    };

    ['/', '/installation', '/adapters', '/docs', '/blog', '/productoverview', '/statistics'].forEach(route =>
        add({ route }),
    );
    add({ route: '/imprint', file: 'imprint.md' });
    add({ route: '/policy', file: 'privacy.md' });

    walk(readJson<JsonPage>(path.join(publicDir, 'adapters.json')), (key, page) => {
        if (page.content) {
            add({ route: `/adapters/${encodeURIComponent(key)}`, file: page.content });
        }
    });
    walk(readJson<JsonPage>(path.join(publicDir, 'content.json')), (_key, page) => {
        if (page.content) {
            add({ route: `/docs/${encodeURI(page.content)}`, file: page.content });
        }
    });
    Object.keys(readJson<JsonPage>(path.join(publicDir, 'blog.json'))?.pages ?? {}).forEach(id =>
        add({ route: `/blog/${encodeURIComponent(id)}`, file: `blog/${id}.md` }),
    );

    return [...routes.values()];
}

let cached: { version: string; xml: string } | null = null;

/**
 * The sitemap as XML - built again only when one of the indexes changed.
 *
 * @param publicDir the directory the site is served from
 * @param origin scheme and host the site is published under
 */
export function buildSitemap(publicDir: string, origin: string): string {
    const version = [
        origin,
        ...['adapters.json', 'content.json', 'blog.json'].map(file => versionOf(path.join(publicDir, file))),
    ].join('|');
    if (cached?.version === version) {
        return cached.xml;
    }

    const urls = siteRoutes(publicDir).flatMap(({ route, file }) => {
        // a document that was not translated into a language has no page in it
        const languages: Languages[] = LANGUAGES.filter(
            lang => !file || fs.existsSync(path.join(publicDir, lang, file)),
        );
        if (!languages.length) {
            return [];
        }
        const fallback = languages.includes('en') ? 'en' : languages[0];
        const alternates = [
            ...languages.map(
                lang =>
                    `<xhtml:link rel="alternate" hreflang="${lang}" href="${escapeHtml(origin + withLanguage(route, lang))}"/>`,
            ),
            `<xhtml:link rel="alternate" hreflang="x-default" href="${escapeHtml(origin + withLanguage(route, fallback))}"/>`,
        ].join('');
        return languages.map(
            lang => `<url><loc>${escapeHtml(origin + withLanguage(route, lang))}</loc>${alternates}</url>`,
        );
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
