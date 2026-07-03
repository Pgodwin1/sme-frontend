import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { customerSegments } from "@/data/customers";

export function TargetCustomers() {
  return (
    <section id="who-its-for" className="bg-ink-900 py-20 sm:py-24">
      <Container>
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-xl">
            <Eyebrow tone="paper">Who it&rsquo;s for</Eyebrow>
            <h2 className="mt-4 text-balance font-display text-3xl font-semibold leading-tight text-paper sm:text-4xl">
              Built for the businesses that keep Nigeria running.
            </h2>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          {customerSegments.map((c) => (
            <span
              key={c.name}
              className="rounded-full border border-ink-600 bg-ink-800 px-4 py-2 font-body text-sm text-ink-100 transition-colors hover:border-amber/50 hover:text-amber-light"
            >
              {c.name}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}
