import {
  useMutation,
  useQuery,
  useQueryClient,
  UseMutationOptions,
  UseQueryOptions,
} from "@tanstack/react-query";
import { api } from "@/lib/api/api";
import { apiError } from "@/types/api";

export type PaymentStatus = "Paid" | "Partial" | "Unpaid";

export interface SaleLineItem {
  inventoryItem: string;
  name: string;
  unitPrice: number;
  quantity: number;
  subtotal: number;
}

export interface Sale {
  _id: string;
  receiptNumber: string;
  customerName?: string;
  customerPhone?: string;
  items: SaleLineItem[];
  totalAmount: number;
  paymentStatus: PaymentStatus;
  amountPaid: number;
  balanceDue: number;
  createdAt: string;
  updatedAt: string;
  [key: string]: unknown;
}

export interface SaleListParams {
  page?: number;
  limit?: number;
  paymentStatus?: PaymentStatus;
  customer?: string;
}

export interface SalePagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface SaleListResult {
  sales: Sale[];
  pagination: SalePagination;
}

function buildQueryString(params: SaleListParams): string {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      search.set(key, String(value));
    }
  });
  const qs = search.toString();
  return qs ? `?${qs}` : "";
}

export function useSalesList(
  params: SaleListParams = { page: 1, limit: 20 },
  options?: Omit<UseQueryOptions<SaleListResult, apiError>, "queryKey" | "queryFn">,
) {
  return useQuery({
    queryKey: ["sales", params],
    queryFn: async () => {
      // getEnvelope — pagination is a sibling of `data`, same shape as /inventory.
      const envelope = await api.getEnvelope<Sale[]>(
        `/sales${buildQueryString(params)}`,
        undefined,
        "Could not load sales.",
      );
      const sales = envelope.data ?? [];
      const pagination = (envelope as { pagination?: SalePagination }).pagination ?? {
        page: params.page ?? 1,
        limit: params.limit ?? 20,
        total: sales.length,
        totalPages: 1,
      };
      return { sales, pagination };
    },
    ...options,
  });
}

export interface CreateSaleItemInput {
  inventoryItem: string;
  quantity: number;
}

export interface CreateSalePayload {
  customerName?: string;
  customerPhone?: string;
  items: CreateSaleItemInput[];
  paymentStatus: PaymentStatus;
  /** Required when paymentStatus is "Partial". */
  amountPaid?: number;
}

export function useCreateSale(
  options?: UseMutationOptions<Sale, apiError, CreateSalePayload>,
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateSalePayload) =>
      api.post<Sale>("/sales", data, undefined, "Could not record this sale. Please try again."),
    ...options,
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: ["sales"] });
      // A sale decrements stock server-side — keep the inventory list (and
      // the product picker on this page) in sync.
      queryClient.invalidateQueries({ queryKey: ["inventory"] });
      options?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export interface UpdateSalePaymentPayload {
  id: string;
  paymentStatus?: PaymentStatus;
  amountPaid?: number;
}

export function useUpdateSalePayment(
  options?: UseMutationOptions<Sale, apiError, UpdateSalePaymentPayload>,
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...data }: UpdateSalePaymentPayload) =>
      api.patch<Sale>(`/sales/${id}/payment`, data, undefined, "Could not update payment."),
    ...options,
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: ["sales"] });
      options?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export function useDeleteSale(
  options?: UseMutationOptions<{ message: string }, apiError, string>,
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      api.delete<{ message: string }>(`/sales/${id}`, undefined, "Could not delete this sale."),
    ...options,
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: ["sales"] });
      // Deleting a sale restores the stock it used.
      queryClient.invalidateQueries({ queryKey: ["inventory"] });
      options?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}
