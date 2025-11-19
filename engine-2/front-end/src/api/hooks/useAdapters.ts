import { useQuery } from '@tanstack/react-query';
import { API_ENDPOINTS } from '../../config/api';

interface AdapterItem {
  title: Record<string, string>;
  content: string;
  icon: string;
  keywords: string;
  authors: string;
  license: string;
  published: string;
  version: string;
  latestVersion: string;
  description: Record<string, string>;
  installs?: number;
  weekDownloads?: number;
  stars?: number;
}

interface Category {
  title: Record<string, string>;
  pages: Record<string, AdapterItem>;
}

interface Adapters {
  pages: Record<string, Category>;
}

export function useAdapters() {
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
