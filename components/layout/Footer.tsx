import { Container } from "@/components/ui/Container";
import { modules } from "@/data/modules";

export function Footer() {
  return (
    <footer className="border-t border-ink-600/60 bg-ink text-paper">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded bg-amber font-mono text-xs font-bold text-ink-900">
              OS
            </span>
            <span className="font-display text-base font-semibold">BusinessOS</span>
          </div>
          <p className="mt-4 max-w-xs font-body text-sm text-ink-200">
            One platform to run HR, payroll, sales, inventory and finance —
            built for African SMEs, one module at a time.
          </p>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-ink-300">
            Modules
          </p>
          <ul className="mt-4 space-y-2.5">
            {modules.slice(0, 5).map((m) => (
              <li key={m.key} className="font-body text-sm text-ink-200">
                {m.name}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-ink-300">
            Company
          </p>
          <ul className="mt-4 space-y-2.5 font-body text-sm text-ink-200">
            <li><a href="#modules" className="hover:text-amber-light">Modules</a></li>
            <li><a href="#pricing" className="hover:text-amber-light">Pricing</a></li>
            <li><a href="#who-its-for" className="hover:text-amber-light">Who it&rsquo;s for</a></li>
          </ul>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-ink-300">
            Talk to us
          </p>
          <ul className="mt-4 space-y-2.5 font-body text-sm text-ink-200">
            <li>hello@businessos.africa</li>
            <li>+234 800 000 0000</li>
            <li>Lagos, Nigeria</li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-ink-600/60 py-6">
        <Container className="flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="font-mono text-xs text-ink-300">
            &copy; {new Date().getFullYear()} BusinessOS Nigeria. All rights reserved.
          </p>
          <p className="font-mono text-xs text-ink-300">
            Built for retail · pharmacies · hotels · schools · clinics · more
          </p>
        </Container>
      </div>
    </footer>
  );
}
