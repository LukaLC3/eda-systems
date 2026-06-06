import { useSector } from "@/i18n/SectorProvider";
import { useT } from "@/i18n/LanguageProvider";
import type { SectorKey } from "@/i18n/sectors";
import type { Lang } from "@/i18n/translations";

type L4<T = string> = Record<Lang, T>;
const pick = <T,>(o: L4<T>, l: Lang): T => o[l] ?? o.en;

type DashData = {
  title: L4;
  accent: string;
  metrics: L4<{ label: string; value: string }[]>;
  chartLabel: L4;
  chartData: { label: L4; value: number }[];
  activity: L4<string[]>;
};

const DAY = {
  mon: { en: "Mon", nl: "Ma", fr: "Lun", de: "Mo" } as L4,
  tue: { en: "Tue", nl: "Di", fr: "Mar", de: "Di" } as L4,
  wed: { en: "Wed", nl: "Wo", fr: "Mer", de: "Mi" } as L4,
  thu: { en: "Thu", nl: "Do", fr: "Jeu", de: "Do" } as L4,
  fri: { en: "Fri", nl: "Vr", fr: "Ven", de: "Fr" } as L4,
  sat: { en: "Sat", nl: "Za", fr: "Sam", de: "Sa" } as L4,
};

const sectorTitle = (name: L4): L4 => ({
  en: `EDA Systems — ${name.en}`,
  nl: `EDA Systems — ${name.nl}`,
  fr: `EDA Systems — ${name.fr}`,
  de: `EDA Systems — ${name.de}`,
});

