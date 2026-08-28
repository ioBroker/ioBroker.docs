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
