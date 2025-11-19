import { useQuery } from '@tanstack/react-query';
import { API_ENDPOINTS } from '../../config/api';

interface ForumStats {
    users: number;
    topics: number;
    posts: number;
    date: string;
}

export function useForumStats() {
    return useQuery<ForumStats>({
        queryKey: ['forumStats'],
        queryFn: async () => {
            const response = await fetch(API_ENDPOINTS.FORUM_STATS);
            if (!response.ok) {
                throw new Error('Failed to fetch forum stats');
            }
            return response.json();
        },
        staleTime: Infinity,
    });
}
