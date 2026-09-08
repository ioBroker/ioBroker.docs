/**
 * The paths this SPA renders itself. Everything else that is asked from the server - the
 * language folders with the markdown, the JSON indexes, the icons - has to reach the
 * server, so a link to it must not be caught by the router.
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
    if (pathname === '' || pathname === '/') {
        return true;
    }
    return APP_ROUTES.some(route => pathname === route || pathname.startsWith(`${route}/`));
}

/**
 * The address form of the former HashRouter. "#/adapters" becomes "/adapters", and
 * "#/docs/install/linux.md?anchor=raspberry" becomes "/docs/install/linux.md#raspberry" -
 * the `anchor` parameter only ever existed because a hash URL cannot carry a second "#".
 *
 * Returns null for everything that is not such an address, "#section" included.
 */
export function legacyHashToPath(href: string): string | null {
    // both spellings are in the wild: "/#/adapters" from the outside, "#/adapters" from inside
    const hash = href.startsWith('/#') ? href.slice(1) : href;
    if (!hash.startsWith('#/')) {
        return null;
    }
    const route = hash.slice(1);
    const queryIndex = route.indexOf('?');
    if (queryIndex === -1) {
        return route;
    }
    const path = route.slice(0, queryIndex);
    const params = new URLSearchParams(route.slice(queryIndex + 1));
    const anchor = params.get('anchor');
    params.delete('anchor');
    const query = params.toString();
    return `${path}${query ? `?${query}` : ''}${anchor ? `#${anchor}` : ''}`;
}

/**
 * Turns a "/#/adapters" address into "/adapters" before the router reads the location,
 * so an old link opens the page it names instead of the start page.
 */
export function normalizeLegacyHashUrl(): void {
    const target = legacyHashToPath(window.location.hash);
    if (target) {
        window.history.replaceState(null, '', target);
    }
}
