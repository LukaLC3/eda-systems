// @ts-nocheck
import React, { useState } from "react";
import {
  Building2,
  Heart,
  Activity,
  FileText,
  PenTool,
  Wrench,
  UtensilsCrossed,
  Calendar,
  MessageCircle,
  BarChart2,
  CreditCard,
  Bot,
  Check,
  Lock,
  Calculator,
  ChevronDown,
} from "lucide-react";
import { sectorData } from "@/components/demo/data/sectorData";
import ROICalculator from "@/demo/components/ROICalculator";

// ─── Types ────────────────────────────────────────────────────────────────────

type PackageId = "starter" | "pro" | "allin" | "ai";
type SectorId =
  | "vastgoed"
  | "tandarts"
  | "kinesist"
  | "accountant"
  | "architect"
  | "garage"
  | "horeca";

// ─── Static data ─────────────────────────────────────────────────────────────

const PACKAGES: { id: PackageId; label: string; price: number; setup: number; badge?: string; color: string }[] = [
  { id: "starter", label: "Starter",  price: 247, setup: 247, color: "#10B981" },
  { id: "pro",     label: "Pro",      price: 397, setup: 347, badge: "★ Meest gekozen", color: "#2563EB" },
  { id: "allin",   label: "All-in",   price: 597, setup: 497, color: "#8B5CF6" },
  { id: "ai",      label: "AI Agent", price: 997, setup: 697, badge: "★ Premium", color: "#F59E0B" },
];

const SECTORS: { id: SectorId; name: string; tag: string; icon: React.ElementType; color: string }[] = [
  { id: "vastgoed",   name: "Vastgoedmakelaars", tag: "SELL / VERKOPEN",          icon: Building2,       color: "#2563EB" },
  { id: "tandarts",   name: "Tandartsen",         tag: "TREAT / BEHANDELEN",       icon: Heart,           color: "#10B981" },
  { id: "kinesist",   name: "Kinesisten",         tag: "RESTORE / HERSTELLEN",     icon: Activity,        color: "#F59E0B" },
  { id: "accountant", name: "Accountants",        tag: "OPTIMISE / OPTIMALISEREN", icon: FileText,        color: "#8B5CF6" },
  { id: "architect",  name: "Architecten",        tag: "DESIGN / ONTWERPEN",       icon: PenTool,         color: "#EF4444" },
  { id: "garage",     name: "Garagebedrijven",    tag: "REPAIR / HERSTELLEN",      icon: Wrench,          color: "#06B6D4" },
  { id: "horeca",     name: "Horeca",             tag: "HOST / ONTHALEN",          icon: UtensilsCrossed, color: "#F97316" },
];

