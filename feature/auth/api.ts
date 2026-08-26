import { apiClient } from "@/config/api";
import { apiError } from "@/types/api";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { api } from "@/lib/api/api";
import type { AuthUser } from "@/store/useAuthStore";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  businessName: string;
  industry: string;
  size: string;
  fullName: string;
  email: string;
  password: string;
  modules: string[];
}

// The backend returns the user record flat (no `user` wrapper, no
// `refreshToken`) — same shape for both /login and /register, since both
// resolve to UserController's UserWithModules response.
export interface AuthUserResponse {
  _id: string;
  fullName: string;
  email: string;
  businessName?: string;
  industry?: string;
  size?: string;
  role?: string;
  isOnboarded?: boolean;
  token: string;
  modules: string[];
  createdAt?: string;
  updatedAt?: string;
  [key: string]: unknown;
}

export type LoginResponse = AuthUserResponse;
export type RegisterResponse = AuthUserResponse;

// Maps the backend's flat user record (`_id`) onto the auth store's shape (`id`).
export function toAuthUser({ _id, ...rest }: AuthUserResponse): AuthUser {
  return { id: _id, ...rest };
}

// Note: renamed from the earlier `register()` to `useRegister()` — hooks must
// start with "use" or the rules-of-hooks eslint rule (and React itself) will
// flag/mistreat it as a regular function rather than a hook.
export function useRegister(
  options?: UseMutationOptions<RegisterResponse, apiError, RegisterPayload>,
) {
  return useMutation({
    mutationFn: (data: RegisterPayload) =>
      api.post<RegisterResponse>(
        "/register",
        data,
        undefined,
        "Registration failed.",
      ),
    ...options,
  });
}

export function useLogin(
  options?: UseMutationOptions<LoginResponse, apiError, LoginPayload>,
) {
  return useMutation({
    mutationFn: (data: LoginPayload) =>
      api.post<LoginResponse>("/login", data, undefined, "Login failed."),
    ...options,
  });
}
