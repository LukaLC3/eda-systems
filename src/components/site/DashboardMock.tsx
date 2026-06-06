import { MessageCircle, Calendar, TrendingUp, Home, CheckCircle2, Bell } from "lucide-react";
import { useEffect, useState } from "react";
import { useT } from "@/i18n/LanguageProvider";
import { useSector } from "@/i18n/SectorProvider";
import type { SectorKey } from "@/i18n/sectors";
import type { Lang } from "@/i18n/translations";

type L4<T = string> = Record<Lang, T>;
const pick = <T,>(o: L4<T>, l: Lang): T => o[l] ?? o.en;

type Kpi = { l: string; v: string; t: string };
type Row = { n: string; p: string; s: string };
type SectorContent = {
  path: L4;
  kpis: L4<Kpi[]>;          // exactly 4 items
  recentTitle: L4;
  rows: L4<Row[]>;          // exactly 3 items
  sidebarLabel: L4;
  sidebarItems: L4<string[]>; // 4 items (first = live)
  waLabel: L4;
  waBody: L4;
  waFoot: L4;
};

const SECTORS_DATA: Record<SectorKey, SectorContent> = {
  vastgoed: {
    path: { en: "dashboard.edasystems.eu / overview", nl: "dashboard.edasystems.eu / overzicht", fr: "dashboard.edasystems.eu / aperçu", de: "dashboard.edasystems.eu / übersicht" },
    kpis: {
      en: [{ l: "New leads today", v: "12", t: "+4 vs yesterday" }, { l: "Appointments booked", v: "7", t: "Automatic" }, { l: "Time saved", v: "3h 15m", t: "today" }, { l: "Response time", v: "2 min", t: "35% faster than before" }],
      nl: [{ l: "Nieuwe leads vandaag", v: "12", t: "+4 vs gisteren" }, { l: "Afspraken ingepland", v: "7", t: "Automatisch" }, { l: "Tijd bespaard", v: "3u 15m", t: "vandaag" }, { l: "Reactietijd", v: "2 min", t: "35% sneller dan voorheen" }],
      fr: [{ l: "Nouveaux leads aujourd'hui", v: "12", t: "+4 vs hier" }, { l: "Rendez-vous planifiés", v: "7", t: "Automatique" }, { l: "Temps gagné", v: "3h 15m", t: "aujourd'hui" }, { l: "Temps de réponse", v: "2 min", t: "35% plus rapide qu'avant" }],
      de: [{ l: "Neue Leads heute", v: "12", t: "+4 vs gestern" }, { l: "Termine geplant", v: "7", t: "Automatisch" }, { l: "Zeit gespart", v: "3Std 15m", t: "heute" }, { l: "Reaktionszeit", v: "2 min", t: "35% schneller als zuvor" }],
    },
    recentTitle: { en: "Recent lead follow-up", nl: "Recente lead opvolging", fr: "Suivi récent des leads", de: "Aktuelle Lead-Nachverfolgung" },
    rows: {
      en: [{ n: "Sophie Janssens", p: "Apartment Antwerp 2018 — €285,000", s: "Appointment booked" }, { n: "Marc De Vos", p: "House Ghent 9000 — €450,000", s: "Brochure sent" }, { n: "Laura Peeters", p: "Studio Leuven 3000 — €195,000", s: "WhatsApp follow-up" }],
      nl: [{ n: "Sophie Janssens", p: "Appartement Antwerpen 2018 — €285.000", s: "Afspraak ingepland" }, { n: "Marc De Vos", p: "Woning Gent 9000 — €450.000", s: "Brochure verzonden" }, { n: "Laura Peeters", p: "Studio Leuven 3000 — €195.000", s: "WhatsApp opvolging" }],
      fr: [{ n: "Sophie Janssens", p: "Appartement Anvers 2018 — 285 000 €", s: "Rendez-vous fixé" }, { n: "Marc De Vos", p: "Maison Gand 9000 — 450 000 €", s: "Brochure envoyée" }, { n: "Laura Peeters", p: "Studio Louvain 3000 — 195 000 €", s: "Suivi WhatsApp" }],
      de: [{ n: "Sophie Janssens", p: "Wohnung Antwerpen 2018 — 285.000 €", s: "Termin gebucht" }, { n: "Marc De Vos", p: "Haus Gent 9000 — 450.000 €", s: "Broschüre gesendet" }, { n: "Laura Peeters", p: "Studio Löwen 3000 — 195.000 €", s: "WhatsApp-Folgenachricht" }],
    },
    sidebarLabel: { en: "This week", nl: "Deze week", fr: "Cette semaine", de: "Diese Woche" },
    sidebarItems: {
      en: ["Live — 24 viewings scheduled", "Viewing confirmed", "3 new leads received", "Invoice sent automatically"],
      nl: ["Live — 24 bezichtigingen gepland", "Bezichtiging bevestigd", "3 nieuwe leads ontvangen", "Factuur automatisch verstuurd"],
      fr: ["Live — 24 visites planifiées", "Visite confirmée", "3 nouveaux leads reçus", "Facture envoyée automatiquement"],
      de: ["Live — 24 Besichtigungen geplant", "Besichtigung bestätigt", "3 neue Leads erhalten", "Rechnung automatisch gesendet"],
    },
    waLabel: { en: "WhatsApp · automatic", nl: "WhatsApp · automatisch", fr: "WhatsApp · automatique", de: "WhatsApp · automatisch" },
    waBody: { en: "Thanks for your interest! Does Thursday 5 pm work for you?", nl: "Bedankt voor uw interesse! Past donderdag 17u u?", fr: "Merci de votre intérêt ! Jeudi 17h vous convient ?", de: "Danke für Ihr Interesse! Passt Donnerstag 17 Uhr?" },
    waFoot: { en: "sent within 1 minute", nl: "verstuurd binnen 1 minuut", fr: "envoyé en 1 minute", de: "gesendet in 1 Minute" },
  },
  tandartsen: {
    path: { en: "dashboard.edasystems.eu / dental", nl: "dashboard.edasystems.eu / tandarts", fr: "dashboard.edasystems.eu / dentaire", de: "dashboard.edasystems.eu / zahnarzt" },
    kpis: {
      en: [{ l: "New patients today", v: "8", t: "+2 vs yesterday" }, { l: "Appointments booked", v: "14", t: "Automatic" }, { l: "Time saved", v: "3h 45m", t: "today" }, { l: "No-show rate", v: "0%", t: "3 prevented this week" }],
      nl: [{ l: "Nieuwe patiënten vandaag", v: "8", t: "+2 vs gisteren" }, { l: "Afspraken ingepland", v: "14", t: "Automatisch" }, { l: "Tijd bespaard", v: "3u 45m", t: "vandaag" }, { l: "No-show ratio", v: "0%", t: "3 voorkomen deze week" }],
      fr: [{ l: "Nouveaux patients aujourd'hui", v: "8", t: "+2 vs hier" }, { l: "Rendez-vous planifiés", v: "14", t: "Automatique" }, { l: "Temps gagné", v: "3h 45m", t: "aujourd'hui" }, { l: "Taux d'absence", v: "0%", t: "3 évités cette semaine" }],
      de: [{ l: "Neue Patienten heute", v: "8", t: "+2 vs gestern" }, { l: "Termine geplant", v: "14", t: "Automatisch" }, { l: "Zeit gespart", v: "3Std 45m", t: "heute" }, { l: "No-Show-Rate", v: "0%", t: "3 vermieden diese Woche" }],
    },
    recentTitle: { en: "Recent patient activity", nl: "Recente patiëntactiviteit", fr: "Activité récente des patients", de: "Aktuelle Patientenaktivität" },
    rows: {
      en: [{ n: "Thomas Declercq", p: "Check-up — Tuesday 10:00", s: "Confirmed automatically" }, { n: "Anna Vermeersch", p: "Whitening — Thursday 14:00", s: "Reminder sent" }, { n: "Pieter Goossens", p: "Cancelled — rescheduled", s: "New slot filled" }],
      nl: [{ n: "Thomas Declercq", p: "Controle — Dinsdag 10:00", s: "Automatisch bevestigd" }, { n: "Anna Vermeersch", p: "Bleaching — Donderdag 14:00", s: "Herinnering verstuurd" }, { n: "Pieter Goossens", p: "Geannuleerd — herpland", s: "Nieuwe plek ingevuld" }],
      fr: [{ n: "Thomas Declercq", p: "Contrôle — Mardi 10:00", s: "Confirmé automatiquement" }, { n: "Anna Vermeersch", p: "Blanchiment — Jeudi 14:00", s: "Rappel envoyé" }, { n: "Pieter Goossens", p: "Annulé — replanifié", s: "Nouvelle place comblée" }],
      de: [{ n: "Thomas Declercq", p: "Kontrolle — Dienstag 10:00", s: "Automatisch bestätigt" }, { n: "Anna Vermeersch", p: "Bleaching — Donnerstag 14:00", s: "Erinnerung gesendet" }, { n: "Pieter Goossens", p: "Abgesagt — verschoben", s: "Neuer Platz vergeben" }],
    },
    sidebarLabel: { en: "This week", nl: "Deze week", fr: "Cette semaine", de: "Diese Woche" },
    sidebarItems: {
      en: ["Live — 14 appointments today", "Waiting list: 2 slots filled", "Reminder sent: 6 patients", "Invoice created automatically"],
      nl: ["Live — 14 afspraken vandaag", "Wachtlijst: 2 plekken ingevuld", "Herinnering verstuurd: 6 patiënten", "Factuur automatisch aangemaakt"],
      fr: ["Live — 14 rendez-vous aujourd'hui", "Liste d'attente : 2 places comblées", "Rappel envoyé : 6 patients", "Facture créée automatiquement"],
      de: ["Live — 14 Termine heute", "Warteliste: 2 Plätze vergeben", "Erinnerung gesendet: 6 Patienten", "Rechnung automatisch erstellt"],
    },
    waLabel: { en: "WhatsApp · automatic", nl: "WhatsApp · automatisch", fr: "WhatsApp · automatique", de: "WhatsApp · automatisch" },
    waBody: { en: "Your appointment is confirmed for Tuesday at 10:00. See you then!", nl: "Uw afspraak staat bevestigd voor dinsdag om 10:00. Tot dan!", fr: "Votre rendez-vous est confirmé pour mardi à 10:00. À bientôt !", de: "Ihr Termin ist bestätigt für Dienstag um 10:00. Bis dann!" },
    waFoot: { en: "sent within 1 minute", nl: "verstuurd binnen 1 minuut", fr: "envoyé en 1 minute", de: "gesendet in 1 Minute" },
  },
  kinesisten: {
    path: { en: "dashboard.edasystems.eu / physio", nl: "dashboard.edasystems.eu / kine", fr: "dashboard.edasystems.eu / kine", de: "dashboard.edasystems.eu / physio" },
    kpis: {
      en: [{ l: "Sessions today", v: "11", t: "+1 vs yesterday" }, { l: "Reports generated", v: "8", t: "Via voice" }, { l: "Time saved", v: "4h 10m", t: "today" }, { l: "Series planned", v: "6", t: "patients this week" }],
      nl: [{ l: "Sessies vandaag", v: "11", t: "+1 vs gisteren" }, { l: "Verslagen gegenereerd", v: "8", t: "Via spraak" }, { l: "Tijd bespaard", v: "4u 10m", t: "vandaag" }, { l: "Reeksen gepland", v: "6", t: "patiënten deze week" }],
      fr: [{ l: "Séances aujourd'hui", v: "11", t: "+1 vs hier" }, { l: "Rapports générés", v: "8", t: "Par voix" }, { l: "Temps gagné", v: "4h 10m", t: "aujourd'hui" }, { l: "Séries planifiées", v: "6", t: "patients cette semaine" }],
      de: [{ l: "Sitzungen heute", v: "11", t: "+1 vs gestern" }, { l: "Berichte generiert", v: "8", t: "Per Sprache" }, { l: "Zeit gespart", v: "4Std 10m", t: "heute" }, { l: "Serien geplant", v: "6", t: "Patienten diese Woche" }],
    },
    recentTitle: { en: "Recent session activity", nl: "Recente sessieactiviteit", fr: "Activité récente des séances", de: "Aktuelle Sitzungsaktivität" },
    rows: {
      en: [{ n: "Lien Martens", p: "Session 3/6 — knee rehabilitation", s: "Progress logged automatically" }, { n: "Kevin Wouters", p: "Session 1/6 — back treatment", s: "Series of 6 planned" }, { n: "Nathalie Bogaert", p: "Missed session — rescheduled", s: "New slot confirmed" }],
      nl: [{ n: "Lien Martens", p: "Sessie 3/6 — knierevalidatie", s: "Voortgang automatisch gelogd" }, { n: "Kevin Wouters", p: "Sessie 1/6 — rugbehandeling", s: "Reeks van 6 gepland" }, { n: "Nathalie Bogaert", p: "Gemiste sessie — herpland", s: "Nieuwe plek bevestigd" }],
      fr: [{ n: "Lien Martens", p: "Séance 3/6 — rééducation genou", s: "Progrès enregistré automatiquement" }, { n: "Kevin Wouters", p: "Séance 1/6 — traitement dos", s: "Série de 6 planifiée" }, { n: "Nathalie Bogaert", p: "Séance manquée — replanifiée", s: "Nouvelle place confirmée" }],
      de: [{ n: "Lien Martens", p: "Sitzung 3/6 — Knie-Reha", s: "Fortschritt automatisch erfasst" }, { n: "Kevin Wouters", p: "Sitzung 1/6 — Rückenbehandlung", s: "Serie von 6 geplant" }, { n: "Nathalie Bogaert", p: "Verpasste Sitzung — verschoben", s: "Neuer Platz bestätigt" }],
    },
    sidebarLabel: { en: "This week", nl: "Deze week", fr: "Cette semaine", de: "Diese Woche" },
    sidebarItems: {
      en: ["Live — 11 sessions today", "Treatment report: generated", "Patient follow-up: sent", "Invoice created: session 3/6"],
      nl: ["Live — 11 sessies vandaag", "Behandelverslag: gegenereerd", "Patiëntopvolging: verstuurd", "Factuur aangemaakt: sessie 3/6"],
      fr: ["Live — 11 séances aujourd'hui", "Rapport généré", "Suivi patient envoyé", "Facture créée : séance 3/6"],
      de: ["Live — 11 Sitzungen heute", "Behandlungsbericht: generiert", "Patientennachverfolgung gesendet", "Rechnung erstellt: Sitzung 3/6"],
    },
    waLabel: { en: "WhatsApp · automatic", nl: "WhatsApp · automatisch", fr: "WhatsApp · automatique", de: "WhatsApp · automatisch" },
    waBody: { en: "Your session tomorrow at 10:00 is confirmed. See you then!", nl: "Uw sessie morgen om 10:00 is bevestigd. Tot dan!", fr: "Votre séance demain à 10:00 est confirmée. À bientôt !", de: "Ihre Sitzung morgen um 10:00 ist bestätigt. Bis dann!" },
    waFoot: { en: "sent within 1 minute", nl: "verstuurd binnen 1 minuut", fr: "envoyé en 1 minute", de: "gesendet in 1 Minute" },
  },
  accountants: {
    path: { en: "dashboard.edasystems.eu / accounting", nl: "dashboard.edasystems.eu / boekhouding", fr: "dashboard.edasystems.eu / comptabilite", de: "dashboard.edasystems.eu / buchhaltung" },
    kpis: {
      en: [{ l: "Invoices processed", v: "34", t: "today automatically" }, { l: "Processing time", v: "48 sec", t: "per invoice avg." }, { l: "Time saved", v: "4h 20m", t: "today" }, { l: "Deadlines this week", v: "3", t: "all clients notified" }],
      nl: [{ l: "Facturen verwerkt", v: "34", t: "vandaag automatisch" }, { l: "Verwerkingstijd", v: "48 sec", t: "per factuur gem." }, { l: "Tijd bespaard", v: "4u 20m", t: "vandaag" }, { l: "Deadlines deze week", v: "3", t: "alle klanten verwittigd" }],
      fr: [{ l: "Factures traitées", v: "34", t: "aujourd'hui automatiquement" }, { l: "Temps de traitement", v: "48 sec", t: "par facture moy." }, { l: "Temps gagné", v: "4h 20m", t: "aujourd'hui" }, { l: "Échéances cette semaine", v: "3", t: "clients notifiés" }],
      de: [{ l: "Rechnungen verarbeitet", v: "34", t: "heute automatisch" }, { l: "Verarbeitungszeit", v: "48 sec", t: "pro Rechnung Ø" }, { l: "Zeit gespart", v: "4Std 20m", t: "heute" }, { l: "Fristen diese Woche", v: "3", t: "Kunden benachrichtigt" }],
    },
    recentTitle: { en: "Recent invoice activity", nl: "Recente factuuractiviteit", fr: "Activité récente des factures", de: "Aktuelle Rechnungsaktivität" },
    rows: {
      en: [{ n: "Bakkerij Claes BV", p: "12 invoices — Q2 batch", s: "Processed & booked" }, { n: "Garage Pieters NV", p: "VAT return Q2 — prepared", s: "Ready for review" }, { n: "Kapsalon Lena", p: "Overdue invoice — followed up", s: "Reminder sent automatically" }],
      nl: [{ n: "Bakkerij Claes BV", p: "12 facturen — Q2 batch", s: "Verwerkt & geboekt" }, { n: "Garage Pieters NV", p: "BTW-aangifte Q2 — voorbereid", s: "Klaar voor review" }, { n: "Kapsalon Lena", p: "Vervallen factuur — opgevolgd", s: "Herinnering automatisch verstuurd" }],
      fr: [{ n: "Bakkerij Claes BV", p: "12 factures — lot T2", s: "Traitées & comptabilisées" }, { n: "Garage Pieters NV", p: "Déclaration TVA T2 — préparée", s: "Prête pour révision" }, { n: "Kapsalon Lena", p: "Facture en retard — suivie", s: "Rappel envoyé automatiquement" }],
      de: [{ n: "Bakkerij Claes BV", p: "12 Rechnungen — Q2 Batch", s: "Verarbeitet & gebucht" }, { n: "Garage Pieters NV", p: "MwSt.-Erklärung Q2 — vorbereitet", s: "Bereit zur Prüfung" }, { n: "Kapsalon Lena", p: "Überfällige Rechnung — verfolgt", s: "Erinnerung automatisch gesendet" }],
    },
    sidebarLabel: { en: "This week", nl: "Deze week", fr: "Cette semaine", de: "Diese Woche" },
    sidebarItems: {
      en: ["Live — 34 invoices processed", "VAT Q2: ready for submission", "3 client deadlines: notified", "Anomaly detected: flagged"],
      nl: ["Live — 34 facturen verwerkt", "BTW Q2: klaar voor indiening", "3 klantdeadlines: verwittigd", "Anomalie gedetecteerd: gemarkeerd"],
      fr: ["Live — 34 factures traitées", "TVA T2 : prête à soumettre", "3 échéances clients : notifiées", "Anomalie détectée : marquée"],
      de: ["Live — 34 Rechnungen verarbeitet", "MwSt. Q2: bereit zur Einreichung", "3 Kundenfristen: benachrichtigt", "Anomalie erkannt: markiert"],
    },
    waLabel: { en: "WhatsApp · automatic", nl: "WhatsApp · automatisch", fr: "WhatsApp · automatique", de: "WhatsApp · automatisch" },
    waBody: { en: "Your Q2 overview is ready. Please review before Friday.", nl: "Uw Q2-overzicht is klaar. Gelieve te reviewen voor vrijdag.", fr: "Votre aperçu T2 est prêt. À vérifier avant vendredi.", de: "Ihre Q2-Übersicht ist bereit. Bitte bis Freitag prüfen." },
    waFoot: { en: "sent within 1 minute", nl: "verstuurd binnen 1 minuut", fr: "envoyé en 1 minute", de: "gesendet in 1 Minute" },
  },
  architecten: {
    path: { en: "dashboard.edasystems.eu / architecture", nl: "dashboard.edasystems.eu / architectuur", fr: "dashboard.edasystems.eu / architecture", de: "dashboard.edasystems.eu / architektur" },
    kpis: {
      en: [{ l: "Active projects", v: "7", t: "across Belgium" }, { l: "Quotes sent", v: "4", t: "this week automatically" }, { l: "Time saved", v: "3h 30m", t: "today" }, { l: "Permits tracked", v: "5", t: "2 approved this week" }],
      nl: [{ l: "Actieve projecten", v: "7", t: "in heel België" }, { l: "Offertes verstuurd", v: "4", t: "deze week automatisch" }, { l: "Tijd bespaard", v: "3u 30m", t: "vandaag" }, { l: "Vergunningen opgevolgd", v: "5", t: "2 goedgekeurd deze week" }],
      fr: [{ l: "Projets actifs", v: "7", t: "à travers la Belgique" }, { l: "Devis envoyés", v: "4", t: "cette semaine automatiquement" }, { l: "Temps gagné", v: "3h 30m", t: "aujourd'hui" }, { l: "Permis suivis", v: "5", t: "2 approuvés cette semaine" }],
      de: [{ l: "Aktive Projekte", v: "7", t: "in ganz Belgien" }, { l: "Angebote gesendet", v: "4", t: "diese Woche automatisch" }, { l: "Zeit gespart", v: "3Std 30m", t: "heute" }, { l: "Genehmigungen verfolgt", v: "5", t: "2 genehmigt diese Woche" }],
    },
    recentTitle: { en: "Recent project activity", nl: "Recente projectactiviteit", fr: "Activité récente des projets", de: "Aktuelle Projektaktivität" },
    rows: {
      en: [{ n: "Renovation Antwerp — Phase 2", p: "Budget €180,000", s: "Invoice sent automatically" }, { n: "New Build Ghent", p: "Permit submitted", s: "Status: under review" }, { n: "Interior Brussels", p: "Quote requested", s: "Generated in 4 minutes" }],
      nl: [{ n: "Renovatie Antwerpen — Fase 2", p: "Budget €180.000", s: "Factuur automatisch verstuurd" }, { n: "Nieuwbouw Gent", p: "Vergunning ingediend", s: "Status: in behandeling" }, { n: "Interieur Brussel", p: "Offerte aangevraagd", s: "Gegenereerd in 4 minuten" }],
      fr: [{ n: "Rénovation Anvers — Phase 2", p: "Budget 180 000 €", s: "Facture envoyée automatiquement" }, { n: "Nouvelle construction Gand", p: "Permis déposé", s: "Statut : en cours d'examen" }, { n: "Intérieur Bruxelles", p: "Devis demandé", s: "Généré en 4 minutes" }],
      de: [{ n: "Renovierung Antwerpen — Phase 2", p: "Budget 180.000 €", s: "Rechnung automatisch gesendet" }, { n: "Neubau Gent", p: "Genehmigung eingereicht", s: "Status: in Bearbeitung" }, { n: "Innenraum Brüssel", p: "Angebot angefragt", s: "In 4 Minuten generiert" }],
    },
    sidebarLabel: { en: "This week", nl: "Deze week", fr: "Cette semaine", de: "Diese Woche" },
    sidebarItems: {
      en: ["Live — 7 projects active", "Phase 2 invoice: sent", "Client update: 3 projects", "Permit approved: Brussels"],
      nl: ["Live — 7 projecten actief", "Fase 2-factuur: verstuurd", "Klantupdate: 3 projecten", "Vergunning goedgekeurd: Brussel"],
      fr: ["Live — 7 projets actifs", "Facture phase 2 : envoyée", "Mise à jour client : 3 projets", "Permis approuvé : Bruxelles"],
      de: ["Live — 7 Projekte aktiv", "Phase-2-Rechnung: gesendet", "Kundenupdate: 3 Projekte", "Genehmigung erteilt: Brüssel"],
    },
    waLabel: { en: "WhatsApp · automatic", nl: "WhatsApp · automatisch", fr: "WhatsApp · automatique", de: "WhatsApp · automatisch" },
    waBody: { en: "Phase 2 starts Monday. Invoice and schedule sent.", nl: "Fase 2 start maandag. Factuur en planning verstuurd.", fr: "La phase 2 commence lundi. Facture et planning envoyés.", de: "Phase 2 startet Montag. Rechnung und Plan gesendet." },
    waFoot: { en: "sent within 1 minute", nl: "verstuurd binnen 1 minuut", fr: "envoyé en 1 minute", de: "gesendet in 1 Minute" },
  },
  garages: {
    path: { en: "dashboard.edasystems.eu / automotive", nl: "dashboard.edasystems.eu / garage", fr: "dashboard.edasystems.eu / garage", de: "dashboard.edasystems.eu / werkstatt" },
    kpis: {
      en: [{ l: "Vehicles today", v: "9", t: "in workshop" }, { l: "Quotes sent", v: "12", t: "automatically" }, { l: "Time saved", v: "3h 00m", t: "today" }, { l: "MOT reminders", v: "14", t: "sent this month" }],
      nl: [{ l: "Voertuigen vandaag", v: "9", t: "in werkplaats" }, { l: "Offertes verstuurd", v: "12", t: "automatisch" }, { l: "Tijd bespaard", v: "3u 00m", t: "vandaag" }, { l: "Keuring-herinneringen", v: "14", t: "verstuurd deze maand" }],
      fr: [{ l: "Véhicules aujourd'hui", v: "9", t: "en atelier" }, { l: "Devis envoyés", v: "12", t: "automatiquement" }, { l: "Temps gagné", v: "3h 00m", t: "aujourd'hui" }, { l: "Rappels contrôle", v: "14", t: "envoyés ce mois" }],
      de: [{ l: "Fahrzeuge heute", v: "9", t: "in Werkstatt" }, { l: "Angebote gesendet", v: "12", t: "automatisch" }, { l: "Zeit gespart", v: "3Std 00m", t: "heute" }, { l: "TÜV-Erinnerungen", v: "14", t: "gesendet diesen Monat" }],
    },
    recentTitle: { en: "Recent workshop activity", nl: "Recente werkplaatsactiviteit", fr: "Activité récente de l'atelier", de: "Aktuelle Werkstattaktivität" },
    rows: {
      en: [{ n: "BMW 3-Series — Jan Hermans", p: "Service + brake pads — €385", s: "Client notified: ready ✓" }, { n: "VW Golf — Sara Lemmens", p: "MOT due next month", s: "Reminder sent automatically" }, { n: "Audi A4 — Dirk Claes", p: "Quote requested — exhaust", s: "Quote sent in 3 minutes" }],
      nl: [{ n: "BMW 3-Reeks — Jan Hermans", p: "Onderhoud + remblokken — €385", s: "Klant verwittigd: klaar ✓" }, { n: "VW Golf — Sara Lemmens", p: "Keuring volgende maand", s: "Herinnering automatisch verstuurd" }, { n: "Audi A4 — Dirk Claes", p: "Offerte aangevraagd — uitlaat", s: "Offerte verstuurd in 3 min" }],
      fr: [{ n: "BMW Série 3 — Jan Hermans", p: "Service + plaquettes — 385 €", s: "Client averti : prêt ✓" }, { n: "VW Golf — Sara Lemmens", p: "Contrôle technique le mois prochain", s: "Rappel envoyé automatiquement" }, { n: "Audi A4 — Dirk Claes", p: "Devis demandé — échappement", s: "Devis envoyé en 3 minutes" }],
      de: [{ n: "BMW 3er — Jan Hermans", p: "Service + Bremsbeläge — 385 €", s: "Kunde benachrichtigt: fertig ✓" }, { n: "VW Golf — Sara Lemmens", p: "TÜV nächsten Monat fällig", s: "Erinnerung automatisch gesendet" }, { n: "Audi A4 — Dirk Claes", p: "Angebot — Auspuff", s: "Angebot in 3 Minuten gesendet" }],
    },
    sidebarLabel: { en: "This week", nl: "Deze week", fr: "Cette semaine", de: "Diese Woche" },
    sidebarItems: {
      en: ["Live — 9 vehicles in workshop", "Payment received: €385", "MOT reminder: 3 vehicles", "Quote accepted: Audi A4"],
      nl: ["Live — 9 voertuigen in werkplaats", "Betaling ontvangen: €385", "Keuring-herinnering: 3 voertuigen", "Offerte aanvaard: Audi A4"],
      fr: ["Live — 9 véhicules en atelier", "Paiement reçu : 385 €", "Rappel contrôle : 3 véhicules", "Devis accepté : Audi A4"],
      de: ["Live — 9 Fahrzeuge in Werkstatt", "Zahlung erhalten: 385 €", "TÜV-Erinnerung: 3 Fahrzeuge", "Angebot angenommen: Audi A4"],
    },
    waLabel: { en: "WhatsApp · automatic", nl: "WhatsApp · automatisch", fr: "WhatsApp · automatique", de: "WhatsApp · automatisch" },
    waBody: { en: "Your vehicle is ready ✓ Invoice: €385. Pay online: [link]", nl: "Uw voertuig is klaar ✓ Factuur: €385. Online betalen: [link]", fr: "Votre véhicule est prêt ✓ Facture : 385 €. Payer en ligne : [lien]", de: "Ihr Fahrzeug ist fertig ✓ Rechnung: 385 €. Online zahlen: [Link]" },
    waFoot: { en: "sent within 1 minute", nl: "verstuurd binnen 1 minuut", fr: "envoyé en 1 minute", de: "gesendet in 1 Minute" },
  },
  horeca: {
    path: { en: "dashboard.edasystems.eu / hospitality", nl: "dashboard.edasystems.eu / horeca", fr: "dashboard.edasystems.eu / restauration", de: "dashboard.edasystems.eu / gastronomie" },
    kpis: {
      en: [{ l: "Reservations today", v: "18", t: "confirmed" }, { l: "No-shows this week", v: "0", t: "prevented automatically" }, { l: "Time saved", v: "2h 20m", t: "today" }, { l: "Staff scheduled", v: "Next 7 days", t: "automatically" }],
      nl: [{ l: "Reservaties vandaag", v: "18", t: "bevestigd" }, { l: "No-shows deze week", v: "0", t: "automatisch voorkomen" }, { l: "Tijd bespaard", v: "2u 20m", t: "vandaag" }, { l: "Personeel ingepland", v: "Komende 7 dagen", t: "automatisch" }],
      fr: [{ l: "Réservations aujourd'hui", v: "18", t: "confirmées" }, { l: "Absences cette semaine", v: "0", t: "évitées automatiquement" }, { l: "Temps gagné", v: "2h 20m", t: "aujourd'hui" }, { l: "Personnel planifié", v: "7 prochains jours", t: "automatiquement" }],
      de: [{ l: "Reservierungen heute", v: "18", t: "bestätigt" }, { l: "No-Shows diese Woche", v: "0", t: "automatisch vermieden" }, { l: "Zeit gespart", v: "2Std 20m", t: "heute" }, { l: "Personal geplant", v: "Nächste 7 Tage", t: "automatisch" }],
    },
    recentTitle: { en: "Recent reservation activity", nl: "Recente reservatieactiviteit", fr: "Activité récente des réservations", de: "Aktuelle Reservierungsaktivität" },
    rows: {
      en: [{ n: "Table 6 — Famille Dubois", p: "Friday 20:00 — 4 persons", s: "Confirmed automatically" }, { n: "Private dining — De Smet", p: "Saturday 19:00 — 8 persons", s: "Deposit requested" }, { n: "No-show Monday table 3", p: "Followed up automatically", s: "Rebooked for next week" }],
      nl: [{ n: "Tafel 6 — Familie Dubois", p: "Vrijdag 20:00 — 4 personen", s: "Automatisch bevestigd" }, { n: "Private dining — De Smet", p: "Zaterdag 19:00 — 8 personen", s: "Voorschot gevraagd" }, { n: "No-show maandag tafel 3", p: "Automatisch opgevolgd", s: "Herboekt voor volgende week" }],
      fr: [{ n: "Table 6 — Famille Dubois", p: "Vendredi 20:00 — 4 personnes", s: "Confirmé automatiquement" }, { n: "Privatisation — De Smet", p: "Samedi 19:00 — 8 personnes", s: "Acompte demandé" }, { n: "Absence lundi table 3", p: "Suivi automatique", s: "Reréservé semaine prochaine" }],
      de: [{ n: "Tisch 6 — Familie Dubois", p: "Freitag 20:00 — 4 Personen", s: "Automatisch bestätigt" }, { n: "Privatraum — De Smet", p: "Samstag 19:00 — 8 Personen", s: "Anzahlung angefragt" }, { n: "No-Show Montag Tisch 3", p: "Automatisch verfolgt", s: "Neu gebucht für nächste Woche" }],
    },
    sidebarLabel: { en: "This week", nl: "Deze week", fr: "Cette semaine", de: "Diese Woche" },
    sidebarItems: {
      en: ["Live — 18 reservations today", "Staff schedule: generated", "Birthday offer: 3 guests sent", "Review alert: 5 stars ✓"],
      nl: ["Live — 18 reservaties vandaag", "Personeelsplanning: gegenereerd", "Verjaardagsaanbod: 3 gasten verstuurd", "Review-melding: 5 sterren ✓"],
      fr: ["Live — 18 réservations aujourd'hui", "Planning personnel : généré", "Offre anniversaire : 3 invités envoyés", "Alerte avis : 5 étoiles ✓"],
      de: ["Live — 18 Reservierungen heute", "Personalplan: generiert", "Geburtstagsangebot: 3 Gäste gesendet", "Bewertungs-Alarm: 5 Sterne ✓"],
    },
    waLabel: { en: "WhatsApp · automatic", nl: "WhatsApp · automatisch", fr: "WhatsApp · automatique", de: "WhatsApp · automatisch" },
    waBody: { en: "Your table for 4 is confirmed Friday at 20:00. See you then!", nl: "Uw tafel voor 4 is bevestigd vrijdag om 20:00. Tot dan!", fr: "Votre table pour 4 est confirmée vendredi à 20:00. À bientôt !", de: "Ihr Tisch für 4 ist bestätigt Freitag um 20:00. Bis dann!" },
    waFoot: { en: "sent within 1 minute", nl: "verstuurd binnen 1 minuut", fr: "envoyé en 1 minute", de: "gesendet in 1 Minute" },
  },
};

