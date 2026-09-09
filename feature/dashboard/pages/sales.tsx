"use client";

import { useState } from "react";
import { PageHeader } from "@/components/app/PageHeader";
import { DataTable, type Column } from "@/components/ui/DataTable";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Field, Input } from "@/components/ui/Form";
import { StatCard } from "@/components/ui/StatCard";
import { initialInvoices, type Invoice, type InvoiceStatus } from "@/data/sales";
import { formatNaira } from "@/data/pricing";

const statusTone: Record<InvoiceStatus, "success" | "info" | "warning" | "danger"> = {
  Paid: "success",
  Sent: "info",
  Draft: "warning",
  Overdue: "danger",
};

export default function SalesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices);
  const [modalOpen, setModalOpen] = useState(false);

  const revenue = invoices.filter((i) => i.status === "Paid").reduce((s, i) => s + i.amount, 0);
  const outstanding = invoices
	.filter((i) => i.status === "Sent" || i.status === "Overdue")
	.reduce((s, i) => s + i.amount, 0);
  const overdueCount = invoices.filter((i) => i.status === "Overdue").length;

  function handleAdd(e: React.FormEvent<HTMLFormElement>) {
	e.preventDefault();
	const form = new FormData(e.currentTarget);
	const issueDate = new Date().toISOString().slice(0, 10);
	const due = new Date();
	due.setDate(due.getDate() + 14);
	const newInvoice: Invoice = {
	  id: `INV-${1047 + invoices.length}`,
	  customer: String(form.get("customer")),
	  amount: Number(form.get("amount")),
	  status: "Draft",
	  issueDate,
	  dueDate: due.toISOString().slice(0, 10),
	};
	setInvoices((prev) => [newInvoice, ...prev]);
	setModalOpen(false);
	e.currentTarget.reset();
  }

  function updateStatus(id: string, status: InvoiceStatus) {
	setInvoices((prev) => prev.map((i) => (i.id === id ? { ...i, status } : i)));
  }

  const columns: Column<Invoice>[] = [
	{ header: "Invoice", accessor: (r) => <span className="font-mono text-xs text-ink-500">{r.id}</span> },
	{ header: "Customer", accessor: (r) => <span className="font-medium text-ink">{r.customer}</span> },
	{ header: "Amount", accessor: (r) => formatNaira(r.amount), align: "right" },
	{ header: "Issued", accessor: (r) => r.issueDate },
	{ header: "Due", accessor: (r) => r.dueDate },
	{
	  header: "Status",
	  accessor: (r) => (
		<select
		  value={r.status}
		  onChange={(e) => updateStatus(r.id, e.target.value as InvoiceStatus)}
		  className="rounded border border-line bg-white px-2 py-1 font-mono text-[10px] text-ink-600"
		>
		  {(["Draft", "Sent", "Paid", "Overdue"] as InvoiceStatus[]).map((s) => (
			<option key={s} value={s}>{s}</option>
		  ))}
		</select>
	  ),
	},
  ];

  return (
	<div>
	  <PageHeader
		title="Sales"
		description="Quotations and invoices, and what's still outstanding."
		action={<Button onClick={() => setModalOpen(true)}>New invoice</Button>}
	  />

	  <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
		<StatCard label="Revenue collected" value={formatNaira(revenue)} hint="paid invoices" />
		<StatCard label="Outstanding" value={formatNaira(outstanding)} hint="sent + overdue" />
		<StatCard
		  label="Overdue invoices"
		  value={String(overdueCount)}
		  tone={overdueCount > 0 ? "warning" : "default"}
		/>
	  </div>

	  <DataTable columns={columns} rows={invoices} />

	  <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="New invoice">
		<form onSubmit={handleAdd} className="flex flex-col gap-4">
		  <Field label="Customer" htmlFor="customer">
			<Input id="customer" name="customer" required placeholder="e.g. Danladi Pharmacy" />
		  </Field>
		  <Field label="Amount (₦)" htmlFor="amount">
			<Input id="amount" name="amount" type="number" required min={0} placeholder="250000" />
		  </Field>
		  <Button type="submit" className="mt-2 w-full">Create invoice</Button>
		</form>
	  </Modal>
	</div>
  );
}
