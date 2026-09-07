import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { fetchMarkdown } from '../fetchMarkdown';

export const useAdapterMarkdown = (markdownUrl: string): UseQueryResult<string, Error> => {
    return useQuery<string>({
        queryKey: ['adapter-markdown', markdownUrl],
        queryFn: () => fetchMarkdown(markdownUrl, 'adapter markdown'),
        enabled: Boolean(markdownUrl),
        staleTime: Infinity,
    });
};
