import { useT } from "@/i18n/LanguageProvider";
import { useReveal } from "@/hooks/use-reveal";
import type { Lang } from "@/i18n/translations";

type L4<T = string> = Record<Lang, T>;
const pick = <T,>(o: L4<T>, l: Lang): T => o[l] ?? o.en;

const COPY: L4 = {
  en: "Trusted operating numbers across European SMBs",
  nl: "Vertrouwde cijfers bij Europese KMO's",
  fr: "Chiffres de référence chez les PME européennes",
  de: "Vertrauenswürdige Zahlen bei europäischen KMU",
};

type Metric = { value: string; label: L4; sub: L4 };

const METRICS: Metric[] = [
  {
    value: "3.2h",
    label: { en: "saved per day", nl: "bespaard per dag", fr: "économisées / jour", de: "gespart pro Tag" },
    sub: { en: "average across all sectors", nl: "gemiddeld over alle sectoren", fr: "moyenne tous secteurs", de: "Durchschnitt aller Branchen" },
  },
  {
    value: "<24h",
    label: { en: "time to deployment", nl: "tot livegang", fr: "jusqu'à la mise en ligne", de: "bis Go-Live" },
    sub: { en: "from intake to running system", nl: "van intake tot draaiend systeem", fr: "de l'intake au système opérationnel", de: "vom Briefing zum laufenden System" },
  },
  {
    value: "99.9%",
    label: { en: "system uptime", nl: "systeem uptime", fr: "disponibilité système", de: "System-Verfügbarkeit" },
    sub: { en: "EU-hosted infrastructure", nl: "EU-gehoste infrastructuur", fr: "infrastructure hébergée en UE", de: "EU-gehostete Infrastruktur" },
  },
  {
    value: "GDPR",
    label: { en: "fully compliant", nl: "volledig compliant", fr: "totalement conforme", de: "vollständig konform" },
    sub: { en: "encrypted, audited, EU-based", nl: "versleuteld, geaudit, EU-basis", fr: "chiffré, audité, basé UE", de: "verschlüsselt, auditiert, EU-basiert" },
  },
];

export function Metrics() {
  const { lang } = useT();
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="relative overflow-hidden border-y border-primary/15" style={{ background: "linear-gradient(180deg, rgba(10,18,36,0.6), rgba(6,11,24,0.95))" }}>
      <div className="absolute inset-0 indigo-mesh opacity-25 pointer-events-none" />
      <div className="absolute inset-0 grid-bg opacity-[0.06] pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div ref={ref} className="reveal relative mx-auto max-w-6xl px-6 py-16">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 font-mono-tech text-[11px] uppercase tracking-[0.18em] text-primary">
            <span className="size-1 rounded-full bg-primary animate-glow-pulse" />
            {pick(COPY, lang)}
          </span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-primary/10 rounded-2xl overflow-hidden border border-primary/15">
          {METRICS.map((m, i) => (
            <div
              key={m.value}
              className="group relative bg-background/60 backdrop-blur-sm p-8 text-center hover:bg-primary/[0.04] transition-colors"
              style={{ animation: `fade-up 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 80}ms both` }}
            >
              <div className="font-display text-5xl md:text-6xl font-bold text-gradient">
                {m.value}
              </div>
              <div className="mt-3 text-sm font-semibold text-foreground/90">{pick(m.label, lang)}</div>
              <div className="mt-1 text-[11px] uppercase tracking-wider text-muted-foreground font-mono-tech">{pick(m.sub, lang)}</div>
              <div className="absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