// Exact features per sector per package (NL)
const FEATURES: Record<SectorId, Record<PackageId, string[]>> = {
  vastgoed: {
    starter: [
      "WhatsApp chatbot beantwoordt veelgestelde vragen 24/7",
      "Bezichtigingen automatisch inplannen via WhatsApp",
      "Bevestiging + adres + parkeerinfo automatisch verstuurd",
      "Herinnering 48u en 24u voor elke bezichtiging",
      "Annulatie automatisch verwerkt en slot opnieuw vrijgegeven",
      "Nieuwe leads automatisch toegevoegd aan uw CRM",
      "Maandelijks overzichtsrapport automatisch in uw inbox",
    ],
    pro: [
      "AI schrijft een volledige woningbeschrijving binnen enkele minuten",
      "Beschrijving beschikbaar in NL, FR en EN",
      "Automatische follow-up na 48u zonder reactie van een lead",
      "Leads automatisch gecategoriseerd op interesse in uw CRM",
      "Sociale media post per nieuw pand automatisch gegenereerd",
      "Wekelijks rapport met overzicht van leads en bezichtigingen",
      "Prioriteit support binnen 4 werkuren",
    ],
    allin: [
      "Factuur automatisch aangemaakt na elke afgeronde verkoop of verhuur",
      "Commissieberekening automatisch verwerkt per dossier",
      "Kosten automatisch gecategoriseerd voor uw boekhouding",
      "Maandoverzicht volledig klaar om door te sturen naar uw boekhouder",
      "Verkoop- en verhuurcontracten automatisch opgesteld via template",
      "Documenten per dossier automatisch geordend en gearchiveerd",
      "Persoonlijke accountmanager — 1 vast aanspreekpunt",
    ],
    ai: [
      "Eigen AI-assistent getraind op de toon en werking van uw kantoor",
      "E-mails automatisch gelezen, gecategoriseerd en beantwoord",
      "Volledig agendabeheer — AI plant, verschuift en bevestigt afspraken",
      "Sentiment van klantberichten automatisch herkend — urgente zaken eerst",
      "Wekelijks AI-overzicht: welke leads het meest actief zijn",
      "Dagelijks rapport elke ochtend om 7u in uw inbox",
      "Dedicated success team dat actief meedenkt over optimalisaties",
    ],
  },
  tandarts: {
    starter: [
      "Afspraken automatisch inplannen via WhatsApp 24/7",
      "Bevestiging automatisch verstuurd met praktijkinformatie",
      "Herinnering 72u, 48u en 24u voor elke afspraak",
      "No-show automatisch opgevolgd met persoonlijk bericht",
      "Annulatie automatisch verwerkt en slot opnieuw vrijgegeven",
      "Controle-afspraak automatisch voorgesteld na behandeling",
      "Maandelijks overzichtsrapport automatisch in uw inbox",
    ],
    pro: [
      "Intakeformulier automatisch verstuurd voor het eerste bezoek",
      "Antwoorden automatisch verwerkt in het patiëntdossier",
      "Nazorginstructies automatisch verstuurd na een behandeling",
      "Tevredenheidsenquête automatisch verstuurd na elke afspraak",
      "Google Review-uitnodiging automatisch verstuurd aan tevreden patiënten",
      "Veelgestelde vragen automatisch beantwoord via AI",
      "Wekelijks rapport met bezettingsgraad en no-show cijfers",
      "Prioriteit support binnen 4 werkuren",
    ],
    allin: [
      "Factuur automatisch aangemaakt na elke behandeling",
      "Betalingsherinnering automatisch verstuurd bij openstaand bedrag",
      "Patiëntendossier automatisch up-to-date gehouden",
      "Maandoverzicht volledig klaar om door te sturen naar uw boekhouder",
      "Documenten per patiënt automatisch geordend en gearchiveerd",
      "Persoonlijke accountmanager — 1 vast aanspreekpunt",
    ],
    ai: [
      "Eigen AI-assistent getraind op de toon en werking van uw praktijk",
      "Behandelnotities automatisch omgezet van spraak naar tekst",
      "Patiëntdossier automatisch aangevuld na elk gesprek",
      "Sentiment van patiëntberichten automatisch herkend",
      "Medicatie- en controleherinneringen automatisch verstuurd",
      "Dagelijks rapport elke ochtend om 7u in uw inbox",
      "Dedicated success team dat actief meedenkt over optimalisaties",
    ],
  },
  kinesist: {
    starter: [
      "Sessies automatisch inplannen via WhatsApp 24/7",
      "Reeks van meerdere sessies automatisch ingepland na eerste afspraak",
      "Bevestiging en herinnering automatisch verstuurd voor elke sessie",
      "No-show automatisch opgevolgd met persoonlijk bericht",
      "Annulatie automatisch verwerkt en slot opnieuw vrijgegeven",
      "Thuisoefeningen automatisch als PDF verstuurd na de sessie",
      "Maandelijks overzichtsrapport automatisch in uw inbox",
    ],
    pro: [
      "Voortgang per patiënt automatisch bijgehouden per sessie",
      "Dagelijkse oefenherinnering automatisch verstuurd aan patiënten",
      "Tevredenheidsenquête automatisch verstuurd na een sessiereeks",
      "Voortgangsoverzicht automatisch opgesteld per patiënt",
      "Google Review-uitnodiging automatisch verstuurd",
      "Wekelijks rapport met overzicht van sessies en voortgang",
      "Prioriteit support binnen 4 werkuren",
    ],
    allin: [
      "Factuur automatisch aangemaakt per sessie of per reeks",
      "Betalingsherinnering automatisch verstuurd bij openstaand bedrag",
      "Patiëntendossier automatisch up-to-date gehouden",
      "Maandoverzicht volledig klaar om door te sturen naar uw boekhouder",
      "Documenten per patiënt automatisch geordend en gearchiveerd",
      "Persoonlijke accountmanager — 1 vast aanspreekpunt",
    ],
    ai: [
      "Eigen AI-assistent getraind op de toon en werking van uw praktijk",
      "Behandelnotities automatisch omgezet van spraak naar tekst",
      "Patiëntdossier automatisch aangevuld na elke sessie",
      "Oefenschema's automatisch aangepast op basis van voortgang",
      "Sentiment van patiëntberichten automatisch herkend",
      "Dagelijks rapport elke ochtend om 7u in uw inbox",
      "Dedicated success team dat actief meedenkt over optimalisaties",
    ],
  },
  accountant: {
    starter: [
      "Facturen automatisch ontvangen en verwerkt via OCR",
      "Factuurgegevens automatisch klaargezet voor uw boekhoudpakket",
      "Bankafschriften automatisch gematcht met facturen",
      "Betalingsherinneringen automatisch verstuurd aan klanten",
      "Veelgestelde klantvragen automatisch beantwoord via AI",
      "Deadlines per klant automatisch bijgehouden",
      "Maandelijks overzichtsrapport automatisch in uw inbox",
    ],
    pro: [
      "Facturen met meerdere documenten automatisch gesplitst en herkend",
      "Dubbele facturen automatisch gedetecteerd en gemeld",
      "Herinnering automatisch verstuurd bij naderende deadline",
      "Ontbrekende documenten automatisch opgevraagd bij de klant",
      "Klant automatisch op de hoogte gehouden van dossierstatus",
      "Nieuw klantdossier automatisch aangemaakt en gestructureerd",
      "Wekelijks rapport per klant met openstaande acties",
      "Prioriteit support binnen 4 werkuren",
    ],
    allin: [
      "Voorbereidende cijfers voor BTW-aangifte automatisch klaargezet",
      "Voorbereidende cijfers voor jaarrekening automatisch klaargezet",
      "Facturatie aan uw eigen klanten automatisch verwerkt",
      "Urenregistratie automatisch verwerkt naar facturatie",
      "Maandoverzicht volledig klaar voor eindcontrole",
      "Documenten per dossier automatisch geordend en gearchiveerd",
      "Persoonlijke accountmanager — 1 vast aanspreekpunt",
    ],
    ai: [
      "Eigen AI-assistent getraind op de werking van uw kantoor",
      "AI signaleert automatisch ongebruikelijke afwijkingen in cijfers",
      "Cashflow-overzicht automatisch opgesteld per klant",
      "Vergelijking met vorige periodes automatisch opgesteld",
      "E-mails automatisch gelezen, gecategoriseerd en beantwoord",
      "Dagelijks rapport elke ochtend om 7u in uw inbox",
      "Dedicated success team dat actief meedenkt over optimalisaties",
    ],
  },
  architect: {
    starter: [
      "Afspraken automatisch inplannen via WhatsApp",
      "Vergaderingen automatisch ingepland en bevestigd",
      "Projectupdates automatisch verstuurd naar klanten",
      "Documenten per project automatisch geordend en gearchiveerd",
      "Herinneringen voor lopende deadlines automatisch verstuurd",
      "Maandelijks overzichtsrapport automatisch in uw inbox",
    ],
    pro: [
      "Offerte automatisch opgesteld op basis van uw eigen template",
      "Offerte automatisch verstuurd en opvolging automatisch herinnerd",
      "Goedkeuring van de klant automatisch verwerkt en gelogd",
      "Notulen van vergaderingen automatisch uitgewerkt via AI",
      "Meerwerken automatisch genoteerd en gecommuniceerd naar de klant",
      "Wekelijks rapport per project met status en acties",
      "Prioriteit support binnen 4 werkuren",
    ],
    allin: [
      "Factuur automatisch aangemaakt per projectfase",
      "Urenregistratie automatisch verwerkt naar facturatie",
      "Kosten per project automatisch bijgehouden",
      "Leveranciersfacturen automatisch verwerkt",
      "Maandoverzicht volledig klaar om door te sturen naar uw boekhouder",
      "Persoonlijke accountmanager — 1 vast aanspreekpunt",
    ],
    ai: [
      "Eigen AI-assistent getraind op de werking van uw kantoor",
      "AI helpt bij het opstellen van projectbeschrijvingen en teksten",
      "E-mails automatisch gelezen, gecategoriseerd en beantwoord",
      "Budgetoverzicht per project automatisch up-to-date gehouden",
      "Vergelijking met eerdere gelijkaardige projecten automatisch opgesteld",
      "Dagelijks rapport elke ochtend om 7u in uw inbox",
      "Dedicated success team dat actief meedenkt over optimalisaties",
    ],
  },
  garage: {
    starter: [
      "Klant automatisch verwittigd bij binnenkomst van het voertuig",
      "Statusupdate automatisch verstuurd tijdens de herstelling",
      "Klant automatisch verwittigd zodra het voertuig klaar is",
      "Factuur en betaallink automatisch verstuurd",
      "Onderhoudsherinnering automatisch verstuurd, ongeveer 1 jaar later",
      "Herinnering voor technische keuring automatisch verstuurd",
      "Maandelijks overzichtsrapport automatisch in uw inbox",
    ],
    pro: [
      "Offerte automatisch opgesteld op basis van het gemelde probleem",
      "Offerte automatisch verstuurd en opvolging via WhatsApp",
      "Seizoensgebonden herinnering voor bandenwissel automatisch verstuurd",
      "Tevredenheidsenquête automatisch verstuurd na elke herstelling",
      "Google Review-uitnodiging automatisch verstuurd",
      "Wekelijks rapport met overzicht van herstellingen en omzet",
      "Prioriteit support binnen 4 werkuren",
    ],
    allin: [
      "Werkorder automatisch aangemaakt per herstelling",
      "Garantiedossier automatisch bijgehouden per voertuig",
      "Factuur automatisch aangemaakt na elke herstelling",
      "Maandoverzicht volledig klaar om door te sturen naar uw boekhouder",
      "Documenten per voertuig automatisch geordend en gearchiveerd",
      "Persoonlijke accountmanager — 1 vast aanspreekpunt",
    ],
    ai: [
      "Eigen AI-assistent getraind op de werking van uw garage",
      "Eerste inschatting van schade op basis van foto's via AI",
      "E-mails automatisch gelezen, gecategoriseerd en beantwoord",
      "Klantgeschiedenis automatisch herkend bij nieuw contact",
      "Werkplanning automatisch overzichtelijk gehouden per dag",
      "Dagelijks rapport elke ochtend om 7u in uw inbox",
      "Dedicated success team dat actief meedenkt over optimalisaties",
    ],
  },
  horeca: {
    starter: [
      "Reserveringen automatisch verwerkt via WhatsApp",
      "Bevestiging automatisch verstuurd naar de gast",
      "Herinnering de dag voor de reservering automatisch verstuurd",
      "No-show automatisch opgevolgd en tafel opnieuw vrijgegeven",
      "Allergieën automatisch genoteerd bij de reservering",
      "Speciale gelegenheden automatisch genoteerd bij de reservering",
      "Maandelijks overzichtsrapport automatisch in uw inbox",
    ],
    pro: [
      "Personeelsplanning automatisch opgesteld op basis van beschikbaarheid",
      "Beschikbaarheden automatisch verzameld bij het team",
      "Wijzigingen in planning automatisch gecommuniceerd naar het team",
      "Feedback na bezoek automatisch opgevraagd bij gasten",
      "Google Reviews automatisch gemonitord",
      "Negatieve review automatisch en onmiddellijk gemeld aan de zaakvoerder",
      "Wekelijks rapport met overzicht van reserveringen en feedback",
      "Prioriteit support binnen 4 werkuren",
    ],
    allin: [
      "Verjaardagsbericht automatisch verstuurd naar vaste gasten",
      "Seizoensaanbiedingen automatisch gecommuniceerd naar uw mailinglijst",
      "Voorraad automatisch bijgehouden op basis van bestellingen",
      "Bestelherinnering automatisch verstuurd bij lage voorraad",
      "Dagomzet automatisch samengevat in uw rapport",
      "Persoonlijke accountmanager — 1 vast aanspreekpunt",
    ],
    ai: [
      "Eigen AI-assistent getraind op de werking van uw zaak",
      "Vaste gasten automatisch herkend bij nieuwe reservering",
      "Sociale media posts automatisch voorgesteld op basis van uw menu",
      "E-mails automatisch gelezen, gecategoriseerd en beantwoord",
      "Reserveringspatronen automatisch samengevat per week",
      "Dagelijks rapport elke ochtend om 7u in uw inbox",
      "Dedicated success team dat actief meedenkt over optimalisaties",
    ],
  },
};

