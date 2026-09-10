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
    sites: Array<{
        route: string;
        path: string;
        redirects: string;
    }>;
};