const DASH: Record<SectorKey, DashData> = {
  vastgoed: {
    title: sectorTitle({ en: "Real Estate", nl: "Vastgoed", fr: "Immobilier", de: "Immobilien" }),
    accent: "#2563EB",
    metrics: {
      en: [{ label: "Viewings today", value: "8" }, { label: "Leads this week", value: "23" }, { label: "Properties active", value: "12" }, { label: "No-shows / month", value: "0" }],
      nl: [{ label: "Bezichtigingen vandaag", value: "8" }, { label: "Leads deze week", value: "23" }, { label: "Actieve panden", value: "12" }, { label: "No-shows / maand", value: "0" }],
      fr: [{ label: "Visites aujourd'hui", value: "8" }, { label: "Leads cette semaine", value: "23" }, { label: "Biens actifs", value: "12" }, { label: "Absences / mois", value: "0" }],
      de: [{ label: "Besichtigungen heute", value: "8" }, { label: "Leads diese Woche", value: "23" }, { label: "Aktive Objekte", value: "12" }, { label: "No-Shows / Monat", value: "0" }],
    },
    chartLabel: { en: "Viewings per day this week", nl: "Bezichtigingen per dag deze week", fr: "Visites par jour cette semaine", de: "Besichtigungen pro Tag diese Woche" },
    chartData: [
      { label: DAY.mon, value: 3 }, { label: DAY.tue, value: 5 }, { label: DAY.wed, value: 4 },
      { label: DAY.thu, value: 8 }, { label: DAY.fri, value: 6 }, { label: DAY.sat, value: 2 },
    ],
    activity: {
      en: ["New viewing: Tue 14:00 — confirmed", "Lead followed up automatically", "Property description generated", "Invoice sent: €4,250 commission"],
      nl: ["Nieuwe bezichtiging: Di 14:00 — bevestigd", "Lead automatisch opgevolgd", "Pandbeschrijving gegenereerd", "Factuur verstuurd: €4.250 commissie"],
      fr: ["Nouvelle visite : Mar 14:00 — confirmée", "Lead suivi automatiquement", "Description du bien générée", "Facture envoyée : 4 250 € commission"],
      de: ["Neue Besichtigung: Di 14:00 — bestätigt", "Lead automatisch nachverfolgt", "Objektbeschreibung generiert", "Rechnung gesendet: 4.250 € Provision"],
    },
  },
  tandartsen: {
    title: sectorTitle({ en: "Dental", nl: "Tandartsen", fr: "Dentaire", de: "Zahnarzt" }),
    accent: "#10B981",
    metrics: {
      en: [{ label: "Appointments today", value: "14" }, { label: "No-shows / month", value: "1" }, { label: "Reminders sent", value: "47" }, { label: "Satisfaction", value: "9.2/10" }],
      nl: [{ label: "Afspraken vandaag", value: "14" }, { label: "No-shows / maand", value: "1" }, { label: "Herinneringen verstuurd", value: "47" }, { label: "Tevredenheid", value: "9,2/10" }],
      fr: [{ label: "Rendez-vous aujourd'hui", value: "14" }, { label: "Absences / mois", value: "1" }, { label: "Rappels envoyés", value: "47" }, { label: "Satisfaction", value: "9,2/10" }],
      de: [{ label: "Termine heute", value: "14" }, { label: "No-Shows / Monat", value: "1" }, { label: "Erinnerungen gesendet", value: "47" }, { label: "Zufriedenheit", value: "9,2/10" }],
    },
    chartLabel: { en: "Appointments per day", nl: "Afspraken per dag", fr: "Rendez-vous par jour", de: "Termine pro Tag" },
    chartData: [
      { label: DAY.mon, value: 12 }, { label: DAY.tue, value: 14 }, { label: DAY.wed, value: 11 },
      { label: DAY.thu, value: 15 }, { label: DAY.fri, value: 13 },
    ],
    activity: {
      en: ["Appointment confirmed: 09:00", "Reminder sent: tomorrow 14:00", "Waiting list: 1 slot filled", "No-show followed up automatically"],
      nl: ["Afspraak bevestigd: 09:00", "Herinnering verstuurd: morgen 14:00", "Wachtlijst: 1 plek ingevuld", "No-show automatisch opgevolgd"],
      fr: ["Rendez-vous confirmé : 09:00", "Rappel envoyé : demain 14:00", "Liste d'attente : 1 place comblée", "Absence suivie automatiquement"],
      de: ["Termin bestätigt: 09:00", "Erinnerung gesendet: morgen 14:00", "Warteliste: 1 Platz vergeben", "No-Show automatisch nachverfolgt"],
    },
  },
  kinesisten: {
    title: sectorTitle({ en: "Physiotherapy", nl: "Kinesitherapie", fr: "Kinésithérapie", de: "Physiotherapie" }),
    accent: "#F59E0B",
    metrics: {
      en: [{ label: "Sessions today", value: "11" }, { label: "Reports generated", value: "8" }, { label: "Series planned", value: "6" }, { label: "Admin saved", value: "~2h/d" }],
      nl: [{ label: "Sessies vandaag", value: "11" }, { label: "Verslagen gegenereerd", value: "8" }, { label: "Reeksen gepland", value: "6" }, { label: "Admin bespaard", value: "~2u/d" }],
      fr: [{ label: "Séances aujourd'hui", value: "11" }, { label: "Rapports générés", value: "8" }, { label: "Séries planifiées", value: "6" }, { label: "Admin économisée", value: "~2h/j" }],
      de: [{ label: "Sitzungen heute", value: "11" }, { label: "Berichte generiert", value: "8" }, { label: "Serien geplant", value: "6" }, { label: "Admin gespart", value: "~2Std/T" }],
    },
    chartLabel: { en: "Sessions per day", nl: "Sessies per dag", fr: "Séances par jour", de: "Sitzungen pro Tag" },
    chartData: [
      { label: DAY.mon, value: 9 }, { label: DAY.tue, value: 11 }, { label: DAY.wed, value: 10 },
      { label: DAY.thu, value: 12 }, { label: DAY.fri, value: 11 },
    ],
    activity: {
      en: ["Session series: 6 sessions planned", "Treatment report generated via voice", "Patient follow-up sent automatically", "Invoice created: session 3/6"],
      nl: ["Sessiereeks: 6 sessies gepland", "Behandelverslag via spraak gegenereerd", "Patiëntopvolging automatisch verstuurd", "Factuur aangemaakt: sessie 3/6"],
      fr: ["Série de séances : 6 planifiées", "Rapport généré par voix", "Suivi patient envoyé automatiquement", "Facture créée : séance 3/6"],
      de: ["Sitzungsreihe: 6 Sitzungen geplant", "Behandlungsbericht per Sprache erstellt", "Patientennachverfolgung automatisch gesendet", "Rechnung erstellt: Sitzung 3/6"],
    },
  },
  accountants: {
    title: sectorTitle({ en: "Accounting", nl: "Boekhouding", fr: "Comptabilité", de: "Buchhaltung" }),
    accent: "#8B5CF6",
    metrics: {
      en: [{ label: "Invoices today", value: "34" }, { label: "Avg. process", value: "45s" }, { label: "Deadlines / week", value: "3" }, { label: "VAT Q2", value: "Ready" }],
      nl: [{ label: "Facturen vandaag", value: "34" }, { label: "Gem. verwerking", value: "45s" }, { label: "Deadlines / week", value: "3" }, { label: "BTW Q2", value: "Klaar" }],
      fr: [{ label: "Factures aujourd'hui", value: "34" }, { label: "Traitement moyen", value: "45s" }, { label: "Échéances / sem.", value: "3" }, { label: "TVA T2", value: "Prêt" }],
      de: [{ label: "Rechnungen heute", value: "34" }, { label: "Ø Verarbeitung", value: "45s" }, { label: "Fristen / Woche", value: "3" }, { label: "MwSt. Q2", value: "Bereit" }],
    },
    chartLabel: { en: "Invoices processed per day", nl: "Facturen verwerkt per dag", fr: "Factures traitées par jour", de: "Verarbeitete Rechnungen pro Tag" },
    chartData: [
      { label: DAY.mon, value: 28 }, { label: DAY.tue, value: 34 }, { label: DAY.wed, value: 31 },
      { label: DAY.thu, value: 38 }, { label: DAY.fri, value: 29 },
    ],
    activity: {
      en: ["Invoice batch: 12 processed", "Client deadline reminder sent", "VAT preparation: Q2 complete", "Anomaly detected: flagged for review"],
      nl: ["Factuurbatch: 12 verwerkt", "Deadline-herinnering verstuurd", "BTW-voorbereiding: Q2 klaar", "Anomalie gedetecteerd: gemarkeerd"],
      fr: ["Lot de factures : 12 traitées", "Rappel d'échéance envoyé", "Préparation TVA : T2 terminé", "Anomalie détectée : à vérifier"],
      de: ["Rechnungs-Batch: 12 verarbeitet", "Frist-Erinnerung gesendet", "MwSt.-Vorbereitung: Q2 fertig", "Anomalie erkannt: markiert"],
    },
  },
  architecten: {
    title: sectorTitle({ en: "Architecture", nl: "Architectuur", fr: "Architecture", de: "Architektur" }),
    accent: "#EF4444",
    metrics: {
      en: [{ label: "Active projects", value: "7" }, { label: "Quotes / week", value: "4" }, { label: "Phase invoices", value: "3" }, { label: "Permits approved", value: "2" }],
      nl: [{ label: "Actieve projecten", value: "7" }, { label: "Offertes / week", value: "4" }, { label: "Fasefacturen", value: "3" }, { label: "Vergunningen goedgekeurd", value: "2" }],
      fr: [{ label: "Projets actifs", value: "7" }, { label: "Devis / semaine", value: "4" }, { label: "Factures de phase", value: "3" }, { label: "Permis approuvés", value: "2" }],
      de: [{ label: "Aktive Projekte", value: "7" }, { label: "Angebote / Woche", value: "4" }, { label: "Phasenrechnungen", value: "3" }, { label: "Genehmigungen", value: "2" }],
    },
    chartLabel: { en: "Project phases active", nl: "Actieve projectfasen", fr: "Phases de projet actives", de: "Aktive Projektphasen" },
    chartData: [
      { label: { en: "P1", nl: "P1", fr: "P1", de: "P1" }, value: 2 },
      { label: { en: "P2", nl: "P2", fr: "P2", de: "P2" }, value: 3 },
      { label: { en: "P3", nl: "P3", fr: "P3", de: "P3" }, value: 1 },
      { label: { en: "P4", nl: "P4", fr: "P4", de: "P4" }, value: 1 },
    ],
    activity: {
      en: ["Quote generated: Project Antwerp", "Phase 2 invoice sent automatically", "Client update: sent to 3 projects", "Permit approved: Brussels project"],
      nl: ["Offerte gegenereerd: project Antwerpen", "Fase 2-factuur automatisch verstuurd", "Klantupdate: verstuurd naar 3 projecten", "Vergunning goedgekeurd: project Brussel"],
      fr: ["Devis généré : projet Anvers", "Facture phase 2 envoyée automatiquement", "Mise à jour client : 3 projets", "Permis approuvé : projet Bruxelles"],
      de: ["Angebot erstellt: Projekt Antwerpen", "Phase-2-Rechnung automatisch gesendet", "Kundenupdate: an 3 Projekte gesendet", "Genehmigung erteilt: Projekt Brüssel"],
    },
  },
  garages: {
    title: sectorTitle({ en: "Automotive", nl: "Garages", fr: "Automobile", de: "Werkstatt" }),
    accent: "#06B6D4",
    metrics: {
      en: [{ label: "Vehicles in shop", value: "6" }, { label: "Quotes today", value: "9" }, { label: "MOT reminders", value: "14" }, { label: "Satisfaction", value: "9.4/10" }],
      nl: [{ label: "Voertuigen in werkplaats", value: "6" }, { label: "Offertes vandaag", value: "9" }, { label: "Keuring-herinneringen", value: "14" }, { label: "Tevredenheid", value: "9,4/10" }],
      fr: [{ label: "Véhicules en atelier", value: "6" }, { label: "Devis aujourd'hui", value: "9" }, { label: "Rappels contrôle", value: "14" }, { label: "Satisfaction", value: "9,4/10" }],
      de: [{ label: "Fahrzeuge in Werkstatt", value: "6" }, { label: "Angebote heute", value: "9" }, { label: "TÜV-Erinnerungen", value: "14" }, { label: "Zufriedenheit", value: "9,4/10" }],
    },
    chartLabel: { en: "Vehicles processed per day", nl: "Voertuigen verwerkt per dag", fr: "Véhicules traités par jour", de: "Bearbeitete Fahrzeuge pro Tag" },
    chartData: [
      { label: DAY.mon, value: 5 }, { label: DAY.tue, value: 7 }, { label: DAY.wed, value: 6 },
      { label: DAY.thu, value: 9 }, { label: DAY.fri, value: 8 }, { label: DAY.sat, value: 4 },
    ],
    activity: {
      en: ["Vehicle ready: client notified", "Quote sent: response in 4 min", "MOT reminder: 3 vehicles next month", "Invoice paid: €680 — automatic"],
      nl: ["Voertuig klaar: klant verwittigd", "Offerte verstuurd: reactie in 4 min", "Keuring-herinnering: 3 voertuigen volgende maand", "Factuur betaald: €680 — automatisch"],
      fr: ["Véhicule prêt : client averti", "Devis envoyé : réponse en 4 min", "Rappel contrôle : 3 véhicules le mois prochain", "Facture payée : 680 € — automatique"],
      de: ["Fahrzeug fertig: Kunde benachrichtigt", "Angebot gesendet: Antwort in 4 Min.", "TÜV-Erinnerung: 3 Fahrzeuge nächsten Monat", "Rechnung bezahlt: 680 € — automatisch"],
    },
  },
  horeca: {
    title: sectorTitle({ en: "Hospitality", nl: "Horeca", fr: "Restauration", de: "Gastronomie" }),
    accent: "#F97316",
    metrics: {
      en: [{ label: "Reservations today", value: "18" }, { label: "No-shows / week", value: "0" }, { label: "Staff scheduled", value: "7d" }, { label: "New reviews", value: "4" }],
      nl: [{ label: "Reservaties vandaag", value: "18" }, { label: "No-shows / week", value: "0" }, { label: "Personeel ingepland", value: "7d" }, { label: "Nieuwe reviews", value: "4" }],
      fr: [{ label: "Réservations aujourd'hui", value: "18" }, { label: "Absences / semaine", value: "0" }, { label: "Personnel planifié", value: "7j" }, { label: "Nouveaux avis", value: "4" }],
      de: [{ label: "Reservierungen heute", value: "18" }, { label: "No-Shows / Woche", value: "0" }, { label: "Personal geplant", value: "7T" }, { label: "Neue Bewertungen", value: "4" }],
    },
    chartLabel: { en: "Covers per day this week", nl: "Couverts per dag deze week", fr: "Couverts par jour cette semaine", de: "Gedecke pro Tag diese Woche" },
    chartData: [
      { label: DAY.mon, value: 42 }, { label: DAY.tue, value: 38 }, { label: DAY.wed, value: 45 },
      { label: DAY.thu, value: 52 }, { label: DAY.fri, value: 68 }, { label: DAY.sat, value: 74 },
    ],
    activity: {
      en: ["Reservation confirmed: table for 6", "Staff schedule generated: week 22", "Birthday offer sent: 3 guests", "New review: 5 stars — flagged"],
      nl: ["Reservatie bevestigd: tafel voor 6", "Personeelsplanning gegenereerd: week 22", "Verjaardagsaanbod verstuurd: 3 gasten", "Nieuwe review: 5 sterren — gemarkeerd"],
      fr: ["Réservation confirmée : table pour 6", "Planning du personnel généré : semaine 22", "Offre anniversaire envoyée : 3 invités", "Nouvel avis : 5 étoiles — marqué"],
      de: ["Reservierung bestätigt: Tisch für 6", "Personalplan erstellt: Woche 22", "Geburtstagsangebot gesendet: 3 Gäste", "Neue Bewertung: 5 Sterne — markiert"],
    },
  },
};

