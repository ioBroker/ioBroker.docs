import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { API_ENDPOINTS } from '../../config/api';
import type { Adapters } from '../../components/AdapterItem/AdapterItem';

export function useAdapters(): UseQueryResult<Adapters, Error> {
    return useQuery<Adapters>({
        queryKey: ['adapters'],
        queryFn: async () => {
            const response = await fetch(API_ENDPOINTS.ADAPTERS);
            if (!response.ok) {
                throw new Error('Failed to fetch adapters');
            }
            return response.json();
        },
        staleTime: Infinity,
    });
}
