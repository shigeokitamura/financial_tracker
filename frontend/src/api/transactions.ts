import { apiClient } from "./client";
import { Transaction, TransactionRequestParams, TransactionResponseParams } from "../types/transaction";


const convertToTransaction = (response: TransactionResponseParams): Transaction => {
  return {
    id: response.id,
    userId: response.user_id,
    name: response.name,
    date: response.date,
    amount: response.amount,
    currency: response.currency,
    description: response.description,
    categoryId: response.category_id,
    paymentMethodId: response.payment_method_id,
  };
}

export const transactionsApi = {
  getAll: async (): Promise<Transaction[]> => {
    const { data } = await apiClient.get<TransactionResponseParams[]>("/transactions");
    return data.map(convertToTransaction);
  },

  getById: async (id: number): Promise<Transaction> => {
    const { data } = await apiClient.get<TransactionResponseParams>(`/transactions/${id}`);
    return convertToTransaction(data);
  },

  create: async (transaction: TransactionRequestParams): Promise<Transaction> => {
    const { data } = await apiClient.post<TransactionResponseParams>("/transactions", transaction);
    return convertToTransaction(data);
  },

  update: async (id: number, transaction: TransactionRequestParams): Promise<Transaction> => {
    const { data } = await apiClient.put<TransactionResponseParams>(`/transactions/${id}`, transaction);
    return convertToTransaction(data);
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/transactions/${id}`);
  }
};
