import { useState, useEffect, useRef } from 'react'
import {
  Building2, Heart, Activity, FileText, PenTool, Wrench, UtensilsCrossed,
  LayoutDashboard, MessageCircle, FileSearch, Calendar, BarChart2, Receipt, Bot,
  ArrowLeft, ChevronRight, Check, Lock, Calculator, X, TrendingUp, Clock,
  CheckCircle, Zap, Star, AlertCircle, Download, Send, Loader2
} from 'lucide-react'
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, BarChart, Bar
} from 'recharts'
import { sectorData } from './sectorData.js'

// ─── Constants ────────────────────────────────────────────────────────────────

const S = { background: '#060D1A', card: '#0D1B2E', border: '#1E2D45', accent: '#2563EB', textPrimary: '#F1F5F9', textSecondary: '#94A3B8', textMuted: '#475569' }

const PACKAGES = [
  { id: 'starter',  label: 'Starter',   price: 247, startup: 247, color: '#10B981' },
  { id: 'pro',      label: 'Pro',        price: 397, startup: 347, color: '#2563EB', badge: '★ Meest gekozen' },
  { id: 'allin',    label: 'All-in',     price: 597, startup: 497, color: '#8B5CF6' },
  { id: 'aiagent',  label: 'AI Agent',   price: 997, startup: 697, color: '#F59E0B', badge: '★ Premium' },
]

const PACKAGE_TABS = {
  starter:  ['overview', 'communicatie', 'agenda'],
  pro:      ['overview', 'communicatie', 'agenda', 'rapporten'],
  allin:    ['overview', 'communicatie', 'agenda', 'rapporten', 'admin'],
  aiagent:  ['overview', 'communicatie', 'agenda', 'rapporten', 'admin', 'ai'],
}
const PACKAGE_TABS_ACCOUNTANT = {
  starter:  ['overview', 'documenten', 'agenda'],
  pro:      ['overview', 'documenten', 'agenda', 'rapporten'],
  allin:    ['overview', 'documenten', 'agenda', 'rapporten', 'admin'],
  aiagent:  ['overview', 'documenten', 'agenda', 'rapporten', 'admin', 'ai'],
}
const ALL_TABS = [
  { id: 'overview',     label: 'Overzicht',           Icon: LayoutDashboard },
  { id: 'communicatie', label: 'Communicatie',         Icon: MessageCircle   },
  { id: 'documenten',   label: 'Documentverwerking',   Icon: FileSearch      },
  { id: 'agenda',       label: 'Agenda',               Icon: Calendar        },
  { id: 'rapporten',    label: 'Rapporten',             Icon: BarChart2       },
  { id: 'admin',        label: 'Administratie',         Icon: Receipt         },
  { id: 'ai',           label: 'AI Assistent',          Icon: Bot             },
]

const SECTORS = [
  { id: 'vastgoed',   name: 'Vastgoedmakelaars', tag: 'SELL / VERKOPEN',          Icon: Building2,       color: '#2563EB', desc: 'Bezichtigingen, leads & commissies automatiseren' },
  { id: 'tandarts',   name: 'Tandartsen',         tag: 'TREAT / BEHANDELEN',       Icon: Heart,           color: '#10B981', desc: 'Afspraken, herinneringen & facturatie automatiseren' },
  { id: 'kinesist',   name: 'Kinesisten',         tag: 'RESTORE / HERSTELLEN',     Icon: Activity,        color: '#F59E0B', desc: 'Sessies, oefeningen & patiëntopvolging automatiseren' },
  { id: 'accountant', name: 'Accountants',        tag: 'OPTIMISE / OPTIMALISEREN', Icon: FileText,        color: '#8B5CF6', desc: 'Factuurverwerking, BTW & rapportage automatiseren' },
  { id: 'architect',  name: 'Architecten',        tag: 'DESIGN / ONTWERPEN',       Icon: PenTool,         color: '#EF4444', desc: 'Projectopvolging, offertes & deadlines automatiseren' },
  { id: 'garage',     name: 'Garagebedrijven',    tag: 'REPAIR / HERSTELLEN',      Icon: Wrench,          color: '#06B6D4', desc: 'Werkorders, herinneringen & betalingen automatiseren' },
  { id: 'horeca',     name: 'Horeca',             tag: 'HOST / ONTHALEN',          Icon: UtensilsCrossed, color: '#F97316', desc: 'Reserveringen, allergieën & reviews automatiseren' },
]

