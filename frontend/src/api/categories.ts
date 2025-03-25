import { apiClient } from "./client";
import { Category } from "../types/category";

export const categoriesApi = {
  getAll: async (): Promise<Category[]> => {
    const { data } = await apiClient.get<Category[]>("/categories");
    return data;
  }
};