const NAV_LABEL: L4<string[]> = {
  en: ["Overview", "Activity", "Schedule", "WhatsApp", "Invoices", "Settings"],
  nl: ["Overzicht", "Activiteit", "Planning", "WhatsApp", "Facturen", "Instellingen"],
  fr: ["Aperçu", "Activité", "Planning", "WhatsApp", "Factures", "Paramètres"],
  de: ["Übersicht", "Aktivität", "Planung", "WhatsApp", "Rechnungen", "Einstellungen"],
};

function useFade(key: string) {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    setVisible(false);
    const id = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(id);
  }, [key]);
  return visible;
}

export function DashboardMock() {
  const { lang } = useT();
  const { sector } = useSector();
  const key: SectorKey = sector ?? "vastgoed";
  const d = SECTORS_DATA[key];
  const visible = useFade(`${key}-${lang}`);

  const kpis = pick(d.kpis, lang);
  const rows = pick(d.rows, lang);
  const sidebarItems = pick(d.sidebarItems, lang);

  return (
    <div className="relative mx-auto max-w-5xl">
      <div
        className={`relative rounded-2xl border-hairline bg-gradient-card shadow-elevated overflow-hidden transition-opacity duration-300 ${visible ? "opacity-100" : "opacity-0"}`}
        style={{ boxShadow: "0 0 40px rgba(37,99,235,0.1), 0 24px 70px -22px rgba(0,0,0,0.7), 0 1px 0 rgba(255,255,255,0.06) inset" }}
      >
        {/* Top accent bar */}
        <div style={{ height: 3, background: "#2563EB", width: "100%" }} />

        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
          <div className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-white/10" />
            <span className="size-2.5 rounded-full bg-white/10" />
            <span className="size-2.5 rounded-full bg-white/10" />
          </div>
          <div className="ml-4 flex-1 max-w-md mx-auto">
            <div className="text-xs text-muted-foreground glass rounded-md px-3 py-1 text-center font-mono-tech">
              {pick(d.path, lang)}
            </div>
          </div>
          <div className="flex items-center gap-1.5 ml-2">
            <span className="size-1.5 rounded-full bg-emerald-400 animate-glow-pulse" style={{ boxShadow: "0 0 6px #10B981" }} />
            <span className="text-[10px] uppercase tracking-[0.18em] font-mono-tech" style={{ color: "#10B981" }}>LIVE</span>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-px bg-white/5">
          <div className="hidden md:flex col-span-2 flex-col gap-1 p-3 bg-surface">
            {pick(NAV_LABEL, lang).map((l, i) => (
              <div key={l} className={`text-xs px-2.5 py-1.5 rounded-md ${i === 0 ? "bg-white/5 text-foreground" : "text-muted-foreground"}`}>{l}</div>
            ))}
          </div>

          <div className="col-span-12 md:col-span-7 p-5 bg-surface space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {kpis.map((c, i) => (
                <div key={c.l} className="rounded-lg border-hairline bg-background/40 p-3">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-mono-tech">{c.l}</div>
                  <div className={`text-lg font-semibold mt-1 ${i === 2 ? "text-gradient-gold" : ""}`}>{c.v}</div>
                  <div className="text-[11px] text-muted-foreground">{c.t}</div>
                </div>
              ))}
            </div>

            <div className="rounded-lg border-hairline bg-background/40 p-4">
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                <Home className="size-3.5 text-primary" /> {pick(d.recentTitle, lang)}
              </div>
              <div className="space-y-2.5">
                {rows.map(r => (
                  <div key={r.n} className="flex items-center justify-between text-sm gap-3">
                    <div className="min-w-0">
                      <div className="font-medium truncate">{r.n}</div>
                      <div className="text-[11px] text-muted-foreground truncate">{r.p}</div>
                    </div>
                    <div className="text-[11px] flex items-center gap-1 text-success shrink-0">
                      <CheckCircle2 className="size-3" /> {r.s}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="hidden md:flex col-span-3 flex-col gap-3 p-4 bg-surface">
            <div className="rounded-lg border-hairline p-3">
              <div className="flex items-center gap-2 text-xs text-muted-foreground"><TrendingUp className="size-3.5 text-primary" /> {pick(d.sidebarLabel, lang)}</div>
              <div className="mt-3 space-y-2">
                {sidebarItems.map((it, i) => (
                  <div key={i} className="text-xs flex items-start gap-1.5">
                    {i === 0 ? (
                      <span className="size-1.5 mt-1.5 rounded-full bg-emerald-400 animate-glow-pulse shrink-0" style={{ boxShadow: "0 0 6px #10B981" }} />
                    ) : (
                      <CheckCircle2 className="size-3 text-success mt-0.5 shrink-0" />
                    )}
                    <span>{it}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-lg border-hairline p-3">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Bell className="size-3.5 text-gold" /> <Calendar className="size-3.5 text-primary" />
              </div>
              <div className="h-12 mt-2 flex items-end gap-1">
                {[40, 55, 48, 72, 60, 82, 95].map((h, i) => (
                  <div key={i} className="flex-1 rounded-sm bg-gradient-brand opacity-80" style={{ height: `${h}%` }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp popup — per sector */}
      <div className="hidden md:block absolute -left-6 top-32 w-60 animate-float">
        <div className={`glass rounded-xl p-3 shadow-elevated transition-opacity duration-300 ${visible ? "opacity-100" : "opacity-0"}`}>
          <div className="flex items-center gap-2 text-xs text-success">
            <MessageCircle className="size-3.5" /> {pick(d.waLabel, lang)}
          </div>
          <div className="text-sm mt-2">"{pick(d.waBody, lang)}"</div>
          <div className="text-[10px] text-muted-foreground mt-1">{pick(d.waFoot, lang)}</div>
        </div>
      </div>
    </div>
  );
}
