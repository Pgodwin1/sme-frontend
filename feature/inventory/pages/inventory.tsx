"use client";

import { useState } from "react";
import { PageHeader } from "@/components/app/PageHeader";
import { DataTable } from "@/components/ui/DataTable";
import { Button } from "@/components/ui/Button";
import { StatCard } from "@/components/ui/StatCard";
import { formatNaira } from "@/data/pricing";
import { useInventoryList, useCreateInventoryItem } from "@/feature/inventory/api";
import { AddItemModal } from "@/feature/inventory/components/AddItemModal";
import { BulkImportModal } from "@/feature/inventory/components/BulkImportModal";
import { inventoryColumns, type InventoryRow } from "@/feature/inventory/components/columns";

const PAGE_SIZE = 20;

export default function InventoryPage() {
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [bulkModalOpen, setBulkModalOpen] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const {
    data,
    isLoading,
    isError,
    error,
  } = useInventoryList({ page, limit: PAGE_SIZE });

  const items = data?.items ?? [];
  const rows: InventoryRow[] = items.map((item) => ({ ...item, id: item._id }));

  const lowStock = items.filter(
    (item) => (item.reorderLevel ?? 0) > 0 && item.quantity <= (item.reorderLevel ?? 0),
  );
  const totalValue = items.reduce((sum, item) => sum + item.quantity * item.price, 0);

  const {
    mutate: createItem,
    isPending: isCreating,
  } = useCreateInventoryItem({
    onSuccess: () => {
      setModalOpen(false);
      setFormError(null);
    },
    onError: (createError) => {
      setFormError(createError.message);
    },
  });

  function handleAdd(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError(null);
    const form = new FormData(e.currentTarget);

    createItem({
      name: String(form.get("name") ?? ""),
      description: String(form.get("description") ?? "") || undefined,
      category: String(form.get("category") ?? "") || undefined,
      price: Number(form.get("price") ?? 0),
      quantity: Number(form.get("quantity") ?? 0),
      reorderLevel: form.get("reorderLevel") ? Number(form.get("reorderLevel")) : undefined,
      reorderQuantity: form.get("reorderQuantity")
        ? Number(form.get("reorderQuantity"))
        : undefined,
      location: String(form.get("location") ?? "") || undefined,
      supplier: String(form.get("supplier") ?? "") || undefined,
    });
  }

  return (
    <div>
      <PageHeader
        title="Inventory"
        description="Stock levels across every product, with low-stock items flagged automatically."
        action={<Button onClick={() => setModalOpen(true)}>Add product</Button>}
      />

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Total products" value={String(data?.pagination.total ?? items.length)} />
        <StatCard label="Inventory value" value={formatNaira(totalValue)} />
        <StatCard
          label="Low stock items"
          value={String(lowStock.length)}
          tone={lowStock.length > 0 ? "warning" : "default"}
        />
      </div>

      {isError && (
        <p className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 font-body text-sm text-red-700">
          {error?.message ?? "Could not load inventory items."}
        </p>
      )}

      <DataTable
        columns={inventoryColumns}
        rows={rows}
        emptyLabel={isLoading ? "Loading inventory…" : "No inventory items yet."}
      />

      <div className="mt-4 flex items-center justify-between">
        <Button
          type="button"
          variant="ghost"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page <= 1 || isLoading}
          className="border-line text-ink-600"
        >
          Previous
        </Button>
        <span className="font-body text-xs text-ink-400">Page {page}</span>
        <Button
          type="button"
          variant="ghost"
          onClick={() => setPage((p) => p + 1)}
          disabled={isLoading || (data ? page >= data.pagination.totalPages : true)}
          className="border-line text-ink-600"
        >
          Next
        </Button>
      </div>

      <AddItemModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleAdd}
        isSubmitting={isCreating}
        error={formError}
        onBulkImportClick={() => {
          setModalOpen(false);
          setBulkModalOpen(true);
        }}
      />

      <BulkImportModal open={bulkModalOpen} onClose={() => setBulkModalOpen(false)} />
    </div>
  );
}