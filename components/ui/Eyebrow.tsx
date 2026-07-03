import { cn } from "@/lib/utils";

export function Eyebrow({
  children,
  tone = "ink",
  className,
}: {
  children: string;
  tone?: "ink" | "paper";
  className?: string;
}) {
  return (
    <p
      className={cn(
        "font-mono text-xs uppercase tracking-[0.2em]",
        tone === "ink" ? "text-teal-dark" : "text-amber-light",
        className
      )}
    >
      {children}
    </p>
  );
}
