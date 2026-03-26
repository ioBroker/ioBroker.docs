type AdapterItemTitle = Record<string, string> | undefined;

export type AdapterListItem = {
    title: Record<string, string>;
    content: string;
    icon: string;
    keywords: string;
    authors: string;
    license: string;
    published: string;
    version: string;
    latestVersion: string;
    description: Record<string, string>;
    installs?: number;
    weekDownloads?: number;
    stars?: number;
};

export const getLocalizedTitle = (title: AdapterItemTitle, language: string): string => {
    if (!title) {
        return '';
    }
    return (
        title[language as keyof typeof title] ||
        title.en ||
        title.de ||
        title.ru ||
        Object.values(title)[0] ||
        ''
    );
};

export const normalizeText = (value: string, language: string): string => {
    const lowered = value.trim().toLocaleLowerCase(language === 'ru' ? 'ru' : undefined);
    return lowered.replace(/\u0451/g, '\u0435').replace(/\u0401/g, '\u0415');
};

export const matchesSearch = (adapter: AdapterListItem | undefined, search: string, language: string): boolean => {
    if (!search) return true;
    if (!adapter) return false;
    const term = normalizeText(search, language);
    const titleValues = adapter.title ? Object.values(adapter.title) : [];
    const localizedTitle = getLocalizedTitle(adapter.title, language);
    const haystack = [
        localizedTitle,
        ...titleValues,
        adapter.content,
    ]
        .filter(Boolean)
        .map((text) => normalizeText(String(text), language));
    return haystack.some((text) => text.includes(term));
};
