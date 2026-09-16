import path from 'node:path';

import type { LanguageCode } from './types.mts';

/**
 * Collecting the documentation of an adapter from its repository.
 *
 * Until now only the files listed under `common.docs` in io-package.json were fetched - 88 of 791
 * adapters fill that field. Everything else an author writes stays invisible: ecoflow-mqtt keeps
 * 44 device manuals in `doc/devices/`, declares nothing, and the site showed its readme alone.
 *
 * So the documents are followed instead of declared: start at what is known, read the links, and
 * fetch what points into the same repository. A link that leaves the repository stays a link.
 */

/** Where a repository lives, taken apart from the readme address the repository list carries */
export interface RepoLocation {
    owner: string;
    name: string;
    branch: string;
    /** raw.githubusercontent base for that branch, ends with a slash */
    raw: string;
    /** github.com base for that branch, ends with a slash - for links that stay outside */
    blob: string;
}

/**
 * @param readmeUrl e.g. `https://github.com/simatec/ioBroker.backitup/blob/master/README.md`
 */
export function parseRepoLocation(readmeUrl: string | undefined): RepoLocation | undefined {
    const m = /^https?:\/\/(?:www\.)?github\.com\/([^/]+)\/([^/]+)\/blob\/([^/]+)\//i.exec(readmeUrl || '');
    if (!m) {
        return undefined;
    }
    const [, owner, name, branch] = m;
    return {
        owner,
        name,
        branch,
        raw: `https://raw.githubusercontent.com/${owner}/${name}/${branch}/`,
        blob: `https://github.com/${owner}/${name}/blob/${branch}/`,
    };
}

/**
 * The changelog of an adapter is not fetched. Its content is already on the page - the pipeline
 * cuts it out of the readme and shows it in the changelog section - and `CHANGELOG_OLD.md` alone
 * is linked 454 times, which would carry hundreds of documents into the translation for nothing.
 */
export function isChangelog(repoPath: string): boolean {
    return /(^|\/)changelog[^/]*\.md$/i.test(repoPath);
}

const LANGUAGE_SEGMENTS = ['en', 'de', 'ru', 'zh-cn', 'pt', 'nl', 'fr', 'it', 'es', 'pl', 'uk'];

/**
 * A document that belongs to another language.
 *
 * Repositories keep their translations side by side and link between them - shelly writes
 * `[🇩🇪 German version](../de/README.md)` at the top of every English page. Following that while
 * collecting English would file the German pages under English; they are collected in their own
 * run instead.
 */
export function isOtherLanguage(repoPath: string, lang: LanguageCode): boolean {
    return repoPath
        .toLowerCase()
        .split('/')
        .some(segment => LANGUAGE_SEGMENTS.includes(segment) && segment !== lang);
}

/**
 * The path a link names inside the repository, or undefined when it points somewhere else.
 *
 * Relative links are resolved against the directory of the document they stand in, not against
 * the repository root - `doc/en/a.md` linking to `../devices/b.md` means `doc/devices/b.md`.
 *
 * @param href the address as written in the document
 * @param fromPath the repository path of the document the link stands in
 * @param repo where the repository lives
 */
export function resolveRepoPath(href: string, fromPath: string, repo: RepoLocation): string | undefined {
    let rest: string;

    if (/^[a-z][a-z0-9+.-]*:/i.test(href)) {
        // an absolute address - only this repository's own blob links lead back inside
        const own = new RegExp(`^https?://(?:www\\.)?github\\.com/${repo.owner}/${repo.name}/blob/[^/]+/(.+)$`, 'i');
        const m = own.exec(href);
        if (!m) {
            return undefined;
        }
        rest = m[1];
    } else if (href.startsWith('//')) {
        return undefined;
    } else if (href.startsWith('/')) {
        rest = href.slice(1);
    } else {
        rest = path.posix.join(path.posix.dirname(fromPath), href);
    }

    const clean = path.posix.normalize(decodeURI(rest.split('#')[0].split('?')[0]));
    if (!clean || clean.startsWith('..') || clean.startsWith('/')) {
        // climbed out of the repository
        return undefined;
    }
    return clean;
}

