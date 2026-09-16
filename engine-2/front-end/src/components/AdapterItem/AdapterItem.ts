export interface Lang {
    en?: string;
    de?: string;
    ru?: string;
    pt?: string;
    nl?: string;
    fr?: string;
    it?: string;
    es?: string;
    pl?: string;
    uk?: string;
    'zh-cn'?: string;
}

export interface AdapterItem {
    title: Lang;
    content: string;
    /** Missing for the handful of adapters whose logo the build pipeline could not get hold of */
    icon?: string;
    keywords: string;
    authors: string;
    license: string;
    published: string; // ISO 8601 date-time string
    version: string;
    latestVersion: string;
    /** when the stable version was published, ISO 8601 date-time string */
    versionDate?: string;
    /** when the latest version was published, ISO 8601 date-time string */
    latestVersionDate?: string;
    compact: boolean;
    description: Lang;
    titleFull: Lang;
    branch: string;
    github: string;
    installs: number;
    weekDownloads: number;
    stars: number;
    issues: number;
    score: number;
}

export interface Adapters {
    pages: {
        [k: string]: {
            title: Lang;
            pages: {
                [k: string]: AdapterItem;
            };
        };
    };
}