const FEATURES = {
  vastgoed: {
    starter: ['WhatsApp chatbot beantwoordt veelgestelde vragen 24/7','Bezichtigingen automatisch inplannen via WhatsApp','Bevestiging + adres + parkeerinfo automatisch verstuurd','Herinnering 48u en 24u voor elke bezichtiging','Annulatie automatisch verwerkt en slot opnieuw vrijgegeven','Nieuwe leads automatisch toegevoegd aan uw CRM','Maandelijks overzichtsrapport automatisch in uw inbox'],
    pro:     ['AI schrijft een volledige woningbeschrijving binnen enkele minuten','Beschrijving beschikbaar in NL, FR en EN','Automatische follow-up na 48u zonder reactie van een lead','Leads automatisch gecategoriseerd op interesse in uw CRM','Sociale media post per nieuw pand automatisch gegenereerd','Wekelijks rapport met overzicht van leads en bezichtigingen','Prioriteit support binnen 4 werkuren'],
    allin:   ['Factuur automatisch aangemaakt na elke afgeronde verkoop of verhuur','Commissieberekening automatisch verwerkt per dossier','Kosten automatisch gecategoriseerd voor uw boekhouding','Maandoverzicht volledig klaar om door te sturen naar uw boekhouder','Verkoop- en verhuurcontracten automatisch opgesteld via template','Documenten per dossier automatisch geordend en gearchiveerd','Persoonlijke accountmanager — 1 vast aanspreekpunt'],
    aiagent: ['Eigen AI-assistent getraind op de toon en werking van uw kantoor','E-mails automatisch gelezen, gecategoriseerd en beantwoord','Volledig agendabeheer — AI plant, verschuift en bevestigt afspraken','Sentiment van klantberichten automatisch herkend — urgente zaken eerst','Wekelijks AI-overzicht: welke leads het meest actief zijn','Dagelijks rapport elke ochtend om 7u in uw inbox','Dedicated success team dat actief meedenkt over optimalisaties'],
  },
  tandarts: {
    starter: ['Afspraken automatisch inplannen via WhatsApp 24/7','Bevestiging automatisch verstuurd met praktijkinformatie','Herinnering 72u, 48u en 24u voor elke afspraak','No-show automatisch opgevolgd met persoonlijk bericht','Annulatie automatisch verwerkt en slot opnieuw vrijgegeven','Controle-afspraak automatisch voorgesteld na behandeling','Maandelijks overzichtsrapport automatisch in uw inbox'],
    pro:     ['Intakeformulier automatisch verstuurd voor het eerste bezoek','Antwoorden automatisch verwerkt in het patiëntdossier','Nazorginstructies automatisch verstuurd na een behandeling','Tevredenheidsenquête automatisch verstuurd na elke afspraak','Google Review-uitnodiging automatisch verstuurd aan tevreden patiënten','Veelgestelde vragen automatisch beantwoord via AI','Wekelijks rapport met bezettingsgraad en no-show cijfers','Prioriteit support binnen 4 werkuren'],
    allin:   ['Factuur automatisch aangemaakt na elke behandeling','Betalingsherinnering automatisch verstuurd bij openstaand bedrag','Patiëntendossier automatisch up-to-date gehouden','Maandoverzicht volledig klaar om door te sturen naar uw boekhouder','Documenten per patiënt automatisch geordend en gearchiveerd','Persoonlijke accountmanager — 1 vast aanspreekpunt'],
    aiagent: ['Eigen AI-assistent getraind op de toon en werking van uw praktijk','Behandelnotities automatisch omgezet van spraak naar tekst','Patiëntdossier automatisch aangevuld na elk gesprek','Sentiment van patiëntberichten automatisch herkend','Medicatie- en controleherinneringen automatisch verstuurd','Dagelijks rapport elke ochtend om 7u in uw inbox','Dedicated success team dat actief meedenkt over optimalisaties'],
  },
  kinesist: {
    starter: ['Sessies automatisch inplannen via WhatsApp 24/7','Reeks van meerdere sessies automatisch ingepland na eerste afspraak','Bevestiging en herinnering automatisch verstuurd voor elke sessie','No-show automatisch opgevolgd met persoonlijk bericht','Annulatie automatisch verwerkt en slot opnieuw vrijgegeven','Thuisoefeningen automatisch als PDF verstuurd na de sessie','Maandelijks overzichtsrapport automatisch in uw inbox'],
    pro:     ['Voortgang per patiënt automatisch bijgehouden per sessie','Dagelijkse oefenherinnering automatisch verstuurd aan patiënten','Tevredenheidsenquête automatisch verstuurd na een sessiereeks','Voortgangsoverzicht automatisch opgesteld per patiënt','Google Review-uitnodiging automatisch verstuurd','Wekelijks rapport met overzicht van sessies en voortgang','Prioriteit support binnen 4 werkuren'],
    allin:   ["Factuur automatisch aangemaakt per sessie of per reeks","Betalingsherinnering automatisch verstuurd bij openstaand bedrag","Patiëntendossier automatisch up-to-date gehouden","Maandoverzicht volledig klaar om door te sturen naar uw boekhouder","Documenten per patiënt automatisch geordend en gearchiveerd","Persoonlijke accountmanager — 1 vast aanspreekpunt"],
    aiagent: ["Eigen AI-assistent getraind op de toon en werking van uw praktijk","Behandelnotities automatisch omgezet van spraak naar tekst","Patiëntdossier automatisch aangevuld na elke sessie","Oefenschema's automatisch aangepast op basis van voortgang","Sentiment van patiëntberichten automatisch herkend","Dagelijks rapport elke ochtend om 7u in uw inbox","Dedicated success team dat actief meedenkt over optimalisaties"],
  },
  accountant: {
    starter: ['Facturen automatisch ontvangen en verwerkt via OCR','Factuurgegevens automatisch klaargezet voor uw boekhoudpakket','Bankafschriften automatisch gematcht met facturen','Betalingsherinneringen automatisch verstuurd aan klanten','Veelgestelde klantvragen automatisch beantwoord via AI','Deadlines per klant automatisch bijgehouden','Maandelijks overzichtsrapport automatisch in uw inbox'],
    pro:     ['Facturen met meerdere documenten automatisch gesplitst en herkend','Dubbele facturen automatisch gedetecteerd en gemeld','Herinnering automatisch verstuurd bij naderende deadline','Ontbrekende documenten automatisch opgevraagd bij de klant','Klant automatisch op de hoogte gehouden van dossierstatus','Nieuw klantdossier automatisch aangemaakt en gestructureerd','Wekelijks rapport per klant met openstaande acties','Prioriteit support binnen 4 werkuren'],
    allin:   ['Voorbereidende cijfers voor BTW-aangifte automatisch klaargezet','Voorbereidende cijfers voor jaarrekening automatisch klaargezet','Facturatie aan uw eigen klanten automatisch verwerkt','Urenregistratie automatisch verwerkt naar facturatie','Maandoverzicht volledig klaar voor eindcontrole','Documenten per dossier automatisch geordend en gearchiveerd','Persoonlijke accountmanager — 1 vast aanspreekpunt'],
    aiagent: ['Eigen AI-assistent getraind op de werking van uw kantoor','AI signaleert automatisch ongebruikelijke afwijkingen in cijfers','Cashflow-overzicht automatisch opgesteld per klant','Vergelijking met vorige periodes automatisch opgesteld','E-mails automatisch gelezen, gecategoriseerd en beantwoord','Dagelijks rapport elke ochtend om 7u in uw inbox','Dedicated success team dat actief meedenkt over optimalisaties'],
  },
  architect: {
    starter: ['Afspraken automatisch inplannen via WhatsApp','Vergaderingen automatisch ingepland en bevestigd','Projectupdates automatisch verstuurd naar klanten','Documenten per project automatisch geordend en gearchiveerd','Herinneringen voor lopende deadlines automatisch verstuurd','Maandelijks overzichtsrapport automatisch in uw inbox'],
    pro:     ['Offerte automatisch opgesteld op basis van uw eigen template','Offerte automatisch verstuurd en opvolging automatisch herinnerd','Goedkeuring van de klant automatisch verwerkt en gelogd','Notulen van vergaderingen automatisch uitgewerkt via AI','Meerwerken automatisch genoteerd en gecommuniceerd naar de klant','Wekelijks rapport per project met status en acties','Prioriteit support binnen 4 werkuren'],
    allin:   ['Factuur automatisch aangemaakt per projectfase','Urenregistratie automatisch verwerkt naar facturatie','Kosten per project automatisch bijgehouden','Leveranciersfacturen automatisch verwerkt','Maandoverzicht volledig klaar om door te sturen naar uw boekhouder','Persoonlijke accountmanager — 1 vast aanspreekpunt'],
    aiagent: ['Eigen AI-assistent getraind op de werking van uw kantoor','AI helpt bij het opstellen van projectbeschrijvingen en teksten','E-mails automatisch gelezen, gecategoriseerd en beantwoord','Budgetoverzicht per project automatisch up-to-date gehouden','Vergelijking met eerdere gelijkaardige projecten automatisch opgesteld','Dagelijks rapport elke ochtend om 7u in uw inbox','Dedicated success team dat actief meedenkt over optimalisaties'],
  },
  garage: {
    starter: ['Klant automatisch verwittigd bij binnenkomst van het voertuig','Statusupdate automatisch verstuurd tijdens de herstelling','Klant automatisch verwittigd zodra het voertuig klaar is','Factuur en betaallink automatisch verstuurd','Onderhoudsherinnering automatisch verstuurd, ongeveer 1 jaar later','Herinnering voor technische keuring automatisch verstuurd','Maandelijks overzichtsrapport automatisch in uw inbox'],
    pro:     ['Offerte automatisch opgesteld op basis van het gemelde probleem','Offerte automatisch verstuurd en opvolging via WhatsApp','Seizoensgebonden herinnering voor bandenwissel automatisch verstuurd','Tevredenheidsenquête automatisch verstuurd na elke herstelling','Google Review-uitnodiging automatisch verstuurd','Wekelijks rapport met overzicht van herstellingen en omzet','Prioriteit support binnen 4 werkuren'],
    allin:   ['Werkorder automatisch aangemaakt per herstelling','Garantiedossier automatisch bijgehouden per voertuig','Factuur automatisch aangemaakt na elke herstelling','Maandoverzicht volledig klaar om door te sturen naar uw boekhouder','Documenten per voertuig automatisch geordend en gearchiveerd','Persoonlijke accountmanager — 1 vast aanspreekpunt'],
    aiagent: ["Eigen AI-assistent getraind op de werking van uw garage","Eerste inschatting van schade op basis van foto's via AI","E-mails automatisch gelezen, gecategoriseerd en beantwoord","Klantgeschiedenis automatisch herkend bij nieuw contact","Werkplanning automatisch overzichtelijk gehouden per dag","Dagelijks rapport elke ochtend om 7u in uw inbox","Dedicated success team dat actief meedenkt over optimalisaties"],
  },
  horeca: {
    starter: ['Reserveringen automatisch verwerkt via WhatsApp','Bevestiging automatisch verstuurd naar de gast','Herinnering de dag voor de reservering automatisch verstuurd','No-show automatisch opgevolgd en tafel opnieuw vrijgegeven','Allergieën automatisch genoteerd bij de reservering','Speciale gelegenheden automatisch genoteerd bij de reservering','Maandelijks overzichtsrapport automatisch in uw inbox'],
    pro:     ['Personeelsplanning automatisch opgesteld op basis van beschikbaarheid','Beschikbaarheden automatisch verzameld bij het team','Wijzigingen in planning automatisch gecommuniceerd naar het team','Feedback na bezoek automatisch opgevraagd bij gasten','Google Reviews automatisch gemonitord','Negatieve review automatisch en onmiddellijk gemeld aan de zaakvoerder','Wekelijks rapport met overzicht van reserveringen en feedback','Prioriteit support binnen 4 werkuren'],
    allin:   ['Verjaardagsbericht automatisch verstuurd naar vaste gasten','Seizoensaanbiedingen automatisch gecommuniceerd naar uw mailinglijst','Voorraad automatisch bijgehouden op basis van bestellingen','Bestelherinnering automatisch verstuurd bij lage voorraad','Dagomzet automatisch samengevat in uw rapport','Persoonlijke accountmanager — 1 vast aanspreekpunt'],
    aiagent: ['Eigen AI-assistent getraind op de werking van uw zaak','Vaste gasten automatisch herkend bij nieuwe reservering','Sociale media posts automatisch voorgesteld op basis van uw menu','E-mails automatisch gelezen, gecategoriseerd en beantwoord','Reserveringspatronen automatisch samengevat per week','Dagelijks rapport elke ochtend om 7u in uw inbox','Dedicated success team dat actief meedenkt over optimalisaties'],
  },
}

