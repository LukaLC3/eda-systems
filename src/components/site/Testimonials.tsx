import { useT } from "@/i18n/LanguageProvider";
import { useSector } from "@/i18n/SectorProvider";
import { useReveal } from "@/hooks/use-reveal";
import { Quote, Star } from "lucide-react";
import type { Lang } from "@/i18n/translations";
import type { SectorKey } from "@/i18n/sectors";

type L4<T = string> = Record<Lang, T>;
const pick = <T,>(o: L4<T>, l: Lang): T => o[l] ?? o.en;

type Testimonial = { quote: L4; name: string; role: L4; metric: L4 };

const DATA: Record<SectorKey, Testimonial[]> = {
  vastgoed: [
    { quote: { en: "Our team went from drowning in viewing requests to a fully booked agenda — without lifting the phone.", nl: "Ons team ging van overspoeld door bezichtigingen naar een volledig geboekte agenda — zonder de telefoon op te nemen.", fr: "Notre équipe est passée d'une avalanche de demandes à un agenda plein — sans décrocher le téléphone.", de: "Unser Team ging von überwältigenden Anfragen zu einem voll gebuchten Kalender — ohne ans Telefon zu gehen." }, name: "Sophie D.", role: { en: "Managing Broker, Antwerp", nl: "Zaakvoerder makelaarskantoor, Antwerpen", fr: "Directrice agence, Anvers", de: "Geschäftsführerin, Antwerpen" }, metric: { en: "+47% viewings booked", nl: "+47% bezichtigingen geboekt", fr: "+47% visites réservées", de: "+47% Besichtigungen gebucht" } },
    { quote: { en: "Lead follow-up runs itself now. We close more deals because nothing falls through.", nl: "Leadopvolging draait nu vanzelf. We sluiten meer deals omdat er niets meer tussen valt.", fr: "Le suivi des leads se fait tout seul. On conclut plus parce que rien ne passe à la trappe.", de: "Lead-Follow-up läuft jetzt von selbst. Wir schließen mehr Deals, weil nichts mehr verloren geht." }, name: "Marc V.", role: { en: "Senior Agent, Ghent", nl: "Senior makelaar, Gent", fr: "Agent senior, Gand", de: "Senior-Makler, Gent" }, metric: { en: "0 leads lost / month", nl: "0 leads verloren / maand", fr: "0 lead perdu / mois", de: "0 verlorene Leads / Monat" } },
  ],
  tandartsen: [
    { quote: { en: "No-shows dropped to almost zero. Our chairs are full, our team is calmer.", nl: "No-shows gingen naar bijna nul. Onze stoelen zijn vol, ons team rustiger.", fr: "Les no-shows ont chuté à presque zéro. Nos fauteuils sont pleins, l'équipe sereine.", de: "No-Shows fielen auf fast null. Unsere Stühle sind voll, das Team ruhiger." }, name: "Dr. E. Janssens", role: { en: "Practice Owner, Brussels", nl: "Praktijkeigenaar, Brussel", fr: "Propriétaire de cabinet, Bruxelles", de: "Praxisinhaber, Brüssel" }, metric: { en: "−92% no-shows", nl: "−92% no-shows", fr: "−92% no-shows", de: "−92% No-Shows" } },
    { quote: { en: "I get 3 hours back every day. That's three more patients — or going home on time.", nl: "Ik krijg elke dag 3 uur terug. Dat zijn drie extra patiënten — of op tijd thuis.", fr: "Je récupère 3 heures par jour. Ce sont trois patients en plus — ou rentrer à l'heure.", de: "Ich gewinne täglich 3 Stunden zurück. Das sind drei zusätzliche Patienten — oder pünktlich heim." }, name: "Dr. S. Peeters", role: { en: "Dentist, Leuven", nl: "Tandarts, Leuven", fr: "Dentiste, Louvain", de: "Zahnärztin, Leuven" }, metric: { en: "+3h saved / day", nl: "+3u bespaard / dag", fr: "+3h économisées / jour", de: "+3 Std. gespart / Tag" } },
  ],
  kinesisten: [
    { quote: { en: "Treatment reports via voice changed my life. I leave the practice without admin work.", nl: "Behandelverslagen via spraak veranderden mijn leven. Ik verlaat de praktijk zonder admin.", fr: "Les rapports vocaux ont changé ma vie. Je quitte le cabinet sans admin.", de: "Berichte per Sprache haben mein Leben verändert. Ich verlasse die Praxis ohne Verwaltung." }, name: "L. Maes", role: { en: "Physiotherapist, Brussels", nl: "Kinesitherapeute, Brussel", fr: "Kinésithérapeute, Bruxelles", de: "Physiotherapeutin, Brüssel" }, metric: { en: "+2h saved / day", nl: "+2u bespaard / dag", fr: "+2h économisées / jour", de: "+2 Std. gespart / Tag" } },
    { quote: { en: "Series of sessions plan themselves. Patients show up, my calendar stays clean.", nl: "Sessiereeksen plannen zichzelf. Patiënten komen opdagen, agenda blijft schoon.", fr: "Les séries se planifient seules. Les patients viennent, mon agenda reste propre.", de: "Sitzungsreihen planen sich selbst. Patienten kommen, mein Kalender bleibt sauber." }, name: "K. De Smet", role: { en: "Practice Lead, Antwerp", nl: "Praktijkhouder, Antwerpen", fr: "Responsable cabinet, Anvers", de: "Praxisleitung, Antwerpen" }, metric: { en: "0 missed series", nl: "0 gemiste reeksen", fr: "0 série manquée", de: "0 verpasste Serien" } },
  ],
  accountants: [
    { quote: { en: "Invoices process in seconds. We took on 40% more clients without hiring.", nl: "Facturen verwerken in seconden. We namen 40% meer klanten aan zonder aanwervingen.", fr: "Les factures se traitent en secondes. +40% de clients sans embauche.", de: "Rechnungen werden in Sekunden verarbeitet. +40% mehr Kunden ohne Einstellungen." }, name: "N. Vermeulen", role: { en: "Accountant, Hasselt", nl: "Accountant, Hasselt", fr: "Comptable, Hasselt", de: "Buchhalter, Hasselt" }, metric: { en: "+40% client capacity", nl: "+40% klantcapaciteit", fr: "+40% capacité clients", de: "+40% Kundenkapazität" } },
    { quote: { en: "VAT prep used to take three days. Now it's ready when I open the file.", nl: "BTW-voorbereiding duurde drie dagen. Nu staat het klaar als ik het dossier open.", fr: "La prépa TVA prenait trois jours. Maintenant tout est prêt à l'ouverture du dossier.", de: "Die MwSt.-Vorbereitung dauerte drei Tage. Jetzt ist alles fertig, wenn ich die Akte öffne." }, name: "E. Claes", role: { en: "Senior Partner, Liège", nl: "Senior partner, Luik", fr: "Associé senior, Liège", de: "Senior Partner, Lüttich" }, metric: { en: "−85% prep time", nl: "−85% voorbereidingstijd", fr: "−85% temps de préparation", de: "−85% Vorbereitungszeit" } },
  ],
  architecten: [
    { quote: { en: "Quotes go out in 5 minutes. Clients are stunned. Conversion went up.", nl: "Offertes gaan eruit in 5 minuten. Klanten zijn onder de indruk. Conversie steeg.", fr: "Les devis partent en 5 minutes. Les clients sont bluffés. Conversion en hausse.", de: "Angebote gehen in 5 Minuten raus. Kunden sind beeindruckt. Konversion stieg." }, name: "W. De Vos", role: { en: "Lead Architect, Brussels", nl: "Hoofdarchitect, Brussel", fr: "Architecte principal, Bruxelles", de: "Leitender Architekt, Brüssel" }, metric: { en: "+62% quote win-rate", nl: "+62% offerte-conversie", fr: "+62% taux de conversion", de: "+62% Angebots-Erfolgsquote" } },
    { quote: { en: "Project communication runs in the background. I focus on design again.", nl: "Projectcommunicatie loopt op de achtergrond. Ik focus weer op ontwerp.", fr: "La communication projet tourne en arrière-plan. Je reviens au design.", de: "Projektkommunikation läuft im Hintergrund. Ich fokussiere wieder auf Design." }, name: "I. Renard", role: { en: "Founding Architect, Namur", nl: "Oprichter architectenbureau, Namen", fr: "Architecte fondatrice, Namur", de: "Gründungsarchitektin, Namur" }, metric: { en: "+5h focus time / day", nl: "+5u focustijd / dag", fr: "+5h temps de focus / jour", de: "+5 Std. Fokuszeit / Tag" } },
  ],
  garages: [
    { quote: { en: "Clients always know where their car is. Reviews went up across the board.", nl: "Klanten weten altijd waar hun wagen staat. Reviews gingen omhoog over de hele lijn.", fr: "Les clients savent toujours où est leur voiture. Les avis ont grimpé partout.", de: "Kunden wissen immer, wo ihr Auto ist. Bewertungen sind überall gestiegen." }, name: "J. Lemmens", role: { en: "Garage Owner, Antwerp", nl: "Garagehouder, Antwerpen", fr: "Garagiste, Anvers", de: "Werkstattbesitzer, Antwerpen" }, metric: { en: "9.4/10 avg. review", nl: "9,4/10 gem. review", fr: "9,4/10 avis moyen", de: "9,4/10 Ø Bewertung" } },
    { quote: { en: "Quotes via WhatsApp converted 3x faster than email. Game changer.", nl: "Offertes via WhatsApp converteerden 3x sneller dan e-mail. Game changer.", fr: "Les devis WhatsApp ont converti 3x plus vite que par email. Game changer.", de: "Angebote per WhatsApp konvertierten 3x schneller als per E-Mail. Game Changer." }, name: "P. Mertens", role: { en: "Service Manager, Ghent", nl: "Service Manager, Gent", fr: "Responsable service, Gand", de: "Service-Leiter, Gent" }, metric: { en: "3× faster conversion", nl: "3× snellere conversie", fr: "3× conversion plus rapide", de: "3× schnellere Konversion" } },
  ],
  horeca: [
    { quote: { en: "Reservations, staffing, reviews — all handled. We just cook and host.", nl: "Reserveringen, planning, reviews — alles geregeld. Wij koken en ontvangen alleen.", fr: "Réservations, planning, avis — tout est géré. On cuisine et on reçoit, c'est tout.", de: "Reservierungen, Planung, Bewertungen — alles erledigt. Wir kochen und empfangen nur noch." }, name: "C. Devos", role: { en: "Restaurant Owner, Bruges", nl: "Restauranteigenaar, Brugge", fr: "Restauratrice, Bruges", de: "Restaurantbesitzerin, Brügge" }, metric: { en: "+22% repeat guests", nl: "+22% terugkerende gasten", fr: "+22% clients réguliers", de: "+22% Stammgäste" } },
    { quote: { en: "Bad reviews hit my phone in seconds. I respond before they spread.", nl: "Slechte reviews komen in seconden op mijn telefoon. Ik reageer voor ze zich verspreiden.", fr: "Les mauvais avis tombent en quelques secondes sur mon tél. Je réponds avant qu'ils ne se propagent.", de: "Schlechte Bewertungen erreichen mein Handy in Sekunden. Ich reagiere, bevor sie sich verbreiten." }, name: "T. Janssens", role: { en: "Hospitality Group Lead, Brussels", nl: "Horeca-groep manager, Brussel", fr: "Manager groupe Horeca, Bruxelles", de: "Gastro-Gruppenleiter, Brüssel" }, metric: { en: "−68% bad-review reach", nl: "−68% bereik slechte reviews", fr: "−68% portée avis négatifs", de: "−68% Reichweite schlechter Bewertungen" } },
  ],
};

