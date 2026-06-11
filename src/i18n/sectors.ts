import {
  Building2,
  Heart,
  Activity,
  FileText,
  PenTool,
  Wrench,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import type { Lang } from "./translations";

export type SectorKey =
  | "vastgoed"
  | "tandartsen"
  | "kinesisten"
  | "accountants"
  | "architecten"
  | "garages"
  | "horeca";

export type SectorDef = {
  key: SectorKey;
  /** Default NL display name (kept for back-compat) */
  name: string;
  /** @deprecated — emojis removed from UI */
  emoji: string;
  icon: LucideIcon;
  tagline: string;
  accent: string; // hex
};

export const SECTORS: SectorDef[] = [
  { key: "vastgoed", name: "Vastgoedmakelaars", emoji: "", icon: Building2, accent: "#2563EB", tagline: "Geautomatiseerd afsprakenbeheer, leadopvolging en woningbeschrijvingen via AI." },
  { key: "tandartsen", name: "Tandartsen", emoji: "", icon: Heart, accent: "#10B981", tagline: "No-shows elimineren, afspraken automatiseren en patiëntcommunicatie vereenvoudigen." },
  { key: "kinesisten", name: "Kinesisten", emoji: "", icon: Activity, accent: "#F59E0B", tagline: "Sessies inplannen, behandelverslagen via spraak en patiëntopvolging automatiseren." },
  { key: "accountants", name: "Accountants", emoji: "", icon: FileText, accent: "#8B5CF6", tagline: "Factuurverwerking, deadlineopvolging en klantcommunicatie automatiseren." },
  { key: "architecten", name: "Architecten", emoji: "", icon: PenTool, accent: "#EF4444", tagline: "Offertes genereren, projectcommunicatie en facturatie per fase automatiseren." },
  { key: "garages", name: "Garagebedrijven", emoji: "", icon: Wrench, accent: "#06B6D4", tagline: "Offertes, wagenstatus, APK-herinneringen en onderhoudsmeldingen automatiseren." },
  { key: "horeca", name: "Horeca", emoji: "", icon: UtensilsCrossed, accent: "#F97316", tagline: "Reserveringen verwerken, personeelsplanning genereren en reviews monitoren." },
];

/** Per-language sector display name & description (selector cards, nav pill). */
export const SECTOR_DISPLAY: Record<SectorKey, Record<Lang, { name: string; desc: string }>> = {
  vastgoed: {
    nl: { name: "Vastgoedmakelaars", desc: "Geautomatiseerd afsprakenbeheer, leadopvolging en woningbeschrijvingen via AI." },
    en: { name: "Real Estate", desc: "Automated scheduling, lead follow-up and property descriptions via AI." },
    fr: { name: "Agents immobiliers", desc: "Gestion automatisée des rendez-vous, leads et descriptions de biens." },
    de: { name: "Immobilienmakler", desc: "Automatisierte Terminplanung, Lead-Follow-up und Objektbeschreibungen via KI." },
  },
  tandartsen: {
    nl: { name: "Tandartsen", desc: "No-shows elimineren, afspraken automatiseren en patiëntcommunicatie vereenvoudigen." },
    en: { name: "Dental Practices", desc: "Eliminate no-shows, automate scheduling and simplify patient communication." },
    fr: { name: "Cabinets dentaires", desc: "Éliminer les no-shows, automatiser les rendez-vous et simplifier la communication." },
    de: { name: "Zahnarztpraxen", desc: "No-shows eliminieren, Termine automatisieren und Patientenkommunikation vereinfachen." },
  },
  kinesisten: {
    nl: { name: "Kinesisten", desc: "Sessies inplannen, behandelverslagen via spraak en patiëntopvolging automatiseren." },
    en: { name: "Physiotherapists", desc: "Schedule sessions, dictate treatment reports and automate patient follow-up." },
    fr: { name: "Kinésithérapeutes", desc: "Planifier les séances, dicter les rapports et automatiser le suivi des patients." },
    de: { name: "Physiotherapeuten", desc: "Sitzungen planen, Behandlungsberichte diktieren und Patienten-Follow-up automatisieren." },
  },
  accountants: {
    nl: { name: "Accountants", desc: "Factuurverwerking, deadlineopvolging en klantcommunicatie automatiseren." },
    en: { name: "Accountants", desc: "Automate invoice processing, deadline tracking and client communication." },
    fr: { name: "Comptables", desc: "Automatiser le traitement des factures, le suivi des délais et la communication." },
    de: { name: "Buchhalter", desc: "Rechnungsverarbeitung, Fristen-Tracking und Kundenkommunikation automatisieren." },
  },
  architecten: {
    nl: { name: "Architecten", desc: "Offertes genereren, projectcommunicatie en facturatie per fase automatiseren." },
    en: { name: "Architects", desc: "Generate quotes, automate project updates and phase invoicing." },
    fr: { name: "Architectes", desc: "Générer des devis, automatiser les mises à jour et la facturation par phase." },
    de: { name: "Architekten", desc: "Angebote generieren, Projekt-Updates und phasenweise Rechnungsstellung automatisieren." },
  },
  garages: {
    nl: { name: "Garagebedrijven", desc: "Offertes, wagenstatus, APK-herinneringen en onderhoudsmeldingen automatiseren." },
    en: { name: "Automotive", desc: "Automate quotes, vehicle status updates, MOT and maintenance reminders." },
    fr: { name: "Garages", desc: "Automatiser devis, statut véhicule, rappels contrôle technique et entretien." },
    de: { name: "Autowerkstätten", desc: "Angebote, Fahrzeugstatus, TÜV- und Wartungserinnerungen automatisieren." },
  },
  horeca: {
    nl: { name: "Horeca", desc: "Reserveringen verwerken, personeelsplanning genereren en reviews monitoren." },
    en: { name: "Hospitality", desc: "Process reservations, generate staff schedules and monitor reviews." },
    fr: { name: "Horeca", desc: "Traiter les réservations, générer les plannings et surveiller les avis clients." },
    de: { name: "Gastronomie", desc: "Reservierungen verarbeiten, Personalplanung generieren und Bewertungen überwachen." },
  },
};

/** Per-sector hero copy in 3 main languages (DE falls back to NL). */
export const SECTOR_HERO: Record<SectorKey, Record<Lang, { title: string; subtitle: string }>> = {
  vastgoed: {
    nl: { title: "Stop met uren te verliezen aan afspraken en administratie.", subtitle: "Wij automatiseren uw volledige makelaarskantoor — van bezichtigingsaanvragen tot facturen. Volledig op de achtergrond." },
    en: { title: "Stop losing hours to appointments and administration.", subtitle: "We automate your entire agency — from viewing requests to invoices. Fully in the background." },
    fr: { title: "Arrêtez de perdre des heures en rendez-vous et administration.", subtitle: "Nous automatisons toute votre agence — des demandes de visite aux factures. Entièrement en arrière-plan." },
    de: { title: "Verlieren Sie keine Stunden mehr mit Terminen und Verwaltung.", subtitle: "Wir automatisieren Ihr gesamtes Maklerbüro — von Besichtigungsanfragen bis zur Rechnung." },
  },
  tandartsen: {
    nl: { title: "Elimineer no-shows. Win gemiddeld 2-3 uur per dag terug.", subtitle: "Wij automatiseren uw afsprakenbeheer, herinneringen en patiëntcommunicatie volledig." },
    en: { title: "Eliminate no-shows. Recover up to 3 hours every single day.", subtitle: "We fully automate your scheduling, reminders and patient communication." },
    fr: { title: "Éliminez les no-shows. Récupérez jusqu'à 3 heures par jour.", subtitle: "Nous automatisons votre planning, vos rappels et votre communication patients." },
    de: { title: "Eliminieren Sie No-Shows. Gewinnen Sie 2-3 Stunden pro Tag zurück.", subtitle: "Wir automatisieren Terminplanung, Erinnerungen und Patientenkommunikation vollständig." },
  },
  kinesisten: {
    nl: { title: "Meer tijd voor patiënten. Minder tijd aan administratie.", subtitle: "Van sessies inplannen tot behandelverslagen via spraak — volledig geautomatiseerd." },
    en: { title: "More time for patients. Less time on administration.", subtitle: "From scheduling sessions to voice-dictated treatment reports — fully automated." },
    fr: { title: "Plus de temps pour vos patients. Moins de temps en administration.", subtitle: "De la planification des séances aux rapports dictés à la voix — entièrement automatisé." },
    de: { title: "Mehr Zeit für Patienten. Weniger Zeit für Verwaltung.", subtitle: "Von der Sitzungsplanung bis zu Behandlungsberichten per Spracheingabe — vollständig automatisiert." },
  },
  accountants: {
    nl: { title: "Verwerk facturen gemiddeld 75% sneller. Automatisch.", subtitle: "Wij automatiseren uw factuurverwerking, klantcommunicatie en deadlineopvolging." },
    en: { title: "Process invoices up to 75% faster. Automatically.", subtitle: "We automate your invoice processing, client communication and deadline tracking." },
    fr: { title: "Traitez vos factures jusqu'à 75% plus vite. Automatiquement.", subtitle: "Nous automatisons le traitement des factures, la communication client et le suivi des délais." },
    de: { title: "Verarbeiten Sie Rechnungen 75% schneller. Automatisch.", subtitle: "Wir automatisieren Rechnungsverarbeitung, Kundenkommunikation und Fristen-Tracking." },
  },
  architecten: {
    nl: { title: "Offertes in minuten. Projectcommunicatie volledig automatisch.", subtitle: "Wij automatiseren uw administratie zodat u zich focust op ontwerp en klanten." },
    en: { title: "Quotes in minutes. Project communication fully automated.", subtitle: "We automate your admin so you can focus on design and clients." },
    fr: { title: "Devis en quelques minutes. Communication projet entièrement automatisée.", subtitle: "Nous automatisons votre administration pour que vous vous concentriez sur le design et les clients." },
    de: { title: "Angebote in Minuten. Projektkommunikation vollautomatisch.", subtitle: "Wir automatisieren Ihre Verwaltung, damit Sie sich auf Design und Kunden konzentrieren." },
  },
  garages: {
    nl: { title: "Offertes in minuten. Klanten automatisch op de hoogte.", subtitle: "Van wagenstatus tot APK-herinneringen — uw garage op automatische piloot." },
    en: { title: "Quotes in minutes. Clients automatically kept informed.", subtitle: "From vehicle status to MOT reminders — your garage on autopilot." },
    fr: { title: "Devis en quelques minutes. Clients informés automatiquement.", subtitle: "Du statut véhicule aux rappels contrôle technique — votre garage en pilote automatique." },
    de: { title: "Angebote in Minuten. Kunden automatisch informiert.", subtitle: "Vom Fahrzeugstatus bis zur TÜV-Erinnerung — Ihre Werkstatt auf Autopilot." },
  },
  horeca: {
    nl: { title: "Nooit meer een reservering missen of planning handmatig maken.", subtitle: "Wij automatiseren reserveringen, planning en gastopvolging volledig." },
    en: { title: "Never miss a booking or build a schedule manually again.", subtitle: "We fully automate your reservations, scheduling and guest follow-up." },
    fr: { title: "Ne manquez plus jamais une réservation ou un planning à faire manuellement.", subtitle: "Nous automatisons vos réservations, plannings et suivi clients." },
    de: { title: "Nie wieder eine Reservierung verpassen oder einen Plan manuell erstellen.", subtitle: "Wir automatisieren Reservierungen, Planung und Gäste-Follow-up vollständig." },
  },
};

/** Problem-section rows per sector (NL — used across languages per current spec). */
export const SECTOR_PROBLEM_ROWS: Record<SectorKey, { task: string; time: string }[]> = {
  vastgoed: [
    { task: "Afspraken inplannen", time: "30-45 min/dag" },
    { task: "Woningbeschrijvingen schrijven", time: "30-45 min/pand" },
    { task: "E-mails en leads beantwoorden", time: "Tot 1,5u/dag" },
    { task: "Leads manueel opvolgen", time: "Tot 1u/dag" },
    { task: "Facturen opmaken", time: "Tot 2u/maand" },
    { task: "Rapporten samenstellen", time: "30-45 min/week" },
  ],
  tandartsen: [
    { task: "Afspraken inplannen", time: "Tot 1u/dag" },
    { task: "No-shows opvolgen", time: "30-45 min/dag" },
    { task: "Herinneringen sturen", time: "30 min/dag" },
    { task: "Patiëntvragen beantwoorden", time: "30-45 min/dag" },
    { task: "Facturen opmaken", time: "Tot 1u/dag" },
    { task: "Wachtlijst beheren", time: "30 min/dag" },
  ],
  kinesisten: [
    { task: "Sessies inplannen", time: "Tot 1u/dag" },
    { task: "Behandelverslagen typen", time: "Gemiddeld 1-2u/dag" },
    { task: "Herinneringen sturen", time: "30 min/dag" },
    { task: "Patiëntdossiers bijhouden", time: "30-45 min/dag" },
    { task: "Facturen opmaken", time: "Tot 1u/dag" },
    { task: "Reeksen manueel inplannen", time: "30 min/patiënt" },
  ],
  accountants: [
    { task: "Facturen manueel invoeren", time: "Gemiddeld 2-3u/dag" },
    { task: "Facturen splitsen en verwerken", time: "Tot 1u/dag" },
    { task: "Deadlines opvolgen bij klanten", time: "Tot 1u/dag" },
    { task: "Klantvragen beantwoorden", time: "Tot 1u/dag" },
    { task: "Rapporten samenstellen", time: "Tot 2u/week" },
    { task: "BTW-aangifte voorbereiden", time: "Tot 3u/kwartaal" },
  ],
  architecten: [
    { task: "Offertes handmatig opmaken", time: "Gemiddeld 2-3u/offerte" },
    { task: "Projectupdates communiceren", time: "30-45 min/dag" },
    { task: "Vergaderingen inplannen", time: "30 min/dag" },
    { task: "Facturen per fase opmaken", time: "Tot 1u/factuur" },
    { task: "Projectdossiers bijhouden", time: "Tot 1u/dag" },
    { task: "Vergunningen opvolgen", time: "30 min/dag" },
  ],
  garages: [
    { task: "Offertes handmatig opmaken", time: "30-45 min/offerte" },
    { task: "Klanten informeren over status", time: "30 min/dag" },
    { task: "Afspraken inplannen", time: "30-45 min/dag" },
    { task: "Onderhoud opvolgen", time: "Tot 1u/week" },
    { task: "Facturen opmaken", time: "Tot 1u/dag" },
    { task: "APK-vervaldatums bijhouden", time: "Tot 1u/week" },
  ],
  horeca: [
    { task: "Reserveringen verwerken", time: "Tot 1u/dag" },
    { task: "No-shows opvolgen", time: "30 min/dag" },
    { task: "Personeelsplanning maken", time: "Gemiddeld 2u/week" },
    { task: "Reviews monitoren en beantwoorden", time: "30-45 min/dag" },
    { task: "Loyalty acties uitvoeren", time: "Tot 1u/week" },
    { task: "Omzetoverzichten samenstellen", time: "Gemiddeld 2u/week" },
  ],
};

// Translation key overrides per sector. Empty/missing keys → fall back to language dict.
export type Override = Record<string, string>;

export const SECTOR_OVERRIDES: Record<SectorKey, Override> = {
  vastgoed: {
    "hero.title": "Stop met uren te verliezen aan afspraken en administratie.",
    "hero.subtitle": "Wij automatiseren uw volledige makelaarskantoor — van bezichtigingsaanvragen tot facturen. Volledig op de achtergrond. Zodat u kunt doen wat u het beste doet:",
    "hero.stat2.v": "3u 15",
    "pb.t1": "Afspraken inplannen", "pb.d1": "45 min/dag kwijt aan bezichtigingen",
    "pb.t2": "Woningbeschrijvingen", "pb.d2": "45 min per pand voor een goede tekst",
    "pb.t3": "E-mails & leads", "pb.d3": "1,5u/dag aan vragen van kopers",
    "pb.t4": "Leads opvolgen", "pb.d4": "1u/dag aan manuele opvolging",
    "pb.t5": "Facturatie", "pb.d5": "2u/maand aan facturen en documenten",
    "pb.t6": "Rapportage", "pb.d6": "45 min/week om prestaties samen te stellen",
    "faq.q4": "Werkt het systeem met Immoweb en mijn CRM?",
    "faq.a4": "Ja. Ons systeem koppelt aan Immoweb, Whise, Omnicasa en alle gangbare CRM-systemen.",
  },
  tandartsen: {
    "hero.title": "Elimineer no-shows en win 4 uur per dag terug.",
    "hero.subtitle": "Wij automatiseren uw afsprakenbeheer, herinneringen en patiëntcommunicatie volledig. Zodat u zich kan focussen op:",
    "hero.subtitle.bold": "",
    "hero.stat2.v": "3u 45",
    "pb.t1": "Afspraken inplannen", "pb.d1": "1u/dag aan telefonische afspraken",
    "pb.t2": "No-shows", "pb.d2": "Lege stoel = €200-300 verlies per uur",
    "pb.t3": "Herinneringen sturen", "pb.d3": "30 min/dag aan manuele herinneringen",
    "pb.t4": "Patiëntvragen", "pb.d4": "45 min/dag aan herhalende vragen",
    "pb.t5": "Facturatie", "pb.d5": "1u/dag aan facturen en attesten",
    "pb.t6": "Wachtlijst beheren", "pb.d6": "30 min/dag aan wachtlijst bijhouden",
    "faq.q4": "Werkt het systeem met mijn bestaande agenda?",
    "faq.a4": "Ja. Ons systeem koppelt aan uw agenda, of u nu Doctena, Acuity of een eigen systeem gebruikt.",
  },
  kinesisten: {
    "hero.title": "Meer tijd voor patiënten. Minder tijd aan administratie.",
    "hero.subtitle": "Van sessies inplannen tot behandelverslagen via spraak — volledig geautomatiseerd. Zodat u zich kan focussen op:",
    "hero.subtitle.bold": "",
    "hero.stat2.v": "4u 15",
    "pb.t1": "Sessies inplannen", "pb.d1": "1u/dag aan afspraken via telefoon",
    "pb.t2": "Behandelverslagen", "pb.d2": "1,5u/dag aan verslagen typen",
    "pb.t3": "Herinneringen", "pb.d3": "30 min/dag aan herinneringen sturen",
    "pb.t4": "Patiëntdossiers", "pb.d4": "45 min/dag aan dossiers bijhouden",
    "pb.t5": "Facturatie", "pb.d5": "1u/dag aan facturen en attesten",
    "pb.t6": "Reeksen plannen", "pb.d6": "30 min per nieuwe patiënt",
    "faq.q4": "Werkt het systeem met mijn patiëntendossiers?",
    "faq.a4": "Ja. Ons systeem koppelt aan uw bestaande software en slaat verslagen automatisch op in het juiste dossier.",
  },
  accountants: {
    "hero.title": "Verwerk facturen 75% sneller. Automatisch.",
    "hero.subtitle": "Wij automatiseren uw factuurverwerking, klantcommunicatie en deadlineopvolging. Zodat u zich kan focussen op:",
    "hero.subtitle.bold": "",
    "hero.stat2.v": "4u+",
    "pb.t1": "Facturen verwerken", "pb.d1": "2-3u/dag aan manuele factuurinvoer",
    "pb.t2": "Facturen splitsen", "pb.d2": "1u/dag aan foutief aangeleverde bestanden",
    "pb.t3": "Deadlines opvolgen", "pb.d3": "1u/dag aan klanten herinneren",
    "pb.t4": "Klantvragen", "pb.d4": "1u/dag aan herhalende vragen",
    "pb.t5": "Rapporten maken", "pb.d5": "2u/week aan overzichten samenstellen",
    "pb.t6": "BTW-aangifte", "pb.d6": "3u/kwartaal aan BTW voorbereiden",
    "faq.q4": "Werkt het systeem met Exact, Yuki of Billit?",
    "faq.a4": "Ja. Ons systeem koppelt rechtstreeks aan Exact Online, Yuki, Billit en alle gangbare Belgische boekhoudpakketten.",
  },
  architecten: {
    "hero.title": "Offertes in 5 minuten. Projectcommunicatie automatisch.",
    "hero.subtitle": "Wij automatiseren uw administratie zodat u zich focust op ontwerp en klanten. Volledig op de achtergrond. Zodat u kan doen wat u het beste doet:",
    "hero.subtitle.bold": "",
    "hero.stat2.v": "3u+",
    "pb.t1": "Offertes opmaken", "pb.d1": "2-3u per offerte handmatig",
    "pb.t2": "Projectcommunicatie", "pb.d2": "45 min/dag aan updates sturen",
    "pb.t3": "Vergaderingen plannen", "pb.d3": "30 min/dag aan agenda's afstemmen",
    "pb.t4": "Facturatie per fase", "pb.d4": "1u per factuur handmatig opmaken",
    "pb.t5": "Dossiers bijhouden", "pb.d5": "1u/dag aan projectdossiers updaten",
    "pb.t6": "Vergunningen opvolgen", "pb.d6": "30 min/dag aan statussen controleren",
    "faq.q4": "Werkt het systeem met mijn projectsoftware?",
    "faq.a4": "Ja. Ons systeem koppelt aan uw bestaande tools en synchroniseert automatisch alle projectdata.",
  },
  garages: {
    "hero.title": "Offertes in 5 minuten. Klanten automatisch op de hoogte.",
    "hero.subtitle": "Van wagenstatus tot APK-herinneringen — uw garage op automatische piloot. Zodat u zich kan focussen op:",
    "hero.subtitle.bold": "",
    "hero.stat2.v": "3u+",
    "pb.t1": "Offertes opmaken", "pb.d1": "45 min per offerte handmatig",
    "pb.t2": "Klant informeren", "pb.d2": "30 min/dag aan statusupdates",
    "pb.t3": "Afspraken plannen", "pb.d3": "45 min/dag aan werkplaatsplanning",
    "pb.t4": "Onderhoud opvolgen", "pb.d4": "1u/week aan onderhoudsherinneringen",
    "pb.t5": "Facturatie", "pb.d5": "1u/dag aan facturen opmaken",
    "pb.t6": "APK herinneringen", "pb.d6": "1u/week aan vervaldatums bijhouden",
    "faq.q4": "Werkt het systeem met mijn garagesoftware?",
    "faq.a4": "Ja. Ons systeem koppelt aan gangbare garagesoftware en synchroniseert klantdata en voertuighistoriek.",
  },
  horeca: {
    "hero.title": "Nooit meer een reservering missen. Nooit meer een planning handmatig.",
    "hero.subtitle": "Wij automatiseren reserveringen, planning en klantopvolging volledig. Zodat u zich kan focussen op:",
    "hero.subtitle.bold": "",
    "hero.stat2.v": "2u 20",
    "pb.t1": "Reserveringen", "pb.d1": "1u/dag aan telefonische reserveringen",
    "pb.t2": "No-shows", "pb.d2": "Lege tafel = directe omzetderving",
    "pb.t3": "Personeelsplanning", "pb.d3": "2u/week aan roosters handmatig",
    "pb.t4": "Reviews opvolgen", "pb.d4": "45 min/dag aan reviews monitoren",
    "pb.t5": "Klantopvolging", "pb.d5": "1u/week aan loyalty acties",
    "pb.t6": "Rapportage", "pb.d6": "2u/week aan omzetoverzichten",
    "faq.q4": "Werkt het systeem met mijn reservatieplatform?",
    "faq.a4": "Ja. Ons systeem koppelt aan The Fork, OpenTable en andere reservatieplatformen.",
  },
};

// Pricing feature lists per sector — localized in EN/NL/FR/DE
export type PricingFeatures = Record<"starter" | "pro" | "allin" | "agent", string[]>;
export type LocalizedPricing = Record<Lang, PricingFeatures>;

const SECTOR_PRICING_RAW: Record<SectorKey, LocalizedPricing> = {
  vastgoed: {
    en: {
      starter: ["WhatsApp chatbot answers FAQs 24/7", "Viewings automatically scheduled via WhatsApp", "Confirmation + address + parking info auto-sent", "Reminder 48h and 24h before every viewing", "Cancellation auto-processed and slot re-opened", "New leads automatically added to your CRM", "Monthly overview report automatically in your inbox"],
      pro: ["Everything in Starter, plus:", "AI writes a full property description within minutes", "Description available in NL, FR and EN", "Automatic follow-up after 48h without lead response", "Leads automatically categorised by interest in your CRM", "Social media post per new property automatically generated", "Weekly report with overview of leads and viewings", "Priority support within 4 working hours"],
      allin: ["Everything in Pro, plus:", "Invoice auto-generated after every completed sale or rental", "Commission automatically calculated per file", "Costs auto-categorised for your accounting", "Monthly overview ready to send to your accountant", "Sales and rental contracts auto-drafted via template", "Documents per file automatically organised and archived", "Personal account manager — 1 dedicated point of contact"],
      agent: ["Everything in All-in, plus:", "Own AI assistant trained on the tone and workflow of your office", "Emails automatically read, categorised and answered", "Full calendar management — AI plans, shifts and confirms appointments", "Sentiment of client messages automatically recognised — urgent matters first", "Weekly AI overview: which leads are most active", "Daily report every morning at 7am in your inbox", "Dedicated success team actively thinking about optimisations"],
    },
    nl: {
      starter: ["WhatsApp chatbot beantwoordt veelgestelde vragen 24/7", "Bezichtigingen automatisch inplannen via WhatsApp", "Bevestiging + adres + parkeerinfo automatisch verstuurd", "Herinnering 48u en 24u voor elke bezichtiging", "Annulatie automatisch verwerkt en slot opnieuw vrijgegeven", "Nieuwe leads automatisch toegevoegd aan uw CRM", "Maandelijks overzichtsrapport automatisch in uw inbox"],
      pro: ["Alles van Starter, plus:", "AI schrijft een volledige woningbeschrijving binnen enkele minuten", "Beschrijving beschikbaar in NL, FR en EN", "Automatische follow-up na 48u zonder reactie van een lead", "Leads automatisch gecategoriseerd op interesse in uw CRM", "Sociale media post per nieuw pand automatisch gegenereerd", "Wekelijks rapport met overzicht van leads en bezichtigingen", "Prioriteit support binnen 4 werkuren"],
      allin: ["Alles van Pro, plus:", "Factuur automatisch aangemaakt na elke afgeronde verkoop of verhuur", "Commissieberekening automatisch verwerkt per dossier", "Kosten automatisch gecategoriseerd voor uw boekhouding", "Maandoverzicht volledig klaar om door te sturen naar uw boekhouder", "Verkoop- en verhuurcontracten automatisch opgesteld via template", "Documenten per dossier automatisch geordend en gearchiveerd", "Persoonlijke accountmanager — 1 vast aanspreekpunt"],
      agent: ["Alles van All-in, plus:", "Eigen AI-assistent getraind op de toon en werking van uw kantoor", "E-mails automatisch gelezen, gecategoriseerd en beantwoord", "Volledig agendabeheer — AI plant, verschuift en bevestigt afspraken", "Sentiment van klantberichten automatisch herkend — urgente zaken eerst", "Wekelijks AI-overzicht: welke leads het meest actief zijn", "Dagelijks rapport elke ochtend om 7u in uw inbox", "Dedicated success team dat actief meedenkt over optimalisaties"],
    },
    fr: {
      starter: ["Rendez-vous planifiés automatiquement via WhatsApp", "Confirmation automatique + adresse à l'acheteur", "Rappel 24h avant chaque visite", "Replanification automatique en cas d'annulation", "Rapport mensuel d'aperçu"],
      pro: ["Tout du Starter, plus :", "L'IA rédige des descriptions de biens en 30 secondes", "Leads suivis automatiquement après 48h", "Rapport mensuel complet avec leads et conversion", "Support prioritaire sous 4h"],
      allin: ["Tout du Pro, plus :", "Factures générées automatiquement après chaque vente", "Coûts triés automatiquement par catégorie", "Aperçu mensuel prêt pour votre comptable", "Déclaration TVA suivie automatiquement"],
      agent: ["Tout du All-in, plus :", "E-mails lus et répondus automatiquement", "Gestion d'agenda complète sans intervention", "Rapport quotidien chaque matin à 7h", "Leads notés automatiquement selon l'intérêt"],
    },
    de: {
      starter: ["Termine automatisch via WhatsApp planen", "Automatische Bestätigung + Adresse an Käufer", "Erinnerung 24h vor jeder Besichtigung", "Automatische Umplanung bei Absage", "Monatlicher Übersichtsbericht"],
      pro: ["Alles aus Starter, plus:", "KI schreibt Objektbeschreibungen in 30 Sekunden", "Leads automatisch nach 48h nachverfolgt", "Vollständiger Monatsbericht mit Leads und Konversion", "Priority-Support innerhalb 4h"],
      allin: ["Alles aus Pro, plus:", "Rechnungen automatisch nach jedem Abschluss erstellt", "Kosten automatisch nach Kategorie sortiert", "Monatsübersicht bereit für Ihren Buchhalter", "Umsatzsteuererklärung automatisch verfolgt"],
      agent: ["Alles aus All-in, plus:", "E-Mails automatisch gelesen und beantwortet", "Vollständige Kalenderverwaltung ohne Ihr Zutun", "Täglicher Bericht jeden Morgen um 7 Uhr", "Leads automatisch nach Interesse bewertet"],
    },
  },
  tandartsen: {
    en: {
      starter: ["Appointments auto-scheduled via WhatsApp 24/7", "Confirmation automatically sent with practice info", "Reminder 72h, 48h and 24h before every appointment", "No-show automatically followed up with personal message", "Cancellation auto-processed and slot re-opened", "Follow-up appointment automatically suggested after treatment", "Monthly overview report automatically in your inbox"],
      pro: ["Everything in Starter, plus:", "Intake form automatically sent before first visit", "Answers automatically processed in patient file", "Post-care instructions automatically sent after treatment", "Satisfaction survey automatically sent after every appointment", "Google Review invitation automatically sent to satisfied patients", "FAQs automatically answered via AI", "Weekly report with occupancy rate and no-show stats", "Priority support within 4 working hours"],
      allin: ["Everything in Pro, plus:", "Invoice auto-generated after every treatment", "Payment reminder automatically sent for outstanding amount", "Patient file automatically kept up to date", "Monthly overview ready to send to your accountant", "Documents per patient automatically organised and archived", "Personal account manager — 1 dedicated point of contact"],
      agent: ["Everything in All-in, plus:", "Own AI assistant trained on the tone and workflow of your practice", "Treatment notes automatically converted from speech to text", "Patient file automatically updated after every consultation", "Sentiment of patient messages automatically recognised", "Medication and check-up reminders automatically sent", "Daily report every morning at 7am in your inbox", "Dedicated success team actively thinking about optimisations"],
    },
    nl: {
      starter: ["Afspraken automatisch inplannen via WhatsApp 24/7", "Bevestiging automatisch verstuurd met praktijkinformatie", "Herinnering 72u, 48u en 24u voor elke afspraak", "No-show automatisch opgevolgd met persoonlijk bericht", "Annulatie automatisch verwerkt en slot opnieuw vrijgegeven", "Controle-afspraak automatisch voorgesteld na behandeling", "Maandelijks overzichtsrapport automatisch in uw inbox"],
      pro: ["Alles van Starter, plus:", "Intakeformulier automatisch verstuurd voor het eerste bezoek", "Antwoorden automatisch verwerkt in het patiëntdossier", "Nazorginstructies automatisch verstuurd na een behandeling", "Tevredenheidsenquête automatisch verstuurd na elke afspraak", "Google Review-uitnodiging automatisch verstuurd aan tevreden patiënten", "Veelgestelde vragen automatisch beantwoord via AI", "Wekelijks rapport met bezettingsgraad en no-show cijfers", "Prioriteit support binnen 4 werkuren"],
      allin: ["Alles van Pro, plus:", "Factuur automatisch aangemaakt na elke behandeling", "Betalingsherinnering automatisch verstuurd bij openstaand bedrag", "Patiëntendossier automatisch up-to-date gehouden", "Maandoverzicht volledig klaar om door te sturen naar uw boekhouder", "Documenten per patiënt automatisch geordend en gearchiveerd", "Persoonlijke accountmanager — 1 vast aanspreekpunt"],
      agent: ["Alles van All-in, plus:", "Eigen AI-assistent getraind op de toon en werking van uw praktijk", "Behandelnotities automatisch omgezet van spraak naar tekst", "Patiëntdossier automatisch aangevuld na elk gesprek", "Sentiment van patiëntberichten automatisch herkend", "Medicatie- en controleherinneringen automatisch verstuurd", "Dagelijks rapport elke ochtend om 7u in uw inbox", "Dedicated success team dat actief meedenkt over optimalisaties"],
    },
    fr: {
      starter: ["Rendez-vous planifiés automatiquement via WhatsApp", "Confirmation envoyée automatiquement au patient", "Rappel 48h avant chaque rendez-vous", "Replanification automatique en cas d'annulation", "Liste d'attente gérée automatiquement"],
      pro: ["Tout du Starter, plus :", "Questions des patients répondues automatiquement", "Enquête de satisfaction après chaque traitement", "Rapport mensuel complet avec stats no-show", "Support prioritaire sous 4h"],
      allin: ["Tout du Pro, plus :", "Factures générées automatiquement après traitement", "Attestations mutuelle traitées automatiquement", "Aperçu mensuel prêt pour votre comptable", "Déclaration TVA suivie automatiquement"],
      agent: ["Tout du All-in, plus :", "E-mails lus et répondus automatiquement", "Gestion d'agenda complète sans intervention", "Rapport quotidien chaque matin à 7h", "Patients priorisés automatiquement"],
    },
    de: {
      starter: ["Termine automatisch via WhatsApp planen", "Bestätigung automatisch an Patient gesendet", "Erinnerung 48h vor jedem Termin", "Automatische Umplanung bei Absage", "Warteliste automatisch verwaltet"],
      pro: ["Alles aus Starter, plus:", "Patientenfragen automatisch beantwortet", "Zufriedenheitsumfrage nach jeder Behandlung", "Vollständiger Monatsbericht mit No-Show-Zahlen", "Priority-Support innerhalb 4h"],
      allin: ["Alles aus Pro, plus:", "Rechnungen automatisch nach Behandlung erstellt", "Krankenkassen-Bescheinigungen automatisch verarbeitet", "Monatsübersicht bereit für Ihren Buchhalter", "Umsatzsteuererklärung automatisch verfolgt"],
      agent: ["Alles aus All-in, plus:", "E-Mails automatisch gelesen und beantwortet", "Vollständige Kalenderverwaltung ohne Ihr Zutun", "Täglicher Bericht jeden Morgen um 7 Uhr", "Patienten automatisch nach Priorität bewertet"],
    },
  },
  kinesisten: {
    en: {
      starter: ["Sessions auto-scheduled via WhatsApp 24/7", "Series of multiple sessions auto-planned after first appointment", "Confirmation and reminder automatically sent for every session", "No-show automatically followed up with personal message", "Cancellation auto-processed and slot re-opened", "Home exercises automatically sent as PDF after session", "Monthly overview report automatically in your inbox"],
      pro: ["Everything in Starter, plus:", "Progress per patient automatically tracked per session", "Daily exercise reminder automatically sent to patients", "Satisfaction survey automatically sent after a series of sessions", "Progress overview automatically compiled per patient", "Google Review invitation automatically sent", "Weekly report with overview of sessions and progress", "Priority support within 4 working hours"],
      allin: ["Everything in Pro, plus:", "Invoice auto-generated per session or per series", "Payment reminder automatically sent for outstanding amount", "Patient file automatically kept up to date", "Monthly overview ready to send to your accountant", "Documents per patient automatically organised and archived", "Personal account manager — 1 dedicated point of contact"],
      agent: ["Everything in All-in, plus:", "Own AI assistant trained on the tone and workflow of your practice", "Treatment notes automatically converted from speech to text", "Patient file automatically updated after every session", "Exercise schedules automatically adjusted based on progress", "Sentiment of patient messages automatically recognised", "Daily report every morning at 7am in your inbox", "Dedicated success team actively thinking about optimisations"],
    },
    nl: {
      starter: ["Sessies automatisch inplannen via WhatsApp 24/7", "Reeks van meerdere sessies automatisch ingepland na eerste afspraak", "Bevestiging en herinnering automatisch verstuurd voor elke sessie", "No-show automatisch opgevolgd met persoonlijk bericht", "Annulatie automatisch verwerkt en slot opnieuw vrijgegeven", "Thuisoefeningen automatisch als PDF verstuurd na de sessie", "Maandelijks overzichtsrapport automatisch in uw inbox"],
      pro: ["Alles van Starter, plus:", "Voortgang per patiënt automatisch bijgehouden per sessie", "Dagelijkse oefenherinnering automatisch verstuurd aan patiënten", "Tevredenheidsenquête automatisch verstuurd na een sessiereeks", "Voortgangsoverzicht automatisch opgesteld per patiënt", "Google Review-uitnodiging automatisch verstuurd", "Wekelijks rapport met overzicht van sessies en voortgang", "Prioriteit support binnen 4 werkuren"],
      allin: ["Alles van Pro, plus:", "Factuur automatisch aangemaakt per sessie of per reeks", "Betalingsherinnering automatisch verstuurd bij openstaand bedrag", "Patiëntendossier automatisch up-to-date gehouden", "Maandoverzicht volledig klaar om door te sturen naar uw boekhouder", "Documenten per patiënt automatisch geordend en gearchiveerd", "Persoonlijke accountmanager — 1 vast aanspreekpunt"],
      agent: ["Alles van All-in, plus:", "Eigen AI-assistent getraind op de toon en werking van uw praktijk", "Behandelnotities automatisch omgezet van spraak naar tekst", "Patiëntdossier automatisch aangevuld na elke sessie", "Oefenschema's automatisch aangepast op basis van voortgang", "Sentiment van patiëntberichten automatisch herkend", "Dagelijks rapport elke ochtend om 7u in uw inbox", "Dedicated success team dat actief meedenkt over optimalisaties"],
    },
    fr: {
      starter: ["Séances planifiées automatiquement via WhatsApp", "Confirmation envoyée automatiquement au patient", "Rappel 24h avant chaque séance", "Série de séances planifiée automatiquement", "Rapport mensuel d'aperçu"],
      pro: ["Tout du Starter, plus :", "Rapports de traitement par dictée vocale", "Progression du patient suivie automatiquement", "Rapport mensuel complet avec stats de traitement", "Support prioritaire sous 4h"],
      allin: ["Tout du Pro, plus :", "Factures générées automatiquement par séance", "Attestations mutuelle traitées automatiquement", "Aperçu mensuel prêt pour votre comptable", "Déclaration TVA suivie automatiquement"],
      agent: ["Tout du All-in, plus :", "E-mails lus et répondus automatiquement", "Dossier patient complet tenu automatiquement", "Rapport quotidien chaque matin à 7h", "Suivi patient entièrement automatisé"],
    },
    de: {
      starter: ["Sitzungen automatisch via WhatsApp planen", "Bestätigung automatisch an Patient gesendet", "Erinnerung 24h vor jeder Sitzung", "Sitzungsserien automatisch geplant", "Monatlicher Übersichtsbericht"],
      pro: ["Alles aus Starter, plus:", "Behandlungsberichte per Spracheingabe", "Patientenfortschritt automatisch verfolgt", "Vollständiger Monatsbericht mit Behandlungszahlen", "Priority-Support innerhalb 4h"],
      allin: ["Alles aus Pro, plus:", "Rechnungen automatisch pro Sitzung erstellt", "Krankenkassen-Bescheinigungen automatisch verarbeitet", "Monatsübersicht bereit für Ihren Buchhalter", "Umsatzsteuererklärung automatisch verfolgt"],
      agent: ["Alles aus All-in, plus:", "E-Mails automatisch gelesen und beantwortet", "Vollständige Patientenakte automatisch gepflegt", "Täglicher Bericht jeden Morgen um 7 Uhr", "Patienten-Follow-up vollständig automatisiert"],
    },
  },
  accountants: {
    en: {
      starter: ["Invoices automatically received and processed via OCR", "Invoice data automatically prepared for your accounting software", "Bank statements automatically matched with invoices", "Payment reminders automatically sent to clients", "Frequent client questions automatically answered via AI", "Deadlines per client automatically tracked", "Monthly overview report automatically in your inbox"],
      pro: ["Everything in Starter, plus:", "Multi-document invoices automatically split and recognised", "Duplicate invoices automatically detected and flagged", "Reminder automatically sent for approaching deadlines", "Missing documents automatically requested from client", "Client automatically kept informed of file status", "New client file automatically created and structured", "Weekly report per client with outstanding actions", "Priority support within 4 working hours"],
      allin: ["Everything in Pro, plus:", "Preliminary VAT return figures automatically prepared", "Preliminary annual accounts figures automatically prepared", "Invoicing to your own clients automatically processed", "Time tracking automatically converted to invoicing", "Monthly overview fully ready for final check", "Documents per file automatically organised and archived", "Personal account manager — 1 dedicated point of contact"],
      agent: ["Everything in All-in, plus:", "Own AI assistant trained on the workflow of your office", "AI automatically signals unusual deviations in figures", "Cash flow overview automatically compiled per client", "Comparison with previous periods automatically compiled", "Emails automatically read, categorised and answered", "Daily report every morning at 7am in your inbox", "Dedicated success team actively thinking about optimisations"],
    },
    nl: {
      starter: ["Facturen automatisch ontvangen en verwerkt via OCR", "Factuurgegevens automatisch klaargezet voor uw boekhoudpakket", "Bankafschriften automatisch gematcht met facturen", "Betalingsherinneringen automatisch verstuurd aan klanten", "Veelgestelde klantvragen automatisch beantwoord via AI", "Deadlines per klant automatisch bijgehouden", "Maandelijks overzichtsrapport automatisch in uw inbox"],
      pro: ["Alles van Starter, plus:", "Facturen met meerdere documenten automatisch gesplitst en herkend", "Dubbele facturen automatisch gedetecteerd en gemeld", "Herinnering automatisch verstuurd bij naderende deadline", "Ontbrekende documenten automatisch opgevraagd bij de klant", "Klant automatisch op de hoogte gehouden van dossierstatus", "Nieuw klantdossier automatisch aangemaakt en gestructureerd", "Wekelijks rapport per klant met openstaande acties", "Prioriteit support binnen 4 werkuren"],
      allin: ["Alles van Pro, plus:", "Voorbereidende cijfers voor BTW-aangifte automatisch klaargezet", "Voorbereidende cijfers voor jaarrekening automatisch klaargezet", "Facturatie aan uw eigen klanten automatisch verwerkt", "Urenregistratie automatisch verwerkt naar facturatie", "Maandoverzicht volledig klaar voor eindcontrole", "Documenten per dossier automatisch geordend en gearchiveerd", "Persoonlijke accountmanager — 1 vast aanspreekpunt"],
      agent: ["Alles van All-in, plus:", "Eigen AI-assistent getraind op de werking van uw kantoor", "AI signaleert automatisch ongebruikelijke afwijkingen in cijfers", "Cashflow-overzicht automatisch opgesteld per klant", "Vergelijking met vorige periodes automatisch opgesteld", "E-mails automatisch gelezen, gecategoriseerd en beantwoord", "Dagelijks rapport elke ochtend om 7u in uw inbox", "Dedicated success team dat actief meedenkt over optimalisaties"],
    },
    fr: {
      starter: ["Factures traitées automatiquement via OCR", "Relevés bancaires rapprochés automatiquement", "Questions des clients répondues automatiquement", "Rappels de paiement envoyés automatiquement", "Rapport mensuel d'aperçu"],
      pro: ["Tout du Starter, plus :", "Échéances surveillées automatiquement par client", "Dossiers clients tenus automatiquement", "Rapport mensuel complet par client", "Support prioritaire sous 4h"],
      allin: ["Tout du Pro, plus :", "Déclaration TVA préparée automatiquement", "Factures séparées et catégorisées automatiquement", "Aperçu mensuel prêt à être déposé", "Suivi de conformité automatique"],
      agent: ["Tout du All-in, plus :", "E-mails lus et répondus automatiquement", "Communication client complète automatisée", "Rapport quotidien chaque matin à 7h", "Détection de fraude signalée automatiquement"],
    },
    de: {
      starter: ["Rechnungen automatisch via OCR verarbeitet", "Kontoauszüge automatisch abgeglichen", "Kundenfragen automatisch beantwortet", "Zahlungserinnerungen automatisch versendet", "Monatlicher Übersichtsbericht"],
      pro: ["Alles aus Starter, plus:", "Fristen automatisch pro Kunde überwacht", "Kundenakten automatisch gepflegt", "Vollständiger Monatsbericht pro Kunde", "Priority-Support innerhalb 4h"],
      allin: ["Alles aus Pro, plus:", "Umsatzsteuererklärung automatisch vorbereitet", "Rechnungen automatisch aufgeteilt und kategorisiert", "Monatsübersicht zur Einreichung bereit", "Compliance-Monitoring automatisch"],
      agent: ["Alles aus All-in, plus:", "E-Mails automatisch gelesen und beantwortet", "Vollständige Kundenkommunikation automatisiert", "Täglicher Bericht jeden Morgen um 7 Uhr", "Betrugserkennung automatisch gemeldet"],
    },
  },
  architecten: {
    en: {
      starter: ["Appointments auto-scheduled via WhatsApp", "Confirmations sent automatically", "Project updates auto-sent to clients", "Meetings automatically planned", "Monthly overview report"],
      pro: ["Everything in Starter, plus:", "Quotes auto-generated via template", "Files automatically maintained per project", "Full monthly report per project", "Priority support within 4h"],
      allin: ["Everything in Pro, plus:", "Invoices auto-generated per phase", "Costs auto-categorized per project", "Monthly summary ready for your accountant", "Permit status automatically tracked"],
      agent: ["Everything in All-in, plus:", "Emails automatically read and answered", "Full project communication automated", "Daily report every morning at 7am", "Clients auto-informed on every update"],
    },
    nl: {
      starter: ["Afspraken automatisch inplannen via WhatsApp", "Vergaderingen automatisch ingepland en bevestigd", "Projectupdates automatisch verstuurd naar klanten", "Documenten per project automatisch geordend en gearchiveerd", "Herinneringen voor lopende deadlines automatisch verstuurd", "Maandelijks overzichtsrapport automatisch in uw inbox"],
      pro: ["Alles van Starter, plus:", "Offerte automatisch opgesteld op basis van uw eigen template", "Offerte automatisch verstuurd en opvolging automatisch herinnerd", "Goedkeuring van de klant automatisch verwerkt en gelogd", "Notulen van vergaderingen automatisch uitgewerkt via AI", "Meerwerken automatisch genoteerd en gecommuniceerd naar de klant", "Wekelijks rapport per project met status en acties", "Prioriteit support binnen 4 werkuren"],
      allin: ["Alles van Pro, plus:", "Factuur automatisch aangemaakt per projectfase", "Urenregistratie automatisch verwerkt naar facturatie", "Kosten per project automatisch bijgehouden", "Leveranciersfacturen automatisch verwerkt", "Maandoverzicht volledig klaar om door te sturen naar uw boekhouder", "Persoonlijke accountmanager — 1 vast aanspreekpunt"],
      agent: ["Alles van All-in, plus:", "Eigen AI-assistent getraind op de werking van uw kantoor", "AI helpt bij het opstellen van projectbeschrijvingen en teksten", "E-mails automatisch gelezen, gecategoriseerd en beantwoord", "Budgetoverzicht per project automatisch up-to-date gehouden", "Vergelijking met eerdere gelijkaardige projecten automatisch opgesteld", "Dagelijks rapport elke ochtend om 7u in uw inbox", "Dedicated success team dat actief meedenkt over optimalisaties"],
    },
    fr: {
      starter: ["Rendez-vous planifiés automatiquement via WhatsApp", "Confirmations envoyées automatiquement", "Mises à jour projet envoyées automatiquement aux clients", "Réunions planifiées automatiquement", "Rapport mensuel d'aperçu"],
      pro: ["Tout du Starter, plus :", "Devis générés automatiquement via modèle", "Dossiers tenus automatiquement par projet", "Rapport mensuel complet par projet", "Support prioritaire sous 4h"],
      allin: ["Tout du Pro, plus :", "Factures générées automatiquement par phase", "Coûts triés automatiquement par projet", "Aperçu mensuel prêt pour votre comptable", "Statut des permis suivi automatiquement"],
      agent: ["Tout du All-in, plus :", "E-mails lus et répondus automatiquement", "Communication projet complète automatisée", "Rapport quotidien chaque matin à 7h", "Clients informés automatiquement à chaque mise à jour"],
    },
    de: {
      starter: ["Termine automatisch via WhatsApp planen", "Bestätigungen automatisch versendet", "Projekt-Updates automatisch an Kunden gesendet", "Besprechungen automatisch geplant", "Monatlicher Übersichtsbericht"],
      pro: ["Alles aus Starter, plus:", "Angebote automatisch per Vorlage erstellt", "Akten automatisch pro Projekt gepflegt", "Vollständiger Monatsbericht pro Projekt", "Priority-Support innerhalb 4h"],
      allin: ["Alles aus Pro, plus:", "Rechnungen automatisch pro Phase erstellt", "Kosten automatisch pro Projekt sortiert", "Monatsübersicht bereit für Ihren Buchhalter", "Genehmigungsstatus automatisch verfolgt"],
      agent: ["Alles aus All-in, plus:", "E-Mails automatisch gelesen und beantwortet", "Vollständige Projektkommunikation automatisiert", "Täglicher Bericht jeden Morgen um 7 Uhr", "Kunden automatisch bei jedem Update informiert"],
    },
  },
  garages: {
    en: {
      starter: ["Appointments auto-scheduled via WhatsApp", "Client auto-notified on arrival", "Client auto-notified when car is ready", "Maintenance reminder 1 year later automatic", "Monthly overview report"],
      pro: ["Everything in Starter, plus:", "Quotes auto-generated via WhatsApp", "MOT reminders automatically sent", "Full monthly report with revenue stats", "Priority support within 4h"],
      allin: ["Everything in Pro, plus:", "Invoices auto-generated after repair", "Costs auto-categorized by type", "Monthly summary ready for your accountant", "VAT return automatically tracked"],
      agent: ["Everything in All-in, plus:", "Emails automatically read and answered", "Full client communication automated", "Daily report every morning at 7am", "Clients auto-informed at every step"],
    },
    nl: {
      starter: ["Klant automatisch verwittigd bij binnenkomst van het voertuig", "Statusupdate automatisch verstuurd tijdens de herstelling", "Klant automatisch verwittigd zodra het voertuig klaar is", "Factuur en betaallink automatisch verstuurd", "Onderhoudsherinnering automatisch verstuurd, ongeveer 1 jaar later", "Herinnering voor technische keuring automatisch verstuurd", "Maandelijks overzichtsrapport automatisch in uw inbox"],
      pro: ["Alles van Starter, plus:", "Offerte automatisch opgesteld op basis van het gemelde probleem", "Offerte automatisch verstuurd en opvolging via WhatsApp", "Seizoensgebonden herinnering voor bandenwissel automatisch verstuurd", "Tevredenheidsenquête automatisch verstuurd na elke herstelling", "Google Review-uitnodiging automatisch verstuurd", "Wekelijks rapport met overzicht van herstellingen en omzet", "Prioriteit support binnen 4 werkuren"],
      allin: ["Alles van Pro, plus:", "Werkorder automatisch aangemaakt per herstelling", "Garantiedossier automatisch bijgehouden per voertuig", "Factuur automatisch aangemaakt na elke herstelling", "Maandoverzicht volledig klaar om door te sturen naar uw boekhouder", "Documenten per voertuig automatisch geordend en gearchiveerd", "Persoonlijke accountmanager — 1 vast aanspreekpunt"],
      agent: ["Alles van All-in, plus:", "Eigen AI-assistent getraind op de werking van uw garage", "Eerste inschatting van schade op basis van foto's via AI", "E-mails automatisch gelezen, gecategoriseerd en beantwoord", "Klantgeschiedenis automatisch herkend bij nieuw contact", "Werkplanning automatisch overzichtelijk gehouden per dag", "Dagelijks rapport elke ochtend om 7u in uw inbox", "Dedicated success team dat actief meedenkt over optimalisaties"],
    },
    fr: {
      starter: ["Rendez-vous planifiés automatiquement via WhatsApp", "Client averti automatiquement à l'arrivée", "Client averti automatiquement quand le véhicule est prêt", "Rappel entretien 1 an plus tard automatique", "Rapport mensuel d'aperçu"],
      pro: ["Tout du Starter, plus :", "Devis générés automatiquement via WhatsApp", "Rappels contrôle technique envoyés automatiquement", "Rapport mensuel complet avec chiffres", "Support prioritaire sous 4h"],
      allin: ["Tout du Pro, plus :", "Factures générées automatiquement après réparation", "Coûts triés automatiquement par catégorie", "Aperçu mensuel prêt pour votre comptable", "Déclaration TVA suivie automatiquement"],
      agent: ["Tout du All-in, plus :", "E-mails lus et répondus automatiquement", "Communication client complète automatisée", "Rapport quotidien chaque matin à 7h", "Clients informés automatiquement à chaque étape"],
    },
    de: {
      starter: ["Termine automatisch via WhatsApp planen", "Kunde automatisch bei Ankunft benachrichtigt", "Kunde automatisch benachrichtigt, wenn Fahrzeug fertig ist", "Wartungserinnerung 1 Jahr später automatisch", "Monatlicher Übersichtsbericht"],
      pro: ["Alles aus Starter, plus:", "Angebote automatisch via WhatsApp erstellt", "TÜV-Erinnerungen automatisch versendet", "Vollständiger Monatsbericht mit Umsatzzahlen", "Priority-Support innerhalb 4h"],
      allin: ["Alles aus Pro, plus:", "Rechnungen automatisch nach Reparatur erstellt", "Kosten automatisch nach Kategorie sortiert", "Monatsübersicht bereit für Ihren Buchhalter", "Umsatzsteuererklärung automatisch verfolgt"],
      agent: ["Alles aus All-in, plus:", "E-Mails automatisch gelesen und beantwortet", "Vollständige Kundenkommunikation automatisiert", "Täglicher Bericht jeden Morgen um 7 Uhr", "Kunden automatisch bei jedem Schritt informiert"],
    },
  },
  horeca: {
    en: {
      starter: ["Reservations auto-processed via WhatsApp", "Confirmation automatically sent to guest", "Reminder day before reservation automatic", "No-show follow-up automatic", "Monthly overview report"],
      pro: ["Everything in Starter, plus:", "Staff schedules auto-generated", "Birthday discounts auto-sent", "Full monthly report with occupancy stats", "Priority support within 4h"],
      allin: ["Everything in Pro, plus:", "Invoices auto-generated per table", "Costs auto-categorized by type", "Monthly summary ready for your accountant", "VAT return automatically tracked"],
      agent: ["Everything in All-in, plus:", "Reviews automatically monitored and flagged", "Full guest communication automated", "Daily report every morning at 7am", "Bad reviews instantly alerted to owner"],
    },
    nl: {
      starter: ["Reserveringen automatisch verwerkt via WhatsApp", "Bevestiging automatisch verstuurd naar de gast", "Herinnering de dag voor de reservering automatisch verstuurd", "No-show automatisch opgevolgd en tafel opnieuw vrijgegeven", "Allergieën automatisch genoteerd bij de reservering", "Speciale gelegenheden automatisch genoteerd bij de reservering", "Maandelijks overzichtsrapport automatisch in uw inbox"],
      pro: ["Alles van Starter, plus:", "Personeelsplanning automatisch opgesteld op basis van beschikbaarheid", "Beschikbaarheden automatisch verzameld bij het team", "Wijzigingen in planning automatisch gecommuniceerd naar het team", "Feedback na bezoek automatisch opgevraagd bij gasten", "Google Reviews automatisch gemonitord", "Negatieve review automatisch en onmiddellijk gemeld aan de zaakvoerder", "Wekelijks rapport met overzicht van reserveringen en feedback", "Prioriteit support binnen 4 werkuren"],
      allin: ["Alles van Pro, plus:", "Verjaardagsbericht automatisch verstuurd naar vaste gasten", "Seizoensaanbiedingen automatisch gecommuniceerd naar uw mailinglijst", "Voorraad automatisch bijgehouden op basis van bestellingen", "Bestelherinnering automatisch verstuurd bij lage voorraad", "Dagomzet automatisch samengevat in uw rapport", "Persoonlijke accountmanager — 1 vast aanspreekpunt"],
      agent: ["Alles van All-in, plus:", "Eigen AI-assistent getraind op de werking van uw zaak", "Vaste gasten automatisch herkend bij nieuwe reservering", "Sociale media posts automatisch voorgesteld op basis van uw menu", "E-mails automatisch gelezen, gecategoriseerd en beantwoord", "Reserveringspatronen automatisch samengevat per week", "Dagelijks rapport elke ochtend om 7u in uw inbox", "Dedicated success team dat actief meedenkt over optimalisaties"],
    },
    fr: {
      starter: ["Réservations traitées automatiquement via WhatsApp", "Confirmation envoyée automatiquement au client", "Rappel la veille de la réservation automatique", "Suivi no-show automatique", "Rapport mensuel d'aperçu"],
      pro: ["Tout du Starter, plus :", "Plannings du personnel générés automatiquement", "Remises anniversaire envoyées automatiquement", "Rapport mensuel complet avec taux d'occupation", "Support prioritaire sous 4h"],
      allin: ["Tout du Pro, plus :", "Factures générées automatiquement par table", "Coûts triés automatiquement par catégorie", "Aperçu mensuel prêt pour votre comptable", "Déclaration TVA suivie automatiquement"],
      agent: ["Tout du All-in, plus :", "Avis surveillés et signalés automatiquement", "Communication client complète automatisée", "Rapport quotidien chaque matin à 7h", "Mauvais avis signalés instantanément au propriétaire"],
    },
    de: {
      starter: ["Reservierungen automatisch via WhatsApp verarbeitet", "Bestätigung automatisch an Gast gesendet", "Erinnerung am Tag vor der Reservierung automatisch", "No-Show-Follow-up automatisch", "Monatlicher Übersichtsbericht"],
      pro: ["Alles aus Starter, plus:", "Personalplanung automatisch generiert", "Geburtstagsrabatte automatisch versendet", "Vollständiger Monatsbericht mit Auslastungszahlen", "Priority-Support innerhalb 4h"],
      allin: ["Alles aus Pro, plus:", "Rechnungen automatisch pro Tisch erstellt", "Kosten automatisch nach Kategorie sortiert", "Monatsübersicht bereit für Ihren Buchhalter", "Umsatzsteuererklärung automatisch verfolgt"],
      agent: ["Alles aus All-in, plus:", "Bewertungen automatisch überwacht und gemeldet", "Vollständige Gästekommunikation automatisiert", "Täglicher Bericht jeden Morgen um 7 Uhr", "Schlechte Bewertungen sofort an Inhaber gemeldet"],
    },
  },
};

/** Returns localized pricing features for a sector + language (falls back to EN). */
export function getSectorPricing(sector: SectorKey, lang: Lang): PricingFeatures {
  return SECTOR_PRICING_RAW[sector][lang] ?? SECTOR_PRICING_RAW[sector].en;
}

/** @deprecated Use getSectorPricing(sector, lang). Kept for back-compat — returns EN. */
export const SECTOR_PRICING: Record<SectorKey, PricingFeatures> = Object.fromEntries(
  (Object.keys(SECTOR_PRICING_RAW) as SectorKey[]).map((k) => [k, SECTOR_PRICING_RAW[k].en])
) as Record<SectorKey, PricingFeatures>;

// Per-sector WhatsApp scenarios for HowItWorks
export type WAScenario = {
  name: string;
  bubbles: { side: "in" | "out"; time: string; text: string; auto?: boolean }[];
};

export const SECTOR_WA: Record<SectorKey, WAScenario[]> = {
  vastgoed: [
    { name: "Sophie", bubbles: [
      { side: "out", time: "14:02", text: "Goedemiddag, ik zag uw appartement in de Lange Nieuwstraat. Is er nog plaats voor een bezichtiging?" },
      { side: "in", time: "14:02", auto: true, text: "Dag Sophie, bedankt voor uw interesse! Het appartement is nog beschikbaar. Past donderdag 17:00 of zaterdag 11:00 u beter?" },
      { side: "out", time: "14:05", text: "Donderdag 17:00 is perfect." },
      { side: "in", time: "14:05", auto: true, text: "Top — afspraak bevestigd voor donderdag 17:00. U krijgt morgen een herinnering. Tot dan! 🏡" },
    ]},
    { name: "Marc", bubbles: [
      { side: "out", time: "09:14", text: "Hallo, is de woning in Gent nog te bezoeken dit weekend?" },
      { side: "in", time: "09:14", auto: true, text: "Goedemorgen Marc! Ja zeker. Zaterdag om 10:30 of zondag om 14:00 — wat past best?" },
      { side: "out", time: "09:18", text: "Zondag 14u graag, met mijn partner." },
      { side: "in", time: "09:18", auto: true, text: "Genoteerd voor twee personen, zondag 14:00. Ik stuur u 1u op voorhand het exacte adres. 👍" },
    ]},
    { name: "Laura", bubbles: [
      { side: "out", time: "20:41", text: "Hoi, kan ik wat meer info krijgen over de studio in Leuven?" },
      { side: "in", time: "20:41", auto: true, text: "Hallo Laura! Zeker — 38 m², EPC C, beschikbaar vanaf 1 september. Wilt u de brochure én een bezichtiging inplannen?" },
      { side: "out", time: "20:43", text: "Ja graag, dinsdag avond?" },
      { side: "in", time: "20:43", auto: true, text: "Dinsdag 18:30 staat genoteerd. Brochure is onderweg via mail. Tot dan! ✨" },
    ]},
    { name: "Pieter", bubbles: [
      { side: "out", time: "11:27", text: "Goeiedag, is de prijs van de villa in Hasselt nog onderhandelbaar?" },
      { side: "in", time: "11:27", auto: true, text: "Dag Pieter, dank voor uw bericht. De eigenaar staat open voor een bod na bezichtiging. Wanneer past u een bezoek?" },
      { side: "out", time: "11:30", text: "Vrijdag rond 16u zou top zijn." },
      { side: "in", time: "11:30", auto: true, text: "Perfect — vrijdag 16:00 ingepland. U ontvangt vanavond een korte voorbereiding per mail. Tot vrijdag! 🏠" },
    ]},
  ],
  tandartsen: [
    { name: "Emma", bubbles: [
      { side: "out", time: "08:12", text: "Goeiemorgen, ik heb pijn aan een kies — kan ik snel langskomen?" },
      { side: "in", time: "08:12", auto: true, text: "Dag Emma, vervelend! Vandaag 14:30 of morgen 09:15 vrij. Welke past?" },
      { side: "out", time: "08:13", text: "Vandaag 14:30 graag." },
      { side: "in", time: "08:13", auto: true, text: "Afspraak bevestigd. U krijgt 2u op voorhand een herinnering. Beterschap! 🦷" },
    ]},
    { name: "Jan", bubbles: [
      { side: "out", time: "10:45", text: "Hallo, ik moet mijn controle van morgen verplaatsen." },
      { side: "in", time: "10:45", auto: true, text: "Geen probleem Jan. Volgende vrije momenten: dinsdag 11:00 of donderdag 16:30." },
      { side: "out", time: "10:46", text: "Donderdag 16:30." },
      { side: "in", time: "10:46", auto: true, text: "Verplaatst naar donderdag 16:30. Tot dan!" },
    ]},
    { name: "Sara", bubbles: [
      { side: "out", time: "19:22", text: "Doen jullie ook tandbleking? En wat kost het?" },
      { side: "in", time: "19:22", auto: true, text: "Hallo Sara, jazeker. Vanaf €350 voor een volledige behandeling. Wilt u een intakegesprek inplannen?" },
      { side: "out", time: "19:24", text: "Ja, volgende week dinsdag?" },
      { side: "in", time: "19:24", auto: true, text: "Dinsdag 10:00 ingepland. Bevestiging volgt per e-mail. ✨" },
    ]},
    { name: "Tom", bubbles: [
      { side: "out", time: "07:48", text: "Ben ik vandaag al ingepland? Kan het niet terugvinden." },
      { side: "in", time: "07:48", auto: true, text: "Dag Tom, ja — vandaag 11:15 bij Dr. Janssens. Tot straks!" },
      { side: "out", time: "07:49", text: "Bedankt!" },
      { side: "in", time: "07:49", auto: true, text: "Graag gedaan. U krijgt 30 min op voorhand nog een herinnering. 👍" },
    ]},
  ],
  kinesisten: [
    { name: "Lien", bubbles: [
      { side: "out", time: "09:02", text: "Mijn arts heeft 9 sessies voorgeschreven, kan ik die inplannen?" },
      { side: "in", time: "09:02", auto: true, text: "Dag Lien, zeker. Voorkeur voor ochtend of avond? En welke dagen passen best?" },
      { side: "out", time: "09:04", text: "Liefst dinsdag en donderdag avond." },
      { side: "in", time: "09:04", auto: true, text: "Top — ik plan 9 sessies in, om de week op di/do 18:00. Bevestiging volgt. 🏃" },
    ]},
    { name: "Bram", bubbles: [
      { side: "out", time: "17:31", text: "Kan ik mijn sessie van morgen verzetten naar volgende week?" },
      { side: "in", time: "17:31", auto: true, text: "Geen probleem Bram. Vrije momenten: maandag 10:30 of woensdag 17:00." },
      { side: "out", time: "17:32", text: "Woensdag 17:00." },
      { side: "in", time: "17:32", auto: true, text: "Verplaatst. Reeks blijft verder lopen op de geplande dagen." },
    ]},
    { name: "Aïsha", bubbles: [
      { side: "out", time: "08:00", text: "Doen jullie ook dry needling?" },
      { side: "in", time: "08:00", auto: true, text: "Dag Aïsha, ja — door collega Kim. Wilt u een eerste sessie inplannen?" },
      { side: "out", time: "08:02", text: "Ja, volgende week donderdag." },
      { side: "in", time: "08:02", auto: true, text: "Donderdag 14:00 ingepland bij Kim. Tot dan!" },
    ]},
    { name: "David", bubbles: [
      { side: "out", time: "19:15", text: "Heb ik morgen een sessie?" },
      { side: "in", time: "19:15", auto: true, text: "Ja David — morgen 09:30, sessie 4/9. Tot dan! 👍" },
      { side: "out", time: "19:16", text: "Bedankt." },
      { side: "in", time: "19:16", auto: true, text: "Graag gedaan. Slaap wel!" },
    ]},
  ],
  accountants: [
    { name: "Karen", bubbles: [
      { side: "out", time: "10:14", text: "Ik heb facturen voor oktober — waar kan ik die uploaden?" },
      { side: "in", time: "10:14", auto: true, text: "Dag Karen, stuur ze gewoon hier door of mail naar facturen@. Worden automatisch verwerkt." },
      { side: "out", time: "10:15", text: "Top, doe ik nu." },
      { side: "in", time: "10:15", auto: true, text: "Ontvangen — 17 facturen, automatisch ingeboekt. Overzicht in uw portaal. ✅" },
    ]},
    { name: "Steven", bubbles: [
      { side: "out", time: "14:50", text: "Wanneer is de deadline voor mijn BTW-aangifte?" },
      { side: "in", time: "14:50", auto: true, text: "Uw aangifte Q3 is gepland voor indiening op 18 oktober. Alles staat klaar." },
      { side: "out", time: "14:51", text: "Perfect, dank!" },
      { side: "in", time: "14:51", auto: true, text: "Graag gedaan. U krijgt 3 dagen op voorhand nog een bevestiging." },
    ]},
    { name: "Nathalie", bubbles: [
      { side: "out", time: "08:33", text: "Klant betaalt factuur 2024-118 nog steeds niet." },
      { side: "in", time: "08:33", auto: true, text: "Genoteerd. 2e herinnering automatisch verstuurd vanmorgen. Bij geen reactie binnen 7d: aanmaning." },
      { side: "out", time: "08:34", text: "Top." },
      { side: "in", time: "08:34", auto: true, text: "U krijgt automatisch melding bij betaling. 📥" },
    ]},
    { name: "Erwin", bubbles: [
      { side: "out", time: "16:02", text: "Kunnen jullie het maandrapport voor mijn vennootschap doormailen?" },
      { side: "in", time: "16:02", auto: true, text: "Klaar — net verstuurd naar erwin@. Inclusief P&L, cashflow en KPI's." },
      { side: "out", time: "16:03", text: "Bedankt!" },
      { side: "in", time: "16:03", auto: true, text: "Volgende rapport automatisch op 1 november. 📊" },
    ]},
  ],
  architecten: [
    { name: "Wouter", bubbles: [
      { side: "out", time: "11:10", text: "Kan ik een offerte krijgen voor een uitbreiding van 40m²?" },
      { side: "in", time: "11:10", auto: true, text: "Dag Wouter, zeker. Mag ik adres en huidige situatie (foto's/plan)?" },
      { side: "out", time: "11:13", text: "Stuur ze nu door." },
      { side: "in", time: "11:13", auto: true, text: "Ontvangen — offerte automatisch opgemaakt en in uw mail binnen 5 min. 📐" },
    ]},
    { name: "Annick", bubbles: [
      { side: "out", time: "09:25", text: "Hoe staat het met de vergunning voor mijn project?" },
      { side: "in", time: "09:25", auto: true, text: "Status: in behandeling bij gemeente Hasselt. Verwachte beslissing: 14 november." },
      { side: "out", time: "09:26", text: "Top, hou me op de hoogte." },
      { side: "in", time: "09:26", auto: true, text: "Automatische melding bij elke statuswijziging. ✅" },
    ]},
    { name: "Pieter", bubbles: [
      { side: "out", time: "15:40", text: "Wanneer hebben we de volgende werfvergadering?" },
      { side: "in", time: "15:40", auto: true, text: "Donderdag 24/10 om 10:00 op de werf. Reminder volgt 1u op voorhand." },
      { side: "out", time: "15:41", text: "Bedankt!" },
      { side: "in", time: "15:41", auto: true, text: "Graag gedaan. Agenda staat al klaar in uw mailbox." },
    ]},
    { name: "Inge", bubbles: [
      { side: "out", time: "18:02", text: "Kan ik factuur voor fase 2 al krijgen?" },
      { side: "in", time: "18:02", auto: true, text: "Net opgemaakt en verstuurd. Vervaldatum 30 dagen." },
      { side: "out", time: "18:03", text: "Super, bedankt." },
      { side: "in", time: "18:03", auto: true, text: "Graag gedaan. 📨" },
    ]},
  ],
  garages: [
    { name: "Tom", bubbles: [
      { side: "out", time: "08:45", text: "Mijn motor maakt een raar geluid — kan ik vandaag langskomen?" },
      { side: "in", time: "08:45", auto: true, text: "Dag Tom, vandaag 14:00 of morgen 09:30 vrij. Welke past?" },
      { side: "out", time: "08:46", text: "Vandaag 14:00." },
      { side: "in", time: "08:46", auto: true, text: "Afspraak bevestigd. Reken op 1u diagnose. Tot straks! 🔧" },
    ]},
    { name: "Greet", bubbles: [
      { side: "out", time: "10:12", text: "Is mijn wagen al klaar?" },
      { side: "in", time: "10:12", auto: true, text: "Bijna — remmen vervangen, nu APK-check. Klaar tegen 14:00." },
      { side: "out", time: "13:58", text: "En nu?" },
      { side: "in", time: "13:58", auto: true, text: "Klaar! ✅ U kan ophalen tot 18:00. Factuur ligt klaar." },
    ]},
    { name: "Bart", bubbles: [
      { side: "out", time: "09:00", text: "Wat kost een grote onderhoudsbeurt voor mijn Golf?" },
      { side: "in", time: "09:00", auto: true, text: "Vanaf €420 incl. olie + filters. Offerte in uw mailbox over 2 min." },
      { side: "out", time: "09:03", text: "Top, inplannen graag." },
      { side: "in", time: "09:03", auto: true, text: "Volgende vrije slot: dinsdag 22/10. Bevestiging volgt." },
    ]},
    { name: "Hilde", bubbles: [
      { side: "out", time: "11:30", text: "Wanneer moet ik mijn APK doen?" },
      { side: "in", time: "11:30", auto: true, text: "APK vervalt op 12/11/2025. U krijgt 4 weken op voorhand automatisch herinnering." },
      { side: "out", time: "11:31", text: "Bedankt!" },
      { side: "in", time: "11:31", auto: true, text: "Graag gedaan. 👍" },
    ]},
  ],
  horeca: [
    { name: "Sofie", bubbles: [
      { side: "out", time: "16:14", text: "Hebben jullie nog plaats voor 4 personen zaterdag 20u?" },
      { side: "in", time: "16:14", auto: true, text: "Dag Sofie, zaterdag 20:00 voor 4 personen — gereserveerd! Bevestiging in uw mail." },
      { side: "out", time: "16:15", text: "Top, bedankt!" },
      { side: "in", time: "16:15", auto: true, text: "Graag gedaan. Tot zaterdag! 🍽️" },
    ]},
    { name: "Kevin", bubbles: [
      { side: "out", time: "12:01", text: "Hebben jullie ook vegan menu?" },
      { side: "in", time: "12:01", auto: true, text: "Ja zeker! 3-gangenmenu vegan voor €38. Wilt u reserveren?" },
      { side: "out", time: "12:02", text: "Vrijdag 19:30, 2 personen." },
      { side: "in", time: "12:02", auto: true, text: "Gereserveerd! Tot vrijdag. ✨" },
    ]},
    { name: "Mieke", bubbles: [
      { side: "out", time: "10:30", text: "Ik moet onze reservering van vanavond annuleren." },
      { side: "in", time: "10:30", auto: true, text: "Geen probleem Mieke. Wilt u verplaatsen of volledig annuleren?" },
      { side: "out", time: "10:31", text: "Verplaatsen naar volgende vrijdag." },
      { side: "in", time: "10:31", auto: true, text: "Verplaatst naar vrijdag 25/10, 20:00. Bevestiging volgt." },
    ]},
    { name: "Lars", bubbles: [
      { side: "out", time: "19:45", text: "We zitten in de file, kunnen we 15 min later komen?" },
      { side: "in", time: "19:45", auto: true, text: "Geen probleem Lars — uw tafel blijft staan. Veilige rit!" },
      { side: "out", time: "19:46", text: "Bedankt!" },
      { side: "in", time: "19:46", auto: true, text: "Graag gedaan. Tot zo. 👍" },
    ]},
  ],
};