// Tabs visible per package level
// Accountants gets "Document Processing" instead of "Agenda" in Starter
function getVisibleTabs(pkg: PackageId, sector: SectorId): string[] {
  const isAccountant = sector === "accountant";
  const tabs: string[] = ["overview"];
  if (isAccountant) {
    tabs.push("documents");
  } else {
    tabs.push("agenda");
  }
  if (pkg === "pro" || pkg === "allin" || pkg === "ai") {
    tabs.push("whatsapp");
    tabs.push("rapports");
  }
  if (pkg === "allin" || pkg === "ai") {
    tabs.push("admin");
  }
  if (pkg === "ai") {
    tabs.push("aiassistent");
  }
  return tabs;
}

const TAB_META: Record<string, { label: string; icon: React.ElementType }> = {
  overview:   { label: "Overzicht",          icon: Check },
  agenda:     { label: "Agenda",             icon: Calendar },
  documents:  { label: "Documenten",         icon: FileText },
  whatsapp:   { label: "WhatsApp",           icon: MessageCircle },
  rapports:   { label: "Rapporten",          icon: BarChart2 },
  admin:      { label: "Administratie",      icon: CreditCard },
  aiassistent:{ label: "AI Assistent",       icon: Bot },
};

// ─── Main component ───────────────────────────────────────────────────────────

