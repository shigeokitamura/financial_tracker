import { apiClient } from "./client";
import { PaymentMethod } from "../types/paymentMethod";

export const paymentMethodsApi = {
  getAll: async (): Promise<PaymentMethod[]> => {
    const { data } = await apiClient.get<PaymentMethod[]>("/payment_methods");
    return data;
  }
};
