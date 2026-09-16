import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { SEARCH_URL } from '../../config/api';

/** Where a hit belongs. The pipeline decides this per document, the server passes it through */
export const SEARCH_CATEGORIES = ['docs', 'adapters', 'blog'] as const;
export type SearchCategory = (typeof SEARCH_CATEGORIES)[number];

/**
 * A piece of a title or a snippet.
 *
 * The server marks the hits itself and hands the field over already cut into parts, so nothing
 * that reaches this app is HTML and nothing has to be matched a second time in the browser.
 */
export interface TextPart {
    text: string;
    hit: boolean;
}

export interface SearchHit {
    path: string;
    /** a route of this app, e.g. `/docs/admin/settings.md` or `/adapters/backitup` */
    route: string;
    category: SearchCategory;
    section: string;
    title: TextPart[];
    snippet: TextPart[];
}

export interface SearchAnswer {
    query: string;
    language: string;
    total: number;
    offset: number;
    limit: number;
    /** how many hits every category holds - the numbers on the filter bar */
    categories: Record<SearchCategory, number>;
    results: SearchHit[];
}

export const EMPTY_ANSWER: SearchAnswer = {
    query: '',
    language: '',
    total: 0,
    offset: 0,
    limit: 0,
    categories: { docs: 0, adapters: 0, blog: 0 },
    results: [],
};

export interface SearchRequest {
    query: string;
    language: string;
    limit?: number;
    offset?: number;
    category?: SearchCategory | '';
}

/** The shortest query worth asking about - one letter matches half the documentation */
export const MIN_QUERY_LENGTH = 2;

function buildUrl(request: SearchRequest): string {
    const params = new URLSearchParams({ ln: request.language, q: request.query });
    if (request.limit) {
        params.set('limit', String(request.limit));
    }
    if (request.offset) {
        params.set('offset', String(request.offset));
    }
    if (request.category) {
        params.set('category', request.category);
    }
    return `${SEARCH_URL}?${params.toString()}`;
}

/**
 * Asks the search.
 *
 * A query shorter than {@link MIN_QUERY_LENGTH} is not sent at all; the answer is kept for a while,
 * because typing a letter and deleting it again should not cost a second request.
 *
 * @param request what to look for
 */
export function useSearch(request: SearchRequest): UseQueryResult<SearchAnswer, Error> {
    const query = request.query.trim();
    const enabled = query.length >= MIN_QUERY_LENGTH;

    return useQuery<SearchAnswer>({
        queryKey: ['search', request.language, query, request.category || '', request.limit, request.offset],
        queryFn: async () => {
            const response = await fetch(buildUrl({ ...request, query }));
            if (!response.ok) {
                throw new Error(`search failed with ${response.status}`);
            }
            return (await response.json()) as SearchAnswer;
        },
        enabled,
        placeholderData: previous => previous,
        staleTime: 5 * 60 * 1000,
        retry: false,
    });
}
