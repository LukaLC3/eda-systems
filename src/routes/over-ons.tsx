import { createFileRoute, Link } from "@tanstack/react-router";
import { LanguageProvider, useT } from "@/i18n/LanguageProvider";
import { SectorProvider } from "@/i18n/SectorProvider";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { SectionLabel } from "@/components/site/SectionLabel";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { SECTORS, type SectorKey } from "@/i18n/sectors";
import type { Lang } from "@/i18n/translations";

export const Route = createFileRoute("/over-ons")({
  component: OverOnsPage,
  head: () => ({
    meta: [
      { title: "About EDA Systems — Intelligent digitalisation infrastructure" },
      { name: "description", content: "EDA Systems is a digitalisation partner engineering intelligent infrastructure for European professional businesses." },
      { property: "og:title", content: "About EDA Systems" },
      { property: "og:description", content: "Intelligent digitalisation infrastructure for European professionals." },
      { property: "og:type", content: "website" },
    ],
  }),
});

function OverOnsPage() {
  return (
    <SectorProvider>
      <LanguageProvider>
        <OverOnsContent />
      </LanguageProvider>
    </SectorProvider>
  );
}

type Capability = { label: string; text: string };
type SectorCopy = Record<SectorKey, { name: string; desc: string }>;
type AboutCopy = {
  pageTitle: string;
  opening: string;
  s1Label: string; s1Title: string; s1: string[];
  s2Label: string; s2Title: string; s2: string[];
  s3Label: string; s3Title: string; s3: string[];
  s4Label: string; s4Title: string; capabilities: Capability[];
  s5Label: string; s5Title: string; s5Intro: string; sectors: SectorCopy;
  s6Label: string; s6Title: string; s6: string[];
  s7Label: string; s7Title: string; s7: string[];
  s8Label: string; s8Title: string; s8: string[];
  closing: string;
  ctaTitle: string; ctaSector: string; ctaContact: string;
};

