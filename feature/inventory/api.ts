import {
  useMutation,
  useQuery,
  useQueryClient,
  UseMutationOptions,
  UseQueryOptions,
} from "@tanstack/react-query";
import { api } from "@/lib/api/api";
import { apiError } from "@/types/api";

// Matches the fields accepted by POST /inventory per the API docs. The
// backend assigns _id, and (per the docs) derives `status` server-side, but
// we still let the form send one since the Swagger example includes it.
export interface InventoryItem {
  _id: string;
  name: string;
  description?: string;
  quantity: number;
  price: number;
  category?: string;
  location?: string;
  supplier?: string;
  reorderLevel?: number;
  reorderQuantity?: number;
  lastOrderedDate?: string;
  lastReceivedDate?: string;
  status?: string;
  [key: string]: unknown;
}

export interface InventoryListParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  createdFrom?: string;
  createdTo?: string;
}

export interface InventoryPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface InventoryListResult {
  items: InventoryItem[];
  pagination: InventoryPagination;
}

function buildQueryString(params: InventoryListParams): string {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      search.set(key, String(value));
    }
  });
  const qs = search.toString();
  return qs ? `?${qs}` : "";
}

export function useInventoryList(
  params: InventoryListParams = { page: 1, limit: 20 },
  options?: Omit<UseQueryOptions<InventoryListResult, apiError>, "queryKey" | "queryFn">,
) {
  return useQuery({
    queryKey: ["inventory", params],
    queryFn: async () => {
      // getEnvelope (not get) — the backend sends `pagination` as a sibling
      // of `data`, not nested inside it, confirmed from a real response:
      // { success, data: [...], pagination: { page, limit, total, totalPages } }
      const envelope = await api.getEnvelope<InventoryItem[]>(
        `/inventory${buildQueryString(params)}`,
        undefined,
        "Could not load inventory items.",
      );
      const items = envelope.data ?? [];
      const pagination = (envelope as { pagination?: InventoryPagination }).pagination ?? {
        page: params.page ?? 1,
        limit: params.limit ?? 20,
        total: items.length,
        totalPages: 1,
      };
      return { items, pagination };
    },
    ...options,
  });
}

export interface CreateInventoryItemPayload {
  name: string;
  description?: string;
  quantity: number;
  price: number;
  category?: string;
  location?: string;
  supplier?: string;
  reorderLevel?: number;
  reorderQuantity?: number;
  lastOrderedDate?: string;
  lastReceivedDate?: string;
  status?: string;
}

export interface BulkImportError {
  row: number;
  message: string;
}

export interface BulkImportResult {
  items: InventoryItem[];
  imported: number;
  skipped: number;
  errors: BulkImportError[];
}

export function useBulkImportInventory(
  options?: UseMutationOptions<BulkImportResult, apiError, File>,
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) => {
      const formData = new FormData();
      formData.append("file", file);
      // apiClient sets a default `Content-Type: application/json` header,
      // and axios does not override an already-present header for FormData
      // bodies — so without this, the request goes out as JSON and the
      // backend never sees a real multipart body (multer finds no file).
      // Setting it to `undefined` here removes it so the browser can add
      // the correct `multipart/form-data; boundary=...` itself.
      return api.post<BulkImportResult>(
        "/inventory/bulk-import",
        formData,
        { headers: { "Content-Type": undefined } },
        "Could not import the file. Check the format and try again.",
      );
    },
    ...options,
    onSuccess: (data, variables, onMutateResult, context) => {
      // Refetch the list so newly-imported items show up without a manual reload.
      queryClient.invalidateQueries({ queryKey: ["inventory"] });
      options?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export function useCreateInventoryItem(
  options?: UseMutationOptions<InventoryItem, apiError, CreateInventoryItemPayload>,
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateInventoryItemPayload) =>
      api.post<InventoryItem>(
        "/inventory",
        data,
        undefined,
        "Could not add item. Please try again.",
      ),
    ...options,
    onSuccess: (data, variables, onMutateResult, context) => {
      // Refetch the list so a newly-added item shows up without a manual reload.
      queryClient.invalidateQueries({ queryKey: ["inventory"] });
      options?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}