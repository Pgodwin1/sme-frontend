import { cn } from "@/lib/utils";
import { forwardRef, type InputHTMLAttributes, type SelectHTMLAttributes } from "react";

interface FieldProps {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}

export function Field({ label, htmlFor, error, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="font-body text-sm text-ink-300">
        {label}
      </label>
      {children}
      {error && (
        <p className="font-body text-xs text-red-400">{error}</p>
      )}
    </div>
  );
}

const fieldBase =
  "w-full rounded-md border border-line bg-white px-3.5 py-2.5 font-body text-sm text-ink placeholder:text-ink-300 focus-visible:outline-none focus-visible:border-teal";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input ref={ref} className={cn(fieldBase, className)} {...props} />
  ),
);

Input.displayName = "Input";

export const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className, children, ...props }, ref) => (
    <select ref={ref} className={cn(fieldBase, className)} {...props}>
      {children}
    </select>
  ),
);

Select.displayName = "Select";