const AI_EXAMPLES = {
  vastgoed:   ['Schrijf een woningbeschrijving voor villa 320m² in Gent (NL/FR/EN)', 'Analyseer de leads van afgelopen week en geef prioriteiten', 'Stel een follow-up e-mail op voor lead Thomas De Smet'],
  tandarts:   ['Verwerk behandelnotities van vanmiddag naar het patiëntdossier', 'Stuur herinneringen aan alle patiënten van volgende week', 'Analyseer no-show patronen van de afgelopen maand'],
  kinesist:   ['Pas het oefenschema van Jana aan op basis van haar laatste voortgang', 'Genereer PDF met thuisoefeningen voor schouderletsels', 'Stel een progressierapport op voor patiënt Mark Hermans'],
  accountant: ['Detecteer afwijkingen in de cijfers van BVBA Hermans', 'Maak een cashflow-overzicht voor NV Peeters', 'Beantwoord de factuurvraag van klant automatisch'],
  architect:  ['Stel een projectbeschrijving op voor renovatie villa De Backer', 'Analyseer budget vs. werkelijke kosten voor project Vandeputte', 'Beantwoord e-mail over fase 2 factuur'],
  garage:     ["Beoordeel schade-foto's van de Toyota Yaris", 'Stel werkplanning op voor morgen op basis van openstaande opdrachten', 'Herkende klant — stel onderhoud voor op basis van historiek'],
  horeca:     ['Stel 3 sociale media posts voor op basis van het seizoensmenu', 'Analyseer reserveringspatronen van deze maand', 'Wat zijn de voorkeuren van vaste gast Dirk Bogaert?'],
}

// ─── Shared UI ────────────────────────────────────────────────────────────────

function Card({ children, style = {} }) {
  return (
    <div style={{ background: S.card, border: `1px solid ${S.border}`, borderRadius: 12, ...style }}>
      {children}
    </div>
  )
}

function Badge({ children, color }) {
  return (
    <span style={{ background: `${color}22`, color, border: `1px solid ${color}44`, borderRadius: 6, padding: '2px 10px', fontSize: 11, fontWeight: 600, whiteSpace: 'nowrap' }}>
      {children}
    </span>
  )
}

function StatusBadge({ status }) {
  const map = {
    'Verwerkt':            { bg: '#10B98118', color: '#10B981' },
    'Klaar voor boekhouder':{ bg: '#2563EB18', color: '#60A5FA' },
    'In behandeling':      { bg: '#F59E0B18', color: '#F59E0B' },
    'Betaald':             { bg: '#10B98118', color: '#10B981' },
    'Openstaand':          { bg: '#EF444418', color: '#EF4444' },
    'Fout':                { bg: '#EF444418', color: '#EF4444' },
  }
  const cfg = map[status] || { bg: '#94A3B818', color: '#94A3B8' }
  return <span style={{ ...cfg, borderRadius: 6, padding: '3px 10px', fontSize: 12, fontWeight: 600 }}>{status}</span>
}

// ─── EDA Systems Logo SVG ─────────────────────────────────────────────────────

function EDALogo({ size = 120, compact = false }) {
  const s = size
  if (compact) return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <svg width={s} height={s} viewBox="0 0 36 36" fill="none">
        {/* House */}
        <polyline points="4,20 18,8 32,20" stroke="#CBD5E1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <rect x="13" y="15" width="5" height="5" rx="0.5" stroke="#CBD5E1" strokeWidth="1.2" fill="none"/>
        {/* Building left */}
        <rect x="5" y="15" width="6" height="9" stroke="#94A3B8" strokeWidth="1.2" fill="none"/>
        <line x1="7" y1="17" x2="9" y2="17" stroke="#94A3B8" strokeWidth="0.7"/>
        <line x1="7" y1="19" x2="9" y2="19" stroke="#94A3B8" strokeWidth="0.7"/>
        {/* AI chip right */}
        <rect x="22" y="13" width="8" height="8" rx="1" fill="#1E3A5F" stroke="#2563EB" strokeWidth="1.2"/>
        <text x="26" y="19.5" textAnchor="middle" fontSize="4.5" fontWeight="700" fill="#2563EB" fontFamily="Arial">AI</text>
        <line x1="24" y1="13" x2="24" y2="11" stroke="#2563EB" strokeWidth="0.8"/>
        <line x1="27" y1="13" x2="27" y2="11" stroke="#2563EB" strokeWidth="0.8"/>
        <line x1="30" y1="16" x2="32" y2="16" stroke="#2563EB" strokeWidth="0.8"/>
        <line x1="30" y1="19" x2="32" y2="19" stroke="#2563EB" strokeWidth="0.8"/>
        <circle cx="24" cy="11" r="1" fill="#2563EB"/>
        <circle cx="27" cy="11" r="1" fill="#2563EB"/>
        <circle cx="32" cy="16" r="1" fill="#2563EB"/>
        <circle cx="32" cy="19" r="1" fill="#2563EB"/>
      </svg>
      <div>
        <div style={{ fontSize: 15, fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1 }}>
          <span style={{ color: '#2563EB' }}>EDA</span>
          <span style={{ color: '#F1F5F9' }}> SYSTEMS</span>
        </div>
      </div>
    </div>
  )
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <svg width={s} height={s * 0.75} viewBox="0 0 200 150" fill="none">
        {/* Glow circle bg */}
        <circle cx="105" cy="60" r="55" fill="#0D1B2E" opacity="0.8"/>
        {/* House roof */}
        <polyline points="30,95 100,35 170,95" stroke="#CBD5E1" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        {/* Window */}
        <rect x="88" y="72" width="24" height="23" rx="1" stroke="#CBD5E1" strokeWidth="2.5" fill="none"/>
        <line x1="100" y1="72" x2="100" y2="95" stroke="#CBD5E1" strokeWidth="1.5"/>
        <line x1="88" y1="83" x2="112" y2="83" stroke="#CBD5E1" strokeWidth="1.5"/>
        {/* Building left */}
        <rect x="32" y="60" width="32" height="38" stroke="#94A3B8" strokeWidth="2" fill="none"/>
        <line x1="40" y1="68" x2="56" y2="68" stroke="#94A3B8" strokeWidth="1.2"/>
        <line x1="40" y1="76" x2="56" y2="76" stroke="#94A3B8" strokeWidth="1.2"/>
        <line x1="40" y1="84" x2="56" y2="84" stroke="#94A3B8" strokeWidth="1.2"/>
        {/* AI chip */}
        <rect x="118" y="28" width="42" height="42" rx="4" fill="#0D1B2E" stroke="#2563EB" strokeWidth="2.5"/>
        <text x="139" y="56" textAnchor="middle" fontSize="18" fontWeight="800" fill="#2563EB" fontFamily="Arial, sans-serif">AI</text>
        {/* Circuit lines */}
        <line x1="128" y1="28" x2="128" y2="18" stroke="#2563EB" strokeWidth="1.8"/>
        <line x1="139" y1="28" x2="139" y2="14" stroke="#2563EB" strokeWidth="1.8"/>
        <line x1="150" y1="28" x2="150" y2="18" stroke="#2563EB" strokeWidth="1.8"/>
        <line x1="160" y1="40" x2="172" y2="40" stroke="#2563EB" strokeWidth="1.8"/>
        <line x1="160" y1="52" x2="176" y2="52" stroke="#2563EB" strokeWidth="1.8"/>
        <line x1="160" y1="62" x2="172" y2="62" stroke="#2563EB" strokeWidth="1.8"/>
        <circle cx="128" cy="17" r="3" fill="#2563EB"/>
        <circle cx="139" cy="13" r="3" fill="#2563EB"/>
        <circle cx="150" cy="17" r="3" fill="#2563EB"/>
        <circle cx="173" cy="40" r="3" fill="#2563EB" opacity="0.6"/>
        <circle cx="177" cy="52" r="3" fill="#2563EB"/>
        <circle cx="173" cy="62" r="3" fill="#2563EB" opacity="0.6"/>
        {/* Ground line */}
        <line x1="20" y1="98" x2="180" y2="98" stroke="#475569" strokeWidth="1.5"/>
      </svg>
      {/* Text */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 4 }}>
        <span style={{ fontSize: s * 0.18, fontWeight: 800, color: '#2563EB', letterSpacing: '0.05em', fontFamily: 'Inter, sans-serif' }}>EDA</span>
        <span style={{ fontSize: s * 0.18, fontWeight: 800, color: '#F1F5F9', letterSpacing: '0.05em', fontFamily: 'Inter, sans-serif' }}>SYSTEMS</span>
      </div>
      <div style={{ fontSize: s * 0.075, color: '#475569', marginTop: 4, letterSpacing: '0.03em' }}>
        — Ready to put your business on autopilot? —
      </div>
    </div>
  )
}

// ─── Circuit Board Animation ──────────────────────────────────────────────────

