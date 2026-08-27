import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { API_ENDPOINTS, buildIoBrokerUrl } from '../../config/api';
import type { Language } from '../../utils/i18n';

/** Texts of a blog entry, keyed by language ("de", "en", "ru", "zh-cn", ...) */
export type LocalizedText = Record<string, string | undefined>;

export interface BlogPageEntry {
    /** e.g. "2025.04.04" */
    date?: string;
    title: LocalizedText;
    desc?: LocalizedText;
    /** e.g. "de/blog/images/2025_04_04.png" */
    logo?: string;
    type?: string;
    originalName?: string;
    author?: string;
    Author?: string;
}

export interface BlogContent {
    pages: Record<string, BlogPageEntry>;
}

export function useBlogContent(): UseQueryResult<BlogContent, Error> {
    return useQuery<BlogContent>({
        queryKey: ['blog-content'],
        queryFn: async () => {
            const response = await fetch(API_ENDPOINTS.BLOG_CONTENT);
            if (!response.ok) {
                throw new Error('Failed to fetch blog content');
            }
            return response.json();
        },
        staleTime: Infinity,
    });
}

export interface BlogMarkdown {
    text: string;
    /** language the text was finally loaded in (may differ from the requested one) */
    language: Language;
}

/**
 * Load the markdown of one blog entry.
 * Not every entry exists in every language, so english/german are used as fallback.
 */
export function useBlogMarkdown(pageId: string | undefined, language: Language): UseQueryResult<BlogMarkdown, Error> {
    return useQuery<BlogMarkdown>({
        queryKey: ['blog-markdown', pageId, language],
        enabled: !!pageId,
        queryFn: async () => {
            const candidates = [language, 'en', 'de'].filter((lng, i, arr): lng is Language => arr.indexOf(lng) === i);

            for (const lng of candidates) {
                try {
                    const response = await fetch(buildIoBrokerUrl(`${lng}/blog/${pageId!}.md`));
                    if (response.ok) {
                        const text = await response.text();
                        // a missing file may be answered with the index.html of the SPA
                        if (!/^\s*<(!doctype|html)/i.test(text)) {
                            return { text, language: lng };
                        }
                    }
                } catch {
                    // try the next language
                }
            }

            throw new Error(`Blog entry ${pageId!} not found`);
        },
        staleTime: Infinity,
    });
}
