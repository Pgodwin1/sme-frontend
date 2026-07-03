"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { navItems } from "@/components/app/Sidebar";
import { cn } from "@/lib/utils";
import type { ModuleKey } from "@/data/modules";

export function Topbar({ modules }: { modules: ModuleKey[] }) {
  const { account, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const visibleItems = navItems.filter(
    (item) => item.key === "dashboard" || modules.includes(item.key as ModuleKey)
  );

  function handleLogout() {
    logout();
    router.push("/login");
  }

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-line bg-paper/95 px-5 backdrop-blur sm:px-8">
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded border border-line lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle navigation"
        >
          <span className="relative block h-3 w-4">
            <span className={cn("absolute left-0 top-0 h-[1.5px] w-4 bg-ink transition-transform", open && "translate-y-[5px] rotate-45")} />
            <span className={cn("absolute left-0 bottom-0 h-[1.5px] w-4 bg-ink transition-transform", open && "-translate-y-[5px] -rotate-45")} />
          </span>
        </button>
        <div>
          <p className="font-display text-sm font-semibold text-ink">
            {account?.businessName ?? "Your business"}
          </p>
          <p className="font-mono text-[11px] text-ink-400">{account?.industry}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden text-right sm:block">
          <p className="font-body text-sm text-ink">{account?.fullName}</p>
          <p className="font-mono text-[11px] text-ink-400">{account?.email}</p>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="rounded-md border border-line px-3 py-2 font-body text-xs font-medium text-ink-600 hover:bg-ink/5"
        >
          Log out
        </button>
      </div>

      {open && (
        <div className="absolute left-0 top-16 w-full border-b border-line bg-paper shadow-card lg:hidden">
          <nav className="flex flex-col gap-1 p-3">
            {visibleItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-md px-3 py-2.5 font-body text-sm",
                  pathname === item.href ? "bg-ink text-paper" : "text-ink-600 hover:bg-ink/5"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