function CircuitBoard() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const GRID = 44
    let segments = [], nodes = [], nodeSet = new Set(), pulses = []

    function distFromCenter(x, y) {
      const W = canvas.width, H = canvas.height
      const dx = Math.abs(x - W / 2) / (W / 2)
      const dy = Math.abs(y - H / 2) / (H / 2)
      return Math.max(dx, dy) // 0=center, 1=edge
    }

    function snap(v) { return Math.round(v / GRID) * GRID }

    function addNode(x, y) {
      const key = `${x},${y}`
      if (!nodeSet.has(key)) {
        nodeSet.add(key)
        nodes.push({ x, y, filled: Math.random() < 0.55, pulse: 0 })
      }
    }

    function generate() {
      segments = []; nodes = []; nodeSet = new Set(); pulses = []
      const W = canvas.width, H = canvas.height

      // 70 walkers launched from all 4 edges
      for (let i = 0; i < 70; i++) {
        const edge = i % 4
        let x, y, dx, dy
        if (edge === 0) { x = snap(Math.random() * W); y = 0; dx = 0; dy = GRID }
        else if (edge === 1) { x = snap(Math.random() * W); y = snap(H); dx = 0; dy = -GRID }
        else if (edge === 2) { x = 0; y = snap(Math.random() * H); dx = GRID; dy = 0 }
        else { x = snap(W); y = snap(Math.random() * H); dx = -GRID; dy = 0 }

        let cx = x, cy = y
        const steps = 5 + Math.floor(Math.random() * 14)
        for (let s = 0; s < steps; s++) {
          const dist = distFromCenter(cx, cy)
          // Stop more aggressively near center (dist < 0.35 = center zone)
          if (dist < 0.35 && Math.random() < 0.88) break
          if (dist < 0.55 && Math.random() < 0.45) break

          const nx = cx + dx, ny = cy + dy
          if (nx < -GRID || nx > W + GRID || ny < -GRID || ny > H + GRID) break

          segments.push({ x1: cx, y1: cy, x2: nx, y2: ny })
          addNode(cx, cy)
          addNode(nx, ny)
          cx = nx; cy = ny

          // Turn 90° sometimes
          if (Math.random() < 0.30) {
            if (dx !== 0) { dx = 0; dy = Math.random() < 0.5 ? GRID : -GRID }
            else { dy = 0; dx = Math.random() < 0.5 ? GRID : -GRID }
          }
        }
      }

      // Seed initial pulses
      for (let i = 0; i < 18; i++) spawnPulse()
    }

    function spawnPulse() {
      if (!segments.length) return
      const seg = segments[Math.floor(Math.random() * segments.length)]
      pulses.push({
        seg,
        t: Math.random(),
        speed: 0.0025 + Math.random() * 0.004,
        len: 0.18 + Math.random() * 0.22,
        col: Math.random() < 0.78 ? '#2563EB' : '#ffffff',
      })
    }

    let animId, lastTime = 0
    const FRAME = 1000 / 30

    function draw(ts) {
      animId = requestAnimationFrame(draw)
      if (document.hidden || ts - lastTime < FRAME) return
      lastTime = ts

      const W = canvas.width, H = canvas.height
      ctx.clearRect(0, 0, W, H)

      // Lines
      ctx.strokeStyle = '#1E3A5F'
      ctx.lineWidth = 0.7
      ctx.lineCap = 'square'
      for (const seg of segments) {
        ctx.beginPath()
        ctx.moveTo(seg.x1, seg.y1)
        ctx.lineTo(seg.x2, seg.y2)
        ctx.stroke()
      }

      // Pulses
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i]
        p.t += p.speed
        if (p.t > 1 + p.len) {
          pulses.splice(i, 1)
          if (Math.random() < 0.85) spawnPulse()
          continue
        }
        const t1 = Math.max(0, p.t - p.len), t2 = Math.min(1, p.t)
        const px1 = p.seg.x1 + (p.seg.x2 - p.seg.x1) * t1
        const py1 = p.seg.y1 + (p.seg.y2 - p.seg.y1) * t1
        const px2 = p.seg.x1 + (p.seg.x2 - p.seg.x1) * t2
        const py2 = p.seg.y1 + (p.seg.y2 - p.seg.y1) * t2
        if (px1 === px2 && py1 === py2) continue

        const g = ctx.createLinearGradient(px1, py1, px2, py2)
        g.addColorStop(0, p.col + '00')
        g.addColorStop(0.5, p.col + 'cc')
        g.addColorStop(1, p.col + '00')
        ctx.save()
        ctx.strokeStyle = g
        ctx.lineWidth = 1.8
        ctx.shadowColor = p.col
        ctx.shadowBlur = 10
        ctx.beginPath()
        ctx.moveTo(px1, py1)
        ctx.lineTo(px2, py2)
        ctx.stroke()
        ctx.restore()
      }

      // Nodes
      for (const n of nodes) {
        if (n.filled) {
          ctx.save()
          ctx.fillStyle = '#2563EB'
          ctx.shadowColor = '#2563EB'
          ctx.shadowBlur = 10
          ctx.beginPath()
          ctx.arc(n.x, n.y, 2.8, 0, Math.PI * 2)
          ctx.fill()
          ctx.restore()
        } else {
          ctx.strokeStyle = '#1E3A5F'
          ctx.lineWidth = 0.8
          ctx.beginPath()
          ctx.arc(n.x, n.y, 2.2, 0, Math.PI * 2)
          ctx.stroke()
        }
      }
    }

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      generate()
    }

    window.addEventListener('resize', resize)
    resize()
    animId = requestAnimationFrame(draw)
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])

  return (
    <canvas ref={canvasRef} style={{
      position: 'fixed', inset: 0, zIndex: 0,
      opacity: 0.35, pointerEvents: 'none',
    }} />
  )
}

// ─── Landing Screen ───────────────────────────────────────────────────────────

function LandingScreen({ onSelect }) {
  const [hovered, setHovered] = useState(null)
  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: S.background, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 24px' }}>
      <CircuitBoard />
      {/* Content above canvas */}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      {/* Logo */}
      <div style={{ marginBottom: 24, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <EDALogo size={160} />
      </div>
      <div style={{ fontSize: 13, color: S.textMuted, letterSpacing: '0.1em', fontWeight: 600, marginBottom: 8 }}>INTERACTIEVE SALES DEMO</div>
      <h1 style={{ fontSize: 32, fontWeight: 800, color: '#fff', textAlign: 'center', letterSpacing: '-0.03em', marginBottom: 8 }}>
        Selecteer uw sector
      </h1>
      <p style={{ color: S.textSecondary, fontSize: 15, marginBottom: 48, textAlign: 'center', maxWidth: 480 }}>
        Ontdek hoe het systeem er voor uw specifieke business eruitziet en werkt
      </p>

      {/* Sector grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16, width: '100%', maxWidth: 900 }}>
        {SECTORS.map(({ id, name, tag, Icon, color, desc }) => (
          <button
            key={id}
            onClick={() => onSelect(id)}
            onMouseEnter={() => setHovered(id)}
            onMouseLeave={() => setHovered(null)}
            style={{
              background: hovered === id ? `${color}10` : S.card,
              border: `1px solid ${hovered === id ? color : S.border}`,
              borderRadius: 14,
              padding: '20px 22px',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.18s ease',
              transform: hovered === id ? 'translateY(-2px)' : 'none',
              boxShadow: hovered === id ? `0 8px 32px ${color}22` : 'none',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
              <div style={{ width: 44, height: 44, background: `${color}18`, border: `1px solid ${color}33`, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={22} color={color} />
              </div>
              <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', color, background: `${color}18`, border: `1px solid ${color}33`, borderRadius: 4, padding: '3px 8px' }}>
                {tag}
              </span>
            </div>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 6 }}>{name}</div>
            <div style={{ fontSize: 13, color: S.textSecondary, lineHeight: 1.5 }}>{desc}</div>
            <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', gap: 6, color, fontSize: 12, fontWeight: 600 }}>
              Demo bekijken <ChevronRight size={14} />
            </div>
          </button>
        ))}
      </div>

      <div style={{ marginTop: 48, fontSize: 12, color: S.textMuted, textAlign: 'center' }}>
        EDA Systems · Belgisch digitaliseringsbedrijf · Alle pakketten excl. 21% BTW
      </div>
      </div>{/* end content wrapper */}
    </div>
  )
}

// ─── Package Toggle ───────────────────────────────────────────────────────────

function PackageToggle({ pkg, setPkg }) {
  return (
    <div style={{ display: 'flex', gap: 4, background: '#060D1A', border: `1px solid ${S.border}`, borderRadius: 10, padding: 4 }}>
      {PACKAGES.map(p => (
        <button
          key={p.id}
          onClick={() => setPkg(p.id)}
          style={{
            padding: '7px 14px', borderRadius: 7, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600,
            background: pkg === p.id ? p.color : 'transparent',
            color: pkg === p.id ? '#fff' : S.textSecondary,
            transition: 'all 0.15s',
            whiteSpace: 'nowrap',
          }}
        >
          {p.label}
          {p.badge && pkg === p.id && <span style={{ marginLeft: 4, fontSize: 10 }}>{p.badge.split(' ')[0]}</span>}
        </button>
      ))}
    </div>
  )
}

// ─── ROI Calculator ───────────────────────────────────────────────────────────

function ROICalculator({ onClose, pkg }) {
  const [hours, setHours] = useState(14)
  const [rate, setRate] = useState(70)
  const saved = Math.max(0, hours - 2.5)
  const savings = saved * rate
  const price = PACKAGES.find(p => p.id === pkg)?.price || 397
  const roi = price > 0 ? Math.round((savings - price) / price * 100) : 0
  const payback = savings > 0 ? (price / savings).toFixed(1) : '—'

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}
      onClick={e => e.target === e.currentTarget && onClose()}>
      <Card style={{ width: '100%', maxWidth: 480, padding: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Calculator size={20} color={S.accent} />
            <span style={{ fontSize: 18, fontWeight: 700, color: '#fff' }}>ROI Calculator</span>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: S.textSecondary, padding: 4, borderRadius: 6 }}>
            <X size={20} />
          </button>
        </div>
        {[
          { label: 'Huidige uren/maand aan administratie', val: hours, set: setHours, min: 5, max: 20, unit: 'u', color: S.accent },
          { label: 'Gemiddeld uurloon', val: rate, set: setRate, min: 40, max: 120, unit: '€', prefix: true, color: '#10B981' },
        ].map(({ label, val, set, min, max, unit, prefix, color }) => (
          <div key={label} style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: 13, color: S.textSecondary }}>{label}</span>
              <span style={{ fontSize: 14, fontWeight: 700, color }}>{prefix ? `${unit}${val}` : `${val}${unit}`}</span>
            </div>
            <input type="range" min={min} max={max} value={val} onChange={e => set(+e.target.value)}
              style={{ width: '100%', accentColor: color }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: S.textMuted, marginTop: 4 }}>
              <span>{prefix ? `${unit}${min}` : `${min}${unit}`}</span>
              <span>{prefix ? `${unit}${max}` : `${max}${unit}`}</span>
            </div>
          </div>
        ))}
        <div style={{ background: '#0a2540', border: '1px solid #1e40af', borderRadius: 8, padding: '12px 16px', fontSize: 13, color: '#60a5fa', marginBottom: 20 }}>
          💡 Van {hours}u/maand naar ~2-3u/maand = <strong>{saved.toFixed(1)} uur bespaard</strong> (waarde: €{savings.toFixed(0)} aan €{rate}/uur)
        </div>
        <div style={{ background: S.background, border: `1px solid ${S.border}`, borderRadius: 10, padding: 20 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: S.textMuted, letterSpacing: '0.1em', marginBottom: 16 }}>RESULTATEN</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { label: 'Uren bespaard/maand', val: `${saved.toFixed(1)} uur`, color: S.accent },
              { label: 'Kostenbesparing/maand', val: `€${savings.toFixed(0)}`, color: '#10B981' },
              { label: `Pakketprijs (${PACKAGES.find(p=>p.id===pkg)?.label})`, val: `€${price}/mnd`, color: '#8B5CF6' },
              { label: 'ROI', val: `${roi}%`, color: '#F59E0B' },
            ].map(({ label, val, color }) => (
              <div key={label} style={{ background: S.card, borderRadius: 8, padding: '12px 14px' }}>
                <div style={{ fontSize: 11, color: S.textMuted, marginBottom: 4 }}>{label}</div>
                <div style={{ fontSize: 22, fontWeight: 700, color }}>{val}</div>
              </div>
            ))}
          </div>
          <div style={{ borderTop: `1px solid ${S.border}`, marginTop: 16, paddingTop: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 13, color: S.textSecondary }}>Terugverdientijd</span>
            <span style={{ fontSize: 18, fontWeight: 700, color: '#fff' }}>{payback} maanden</span>
          </div>
        </div>
      </Card>
    </div>
  )
}

