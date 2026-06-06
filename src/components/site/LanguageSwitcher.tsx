import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { LANGUAGES, type Lang } from "@/i18n/translations";
import { useT } from "@/i18n/LanguageProvider";

export function LanguageSwitcher() {
  const { lang, setLang } = useT();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const current = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0];
  const others = LANGUAGES.filter((l) => l.code !== lang);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1.5 px-2.5 py-1 transition-colors"
        style={{
          background: "rgba(20,20,50,0.6)",
          border: "1px solid rgba(79,70,229,0.3)",
          color: "#A5B4FC",
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: "0.08em",
          borderRadius: 999,
        }}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {current.label}
        <ChevronDown size={12} className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div
          className="absolute right-0 mt-2 py-1.5 z-50 animate-fade-in overflow-hidden"
          style={{
            background: "rgba(10,10,26,0.92)",
            backdropFilter: "blur(14px) saturate(140%)",
            border: "1px solid rgba(79,70,229,0.25)",
            borderRadius: 10,
            minWidth: 100,
            boxShadow: "0 24px 60px -20px rgba(0,0,0,0.7), 0 0 0 1px rgba(79,70,229,0.15)",
          }}
          role="listbox"
        >
          {others.map((l) => (
            <button
              key={l.code}
              onClick={() => { setLang(l.code as Lang); setOpen(false); }}
              className="block w-full text-left px-3 py-2 text-[12px] font-semibold tracking-[0.08em] transition-colors"
              style={{ color: "#94A3B8" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(79,70,229,0.12)"; e.currentTarget.style.color = "#E2E8F0"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = ""; e.currentTarget.style.color = "#94A3B8"; }}
              role="option"
              aria-selected={false}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
