import fs from 'node:fs';
import path from 'node:path';
import type { Languages } from '../types.js';
import { LANGUAGES, escapeHtml, readJson, versionOf, walk, withLanguage, type JsonPage } from './siteData.js';

/**
 * The sitemap: every page of the site, in every language it exists in.
 *
 * The app finds its pages through links drawn in the browser, and a crawler that does not run it
 * finds none of them. robots.txt names /sitemap.xml, an index of the parts below, so a search
 * engine gets the whole list at once - each address with its other languages beside it, the same
 * pairs `hreflang` names in the pages.
 */

interface SiteRoute {
    route: string;
    /** the markdown behind the page, relative to a language folder - a page without one exists in every language */
    file?: string;
    /** when the page last changed, as a date (YYYY-MM-DD) - left out when nothing says */
    lastmod?: string;
}

/** A date of the indexes as a day: "2026-08-05T21:02:10.637Z" and "2018.03.17" both become a day */
function dayOf(value: string | undefined): string | undefined {
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
function documentDay(file: string): string | undefined {
    let head: string;
    try {
        head = fs.readFileSync(file, 'utf-8').slice(0, 600);
    } catch {
        return undefined;
    }
    const match = /^lastChanged:\s*"?(\d{2})\.(\d{2})\.(\d{4})"?/m.exec(head);
    return match ? `${match[3]}-${match[2]}-${match[1]}` : undefined;
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
            const entry = page as JsonPage & { latestVersionDate?: string; published?: string };
            add({
                route: `/adapters/${encodeURIComponent(key)}`,
                file: page.content,
                lastmod: dayOf(entry.latestVersionDate) ?? dayOf(entry.published),
            });
        }
    });
    walk(readJson<JsonPage>(path.join(publicDir, 'content.json')), (_key, page) => {
        if (page.content) {
            add({ route: `/docs/${encodeURI(page.content)}`, file: page.content });
        }
    });
    const blog = readJson<JsonPage>(path.join(publicDir, 'blog.json'))?.pages ?? {};
    Object.entries(blog).forEach(([id, post]) =>
        add({ route: `/blog/${encodeURIComponent(id)}`, file: `blog/${id}.md`, lastmod: dayOf(post.date) }),
    );

    return [...routes.values()];
}

/**
 * The parts the sitemap is split into: the pages of the app in one, then documentation, blog and
 * adapters each per language - `pages`, `docs-de`, `adapters-ru` and so on.
 *
 * One file with all 3000 addresses gave Search Console one number for all of them: how many were
 * indexed, and not which. Split this way the report per sitemap shows where pages stay out - the
 * adapters or the documentation, the English pages or the translations. Every address still names
 * its other languages beside it; an alternate may well stand in another part, the protocol allows
 * that.
 */
type Section = 'pages' | 'docs' | 'blog' | 'adapters';

const SECTIONS_BY_LANGUAGE: Section[] = ['docs', 'blog', 'adapters'];

function sectionOf(route: string): Section {
    if (route.startsWith('/adapters/')) {
        return 'adapters';
    }
    if (route.startsWith('/docs/')) {
        return 'docs';
    }
    if (route.startsWith('/blog/')) {
        return 'blog';
    }
    // the start page, the lists of adapters, documents and posts and the pages of the app
    return 'pages';
}

function partName(section: Section, lang: Languages): string {
    return section === 'pages' ? 'pages' : `${section}-${lang}`;
}

interface SitemapPart {
    /** the `<url>` entries of the part */
    urls: string[];
    /** the latest `lastmod` among them, for the index - undefined when none of them has one */
    lastmod?: string;
}

let cached: { version: string; parts: Map<string, SitemapPart> } | null = null;

/** Every part of the sitemap by its name - built again only when one of the indexes changed */
function sitemapParts(publicDir: string, origin: string): Map<string, SitemapPart> {
    const version = [
        origin,
        ...['adapters.json', 'content.json', 'blog.json'].map(file => versionOf(path.join(publicDir, file))),
    ].join('|');
    if (cached?.version === version) {
        return cached.parts;
    }

    // in a fixed order, so that the index lists the parts the same way every time
    const parts = new Map<string, SitemapPart>([['pages', { urls: [] }]]);
    SECTIONS_BY_LANGUAGE.forEach(section =>
        LANGUAGES.forEach(lang => parts.set(partName(section, lang), { urls: [] })),
    );

    siteRoutes(publicDir).forEach(({ route, file, lastmod }) => {
        // a document that was not translated into a language has no page in it
        const languages: Languages[] = LANGUAGES.filter(
            lang => !file || fs.existsSync(path.join(publicDir, lang, file)),
        );
        if (!languages.length) {
            return;
        }
        const fallback = languages.includes('en') ? 'en' : languages[0];
        const alternates = [
            ...languages.map(
                lang =>
                    `<xhtml:link rel="alternate" hreflang="${lang}" href="${escapeHtml(origin + withLanguage(route, lang))}"/>`,
            ),
            `<xhtml:link rel="alternate" hreflang="x-default" href="${escapeHtml(origin + withLanguage(route, fallback))}"/>`,
        ].join('');
        const section = sectionOf(route);
        languages.forEach(lang => {
            /*
             * What the page says about itself first, then what the index knows: a documentation
             * page carries its own `lastChanged`, an adapter the date of its release, a blog post
             * its date. A page that says nothing gets no `lastmod` - a made-up date is worse than
             * none, because a crawler believes it and comes back for nothing.
             */
            const day = (file ? documentDay(path.join(publicDir, lang, file)) : undefined) ?? lastmod;
            const part = parts.get(partName(section, lang))!;
            part.urls.push(
                `<url><loc>${escapeHtml(origin + withLanguage(route, lang))}</loc>${day ? `<lastmod>${day}</lastmod>` : ''}${alternates}</url>`,
            );
            // the days are YYYY-MM-DD, so the later one is also the larger string
            if (day && (!part.lastmod || day > part.lastmod)) {
                part.lastmod = day;
            }
        });
    });

    // a part without a single page is left out of the index rather than listed empty
    [...parts.keys()].forEach(name => {
        if (!parts.get(name)!.urls.length) {
            parts.delete(name);
        }
    });

    cached = { version, parts };
    return parts;
}

/**
 * The sitemap index, served as /sitemap.xml - the address robots.txt and Search Console know.
 *
 * @param publicDir the directory the site is served from
 * @param origin scheme and host the site is published under
 */
export function buildSitemapIndex(publicDir: string, origin: string): string {
    const entries = [...sitemapParts(publicDir, origin)].map(
        ([name, part]) =>
            `<sitemap><loc>${escapeHtml(`${origin}/sitemap-${name}.xml`)}</loc>${part.lastmod ? `<lastmod>${part.lastmod}</lastmod>` : ''}</sitemap>`,
    );
    return [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        ...entries,
        '</sitemapindex>',
    ].join('\n');
}

/**
 * One part of the sitemap, served as /sitemap-<name>.xml.
 *
 * @param publicDir the directory the site is served from
 * @param origin scheme and host the site is published under
 * @param name the part, e.g. "pages" or "adapters-de"
 * @returns the XML, or null when there is no part of that name
 */
export function buildSitemapPart(publicDir: string, origin: string, name: string): string | null {
    const part = sitemapParts(publicDir, origin).get(name);
    if (!part) {
        return null;
    }
    return [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
        ...part.urls,
        '</urlset>',
    ].join('\n');
}
