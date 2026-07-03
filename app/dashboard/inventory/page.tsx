"use client";

import { useState } from "react";
import { PageHeader } from "@/components/app/PageHeader";
import { DataTable, type Column } from "@/components/ui/DataTable";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Field, Input } from "@/components/ui/Form";
import { StatCard } from "@/components/ui/StatCard";
import { initialProducts, type Product } from "@/data/inventory";
import { formatNaira } from "@/data/pricing";

export default function InventoryPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [modalOpen, setModalOpen] = useState(false);

  const lowStock = products.filter((p) => p.stock <= p.reorderLevel);
  const totalValue = products.reduce((s, p) => s + p.stock * p.unitPrice, 0);

  function handleAdd(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const newProduct: Product = {
      id: `PRD-${String(products.length + 1).padStart(3, "0")}`,
      sku: String(form.get("sku")),
      name: String(form.get("name")),
      category: String(form.get("category")),
      stock: Number(form.get("stock")),
      reorderLevel: Number(form.get("reorderLevel")),
      unitPrice: Number(form.get("unitPrice")),
    };
    setProducts((prev) => [newProduct, ...prev]);
    setModalOpen(false);
    e.currentTarget.reset();
  }

  const columns: Column<Product>[] = [
    { header: "Product", accessor: (r) => (
      <div>
        <p className="font-medium text-ink">{r.name}</p>
        <p className="font-mono text-[11px] text-ink-400">{r.sku}</p>
      </div>
    ) },
    { header: "Category", accessor: (r) => r.category },
    { header: "Unit price", accessor: (r) => formatNaira(r.unitPrice), align: "right" },
    { header: "Stock", accessor: (r) => (
      <span className={r.stock <= r.reorderLevel ? "font-semibold text-amber-dark" : "text-ink-700"}>
        {r.stock}
      </span>
    ), align: "right" },
    { header: "Status", accessor: (r) =>
      r.stock <= r.reorderLevel
        ? <Badge tone="warning">Reorder now</Badge>
        : <Badge tone="success">In stock</Badge>
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
        <StatCard label="Total products" value={String(products.length)} />
        <StatCard label="Inventory value" value={formatNaira(totalValue)} />
        <StatCard
          label="Low stock items"
          value={String(lowStock.length)}
          tone={lowStock.length > 0 ? "warning" : "default"}
        />
      </div>

      <DataTable columns={columns} rows={products} />

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Add product">
        <form onSubmit={handleAdd} className="flex flex-col gap-4">
          <Field label="Product name" htmlFor="name">
            <Input id="name" name="name" required placeholder="e.g. Vegetable Oil (5L)" />
          </Field>
          <Field label="SKU" htmlFor="sku">
            <Input id="sku" name="sku" required placeholder="e.g. VEG-5L" />
          </Field>
          <Field label="Category" htmlFor="category">
            <Input id="category" name="category" required placeholder="e.g. Grocery" />
          </Field>
          <Field label="Unit price (₦)" htmlFor="unitPrice">
            <Input id="unitPrice" name="unitPrice" type="number" required min={0} placeholder="4500" />
          </Field>
          <Field label="Stock quantity" htmlFor="stock">
            <Input id="stock" name="stock" type="number" required min={0} placeholder="50" />
          </Field>
          <Field label="Reorder level" htmlFor="reorderLevel">
            <Input id="reorderLevel" name="reorderLevel" type="number" required min={0} placeholder="15" />
          </Field>
          <Button type="submit" className="mt-2 w-full">Add product</Button>
        </form>
      </Modal>
    </div>
  );
}