const TAG: L4 = { en: "TESTIMONIALS", nl: "GETUIGENISSEN", fr: "TÉMOIGNAGES", de: "STIMMEN" };
const TITLE: L4 = {
  en: "Operators across Europe rely on EDA Systems.",
  nl: "Ondernemers in heel Europa vertrouwen op EDA Systems.",
  fr: "Des opérateurs dans toute l'Europe font confiance à EDA Systems.",
  de: "Unternehmen in ganz Europa setzen auf EDA Systems.",
};

export function Testimonials() {
  const { lang } = useT();
  const { sector } = useSector();
  const ref = useReveal<HTMLDivElement>();
  const key: SectorKey = sector ?? "vastgoed";
  const list = DATA[key];

  return (
    <section className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 indigo-mesh opacity-35 pointer-events-none" />
      <div className="absolute inset-0 grid-bg opacity-[0.04] pointer-events-none" />
      <div ref={ref} className="reveal relative mx-auto max-w-6xl px-6">
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 font-mono-tech text-[11px] uppercase tracking-[0.18em] text-primary">
            <span className="size-1 rounded-full bg-primary animate-glow-pulse" />
            {pick(TAG, lang)}
          </div>
          <h2 className="font-display mt-3 text-4xl md:text-5xl font-semibold tracking-tight text-gradient">
            {pick(TITLE, lang)}
          </h2>
        </div>

        <div className="mt-14 grid md:grid-cols-2 gap-6">
          {list.map((tt, i) => (
            <div
              key={tt.name}
              className="group relative rounded-2xl border border-primary/15 bg-gradient-card p-8 overflow-hidden hover:border-primary/40 transition-all duration-500 shadow-[0_20px_60px_-30px_rgba(79,70,229,0.4)] hover:shadow-[0_30px_80px_-25px_rgba(79,70,229,0.55)]"
              style={{ animation: `fade-up 0.8s cubic-bezier(0.16,1,0.3,1) ${i * 100}ms both` }}
            >
              <div className="absolute -top-10 -right-10 size-40 rounded-full bg-primary/15 blur-3xl opacity-50 group-hover:opacity-80 transition-opacity" />
              <Quote className="size-6 text-primary/60" />
              <p className="font-display mt-5 text-xl leading-relaxed text-foreground/95">
                "{pick(tt.quote, lang)}"
              </p>
              <div className="mt-6 flex items-center gap-1 text-gold">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} className="size-3.5 fill-current" />
                ))}
              </div>
              <div className="mt-5 flex items-end justify-between border-t border-primary/15 pt-5">
                <div>
                  <div className="text-sm font-semibold">{tt.name}</div>
                  <div className="text-xs text-muted-foreground font-mono-tech">{pick(tt.role, lang)}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs uppercase tracking-wider text-muted-foreground font-mono-tech">{lang === "en" ? "Result" : lang === "fr" ? "Résultat" : lang === "de" ? "Ergebnis" : "Resultaat"}</div>
                  <div className="text-sm font-semibold text-primary font-mono-tech">{pick(tt.metric, lang)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
