import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { mvpModules } from "@/data/modules";

const steps = [
  {
    label: "Start",
    title: "Launch on the essentials",
    body: "Employee management, payroll, CRM, sales, inventory and reporting — the six modules most SMEs need on day one.",
  },
  {
    label: "Grow",
    title: "Switch on what you need, when you need it",
    body: "Add accounting, procurement or approval workflows the moment your business is ready for them — no migration, no re-entering data.",
  },
  {
    label: "Scale",
    title: "Run every branch from one dashboard",
    body: "Multi-branch reporting, custom approvals and dedicated support as you move from one location to many.",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-paper py-20 sm:py-28">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <Eyebrow>Start small, on purpose</Eyebrow>
            <h2 className="mt-4 text-balance font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
              Launch scope: six modules. Everything else comes later.
            </h2>
            <p className="mt-4 font-body text-sm leading-relaxed text-ink-600">
              We deliberately don&rsquo;t launch every module at once. The
              first release covers the operations every business runs
              daily &mdash; the rest unlock as add-ons.
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {mvpModules.map((m) => (
                <span
                  key={m.key}
                  className="rounded-full border border-teal/30 bg-teal/5 px-3 py-1.5 font-mono text-xs text-teal-dark"
                >
                  {m.name}
                </span>
              ))}
            </div>
          </div>

          <div className="relative border-l border-line pl-8 sm:pl-10">
            {steps.map((step, i) => (
              <div
                key={step.label}
                className={i !== steps.length - 1 ? "pb-12" : ""}
              >
                <span className="absolute -left-[7px] mt-1.5 h-3.5 w-3.5 rounded-full border-2 border-teal bg-paper" />
                <p className="font-mono text-xs uppercase tracking-widest text-teal-dark">
                  {step.label}
                </p>
                <h3 className="mt-2 font-display text-xl font-semibold text-ink">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-md font-body text-sm leading-relaxed text-ink-600">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
