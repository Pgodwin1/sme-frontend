import { cn } from "@/lib/utils";

type Tone = "success" | "warning" | "danger" | "neutral" | "info";

const toneClasses: Record<Tone, string> = {
  success: "bg-teal/10 text-teal-dark border-teal/30",
  warning: "bg-amber/10 text-amber-dark border-amber/40",
  danger: "bg-red-50 text-red-700 border-red-200",
  neutral: "bg-ink-50 text-ink-600 border-ink-100",
  info: "bg-blue-50 text-blue-700 border-blue-200",
};

export function Badge({ children, tone = "neutral" }: { children: string; tone?: Tone }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-[11px] font-medium",
        toneClasses[tone]
      )}
    >
      {children}
    </span>
  );
}
