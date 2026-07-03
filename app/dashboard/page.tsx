"use client";

import { useAuth } from "@/lib/auth";
import { PageHeader } from "@/components/app/PageHeader";
import { StatCard } from "@/components/ui/StatCard";
import { RevenueChart } from "@/components/app/RevenueChart";
import { SalesByCategoryChart } from "@/components/app/SalesByCategoryChart";
import { initialEmployees } from "@/data/employees";
import { buildPayrollRun } from "@/data/payroll";
import { initialLeads } from "@/data/crm";
import { initialInvoices, revenueTrend, salesByCategory } from "@/data/sales";
import { initialProducts } from "@/data/inventory";
import { formatNaira } from "@/data/pricing";

export default function DashboardHomePage() {
  const { account } = useAuth();
  const modules = account?.modules ?? [];

  const activeEmployees = initialEmployees.filter((e) => e.status === "Active");
  const payrollRun = buildPayrollRun(initialEmployees);
  const totalPayroll = payrollRun.reduce((sum, p) => sum + p.netPay, 0);
  const openLeadsValue = initialLeads
    .filter((l) => l.stage !== "Won" && l.stage !== "Lost")
    .reduce((sum, l) => sum + l.value, 0);
  const revenueThisMonth = initialInvoices
    .filter((i) => i.status === "Paid")
    .reduce((sum, i) => sum + i.amount, 0);
  const lowStockCount = initialProducts.filter((p) => p.stock <= p.reorderLevel).length;

  return (
    <div>
      <PageHeader
        title={`Welcome back, ${account?.fullName?.split(" ")[0] ?? "there"}`}
        description={`Here's what's happening across ${account?.businessName ?? "your business"} today.`}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {modules.includes("hr") && (
          <StatCard label="Active employees" value={String(activeEmployees.length)} hint="of 7 total" />
        )}
        {modules.includes("payroll") && (
          <StatCard label="This month's payroll" value={formatNaira(totalPayroll)} hint="net pay, all staff" />
        )}
        {modules.includes("crm") && (
          <StatCard label="Open pipeline" value={formatNaira(openLeadsValue)} hint={`${initialLeads.length} leads`} />
        )}
        {modules.includes("sales") && (
          <StatCard label="Revenue collected" value={formatNaira(revenueThisMonth)} hint="paid invoices" />
        )}
        {modules.includes("inventory") && (
          <StatCard
            label="Low stock items"
            value={String(lowStockCount)}
            hint="need reordering"
            tone={lowStockCount > 0 ? "warning" : "default"}
          />
        )}
      </div>

      {modules.includes("sales") && (
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <RevenueChart data={revenueTrend} />
          </div>
          <div className="lg:col-span-2">
            <SalesByCategoryChart data={salesByCategory} />
          </div>
        </div>
      )}
    </div>
  );
}
