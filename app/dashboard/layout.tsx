"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { Sidebar } from "@/components/app/Sidebar";
import { Topbar } from "@/components/app/Topbar";
import { ROUTES } from "@/config/routes";
import type { ModuleKey } from "@/data/modules";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = useAuthStore((s) => s.user);
  const hasHydrated = useAuthStore((s) => s.hasHydrated);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated());
  const router = useRouter();

  useEffect(() => {
    if (hasHydrated && !isAuthenticated) {
      router.replace(ROUTES.LOGIN);
    }
  }, [hasHydrated, isAuthenticated, router]);

  if (!hasHydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-paper">
        <p className="font-mono text-xs uppercase tracking-widest text-ink-400">
          Loading your workspace&hellip;
        </p>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  const modules = (user.modules ?? []) as ModuleKey[];

  return (
    <div className="flex min-h-screen bg-paper">
      <Sidebar modules={modules} />
      <div className="flex min-h-screen flex-1 flex-col">
        <Topbar modules={modules} />
        <main className="flex-1 px-5 py-8 sm:px-8">{children}</main>
      </div>
    </div>
  );
}
