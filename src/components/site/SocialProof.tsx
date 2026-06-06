import { useT } from "@/i18n/LanguageProvider";
import { SECTORS, SECTOR_DISPLAY } from "@/i18n/sectors";
import type { Lang } from "@/i18n/translations";

type L4<T = string> = Record<Lang, T>;
const ACTIVE: L4 = {
  en: "OPERATIONAL ACROSS",
  nl: "OPERATIONEEL IN",
  fr: "OPÉRATIONNEL DANS",
  de: "OPERATIV IN",
};

export function SocialProof() {
  const { t, lang } = useT();
  const label = ACTIVE[lang] ?? ACTIVE.en;
  // marquee duplicates list for seamless loop
  const items = [...SECTORS, ...SECTORS];

  return (
    <section
      className="relative border-y overflow-hidden"
      style={{
        background: "linear-gradient(180deg, rgba(6,11,24,0.95), rgba(10,18,36,0.85))",
        borderColor: "rgba(99,102,241,0.18)",
      }}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="relative mx-auto max-w-6xl px-6 py-5 flex items-center gap-6">
        <span className="hidden sm:inline-flex items-center gap-2 font-mono-tech shrink-0" style={{ color: "hsl(var(--primary))", fontSize: 10, letterSpacing: "0.18em", fontWeight: 600 }}>
          <span className="size-1 rounded-full bg-primary animate-glow-pulse" />
          {label} {t("sp.active") || ""}
        </span>
        <div className="marquee-mask flex-1 overflow-hidden">
          <div className="flex marquee-track gap-x-6 w-max">
            {items.map((s, i) => (
              <span key={i} className="flex items-center gap-3 shrink-0">
                <span className="font-mono-tech" style={{ color: "#475569", fontSize: 12, fontWeight: 500 }}>
                  {SECTOR_DISPLAY[s.key][lang]?.name ?? s.name}
                </span>
                <span style={{ color: "rgba(99,102,241,0.4)" }}>·</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
