import { Check, X, ArrowRight } from "lucide-react";
import { useT } from "@/i18n/LanguageProvider";

export function TimeSaved() {
  const { t } = useT();
  const rows = [
    { task: t("ts.r1"), before: "12 min", after: "0 min", saved: "12 min" },
    { task: t("ts.r2"), before: "8 min", after: "0 min", saved: "8 min" },
    { task: t("ts.r3"), before: "15 min", after: "0 min", saved: "15 min" },
    { task: t("ts.r4"), before: "30 min", after: "2 min", saved: "28 min" },
    { task: t("ts.r5"), before: "20 min", after: "0 min", saved: "20 min" },
    { task: t("ts.r6"), before: "10 min", after: "0 min", saved: "10 min" },
  ];

  return (
    <section className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 indigo-mesh opacity-30 pointer-events-none" />
      <div className="absolute inset-0 grid-bg opacity-[0.04] pointer-events-none" />
      <div className="relative mx-auto max-w-5xl px-6">
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-primary font-mono">
            <span className="size-1 rounded-full bg-primary animate-glow-pulse" />
            {t("ts.tag")}
          </div>
          <h2 className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight text-gradient">
            <span className="text-gradient-gold">{t("ts.title.a")}</span> {t("ts.title.b")}
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">{t("ts.subtitle")}</p>
        </div>

        <div className="mt-12 rounded-2xl border border-primary/15 bg-gradient-card overflow-hidden shadow-[0_30px_80px_-30px_rgba(79,70,229,0.4)]">
          <div className="grid grid-cols-12 px-5 py-3 text-[11px] uppercase tracking-wider text-muted-foreground border-b border-primary/15 bg-surface/80 font-mono">
            <div className="col-span-6">{t("ts.col.task")}</div>
            <div className="col-span-2 text-center">{t("ts.col.manual")}</div>
            <div className="col-span-2 text-center">{t("ts.col.eda")}</div>
            <div className="col-span-2 text-right">{t("ts.col.saved")}</div>
          </div>
          {rows.map((r, i) => (
            <div
              key={r.task}
              className={`group relative grid grid-cols-12 items-center px-5 py-4 text-sm ${i % 2 ? "bg-surface/40" : "bg-surface/20"} border-b border-primary/10 last:border-0 transition-colors hover:bg-primary/[0.04]`}
              style={{ animation: `fade-in 0.5s ease-out ${i * 50}ms both` }}
            >
              <span className="absolute left-0 top-0 bottom-0 w-[2px] scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-300 bg-primary" />
              <div className="col-span-6 font-medium">{r.task}</div>
              <div className="col-span-2 text-center text-muted-foreground line-through font-mono">
                <span className="inline-flex items-center gap-1"><X className="size-3 text-destructive" />{r.before}</span>
              </div>
              <div className="col-span-2 text-center font-mono">
                <span className="inline-flex items-center gap-1 text-success"><Check className="size-3.5" />{r.after}</span>
              </div>
              <div className="col-span-2 text-right">
                <span className="inline-block px-2 py-0.5 rounded-md bg-success/10 text-success text-xs font-semibold border border-success/20 font-mono">
                  +{r.saved}
                </span>
              </div>
            </div>
          ))}
          <div className="relative grid grid-cols-12 items-center px-5 py-5 bg-gradient-brand/10 border-t border-primary/20">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
            <div className="col-span-8 font-semibold">{t("ts.total")}</div>
            <div className="col-span-4 text-right text-2xl font-semibold text-gradient-gold">
              3u 15min · €162<span className="text-sm text-muted-foreground font-normal">{t("ts.perDay")}</span>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          {t("ts.yearly.a")} <span className="text-gradient-gold font-semibold">{t("ts.yearly.b")}</span>.
          <a href="#contact" className="ml-2 text-primary hover:underline inline-flex items-center gap-1 font-medium">
            {t("ts.calc")} <ArrowRight className="size-3" />
          </a>
        </div>
      </div>
    </section>
  );
}