export function DemoApp() {
  const [sector, setSector] = useState<SectorId>("vastgoed");
  const [pkg, setPkg] = useState<PackageId>("pro");
  const [activeTab, setActiveTab] = useState("overview");
  const [showROI, setShowROI] = useState(false);
  const [showSectorMenu, setShowSectorMenu] = useState(false);

  const sectorDef = SECTORS.find((s) => s.id === sector)!;
  const data = (sectorData as any)[sector];
  const visibleTabs = getVisibleTabs(pkg, sector);

  // If active tab became invisible due to package downgrade, reset to overview
  const safeTab = visibleTabs.includes(activeTab) ? activeTab : "overview";

  const allFeatures = [
    ...FEATURES[sector].starter.map((f) => ({ text: f, pkg: "starter" as PackageId })),
    ...FEATURES[sector].pro.map((f) => ({ text: f, pkg: "pro" as PackageId })),
    ...FEATURES[sector].allin.map((f) => ({ text: f, pkg: "allin" as PackageId })),
    ...FEATURES[sector].ai.map((f) => ({ text: f, pkg: "ai" as PackageId })),
  ];

  const pkgOrder: PackageId[] = ["starter", "pro", "allin", "ai"];
  const currentPkgIdx = pkgOrder.indexOf(pkg);

  return (
    <div className="min-h-screen" style={{ background: "#060D1A", color: "#E2E8F0", fontFamily: "Inter, sans-serif" }}>
      {/* Header */}
      <header style={{ background: "#0D1B2E", borderBottom: "1px solid #1E2D45", padding: "0 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 60 }}>
          <div style={{ fontWeight: 700, fontSize: 18, color: "#fff", letterSpacing: "-0.02em" }}>
            EDA <span style={{ color: "#2563EB" }}>Systems</span>
          </div>

          {/* Sector picker */}
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setShowSectorMenu(!showSectorMenu)}
              style={{
                display: "flex", alignItems: "center", gap: 8, padding: "6px 14px",
                background: `${sectorDef.color}18`, border: `1px solid ${sectorDef.color}44`,
                borderRadius: 6, color: sectorDef.color, fontSize: 13, fontWeight: 600, cursor: "pointer",
              }}
            >
              <sectorDef.icon size={14} />
              {sectorDef.name}
              <span
                style={{
                  fontSize: 9, fontWeight: 700, letterSpacing: "0.1em",
                  padding: "2px 6px", borderRadius: 4,
                  background: `${sectorDef.color}22`, color: sectorDef.color,
                }}
              >
                {sectorDef.tag}
              </span>
              <ChevronDown size={12} />
            </button>
            {showSectorMenu && (
              <div
                style={{
                  position: "absolute", top: "calc(100% + 4px)", right: 0, zIndex: 100,
                  background: "#0D1B2E", border: "1px solid #1E2D45", borderRadius: 8,
                  minWidth: 260, boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
                }}
              >
                {SECTORS.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => { setSector(s.id); setShowSectorMenu(false); setActiveTab("overview"); }}
                    style={{
                      display: "flex", alignItems: "center", gap: 10, width: "100%",
                      padding: "10px 16px", background: "transparent", border: "none",
                      color: s.id === sector ? s.color : "#94A3B8", fontSize: 13, cursor: "pointer",
                      textAlign: "left",
                    }}
                  >
                    <s.icon size={14} style={{ color: s.color }} />
                    <span style={{ flex: 1 }}>{s.name}</span>
                    <span style={{ fontSize: 9, color: s.color, fontWeight: 700, letterSpacing: "0.08em" }}>{s.tag}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => setShowROI(true)}
            style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "6px 14px", background: "#0a2540", border: "1px solid #1E4080",
              borderRadius: 6, color: "#60a5fa", fontSize: 13, fontWeight: 600, cursor: "pointer",
            }}
          >
            <Calculator size={14} />
            ROI berekenen
          </button>
        </div>
      </header>

      {/* Package toggle */}
      <div style={{ background: "#080F1E", borderBottom: "1px solid #1E2D45", padding: "12px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
          <span style={{ fontSize: 12, color: "#64748B", marginRight: 4 }}>Pakket:</span>
          {PACKAGES.map((p) => (
            <button
              key={p.id}
              onClick={() => setPkg(p.id)}
              style={{
                display: "flex", alignItems: "center", gap: 6,
                padding: "6px 16px", borderRadius: 6, fontSize: 13, fontWeight: 600, cursor: "pointer",
                background: pkg === p.id ? p.color : "transparent",
                color: pkg === p.id ? "#fff" : p.color,
                border: `2px solid ${p.color}`,
                transition: "all 0.15s",
              }}
            >
              {p.label}
              {p.badge && (
                <span style={{ fontSize: 10, opacity: 0.85 }}>{p.badge}</span>
              )}
            </button>
          ))}
          <span style={{ marginLeft: "auto", fontSize: 13, color: "#94A3B8" }}>
            <span style={{ fontWeight: 700, color: "#fff" }}>
              €{PACKAGES.find((p) => p.id === pkg)!.price}/maand
            </span>
            <span style={{ color: "#64748B", marginLeft: 6 }}>
              + €{PACKAGES.find((p) => p.id === pkg)!.setup} eenmalig
            </span>
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ background: "#0D1B2E", borderBottom: "1px solid #1E2D45", padding: "0 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", gap: 0 }}>
          {Object.entries(TAB_META).map(([id, meta]) => {
            const visible = visibleTabs.includes(id);
            const isActive = id === safeTab;
            const Icon = meta.icon;
            return (
              <button
                key={id}
                onClick={() => visible && setActiveTab(id)}
                disabled={!visible}
                style={{
                  display: "flex", alignItems: "center", gap: 6,
                  padding: "12px 16px", fontSize: 13, fontWeight: 500,
                  background: "transparent", border: "none", cursor: visible ? "pointer" : "not-allowed",
                  color: isActive ? sectorDef.color : visible ? "#94A3B8" : "#334155",
                  borderBottom: isActive ? `2px solid ${sectorDef.color}` : "2px solid transparent",
                  transition: "all 0.15s",
                  opacity: visible ? 1 : 0.45,
                }}
              >
                {!visible && <Lock size={11} />}
                <Icon size={13} />
                {meta.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 24px" }}>
        {safeTab === "overview" && (
          <OverviewTab
            sector={sector}
            sectorDef={sectorDef}
            pkg={pkg}
            pkgOrder={pkgOrder}
            currentPkgIdx={currentPkgIdx}
            allFeatures={allFeatures}
            data={data}
          />
        )}
        {safeTab === "agenda" && <AgendaTab data={data} sectorDef={sectorDef} />}
        {safeTab === "documents" && <DocumentsTab data={data} />}
        {safeTab === "whatsapp" && <WhatsAppTab data={data} sectorDef={sectorDef} />}
        {safeTab === "rapports" && <RapportsTab data={data} sectorDef={sectorDef} />}
        {safeTab === "admin" && <AdminTab data={data} />}
        {safeTab === "aiassistent" && <AIAssistentTab sectorDef={sectorDef} sector={sector} />}
      </main>

      {showROI && (
        <ROICalculator onClose={() => setShowROI(false)} sectorId={sector} activePackage={pkg} />
      )}
    </div>
  );
}

// ─── Tab components ───────────────────────────────────────────────────────────

function OverviewTab({ sector, sectorDef, pkg, pkgOrder, currentPkgIdx, allFeatures, data }: any) {
  const upgradeTo: Record<PackageId, string> = { starter: "", pro: "Pro", allin: "All-in", ai: "AI Agent" };

  return (
    <div>
      {/* Metrics */}
      {data?.metrics && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 16, marginBottom: 32 }}>
          {Object.entries(data.metrics).map(([k, v]) => (
            <div key={k} style={{ background: "#0D1B2E", border: "1px solid #1E2D45", borderRadius: 10, padding: "18px 20px" }}>
              <div style={{ fontSize: 11, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.1em" }}>{k}</div>
              <div style={{ fontSize: 28, fontWeight: 700, color: sectorDef.color, marginTop: 6 }}>{String(v)}</div>
            </div>
          ))}
        </div>
      )}

      {/* Feature checklist */}
      <div style={{ background: "#0D1B2E", border: "1px solid #1E2D45", borderRadius: 12, padding: 24 }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 20 }}>
          Inbegrepen features — {pkgOrder.find((p: any) => p === pkg) && PACKAGES.find((p: any) => p.id === pkg)?.label} pakket
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {allFeatures.map((f: any, i: number) => {
            const featurePkgIdx = pkgOrder.indexOf(f.pkg);
            const unlocked = featurePkgIdx <= currentPkgIdx;
            const upgradeName = unlocked ? "" : upgradeTo[f.pkg];
            return (
              <div
                key={i}
                style={{
                  display: "flex", alignItems: "flex-start", gap: 10,
                  opacity: unlocked ? 1 : 0.45,
                }}
              >
                {unlocked ? (
                  <Check size={15} style={{ color: sectorDef.color, flexShrink: 0, marginTop: 2 }} />
                ) : (
                  <Lock size={13} style={{ color: "#475569", flexShrink: 0, marginTop: 3 }} />
                )}
                <span style={{ fontSize: 13, color: unlocked ? "#CBD5E1" : "#475569", lineHeight: 1.6 }}>
                  {f.text}
                  {!unlocked && (
                    <span style={{ marginLeft: 8, fontSize: 11, color: "#2563EB", fontWeight: 600 }}>
                      Upgrade naar {upgradeName}
                    </span>
                  )}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function AgendaTab({ data, sectorDef }: any) {
  const days = ["Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag"];
  const items = data?.agendaItems ?? [];
  return (
    <div style={{ background: "#0D1B2E", border: "1px solid #1E2D45", borderRadius: 12, padding: 24 }}>
      <h2 style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 20 }}>Agenda — deze week</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 8 }}>
        {days.map((day, di) => (
          <div key={day}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>{day}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {items.filter((i: any) => i.day === di).map((item: any) => (
                <div key={item.id} style={{ background: `${item.color}18`, border: `1px solid ${item.color}44`, borderRadius: 6, padding: "8px 10px" }}>
                  <div style={{ fontSize: 11, color: item.color, fontWeight: 600 }}>{item.time}</div>
                  <div style={{ fontSize: 12, color: "#CBD5E1", marginTop: 2, lineHeight: 1.4 }}>{item.title}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DocumentsTab({ data }: any) {
  const items = data?.documentItems ?? [];
  return (
    <div style={{ background: "#0D1B2E", border: "1px solid #1E2D45", borderRadius: 12, padding: 24 }}>
      <h2 style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 20 }}>Documentverwerking — OCR</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid #1E2D45" }}>
            {["Datum", "Leverancier", "Bedrag", "Type", "Status"].map((h) => (
              <th key={h} style={{ textAlign: "left", padding: "8px 12px", fontSize: 11, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.1em" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((item: any) => (
            <tr key={item.id} style={{ borderBottom: "1px solid #0F1A2E" }}>
              <td style={{ padding: "10px 12px", fontSize: 13, color: "#94A3B8" }}>{item.datum}</td>
              <td style={{ padding: "10px 12px", fontSize: 13, color: "#CBD5E1" }}>{item.leverancier}</td>
              <td style={{ padding: "10px 12px", fontSize: 13, color: "#10B981", fontWeight: 600 }}>{item.bedrag}</td>
              <td style={{ padding: "10px 12px", fontSize: 13, color: "#94A3B8" }}>{item.type}</td>
              <td style={{ padding: "10px 12px" }}>
                <span style={{
                  fontSize: 11, fontWeight: 600, padding: "3px 8px", borderRadius: 4,
                  background: item.ocrStatus === "Verwerkt" ? "#10B98122" : item.ocrStatus === "Fout" ? "#EF444422" : "#F59E0B22",
                  color: item.ocrStatus === "Verwerkt" ? "#10B981" : item.ocrStatus === "Fout" ? "#EF4444" : "#F59E0B",
                }}>
                  {item.ocrStatus}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function WhatsAppTab({ data, sectorDef }: any) {
  const convs = data?.whatsappConversations ?? [];
  const [active, setActive] = useState(0);
  const conv = convs[active];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 16 }}>
      <div style={{ background: "#0D1B2E", border: "1px solid #1E2D45", borderRadius: 12, overflow: "hidden" }}>
        {convs.map((c: any, i: number) => (
          <button
            key={c.id}
            onClick={() => setActive(i)}
            style={{
              width: "100%", padding: "12px 14px", background: i === active ? `${sectorDef.color}14` : "transparent",
              border: "none", borderBottom: "1px solid #1E2D45", cursor: "pointer", textAlign: "left",
              borderLeft: i === active ? `3px solid ${sectorDef.color}` : "3px solid transparent",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: sectorDef.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#fff" }}>
                {c.avatar}
              </div>
              <span style={{ fontSize: 13, color: "#CBD5E1", fontWeight: 500 }}>{c.name}</span>
            </div>
          </button>
        ))}
      </div>
      {conv && (
        <div style={{ background: "#0D1B2E", border: "1px solid #1E2D45", borderRadius: 12, padding: 20, display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ fontWeight: 600, color: "#fff", fontSize: 14, borderBottom: "1px solid #1E2D45", paddingBottom: 12 }}>{conv.name}</div>
          {conv.messages.map((m: any) => (
            <div key={m.id} style={{ display: "flex", justifyContent: m.sender === "ai" ? "flex-start" : "flex-end" }}>
              <div style={{
                maxWidth: "75%", padding: "10px 14px", borderRadius: 12, fontSize: 13, lineHeight: 1.6,
                background: m.sender === "ai" ? "#1E2D45" : `${sectorDef.color}22`,
                color: m.sender === "ai" ? "#CBD5E1" : "#E2E8F0",
                borderBottomLeftRadius: m.sender === "ai" ? 4 : 12,
                borderBottomRightRadius: m.sender === "user" ? 4 : 12,
              }}>
                {m.text}
                <div style={{ fontSize: 10, color: "#64748B", marginTop: 4, textAlign: "right" }}>{m.time}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function RapportsTab({ data, sectorDef }: any) {
  const chart = data?.chartData ?? [];
  const max = Math.max(...chart.map((d: any) => d.voor), 1);
  return (
    <div style={{ background: "#0D1B2E", border: "1px solid #1E2D45", borderRadius: 12, padding: 24 }}>
      <h2 style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 20 }}>Wekelijks rapport — Uren administratie</h2>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 12, height: 180 }}>
        {chart.map((d: any) => (
          <div key={d.month} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <div style={{ width: "100%", display: "flex", gap: 3, alignItems: "flex-end", height: 150 }}>
              <div style={{ flex: 1, background: "#1E2D45", borderRadius: "3px 3px 0 0", height: `${(d.voor / max) * 100}%` }} title={`Voor: ${d.voor}u`} />
              <div style={{ flex: 1, background: sectorDef.color, borderRadius: "3px 3px 0 0", height: `${(d.met / max) * 100}%` }} title={`Met EDA: ${d.met}u`} />
            </div>
            <div style={{ fontSize: 11, color: "#64748B" }}>{d.month}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 16, marginTop: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#94A3B8" }}>
          <div style={{ width: 12, height: 12, background: "#1E2D45", borderRadius: 2 }} /> Voor EDA
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#94A3B8" }}>
          <div style={{ width: 12, height: 12, background: sectorDef.color, borderRadius: 2 }} /> Met EDA
        </div>
      </div>
    </div>
  );
}

function AdminTab({ data }: any) {
  const items = data?.adminItems ?? [];
  return (
    <div style={{ background: "#0D1B2E", border: "1px solid #1E2D45", borderRadius: 12, padding: 24 }}>
      <h2 style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 20 }}>Administratie & Facturatie</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid #1E2D45" }}>
            {["Datum", "Omschrijving", "Bedrag", "Status"].map((h) => (
              <th key={h} style={{ textAlign: "left", padding: "8px 12px", fontSize: 11, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.1em" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((item: any) => (
            <tr key={item.id} style={{ borderBottom: "1px solid #0F1A2E" }}>
              <td style={{ padding: "10px 12px", fontSize: 13, color: "#94A3B8" }}>{item.datum}</td>
              <td style={{ padding: "10px 12px", fontSize: 13, color: "#CBD5E1" }}>{item.omschrijving}</td>
              <td style={{ padding: "10px 12px", fontSize: 13, color: "#10B981", fontWeight: 600 }}>{item.bedrag}</td>
              <td style={{ padding: "10px 12px" }}>
                <span style={{
                  fontSize: 11, fontWeight: 600, padding: "3px 8px", borderRadius: 4,
                  background: item.status === "Verwerkt" ? "#10B98122" : item.status === "In behandeling" ? "#F59E0B22" : "#2563EB22",
                  color: item.status === "Verwerkt" ? "#10B981" : item.status === "In behandeling" ? "#F59E0B" : "#60A5FA",
                }}>
                  {item.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function AIAssistentTab({ sectorDef, sector }: any) {
  const examples: Record<string, string[]> = {
    vastgoed: [
      "Schrijf een woningbeschrijving voor een villa van 320m² in Gent",
      "Analyseer de leads van afgelopen week en geef prioriteiten",
      "Stel een follow-up e-mail op voor lead Thomas De Smet",
    ],
    tandarts: [
      "Verwerk de behandelnotities van vanmiddag naar het patiëntdossier",
      "Stuur een herinnering aan alle patiënten die volgende week langskomen",
      "Analyseer no-show patronen van de afgelopen maand",
    ],
    kinesist: [
      "Pas het oefenschema van Ahmed aan op basis van zijn laatste voortgang",
      "Genereer een PDF met thuisoefeningen voor schouderletsels",
      "Stel een progressierapport op voor patiënt Els Martens",
    ],
    accountant: [
      "Detecteer afwijkingen in de cijfers van Bakkerij Leclercq",
      "Maak een cashflow-overzicht voor De Smet NV",
      "Beantwoord de factuurvraag van klant Karen automatisch",
    ],
    architect: [
      "Stel een projectbeschrijving op voor renovatie Bogaert",
      "Analyseer het budget vs. werkelijke kosten voor project Steyaert",
      "Beantwoord e-mail van Inge over fase 2 factuur",
    ],
    garage: [
      "Beoordeel de foto's van de schade aan de Toyota Yaris",
      "Stel een werkplanning op voor morgen op basis van alle openstaande opdrachten",
      "Herkende klant Bruno Claes — stel onderhoud voor op basis van historiek",
    ],
    horeca: [
      "Stel 3 sociale media posts voor op basis van het nieuwe seizoensmenu",
      "Analyseer de reserveringspatronen van deze maand",
      "Herkende vaste gast Dirk — wat zijn zijn gebruikelijke voorkeuren?",
    ],
  };

  const prompts = examples[sector] ?? examples.vastgoed;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ background: "#0D1B2E", border: "1px solid #1E2D45", borderRadius: 12, padding: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
          <Bot size={20} style={{ color: sectorDef.color }} />
          <h2 style={{ fontSize: 16, fontWeight: 700, color: "#fff" }}>
            AI-assistent — getraind op uw {sectorDef.name.toLowerCase()}
          </h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {prompts.map((p, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", background: "#060D1A", border: "1px solid #1E2D45", borderRadius: 8 }}>
              <span style={{ fontSize: 18 }}>💬</span>
              <span style={{ fontSize: 13, color: "#CBD5E1" }}>{p}</span>
              <button style={{ marginLeft: "auto", fontSize: 11, color: sectorDef.color, background: `${sectorDef.color}18`, border: `1px solid ${sectorDef.color}44`, borderRadius: 4, padding: "4px 10px", cursor: "pointer", fontWeight: 600 }}>
                Uitvoeren
              </button>
            </div>
          ))}
        </div>
      </div>
      <div style={{ background: "#0a2540", border: "1px solid #1E4080", borderRadius: 10, padding: 16, fontSize: 13, color: "#60a5fa" }}>
        ✨ Deze AI-assistent is volledig getraind op de toon, processen en klantgegevens van uw specifieke bedrijf. Dagelijks rapport om 7u in uw inbox.
      </div>
    </div>
  );
}

// Make sectorData available (re-export shim for older import path)
export { sectorData } from "@/components/demo/data/sectorData";
