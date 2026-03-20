import { useQuery } from '@tanstack/react-query';
import { API_ENDPOINTS } from '../../config/api';
import type { Docs } from '../../components/DocsItem/DocsItem';

export function useDocsContent() {
    return useQuery<Docs>({
        queryKey: ['docs-content'],
        queryFn: async () => {
            const response = await fetch(API_ENDPOINTS.DOCS_CONTENT);
            if (!response.ok) {
                throw new Error('Failed to fetch docs content');
            }
            return response.json();
        },
        staleTime: Infinity,
    });
}
