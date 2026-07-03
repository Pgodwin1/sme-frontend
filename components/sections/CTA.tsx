import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";

export function CTA() {
  return (
    <section id="cta" className="relative overflow-hidden bg-ink-900 py-24 sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[360px] w-[720px] -translate-x-1/2 rounded-full bg-amber/15 blur-[140px]"
      />
      <Container className="relative flex flex-col items-center text-center">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber-light">
          Ready when you are
        </p>
        <h2 className="mt-5 max-w-2xl text-balance font-display text-3xl font-semibold leading-tight text-paper sm:text-4xl lg:text-5xl">
          Your business is already running. Switch on the system for it.
        </h2>
        <p className="mt-5 max-w-md font-body text-base text-ink-200">
          Free setup. No card required to start. Cancel any module, any time.
        </p>

        <div className="mt-9">
          <LinkButton href="/onboarding" variant="primary">
            Get started free
          </LinkButton>
        </div>

        <p className="mt-4 font-mono text-[11px] text-ink-400">
          Or WhatsApp us on +234 800 000 0000
        </p>
      </Container>
    </section>
  );
}
