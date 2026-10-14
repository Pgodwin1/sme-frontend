"use client";

import { useMemo, useState } from "react";
import { Field, Input } from "@/components/ui/Form";
import { Button } from "@/components/ui/Button";
import { formatNaira } from "@/data/pricing";
import { cn } from "@/lib/utils";
import { useInventoryList } from "@/feature/inventory/api";
import { useCreateSale, type PaymentStatus, type Sale } from "@/feature/sales/api";
import { useAuthStore } from "@/store/useAuthStore";
import { Receipt } from "@/feature/sales/components/Receipt";
import { ProductSearchSelect } from "@/feature/sales/components/ProductSearchSelect";

interface CartLine {
  key: string;
  inventoryItemId: string;
  /** "" while the field is being cleared/retyped — never coerced mid-edit. */
  quantity: number | "";
}

function emptyLine(): CartLine {
  return { key: Math.random().toString(36).slice(2), inventoryItemId: "", quantity: 1 };
}

const paymentOptions: PaymentStatus[] = ["Paid", "Partial", "Unpaid"];

export function NewSaleForm() {
  const user = useAuthStore((s) => s.user);
  const { data: inventoryData } = useInventoryList({ page: 1, limit: 100 });
  const products = inventoryData?.items ?? [];
  const productById = useMemo(() => new Map(products.map((p) => [p._id, p])), [products]);

  const [lines, setLines] = useState<CartLine[]>([emptyLine()]);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>("Paid");
  const [amountPaid, setAmountPaid] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const [lastSavedSale, setLastSavedSale] = useState<Sale | null>(null);

  const { mutate: createSale, isPending } = useCreateSale({
    onSuccess: (sale) => {
      setLastSavedSale(sale);
      setFormError(null);
      setLines([emptyLine()]);
      setCustomerName("");
      setCustomerPhone("");
      setPaymentStatus("Paid");
      setAmountPaid("");
    },
    onError: (createError) => setFormError(createError.message),
  });

  function updateLine(key: string, updates: Partial<CartLine>) {
    setLines((prev) => prev.map((l) => (l.key === key ? { ...l, ...updates } : l)));
  }

  function addLine() {
    setLines((prev) => [...prev, emptyLine()]);
  }

  function removeLine(key: string) {
    setLines((prev) => (prev.length > 1 ? prev.filter((l) => l.key !== key) : prev));
  }

  const validLines = lines.filter((l) => l.inventoryItemId && Number(l.quantity) > 0);
  const total = validLines.reduce((sum, l) => {
    const product = productById.get(l.inventoryItemId);
    return sum + (product ? product.price * Number(l.quantity) : 0);
  }, 0);

  const stockError = validLines
    .map((l) => {
      const product = productById.get(l.inventoryItemId);
      return product && Number(l.quantity) > product.quantity
        ? `Only ${product.quantity} of "${product.name}" left in stock.`
        : null;
    })
    .find(Boolean);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);

    if (validLines.length === 0) {
      setFormError("Add at least one product to this sale.");
      return;
    }
    if (stockError) {
      setFormError(stockError);
      return;
    }
    if (paymentStatus === "Partial") {
      const paid = Number(amountPaid);
      if (!amountPaid || Number.isNaN(paid) || paid <= 0 || paid >= total) {
        setFormError("Enter an amount paid that's between 0 and the total.");
        return;
      }
    }

    createSale({
      customerName: customerName || undefined,
      customerPhone: customerPhone || undefined,
      items: validLines.map((l) => ({
        inventoryItem: l.inventoryItemId,
        quantity: Number(l.quantity),
      })),
      paymentStatus,
      amountPaid: paymentStatus === "Partial" ? Number(amountPaid) : undefined,
    });
  }

  return (
    <>
      <div className="print:hidden">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="rounded-xl2 border border-line bg-white p-4 shadow-card sm:p-6">
            <h2 className="font-display text-base font-semibold text-ink">Items</h2>
            <div className="mt-4 flex flex-col gap-3">
              {lines.map((line) => {
                const product = productById.get(line.inventoryItemId);
                const subtotal = product ? product.price * Number(line.quantity) : 0;
                return (
                  <div
                    key={line.key}
                    className="flex flex-col gap-3 rounded-lg border border-line p-3 sm:flex-row sm:items-end"
                  >
                    <div className="flex-1">
                      <Field label="Product" htmlFor={`product-${line.key}`}>
                        <ProductSearchSelect
                          id={`product-${line.key}`}
                          products={products}
                          value={line.inventoryItemId}
                          onChange={(id) => updateLine(line.key, { inventoryItemId: id })}
                        />
                      </Field>
                    </div>
                    <div className="w-full sm:w-24">
                      <Field label="Qty" htmlFor={`qty-${line.key}`}>
                        <Input
                          id={`qty-${line.key}`}
                          type="number"
                          min={1}
                          value={line.quantity}
                          onChange={(e) => {
                            const raw = e.target.value;
                            updateLine(line.key, { quantity: raw === "" ? "" : Number(raw) });
                          }}
                        />
                      </Field>
                    </div>
                    <div className="flex w-full items-center justify-between gap-3 sm:w-auto sm:flex-col sm:items-end sm:justify-end">
                      <div className="text-right">
                        <p className="font-mono text-[10px] uppercase tracking-wider text-ink-400">
                          Subtotal
                        </p>
                        <p className="font-display text-sm font-semibold text-ink">
                          {formatNaira(subtotal)}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeLine(line.key)}
                        disabled={lines.length === 1}
                        className="font-body text-xs font-medium text-red-600 hover:underline disabled:opacity-30 disabled:no-underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            <button
              type="button"
              onClick={addLine}
              className="mt-3 font-body text-xs font-medium text-teal hover:underline"
            >
              + Add another product
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="rounded-xl2 border border-line bg-white p-4 shadow-card sm:p-6">
              <h2 className="font-display text-base font-semibold text-ink">Customer</h2>
              <p className="mt-1 font-body text-xs text-ink-400">Optional — for walk-in sales.</p>
              <div className="mt-4 flex flex-col gap-4">
                <Field label="Name" htmlFor="customerName">
                  <Input
                    id="customerName"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Danladi Pharmacy"
                  />
                </Field>
                <Field label="Phone" htmlFor="customerPhone">
                  <Input
                    id="customerPhone"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="e.g. 0801 234 5678"
                  />
                </Field>
              </div>
            </div>

            <div className="rounded-xl2 border border-line bg-white p-4 shadow-card sm:p-6">
              <h2 className="font-display text-base font-semibold text-ink">Payment</h2>
              <div className="mt-4 flex flex-col gap-4">
                <div className="grid grid-cols-3 gap-2">
                  {paymentOptions.map((status) => (
                    <button
                      key={status}
                      type="button"
                      onClick={() => setPaymentStatus(status)}
                      className={cn(
                        "rounded-md border px-2 py-2.5 font-body text-sm font-medium transition-colors",
                        paymentStatus === status
                          ? "border-teal bg-teal/10 text-teal-dark"
                          : "border-line text-ink-500 hover:bg-ink/5",
                      )}
                    >
                      {status}
                    </button>
                  ))}
                </div>
                {paymentStatus === "Partial" && (
                  <Field label="Amount paid now (₦)" htmlFor="amountPaid">
                    <Input
                      id="amountPaid"
                      type="number"
                      min={0}
                      value={amountPaid}
                      onChange={(e) => setAmountPaid(e.target.value)}
                      placeholder={String(total || 0)}
                    />
                  </Field>
                )}
                <div className="flex items-center justify-between border-t border-line pt-3">
                  <span className="font-body text-sm text-ink-500">Total</span>
                  <span className="font-display text-xl font-semibold text-ink">
                    {formatNaira(total)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {formError && (
            <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 font-body text-sm text-red-700">
              {formError}
            </p>
          )}

          {lastSavedSale && (
            <p className="rounded-md border border-teal/30 bg-teal/5 px-3 py-2 font-body text-sm text-teal-dark">
              Sale {lastSavedSale.receiptNumber} saved.
            </p>
          )}

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button type="submit" disabled={isPending} className="w-full sm:w-auto">
              {isPending ? "Saving..." : "Save sale"}
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => window.print()}
              disabled={!lastSavedSale}
              className="w-full border-line text-ink-600 sm:w-auto"
            >
              Print receipt
            </Button>
          </div>
        </form>
      </div>

      {lastSavedSale && <Receipt sale={lastSavedSale} businessName={user?.businessName} />}
    </>
  );
}
