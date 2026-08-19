import { z } from "zod";

export const apiErrorCodeSchema = z.enum([
  "API_ERROR",
  "VALIDATION_ERROR",
  "UNAUTHORIZED",
  "FORBIDDEN",
  "NOT_FOUND",
  "SERVER_ERROR",
  "NETWORK_ERROR",
  "TIMEOUT_ERROR",
  "REQUEST_CANCELLED",
  "UNKNOWN_ERROR",
]);
export type apiErrorCode = z.infer<typeof apiErrorCodeSchema>;

export const errorPresentationSchema = z.enum(["toast", "inline", "page"]);
export type errorPresentation = z.infer<typeof errorPresentationSchema>;

/** Field-level validation errors keyed by form field name */
export const apiFieldErrorsSchema = z.record(z.string(), z.array(z.string()));
export type apiFieldErrors = z.infer<typeof apiFieldErrorsSchema>;

/**
 * Shared API error model used across transport, forms, and UI fallback states.
 */
export const apiErrorSchema = z.object({
  code: apiErrorCodeSchema,
  message: z.string(),
  status: z.number(),
  timestamp: z.string(),
  requestId: z.string().optional(),
  fieldErrors: apiFieldErrorsSchema.optional(),
  presentation: errorPresentationSchema.optional(),
  isSessionExpired: z.boolean().optional(),
  raw: z.unknown().optional(),
});
export type apiError = z.infer<typeof apiErrorSchema>;

/** Success response factory */
export const createApiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    success: z.literal(true),
    data: dataSchema,
    timestamp: z.string(),
  });

export type apiResponse<T> = {
  success: true;
  data: T;
  timestamp: string;
};

/** Error response */
export const apiErrorResponseSchema = z.object({
  success: z.literal(false),
  error: apiErrorSchema,
});
export type apiErrorResponse = z.infer<typeof apiErrorResponseSchema>;

/** Success OR error (use discriminated union factory) */
export const createNormalizedApiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.discriminatedUnion("success", [createApiResponseSchema(dataSchema), apiErrorResponseSchema]);

export type normalizedApiResponse<T> = apiResponse<T> | apiErrorResponse;
