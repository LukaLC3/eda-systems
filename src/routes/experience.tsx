import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { SocialProof } from "@/components/site/SocialProof";
import { Metrics } from "@/components/site/Metrics";
import { Problem } from "@/components/site/Problem";
import { HowItWorks } from "@/components/site/HowItWorks";
import { Benefits } from "@/components/site/Benefits";
import { Integrations } from "@/components/site/Integrations";
import { Pricing } from "@/components/site/Pricing";
import { TimeSaved } from "@/components/site/TimeSaved";
import { Testimonials } from "@/components/site/Testimonials";
import { FAQ } from "@/components/site/FAQ";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { SectorSelector } from "@/components/site/SectorSelector";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import { SectorProvider, useSector } from "@/i18n/SectorProvider";

export const Route = createFileRoute("/experience")({
  component: Experience,
  head: () => ({
    meta: [
      { title: "EDA Systems — AI Automatisering voor uw sector in België" },
      { name: "description", content: "Stop uren te verliezen aan administratie. Wij automatiseren uw kantoor, praktijk of zaak volledig via AI. Plan een afspraak." },
      { property: "og:title", content: "EDA Systems — Smart Automation for your Business" },
      { property: "og:description", content: "Uw onderneming op automatische piloot — meer resultaat, minder administratie." },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "nl_BE" },
    ],
  }),
});

function Experience() {
  return (
    <SectorProvider>
      <LanguageProvider>
        <SectorGate />
      </LanguageProvider>
    </SectorProvider>
  );
}

function SectorGate() {
  const { sector } = useSector();
  if (!sector) {
    return (
      <main className="min-h-screen">
        <SectorSelector />
      </main>
    );
  }
  return (
    <main key={sector} className="min-h-screen animate-fade-in">
      <Nav />
      <Hero />
      <SocialProof />
      <Metrics />
      <Problem />
      <HowItWorks />
      <Benefits />
      <Integrations />
      <Pricing />
      <TimeSaved />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}
