import { useAuthStore } from "@/store/useAuthStore";
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach auth token automatically on every request
apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {

	const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Normalize every error into one predictable shape before it ever
// reaches calling code, so nothing downstream has to guess at
// err.response?.data?.message vs err.message vs a network failure.
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError<any>) => {
    const normalized: ApiError = {
      message:
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Something went wrong. Please try again.",
      status: error.response?.status ?? null,
      code: error.code ?? null,
      fieldErrors: error.response?.data?.errors ?? null, // e.g. Zod/validation field errors from backend
      raw: error,
    };
    return Promise.reject(normalized);
  },
);

export interface ApiError {
  message: string;
  status: number | null;
  code: string | null;
  fieldErrors: Record<string, string> | null;
  raw: unknown;
}
