import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { problemTools } from "@/data/customers";

export function Problem() {
  return (
    <section className="bg-paper py-20 sm:py-28">
      <Container>
        <div className="max-w-2xl">
          <Eyebrow>The problem</Eyebrow>
          <h2 className="mt-4 text-balance font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
            Over 40 million SMEs in Nigeria are still run on tools that were
            never built for business.
          </h2>
        </div>

        <div className="mt-12 overflow-hidden rounded-xl2 border border-line">
          <div className="grid grid-cols-2 border-b border-line bg-ink text-paper">
            <div className="px-5 py-3 font-mono text-xs uppercase tracking-widest text-ink-300 sm:px-6">
              What businesses use
            </div>
            <div className="px-5 py-3 font-mono text-xs uppercase tracking-widest text-ink-300 sm:px-6">
              What it costs them
            </div>
          </div>
          {problemTools.map((row, i) => (
            <div
              key={row.old}
              className={`grid grid-cols-2 ${i % 2 === 0 ? "bg-white" : "bg-paper-dim"}`}
            >
              <div className="flex items-center gap-3 border-r border-line/70 px-5 py-4 sm:px-6">
                <span className="font-mono text-xs text-ink-300 line-through">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-body text-sm text-ink-600 line-through decoration-line/80">
                  {row.old}
                </span>
              </div>
              <div className="flex items-center px-5 py-4 sm:px-6">
                <span className="font-body text-sm font-medium text-ink">
                  {row.consequence}
                </span>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 max-w-2xl font-body text-sm text-ink-600">
          Existing ERPs try to fix this &mdash; but most are priced and
          built for large enterprises, not a 12-person pharmacy or a
          growing restaurant chain.
        </p>
      </Container>
    </section>
  );
}
