export type Languages = 'de' | 'en' | 'ru';

export interface DocHeader {
    translatedFrom?: Languages;
    title?: string;
    editLink?: string;
    hash?: string;
    translatedWarning?: string;
}

/**
 * Where the search index lives. Without a host the site still works, only /search answers 503 -
 * the index is filled by the documentation pipeline, not by this server.
 */
export interface SearchConfig {
    /** e.g. http://127.0.0.1:7700 */
    host: string;
    /** a key that may only search - this is the one the server should carry */
    searchKey?: string;
    /** the admin key, used by the pipeline when it writes the index */
    apiKey?: string;
    /** the indexes are called <prefix>_<language>, by default iobroker_docs_de and so on */
    indexPrefix?: string;
}

/** The pages this server renders for crawlers and browsers - see src/lib/prerender.ts */
export interface PrerenderConfig {
    /**
     * Scheme and host the site is published under, for canonical, hreflang, og:url and the sitemap -
     * "https://www.iobroker.com" when not set. Not taken from the request: a test server on another
     * port would otherwise name itself as the page to index.
     */
    origin?: string;
    /** memory the page cache may take, in MB - 128 when not set */
    maxCacheMB?: number;
    /**
     * A directory every rendered page is written into as well, e.g. "prerender-cache", to see what
     * a crawler is sent: <dir>/<lang>/<bot|app>/<path>.html. Relative to the engine-2 folder.
     * Off when empty or not set.
     */
    dumpDir?: string;
    /**
     * Where the pipeline step 11.snapshots keeps the pages as the app draws them, and where the
     * server takes them from for crawlers - "prerender-snapshots" when not set, relative to the
     * engine-2 folder.
     */
    snapshotDir?: string;
    /**
     * The server the snapshots are drawn from - "http://localhost:<port>" when not set. It has to
     * be the site as it runs: the app builds some of its addresses out of the port it is reached on.
     */
    snapshotBase?: string;
    /** pages drawn at the same time - 8 when not set */
    snapshotTabs?: number;
    /** a snapshot older than this is drawn again even if its page did not change - 7 when not set */
    snapshotMaxAgeDays?: number;
    /** a Chrome to use instead of the one puppeteer brings along */
    chromePath?: string;
    /**
     * A line in the log for every page sent to a crawler: which crawler, status, language, address,
     * snapshot or page written by the server, from the cache or not, size and time. Off when not set.
     */
    log?: boolean;
}

export type AppConfig = {
    secure: boolean;
    port: number;
    bind?: string;
    secret: string;
    public: string;
    certs: {
        key: string;
        cert: string;
        chain: string;
    };
    LANGUAGES: Languages[];
    /** the search server, see SearchConfig - optional, the site runs without it */
    search?: SearchConfig;
    /** the prerendered pages, see PrerenderConfig - optional */
    prerender?: PrerenderConfig;
    /**
     * Host names answered with a 301 to `prerender.origin`, path and query kept - on the live server
     * ["www.iobroker.net", "iobroker.com"]. GET and HEAD only. Off when empty or not set, so a test
     * server is never sent away.
     */
    redirectHosts?: string[];
    /** static archives mounted beside the app, e.g. the old documentation - all sent with "noindex" */
    sites: Array<{
        route: string;
        path: string;
        redirects: string;
    }>;
};
