import { useQuery } from "@tanstack/react-query";
import { paymentMethodsApi } from "../api/paymentMethods";

export function usePaymentMethods() {
  const paymentMethods = useQuery({
    queryKey: ["paymentMethods"],
    queryFn: () => paymentMethodsApi.getAll(),
  });

  return { paymentMethods };
}
