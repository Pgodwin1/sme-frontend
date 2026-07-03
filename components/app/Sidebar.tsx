"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import type { ModuleKey } from "@/data/modules";

interface NavItem {
  key: ModuleKey | "dashboard";
  label: string;
  href: string;
  icon: string;
}

export const navItems: NavItem[] = [
  { key: "dashboard", label: "Dashboard", href: "/dashboard", icon: "▦" },
  { key: "hr", label: "Employees", href: "/dashboard/employees", icon: "◐" },
  { key: "payroll", label: "Payroll", href: "/dashboard/payroll", icon: "₦" },
  { key: "crm", label: "CRM", href: "/dashboard/crm", icon: "◎" },
  { key: "sales", label: "Sales", href: "/dashboard/sales", icon: "▲" },
  { key: "inventory", label: "Inventory", href: "/dashboard/inventory", icon: "▣" },
];

export function Sidebar({ modules }: { modules: ModuleKey[] }) {
  const pathname = usePathname();

  const visibleItems = navItems.filter(
    (item) => item.key === "dashboard" || modules.includes(item.key as ModuleKey)
  );

  return (
    <aside className="hidden w-60 shrink-0 flex-col border-r border-ink-600/60 bg-ink-900 lg:flex">
      <div className="flex h-16 items-center gap-2 border-b border-ink-600/60 px-6">
        <span className="flex h-7 w-7 items-center justify-center rounded bg-amber font-mono text-xs font-bold text-ink-900">
          OS
        </span>
        <span className="font-display text-base font-semibold text-paper">BusinessOS</span>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-6">
        {visibleItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.key}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2.5 font-body text-sm transition-colors",
                active
                  ? "bg-ink-700 text-paper"
                  : "text-ink-300 hover:bg-ink-800 hover:text-paper"
              )}
            >
              <span className={cn("font-mono text-sm", active ? "text-amber-light" : "text-ink-400")}>
                {item.icon}
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-ink-600/60 px-6 py-4">
        <p className="font-mono text-[10px] uppercase tracking-widest text-ink-500">
          {modules.length} module{modules.length !== 1 ? "s" : ""} active
        </p>
      </div>
    </aside>
  );
}
