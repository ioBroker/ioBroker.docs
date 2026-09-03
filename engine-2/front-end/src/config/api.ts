const isDev = parseInt(window.location.port, 10) > 4000;

export const IS_DEV = isDev;

export const API_CONFIG = {
    IOBROKER_BASE_URL: isDev ? './' : 'https://www.iobroker.net',
} as const;

/** Build an absolute (or dev-relative) URL for a resource of the iobroker.net web site */
export const buildIoBrokerUrl = (path: string): string =>
    `${API_CONFIG.IOBROKER_BASE_URL.replace(/\/+$/, '')}/${path.replace(/^\/+/, '')}`;

export const API_ENDPOINTS = {
    FORUM_STATS: `${API_CONFIG.IOBROKER_BASE_URL}/data/forum.json`,
    ADAPTERS: `${API_CONFIG.IOBROKER_BASE_URL}/adapters.json`,
    DOCS_README_EN: `${API_CONFIG.IOBROKER_BASE_URL}/en/README.md`,
    DOCS_CONTENT: `${API_CONFIG.IOBROKER_BASE_URL}/content.json`,
    BLOG_CONTENT: `${API_CONFIG.IOBROKER_BASE_URL}/blog.json`,
} as const;

/**
 * Link to the blog.
 * On the dev server the blog is served by this SPA (short hash URL),
 * in production it still points to the existing page on iobroker.net.
 */
export const BLOG_LINK = isDev ? '/#/blog' : 'https://www.iobroker.net/blog';

/**
 * Imprint and privacy policy.
 * The dev server renders them inside this SPA (short hash URL), in production
 * they still point to the pages that are served today.
 */
export const IMPRINT_LINK = isDev ? '/#/imprint' : '/imprint';
export const PRIVACY_LINK = isDev ? '/#/policy' : '/policy';

/**
 * Destinations of the top navigation.
 * The header component itself is identical in all ioBroker web apps (it is kept in
 * sync by copy&paste until the shared library exists) - only this block differs,
 * because every app links to the pages it does not host itself.
 */
export const HOME_LINK = '/#/';
export const ADAPTERS_LINK = '/#/adapters';
export const DOCS_LINK = '/#/docs';
export const LICENSES_LINK = isDev ? '/#/productoverview' : 'https://www.iobroker.net/#/productoverview';

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
export const PROFILE_LINK = '/#/profile';
export const INSTALLATION_LINK = '/#/installation';
export const STATISTICS_LINK = 'https://www.iobroker.net/#/statistics';
