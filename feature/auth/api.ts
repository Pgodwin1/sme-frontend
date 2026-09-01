import { apiClient } from "@/config/api";
import { apiError } from "@/types/api";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { api } from "@/lib/api/api";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  refreshToken?: string | null;
  user: {
    id: string;
    email: string;
    entityId?: string;
    [key: string]: unknown;
  };
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

export interface RegisterResponse {
  token: string;
  refreshToken?: string | null;
  user: {
    id: string;
    email: string;
    entityId?: string;
    [key: string]: unknown;
  };
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

export interface ForgotPasswordPayload {
  email: string;
}

export interface ForgotPasswordResponse {
  message?: string;
}

// Requests a password reset OTP by email.
export function useForgotPassword(
  options?: UseMutationOptions<
    ForgotPasswordResponse,
    apiError,
    ForgotPasswordPayload
  >,
) {
  return useMutation({
    mutationFn: (data: ForgotPasswordPayload) =>
      api.post<ForgotPasswordResponse>(
        "/forgot-password",
        data,
        undefined,
        "Could not send reset code. Please try again.",
      ),
    ...options,
  });
}

export interface VerifyOtpPayload {
  email: string;
  otp: string;
}

export interface VerifyOtpResponse {
  resetToken: string;
}

// Verifies the OTP sent for password reset; returns a short-lived reset token.
export function useVerifyOtp(
  options?: UseMutationOptions<VerifyOtpResponse, apiError, VerifyOtpPayload>,
) {
  return useMutation({
    mutationFn: (data: VerifyOtpPayload) =>
      api.post<VerifyOtpResponse>(
        "/verify-otp",
        data,
        undefined,
        "Invalid or expired code. Please try again.",
      ),
    ...options,
  });
}

export interface ResetPasswordPayload {
  resetToken: string;
  newPassword: string;
}

export interface ResetPasswordResponse {
  message?: string;
}

// Resets the password using the verified reset token from useVerifyOtp.
export function useResetPassword(
  options?: UseMutationOptions<
    ResetPasswordResponse,
    apiError,
    ResetPasswordPayload
  >,
) {
  return useMutation({
    mutationFn: (data: ResetPasswordPayload) =>
      api.post<ResetPasswordResponse>(
        "/reset-password",
        data,
        undefined,
        "Could not reset password. Please try again.",
      ),
    ...options,
  });
}
