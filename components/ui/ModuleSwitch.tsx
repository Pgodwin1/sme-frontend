"use client";

import { cn } from "@/lib/utils";

/**
 * Controlled by default: `on` always reflects the caller's state.
 * Pass `onToggle` to make it interactive (e.g. onboarding module picker).
 */
export function ModuleSwitch({
  code,
  name,
  on,
  interactive = true,
  size = "md",
  onToggle,
}: {
  code: string;
  name: string;
  on: boolean;
  interactive?: boolean;
  size?: "sm" | "md";
  onToggle?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={interactive ? onToggle : undefined}
      aria-pressed={on}
      className={cn(
        "group flex w-full items-center justify-between gap-3 rounded-lg border px-3 py-2.5 text-left transition-all duration-200",
        on
          ? "border-amber/60 bg-ink-700 shadow-switch"
          : "border-ink-600/60 bg-ink-800",
        interactive && "cursor-pointer hover:border-amber/40",
        !interactive && "cursor-default"
      )}
    >
      <span className="flex items-center gap-2.5">
        <span
          className={cn(
            "font-mono text-[10px] tracking-wider",
            on ? "text-amber-light" : "text-ink-300"
          )}
        >
          {code}
        </span>
        <span
          className={cn(
            "font-display text-sm font-medium",
            size === "sm" ? "text-xs" : "text-sm",
            on ? "text-paper" : "text-ink-300"
          )}
        >
          {name}
        </span>
      </span>
      <span
        className={cn(
          "relative inline-flex h-4 w-8 shrink-0 items-center rounded-full transition-colors duration-200",
          on ? "bg-amber" : "bg-ink-600"
        )}
      >
        <span
          className={cn(
            "inline-block h-3 w-3 transform rounded-full bg-paper transition-transform duration-200",
            on ? "translate-x-4" : "translate-x-0.5",
            on && "animate-flicker"
          )}
        />
      </span>
    </button>
  );
}
