import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { Logo } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useT } from "@/i18n/LanguageProvider";
import { useSector } from "@/i18n/SectorProvider";
import { SECTORS, SECTOR_DISPLAY, type SectorKey } from "@/i18n/sectors";

export function Nav() {
  const { t, lang } = useT();
  const { sector, sectorDef, setSector } = useSector();
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastY = useRef(0);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y < 80) setVisible(true);
      else if (y > lastY.current + 4) { setVisible(false); setOpen(false); }
      else if (y < lastY.current - 4) setVisible(true);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const pickSector = (k: SectorKey) => {
    setSector(k);
    setOpen(false);
  };

  return (
    <header
      className="fixed top-3 inset-x-0 z-50 flex justify-center px-4 transition-transform duration-300 ease-out"
      style={{ transform: visible ? "translateY(0)" : "translateY(-130%)" }}
    >
      <nav className="glass w-full max-w-5xl px-3 flex items-center justify-between shadow-soft gap-3" style={{ borderRadius: 999, height: 56, boxShadow: "0 1px 0 rgba(255,255,255,0.04) inset, 0 12px 40px -18px rgba(79,70,229,0.55), 0 0 0 1px rgba(79,70,229,0.12)" }}>
        <Link to="/" className="flex items-center gap-2 pl-1 shrink-0 group">
          <Logo size={32} />
          <span className="font-semibold tracking-tight transition-colors group-hover:text-white">EDA<span className="text-gradient-brand"> Systems</span></span>
          <span className="ml-1 size-1.5 rounded-full bg-emerald-400 animate-glow-pulse" title={t("nav.systemsOnline")} />
        </Link>

        <div className="hidden md:flex items-center gap-7 text-[13px] font-medium" style={{ color: "#94A3B8" }}>
          <a href="#voordelen" className="nav-link hover:text-white">{t("nav.solutions")}</a>
          <a href="#werkwijze" className="nav-link hover:text-white">{t("nav.system")}</a>
          <a href="#pakketten" className="nav-link hover:text-white">{t("nav.pricing")}</a>
          <Link to="/over-ons" className="nav-link hover:text-white">{t("nav.about")}</Link>
        </div>

        <div className="flex items-center gap-2">
          {sectorDef && (
            <div className="relative hidden md:block" ref={ref}>
              <button
                onClick={() => setOpen((v) => !v)}
                className="sector-pill inline-flex items-center gap-1.5 px-2.5 py-1"
                style={{ background: "rgba(20,20,50,0.6)", border: "1px solid rgba(79,70,229,0.3)", color: "#A5B4FC", fontSize: 12, borderRadius: 999 }}
              >
                <span
                  className="inline-block rounded-full"
                  style={{ width: 6, height: 6, background: sectorDef.accent, boxShadow: `0 0 8px ${sectorDef.accent}` }}
                  aria-hidden="true"
                />
                {(sector && SECTOR_DISPLAY[sector]?.[lang]?.name) || sectorDef.name}
                <ChevronDown size={12} className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
              </button>

              {open && (
                <div
                  className="absolute right-0 mt-2 py-1.5 z-50 animate-fade-in overflow-hidden"
                  style={{ background: "rgba(10,10,26,0.92)", backdropFilter: "blur(14px) saturate(140%)", border: "1px solid rgba(79,70,229,0.25)", borderRadius: 10, minWidth: 230, boxShadow: "0 24px 60px -20px rgba(0,0,0,0.7), 0 0 0 1px rgba(79,70,229,0.15)" }}
                >
                  {SECTORS.filter((s) => s.key !== sector).map((s) => (
                    <button
                      key={s.key}
                      onClick={() => pickSector(s.key)}
                      className="block w-full text-left px-3 py-2 text-[13px] transition-colors"
                      style={{ color: "#94A3B8" }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(79,70,229,0.12)"; e.currentTarget.style.color = "#E2E8F0"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = ""; e.currentTarget.style.color = "#94A3B8"; }}
                    >
                      {SECTOR_DISPLAY[s.key][lang]?.name ?? s.name}
                    </button>
                  ))}
                </div>
              )}

            </div>
          )}
          <LanguageSwitcher />
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 h-8 text-[12px] font-semibold tracking-[0.04em] transition-colors"
            style={{ background: "rgba(20,20,50,0.6)", border: "1px solid rgba(79,70,229,0.3)", color: "#818cf8", borderRadius: 999 }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(30,30,70,0.8)"; e.currentTarget.style.borderColor = "rgba(79,70,229,0.5)"; e.currentTarget.style.color = "#c7d2fe"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(20,20,50,0.6)"; e.currentTarget.style.borderColor = "rgba(79,70,229,0.3)"; e.currentTarget.style.color = "#818cf8"; }}
          >
            {t("nav.getStarted")} →
          </a>
        </div>
      </nav>
    </header>
  );
}
