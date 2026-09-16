import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
/**
 * What the data of the site is made of and how its addresses are written - shared by the
 * prerendered pages, the content crawlers are sent and the sitemap.
 */
/** The languages of the site. English is the one whose address carries no parameter */
export const LANGUAGES = ['de', 'en', 'ru'];
export const DEFAULT_LANGUAGE = 'en';
export function isLanguage(value) {
    return typeof value === 'string' && LANGUAGES.includes(value);
}
/**
 * The address of a page in a language.
 *
 * One address per language is what lets a search engine index the languages apart. With the
 * language decided by `Accept-Language` alone, a crawler that sends none - and most send none - got
 * English on every address, and German and Russian were never seen. English stays the page itself,
 * the others carry `?lang=`, which the app reads as well.
 *
 * @param route the path of the page, may carry an anchor
 * @param lang the language the address is for
 */
export function withLanguage(route, lang) {
    if (lang === DEFAULT_LANGUAGE) {
        return route;
    }
    const hashAt = route.indexOf('#');
    const base = hashAt === -1 ? route : route.slice(0, hashAt);
    const anchor = hashAt === -1 ? '' : route.slice(hashAt);
    return `${base}${base.includes('?') ? '&' : '?'}lang=${lang}${anchor}`;
}
const jsonCache = new Map();
export function readJson(file) {
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
/** When a file last changed, as a string for a hash - empty for a file that is not there */
export function versionOf(file) {
    try {
        return String(fs.statSync(file).mtimeMs);
    }
    catch {
        return '';
    }
}
const contentVersions = new Map();
/**
 * The version of what a file holds - hashed once per change of the file, empty for a file that is
 * not there. Not the time it was written: the pipeline writes every file again on every run, and a
 * page would count as changed each time without a word of it being different.
 */
export function contentVersionOf(file) {
    try {
        const { mtimeMs } = fs.statSync(file);
        const known = contentVersions.get(file);
        if (known?.mtimeMs === mtimeMs) {
            return known.version;
        }
        const version = crypto.createHash('sha256').update(fs.readFileSync(file)).digest('base64');
        contentVersions.set(file, { mtimeMs, version });
        return version;
    }
    catch {
        return '';
    }
}
/** The text of a translated field, falling back through the languages that exist */
export function text(value, lang) {
    if (!value) {
        return '';
    }
    if (typeof value === 'string') {
        return value;
    }
    return value[lang] || value.en || value.de || value.ru || '';
}
/** Walk a tree of pages and hand every entry below the root to the visitor */
export function walk(root, visit) {
    Object.entries(root?.pages || {}).forEach(([key, page]) => {
        visit(key, page);
        walk(page, visit);
    });
}
export function escapeHtml(value) {
    return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
/**
 * The title a document has in the table of contents - empty for one that is not listed there.
 *
 * @param publicDir the directory the site is served from
 * @param lang the language of the title
 * @param docPath the document as content.json names it, e.g. "install/linux.md"
 */
export function documentTitle(publicDir, lang, docPath) {
    let title = '';
    walk(readJson(path.join(publicDir, 'content.json')), (key, page) => {
        if (!title && page.content === docPath) {
            title = text(page.title, lang) || key;
        }
    });
    return title;
}
//# sourceMappingURL=siteData.js.map