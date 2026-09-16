import type { AdapterItem } from '../../components/AdapterItem/AdapterItem';

/**
 * How many adapters the overview shows. All 795 of them at once is a wall nobody reads to the
 * end - and the first screen of it was alphabetical chance. The ones most installations actually
 * run are what somebody opening this page is looking for; everything else is a category or the
 * search away.
 */
export const POPULAR_ADAPTERS_COUNT = 100;

/** The most installed adapters first, cut off after {@link POPULAR_ADAPTERS_COUNT} */
export const pickPopularAdapters = (adapters: AdapterItem[]): AdapterItem[] =>
    [...adapters]
        // a handful of adapters carry no count at all - those belong at the end, not at the top
        .sort((a, b) => (b.installs ?? 0) - (a.installs ?? 0))
        .slice(0, POPULAR_ADAPTERS_COUNT);

type AdapterItemTitle = AdapterItem['title'];

export const getLocalizedTitle = (title: AdapterItemTitle, language: string): string => {
    if (!title) {
        return '';
    }
    return title[language as keyof typeof title] || title.en || title.de || title.ru || Object.values(title)[0] || '';
};

export const normalizeText = (value: string, language: string): string => {
    const lowered = value.trim().toLocaleLowerCase(language === 'ru' ? 'ru' : undefined);
    return lowered.replace(/\u0451/g, '\u0435').replace(/\u0401/g, '\u0415');
};

export const matchesSearch = (adapter: AdapterItem | undefined, search: string, language: string): boolean => {
    if (!search) {
        return true;
    }
    if (!adapter) {
        return false;
    }
    const term = normalizeText(search, language);
    const titleValues = adapter.title ? Object.values(adapter.title) : [];
    const localizedTitle = getLocalizedTitle(adapter.title, language);
    const descriptionValues = adapter.description ? Object.values(adapter.description) : [];
    const localizedDescription = getLocalizedTitle(adapter.description, language);
    const haystack = [localizedTitle, ...titleValues, localizedDescription, ...descriptionValues]
        .filter(Boolean)
        .map(text => normalizeText(String(text), language));
    return haystack.some(text => text.includes(term));
};
