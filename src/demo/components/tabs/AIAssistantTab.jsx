import React, { useState, useRef, useEffect } from 'react'
import { Send, Bot } from 'lucide-react'

const sectorQA = {
  vastgoed: [
    { q: 'Hoeveel bezichtigingen staan er gepland deze week?', a: 'Deze week zijn er 8 bezichtigingen ingepland voor 5 verschillende panden. De eerstvolgende is vandaag om 14:00 voor Stationsstraat 14. 3 bezichtigingen zijn nog in afwachting van bevestiging door de kandidaat-kopers.' },
    { q: 'Stuur een update naar alle actieve leads', a: 'Ik heb 12 actieve leads geïdentificeerd. Ik kan een gepersonaliseerde update sturen met de nieuwste panden die aan hun criteria voldoen. Wil ik dit automatisch doen, of wil u de berichten eerst reviewen?' },
    { q: 'Wat is de gemiddelde commissie deze maand?', a: 'Op basis van de afgesloten dossiers deze maand bedraagt de gemiddelde commissie €3.850 per transactie. Totaal: 3 verkopen en 2 verhuren = €12.400 commissie-omzet.' },
    { q: 'Welke panden zijn al 30+ dagen te koop?', a: 'Er zijn 2 panden die langer dan 30 dagen in de markt staan:\n\n• Kerkstraat 8 (45 dagen) - Prijs mogelijk te hoog\n• Acacialaan 12 (38 dagen) - 0 bezichtigingen vorige week\n\nAdvies: prijscorrectie of extra marketing overwegen?' },
  ],
  tandarts: [
    { q: 'Hoeveel patiënten hebben geen afspraak meer gepland?', a: 'Er zijn 23 patiënten die meer dan 6 maanden geleden hun laatste afspraak hadden en nog geen nieuwe hebben ingepland. Ik kan automatisch een herinnering sturen. Wil ik dat doen?' },
    { q: 'Wat zijn de openstaande facturen?', a: 'Er staan momenteel 7 openstaande facturen:\n\n• Totaal openstaand: €1.840\n• Oudste factuur: 45 dagen\n• 3 facturen > 30 dagen\n\nIk kan automatisch een betalingsherinnering sturen naar de betrokken patiënten.' },
    { q: 'Plan een herinneringscampagne voor tandencontroles', a: 'Ik identificeer 31 patiënten die aan een halfjaarlijkse controle toe zijn. Ik kan hen via WhatsApp een persoonlijk bericht sturen met 3 beschikbare tijdslots. Verwachte conversie: 60-70% nieuwe afspraken.' },
    { q: 'Toon de bezettingsgraad van volgende week', a: 'Volgende week bezettingsgraad:\n\nMa: 85% ■■■■░\nDi: 70% ■■■░░\nWo: 90% ■■■■■\nDo: 60% ■■■░░\nVr: 45% ■■░░░\n\nGemiddeld: 70%. Donderdag en vrijdag hebben nog vrije tijdslots.' },
  ],
  kinesist: [
    { q: 'Welke patiënten hebben hun oefeningen niet gedaan?', a: 'Van de 18 patiënten met thuisoefeningen deze week hebben 5 patiënten géén bevestiging gestuurd:\n\n• Ahmed Bouazza (3 dagen geen feedback)\n• Els Martens (2 dagen)\n• + 3 anderen\n\nWil ik een motivatiebericht sturen?' },
    { q: 'Genereer een voortgangsrapport voor patiënt Ahmed Bouazza', a: 'Voortgangsrapport Ahmed Bouazza:\n\n✅ 4 weken revalidatie\n📈 Pijnschaal: van 8/10 naar 3/10\n🏋️ Oefencompliance: 78%\n📅 Nog 6 sessies gepland\n\nAanbeveling: intensiteit verhogen naar niveau 3 volgende week.' },
    { q: 'Hoeveel sessies zijn er volgende maand gepland?', a: 'Volgende maand staan 34 sessies gepland verdeeld over 12 actieve patiënten. Verwachte omzet: €4.080. Er zijn nog 8 open slots beschikbaar. Wil ik wachtlijstpatiënten contacteren?' },
    { q: 'Stuur oefenschema naar alle actieve patiënten', a: 'Ik stuur gepersonaliseerde oefenschema\'s naar 18 actieve patiënten. Elk schema is aangepast aan de behandelfase. Berichten worden verstuurd via WhatsApp tussen 8:00 en 9:00. Bevestig om te starten?' },
  ],
  accountant: [
    { q: 'Wanneer is de volgende BTW-deadline?', a: 'Volgende BTW-deadlines:\n\n📅 Q2 aangifte: over 5 dagen (20 juli)\n📅 Q3 aangifte: 20 oktober\n📅 Jaarlijkse listing: 31 maart\n\n⚠️ Actie vereist: 47 transacties van Q2 zijn verwerkt, 3 transacties wachten op validatie.' },
    { q: 'Verwerk alle facturen van deze week', a: 'OCR-verwerking voltooid:\n\n✅ 23 facturen automatisch verwerkt\n⚠️ 2 facturen vereisen handmatige controle (slechte scankwaliteit)\n\nTotaal inkomend: €4.820\nTotaal uitgaand: €2.340\n\nWil ik een samenvatting sturen naar de klant?' },
    { q: 'Welke klanten hebben hun documenten nog niet aangeleverd?', a: '7 klanten hebben hun documenten voor de maandafsluiting nog niet aangeleverd:\n\n• De Smet BVBA (herinnering 2x)\n• Bakkerij Leclercq\n• + 5 anderen\n\nIk kan automatisch een herinnering met instructies sturen. Akkoord?' },
    { q: 'Genereer een overzicht van openstaande dossiers', a: 'Actieve dossiers overzicht:\n\n📂 Lopend: 14 dossiers\n✅ Klaar voor indienen: 6\n⏳ Wacht op info klant: 5\n❌ Actie vereist: 3\n\nPrioriteit: aangifte De Smet NV (deadline morgen)' },
  ],
  architect: [
    { q: 'Wat is de status van alle lopende vergunningsaanvragen?', a: 'Vergunningsoverzicht:\n\n🔄 Bogaert woning: in behandeling bij gemeente (dag 23/60)\n✅ Renovatie Steyaert: goedgekeurd!\n⏳ Nieuwbouw Leuven: wordt ingediend deze week\n❌ Verbouwing Gent: bijkomende info gevraagd\n\nDeadline deze week: Leuven indienen voor vrijdag.' },
    { q: 'Welke projecten naderen hun deadline?', a: 'Kritieke deadlines komende 2 weken:\n\n🔴 Project Leuven: uitvoeringsplannen - 3 dagen\n🟡 Steyaert renovatie: bestek - 8 dagen\n🟢 Bogaert woning: nog 35 dagen\n\nAdvies: projectmedewerker toewijzen aan Leuven voor sprint.' },
    { q: 'Stuur een projectupdate naar alle klanten', a: 'Ik stel gepersonaliseerde projectupdates op voor 8 actieve klanten. Elke update bevat:\n• Huidige projectfase\n• Volgende mijlpaal\n• Eventuele openstaande punten\n\nWil u de berichten eerst reviewen voor verzending?' },
    { q: 'Bereken de verwachte omzet van Q3', a: 'Verwachte omzet Q3:\n\n📊 Lopende projecten (honorarium restant): €18.400\n📋 Nieuwe offertes in onderhandeling: €12.200\n🏗️ Totaal verwacht: €30.600\n\nVorig jaar Q3: €24.100 (+27% groei)' },
  ],
  garage: [
    { q: 'Welke voertuigen zijn vandaag klaar voor ophaling?', a: 'Vandaag klaar voor ophaling:\n\n🚗 VW Golf - Karel Hermans (grote beurt)\n🚙 Ford Focus - Nathalie Peeters (bandenwisseling)\n🏎️ BMW 3-serie - Jan Willems (remmen)\n\nBetalingsstatus: Hermans nog openstaand. Automatisch betalingsverzoek verstuurd.' },
    { q: 'Stuur onderhoudherinneringen naar klanten', a: '12 voertuigen zijn toe aan onderhoud of APK:\n\n• 5 voertuigen: kilometer-gebaseerd onderhoud\n• 4 voertuigen: APK verlopen of binnenkort\n• 3 voertuigen: seizoenswissel banden\n\nIk stuur gepersonaliseerde WhatsApp berichten met afspraakaanbod. Akkoord?' },
    { q: 'Wat is de gemiddelde werkorderduur deze maand?', a: 'Werkorder statistieken deze maand:\n\n⏱️ Gemiddelde duur: 2u 45min\n✅ Op tijd afgewerkt: 87%\n📊 Populairste werkzaamheden: beurten (34%), remmen (21%), banden (18%)\n\nMeest winstgevend: motor diagnostics (€180/uur marge)' },
    { q: 'Genereer een werkplanning voor volgende week', a: 'Volgende week zijn er 12 afspraken gepland over 5 dagen. Aanbevolen planning:\n\n• Ma/Vr: zware ingrepen (meer tijd)\n• Di/Do: APK-keuringen en kleine beurten\n• Woe: reserveer 2 slots voor spoedgevallen\n\nCapaciteit: 85% bezet, ruimte voor 2 extra afspraken.' },
  ],
  horeca: [
    { q: 'Hoeveel reserveringen zijn er dit weekend?', a: 'Weekend reserveringen:\n\n🍽️ Vrijdag: 23 tafels (94 couverts) — bijna volledig bezet\n🍽️ Zaterdag: 19 tafels (78 couverts)\n🍽️ Zondag: 14 tafels (52 couverts)\n\n⚠️ Vrijdag 20:00 is volledig volgeboekt. 3 verzoeken op wachtlijst gezet.' },
    { q: 'Zijn er allergieën geregistreerd voor vanavond?', a: 'Allergie overzicht vanavond:\n\n⚠️ Tafel 4 (Janssen, 20:00): 1x glutenintolerant\n⚠️ Tafel 7 (Willems, 19:30): 2x notenallergie (ernstig)\n⚠️ Tafel 12 (Dubois, 21:00): 1x lactose-intolerant\n\nKeuken automatisch op de hoogte gesteld. Allergiemenu beschikbaar.' },
    { q: 'Stuur verjaardagsberichten naar klanten deze week', a: '4 vaste klanten zijn deze week jarig:\n\n🎂 Dirk Verhoeven - woensdag\n🎂 Anna Claes - vrijdag\n🎂 Peter en Marie Leclercq - zondag\n\nIk stuur gepersonaliseerde berichten met een gratis dessert aanbieding. Verwachte omzet extra bezoeken: +€280.' },
    { q: 'Wat zijn de populairste gerechten van deze maand?', a: 'Top 5 meest bestelde gerechten:\n\n1. 🥩 Côte à l\'os (247x)\n2. 🐟 Zalm risotto (198x)\n3. 🍝 Truffel pasta (167x)\n4. 🥗 Burrata salade (143x)\n5. 🍖 Lamskoteletten (129x)\n\nBeste marge: truffel pasta (68% marge). Overweeg als dagspecialiteit?' },
  ],
}

