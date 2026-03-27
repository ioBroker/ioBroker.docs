import type { AdapterItem } from '../../components/AdapterItem/AdapterItem';

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
