export interface Transaction {
  id: number;
  userId: number;
  name: string;
  date: Date;
  amount: number;
  currency: string;
  description: string;
  categoryId: number;
  paymentMethodId: number;
};

export interface TransactionRequestParams {
  name: string;
  date: Date;
  amount: number;
  currency: string;
  description: string;
  category_id: number;
  payment_method_id: number;
};

export interface TransactionResponseParams {
  id: number;
  user_id: number;
  name: string;
  date: Date;
  amount: number;
  currency: string;
  description: string;
  category_id: number;
  payment_method_id: number;
};