// ─── Overview Tab ─────────────────────────────────────────────────────────────

function OverviewTab({ sectorId, sectorDef, pkg }) {
  const data = sectorData[sectorId]
  const pkgOrder = ['starter', 'pro', 'allin', 'aiagent']
  const currentIdx = pkgOrder.indexOf(pkg)
  const upgradeName = { starter: '', pro: 'Pro', allin: 'All-in', aiagent: 'AI Agent' }
  const allFeatures = pkgOrder.flatMap(p => (FEATURES[sectorId]?.[p] || []).map(f => ({ text: f, pkg: p })))

  const metrics = data?.metrics || {}
  const metricColors = [sectorDef.color, '#10B981', '#F59E0B', '#8B5CF6']
  const metricEntries = Object.entries(metrics)

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null
    return (
      <div style={{ background: '#1E2D45', border: `1px solid ${S.border}`, borderRadius: 8, padding: '10px 14px' }}>
        <div style={{ color: '#fff', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>{label}</div>
        {payload.map(p => (
          <div key={p.dataKey} style={{ color: p.color, fontSize: 12 }}>{p.name}: {p.value}u</div>
        ))}
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 16 }}>
        {metricEntries.map(([k, v], i) => (
          <Card key={k} style={{ padding: '20px 22px' }}>
            <div style={{ width: 36, height: 36, background: `${metricColors[i % 4]}18`, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
              <TrendingUp size={18} color={metricColors[i % 4]} />
            </div>
            <div style={{ fontSize: 12, color: S.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>{k}</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: metricColors[i % 4], letterSpacing: '-0.02em' }}>{String(v)}</div>
          </Card>
        ))}
      </div>

      {/* Chart */}
      {data?.chartData && (
        <Card style={{ padding: 24 }}>
          <div style={{ marginBottom: 20 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 4 }}>Tijdsbesparing — uren administratie per maand</h3>
            <p style={{ fontSize: 13, color: S.textSecondary }}>Vergelijking vóór EDA vs. met EDA Systems</p>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={data.chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke={S.border} vertical={false} />
              <XAxis dataKey="month" tick={{ fill: S.textSecondary, fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: S.textSecondary, fontSize: 12 }} axisLine={false} tickLine={false} unit="u" />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ color: S.textSecondary, fontSize: 12 }} />
              <Line type="monotone" dataKey="voor" name="Vóór EDA" stroke="#EF4444" strokeWidth={2.5} dot={{ fill: '#EF4444', r: 4, strokeWidth: 0 }} />
              <Line type="monotone" dataKey="met"  name="Met EDA"  stroke={sectorDef.color} strokeWidth={2.5} dot={{ fill: sectorDef.color, r: 4, strokeWidth: 0 }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      )}

      {/* Feature checklist */}
      <Card style={{ padding: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>Inbegrepen features</h3>
          <Badge color={PACKAGES.find(p => p.id === pkg)?.color}>{PACKAGES.find(p => p.id === pkg)?.label} pakket</Badge>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {allFeatures.map((f, i) => {
            const idx = pkgOrder.indexOf(f.pkg)
            const unlocked = idx <= currentIdx
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, opacity: unlocked ? 1 : 0.4 }}>
                {unlocked
                  ? <Check size={15} color={sectorDef.color} style={{ flexShrink: 0, marginTop: 2 }} />
                  : <Lock size={13} color={S.textMuted} style={{ flexShrink: 0, marginTop: 3 }} />}
                <span style={{ fontSize: 13, color: unlocked ? '#CBD5E1' : S.textMuted, lineHeight: 1.6 }}>
                  {f.text}
                  {!unlocked && (
                    <span style={{ marginLeft: 8, fontSize: 11, color: S.accent, fontWeight: 600 }}>
                      Upgrade naar {upgradeName[f.pkg]}
                    </span>
                  )}
                </span>
              </div>
            )
          })}
        </div>
      </Card>
    </div>
  )
}

// ─── WhatsApp Tab ─────────────────────────────────────────────────────────────

function WhatsAppTab({ sectorId, sectorDef, liveMode }) {
  const convs = sectorData[sectorId]?.whatsappConversations || []
  const [activeIdx, setActiveIdx] = useState(0)
  const [messages, setMessages] = useState(convs[0]?.messages || [])
  const [typing, setTyping] = useState(false)
  const [liveQueue, setLiveQueue] = useState([])
  const endRef = useRef(null)

  useEffect(() => {
    const conv = convs[activeIdx]
    if (conv) setMessages(conv.messages)
  }, [activeIdx, sectorId])

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  // Live demo: add messages periodically
  useEffect(() => {
    if (!liveMode) return
    const conv = convs[activeIdx]
    if (!conv) return
    let idx = conv.messages.length
    const timer = setInterval(() => {
      const extra = [
        { id: idx++, sender: 'user', text: 'Heeft u ook een pand in de buurt van het centrum?', time: new Date().toLocaleTimeString('nl-BE', { hour: '2-digit', minute: '2-digit' }) },
        { id: idx++, sender: 'ai', text: 'Ja! We hebben momenteel 3 panden in het centrum beschikbaar. Zal ik u de details sturen? 🏠', time: new Date().toLocaleTimeString('nl-BE', { hour: '2-digit', minute: '2-digit' }) },
      ]
      const msg = extra.shift()
      if (!msg) return
      setTyping(true)
      setTimeout(() => {
        setTyping(false)
        setMessages(prev => [...prev, msg])
      }, 1400)
    }, 5000)
    return () => clearInterval(timer)
  }, [liveMode, activeIdx, sectorId])

  if (convs.length === 0) {
    return (
      <Card style={{ padding: 40, textAlign: 'center' }}>
        <AlertCircle size={32} color={S.textMuted} style={{ margin: '0 auto 12px' }} />
        <div style={{ color: S.textSecondary }}>Geen WhatsApp-gesprekken beschikbaar voor deze sector.</div>
      </Card>
    )
  }

  const conv = convs[activeIdx]

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 16, height: 520 }}>
      {/* Contact list */}
      <Card style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '14px 16px', borderBottom: `1px solid ${S.border}`, fontSize: 12, fontWeight: 700, color: S.textMuted, letterSpacing: '0.1em' }}>GESPREKKEN</div>
        {convs.map((c, i) => (
          <button key={c.id} onClick={() => setActiveIdx(i)}
            style={{ width: '100%', padding: '12px 14px', background: i === activeIdx ? `${sectorDef.color}12` : 'transparent', border: 'none', borderBottom: `1px solid ${S.border}`, borderLeft: i === activeIdx ? `3px solid ${sectorDef.color}` : '3px solid transparent', cursor: 'pointer', textAlign: 'left', transition: 'all 0.12s' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 34, height: 34, borderRadius: '50%', background: sectorDef.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#fff', flexShrink: 0 }}>
                {c.avatar}
              </div>
              <div style={{ overflow: 'hidden' }}>
                <div style={{ fontSize: 13, color: i === activeIdx ? '#fff' : S.textSecondary, fontWeight: i === activeIdx ? 600 : 400, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.name}</div>
                <div style={{ fontSize: 11, color: S.textMuted, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.messages[c.messages.length - 1]?.text?.slice(0, 28)}...</div>
              </div>
            </div>
          </button>
        ))}
        {liveMode && (
          <div style={{ padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 8, height: 8, background: '#EF4444', borderRadius: '50%', animation: 'pulse 1s infinite' }} />
            <span style={{ fontSize: 11, color: '#EF4444', fontWeight: 600 }}>LIVE</span>
          </div>
        )}
      </Card>

      {/* Chat window */}
      <Card style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Header */}
        <div style={{ padding: '14px 18px', borderBottom: `1px solid ${S.border}`, display: 'flex', alignItems: 'center', gap: 10, background: '#0a1628' }}>
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: sectorDef.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#fff' }}>{conv?.avatar}</div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>{conv?.name}</div>
            <div style={{ fontSize: 12, color: '#10B981' }}>● EDA AI actief</div>
          </div>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: 10, background: '#080F1E' }}>
          {messages.map(m => (
            <div key={m.id} style={{ display: 'flex', justifyContent: m.sender === 'ai' ? 'flex-start' : 'flex-end', animation: 'fadeIn 0.2s ease' }}>
              <div style={{
                maxWidth: '78%', padding: '10px 14px', borderRadius: 12, fontSize: 13, lineHeight: 1.65, whiteSpace: 'pre-wrap',
                background: m.sender === 'ai' ? '#1E2D45' : `${sectorDef.color}22`,
                color: m.sender === 'ai' ? '#CBD5E1' : '#E2E8F0',
                borderBottomLeftRadius: m.sender === 'ai' ? 4 : 12,
                borderBottomRightRadius: m.sender === 'user' ? 4 : 12,
              }}>
                {m.text}
                <div style={{ fontSize: 10, color: S.textMuted, marginTop: 4, textAlign: 'right' }}>{m.time}</div>
              </div>
            </div>
          ))}
          {typing && (
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <div style={{ background: '#1E2D45', borderRadius: '12px 12px 12px 4px', padding: '10px 16px', display: 'flex', gap: 4, alignItems: 'center' }}>
                {[0,1,2].map(i => (
                  <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: S.textSecondary, animation: `bounce 1s ease ${i * 0.2}s infinite` }} />
                ))}
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        {/* Input bar (decorative) */}
        <div style={{ padding: '12px 16px', borderTop: `1px solid ${S.border}`, display: 'flex', gap: 10, alignItems: 'center', background: '#0a1628' }}>
          <div style={{ flex: 1, background: '#1E2D45', borderRadius: 24, padding: '8px 16px', fontSize: 13, color: S.textMuted, border: `1px solid ${S.border}` }}>
            Typ een bericht... (EDA AI reageert automatisch)
          </div>
          <button style={{ width: 38, height: 38, borderRadius: '50%', background: sectorDef.color, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Send size={16} color="#fff" />
          </button>
        </div>
      </Card>
    </div>
  )
}

// ─── Document Tab (Accountants) ───────────────────────────────────────────────

function DocumentTab({ sectorId }) {
  const items = sectorData[sectorId]?.documentItems || []
  const processed = items.filter(i => i.ocrStatus === 'Verwerkt')
  const pending = items.filter(i => i.ocrStatus === 'In behandeling')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {[
          { label: 'Verwerkt via OCR', val: processed.length, color: '#10B981', Icon: CheckCircle },
          { label: 'In behandeling', val: pending.length, color: '#F59E0B', Icon: Loader2 },
          { label: 'Gematcht met bank', val: items.filter(i => i.gematcht).length, color: '#2563EB', Icon: TrendingUp },
        ].map(({ label, val, color, Icon: Ic }) => (
          <Card key={label} style={{ padding: '18px 20px', display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 40, height: 40, background: `${color}18`, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Ic size={20} color={color} />
            </div>
            <div>
              <div style={{ fontSize: 24, fontWeight: 800, color }}>{val}</div>
              <div style={{ fontSize: 12, color: S.textSecondary }}>{label}</div>
            </div>
          </Card>
        ))}
      </div>

      {/* Table */}
      <Card style={{ overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: `1px solid ${S.border}` }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>Binnenkomende facturen — OCR verwerking</h3>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: S.background }}>
                {['Datum', 'Leverancier', 'Bedrag', 'Categorie', 'OCR Status', 'Gematcht'].map(h => (
                  <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: S.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((item, i) => (
                <tr key={item.id} style={{ borderTop: `1px solid ${S.border}`, background: i % 2 === 0 ? 'transparent' : '#0a1628' }}>
                  <td style={{ padding: '11px 16px', fontSize: 12, color: S.textMuted }}>{item.datum}</td>
                  <td style={{ padding: '11px 16px', fontSize: 13, color: '#CBD5E1', fontWeight: 500 }}>{item.leverancier}</td>
                  <td style={{ padding: '11px 16px', fontSize: 13, color: '#10B981', fontWeight: 600 }}>{item.bedrag}</td>
                  <td style={{ padding: '11px 16px' }}><Badge color="#8B5CF6">{item.type}</Badge></td>
                  <td style={{ padding: '11px 16px' }}><StatusBadge status={item.ocrStatus} /></td>
                  <td style={{ padding: '11px 16px' }}>
                    {item.gematcht
                      ? <span style={{ color: '#10B981', fontSize: 12, fontWeight: 600 }}>✓ Ja</span>
                      : <span style={{ color: S.textMuted, fontSize: 12 }}>— Nee</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}

// ─── Agenda Tab ───────────────────────────────────────────────────────────────

function AgendaTab({ sectorId, sectorDef }) {
  const items = sectorData[sectorId]?.agendaItems || []
  const days = ['Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag']

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Notifications */}
      {[
        { icon: CheckCircle, text: '3 herinneringen automatisch verstuurd vandaag', color: '#10B981' },
        { icon: AlertCircle, text: '1 no-show automatisch opgevolgd — herplanning voorgesteld', color: '#F59E0B' },
      ].map(({ icon: Ic, text, color }) => (
        <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', background: `${color}0f`, border: `1px solid ${color}33`, borderRadius: 8 }}>
          <Ic size={16} color={color} />
          <span style={{ fontSize: 13, color }}>{text}</span>
        </div>
      ))}

      {/* Calendar grid */}
      <Card style={{ padding: 20 }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 18 }}>Week overzicht</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 10 }}>
          {days.map((day, di) => (
            <div key={day}>
              <div style={{ fontSize: 11, fontWeight: 700, color: S.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10, textAlign: 'center' }}>{day}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {items.filter(i => i.day === di).map(item => (
                  <div key={item.id} style={{ background: `${item.color}18`, border: `1px solid ${item.color}44`, borderRadius: 8, padding: '8px 10px', borderLeft: `3px solid ${item.color}` }}>
                    <div style={{ fontSize: 11, color: item.color, fontWeight: 700, marginBottom: 2 }}>{item.time}</div>
                    <div style={{ fontSize: 12, color: '#CBD5E1', lineHeight: 1.4 }}>{item.title}</div>
                    {item.sub && <div style={{ fontSize: 11, color: S.textMuted, marginTop: 2 }}>{item.sub}</div>}
                  </div>
                ))}
                {items.filter(i => i.day === di).length === 0 && (
                  <div style={{ padding: '20px 0', textAlign: 'center', color: S.textMuted, fontSize: 12 }}>—</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

// ─── Rapporten Tab ────────────────────────────────────────────────────────────

function RapportenTab({ sectorId, sectorDef }) {
  const data = sectorData[sectorId]
  const chart = data?.chartData || []
  const metrics = data?.metrics || {}
  const metricEntries = Object.entries(metrics)

  const max = Math.max(...chart.map(d => d.voor), 1)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Weekly report card */}
      <Card style={{ padding: 0, overflow: 'hidden' }}>
        {/* Report header */}
        <div style={{ background: `linear-gradient(135deg, ${sectorDef.color}22, #0D1B2E)`, padding: '20px 24px', borderBottom: `1px solid ${S.border}` }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 11, color: sectorDef.color, fontWeight: 700, letterSpacing: '0.1em', marginBottom: 4 }}>WEKELIJKS RAPPORT — EDA SYSTEMS</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: '#fff' }}>Week 24 — Automatisch gegenereerd</div>
            </div>
            <div style={{ fontSize: 13, color: S.textSecondary }}>Verstuurd: ma 10 jun, 07:00</div>
          </div>
        </div>

        {/* Metrics summary */}
        <div style={{ padding: '20px 24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 12, borderBottom: `1px solid ${S.border}` }}>
          {metricEntries.map(([k, v], i) => {
            const colors = [sectorDef.color, '#10B981', '#F59E0B', '#8B5CF6']
            return (
              <div key={k} style={{ textAlign: 'center', padding: '12px', background: S.background, borderRadius: 10, border: `1px solid ${S.border}` }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: colors[i % 4] }}>{String(v)}</div>
                <div style={{ fontSize: 11, color: S.textMuted, marginTop: 4, textTransform: 'capitalize' }}>{k.replace(/([A-Z])/g, ' $1')}</div>
              </div>
            )
          })}
        </div>

        {/* Bar chart */}
        <div style={{ padding: '20px 24px' }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#fff', marginBottom: 4 }}>Administratieve werklast — voor vs. met EDA</div>
          <div style={{ fontSize: 12, color: S.textSecondary, marginBottom: 16 }}>Uren per maand</div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={chart} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke={S.border} vertical={false} />
              <XAxis dataKey="month" tick={{ fill: S.textSecondary, fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: S.textSecondary, fontSize: 12 }} axisLine={false} tickLine={false} unit="u" />
              <Tooltip contentStyle={{ background: '#1E2D45', border: `1px solid ${S.border}`, borderRadius: 8 }} labelStyle={{ color: '#fff' }} />
              <Bar dataKey="voor" name="Vóór EDA" fill="#EF444444" radius={[4, 4, 0, 0]} />
              <Bar dataKey="met"  name="Met EDA"  fill={sectorDef.color} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Footer */}
        <div style={{ padding: '14px 24px', background: S.background, borderTop: `1px solid ${S.border}`, fontSize: 12, color: S.textMuted, display: 'flex', justifyContent: 'space-between' }}>
          <span>✅ Automatisch gegenereerd door EDA Systems</span>
          <span>Volgend rapport: ma 17 jun om 07:00</span>
        </div>
      </Card>
    </div>
  )
}

// ─── Admin Tab ────────────────────────────────────────────────────────────────

function AdminTab({ sectorId }) {
  const items = sectorData[sectorId]?.adminItems || []
  const klaarItems = items.filter(i => i.status === 'Klaar voor boekhouder')
  const totaal = klaarItems.reduce((sum, i) => {
    const n = parseFloat(i.bedrag.replace(/[€.]/g, '').replace(',', '.'))
    return sum + (isNaN(n) ? 0 : n)
  }, 0)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Summary box */}
      {klaarItems.length > 0 && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '16px 20px', background: '#0a2540', border: '1px solid #1e40af', borderRadius: 10 }}>
          <CheckCircle size={20} color="#3b82f6" style={{ flexShrink: 0 }} />
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>
              {klaarItems.length} document{klaarItems.length !== 1 ? 'en' : ''} klaar voor boekhouder
            </div>
            <div style={{ fontSize: 12, color: '#60a5fa', marginTop: 2 }}>
              Totaal: €{totaal.toLocaleString('nl-BE')} — volledig gevalideerd en klaar voor controle
            </div>
          </div>
          <button style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', background: '#1e40af', border: 'none', borderRadius: 7, color: '#fff', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
            <Download size={14} /> Exporteer
          </button>
        </div>
      )}

      {/* Table */}
      <Card style={{ overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: `1px solid ${S.border}` }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>Administratie overzicht</h3>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: S.background }}>
                {['Datum', 'Omschrijving', 'Bedrag', 'Status', 'Actie'].map(h => (
                  <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: S.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((item, i) => (
                <tr key={item.id} style={{ borderTop: `1px solid ${S.border}`, background: i % 2 === 0 ? 'transparent' : '#0a1628' }}>
                  <td style={{ padding: '11px 16px', fontSize: 12, color: S.textMuted }}>{item.datum}</td>
                  <td style={{ padding: '11px 16px', fontSize: 13, color: '#CBD5E1', fontWeight: 500 }}>{item.omschrijving}</td>
                  <td style={{ padding: '11px 16px', fontSize: 13, color: '#10B981', fontWeight: 700 }}>{item.bedrag}</td>
                  <td style={{ padding: '11px 16px' }}><StatusBadge status={item.status} /></td>
                  <td style={{ padding: '11px 16px' }}>
                    <button style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '5px 10px', background: '#1E2D45', border: `1px solid ${S.border}`, borderRadius: 6, color: S.textSecondary, fontSize: 11, fontWeight: 500, cursor: 'pointer' }}>
                      <Download size={11} /> Exporteer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}

// ─── AI Assistent Tab ─────────────────────────────────────────────────────────

function AIAssistentTab({ sectorId, sectorDef }) {
  const examples = AI_EXAMPLES[sectorId] || AI_EXAMPLES.vastgoed
  const [input, setInput] = useState('')
  const [chat, setChat] = useState([
    { role: 'ai', text: `Goedemiddag! Ik ben de AI-assistent van uw ${sectorDef.name.toLowerCase()}. Getraind op uw specifieke processen en toon. Waarmee kan ik u helpen? 👋` },
  ])
  const [loading, setLoading] = useState(false)
  const endRef = useRef(null)

  const DEMO_ANSWERS = {
    0: `📊 Analyserapport leads:\n\n• Thomas De Smet — Hoge intentie (4 berichten vandaag, budget €350k)\n• Sophie Janssen — Bezichtiging bevestigd ✅\n• Marie Claes — Passief, follow-up aanbevolen\n\nAanbeveling: Focus vandaag op Thomas De Smet — stuur een gepersonaliseerde selectie.`,
    1: `🏠 Woningbeschrijving (NL/FR/EN):\n\nNL: Ontdek deze prachtige villa in het hart van Gent...\nFR: Découvrez cette magnifique villa au cœur de Gand...\nEN: Discover this magnificent villa in the heart of Ghent...\n\n✅ Klaar voor publicatie op Immoweb, Zimmo en sociale media.`,
    2: `📧 Follow-up e-mail opgesteld:\n\nBetreft: Persoonlijke woningselectie voor u — Thomas De Smet\n\nGeachte Thomas,\n\nBedankt voor uw interesse. Op basis van uw voorkeuren (€350k, regio Leuven, halfopen) hebben we 3 woningen geselecteerd die perfect aansluiten...\n\n✅ Klaar om te versturen.`,
  }

  const send = (text) => {
    if (!text.trim()) return
    setChat(prev => [...prev, { role: 'user', text }])
    setInput('')
    setLoading(true)
    setTimeout(() => {
      const idx = examples.indexOf(text)
      const answer = idx >= 0 ? DEMO_ANSWERS[idx] || `Ik verwerk uw vraag: "${text}". \n\n✅ Opdracht uitgevoerd. De resultaten zijn beschikbaar in uw dashboard.` : `Op basis van uw vraag "${text}" heb ik het volgende gevonden:\n\nAnalyse afgerond. Resultaten verwerkt en opgeslagen. ✅`
      setLoading(false)
      setChat(prev => [...prev, { role: 'ai', text: answer }])
    }, 1500)
  }

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [chat, loading])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Card style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12, background: '#0a2a1a', borderColor: '#064e3b' }}>
        <Bot size={20} color="#10B981" />
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>AI-assistent getraind op uw {sectorDef.name.toLowerCase()}</div>
          <div style={{ fontSize: 12, color: '#34d399' }}>Volledig getraind op uw processen, toon en klantgegevens · Dagelijks rapport om 7u in uw inbox</div>
        </div>
      </Card>

      {/* Example prompts */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: S.textMuted, letterSpacing: '0.08em' }}>VOORBEELDOPDRACHTEN</div>
        {examples.map((ex, i) => (
          <button key={i} onClick={() => send(ex)}
            style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', background: S.card, border: `1px solid ${S.border}`, borderRadius: 8, cursor: 'pointer', textAlign: 'left', transition: 'all 0.12s' }}
            onMouseEnter={e => e.currentTarget.style.borderColor = sectorDef.color}
            onMouseLeave={e => e.currentTarget.style.borderColor = S.border}>
            <span style={{ fontSize: 16 }}>💬</span>
            <span style={{ fontSize: 13, color: '#CBD5E1', flex: 1 }}>{ex}</span>
            <span style={{ fontSize: 11, color: sectorDef.color, fontWeight: 600, background: `${sectorDef.color}18`, padding: '4px 10px', borderRadius: 4 }}>Uitvoeren →</span>
          </button>
        ))}
      </div>

      {/* Chat */}
      <Card style={{ overflow: 'hidden' }}>
        <div style={{ height: 280, overflowY: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 10, background: '#080F1E' }}>
          {chat.map((m, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: m.role === 'ai' ? 'flex-start' : 'flex-end', animation: 'fadeIn 0.2s ease' }}>
              <div style={{ maxWidth: '82%', padding: '10px 14px', borderRadius: 12, fontSize: 13, lineHeight: 1.65, whiteSpace: 'pre-wrap',
                background: m.role === 'ai' ? '#1E2D45' : `${sectorDef.color}22`, color: m.role === 'ai' ? '#CBD5E1' : '#E2E8F0',
                borderBottomLeftRadius: m.role === 'ai' ? 4 : 12, borderBottomRightRadius: m.role === 'user' ? 4 : 12 }}>
                {m.text}
              </div>
            </div>
          ))}
          {loading && (
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <div style={{ background: '#1E2D45', borderRadius: '12px 12px 12px 4px', padding: '10px 16px', display: 'flex', gap: 4, alignItems: 'center' }}>
                {[0,1,2].map(i => (
                  <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: S.textSecondary, animation: `bounce 1s ease ${i * 0.2}s infinite` }} />
                ))}
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>
        <div style={{ padding: '12px 16px', borderTop: `1px solid ${S.border}`, display: 'flex', gap: 10, background: '#0a1628' }}>
          <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send(input)}
            placeholder="Stel een vraag aan uw AI-assistent..."
            style={{ flex: 1, background: '#1E2D45', border: `1px solid ${S.border}`, borderRadius: 8, padding: '9px 14px', fontSize: 13, color: '#fff', outline: 'none' }} />
          <button onClick={() => send(input)}
            style={{ padding: '9px 16px', background: sectorDef.color, border: 'none', borderRadius: 8, color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
            <Send size={14} /> Stuur
          </button>
        </div>
      </Card>
    </div>
  )
}

