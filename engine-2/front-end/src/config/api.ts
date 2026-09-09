const isDev = parseInt(window.location.port, 10) > 4000;

export const API_CONFIG = {
    IOBROKER_BASE_URL: isDev ? './' : `https://www.iobroker.net:${window.location.port}`,
} as const;

/** Build an absolute (or dev-relative) URL for a resource of the iobroker.net web site */
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
 * In development the markdown therefore comes through the proxy; in production the app
 * is served from iobroker.net and the path is same-origin.
 */
export const buildContentUrl = (path: string): string => {
    const clean = path.replace(/^\/+/, '');
    return isDev ? `/api/iobroker/${clean}` : buildIoBrokerUrl(clean);
};

/**
 * Forum statistics. The same applies as to statistics: `public/` has no copy of
 * `data/forum.json`, so in development the request returned nothing and the Community
 * section displayed a number without a value.
 */
export const FORUM_STATS_URL = isDev
    ? '/api/iobroker/forum.json'
    : `https://www.iobroker.net:${window.location.port}/data/forum.json`;

/**
 * The site search. The endpoint belongs to the same server that serves this app, so in production
 * it is same-origin. In development it is the backend started with `npm start` beside the vite
 * server, which vite.config.ts proxies - the live site would answer out of a different index.
 */
export const SEARCH_URL = isDev ? '/search' : `https://www.iobroker.net:${window.location.port}/search`;

/** The results page of this app. The API owns the plain `/search` path, so this one is a route */
export const SEARCH_LINK = '/#/search';

export const API_ENDPOINTS = {
    FORUM_STATS: FORUM_STATS_URL,
    ADAPTERS: `${API_CONFIG.IOBROKER_BASE_URL}/adapters.json`,
    DOCS_README_EN: `${API_CONFIG.IOBROKER_BASE_URL}/en/README.md`,
    DOCS_CONTENT: `${API_CONFIG.IOBROKER_BASE_URL}/content.json`,
    BLOG_CONTENT: `${API_CONFIG.IOBROKER_BASE_URL}/blog.json`,
} as const;

/**
 * Link to the blog. It is rendered by this SPA, so the address is a route of the router.
 */
export const BLOG_LINK = '/#/blog';

/**
 * Imprint and privacy policy. Both are rendered by this SPA. The plain "/imprint" the old
 * site used still arrives - `normalizeEntryUrl` turns it into the address below.
 */
export const IMPRINT_LINK = '/#/imprint';
export const PRIVACY_LINK = '/#/policy';

/**
 * Destinations of the top navigation.
 * The header component itself is identical in all ioBroker web apps (it is kept in
 * sync by copy&paste until the shared library exists) - only this block differs,
 * because every app links to the pages it does not host itself.
 */
export const HOME_LINK = '/#/';
export const ADAPTERS_LINK = '/#/adapters';
export const DOCS_LINK = '/#/docs';
export const LICENSES_LINK = '/#/productoverview';

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
export const INSTALLATION_LINK = '/#/installation';
/** the statistics now live in this app - the old absolute link left the site */
export const STATISTICS_LINK = '/#/statistics';

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
