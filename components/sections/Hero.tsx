import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { LinkButton } from "@/components/ui/Button";
import { Switchboard } from "@/components/sections/Switchboard";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-ink-900">
      <div
        aria-hidden
        className="absolute inset-0 bg-grid bg-grid opacity-[0.06]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-[-10%] h-[420px] w-[420px] rounded-full bg-amber/20 blur-[120px]"
      />

      <Container className="relative grid gap-12 py-20 sm:py-28 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-32">
        <div className="animate-rise">
          <Eyebrow tone="paper">BusinessOS &mdash; SME Operating System</Eyebrow>
          <h1 className="mt-5 text-balance font-display text-4xl font-semibold leading-[1.08] text-paper sm:text-5xl lg:text-[3.4rem]">
            Switch on only the parts of your business you need &mdash; today.
          </h1>
          <p className="mt-6 max-w-lg text-balance font-body text-base leading-relaxed text-ink-200 sm:text-lg">
            Payroll, CRM, inventory, sales and more, running from one
            dashboard. Start with a single module and switch on the rest as
            your business grows &mdash; no spreadsheets, no WhatsApp
            chasing, no lost paperwork.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <LinkButton href="/onboarding" variant="primary">
              Get started free
            </LinkButton>
            <LinkButton href="#modules" variant="secondary">
              See all modules
            </LinkButton>
          </div>

          <p className="mt-8 font-mono text-xs uppercase tracking-widest text-ink-300">
            Trusted across retail &middot; hospitality &middot; healthcare &middot; construction
          </p>
        </div>

        {/* Signature: the switchboard */}
        <div className="animate-rise [animation-delay:150ms]">
          <Switchboard />
        </div>
      </Container>
    </section>
  );
}
