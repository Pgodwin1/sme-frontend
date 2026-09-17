"use client";

import { useState } from "react";
import { PageHeader } from "@/components/app/PageHeader";
import { DataTable, type Column } from "@/components/ui/DataTable";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Field, Input } from "@/components/ui/Form";
import { StatCard } from "@/components/ui/StatCard";
import { formatNaira } from "@/data/pricing";
import {
  useInventoryList,
  useCreateInventoryItem,
  type InventoryItem,
} from "@/feature/inventory/api";

const PAGE_SIZE = 20;

// DataTable requires each row to have an `id`; the backend uses `_id`.
type InventoryRow = InventoryItem & { id: string };

export default function InventoryPage() {
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
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

  const columns: Column<InventoryRow>[] = [
    {
      header: "Product",
      accessor: (r) => (
        <div>
          <p className="font-medium text-ink">{r.name}</p>
          {r.description && (
            <p className="font-mono text-[11px] text-ink-400">{r.description}</p>
          )}
        </div>
      ),
    },
    { header: "Category", accessor: (r) => r.category ?? "—" },
    { header: "Unit price", accessor: (r) => formatNaira(r.price), align: "right" },
    {
      header: "Quantity",
      accessor: (r) => (
        <span
          className={
            r.reorderLevel && r.quantity <= r.reorderLevel
              ? "font-semibold text-amber-dark"
              : "text-ink-700"
          }
        >
          {r.quantity}
        </span>
      ),
      align: "right",
    },
    {
      header: "Status",
      accessor: (r) =>
        r.reorderLevel && r.quantity <= r.reorderLevel ? (
          <Badge tone="warning">Reorder now</Badge>
        ) : (
          <Badge tone="success">{r.status ?? "In stock"}</Badge>
        ),
    },
  ];

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
        columns={columns}
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

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Add product">
        <form onSubmit={handleAdd} className="flex flex-col gap-4">
          <Field label="Product name" htmlFor="name">
            <Input id="name" name="name" required placeholder="e.g. Vegetable Oil (5L)" />
          </Field>
          <Field label="Description" htmlFor="description">
            <Input id="description" name="description" placeholder="e.g. 5-litre bottle, refined" />
          </Field>
          <Field label="Category" htmlFor="category">
            <Input id="category" name="category" placeholder="e.g. Grocery" />
          </Field>
          <Field label="Unit price (₦)" htmlFor="price">
            <Input id="price" name="price" type="number" required min={0} placeholder="4500" />
          </Field>
          <Field label="Quantity" htmlFor="quantity">
            <Input id="quantity" name="quantity" type="number" required min={0} placeholder="50" />
          </Field>
          <Field label="Reorder level" htmlFor="reorderLevel">
            <Input id="reorderLevel" name="reorderLevel" type="number" min={0} placeholder="15" />
          </Field>
          <Field label="Reorder quantity" htmlFor="reorderQuantity">
            <Input id="reorderQuantity" name="reorderQuantity" type="number" min={0} placeholder="50" />
          </Field>
          <Field label="Location" htmlFor="location">
            <Input id="location" name="location" placeholder="e.g. Main Store" />
          </Field>
          <Field label="Supplier" htmlFor="supplier">
            <Input id="supplier" name="supplier" placeholder="e.g. Dangote Foods" />
          </Field>

          {formError && (
            <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 font-body text-xs text-red-700">
              {formError}
            </p>
          )}

          <Button type="submit" className="mt-2 w-full" disabled={isCreating}>
            {isCreating ? "Adding..." : "Add product"}
          </Button>
        </form>
      </Modal>
    </div>
  );
}