export interface CrawlOptions {
    /** how far to follow the links, counted from the documents that were given */
    maxDepth?: number;
    /** an upper bound per adapter, so a repository full of markdown cannot pull in everything */
    maxDocuments?: number;
    /**
     * Only documents under this directory are collected. The files are written next to the first
     * document, and one that lies above it has no name there - shelly's readme sits at the root
     * while its documents live in `docs/en/`.
     */
    root?: string;
}

/** Reads one file of the repository, or resolves to undefined when it is not there */
export type FetchDocument = (repoPath: string) => Promise<string | undefined>;

/**
 * Follows the links of the given documents and returns every markdown file of the repository that
 * can be reached from them, the given ones first and in the order they were found.
 *
 * Reachability is the rule: a file nothing links to is not collected, even when it exists. That is
 * deliberate - what no reader can navigate to is not part of the documentation.
 */
export async function crawlDocuments(
    repo: RepoLocation,
    seeds: string[],
    lang: LanguageCode,
    fetchDocument: FetchDocument,
    options?: CrawlOptions,
): Promise<{ path: string; body: string }[]> {
    const maxDepth = options?.maxDepth ?? 3;
    const maxDocuments = options?.maxDocuments ?? 50;
    const root = options?.root ? `${options.root.replace(/\/+$/, '')}/` : '';

    const visited = new Set<string>();
    const collected: { path: string; body: string }[] = [];
    const queue: { path: string; depth: number }[] = seeds.map(seed => ({ path: seed, depth: 0 }));

    while (queue.length && collected.length < maxDocuments) {
        const { path: docPath, depth } = queue.shift()!;
        if (visited.has(docPath)) {
            continue;
        }
        visited.add(docPath);

        const body = await fetchDocument(docPath);
        if (body === undefined) {
            continue;
        }
        collected.push({ path: docPath, body });

        if (depth >= maxDepth) {
            continue;
        }

        for (const target of markdownTargets(body, docPath, repo, lang)) {
            if (visited.has(target) || (root && !target.startsWith(root))) {
                continue;
            }
            queue.push({ path: target, depth: depth + 1 });
        }
    }

    return collected;
}

/** Every link of a document that leads to a markdown file of the same repository */
function markdownTargets(body: string, fromPath: string, repo: RepoLocation, lang: LanguageCode): string[] {
    const targets: string[] = [];
    for (const match of body.matchAll(/(^|[^!])\[[^\]]*]\(([^)\s]+)\)/g)) {
        const href = match[2];
        if (href.startsWith('#')) {
            continue;
        }
        const target = resolveRepoPath(href, fromPath, repo);
        if (!target || !/\.md$/i.test(target) || isChangelog(target) || isOtherLanguage(target, lang)) {
            continue;
        }
        targets.push(target);
    }
    return targets;
}

/**
 * Rewrites the links of one document.
 *
 * The pipeline never touched links, only images, so every relative link died on the site: the
 * browser resolved it against the address of the app, not against the document. A link now either
 * leads to the document as it lies on the site, or - when that document was not collected - to the
 * file on GitHub, where it at least exists.
 *
 * @param body the document
 * @param fromPath the repository path of that document
 * @param repo where the repository lives
 * @param siteUrlOf the address a collected document has on the site, or undefined if not collected
 */
export function rewriteLinks(
    body: string,
    fromPath: string,
    repo: RepoLocation,
    siteUrlOf: (repoPath: string) => string | undefined,
): string {
    return body.replace(/(^|[^!])(\[[^\]]*])\(([^)\s]+)(\s+"[^"]*")?\)/g, (whole, before, text, href, title) => {
        if (href.startsWith('#')) {
            return whole;
        }
        const target = resolveRepoPath(href, fromPath, repo);
        if (!target) {
            return whole;
        }
        const anchor = href.includes('#') ? `#${href.split('#').slice(1).join('#')}` : '';
        const site = /\.md$/i.test(target) ? siteUrlOf(target) : undefined;
        const replacement = site ?? repo.blob + target;
        return `${before}${text}(${replacement}${anchor}${title || ''})`;
    });
}
