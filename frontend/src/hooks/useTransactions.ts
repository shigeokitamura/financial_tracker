import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { transactionsApi } from "../api/transactions";
import { TransactionRequestParams } from "../types/transaction";

export function useTransactions() {
  const queryClient = useQueryClient();

  const transactions = useQuery({
    queryKey: ["transactions"],
    queryFn: () => transactionsApi.getAll(),
  });

  const createTransaction = useMutation({
    mutationFn: transactionsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });

  const updateTransaction = useMutation({
    mutationFn: ({ id, data }: { id: number, data: TransactionRequestParams }) =>
      transactionsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });

  const deleteTransaction = useMutation({
    mutationFn: transactionsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });

  return {
    transactions,
    createTransaction,
    updateTransaction,
    deleteTransaction,
  };
}
