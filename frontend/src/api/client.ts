import axios from "axios";
import { BACKEND_URL } from "../config/settings";

const API_BASE_URL = `${BACKEND_URL}/api/v1`;
const token = localStorage.getItem("authToken");

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
  },
});

export default apiClient;