const ACTIVITY_LABEL: L4 = { en: "Activity", nl: "Activiteit", fr: "Activité", de: "Aktivität" };

export function SectorDashboard() {
  const { sector } = useSector();
  const { lang } = useT();
  const key: SectorKey = sector ?? "vastgoed";
  const d = DASH[key];
  const max = Math.max(...d.chartData.map((x) => x.value));

  return (
    <div
      className="relative overflow-hidden animate-fade-up rounded-xl"
      style={{
        background: "linear-gradient(180deg, #0A1224 0%, #060B18 100%)",
        border: "1px solid rgba(99, 102, 241, 0.18)",
        padding: 20,
        boxShadow: `0 24px 60px -20px ${d.accent}40, 0 0 0 1px rgba(99,102,241,0.08) inset`,
      }}
    >
      {/* Tech grid background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(148,163,184,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.5) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      {/* Accent radial */}
      <div
        className="absolute -top-20 -right-20 size-64 rounded-full pointer-events-none blur-3xl opacity-25"
        style={{ background: d.accent }}
      />
      {/* Scanline */}
      <div
        className="absolute inset-x-0 top-0 h-px pointer-events-none"
        style={{ background: `linear-gradient(90deg, transparent, ${d.accent}, transparent)` }}
      />

      <div className="relative flex items-center justify-between" style={{ borderBottom: "1px solid rgba(99,102,241,0.15)", paddingBottom: 12 }}>
        <div className="flex items-center gap-2">
          <span
            className="size-1.5 rounded-full animate-glow-pulse"
            style={{ background: d.accent, boxShadow: `0 0 12px ${d.accent}` }}
          />
          <span style={{ color: "#E2E8F0", fontSize: 12, fontWeight: 600, letterSpacing: "0.01em" }}>{pick(d.title, lang)}</span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="px-1.5 py-0.5 rounded-sm"
            style={{
              fontSize: 9,
              fontFamily: "ui-monospace, monospace",
              color: d.accent,
              background: `${d.accent}14`,
              border: `1px solid ${d.accent}33`,
              letterSpacing: "0.12em",
            }}
          >
            ● LIVE
          </span>
          <span style={{ color: "#334155", fontSize: 9, fontFamily: "ui-monospace, monospace", letterSpacing: "0.1em" }}>v3.2</span>
        </div>
      </div>

      <div className="relative grid grid-cols-2 gap-2 mt-4">
        {pick(d.metrics, lang).map((m, i) => (
          <div
            key={m.label}
            className="relative overflow-hidden"
            style={{
              background: "linear-gradient(180deg, rgba(15,32,68,0.55), rgba(10,22,40,0.55))",
              border: "1px solid rgba(99,102,241,0.18)",
              borderRadius: 6,
              padding: "10px 12px",
              animation: `fade-in 0.5s ease-out ${i * 60}ms both`,
            }}
          >
            <div
              className="absolute left-0 top-0 bottom-0 w-[2px]"
              style={{ background: d.accent, opacity: 0.7 }}
            />
            <div style={{ color: "#64748B", fontSize: 9, textTransform: "uppercase", letterSpacing: "0.12em", fontFamily: "ui-monospace, monospace" }}>{m.label}</div>
            <div style={{ color: "#F1F5F9", fontSize: 18, fontWeight: 800, marginTop: 2, letterSpacing: "-0.02em" }}>{m.value}</div>
          </div>
        ))}
      </div>

      <div className="relative mt-5">
        <div className="flex items-center justify-between mb-2">
          <div style={{ color: "#64748B", fontSize: 9, textTransform: "uppercase", letterSpacing: "0.12em", fontFamily: "ui-monospace, monospace" }}>{pick(d.chartLabel, lang)}</div>
          <div style={{ color: d.accent, fontSize: 9, fontFamily: "ui-monospace, monospace", letterSpacing: "0.1em" }}>▲ +18%</div>
        </div>
        <div className="flex items-end gap-1.5" style={{ height: 64 }}>
          {d.chartData.map((c, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div
                style={{
                  width: "100%",
                  height: `${(c.value / max) * 100}%`,
                  background: `linear-gradient(180deg, ${d.accent}, ${d.accent}22)`,
                  borderRadius: 2,
                  minHeight: 4,
                  boxShadow: `0 0 12px ${d.accent}55`,
                  animation: `fade-in 0.6s ease-out ${i * 70}ms both`,
                }}
              />
              <span style={{ color: "#475569", fontSize: 8, fontFamily: "ui-monospace, monospace" }}>{pick(c.label, lang)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="relative mt-5">
        <div className="flex items-center gap-2 mb-2">
          <span style={{ color: "#64748B", fontSize: 9, textTransform: "uppercase", letterSpacing: "0.12em", fontFamily: "ui-monospace, monospace" }}>{pick(ACTIVITY_LABEL, lang)}</span>
          <span className="flex-1 h-px" style={{ background: "linear-gradient(90deg, rgba(99,102,241,0.25), transparent)" }} />
        </div>
        <div className="space-y-1.5">
          {pick(d.activity, lang).map((a, i) => (
            <div
              key={a}
              className="flex items-start gap-2"
              style={{ fontSize: 11, color: "#94A3B8", animation: `fade-in 0.5s ease-out ${i * 80}ms both` }}
            >
              <span
                className="mt-1.5 size-1 rounded-full shrink-0"
                style={{ background: d.accent, boxShadow: `0 0 6px ${d.accent}` }}
              />
              <span>{a}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
