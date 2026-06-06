import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { SECTOR_HERO, SECTOR_OVERRIDES, SECTORS, type SectorKey } from "./sectors";
import type { Lang } from "./translations";

type Ctx = {
  sector: SectorKey | null;
  sectorDef: typeof SECTORS[number] | null;
  setSector: (k: SectorKey | null) => void;
  override: (key: string, lang: Lang) => string | undefined;
};

const SectorContext = createContext<Ctx | null>(null);

export function SectorProvider({ children }: { children: React.ReactNode }) {
  const [sector, setSectorState] = useState<SectorKey | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("eda-sector") as SectorKey | null;
      if (stored && SECTOR_OVERRIDES[stored]) setSectorState(stored);
    } catch {}
  }, []);

  const setSector = useCallback((k: SectorKey | null) => {
    setSectorState(k);
    try {
      if (k) localStorage.setItem("eda-sector", k);
      else localStorage.removeItem("eda-sector");
    } catch {}
  }, []);

  const override = useCallback(
    (key: string, lang: Lang) => {
      if (!sector) return undefined;
      const hero = SECTOR_HERO[sector]?.[lang];
      if (hero) {
        if (key === "hero.title") return hero.title;
        if (key === "hero.subtitle") return hero.subtitle;
        if (key === "hero.subtitle.bold") return "";
      }
      return SECTOR_OVERRIDES[sector][key];
    },
    [sector],
  );

  const sectorDef = useMemo(
    () => (sector ? SECTORS.find((s) => s.key === sector) ?? null : null),
    [sector],
  );

  const value = useMemo(
    () => ({ sector, sectorDef, setSector, override }),
    [sector, sectorDef, setSector, override],
  );
  return <SectorContext.Provider value={value}>{children}</SectorContext.Provider>;
}

export function useSector() {
  const ctx = useContext(SectorContext);
  if (!ctx) throw new Error("useSector must be used inside SectorProvider");
  return ctx;
}

export function useOptionalSector() {
  return useContext(SectorContext);
}