const CONTENT: Record<Lang, AboutCopy> = {
  en: {
    pageTitle: "About EDA Systems",
    opening: "Some businesses run. Others are engineered to perform.",
    s1Label: "OUR MISSION", s1Title: "A new standard in business digitalisation",
    s1: [
      "The professional services sector across Europe is facing a structural challenge. Decades of fragmented software adoption have left most businesses with disconnected tools, manual processes and an administrative burden that consumes hours of productive capacity every single day.",
      "EDA Systems was built to solve this — not with another application, but with a fully engineered digitalisation programme designed around the specific architecture of each client's business.",
      "We bring together artificial intelligence, process engineering, systems integration and operational intelligence into a single, cohesive infrastructure. The result is a business that communicates automatically, administers itself, reports in real time and scales without friction — regardless of volume, geography or complexity.",
    ],
    s2Label: "WHO WE ARE", s2Title: "Engineers, architects and process specialists",
    s2: [
      "We are a team of system architects, integration engineers and business process specialists with deep expertise across the professional services sector. Our work spans seven industries and multiple European markets, with deployments ranging from independent practices to multi-location enterprise organisations.",
      "We operate at the intersection of operational strategy and digital engineering. Our mandate is not to install software — it is to redesign how a business functions at its core, and to deliver an infrastructure that performs with precision, consistency and intelligence from day one.",
    ],
    s3Label: "METHODOLOGY", s3Title: "Our digitalisation methodology",
    s3: [
      "Every EDA Systems engagement begins with a structured analysis of the client's operational environment — their workflows, their communication infrastructure, their administrative architecture and their existing technology stack. We identify inefficiencies, map process dependencies and design a digitalisation programme tailored to the specific demands of their organisation.",
      "Implementation follows a disciplined engineering process. Systems are built, tested and validated before deployment. Integration with existing platforms is handled entirely by our team. Every component is stress-tested against real operational scenarios before going live.",
      "Post-deployment, our team assumes full responsibility for maintenance, monitoring, optimisation and evolution of the system — ensuring that the infrastructure we deliver continues to perform at the highest standard as the business grows and changes.",
    ],
    s4Label: "INFRASTRUCTURE", s4Title: "The infrastructure we deliver",
    capabilities: [
      { label: "INTELLIGENT COMMUNICATION INFRASTRUCTURE", text: "Automated client communication across all channels — managed by AI systems trained on the specific tone, language and operational requirements of each client organisation." },
      { label: "SCHEDULING AND OPERATIONAL MANAGEMENT", text: "End-to-end appointment and resource management systems that operate autonomously — booking, confirming, rescheduling and reporting without manual intervention." },
      { label: "ADMINISTRATIVE AND FINANCIAL AUTOMATION", text: "Fully integrated document processing, invoicing, bookkeeping synchronisation and compliance preparation — connecting directly to existing accounting platforms and eliminating manual data entry at every stage." },
      { label: "BUSINESS INTELLIGENCE AND REPORTING", text: "Real-time operational dashboards and automated reporting systems that deliver actionable intelligence directly to leadership — daily, weekly and monthly — without requiring any manual data compilation." },
      { label: "CRM AND CLIENT LIFECYCLE MANAGEMENT", text: "Automated lead management, client follow-up and relationship tracking systems that ensure no opportunity is missed and every client interaction is logged, managed and followed through." },
      { label: "SYSTEMS INTEGRATION LAYER", text: "A bespoke integration architecture connecting every operational tool the client uses into a single, unified operational environment." },
    ],
    s5Label: "SECTORS", s5Title: "The sectors we serve",
    s5Intro: "EDA Systems delivers specialised digitalisation programmes across seven professional sectors, each built on deep sector-specific knowledge and proven operational frameworks.",
    sectors: {
      vastgoed: { name: "Real Estate", desc: "Full digitalisation of the agency operation — from automated viewing management and AI-powered property marketing to lead intelligence and financial administration." },
      tandartsen: { name: "Dental Practices", desc: "Precision scheduling infrastructure, patient communication systems, no-show elimination frameworks and complete practice administration digitalisation." },
      kinesisten: { name: "Physiotherapy", desc: "Session management systems, clinical documentation automation via voice-to-text technology, patient progress tracking and multi-series appointment coordination." },
      accountants: { name: "Accounting", desc: "Intelligent invoice processing via OCR, automated client communication, deadline management systems and regulatory compliance preparation." },
      architecten: { name: "Architecture", desc: "Proposal generation systems, project lifecycle communication infrastructure, phase-based invoicing and permit tracking automation." },
      garages: { name: "Automotive", desc: "Workshop management digitalisation, automated client status communication, predictive maintenance scheduling and quote generation systems." },
      horeca: { name: "Hospitality", desc: "Reservation infrastructure, workforce scheduling systems, guest communication programmes and real-time reputation management." },
    },
    s6Label: "EUROPE", s6Title: "Operating across Europe",
    s6: [
      "EDA Systems operates continent-wide, with active deployments across multiple European markets. Our infrastructure is designed from the ground up to function across linguistic, regulatory and operational boundaries — fully localised for each market we enter, with ongoing expansion across the continent.",
      "We serve organisations of every scale — from independent professionals seeking their first step into operational digitalisation, to multi-location enterprises requiring a comprehensive transformation of their business infrastructure across multiple markets.",
      "Our European approach is built on a fundamental belief: that the operational standards available to the largest corporations in the world should be equally accessible to the professional businesses that form the backbone of the European economy.",
    ],
    s7Label: "WHAT SETS US APART", s7Title: "What distinguishes EDA Systems",
    s7: [
      "We are not a software company. We do not offer licences, subscriptions or platforms.",
      "We are a digitalisation partner. We take full responsibility for the analysis, design, implementation, integration and ongoing management of the systems we deploy. Our clients do not manage technology — they run their businesses at the highest possible level of efficiency, while we ensure their operational infrastructure performs without interruption.",
      "Every programme we deliver includes full installation within seven working days, comprehensive integration with existing systems, dedicated account management and continuous operational support — with no hidden costs and no technical requirements on the part of the client.",
    ],
    s8Label: "OUR STANDARD", s8Title: "Our standard",
    s8: [
      "EDA Systems holds itself to a single standard: that every business we work with should operate more efficiently, more profitably and with greater capacity after our engagement than before it. Not marginally. Measurably.",
      "That standard drives every system we design, every integration we build and every programme we manage — across every sector, every country and every client we serve.",
    ],
    closing: "EDA Systems — Intelligent digitalisation infrastructure for European professionals.",
    ctaTitle: "Ready to put your business on autopilot?",
    ctaSector: "Select your industry", ctaContact: "Contact us",
  },
  nl: {
    pageTitle: "Over EDA Systems",
    opening: "Sommige bedrijven draaien. Andere worden gebouwd om te presteren.",
    s1Label: "ONZE MISSIE", s1Title: "Een nieuwe standaard in bedrijfsdigitalisering",
    s1: [
      "De professionele dienstverlening in Europa staat voor een structurele uitdaging. Decennia van gefragmenteerde softwareadoptie hebben de meeste bedrijven achtergelaten met onverbonden tools, handmatige processen en een administratieve last die dagelijks uren productieve capaciteit opslokt.",
      "EDA Systems werd gebouwd om dit op te lossen — niet met een nieuwe applicatie, maar met een volledig engineered digitaliseringsprogramma ontworpen rond de specifieke architectuur van elk bedrijf.",
      "Wij brengen artificiële intelligentie, procesengineering, systeemintegratie en operationele intelligentie samen in één coherente infrastructuur. Het resultaat is een bedrijf dat automatisch communiceert, zichzelf administreert, in real time rapporteert en schaalbaar is zonder wrijving — ongeacht volume, geografie of complexiteit.",
    ],
    s2Label: "WIE WIJ ZIJN", s2Title: "Ingenieurs, architecten en procesexperten",
    s2: [
      "Wij zijn een team van systeemarchitecten, integratie-ingenieurs en bedrijfsprocesspecialisten met diepgaande expertise in de professionele dienstverleningssector. Ons werk beslaat zeven sectoren en meerdere Europese markten, met implementaties van onafhankelijke praktijken tot multi-locatie enterprise organisaties.",
      "Wij opereren op het snijpunt van operationele strategie en digitale engineering. Onze opdracht is niet software te installeren — het is de kern van een bedrijf te herontwerpen en een infrastructuur te leveren die vanaf dag één functioneert met precisie, consistentie en intelligentie.",
    ],
    s3Label: "METHODOLOGIE", s3Title: "Onze digitaliseringsmethodologie",
    s3: [
      "Elke EDA Systems opdracht begint met een gestructureerde analyse van de operationele omgeving van de klant — hun workflows, communicatie-infrastructuur, administratieve architectuur en bestaande technologiestack. Wij identificeren inefficiënties, brengen procesafhankelijkheden in kaart en ontwerpen een digitaliseringsprogramma op maat.",
      "De implementatie volgt een gedisciplineerd engineeringproces. Systemen worden gebouwd, getest en gevalideerd vóór ingebruikname. Integratie met bestaande platforms wordt volledig door ons team verzorgd.",
      "Na de implementatie neemt ons team de volledige verantwoordelijkheid op voor onderhoud, monitoring, optimalisatie en evolutie van het systeem.",
    ],
    s4Label: "INFRASTRUCTUUR", s4Title: "De infrastructuur die wij leveren",
    capabilities: [
      { label: "INTELLIGENTE COMMUNICATIE-INFRASTRUCTUUR", text: "Geautomatiseerde klantcommunicatie via alle kanalen — beheerd door AI-systemen getraind op de specifieke toon, taal en operationele vereisten van elke klantorganisatie." },
      { label: "PLANNING EN OPERATIONEEL BEHEER", text: "End-to-end afspraken- en resourcebeheersystemen die autonoom opereren — boeken, bevestigen, herplannen en rapporteren zonder menselijke tussenkomst." },
      { label: "ADMINISTRATIEVE EN FINANCIËLE AUTOMATISERING", text: "Volledig geïntegreerde documentverwerking, facturatie, boekhoudkoppeling en compliancevoorbereiding — rechtstreeks verbonden met bestaande boekhoudplatformen." },
      { label: "BUSINESS INTELLIGENCE EN RAPPORTAGE", text: "Operationele dashboards in real time en geautomatiseerde rapportagesystemen die bruikbare inzichten rechtstreeks aan het management leveren." },
      { label: "CRM EN KLANTLEVENSCYCLUSBEHEER", text: "Geautomatiseerd leadbeheer, klantopvolging en relatietracking die ervoor zorgen dat geen enkele opportuniteit gemist wordt." },
      { label: "SYSTEEMINTEGRATIELAAG", text: "Een op maat gemaakte integratiearchitectuur die elk operationeel hulpmiddel van de klant verbindt tot één uniforme operationele omgeving." },
    ],
    s5Label: "SECTOREN", s5Title: "De sectoren die wij bedienen",
    s5Intro: "EDA Systems levert gespecialiseerde digitaliseringsprogramma's in zeven professionele sectoren, elk gebouwd op diepgaande sectorkennis en bewezen operationele kaders.",
    sectors: {
      vastgoed: { name: "Vastgoedmakelaars", desc: "Volledige digitalisering van het makelaarskantoor — van geautomatiseerd bezichtigingsbeheer en AI-aangedreven vastgoedmarketing tot leadintelligentie en financiële administratie." },
      tandartsen: { name: "Tandartsen", desc: "Nauwkeurige planningsinfrastructuur, patiëntcommunicatiesystemen, no-show eliminatiekaders en volledige praktijkadministratie digitalisering." },
      kinesisten: { name: "Kinesisten", desc: "Sessiemanagementsystemen, automatisering van klinische documentatie via spraak-naar-tekst technologie, patiëntvoortgangsmonitoring en multicoördinatie van behandelingsreeksen." },
      accountants: { name: "Accountants", desc: "Intelligente factuurverwerking via OCR, geautomatiseerde klantcommunicatie, deadlinebeheersystemen en voorbereiding van regelgevende naleving." },
      architecten: { name: "Architecten", desc: "Offertegenereringssystemen, projectlevenscyclus communicatie-infrastructuur, gefaseerde facturatie en vergunningsopvolgingsautomatisering." },
      garages: { name: "Garages", desc: "Werkplaatsbeheer digitalisering, geautomatiseerde klantstatuscommunicatie, voorspellende onderhoudsplanning en offertegeneratiesystemen." },
      horeca: { name: "Horeca", desc: "Reserveringsinfrastructuur, personeelsplanningssystemen, gastcommunicatieprogramma's en reputatiebeheer in real time." },
    },
    s6Label: "EUROPA", s6Title: "Actief in heel Europa",
    s6: [
      "EDA Systems opereert continentaal, met actieve implementaties in meerdere Europese markten. Onze infrastructuur is ontworpen om te functioneren over taalkundige, regelgevende en operationele grenzen heen — volledig gelokaliseerd voor elke markt die wij betreden, met voortdurende expansie over het continent.",
      "Wij bedienen organisaties van elke omvang — van onafhankelijke professionals die hun eerste stap in operationele digitalisering zetten, tot multi-locatie ondernemingen die een uitgebreide transformatie van hun bedrijfsinfrastructuur vereisen.",
      "Onze Europese aanpak is gebaseerd op een fundamentele overtuiging: dat de operationele standaarden beschikbaar voor de grootste bedrijven ter wereld even toegankelijk moeten zijn voor de professionele bedrijven die de ruggengraat vormen van de Europese economie.",
    ],
    s7Label: "WAT ONS ONDERSCHEIDT", s7Title: "Wat EDA Systems onderscheidt",
    s7: [
      "Wij zijn geen softwarebedrijf. Wij bieden geen licenties, abonnementen of platformen aan.",
      "Wij zijn een digitaliseringspartner. Wij nemen de volledige verantwoordelijkheid op voor de analyse, het ontwerp, de implementatie, de integratie en het doorlopende beheer van de systemen die wij implementeren.",
      "Elk programma dat wij leveren omvat volledige installatie binnen zeven werkdagen, uitgebreide integratie met bestaande systemen, toegewijd accountbeheer en continue operationele ondersteuning — zonder verborgen kosten en zonder technische vereisten van de kant van de klant.",
    ],
    s8Label: "ONZE STANDAARD", s8Title: "Onze standaard",
    s8: [
      "EDA Systems houdt zich aan één standaard: dat elk bedrijf waarmee wij samenwerken na onze samenwerking efficiënter, winstgevender en met grotere capaciteit moet functioneren dan ervoor. Niet marginaal. Meetbaar.",
      "Die standaard stuurt elk systeem dat wij ontwerpen, elke integratie die wij bouwen en elk programma dat wij beheren — in elke sector, elk land en voor elke klant.",
    ],
    closing: "EDA Systems — Intelligente digitaliseringsinfrastructuur voor Europese professionals.",
    ctaTitle: "Klaar om uw kantoor op automatische piloot te zetten?",
    ctaSector: "Selecteer uw sector", ctaContact: "Contacteer ons",
  },
  fr: {
    pageTitle: "À propos d'EDA Systems",
    opening: "Certaines entreprises fonctionnent. D'autres sont conçues pour performer.",
    s1Label: "NOTRE MISSION", s1Title: "Un nouveau standard de digitalisation",
    s1: [
      "Le secteur des services professionnels en Europe est confronté à un défi structurel. Des décennies d'adoption fragmentée de logiciels ont laissé la plupart des entreprises avec des outils déconnectés, des processus manuels et une charge administrative qui consume des heures de capacité productive chaque jour.",
      "EDA Systems a été créé pour résoudre ce problème — non pas avec une autre application, mais avec un programme de digitalisation entièrement conçu autour de l'architecture spécifique de chaque entreprise cliente.",
      "Nous réunissons l'intelligence artificielle, l'ingénierie des processus, l'intégration des systèmes et l'intelligence opérationnelle dans une infrastructure unique et cohérente. Le résultat est une entreprise qui communique automatiquement, s'administre elle-même, génère des rapports en temps réel et se développe sans friction — quel que soit le volume, la géographie ou la complexité.",
    ],
    s2Label: "QUI NOUS SOMMES", s2Title: "Ingénieurs, architectes et spécialistes des processus",
    s2: [
      "Nous sommes une équipe d'architectes de systèmes, d'ingénieurs d'intégration et de spécialistes des processus métier avec une expertise approfondie dans le secteur des services professionnels. Notre travail couvre sept secteurs et plusieurs marchés européens, avec des déploiements allant des cabinets indépendants aux organisations multi-sites.",
      "Nous opérons à l'intersection de la stratégie opérationnelle et de l'ingénierie numérique. Notre mission n'est pas d'installer des logiciels — c'est de repenser le fonctionnement fondamental d'une entreprise et de fournir une infrastructure qui performe avec précision, cohérence et intelligence dès le premier jour.",
    ],
    s3Label: "MÉTHODOLOGIE", s3Title: "Notre méthodologie de digitalisation",
    s3: [
      "Chaque engagement EDA Systems commence par une analyse structurée de l'environnement opérationnel du client — ses flux de travail, son infrastructure de communication, son architecture administrative et son parc technologique existant.",
      "La mise en œuvre suit un processus d'ingénierie rigoureux. Les systèmes sont construits, testés et validés avant le déploiement. L'intégration avec les plateformes existantes est entièrement gérée par notre équipe.",
      "Après le déploiement, notre équipe assume l'entière responsabilité de la maintenance, du monitoring, de l'optimisation et de l'évolution du système.",
    ],
    s4Label: "INFRASTRUCTURE", s4Title: "L'infrastructure que nous livrons",
    capabilities: [
      { label: "INFRASTRUCTURE DE COMMUNICATION INTELLIGENTE", text: "Communication client automatisée sur tous les canaux — gérée par des systèmes IA formés sur le ton, la langue et les exigences opérationnelles spécifiques de chaque organisation." },
      { label: "GESTION DES PLANNINGS ET DES OPÉRATIONS", text: "Systèmes de gestion des rendez-vous et des ressources qui fonctionnent de manière autonome — réservation, confirmation, reprogrammation et reporting sans intervention manuelle." },
      { label: "AUTOMATISATION ADMINISTRATIVE ET FINANCIÈRE", text: "Traitement intégré des documents, facturation, synchronisation comptable et préparation de la conformité — connectés directement aux plateformes comptables existantes." },
      { label: "BUSINESS INTELLIGENCE ET REPORTING", text: "Tableaux de bord opérationnels en temps réel et systèmes de reporting automatisés qui livrent des insights directement à la direction." },
      { label: "CRM ET GESTION DU CYCLE DE VIE CLIENT", text: "Gestion automatisée des leads, suivi client et tracking des relations pour qu'aucune opportunité ne soit manquée." },
      { label: "COUCHE D'INTÉGRATION DES SYSTÈMES", text: "Une architecture d'intégration sur mesure connectant chaque outil opérationnel du client dans un environnement unifié." },
    ],
    s5Label: "SECTEURS", s5Title: "Les secteurs que nous servons",
    s5Intro: "EDA Systems délivre des programmes de digitalisation spécialisés dans sept secteurs professionnels, chacun fondé sur une connaissance sectorielle approfondie.",
    sectors: {
      vastgoed: { name: "Immobilier", desc: "Digitalisation complète de l'agence — de la gestion automatisée des visites au marketing immobilier piloté par l'IA." },
      tandartsen: { name: "Cabinets dentaires", desc: "Infrastructure de planification de précision, systèmes de communication patient et digitalisation complète de l'administration du cabinet." },
      kinesisten: { name: "Kinésithérapie", desc: "Systèmes de gestion des séances, automatisation de la documentation clinique via la technologie voix-to-texte et coordination des séries de traitements." },
      accountants: { name: "Comptabilité", desc: "Traitement intelligent des factures via OCR, communication client automatisée et systèmes de gestion des délais." },
      architecten: { name: "Architecture", desc: "Systèmes de génération de devis, infrastructure de communication de projet et automatisation de la facturation par phase." },
      garages: { name: "Automobile", desc: "Digitalisation de la gestion de l'atelier, communication automatisée du statut client et systèmes de génération de devis." },
      horeca: { name: "Hôtellerie-restauration", desc: "Infrastructure de réservation, systèmes de planification du personnel et programmes de communication client." },
    },
    s6Label: "EUROPE", s6Title: "Présents partout en Europe",
    s6: [
      "EDA Systems opère à l'échelle continentale, avec des déploiements actifs sur plusieurs marchés européens. Notre infrastructure est conçue pour fonctionner à travers les frontières linguistiques, réglementaires et opérationnelles — entièrement localisée pour chaque marché que nous intégrons.",
      "Nous servons des organisations de toutes tailles — des professionnels indépendants aux entreprises multi-sites nécessitant une transformation complète de leur infrastructure.",
      "Notre approche européenne repose sur une conviction fondamentale : que les standards opérationnels disponibles pour les plus grandes entreprises mondiales doivent être également accessibles aux entreprises professionnelles qui constituent l'épine dorsale de l'économie européenne.",
    ],
    s7Label: "CE QUI NOUS DISTINGUE", s7Title: "Ce qui distingue EDA Systems",
    s7: [
      "Nous ne sommes pas une entreprise de logiciels. Nous ne proposons pas de licences, d'abonnements ou de plateformes.",
      "Nous sommes un partenaire de digitalisation. Nous prenons l'entière responsabilité de l'analyse, de la conception, de la mise en œuvre, de l'intégration et de la gestion continue des systèmes que nous déployons.",
      "Chaque programme comprend une installation complète en sept jours ouvrables, une intégration avec les systèmes existants, un account management dédié et un support continu — sans coûts cachés.",
    ],
    s8Label: "NOTRE STANDARD", s8Title: "Notre standard",
    s8: [
      "EDA Systems s'impose un seul standard : que chaque entreprise avec laquelle nous travaillons doit fonctionner de manière plus efficace, plus rentable et avec une plus grande capacité après notre engagement. Pas marginalement. Mesurablement.",
      "Ce standard guide chaque système que nous concevons, chaque intégration que nous construisons et chaque programme que nous gérons — dans chaque secteur, chaque pays et pour chaque client.",
    ],
    closing: "EDA Systems — Infrastructure de digitalisation intelligente pour les professionnels européens.",
    ctaTitle: "Prêt à mettre votre activité en pilote automatique ?",
    ctaSector: "Sélectionnez votre secteur", ctaContact: "Nous contacter",
  },
  de: {
    pageTitle: "Über EDA Systems",
    opening: "Manche Unternehmen laufen. Andere werden entwickelt, um zu leisten.",
    s1Label: "UNSERE MISSION", s1Title: "Ein neuer Standard in der Unternehmensdigitalisierung",
    s1: [
      "Der professionelle Dienstleistungssektor in Europa steht vor einer strukturellen Herausforderung. Jahrzehnte fragmentierter Softwareadoption haben die meisten Unternehmen mit unverbundenen Tools, manuellen Prozessen und einer administrativen Last zurückgelassen, die täglich Stunden produktiver Kapazität verschlingt.",
      "EDA Systems wurde entwickelt, um dies zu lösen — nicht mit einer weiteren Anwendung, sondern mit einem vollständig entwickelten Digitalisierungsprogramm, das auf die spezifische Architektur jedes Kundenunternehmens zugeschnitten ist.",
      "Wir vereinen künstliche Intelligenz, Prozessengineering, Systemintegration und operative Intelligenz zu einer einzigen, kohärenten Infrastruktur. Das Ergebnis ist ein Unternehmen, das automatisch kommuniziert, sich selbst verwaltet, in Echtzeit berichtet und ohne Reibung skaliert.",
    ],
    s2Label: "WER WIR SIND", s2Title: "Ingenieure, Architekten und Prozessspezialisten",
    s2: [
      "Wir sind ein Team von Systemarchitekten, Integrationsingenieuren und Geschäftsprozessspezialisten mit tiefgreifender Expertise im professionellen Dienstleistungssektor. Unsere Arbeit umfasst sieben Branchen und mehrere europäische Märkte.",
      "Wir arbeiten an der Schnittstelle von operativer Strategie und Digital Engineering. Unser Auftrag ist nicht die Installation von Software — es ist die Neugestaltung des Kernbetriebs eines Unternehmens.",
    ],
    s3Label: "METHODIK", s3Title: "Unsere Digitalisierungsmethodik",
    s3: [
      "Jedes EDA Systems Engagement beginnt mit einer strukturierten Analyse der operativen Umgebung des Kunden. Wir identifizieren Ineffizienzen, kartieren Prozessabhängigkeiten und entwerfen ein maßgeschneidertes Digitalisierungsprogramm.",
      "Die Implementierung folgt einem disziplinierten Engineering-Prozess. Systeme werden gebaut, getestet und validiert, bevor sie in Betrieb genommen werden.",
      "Nach der Implementierung übernimmt unser Team die volle Verantwortung für Wartung, Überwachung, Optimierung und Weiterentwicklung des Systems.",
    ],
    s4Label: "INFRASTRUKTUR", s4Title: "Die Infrastruktur, die wir liefern",
    capabilities: [
      { label: "INTELLIGENTE KOMMUNIKATIONSINFRASTRUKTUR", text: "Automatisierte Kundenkommunikation über alle Kanäle — verwaltet von KI-Systemen, die auf den spezifischen Ton und die Anforderungen jeder Kundenorganisation trainiert wurden." },
      { label: "TERMINPLANUNG UND OPERATIVES MANAGEMENT", text: "End-to-End Termin- und Ressourcenmanagementsysteme, die autonom operieren — buchen, bestätigen, umplanen und berichten ohne manuellen Eingriff." },
      { label: "ADMINISTRATIVE UND FINANZIELLE AUTOMATISIERUNG", text: "Vollständig integrierte Dokumentenverarbeitung, Rechnungsstellung, Buchhaltungssynchronisation und Compliance-Vorbereitung." },
      { label: "BUSINESS INTELLIGENCE UND REPORTING", text: "Operative Dashboards in Echtzeit und automatisierte Berichtssysteme, die verwertbare Erkenntnisse direkt an das Management liefern." },
      { label: "CRM UND KUNDENLEBENSZYKLUSMANAGEMENT", text: "Automatisiertes Lead-Management, Kundennachverfolgung und Beziehungstracking." },
      { label: "SYSTEMINTEGRATIONSSCHICHT", text: "Eine maßgeschneiderte Integrationsarchitektur, die jedes operative Tool des Kunden zu einer einzigen einheitlichen Umgebung verbindet." },
    ],
    s5Label: "BRANCHEN", s5Title: "Die Branchen, die wir bedienen",
    s5Intro: "EDA Systems liefert spezialisierte Digitalisierungsprogramme in sieben professionellen Sektoren.",
    sectors: {
      vastgoed: { name: "Immobilien", desc: "Vollständige Digitalisierung des Maklerbüros — von automatisiertem Besichtigungsmanagement bis zu KI-getriebenem Immobilienmarketing." },
      tandartsen: { name: "Zahnarztpraxen", desc: "Präzise Planungsinfrastruktur, Patientenkommunikationssysteme und vollständige Praxisverwaltungsdigitalisierung." },
      kinesisten: { name: "Physiotherapie", desc: "Sitzungsmanagementsysteme, Automatisierung klinischer Dokumentation via Sprache-zu-Text-Technologie." },
      accountants: { name: "Buchhaltung", desc: "Intelligente Rechnungsverarbeitung via OCR, automatisierte Kundenkommunikation und Fristenmanagementsysteme." },
      architecten: { name: "Architektur", desc: "Angebotsgenerierungssysteme, Projektkommunikationsinfrastruktur und phasenbasierte Rechnungsautomatisierung." },
      garages: { name: "Kfz-Betriebe", desc: "Werkstattmanagementdigitalisierung, automatisierte Kundenstatuskommunikation und Angebotsgenerierungssysteme." },
      horeca: { name: "Gastronomie", desc: "Reservierungsinfrastruktur, Personalplanungssysteme und Gästekommunikationsprogramme." },
    },
    s6Label: "EUROPA", s6Title: "Europaweit aktiv",
    s6: [
      "EDA Systems operiert kontinentweit, mit aktiven Einsätzen auf mehreren europäischen Märkten. Unsere Infrastruktur ist von Grund auf für den Betrieb über sprachliche, regulatorische und operative Grenzen hinweg konzipiert.",
      "Wir bedienen Organisationen jeder Größe — von unabhängigen Fachleuten bis hin zu Multi-Standort-Unternehmen.",
      "Unser europäischer Ansatz basiert auf einer grundlegenden Überzeugung: dass die operativen Standards der größten Konzerne der Welt ebenso zugänglich sein sollten für die professionellen Unternehmen, die das Rückgrat der europäischen Wirtschaft bilden.",
    ],
    s7Label: "WAS UNS AUSZEICHNET", s7Title: "Was EDA Systems auszeichnet",
    s7: [
      "Wir sind kein Softwareunternehmen. Wir bieten keine Lizenzen, Abonnements oder Plattformen an.",
      "Wir sind ein Digitalisierungspartner. Wir übernehmen die volle Verantwortung für Analyse, Design, Implementierung, Integration und laufendes Management der von uns eingesetzten Systeme.",
      "Jedes Programm umfasst vollständige Installation innerhalb von sieben Werktagen, umfassende Integration mit bestehenden Systemen und kontinuierlichen Support — ohne versteckte Kosten.",
    ],
    s8Label: "UNSER STANDARD", s8Title: "Unser Standard",
    s8: [
      "EDA Systems verpflichtet sich einem einzigen Standard: dass jedes Unternehmen, mit dem wir arbeiten, nach unserem Engagement effizienter, profitabler und mit größerer Kapazität arbeiten soll. Nicht marginal. Messbar.",
      "Dieser Standard treibt jedes System an, das wir entwerfen, jede Integration, die wir aufbauen, und jedes Programm, das wir verwalten.",
    ],
    closing: "EDA Systems — Intelligente Digitalisierungsinfrastruktur für europäische Fachleute.",
    ctaTitle: "Bereit, Ihr Unternehmen auf Autopilot zu setzen?",
    ctaSector: "Wählen Sie Ihre Branche", ctaContact: "Kontakt",
  },
};

