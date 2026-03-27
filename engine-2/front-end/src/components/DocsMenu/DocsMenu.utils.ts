import type { Docs } from '../DocsItem/DocsItem';

export const normalizeSearch = (value: string): string => {
    const lowered = value.trim().toLowerCase();
    return lowered.replace(/\u0451/g, '\u0435').replace(/\u0401/g, '\u0415');
};

export const matchesSearch = (title: Record<string, string> | undefined, search: string, language: string): boolean => {
    if (!search) {
        return true;
    }
    if (!title) {
        return false;
    }
    const term = normalizeSearch(search);
    const values = [title[language], title.en, title.de, title.ru, ...Object.values(title)];
    return values.some(text => {
        if (!text) {
            return false;
        }
        const normalizedText = normalizeSearch(text);
        return normalizedText.includes(term);
    });
};

export const filterPages = (pages: Docs['pages'], search: string, language: string): Docs['pages'] => {
    if (!search) {
        return pages;
    }
    const result: Docs['pages'] = {};
    Object.keys(pages).forEach(key => {
        const page = pages[key];
        const titleMatches = matchesSearch(page.title as Record<string, string>, search, language);
        if (page.pages && Object.keys(page.pages).length > 0) {
            const filteredChildren = filterPages(page.pages, search, language);
            const hasChildren = Object.keys(filteredChildren).length > 0;
            if (titleMatches || hasChildren) {
                result[key] = { ...page, pages: filteredChildren };
            }
            return;
        }
        if (titleMatches) {
            result[key] = page;
        }
    });
    return result;
};

export const getChildrenPaddingLeft = (level: number): string => {
    const base = 32;
    const step = 6;
    const min = 12;
    return `${Math.max(base - level * step, min)}px !important`;
};
