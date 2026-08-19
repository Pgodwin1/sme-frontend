import { apiError } from "@/types/api";
import axios from "axios";

export function cn(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}

export function normalizeApiError(
  error: unknown,
  fallbackMessage = "Something went wrong.",
): apiError {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status || 500;
    const message =
      error.response?.data?.message || error.message || fallbackMessage;
    const code =
      status >= 500
        ? "SERVER_ERROR"
        : status === 401
          ? "UNAUTHORIZED"
          : status === 404
            ? "NOT_FOUND"
            : "API_ERROR";

    return {
      code,
      message,
      status,
      timestamp: new Date().toISOString(),
      raw: error.response?.data || error,
    };
  }

  if (typeof error === "object" && error !== null && "message" in error) {
    const message =
      typeof (error as { message?: unknown }).message === "string"
        ? (error as { message: string }).message
        : fallbackMessage;

    return {
      code: "UNKNOWN_ERROR",
      message,
      status: 500,
      timestamp: new Date().toISOString(),
      raw: error,
    };
  }

  return {
    code: "UNKNOWN_ERROR",
    message: fallbackMessage,
    status: 500,
    timestamp: new Date().toISOString(),
    raw: error,
  };
}
