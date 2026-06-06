import { Sparkles, Crown, Zap, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useT } from "@/i18n/LanguageProvider";
import { useSector } from "@/i18n/SectorProvider";
import { getSectorPricing } from "@/i18n/sectors";
import { SectionLabel } from "./SectionLabel";

type Tone = "basic" | "popular" | "elevated" | "ultra";

export function Pricing() {
  const { t, lang } = useT();
  const { sector } = useSector();
  const sp = sector ? getSectorPricing(sector, lang) : null;

  const tiers = [
    {
      key: "starter" as const,
      name: "Starter",
      price: "€247",
      setup: "€247",
      first: "€494",
      features: sp?.starter ?? ["pr.starter.f1", "pr.starter.f2", "pr.starter.f3", "pr.starter.f4"],
      cta: t("pr.cta.starter"),
      tagline: t("pr.tag.starter"),
      tone: "basic" as Tone,
    },
    {
      key: "pro" as const,
      name: "Pro",
      price: "€397",
      setup: "€347",
      first: "€744",
      features: sp?.pro ?? ["pr.pro.f1", "pr.pro.f2", "pr.pro.f3", "pr.pro.f4", "pr.pro.f5", "pr.pro.f6"],
      cta: t("pr.cta.pro"),
      tagline: t("pr.tag.pro"),
      badge: t("pr.badge.popular"),
      tone: "popular" as Tone,
    },
    {
      key: "allin" as const,
      name: "All-in",
      price: "€597",
      setup: "€497",
      first: "€1.094",
      features: sp?.allin ?? ["pr.allin.f1", "pr.allin.f2", "pr.allin.f3", "pr.allin.f4", "pr.allin.f5", "pr.allin.f6"],
      cta: t("pr.cta.allin"),
      tagline: t("pr.tag.allin"),
      badge: t("pr.badge.automated"),
      tone: "elevated" as Tone,
    },
    {
      key: "agent" as const,
      name: "AI Agent",
      price: "€997",
      setup: "€697",
      first: "€1.694",
      features: sp?.agent ?? ["pr.agent.f1", "pr.agent.f2", "pr.agent.f3", "pr.agent.f4", "pr.agent.f5", "pr.agent.f6"],
      cta: t("pr.cta.agent"),
      tagline: t("pr.tag.agent"),
      badge: t("pr.badge.premium"),
      tone: "ultra" as Tone,
    },
  ];

  return (
    <section id="pakketten" className="relative bg-surface/30 border-y border-white/5 overflow-hidden" style={{ padding: "120px 0" }}>
      <div className="absolute inset-0 indigo-mesh opacity-60 pointer-events-none" />
      <div className="absolute inset-0 grid-bg opacity-50 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="text-center max-w-2xl mx-auto">
          <div className="flex justify-center">
            <SectionLabel>{t("pr.tag")}</SectionLabel>
          </div>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight text-white" style={{ letterSpacing: "-0.02em" }}>
            {t("pr.title")}
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">{t("pr.subtitle")}</p>
        </div>

        <div className="mt-14 grid md:grid-cols-2 xl:grid-cols-4 gap-5 items-stretch">
          {tiers.map((tier) => {
            const s = toneStyles(tier.tone);
            return (
              <div
                key={tier.key}
                className={`pricing-card relative p-7 flex flex-col will-change-transform ${tier.tone === "ultra" ? "pricing-card--gold" : ""} ${s.lift}`}
                style={{ borderRadius: 10, background: s.background, border: s.border, boxShadow: s.shadow }}
              >
                {tier.tone === "ultra" && (
                  <div
                    aria-hidden
                    className="absolute inset-0 pointer-events-none"
                    style={{ borderRadius: 10, boxShadow: "inset 0 0 0 1px rgba(245,158,11,0.25)" }}
                  />
                )}

                {tier.badge && (
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 px-3 py-1 text-[10px] font-bold uppercase whitespace-nowrap"
                    style={{ borderRadius: 999, background: s.badgeBg, color: "#fff", letterSpacing: "0.12em", boxShadow: s.badgeShadow }}
                  >
                    {tier.tone === "popular" && <Sparkles className="size-3" />}
                    {tier.tone === "elevated" && <Layers className="size-3" />}
                    {tier.tone === "ultra" && <Crown className="size-3" />}
                    {tier.badge}
                  </div>
                )}

                <div className="relative">
                  <div className="flex items-center gap-2">
                    {tier.tone === "ultra" && <Zap className="size-4" style={{ color: "#F59E0B" }} />}
                    <div className="text-sm font-bold uppercase" style={{ letterSpacing: "0.18em", color: s.nameColor }}>
                      {tier.name}
                    </div>
                  </div>

                  <div className="mt-4 flex items-baseline gap-2 flex-wrap">
                    <span
                      className={`text-4xl font-bold tracking-tight ${tier.tone === "ultra" ? "text-gradient-gold" : ""}`}
                      style={{ color: tier.tone === "ultra" ? undefined : s.priceColor }}
                    >
                      {tier.price}
                    </span>
                    <span className="text-sm text-muted-foreground">{t("pr.perMonth")}</span>
                  </div>
                  <p className="mt-3 text-xs italic" style={{ color: s.taglineColor }}>{tier.tagline}</p>

                  <div
                    className="mt-4 px-3 py-2.5 text-xs"
                    style={{ borderRadius: 6, background: "rgba(8,10,24,0.6)", border: `1px solid ${s.divider}` }}
                  >
                    <div className="text-muted-foreground">{t("pr.setup")}: <span className="text-foreground font-semibold">{tier.setup}</span></div>
                    <div className="mt-1 text-muted-foreground">
                      {t("pr.firstMonth")}: <span className="font-semibold" style={{ color: s.accent }}>{tier.first}</span>{" "}
                      <span className="text-muted-foreground/70">{t("pr.exclVat")}</span>
                    </div>
                  </div>
                </div>

                <ul className="relative mt-5 space-y-2.5 flex-1">
                  {tier.features.map((f, i) => {
                    const text = sp ? f : t(f);
                    return (
                      <li key={`${tier.key}-${i}`} className="flex gap-2.5" style={{ fontSize: 13, color: "#A5B4CC", lineHeight: 1.7 }}>
                        <span className="shrink-0 select-none" style={{ color: s.accent, fontWeight: 700 }}>·</span>
                        <span>{text}</span>
                      </li>
                    );
                  })}
                </ul>

                <Button variant={s.btn} size="lg" className="relative mt-7 w-full" style={{ borderRadius: 4 }} asChild>
                  <a href="#contact">{tier.cta}</a>
                </Button>
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center text-xs italic" style={{ color: "#64748B" }}>{t("pr.agent.note")}</div>
        <div className="mt-4 text-center text-sm italic" style={{ color: "#94A3B8" }}>{t("pr.notSure")}</div>
        <div className="mt-6 text-center text-xs text-muted-foreground">{t("pr.fineprint")}</div>
      </div>
    </section>
  );
}

function toneStyles(tone: Tone) {
  switch (tone) {
    case "basic":
      return {
        background: "rgba(15,18,35,0.55)",
        border: "1px solid rgba(148,163,184,0.12)",
        shadow: "0 1px 0 rgba(255,255,255,0.03) inset",
        lift: "",
        nameColor: "#94A3B8",
        priceColor: "#E2E8F0",
        taglineColor: "#64748B",
        divider: "rgba(148,163,184,0.10)",
        accent: "#94A3B8",
        badgeBg: "#1E293B",
        badgeShadow: "0 4px 14px -6px rgba(0,0,0,0.6)",
        btn: "glass" as const,
      };
    case "popular":
      return {
        background: "linear-gradient(180deg, rgba(79,70,229,0.18), rgba(20,20,50,0.55))",
        border: "1px solid rgba(79,70,229,0.55)",
        shadow: "0 0 0 1px rgba(79,70,229,0.35), 0 30px 80px -28px rgba(79,70,229,0.55), 0 0 60px -10px rgba(79,70,229,0.35)",
        lift: "xl:scale-[1.04] xl:-my-2",
        nameColor: "#A5B4FC",
        priceColor: "#FFFFFF",
        taglineColor: "#C7D2FE",
        divider: "rgba(79,70,229,0.25)",
        accent: "#818CF8",
        badgeBg: "linear-gradient(135deg,#4F46E5,#6366F1)",
        badgeShadow: "0 8px 24px -8px rgba(79,70,229,0.8)",
        btn: "hero" as const,
      };
    case "elevated":
      return {
        background: "linear-gradient(180deg, rgba(30,30,90,0.45), rgba(15,18,40,0.7))",
        border: "1px solid rgba(99,102,241,0.30)",
        shadow: "0 1px 0 rgba(255,255,255,0.05) inset, 0 18px 50px -20px rgba(30,30,90,0.7)",
        lift: "",
        nameColor: "#C7D2FE",
        priceColor: "#FFFFFF",
        taglineColor: "#A5B4FC",
        divider: "rgba(99,102,241,0.18)",
        accent: "#A5B4FC",
        badgeBg: "linear-gradient(135deg,#1E1E5A,#312E81)",
        badgeShadow: "0 8px 20px -8px rgba(30,30,90,0.7)",
        btn: "glass" as const,
      };
    case "ultra":
      return {
        background: "radial-gradient(120% 80% at 50% 0%, rgba(245,158,11,0.10), transparent 60%), linear-gradient(180deg, rgba(20,20,50,0.85), rgba(10,10,26,0.95))",
        border: "1px solid rgba(245,158,11,0.4)",
        shadow: "0 0 0 1px rgba(245,158,11,0.35), 0 30px 80px -28px rgba(245,158,11,0.4), 0 0 80px -10px rgba(79,70,229,0.35)",
        lift: "",
        nameColor: "#F59E0B",
        priceColor: "#FFFFFF",
        taglineColor: "#FCD34D",
        divider: "rgba(245,158,11,0.22)",
        accent: "#F59E0B",
        badgeBg: "linear-gradient(135deg,#F59E0B,#D97706)",
        badgeShadow: "0 8px 24px -8px rgba(245,158,11,0.75)",
        btn: "gold" as const,
      };
  }
}
