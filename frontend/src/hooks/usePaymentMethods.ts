import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../api/client';
import { PaymentMethod } from '../types';

export function usePaymentMethods() {
  return useQuery<PaymentMethod[]>({
    queryKey: ['payment_methods'],
    queryFn: async () => {
      const { data } = await apiClient.get('/payment_methods');
      return data;
    },
  });
}
