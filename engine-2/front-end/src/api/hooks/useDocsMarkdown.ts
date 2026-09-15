import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { API_ENDPOINTS } from '../../config/api';
import { fetchMarkdown } from '../fetchMarkdown';

export function useDocsMarkdown(url: string = API_ENDPOINTS.DOCS_README_EN): UseQueryResult<string, Error> {
    return useQuery<string>({
        queryKey: ['docs-markdown', url],
        queryFn: () => fetchMarkdown(url, 'docs markdown'),
        staleTime: Infinity,
    });
}
