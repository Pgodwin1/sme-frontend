"use client";

import { useEffect, useRef, useState } from "react";
import { formatNaira } from "@/data/pricing";
import { cn } from "@/lib/utils";

export interface ProductOption {
  _id: string;
  name: string;
  price: number;
  quantity: number;
}

interface ProductSearchSelectProps {
  id?: string;
  products: ProductOption[];
  value: string;
  onChange: (id: string) => void;
  placeholder?: string;
}

export function ProductSearchSelect({
  id,
  products,
  value,
  onChange,
  placeholder,
}: ProductSearchSelectProps) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const selected = products.find((p) => p._id === value);
  const filtered = query.trim()
    ? products.filter((p) => p.name.toLowerCase().includes(query.trim().toLowerCase()))
    : products;

  // Shows the typed search while open, otherwise the selected product's label.
  const displayValue = open
    ? query
    : selected
      ? `${selected.name} — ${formatNaira(selected.price)} (${selected.quantity} in stock)`
      : "";

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function selectProduct(p: ProductOption) {
    onChange(p._id);
    setQuery("");
    setOpen(false);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!open) {
      if (e.key === "ArrowDown" || e.key === "Enter") {
        e.preventDefault();
        setOpen(true);
        setHighlighted(0);
      }
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlighted((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlighted((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const p = filtered[highlighted];
      if (p) selectProduct(p);
    } else if (e.key === "Escape") {
      setOpen(false);
      setQuery("");
    }
  }

  return (
    <div ref={containerRef} className="relative">
      <input
        id={id}
        type="text"
        role="combobox"
        aria-expanded={open}
        autoComplete="off"
        value={displayValue}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
          setHighlighted(0);
        }}
        onFocus={() => {
          setQuery("");
          setOpen(true);
        }}
        onKeyDown={handleKeyDown}
        placeholder={placeholder ?? "Search products..."}
        className="w-full rounded-md border border-line bg-white px-3.5 py-2.5 font-body text-sm text-ink placeholder:text-ink-300 focus-visible:outline-none focus-visible:border-teal"
      />
      {open && (
        <div className="absolute left-0 right-0 top-full z-20 mt-1 max-h-60 overflow-y-auto rounded-md border border-line bg-white shadow-lg">
          {filtered.length === 0 ? (
            <p className="px-3.5 py-2.5 font-body text-sm text-ink-400">No products found.</p>
          ) : (
            filtered.map((p, i) => (
              <button
                key={p._id}
                type="button"
                onClick={() => selectProduct(p)}
                onMouseEnter={() => setHighlighted(i)}
                className={cn(
                  "flex w-full items-center justify-between gap-3 px-3.5 py-2.5 text-left font-body text-sm",
                  i === highlighted ? "bg-teal/10 text-teal-dark" : "text-ink hover:bg-ink/5",
                )}
              >
                <span>{p.name}</span>
                <span className="shrink-0 font-mono text-xs text-ink-400">
                  {formatNaira(p.price)} · {p.quantity} left
                </span>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
