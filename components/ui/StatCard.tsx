import { cn } from "@/lib/utils";

export function StatCard({
  label,
  value,
  hint,
  tone = "default",
}: {
  label: string;
  value: string;
  hint?: string;
  tone?: "default" | "warning";
}) {
  return (
    <div
      className={cn(
        "rounded-xl2 border p-5 shadow-card",
        tone === "warning" ? "border-amber/40 bg-amber/5" : "border-line bg-white"
      )}
    >
      <p className="font-mono text-[11px] uppercase tracking-wider text-ink-400">{label}</p>
      <p className="mt-2 font-display text-2xl font-semibold text-ink">{value}</p>
      {hint && <p className="mt-1 font-body text-xs text-ink-400">{hint}</p>}
    </div>
  );
}