function OverOnsContent() {
  const { lang } = useT();
  const c = CONTENT[lang] ?? CONTENT.en;

  return (
    <main className="min-h-screen animate-fade-in" style={{ background: "#040810" }}>
      <Nav />

      {/* Hero / intro */}
      <section className="relative overflow-hidden" style={{ padding: "160px 0 100px" }}>
        <div className="absolute inset-0 grid-overlay-faint pointer-events-none" />
        <div className="absolute inset-0 particle-bg pointer-events-none" />
        <div className="relative mx-auto max-w-4xl px-6">
          <SectionLabel>{c.s1Label}</SectionLabel>
          <h1
            className="mt-6 text-white animate-fade-up"
            style={{ fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.05 }}
          >
            {c.pageTitle}
          </h1>
          <p
            className="mt-8 animate-fade-up [animation-delay:120ms]"
            style={{ color: "#94A3B8", fontSize: 20, lineHeight: 1.6, maxWidth: 640, fontWeight: 500 }}
          >
            {c.opening}
          </p>
        </div>
      </section>

      {/* Section 1 */}
      <TextSection label={c.s1Label} title={c.s1Title} paragraphs={c.s1} dark />

      {/* Section 2 */}
      <TextSection label={c.s2Label} title={c.s2Title} paragraphs={c.s2} />

      {/* Section 3 */}
      <TextSection label={c.s3Label} title={c.s3Title} paragraphs={c.s3} dark />

      {/* Section 4 — capability grid */}
      <section className="relative" style={{ padding: "100px 0", borderTop: "1px solid #0F2040" }}>
        <div className="mx-auto max-w-4xl px-6">
          <SectionLabel>{c.s4Label}</SectionLabel>
          <h2 className="mt-5 text-white" style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em" }}>
            {c.s4Title}
          </h2>
          <div className="mt-10 grid md:grid-cols-2 gap-px" style={{ background: "#1E293B" }}>
            {c.capabilities.map((cap) => (
              <div key={cap.label} style={{ background: "#040810", padding: "28px 24px" }}>
                <div style={{ color: "#60A5FA", fontSize: 11, fontWeight: 600, letterSpacing: "0.12em" }}>
                  {cap.label}
                </div>
                <p className="mt-3" style={{ color: "#94A3B8", fontSize: 14, lineHeight: 1.7 }}>
                  {cap.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5 — sectors */}
      <section className="relative" style={{ padding: "100px 0", borderTop: "1px solid #0F2040", background: "#060D1A" }}>
        <div className="mx-auto max-w-4xl px-6">
          <SectionLabel>{c.s5Label}</SectionLabel>
          <h2 className="mt-5 text-white" style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em" }}>
            {c.s5Title}
          </h2>
          <p className="mt-6" style={{ color: "#94A3B8", fontSize: 15, lineHeight: 1.8, maxWidth: 640 }}>
            {c.s5Intro}
          </p>

          <div className="mt-10">
            {SECTORS.map((s, i) => {
              const Icon = s.icon;
              const sc = c.sectors[s.key];
              return (
                <div
                  key={s.key}
                  className="flex items-start gap-4 group animate-fade-up"
                  style={{
                    padding: "20px 0",
                    borderBottom: i === SECTORS.length - 1 ? "none" : "1px solid #1E293B",
                    animationDelay: `${i * 50}ms`,
                  }}
                >
                  <div
                    className="shrink-0 flex items-center justify-center mt-1"
                    style={{
                      width: 32, height: 32, borderRadius: 4,
                      background: `${s.accent}14`,
                      border: `1px solid ${s.accent}33`,
                    }}
                  >
                    <Icon size={16} strokeWidth={1.5} style={{ color: s.accent }} />
                  </div>
                  <div className="flex-1">
                    <div className="text-white" style={{ fontSize: 15, fontWeight: 600, letterSpacing: "-0.01em" }}>
                      {sc.name}
                    </div>
                    <div className="mt-1" style={{ color: "#64748B", fontSize: 13, lineHeight: 1.7 }}>
                      {sc.desc}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 6 */}
      <TextSection label={c.s6Label} title={c.s6Title} paragraphs={c.s6} />

      {/* Section 7 */}
      <TextSection label={c.s7Label} title={c.s7Title} paragraphs={c.s7} dark />

      {/* Section 8 */}
      <TextSection label={c.s8Label} title={c.s8Title} paragraphs={c.s8} />

      {/* Closing line */}
      <section className="relative" style={{ padding: "60px 0", borderTop: "1px solid #0F2040", background: "#060D1A" }}>
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p style={{ color: "#94A3B8", fontSize: 15, lineHeight: 1.7, fontStyle: "italic" }}>
            {c.closing}
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="relative" style={{ padding: "120px 0", borderTop: "1px solid #0F2040" }}>
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-white" style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.15 }}>
            {c.ctaTitle}
          </h2>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
            <Button variant="hero" size="xl" style={{ borderRadius: 3 }} asChild>
              <Link to="/">{c.ctaSector} <ArrowRight className="size-4" /></Link>
            </Button>
            <Button variant="glass" size="xl" style={{ borderRadius: 3 }} asChild>
              <a href="mailto:info@edasystems.be">{c.ctaContact} <ArrowRight className="size-4" /></a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function TextSection({
  label, title, paragraphs, dark,
}: { label: string; title: string; paragraphs: string[]; dark?: boolean }) {
  return (
    <section
      className="relative"
      style={{
        padding: "100px 0",
        borderTop: "1px solid #0F2040",
        background: dark ? "#060D1A" : "transparent",
      }}
    >
      <div className="mx-auto max-w-4xl px-6">
        <SectionLabel>{label}</SectionLabel>
        <h2 className="mt-5 text-white" style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em" }}>
          {title}
        </h2>
        <div className="mt-8 space-y-6" style={{ maxWidth: 720 }}>
          {paragraphs.map((p, i) => (
            <p key={i} style={{ color: "#94A3B8", fontSize: 15, lineHeight: 1.8 }}>
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
