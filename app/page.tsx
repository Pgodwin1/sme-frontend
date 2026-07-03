import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { Modules } from "@/components/sections/Modules";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Pricing } from "@/components/sections/Pricing";
import { TargetCustomers } from "@/components/sections/TargetCustomers";
import { Retention } from "@/components/sections/Retention";
import { CTA } from "@/components/sections/CTA";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Problem />
        <Modules />
        <HowItWorks />
        <Pricing />
        <TargetCustomers />
        <Retention />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
