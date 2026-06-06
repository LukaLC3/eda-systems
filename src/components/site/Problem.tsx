import { useT } from "@/i18n/LanguageProvider";
import { useSector } from "@/i18n/SectorProvider";
import { SECTOR_PROBLEM_ROWS } from "@/i18n/sectors";

const COPY = {
  nl: { tag: "HET PROBLEEM", title: "Waar uw tijd naartoe gaat.", sub: "Elke dag. Zonder uitzondering.", statement: "Dat is gemiddeld 2-3 uur per dag aan taken die geautomatiseerd kunnen worden." },
  en: { tag: "THE PROBLEM", title: "Where your time really goes.", sub: "Every day. Without exception.", statement: "That's on average 2-3 hours per day on tasks that can be automated." },
  fr: { tag: "LE PROBLÈME", title: "Où passe vraiment votre temps.", sub: "Chaque jour. Sans exception.", statement: "C'est en moyenne 2-3 heures par jour sur des tâches automatisables." },
  de: { tag: "DAS PROBLEM", title: "Wohin Ihre Zeit wirklich geht.", sub: "Jeden Tag. Ohne Ausnahme.", statement: "Das sind im Schnitt 2-3 Stunden pro Tag für automatisierbare Aufgaben." },
};

export function Problem() {
  const { lang } = useT();
  const { sector } = useSector();
  const c = COPY[lang] ?? COPY.nl;
  const rows = sector ? SECTOR_PROBLEM_ROWS[sector] : SECTOR_PROBLEM_ROWS.vastgoed;

  return (
    <section className="relative overflow-hidden" style={{ padding: "120px 0" }}>
      <div className="absolute inset-0 indigo-mesh opacity-30 pointer-events-none" />
      <div className="absolute inset-0 grid-bg opacity-[0.04] pointer-events-none" />
      <div className="relative mx-auto max-w-5xl px-6">
        <div className="max-w-2xl animate-fade-up">
          <div className="inline-flex items-center gap-2 uppercase font-mono" style={{ color: "hsl(var(--primary))", fontSize: 11, fontWeight: 600, letterSpacing: "0.14em" }}>
            <span className="size-1 rounded-full animate-glow-pulse" style={{ background: "hsl(var(--primary))" }} />
            {c.tag}
          </div>
          <h2
            className="mt-4 text-white"
            style={{ fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.05 }}
          >
            {c.title}
          </h2>
          <p className="mt-3" style={{ color: "#64748B", fontSize: 16 }}>{c.sub}</p>
        </div>

        <div className="mt-14 rounded-xl border border-primary/15 overflow-hidden" style={{ background: "linear-gradient(180deg, rgba(10,18,36,0.6), rgba(6,11,24,0.4))" }}>
          {rows.map((r, i) => (
            <div
              key={i}
              className="group grid grid-cols-12 items-center transition-all animate-fade-up relative"
              style={{
                padding: "20px 20px",
                borderBottom: i === rows.length - 1 ? "none" : "1px dotted rgba(99,102,241,0.18)",
                animationDelay: `${i * 40}ms`,
              }}
            >
              <span className="absolute left-0 top-0 bottom-0 w-[2px] scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-300" style={{ background: "hsl(var(--primary))" }} />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" style={{ background: "linear-gradient(90deg, rgba(99,102,241,0.06), transparent)" }} />
              <div className="relative col-span-7 md:col-span-9 flex items-center gap-3" style={{ color: "#94A3B8", fontSize: 14 }}>
                <span className="text-[10px] font-mono text-muted-foreground/50 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <span>{r.task}</span>
              </div>
              <div className="relative col-span-5 md:col-span-3 text-right font-mono" style={{ color: "#E2E8F0", fontSize: 13, fontWeight: 600, letterSpacing: "0.02em" }}>
                {r.time}
              </div>
            </div>
          ))}
        </div>

        <p
          className="mt-16 text-white animate-fade-up"
          style={{ fontSize: "clamp(22px, 3vw, 28px)", fontWeight: 700, letterSpacing: "-0.01em", lineHeight: 1.3, maxWidth: 640 }}
        >
          {c.statement}
        </p>
      </div>
    </section>
  );
}
