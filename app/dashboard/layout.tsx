"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { Sidebar } from "@/components/app/Sidebar";
import { Topbar } from "@/components/app/Topbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { account, isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [loading, isAuthenticated, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-paper">
        <p className="font-mono text-xs uppercase tracking-widest text-ink-400">
          Loading your workspace&hellip;
        </p>
      </div>
    );
  }

  if (!isAuthenticated || !account) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-paper">
      <Sidebar modules={account.modules} />
      <div className="flex min-h-screen flex-1 flex-col">
        <Topbar modules={account.modules} />
        <main className="flex-1 px-5 py-8 sm:px-8">{children}</main>
      </div>
    </div>
  );
}
