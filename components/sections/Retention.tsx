import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { retentionLevers } from "@/data/customers";

export function Retention() {
  return (
    <section className="bg-paper py-20 sm:py-28">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <Eyebrow>After you sign up</Eyebrow>
            <h2 className="mt-4 text-balance font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
              We stay involved after onboarding &mdash; not just before the sale.
            </h2>
            <p className="mt-4 max-w-md font-body text-sm leading-relaxed text-ink-600">
              Software gets abandoned when nobody makes sure it&rsquo;s
              working. Every plan includes a path to a real person.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {retentionLevers.map((item) => (
              <div
                key={item}
                className="rounded-lg border border-line bg-white px-4 py-4 font-body text-sm text-ink-700 shadow-card"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
