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

export interface DocsItem {
    title: Lang;
    content: string;
}

export interface Docs {
    pages: {
        [k: string]: {
            title: Lang;
            pages: {
                [k: string]: DocsItem;
            };
        };
    };
}
