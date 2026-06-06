import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { DashboardMock } from "./DashboardMock";
import { useT } from "@/i18n/LanguageProvider";
import { SectionLabel } from "./SectionLabel";
import logo from "@/assets/logo.png";

export function Hero() {
  const { t } = useT();
  return (
    <section className="relative pt-28 pb-12 overflow-hidden">
      {/* Atmospheric layers — Midnight Indigo */}
      <div className="absolute inset-0 indigo-mesh pointer-events-none" />
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      <div className="absolute inset-0 particle-drift pointer-events-none opacity-70" />
      <div className="absolute inset-x-0 top-0 h-[520px] bg-gradient-radial-glow pointer-events-none" />
      <div className="scan-line" />
      <div className="absolute inset-0 indigo-vignette pointer-events-none" />

      {/* Logo watermark — subtle, behind content */}
      <div
        className="absolute pointer-events-none select-none logo-watermark hidden md:block"
        style={{ right: "-80px", top: "40px", width: "440px", height: "440px", opacity: 0.05 }}
        aria-hidden="true"
      >
        <img src={logo} alt="" className="w-full h-full object-contain" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 animate-fade-in relative">
            <span className="size-1.5 rounded-full bg-primary animate-glow-pulse" />
            <span className="relative inline-block overflow-hidden">
              <SectionLabel>{t("hero.label")}</SectionLabel>
              <span className="hero-label-scan" aria-hidden="true" />
            </span>
          </div>

          <h1 className="mt-5 text-4xl md:text-5xl lg:text-6xl font-semibold text-gradient leading-[1.05] animate-fade-up" style={{ letterSpacing: "-0.03em" }}>
            {t("hero.title")}
          </h1>

          <p className="mt-5 text-base md:text-lg text-muted-foreground max-w-2xl animate-fade-up [animation-delay:120ms]">
            {t("hero.subtitle")}
            {t("hero.subtitle.bold") && <span className="text-foreground font-medium">{t("hero.subtitle.bold")}</span>}
          </p>

          <div className="mt-7 flex flex-col sm:flex-row items-start sm:items-center gap-3 animate-fade-up [animation-delay:240ms]">
            <Button variant="hero" size="lg" className="rounded-sm" asChild>
              <a href="#pakketten">{t("hero.exploreCta")} <ArrowRight className="size-4" /></a>
            </Button>
            <a
              href="#contact"
              className="inline-flex items-center justify-center h-11 rounded-sm px-6 text-sm font-medium transition-colors"
              style={{
                border: "1px solid #334155",
                background: "transparent",
                color: "#94A3B8",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "#FFFFFF"; e.currentTarget.style.borderColor = "#2563EB"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "#94A3B8"; e.currentTarget.style.borderColor = "#334155"; }}
            >
              {t("hero.demoCta")}
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4 animate-fade-up [animation-delay:360ms]">
            {[
              { v: t("hero.stat1.v2"), l: t("hero.stat1.l2") },
              { v: t("hero.stat2.v2"), l: t("hero.stat2.l2") },
              { v: t("hero.stat3.v2"), l: t("hero.stat3.l2") },
            ].map((s, i, arr) => (
              <div key={s.l} className="flex items-center gap-8">
                <div>
                  <div className="text-2xl font-bold tracking-tight text-white">{s.v}</div>
                  <div className="text-[11px] uppercase tracking-wider text-muted-foreground mt-1">{s.l}</div>
                </div>
                {i < arr.length - 1 && <span className="hidden sm:block h-8 w-px bg-white/10" />}
              </div>
            ))}
          </div>
        </div>

        <div className="relative mt-12 animate-fade-up [animation-delay:480ms]">
          <div className="absolute -inset-x-20 -inset-y-10 bg-gradient-radial-glow opacity-60 pointer-events-none" />
          <DashboardMock />
        </div>

        <div className="mt-20 max-w-2xl animate-fade-up">
          <h3
            className="text-white"
            style={{ fontSize: "clamp(22px, 2.6vw, 30px)", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.2 }}
          >
            {t("hero.sectorCta")}
          </h3>
          <Button variant="hero" size="lg" className="mt-5 rounded-sm" asChild>
            <a href="#contact">{t("hero.demoCta")} <ArrowRight className="size-4" /></a>
          </Button>
        </div>
      </div>
    </section>
  );
}
