/*
 * Whether the app runs under the vite dev server, which is a different thing from the port it is
 * reached on. This used to be `port > 4000`, and the backend answers on 5001: a production build
 * served by it therefore believed it was in development and asked for its markdown through
 * `/api/iobroker/...`, a path only the dev server proxies. Every adapter page came up empty with
 * two 404s in the console. `import.meta.env.DEV` is set by vite when it builds, and is false in
 * everything it writes to `build/`.
 */
const isDev = import.meta.env.DEV;

export const API_CONFIG = {
    /*
     * Empty, so that every address built from this starts at the root of whatever host serves the
     * app - the JSON indexes and the icons lie beside it in every case, on iobroker.net as well as
     * on a machine running `npm start`.
     *
     * Not "./", which is relative to the page. That was harmless while the router kept its routes
     * behind a "#" and the path was always "/", but the path is the route now: from
     * "/adapters/pvforecast" the browser asked for "/adapters/adapters.json". Anything under
     * "/adapters/" is answered with the shell of the app, so that came back as status 200 with a
     * page of HTML where JSON was expected, and the adapter had no data at all - no title, no
     * description, no version, and nothing in the console to say so.
     */
    IOBROKER_BASE_URL: '',
} as const;

/** Build an absolute (or root-relative) URL for a resource of the iobroker.net web site */
export const buildIoBrokerUrl = (path: string): string =>
    `${API_CONFIG.IOBROKER_BASE_URL.replace(/\/+$/, '')}/${path.replace(/^\/+/, '')}`;

/**
 * The installation statistics. In production the app is served from iobroker.net, so
 * the file is same-origin; the dev server has no copy of it and the host sends no CORS
 * headers, so development goes through the proxy that vite.config.ts already defines.
 */
export const STATISTICS_DATA_URL = isDev
    ? '/api/iobroker/data/statistics.json'
    : `https://www.iobroker.net:${window.location.port}/data/statistics.json`;

/**
 * The generated page the map reads its points and its Google loader out of. Same
 * story as the statistics file: same-origin in production, through the dev proxy
 * otherwise, because the host sends no CORS headers.
 */
export const STATISTICS_MAP_URL = isDev
    ? '/api/iobroker/data/map.html'
    : `https://www.iobroker.net:${window.location.port}/data/map.html`;

/**
 * The markdown of the docs and of the adapter readmes. `public/` carries a copy of the
 * JSON indexes and of the adapter icons, but **not** of the adapter readmes - 793
 * folders under `public/de/adapterref/` hold one PNG each and no `README.md`. A request
 * for a missing file does not fail on the dev server: it answers the SPA shell with
 * status 200, so the page rendered `index.html` as if it were the adapter's text.
 * Under the dev server the markdown therefore comes through the proxy; anywhere the built app is
 * served from, the files lie beside it and the path is same-origin.
 */
export const buildContentUrl = (path: string): string => {
    const clean = path.replace(/^\/+/, '');
    return isDev ? `/api/iobroker/${clean}` : buildIoBrokerUrl(clean);
};

/**
 * Forum statistics. `public/` has no copy of `data/forum.json`, so this cannot be a plain file:
 * the backend fetches and caches it (`cachedProxy` in src/lib/web.ts) and answers here, and the
 * dev server proxies the same path through to that backend. One address serves both.
 */
export const FORUM_STATS_URL = '/api/iobroker/forum.json';

/**
 * The site search. It belongs to the server that serves this app, so the address is same-origin
 * either way - in development the dev server proxies it to the backend started with `npm start`
 * beside it, which answers out of the index built there rather than the one on the live site.
 */
export const SEARCH_URL = '/api/search';

/** The results page of this app. The API answers at `/api/search`, so this path is the page */
export const SEARCH_LINK = '/search';

export const API_ENDPOINTS = {
    FORUM_STATS: FORUM_STATS_URL,
    ADAPTERS: `${API_CONFIG.IOBROKER_BASE_URL}/adapters.json`,
    DOCS_README_EN: `${API_CONFIG.IOBROKER_BASE_URL}/en/README.md`,
    DOCS_CONTENT: `${API_CONFIG.IOBROKER_BASE_URL}/content.json`,
    BLOG_CONTENT: `${API_CONFIG.IOBROKER_BASE_URL}/blog.json`,
} as const;

/** Link to the blog. It is rendered by this SPA, so the address is a route of the router. */
export const BLOG_LINK = '/blog';

/**
 * Imprint and privacy policy. Both are rendered by this SPA, and the address is the path itself -
 * the same one the old site used.
 */
export const IMPRINT_LINK = '/imprint';
export const PRIVACY_LINK = '/policy';

/**
 * Destinations of the top navigation.
 * The header component itself is identical in all ioBroker web apps (it is kept in
 * sync by copy&paste until the shared library exists) - only this block differs,
 * because every app links to the pages it does not host itself.
 */
export const HOME_LINK = '/';
export const ADAPTERS_LINK = '/adapters';
export const DOCS_LINK = '/docs';
export const LICENSES_LINK = '/productoverview';

/**
 * The two product catalogues. iobroker.net carries the adapter licenses, iobroker.pro the access
 * licenses.
 *
 * Neither host sends a CORS header, so the browser cannot ask them - not in development and not in
 * production either, where this used to call them directly and the catalogue simply stayed empty.
 * Both go through our own server, which caches the answer (see `cachedProxy` in src/lib/web.ts);
 * in development the vite proxy points the same two paths at the backend beside it.
 */
export const PRODUCTS_NET_URL = '/api/products/net';
export const PRODUCTS_PRO_URL = '/api/products/pro';

/** "Order" on the product overview hands over to the marketplace in the profile app */
export const LICENSES_PRO_MARKETPLACE_LINK = isDev
    ? 'http://localhost:3002/www/licenses-marketplace'
    : `https://iobroker.pro:${window.location.port}/www/licenses-marketplace`;
export const LICENSES_NET_MARKETPLACE_LINK = isDev
    ? 'http://localhost:3002/www/licenses-marketplace'
    : `https://iobroker.net:${window.location.port}/www/licenses-marketplace`;
export const PROFILE_LINK = '/www';
export const INSTALLATION_LINK = '/installation';
/** the statistics now live in this app - the old absolute link left the site */
export const STATISTICS_LINK = '/statistics';

const DOCS_LINKS = [
    HOME_LINK,
    ADAPTERS_LINK,
    DOCS_LINK,
    BLOG_LINK,
    LICENSES_LINK,
    INSTALLATION_LINK,
    STATISTICS_LINK,
    IMPRINT_LINK,
    PRIVACY_LINK,
];
const PROFILE_LINKS = [PROFILE_LINK];

export function getLink(link: string): string {
    if (window.location.hostname === 'localhost') {
        return `http://localhost:${window.location.port}${link}`;
    }
    if (PROFILE_LINKS.includes(link)) {
        return `https://${window.location.hostname.replace('www.', '')}:${window.location.port}${link}/`;
    }
    if (DOCS_LINKS.includes(link)) {
        return `https://www.iobroker.net:${window.location.port}${link}`;
    }
    return link;
}
