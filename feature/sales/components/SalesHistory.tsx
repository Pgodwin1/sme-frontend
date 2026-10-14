"use client";

import { useState } from "react";
import { DataTable, type Column } from "@/components/ui/DataTable";
import { Button } from "@/components/ui/Button";
import { StatCard } from "@/components/ui/StatCard";
import { formatNaira } from "@/data/pricing";
import {
  useSalesList,
  useUpdateSalePayment,
  useDeleteSale,
  type Sale,
  type PaymentStatus,
} from "@/feature/sales/api";

const PAGE_SIZE = 20;

type SaleRow = Sale & { id: string };

const paymentOptions: PaymentStatus[] = ["Paid", "Partial", "Unpaid"];

export function SalesHistory() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, error } = useSalesList({ page, limit: PAGE_SIZE });

  const sales = data?.sales ?? [];
  const rows: SaleRow[] = sales.map((s) => ({ ...s, id: s._id }));

  const revenue = sales
    .filter((s) => s.paymentStatus === "Paid")
    .reduce((sum, s) => sum + s.totalAmount, 0);
  const outstanding = sales.reduce((sum, s) => sum + s.balanceDue, 0);
  const unpaidCount = sales.filter((s) => s.paymentStatus === "Unpaid").length;

  const { mutate: updatePayment } = useUpdateSalePayment();
  const { mutate: removeSale } = useDeleteSale();

  function handleStatusChange(sale: SaleRow, paymentStatus: PaymentStatus) {
    updatePayment({ id: sale._id, paymentStatus });
  }

  function handleDelete(sale: SaleRow) {
    if (window.confirm(`Delete ${sale.receiptNumber}? This restores the stock it used.`)) {
      removeSale(sale._id);
    }
  }

  const columns: Column<SaleRow>[] = [
    {
      header: "Receipt",
      accessor: (r) => <span className="font-mono text-xs text-ink-500">{r.receiptNumber}</span>,
    },
    {
      header: "Customer",
      accessor: (r) => <span className="font-medium text-ink">{r.customerName || "Walk-in"}</span>,
    },
    {
      header: "Items",
      accessor: (r) => `${r.items.length} item${r.items.length === 1 ? "" : "s"}`,
    },
    { header: "Total", accessor: (r) => formatNaira(r.totalAmount), align: "right" },
    { header: "Date", accessor: (r) => new Date(r.createdAt).toLocaleDateString() },
    {
      header: "Status",
      accessor: (r) => (
        <select
          value={r.paymentStatus}
          onChange={(e) => handleStatusChange(r, e.target.value as PaymentStatus)}
          className="rounded border border-line bg-white px-2 py-1 font-mono text-[10px] text-ink-600"
        >
          {paymentOptions.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      ),
    },
    {
      header: "",
      accessor: (r) => (
        <button
          type="button"
          onClick={() => handleDelete(r)}
          className="font-body text-xs font-medium text-red-600 hover:underline"
        >
          Delete
        </button>
      ),
    },
  ];

  return (
    <div>
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Revenue collected" value={formatNaira(revenue)} hint="paid sales" />
        <StatCard label="Outstanding" value={formatNaira(outstanding)} hint="partial + unpaid" />
        <StatCard
          label="Unpaid sales"
          value={String(unpaidCount)}
          tone={unpaidCount > 0 ? "warning" : "default"}
        />
      </div>

      {isError && (
        <p className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 font-body text-sm text-red-700">
          {error?.message ?? "Could not load sales."}
        </p>
      )}

      <DataTable
        columns={columns}
        rows={rows}
        emptyLabel={isLoading ? "Loading sales…" : "No sales recorded yet."}
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
    </div>
  );
}
