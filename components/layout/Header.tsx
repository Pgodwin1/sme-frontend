"use client";

import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { useState } from "react";

const navLinks = [
  { href: "#modules", label: "Modules" },
  { href: "#pricing", label: "Pricing" },
  { href: "#who-its-for", label: "Who it's for" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-paper/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <a href="#top" className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded bg-ink font-mono text-xs font-bold text-amber">
            OS
          </span>
          <span className="font-display text-base font-semibold tracking-tight text-ink">
            BusinessOS
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-body text-sm text-ink-600 transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <a href="/auth/login" className="font-body text-sm text-ink-600 hover:text-ink">
            Log in
          </a>
          <LinkButton href="/onboarding" variant="primary" className="px-4 py-2 text-sm">
            Get started
          </LinkButton>
        </div>

        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded border border-line md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          <span className="relative block h-3 w-4">
            <span
              className={`absolute left-0 top-0 h-[1.5px] w-4 bg-ink transition-transform ${open ? "translate-y-[5px] rotate-45" : ""}`}
            />
            <span
              className={`absolute left-0 bottom-0 h-[1.5px] w-4 bg-ink transition-transform ${open ? "-translate-y-[5px] -rotate-45" : ""}`}
            />
          </span>
        </button>
      </Container>

      {open && (
        <div className="border-t border-line bg-paper md:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded px-2 py-2.5 font-body text-sm text-ink-600 hover:bg-ink/5 hover:text-ink"
              >
                {link.label}
              </a>
            ))}
            <a
              href="/auth/login"
              onClick={() => setOpen(false)}
              className="rounded px-2 py-2.5 font-body text-sm text-ink-600 hover:bg-ink/5 hover:text-ink"
            >
              Log in
            </a>
            <LinkButton href="/onboarding" variant="primary" className="mt-2 w-full text-sm" onClick={() => setOpen(false)}>
              Get started
            </LinkButton>
          </Container>
        </div>
      )}
    </header>
  );
}
