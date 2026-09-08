import { setLang, type Language } from './i18n';

/**
 * The paths this SPA renders itself. The app runs behind a HashRouter, so its own address
 * for them is "/#/adapters" - but the same pages are also linked from outside as plain
 * "/adapters", and those have to arrive as well. Everything that is not listed here (the
 * language folders with the markdown, the JSON indexes, the icons) belongs to the static
 * files and must stay a normal request to the server.
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
 * "/docs/install/linux.md#raspberry" becomes "/docs/install/linux.md?anchor=raspberry",
 * because behind the "#" of the hash address a second "#" has no place - the anchor
 * travels as a parameter, the same way `buildAnchorHref` writes it.
 *
 * Returns null for everything that is not a page of this app.
 */
export function pathToRoute(pathname: string, search = '', hash = ''): string | null {
    const route = pathname.replace(/\/+$/, '');
    if (!route || !isAppPath(route)) {
        return null;
    }
    const params = new URLSearchParams(search);
    // "#/..." is a hash address already, only a plain "#id" is an anchor
    if (hash.startsWith('#') && !hash.startsWith('#/')) {
        params.set('anchor', decodeURIComponent(hash.slice(1)));
    }
    const query = params.toString();
    return `${route}${query ? `?${query}` : ''}`;
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
 * Turns the address of an entry from outside into the address of the app before the router
 * reads the location: "/adapters" becomes "/#/adapters", and the address of the former site
 * becomes the route it means. Without it the router would see a hash it cannot read and
 * answer the start page, whatever the address said.
 */
export function normalizeEntryUrl(): void {
    const { pathname, search, hash } = window.location;
    const legacy = parseLegacyHash(hash);
    if (legacy) {
        if (legacy.language) {
            setLang(legacy.language);
        }
        window.history.replaceState(null, '', `/#${legacy.route}`);
        return;
    }
    if (hash.startsWith('#/')) {
        return;
    }
    const route = pathToRoute(pathname, search, hash);
    if (route) {
        window.history.replaceState(null, '', `/#${route}`);
    }
}