// ─── Dashboard ────────────────────────────────────────────────────────────────

function Dashboard({ sectorId, onBack }) {
  const sectorDef = SECTORS.find(s => s.id === sectorId)
  const [pkg, setPkg] = useState('pro')
  const [tab, setTab] = useState('overview')
  const [liveMode, setLiveMode] = useState(false)
  const [showROI, setShowROI] = useState(false)

  const tabs = sectorId === 'accountant' ? PACKAGE_TABS_ACCOUNTANT[pkg] : PACKAGE_TABS[pkg]
  const visibleTabs = ALL_TABS.filter(t => tabs.includes(t.id))
  const allPossibleTabs = sectorId === 'accountant'
    ? ['overview', 'documenten', 'agenda', 'rapporten', 'admin', 'ai']
    : ['overview', 'communicatie', 'agenda', 'rapporten', 'admin', 'ai']
  const lockedTabs = ALL_TABS.filter(t => allPossibleTabs.includes(t.id) && !tabs.includes(t.id))

  const safeTab = tabs.includes(tab) ? tab : tabs[0]

  return (
    <div style={{ minHeight: '100vh', background: S.background, display: 'flex', flexDirection: 'column' }}>
      {/* CSS animations */}
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
        @keyframes bounce { 0%,80%,100% { transform: translateY(0); } 40% { transform: translateY(-5px); } }
        @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }
        .tab-btn:hover { color: #fff !important; }
      `}</style>

      {/* Top bar */}
      <header style={{ background: S.card, borderBottom: `1px solid ${S.border}`, padding: '0 24px', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 16, height: 60 }}>
          {/* Logo */}
          <EDALogo size={36} compact />

          {/* Back */}
          <button onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', background: 'transparent', border: `1px solid ${S.border}`, borderRadius: 7, color: S.textSecondary, fontSize: 13, cursor: 'pointer' }}>
            <ArrowLeft size={14} /> Sectoren
          </button>

          {/* Sector name */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: `${sectorDef.color}12`, border: `1px solid ${sectorDef.color}33`, borderRadius: 8, padding: '6px 12px' }}>
            <sectorDef.Icon size={16} color={sectorDef.color} />
            <span style={{ fontSize: 14, fontWeight: 600, color: sectorDef.color }}>{sectorDef.name}</span>
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', color: sectorDef.color, opacity: 0.7 }}>{sectorDef.tag}</span>
          </div>

          <div style={{ flex: 1 }} />

          {/* Live mode toggle */}
          <button onClick={() => setLiveMode(!liveMode)}
            style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 14px', background: liveMode ? '#EF444418' : 'transparent', border: `1px solid ${liveMode ? '#EF4444' : S.border}`, borderRadius: 7, color: liveMode ? '#EF4444' : S.textSecondary, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
            {liveMode && <span style={{ width: 8, height: 8, background: '#EF4444', borderRadius: '50%', animation: 'pulse 1s infinite' }} />}
            {liveMode ? 'LIVE' : '● Live Demo'}
          </button>

          {/* ROI Button */}
          <button onClick={() => setShowROI(true)}
            style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 14px', background: `${S.accent}18`, border: `1px solid ${S.accent}44`, borderRadius: 7, color: S.accent, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
            <Calculator size={14} /> ROI Berekenen
          </button>
        </div>

        {/* Package toggle + tabs */}
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 0, gap: 16 }}>
          {/* Tabs */}
          <div style={{ display: 'flex', gap: 0 }}>
            {[...visibleTabs, ...lockedTabs.map(t => ({ ...t, locked: true }))].map(({ id, label, Icon: Ic, locked }) => (
              <button key={id} className="tab-btn" onClick={() => !locked && setTab(id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6, padding: '14px 16px', background: 'transparent', border: 'none', cursor: locked ? 'not-allowed' : 'pointer',
                  color: safeTab === id ? sectorDef.color : locked ? S.textMuted : S.textSecondary,
                  borderBottom: safeTab === id ? `2px solid ${sectorDef.color}` : '2px solid transparent',
                  fontSize: 13, fontWeight: safeTab === id ? 600 : 400, transition: 'all 0.15s', opacity: locked ? 0.45 : 1, whiteSpace: 'nowrap',
                }}>
                {locked ? <Lock size={11} /> : <Ic size={13} />}
                {label}
                {locked && <span style={{ fontSize: 10, color: S.accent, marginLeft: 4 }}>↑ Upgrade</span>}
              </button>
            ))}
          </div>

          {/* Package toggle (right side) */}
          <div style={{ paddingBottom: 2 }}>
            <PackageToggle pkg={pkg} setPkg={p => { setPkg(p); setTab('overview') }} />
          </div>
        </div>
      </header>

      {/* Content */}
      <main style={{ flex: 1, maxWidth: 1200, margin: '0 auto', width: '100%', padding: '28px 24px', animation: 'fadeIn 0.2s ease' }}>
        {safeTab === 'overview'     && <OverviewTab sectorId={sectorId} sectorDef={sectorDef} pkg={pkg} />}
        {safeTab === 'communicatie' && <WhatsAppTab sectorId={sectorId} sectorDef={sectorDef} liveMode={liveMode} />}
        {safeTab === 'documenten'   && <DocumentTab sectorId={sectorId} />}
        {safeTab === 'agenda'       && <AgendaTab sectorId={sectorId} sectorDef={sectorDef} />}
        {safeTab === 'rapporten'    && <RapportenTab sectorId={sectorId} sectorDef={sectorDef} />}
        {safeTab === 'admin'        && <AdminTab sectorId={sectorId} />}
        {safeTab === 'ai'           && <AIAssistentTab sectorId={sectorId} sectorDef={sectorDef} />}
      </main>

      {showROI && <ROICalculator onClose={() => setShowROI(false)} pkg={pkg} />}
    </div>
  )
}

// ─── Root App ─────────────────────────────────────────────────────────────────

export function DemoApp() {
  const [sector, setSector] = useState(null)
  return sector
    ? <Dashboard sectorId={sector} onBack={() => setSector(null)} />
    : <LandingScreen onSelect={setSector} />
}
