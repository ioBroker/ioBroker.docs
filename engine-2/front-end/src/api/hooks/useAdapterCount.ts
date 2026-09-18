import { useQuery, type UseQueryResult } from '@tanstack/react-query';

/**
 * How many adapters there are.
 *
 * The start page shows the number and nothing else of the list, and the list is 1.8 megabytes
 * unpacked - it used to be fetched in full for it, on the page every visitor sees first. The
 * server counts them out of the same file it reads anyway (`/api/adapters/count` in
 * `src/lib/web.ts`) and answers with a single number.
 *
 * A failure is not worth a message here: the caller keeps its own lower bound.
 */
export function useAdapterCount(): UseQueryResult<number, Error> {
    return useQuery<number>({
        queryKey: ['adapters-count'],
        queryFn: async () => {
            const response = await fetch('/api/adapters/count');
            if (!response.ok) {
                throw new Error('Failed to fetch the number of adapters');
            }
            const data = (await response.json()) as { total?: number };
            return data.total ?? 0;
        },
        staleTime: Infinity,
        retry: false,
    });
}
