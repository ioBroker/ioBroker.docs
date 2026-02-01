interface Lang {
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
    icon: string;
    keywords: string;
    authors: string;
    license: string;
    published: string; // ISO 8601 date-time string
    version: string;
    latestVersion: string;
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
