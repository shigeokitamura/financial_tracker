import { useQuery } from "@tanstack/react-query";
import { categoriesApi } from "../api/categories";

export function useCategories() {
  const categories = useQuery({
    queryKey: ["categories"],
    queryFn: () => categoriesApi.getAll(),
  });

  return { categories };
}
