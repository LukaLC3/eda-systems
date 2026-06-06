import { Clock, TrendingUp, Zap, Target, Plug, GraduationCap } from "lucide-react";
import { useT } from "@/i18n/LanguageProvider";

export function Benefits() {
  const { t } = useT();
  const benefits = [
    { icon: Clock, title: t("bn.b1.t"), desc: t("bn.b1.d") },
    { icon: TrendingUp, title: t("bn.b2.t"), desc: t("bn.b2.d") },
    { icon: Zap, title: t("bn.b3.t"), desc: t("bn.b3.d") },
    { icon: Target, title: t("bn.b4.t"), desc: t("bn.b4.d") },
    { icon: Plug, title: t("bn.b5.t"), desc: t("bn.b5.d") },
    { icon: GraduationCap, title: t("bn.b6.t"), desc: t("bn.b6.d") },
  ];
  return (
    <section id="voordelen" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 indigo-mesh opacity-40 pointer-events-none" />
      <div className="absolute inset-0 grid-bg opacity-[0.05] pointer-events-none" />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-primary font-mono">
            <span className="size-1 rounded-full bg-primary animate-glow-pulse" />
            {t("bn.tag")}
          </div>
          <h2 className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight text-gradient">
            {t("bn.title")}
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">{t("bn.subtitle")}</p>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-primary/10 rounded-2xl overflow-hidden border border-primary/15 shadow-[0_30px_80px_-30px_rgba(79,70,229,0.35)]">
          {benefits.map((b, i) => (
            <div
              key={b.title}
              className="group relative bg-surface/95 backdrop-blur-sm p-7 hover:bg-surface-elevated transition-all duration-500 overflow-hidden"
            >
              {/* Hover accent line */}
              <div className="absolute top-0 left-0 h-px w-0 bg-gradient-to-r from-primary to-transparent group-hover:w-full transition-all duration-700" />
              {/* Corner marker */}
              <span className="absolute top-4 right-5 text-[10px] font-mono text-muted-foreground/40 tracking-widest">
                0{i + 1}
              </span>
              <div className="relative size-11 rounded-lg bg-primary/10 border border-primary/25 grid place-items-center text-primary group-hover:shadow-glow group-hover:border-primary/50 transition-all duration-500">
                <b.icon className="size-5" />
                <span className="absolute inset-0 rounded-lg bg-primary/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="mt-5 text-lg font-semibold">{b.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
