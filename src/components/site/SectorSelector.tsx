import { ArrowRight } from "lucide-react";
import { SECTORS, SECTOR_DISPLAY, type SectorKey } from "@/i18n/sectors";
import { SECTOR_SPECIALTY } from "@/i18n/translations";
import { useSector } from "@/i18n/SectorProvider";
import { useT } from "@/i18n/LanguageProvider";
import { SectionLabel } from "./SectionLabel";

export function SectorSelector() {
  const { setSector } = useSector();
  const { t, lang } = useT();

  const pick = (k: SectorKey) => {
    setSector(k);
    setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 50);
  };

  return (
    <section
      id="sector-selector"
      className="relative flex min-h-[85svh] items-center justify-center overflow-hidden bg-background px-6 py-16 md:min-h-screen md:py-24"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 10%, rgba(37,99,235,0.08), transparent 70%), radial-gradient(40% 40% at 80% 90%, rgba(37,99,235,0.04), transparent 70%)",
        }}
      />
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />

      <div className="relative mx-auto max-w-6xl w-full">
        <div className="text-center max-w-3xl mx-auto">
          <div className="flex justify-center animate-fade-in">
            <SectionLabel>{t("selector.trust")}</SectionLabel>
          </div>

          <h1 className="mt-6 font-semibold tracking-tight leading-[1.02] animate-fade-up">
            <span className="text-foreground" style={{ fontSize: "clamp(38px, 6vw, 64px)" }}>
              {t("selector.h1")}
            </span>
            <br />
            <span className="text-primary" style={{ fontSize: "clamp(26px, 4.2vw, 46px)" }}>
              {t("selector.h2")}
            </span>
          </h1>

          <p className="mt-5 mx-auto max-w-xl text-base leading-7 text-muted-foreground animate-fade-up [animation-delay:120ms]">
            {t("selector.sub")}
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-3 max-w-5xl mx-auto md:grid-cols-2 xl:grid-cols-4 animate-fade-up [animation-delay:180ms]">
          {SECTORS.slice(0, 4).map((s, i) => (
            <SectorCard key={s.key} s={s} lang={lang} cta={t("selector.cta")} delay={i * 60} onPick={pick} />
          ))}
        </div>
        <div className="mt-3 grid grid-cols-1 gap-3 max-w-[58rem] mx-auto md:grid-cols-3 animate-fade-up [animation-delay:240ms]">
          {SECTORS.slice(4).map((s, i) => (
            <SectorCard key={s.key} s={s} lang={lang} cta={t("selector.cta")} delay={(i + 4) * 60} onPick={pick} />
          ))}
        </div>

        <div className="mt-8 grid grid-cols-3 gap-3 max-w-3xl mx-auto animate-fade-up [animation-delay:300ms]">
          {[
            { v: "Avg. 2-3h", l: t("selector.s1l") },
            { v: "Up to 700h", l: t("selector.s2l") },
            { v: "9 in 10", l: t("selector.s3l") },
          ].map((s) => (
            <div key={s.l} className="rounded-sm border-hairline bg-background/30 px-3 py-4 text-center">
              <div className="text-lg font-semibold tracking-tight text-foreground md:text-2xl">{s.v}</div>
              <div className="mt-1 text-[9px] uppercase tracking-[0.16em] text-muted-foreground md:text-[10px]">{s.l}</div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center text-xs text-muted-foreground animate-fade-up [animation-delay:360ms]">{t("selector.foot")}</div>
      </div>
    </section>
  );
}

function SectorCard({
  s,
  lang,
  cta,
  delay,
  onPick,
}: {
  s: (typeof SECTORS)[number];
  lang: "nl" | "en" | "fr" | "de";
  cta: string;
  delay: number;
  onPick: (k: SectorKey) => void;
}) {
  const display = SECTOR_DISPLAY[s.key][lang] ?? SECTOR_DISPLAY[s.key].nl;
  const specialty = SECTOR_SPECIALTY[s.key]?.[lang] ?? SECTOR_SPECIALTY[s.key]?.en ?? "";
  const Icon = s.icon;
  return (
    <button
      onClick={() => onPick(s.key)}
      className="group relative overflow-hidden rounded-sm border border-white/8 bg-surface/55 p-5 text-left animate-fade-up transition-all duration-300 hover:-translate-y-0.5 hover:border-white/15 hover:bg-surface"
      style={{
        borderLeft: `2px solid ${s.accent}`,
        animationDelay: `${delay}ms`,
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <div
          className="flex size-10 items-center justify-center rounded-sm border"
          style={{ background: `${s.accent}10`, borderColor: `${s.accent}26` }}
        >
          <Icon size={18} strokeWidth={1.5} style={{ color: s.accent }} />
        </div>
        {specialty && (
          <span
            className="max-w-[10rem] rounded-sm border px-2 py-1 text-right text-[10px] font-semibold uppercase tracking-[0.12em] leading-4"
            style={{ color: s.accent, borderColor: `${s.accent}26`, background: `${s.accent}10` }}
          >
            {specialty}
          </span>
        )}
      </div>

      <div className="mt-5 text-base font-semibold tracking-tight text-foreground">
        {display.name}
      </div>
      <div className="mt-2 hidden text-sm leading-6 text-muted-foreground lg:block">
        {display.desc}
      </div>

      <div className="mt-5 flex items-center justify-between gap-3 border-t border-white/8 pt-3">
        <span className="text-[11px] font-semibold uppercase tracking-[0.12em]" style={{ color: s.accent }}>{cta}</span>
        <ArrowRight size={13} style={{ color: s.accent }} className="shrink-0 transition-transform group-hover:translate-x-0.5" />
      </div>
    </button>
  );
}
