import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../api/client';
import { Category } from '../types';

export function useCategories() {
  return useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data } = await apiClient.get('/categories');
      return data;
    },
  });
}
