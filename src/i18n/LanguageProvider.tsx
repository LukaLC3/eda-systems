import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { dictionaries, type Lang } from "./translations";
import { useOptionalSector } from "./SectorProvider";

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  const sectorCtx = useOptionalSector();

  useEffect(() => {
    try {
      const stored = localStorage.getItem("eda-lang") as Lang | null;
      if (stored && stored in dictionaries) setLangState(stored);
    } catch {}
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try { localStorage.setItem("eda-lang", l); } catch {}
    if (typeof document !== "undefined") document.documentElement.lang = l;
  }, []);

  const t = useCallback((key: string) => {
    const ov = sectorCtx?.override(key, lang);
    if (ov) return ov;
    return dictionaries[lang][key] ?? dictionaries.nl[key] ?? key;
  }, [lang, sectorCtx]);

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useT() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useT must be used inside LanguageProvider");
  return ctx;
}
