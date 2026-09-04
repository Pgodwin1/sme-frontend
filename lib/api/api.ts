import { AxiosRequestConfig } from "axios";
import { apiClient } from "@/config/api";
import { apiError } from "@/types/api";
import { normalizeApiError } from "@/lib/utils";

interface ApiEnvelope<T = unknown> {
  success?: boolean;
  message?: string;
  data?: T;
  [key: string]: unknown;
}

async function request<T = unknown>(
  config: AxiosRequestConfig,
  fallbackMessage = "Request failed.",
): Promise<T> {
  let response;
  try {
    response = await apiClient.request<ApiEnvelope<T>>(config);
  } catch (error) {
    // Network/HTTP failures only — normalizeApiError handles real axios errors here
    throw normalizeApiError(error, fallbackMessage);
  }

  // Backend responded 2xx but flagged the payload as unsuccessful
  if (response.data?.success === false) {
    throw {
      code: "API_ERROR",
      message: response.data?.message || fallbackMessage,
      status: response.status || 500,
      timestamp: new Date().toISOString(),
      raw: response.data,
    } as apiError;
  }

  // Unwrap the { success, data } envelope — endpoints that only return a
  // message (no `data`) fall back to the envelope itself.
  return (response.data?.data ?? response.data) as T;
}

export const api = {
  get: <T = unknown>(
    url: string,
    config?: AxiosRequestConfig,
    fallbackMessage?: string,
  ) => request<T>({ ...config, method: "GET", url }, fallbackMessage),

  post: <T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
    fallbackMessage?: string,
  ) => request<T>({ ...config, method: "POST", url, data }, fallbackMessage),

  put: <T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
    fallbackMessage?: string,
  ) => request<T>({ ...config, method: "PUT", url, data }, fallbackMessage),

  patch: <T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
    fallbackMessage?: string,
  ) => request<T>({ ...config, method: "PATCH", url, data }, fallbackMessage),

  delete: <T = unknown>(
    url: string,
    config?: AxiosRequestConfig,
    fallbackMessage?: string,
  ) => request<T>({ ...config, method: "DELETE", url }, fallbackMessage),
};
