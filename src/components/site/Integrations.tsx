import { useT } from "@/i18n/LanguageProvider";
import { useReveal } from "@/hooks/use-reveal";
import type { Lang } from "@/i18n/translations";

type L4<T = string> = Record<Lang, T>;
const pick = <T,>(o: L4<T>, l: Lang): T => o[l] ?? o.en;

const TITLE: L4 = {
  en: "Connects with your existing stack",
  nl: "Werkt met uw bestaande stack",
  fr: "Compatible avec votre stack existante",
  de: "Verbindet sich mit Ihrer bestehenden Umgebung",
};
const SUB: L4 = {
  en: "Native integrations with the tools European businesses already use.",
  nl: "Native integraties met de tools die Europese bedrijven al gebruiken.",
  fr: "Intégrations natives avec les outils que les entreprises européennes utilisent déjà.",
  de: "Native Integrationen mit den Tools, die europäische Unternehmen bereits nutzen.",
};

const LOGOS = [
  "WhatsApp Business", "Microsoft 365", "Google Workspace", "Exact Online", "Billit",
  "Stripe", "Twilio", "HubSpot", "Salesforce", "Slack",
  "Notion", "Zapier", "Make", "Outlook", "Gmail",
  "Calendly", "Doctena", "Yuki", "Teamleader", "Odoo",
];

function LogoChip({ name }: { name: string }) {
  return (
    <div
      className="shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-full border border-primary/20 bg-background/60 backdrop-blur-sm"
      style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)" }}
    >
      <span className="size-1.5 rounded-full bg-primary/70 animate-glow-pulse" />
      <span className="font-mono-tech text-[12px] text-foreground/80 tracking-wide whitespace-nowrap">{name}</span>
    </div>
  );
}

export function Integrations() {
  const { lang } = useT();
  const ref = useReveal<HTMLDivElement>();
  const row = [...LOGOS, ...LOGOS];
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 indigo-mesh opacity-25 pointer-events-none" />
      <div className="absolute inset-0 grid-bg opacity-[0.04] pointer-events-none" />
      <div ref={ref} className="reveal relative mx-auto max-w-6xl px-6">
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 font-mono-tech text-[11px] uppercase tracking-[0.18em] text-primary">
            <span className="size-1 rounded-full bg-primary animate-glow-pulse" />
            {lang === "en" ? "INTEGRATIONS" : lang === "fr" ? "INTÉGRATIONS" : lang === "de" ? "INTEGRATIONEN" : "INTEGRATIES"}
          </div>
          <h2 className="font-display mt-3 text-4xl md:text-5xl font-semibold tracking-tight text-gradient">
            {pick(TITLE, lang)}
          </h2>
          <p className="mt-4 text-muted-foreground">{pick(SUB, lang)}</p>
        </div>

        <div className="mt-12 marquee-mask overflow-hidden">
          <div className="flex gap-3 marquee-track w-max">
            {row.map((name, i) => <LogoChip key={i} name={name} />)}
          </div>
        </div>
        <div className="mt-3 marquee-mask overflow-hidden">
          <div className="flex gap-3 marquee-track w-max" style={{ animationDirection: "reverse", animationDuration: "55s" }}>
            {[...LOGOS.slice(10), ...LOGOS.slice(0, 10), ...LOGOS.slice(10), ...LOGOS.slice(0, 10)].map((name, i) => <LogoChip key={i} name={name} />)}
          </div>
        </div>

        <div className="mt-10 text-center text-xs font-mono-tech text-muted-foreground tracking-wider">
          + {lang === "en" ? "custom integrations on request" : lang === "fr" ? "intégrations sur mesure sur demande" : lang === "de" ? "individuelle Integrationen auf Anfrage" : "maatwerk-integraties op aanvraag"}
        </div>
      </div>
    </section>
  );
}
