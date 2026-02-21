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

export type DocsItem = {
    title: Lang;
    pages?: {
        [k: string]: DocsItem;
    };
    content?: string;
};

export type Docs = {
    pages: {
        [k: string]: DocsItem;
    };
};
