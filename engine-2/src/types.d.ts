export type Languages = 'de' | 'en' | 'ru' | 'zh-cn';

export interface DocHeader {
    translatedFrom?: Languages;
    title?: string;
    editLink?: string;
    hash?: string;
    translatedWarning?: string;
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
    sites: Array<{
        route: string;
        path: string;
        redirects: string;
    }>;
};
