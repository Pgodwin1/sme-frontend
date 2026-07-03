import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { modules } from "@/data/modules";

export function Modules() {
  return (
    <section id="modules" className="bg-ink-900 py-20 sm:py-28">
      <Container>
        <div className="max-w-2xl">
          <Eyebrow tone="paper">Nine modules, one platform</Eyebrow>
          <h2 className="mt-4 text-balance font-display text-3xl font-semibold leading-tight text-paper sm:text-4xl">
            Every module runs on its own. Together, they run your business.
          </h2>
          <p className="mt-4 font-body text-base text-ink-200">
            Activate what you need now. Each module below plugs into the
            same customer, staff and reporting data &mdash; so switching one
            on later never means starting over.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-xl2 border border-ink-600/60 bg-ink-600/60 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map((m) => (
            <div
              key={m.key}
              className="group flex flex-col bg-ink-800 p-6 transition-colors duration-200 hover:bg-ink-700"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] tracking-widest text-amber-light">
                  {m.code}
                </span>
                {m.inMvp && (
                  <span className="rounded-full border border-teal-light/40 bg-teal/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-teal-light">
                    MVP
                  </span>
                )}
              </div>
              <h3 className="mt-3 font-display text-lg font-semibold text-paper">
                {m.name}
              </h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-ink-200">
                {m.description}
              </p>
              <ul className="mt-4 space-y-1.5">
                {m.features.slice(0, 4).map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2 font-body text-xs text-ink-300"
                  >
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-amber/70" />
                    {f}
                  </li>
                ))}
                {m.features.length > 4 && (
                  <li className="font-mono text-[11px] text-ink-400">
                    +{m.features.length - 4} more
                  </li>
                )}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