const genericAnswer = 'Ik begrijp uw vraag. Op basis van uw data kan ik u verder helpen. Wilt u meer details of wil u dat ik een actie uitvoer? Typ uw specifieke vraag of kies een suggestie hieronder.'

function TypingIndicator() {
  return (
    <div className="flex items-end gap-1 px-4 py-3 rounded-2xl rounded-bl-none" style={{ background: '#1E2D45', width: '80px' }}>
      <span className="typing-dot w-2 h-2 rounded-full" style={{ background: '#94A3B8', display: 'inline-block' }} />
      <span className="typing-dot w-2 h-2 rounded-full" style={{ background: '#94A3B8', display: 'inline-block' }} />
      <span className="typing-dot w-2 h-2 rounded-full" style={{ background: '#94A3B8', display: 'inline-block' }} />
    </div>
  )
}

export default function AIAssistantTab({ sector }) {
  const qa = sectorQA[sector.id] || sectorQA.vastgoed
  const [messages, setMessages] = useState([
    { id: 0, sender: 'ai', text: `Hallo! Ik ben uw AI-assistent voor ${sector.name}. Hoe kan ik u vandaag helpen?` }
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const endRef = useRef(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  function findAnswer(question) {
    const q = question.toLowerCase()
    for (const pair of qa) {
      if (pair.q.toLowerCase().split(' ').some(w => w.length > 4 && q.includes(w))) {
        return pair.a
      }
    }
    return genericAnswer
  }

  function sendMessage(text) {
    if (!text.trim()) return
    const userMsg = { id: Date.now(), sender: 'user', text }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      const answer = findAnswer(text)
      setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'ai', text: answer }])
    }, 1500)
  }

  function handleKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(input)
    }
  }

  return (
    <div className="flex flex-col rounded-xl overflow-hidden" style={{ height: '520px', border: '1px solid #1E2D45' }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-3" style={{ background: '#0D1B2E', borderBottom: '1px solid #1E2D45' }}>
        <div className="p-2 rounded-lg" style={{ background: sector.color + '20' }}>
          <Bot size={16} style={{ color: sector.color }} />
        </div>
        <div>
          <div className="text-sm font-semibold text-white">AI Assistent</div>
          <div className="text-xs" style={{ color: '#64748B' }}>Powered by EDA Systems</div>
        </div>
        <div className="ml-auto flex items-center gap-1.5 text-xs" style={{ color: '#10B981' }}>
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#10B981' }} />
          Online
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ background: '#060D1A' }}>
        {messages.map(msg => (
          <div key={msg.id} className={`flex animate-fade-in ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.sender === 'ai' && (
              <div className="w-7 h-7 rounded-full flex items-center justify-center mr-2 flex-shrink-0 mt-1" style={{ background: sector.color + '20' }}>
                <Bot size={12} style={{ color: sector.color }} />
              </div>
            )}
            <div
              className="px-4 py-2.5 rounded-2xl text-sm"
              style={{
                maxWidth: '72%',
                background: msg.sender === 'user' ? sector.color : '#1E2D45',
                color: '#F1F5F9',
                borderBottomRightRadius: msg.sender === 'user' ? '4px' : '16px',
                borderBottomLeftRadius: msg.sender === 'user' ? '16px' : '4px',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
              }}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {typing && (
          <div className="flex items-end gap-2 animate-fade-in">
            <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: sector.color + '20' }}>
              <Bot size={12} style={{ color: sector.color }} />
            </div>
            <TypingIndicator />
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* Suggestions */}
      <div className="px-4 py-2 flex gap-2 overflow-x-auto" style={{ background: '#0D1B2E', borderTop: '1px solid #1E2D45' }}>
        {qa.slice(0, 3).map((pair, i) => (
          <button
            key={i}
            onClick={() => sendMessage(pair.q)}
            className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors"
            style={{ background: '#1E2D45', color: '#94A3B8', border: `1px solid ${sector.color}40`, whiteSpace: 'nowrap' }}
          >
            {pair.q.length > 35 ? pair.q.slice(0, 35) + '...' : pair.q}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="px-4 py-3 flex items-center gap-2" style={{ background: '#0D1B2E', borderTop: '1px solid #1E2D45' }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Stel een vraag aan uw AI assistent..."
          className="flex-1 px-4 py-2 rounded-xl text-sm outline-none"
          style={{ background: '#1E2D45', color: '#F1F5F9', border: `1px solid #334155` }}
        />
        <button
          onClick={() => sendMessage(input)}
          disabled={!input.trim()}
          className="p-2.5 rounded-xl transition-colors"
          style={{ background: input.trim() ? sector.color : '#1E2D45', color: '#fff' }}
        >
          <Send size={14} />
        </button>
      </div>
    </div>
  )
}
