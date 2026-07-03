import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { LinkButton } from "@/components/ui/Button";
import { pricingPlans, formatNaira } from "@/data/pricing";
import { cn } from "@/lib/utils";

export function Pricing() {
  return (
    <section id="pricing" className="bg-paper py-20 sm:py-28">
      <Container>
        <div className="max-w-2xl">
          <Eyebrow>Pricing</Eyebrow>
          <h2 className="mt-4 text-balance font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
            Pay for the modules you switch on.
          </h2>
          <p className="mt-4 font-body text-base text-ink-600">
            No per-module billing gymnastics &mdash; plans bundle module
            access with the support level your business needs.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pricingPlans.map((plan) => (
            <div
              key={plan.id}
              className={cn(
                "flex flex-col rounded-xl2 border p-6",
                plan.highlighted
                  ? "border-amber bg-ink text-paper shadow-card"
                  : "border-line bg-white text-ink shadow-card"
              )}
            >
              {plan.highlighted && (
                <span className="mb-4 inline-flex w-fit items-center rounded-full bg-amber px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-ink-900">
                  Most popular
                </span>
              )}
              <h3 className="font-display text-lg font-semibold">
                {plan.name}
              </h3>
              <p
                className={cn(
                  "mt-1 font-body text-xs",
                  plan.highlighted ? "text-ink-200" : "text-ink-600"
                )}
              >
                {plan.bestFor}
              </p>

              <div className="mt-6 flex items-baseline gap-1">
                <span className="font-mono text-3xl font-semibold">
                  {plan.price === "custom" ? "Custom" : formatNaira(plan.price)}
                </span>
                {plan.price !== "custom" && (
                  <span
                    className={cn(
                      "font-body text-sm",
                      plan.highlighted ? "text-ink-300" : "text-ink-400"
                    )}
                  >
                    /month
                  </span>
                )}
              </div>

              <ul className="mt-6 flex-1 space-y-2.5">
                {plan.includes.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 font-body text-sm"
                  >
                    <span
                      className={cn(
                        "mt-1 h-1 w-1 shrink-0 rounded-full",
                        plan.highlighted ? "bg-amber" : "bg-teal"
                      )}
                    />
                    <span className={plan.highlighted ? "text-ink-100" : "text-ink-600"}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <LinkButton
                href="/onboarding"
                variant={plan.highlighted ? "primary" : "ghost"}
                className="mt-8 w-full text-sm"
              >
                {plan.price === "custom" ? "Talk to sales" : "Choose plan"}
              </LinkButton>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
