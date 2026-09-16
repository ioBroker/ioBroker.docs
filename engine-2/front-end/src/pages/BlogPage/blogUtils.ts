import type { Language } from '../../utils/i18n';
import type { BlogPageEntry, LocalizedText } from '../../api/hooks/useBlog';

const LOCALES: Record<Language, string> = {
    de: 'de-DE',
    en: 'en-GB',
    ru: 'ru-RU',
};

/** "2025_04_04" or "2025.04.04" => Date */
export const parseBlogDate = (pageId: string, date?: string): Date | null => {
    const source = (date || pageId).substring(0, 10).replace(/[_.]/g, '-');
    const parsed = new Date(`${source}T00:00:00`);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
};

export const formatBlogDate = (pageId: string, date: string | undefined, language: Language): string => {
    const parsed = parseBlogDate(pageId, date);
    if (!parsed) {
        return (date || pageId).replace(/_/g, '.');
    }
    return parsed.toLocaleDateString(LOCALES[language] || 'en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
};

/** Remove the markdown syntax, the short descriptions are shown as plain text */
const stripMarkdown = (text: string): string =>
    text
        .replace(/!\[[^\]]*\]\([^)]+\)/g, '')
        .replace(/\[([^\]]*)\]\([^)]+\)/g, '$1')
        .replace(/`([^`]+)`/g, '$1')
        .replace(/(\*\*|__)(.*?)\1/g, '$2')
        .replace(/(^|\s)[*_]([^*_\n]+)[*_](?=\s|$)/g, '$1$2')
        .replace(/<[^>]*>/g, '');

/** Take the text in the current language and fall back to english/german/the first existing one */
export const pickText = (texts: LocalizedText | undefined, language: Language): string => {
    if (!texts) {
        return '';
    }
    const text = texts[language] || texts.en || texts.de || Object.values(texts).find(t => !!t) || '';
    // the descriptions carry the line breaks of the source file - those are
    // wrapping artefacts, not part of the text, so they become spaces
    return stripMarkdown(text.replace(/\\n/g, ' '))
        .replace(/\s*\n\s*/g, ' ')
        .replace(/[ \t]{2,}/g, ' ')
        .trim();
};

export const getAuthor = (entry: BlogPageEntry): string => entry.author || entry.Author || '';

/** Newest entry first */
export const sortBlogPages = (pages: Record<string, BlogPageEntry>): string[] =>
    Object.keys(pages).sort((a, b) => {
        const dateA = parseBlogDate(a, pages[a]?.date)?.getTime() ?? 0;
        const dateB = parseBlogDate(b, pages[b]?.date)?.getTime() ?? 0;
        return dateB - dateA;
    });

export { extractHeader, type BlogMarkdownHeader } from '../../utils/markdownHeader';
