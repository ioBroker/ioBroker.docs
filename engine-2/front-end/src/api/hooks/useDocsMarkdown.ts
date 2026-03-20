import { useQuery } from '@tanstack/react-query';
import { API_ENDPOINTS } from '../../config/api';

export function useDocsMarkdown(url: string = API_ENDPOINTS.DOCS_README_EN) {
    return useQuery<string>({
        queryKey: ['docs-markdown', url],
        queryFn: async () => {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to fetch docs markdown');
            }
            return response.text();
        },
        staleTime: Infinity,
    });
}
