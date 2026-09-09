"use client";

import { useMemo, useState } from "react";
import { PageHeader } from "@/components/app/PageHeader";
import { DataTable, type Column } from "@/components/ui/DataTable";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { StatCard } from "@/components/ui/StatCard";
import { initialEmployees } from "@/data/employees";
import { buildPayrollRun, currentPayPeriod, type PayrollLine } from "@/data/payroll";
import { formatNaira } from "@/data/pricing";

export default function PayrollPage() {
  const payrollRun = useMemo(() => buildPayrollRun(initialEmployees), []);
  const [status, setStatus] = useState<"Pending" | "Processed">("Pending");

  const totals = payrollRun.reduce(
	(acc, p) => ({
	  gross: acc.gross + p.gross,
	  pension: acc.pension + p.pension,
	  paye: acc.paye + p.paye,
	  net: acc.net + p.netPay,
	}),
	{ gross: 0, pension: 0, paye: 0, net: 0 }
  );

  const columns: Column<PayrollLine & { id: string }>[] = [
	{ header: "Employee", accessor: (r) => <span className="font-medium text-ink">{r.name}</span> },
	{ header: "Department", accessor: (r) => r.department },
	{ header: "Gross", accessor: (r) => formatNaira(r.gross), align: "right" },
	{ header: "Pension (8%)", accessor: (r) => `-${formatNaira(r.pension)}`, align: "right" },
	{ header: "PAYE", accessor: (r) => `-${formatNaira(r.paye)}`, align: "right" },
	{ header: "Net pay", accessor: (r) => <span className="font-semibold text-teal-dark">{formatNaira(r.netPay)}</span>, align: "right" },
  ];

  const rows = payrollRun.map((p) => ({ ...p, id: p.employeeId }));

  return (
	<div>
	  <PageHeader
		title="Payroll"
		description={`${currentPayPeriod} pay run — PAYE and pension calculated automatically for every active employee.`}
		action={
		  <Button
			onClick={() => setStatus("Processed")}
			disabled={status === "Processed"}
		  >
			{status === "Processed" ? "Payroll processed" : "Run payroll"}
		  </Button>
		}
	  />

	  <div className="mb-3 flex items-center gap-2">
		<Badge tone={status === "Processed" ? "success" : "warning"}>{status}</Badge>
		<span className="font-mono text-[11px] text-ink-400">{rows.length} employees in this run</span>
	  </div>

	  <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
		<StatCard label="Gross payroll" value={formatNaira(totals.gross)} />
		<StatCard label="Pension deducted" value={formatNaira(totals.pension)} />
		<StatCard label="PAYE deducted" value={formatNaira(totals.paye)} />
		<StatCard label="Total net pay" value={formatNaira(totals.net)} hint="what leaves the business account" />
	  </div>

	  <DataTable columns={columns} rows={rows} />

	  <p className="mt-4 font-body text-xs text-ink-400">
		Deductions use simplified statutory bands for demonstration and are not a substitute for FIRS-approved tax advice.
	  </p>
	</div>
  );
}
