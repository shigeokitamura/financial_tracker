import { apiClient } from "./client";
import { Transaction, TransactionCreateParams } from "../types";

interface TransactionFilters {
  category_id?: number;
  payment_method_id?: number;
  start_date?: string;
  end_date?: string;
}

export const transactionApi = {
  getAll: async (filters?: TransactionFilters) => {
    const { data } = await apiClient.get<Transaction[]>('./transactions', { params: filters });
    return data;
  },

  getById: async (id: number) => {
    const { data } = await apiClient.get<Transaction>(`/transactions/${id}`);
    return data;
  },

  create: async (transaction: TransactionCreateParams) => {
    const { data } = await apiClient.post<Transaction>('/transactions', { transaction });
    return data;
  },

  update: async (id: number, transaction: Partial<Transaction>) => {
    const { data } = await apiClient.put<Transaction>(`/transactions/${id}`, { transaction });
    return data;
  },

  delete: async (id: number) => {
    await apiClient.delete(`/transactions/${id}`);
  },
};
