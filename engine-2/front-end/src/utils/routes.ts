import { setLang, type Language } from './i18n';

/**
 * The paths this SPA renders itself, as they stand in the address bar - "/adapters", not
 * "/#/adapters". Everything that is not listed here (the language folders with the markdown, the
 * JSON indexes, the icons) belongs to the static files and stays a normal request to the server.
 *
 * The same list exists in `src/lib/web.ts`, and the two have to agree: the server answers a path
 * from that list with the shell of the app and everything else from disk. A route that is missing
 * there is a 404 the moment somebody reloads the page or opens the address directly.
 */
export const APP_ROUTES = [
    '/installation',
    '/adapters',
    '/blog',
    '/docs',
    '/productoverview',
    '/statistics',
    '/imprint',
    '/policy',
    '/search',
] as const;

/**
 * The sections of the former site. Its addresses look like "#de/documentation/admin/log.md"
 * or "#de/adapters/adapterref/iobroker.midea/README.md" - a language, a section and the rest
 * of the path. Search engines and the forum still carry thousands of them.
 */
const LEGACY_SECTIONS: Record<string, string> = {
    adapters: '/adapters',
    documentation: '/docs',
    blog: '/blog',
    download: '/installation',
    statistics: '/statistics',
    imprint: '/imprint',
    privacy: '/policy',
};

/** the languages those addresses were written in - "zh-cn" has no translation of the interface */
const LEGACY_LANGUAGES: Record<string, Language | undefined> = {
    de: 'de',
    en: 'en',
    ru: 'ru',
    'zh-cn': undefined,
};

/** "/adapters" and "/adapters/alarm" are routes, "/en/adapterref/x/README.md" is a file */
export function isAppPath(pathname: string): boolean {
    return APP_ROUTES.some(route => pathname === route || pathname.startsWith(`${route}/`));
}

/**
 * The route a plain path address names, in the spelling the router expects.
 *
 * The anchor stays an anchor: "/docs/install/linux.md#raspberry" comes out unchanged. Under the
 * hash router it had to be carried as "?anchor=raspberry", because a second "#" has no place
 * behind the first one - that detour is gone with the hash.
 *
 * Returns null for everything that is not a page of this app.
 */
export function pathToRoute(pathname: string, search = '', hash = ''): string | null {
    const route = pathname.replace(/\/+$/, '');
    if (!route || !isAppPath(route)) {
        return null;
    }
    const query = new URLSearchParams(search).toString();
    // "#/..." is an address of the app's own former spelling, not an anchor
    const anchor = hash.startsWith('#') && !hash.startsWith('#/') ? hash : '';
    return `${route}${query ? `?${query}` : ''}${anchor}`;
}

/**
 * The route an address of the former site names, plus the language it was written in.
 * "#de/adapters/adapterref/iobroker.midea/README.md" becomes "/adapters/iobroker.midea/",
 * "#de/documentation/admin/log.md" becomes "/docs/admin/log.md".
 *
 * Returns null for everything else, a plain "#section" anchor included.
 */
export function parseLegacyHash(hash: string): { route: string; language?: Language } | null {
    if (!hash.startsWith('#') || hash.startsWith('#/')) {
        return null;
    }
    const [path, query] = hash.slice(1).split('?');
    const parts = path.split('/').filter(part => part);
    const language = parts[0] in LEGACY_LANGUAGES ? LEGACY_LANGUAGES[parts.shift()!] : undefined;
    const section = parts.shift();
    if (!section || !(section in LEGACY_SECTIONS)) {
        return null;
    }
    let route = LEGACY_SECTIONS[section];
    if (section === 'adapters') {
        // "adapters/adapterref/iobroker.midea/README.md" - and the pages below an adapter,
        // which the new site does not separate: they all belong to that adapter
        if (parts[0] === 'adapterref' && parts[1]) {
            route = `/adapters/${parts[1]}/`;
        }
    } else if (parts.length) {
        route = `${route}/${parts.join('/')}`;
    }
    return { route: query ? `${route}?${query}` : route, language };
}

/**
 * Puts the address into the spelling the router reads, before it reads it.
 *
 * The app used to run behind a hash router, so this turned "/adapters" into "/#/adapters". It now
 * does the opposite, because the two spellings that still arrive are both hashes: the addresses of
 * the former site, of which search engines and the forum carry thousands
 * ("#de/adapters/adapterref/iobroker.midea/README.md"), and the app's own former ones
 * ("/#/adapters"). Both are rewritten to the plain path, which is also what the visitor then has in
 * the address bar and what a search engine gets to see.
 */
export function normalizeEntryUrl(): void {
    const { pathname, search, hash } = window.location;

    const legacy = parseLegacyHash(hash);
    if (legacy) {
        if (legacy.language) {
            setLang(legacy.language);
        }
        window.history.replaceState(null, '', legacy.route);
        return;
    }

    // "/#/adapters" - the app's own address before the router lost its hash
    if (hash.startsWith('#/')) {
        window.history.replaceState(null, '', hash.slice(1));
        return;
    }

    // a plain path with an anchor, or nothing to do at all
    const route = pathToRoute(pathname, search, hash);
    if (route && route !== `${pathname}${search}${hash}`) {
        window.history.replaceState(null, '', route);
    }
}
