const isDev = parseInt(window.location.port, 10) > 4000;

export const IS_DEV = isDev;

export const API_CONFIG = {
    IOBROKER_BASE_URL: isDev ? './' : 'https://www.iobroker.net',
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
    : 'https://www.iobroker.net/data/statistics.json';

/**
 * The generated page the map reads its points and its Google loader out of. Same
 * story as the statistics file: same-origin in production, through the dev proxy
 * otherwise, because the host sends no CORS headers.
 */
export const STATISTICS_MAP_URL = isDev ? '/api/iobroker/data/map.html' : 'https://www.iobroker.net/data/map.html';

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
export const FORUM_STATS_URL = isDev ? '/api/iobroker/data/forum.json' : 'https://www.iobroker.net/data/forum.json';

export const API_ENDPOINTS = {
    FORUM_STATS: FORUM_STATS_URL,
    ADAPTERS: `${API_CONFIG.IOBROKER_BASE_URL}/adapters.json`,
    DOCS_README_EN: `${API_CONFIG.IOBROKER_BASE_URL}/en/README.md`,
    DOCS_CONTENT: `${API_CONFIG.IOBROKER_BASE_URL}/content.json`,
    BLOG_CONTENT: `${API_CONFIG.IOBROKER_BASE_URL}/blog.json`,
} as const;

/**
 * Link to the blog.
 * On the dev server the blog is served by this SPA,
 * in production it still points to the existing page on iobroker.net.
 */
export const BLOG_LINK = isDev ? '/blog' : 'https://www.iobroker.net/blog';

/**
 * Imprint and privacy policy.
 * Both are rendered by this SPA - the path is the same one the old site used,
 * so existing links keep working.
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
export const LICENSES_LINK = isDev ? '/productoverview' : 'https://www.iobroker.net/productoverview';

/**
 * The two product catalogues. iobroker.net carries the adapter licenses,
 * iobroker.pro the access licenses. Neither host sends CORS headers, so in
 * development both go through the dev-server proxy (see vite.config.ts).
 */
export const PRODUCTS_NET_URL = isDev ? '/api/products/net' : 'https://iobroker.net/api/v1/public/products';
export const PRODUCTS_PRO_URL = isDev ? '/api/products/pro' : 'https://iobroker.pro/api/v1/public/products';

/** "Order" on the product overview hands over to the marketplace in the profile app */
export const LICENSES_MARKETPLACE_LINK = isDev
    ? 'http://localhost:3002/www/licenses-marketplace'
    : 'https://www.iobroker.net/www/licenses-marketplace';
export const PROFILE_LINK = '/profile';
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
        return `https://www.iobroker.net:${window.location.port}${link}/`;
    }
    return link;
}
