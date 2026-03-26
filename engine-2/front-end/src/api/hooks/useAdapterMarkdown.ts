import { useQuery } from '@tanstack/react-query';

export const useAdapterMarkdown = (markdownUrl: string) => {
    return useQuery<string>({
        queryKey: ['adapter-markdown', markdownUrl],
        queryFn: async () => {
            const response = await fetch(markdownUrl);
            if (!response.ok) {
                throw new Error('Failed to fetch adapter markdown');
            }
            return response.text();
        },
        enabled: Boolean(markdownUrl),
        staleTime: Infinity,
    });
};
