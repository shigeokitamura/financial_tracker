import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { transactionApi } from '../api/transactions';
import type { Transaction, TransactionFilters } from '../types';

export function useTransactions(filters?: TransactionFilters) {
  const queryClient = useQueryClient();

  const transactions = useQuery({
    queryKey: ['transactions', filters],
    queryFn: () => transactionApi.getAll(filters),
  });

  const createTransaction = useMutation({
    mutationFn: transactionApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
    },
  });

  const updateTransaction = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Transaction> }) =>
      transactionApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
    },
  });

  const deleteTransaction = useMutation({
    mutationFn: transactionApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
    },
  });

  return {
    transactions,
    createTransaction,
    updateTransaction,
    deleteTransaction,
  };
}
