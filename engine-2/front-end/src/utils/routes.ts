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
 * Turns the address of an entry from outside into the address of the app before the router
 * reads the location: "/adapters" becomes "/#/adapters". Without it the router would see
 * an empty hash and answer the start page, whatever the path said.
 */
export function normalizeEntryUrl(): void {
    const { pathname, search, hash } = window.location;
    if (hash.startsWith('#/')) {
        return;
    }
    const route = pathToRoute(pathname, search, hash);
    if (route) {
        window.history.replaceState(null, '', `/#${route}`);
    }
}
