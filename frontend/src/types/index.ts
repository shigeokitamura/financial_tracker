export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Category {
  id: number;
  name: string;
  description?: string;
  created_at: string;
}

export interface PaymentMethod {
  id: number;
  name: string;
  description?: string;
  created_at: string;
}

export interface Transaction {
  id: number;
  amount: number;
  currency: string;
  title: string;
  date: string;
  description?: string;
  category: Category;
  payment_method: PaymentMethod;
  created_at: string;
}

export interface TransactionCreateParams {
  amount: number;
  currency: string;
  title: string;
  date: string;
  description?: string;
  category_id: number;
  payment_method_id: number;
}

export interface TransactionEditParams {
  amount: number;
  currency: string;
  title: string;
  date: string;
  description?: string;
  category_id: number;
  payment_method_id: number;
};

export interface TransactionFilters {
  category_id?: number;
  payment_method_id?: number;
  start_date?: string;
  end_date?: string;
}
