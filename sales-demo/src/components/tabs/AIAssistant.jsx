import { useState, useEffect, useRef } from 'react'
import { Send, Bot, User, Sparkles } from 'lucide-react'

const SECTOR_QA = {
  vastgoed: {
    chips: [
      'Welke panden zijn beschikbaar onder €1.800/mnd?',
      'Hoe verloopt het bezichtigingsproces?',
      'Wat zijn jullie makelaarskosten?',
      'Hoe lang duurt een huurcontract opstellen?',
    ],
    answers: {
      'Welke panden zijn beschikbaar onder €1.800/mnd?': 'Op dit moment hebben wij 6 woningen beschikbaar onder €1.800 per maand in uw zoekgebied:\n\n• Bloemgracht 24 – 3-kamer, 85m², €1.550/mnd\n• Elandsgracht 67 – 4-kamer, 98m², €1.595/mnd\n• Prinsengracht 12 – 2-kamer, 55m², €1.250/mnd\n• Jordaan studio – 42m², €895/mnd\n\nWilt u voor één of meerdere panden een bezichtiging inplannen?',
      default: 'Dank u voor uw vraag! Ik help u graag verder. Op basis van uw vraag kan ik u direct informeren over beschikbaarheid, prijzen en het verhuurproces. Kunt u uw vraag wat meer specificeren zodat ik u optimaal kan helpen?',
    },
  },
  zorg: {
    chips: [
      'Hoe maak ik een nieuwe afspraak?',
      'Wat zijn de openingstijden van de praktijk?',
      'Hoe vraag ik een verwijsbrief aan?',
      'Welke verzekeringen worden geaccepteerd?',
    ],
    answers: {
      'Hoe maak ik een nieuwe afspraak?': 'Een afspraak maken is eenvoudig! U heeft drie opties:\n\n1️⃣ Via WhatsApp – Stuur ons een bericht en wij plannen direct een afspraak in\n2️⃣ Online – Via onze website kunt u 24/7 een afspraak inplannen\n3️⃣ Telefonisch – Bel ons op ma-vr tussen 08:00 en 17:00\n\nDe eerstvolgende beschikbare afspraken zijn: morgen 10:30 en overmorgen 09:00. Welk tijdstip past u?',
      default: 'Goedemorgen! Ik ben de AI-assistent van onze zorgpraktijk en help u graag verder. Voor medische vragen verwijs ik u altijd door naar onze zorgprofessionals, maar voor praktische vragen sta ik 24/7 klaar!',
    },
  },
  fitness: {
    chips: [
      'Welke groepslessen zijn er deze week?',
      'Wat kost een maandabonnement?',
      'Is er een proefperiode mogelijk?',
      'Hoe annuleer ik mijn abonnement?',
    ],
    answers: {
      'Welke groepslessen zijn er deze week?': 'Deze week staan de volgende groepslessen ingepland:\n\n🏋️ BodyPump – Ma/Wo/Vr 09:00 & 18:30\n🔥 HIIT Training – Di/Do 07:00 & 17:30\n🧘 Yoga – Ma/Wo 10:00 & 19:00\n🚴 Spinning – Di/Do 06:30 & 18:00\n💪 Pilates – Wo/Vr 11:00\n\nAlle lessen duren 60 minuten. Wilt u een plek reserveren voor een specifieke les?',
      default: 'Hey! 💪 Ik ben de AI-assistent van FitZone en help je graag verder. Of je nu vragen hebt over abonnementen, roosters of trainingsschema\'s — ik sta voor je klaar!',
    },
  },
  administratie: {
    chips: [
      'Wanneer is mijn aangifte gereed?',
      'Hoe upload ik documenten?',
      'Wat zijn jullie tarieven?',
      'Kan ik mijn facturen inzien?',
    ],
    answers: {
      'Wanneer is mijn aangifte gereed?': 'Uw belastingaangifte 2025 staat ingepland voor oplevering op vrijdag 14 juni. De accountant heeft het concept gisteren ontvangen voor finale review.\n\nU ontvangt een e-mail zodra de aangifte definitief klaar is ter ondertekening. Wilt u een voorlopig overzicht van de kerncijfers?',
      default: 'Goedemiddag! Ik ben de digitale assistent van uw administratiekantoor. Ik kan u helpen met vragen over uw dossier, deadlines, documenten en meer. Wat kan ik voor u doen?',
    },
  },
  creatief: {
    chips: [
      'Hoelang duurt een logo ontwerp?',
      'Wat kost een complete huisstijl?',
      'Kunnen jullie ook social media content maken?',
      'Hoe verloopt het revisieproces?',
    ],
    answers: {
      'Hoelang duurt een logo ontwerp?': 'Een volledig logo traject doorloopt de volgende fases:\n\n1️⃣ Briefing & research – 2-3 dagen\n2️⃣ Eerste concepten (3 richtingen) – 4-5 werkdagen\n3️⃣ Revisieronde – 2 werkdagen\n4️⃣ Finale oplevering met alle bestandsformaten – 1 dag\n\nTotale doorlooptijd: **10-14 werkdagen** inclusief 2 revisierondes.\n\nSpoed mogelijk voor een toeslag van 25%. Heeft u een deadline waar we rekening mee moeten houden?',
      default: 'Hoi! Ik ben de creatieve AI-assistent van ons bureau. Of je nu vragen hebt over projecten, offertes of ons creatief proces — ik help je graag verder!',
    },
  },
  technisch: {
    chips: [
      'Hoe meld ik een storing?',
      'Hoe snel komt er een monteur?',
      'Wat kost een servicecontract?',
      'Is er 24/7 spoedservice?',
    ],
    answers: {
      'Hoe meld ik een storing?': 'Een storing melden kan via meerdere kanalen:\n\n📱 WhatsApp – Stuur een bericht met foto/video van het probleem\n📞 Telefoon – 085-123 4567 (ma-vr 07:00-18:00, spoedlijn 24/7)\n🌐 Online – Via het klantenportaal\n📧 E-mail – storingen@eda-technisch.nl\n\nBij een spoedmelding (geen warm water / geen stroom) reageren wij binnen 30 minuten en sturen wij direct een monteur.\n\nWat is het type storing?',
      default: 'Goedemorgen! Ik ben de technische AI-assistent. Ik kan u helpen bij het melden van storingen, inplannen van onderhoud en beantwoorden van technische vragen. Wat kan ik voor u doen?',
    },
  },
  horeca: {
    chips: [
      'Kan ik een tafel reserveren voor vanavond?',
      'Hebben jullie een vegetarisch menu?',
      'Wat zijn de openingstijden?',
      'Is er parkeergelegenheid?',
    ],
    answers: {
      'Kan ik een tafel reserveren voor vanavond?': 'Goedemiddag! Vanavond hebben wij nog beschikbaarheid op de volgende tijdstippen:\n\n🕕 18:00 – 2 t/m 4 personen beschikbaar\n🕖 19:00 – Alleen nog 2-persoonstafel\n🕗 20:30 – Ruime beschikbaarheid\n\nHoeveel personen bent u met en welke tijd heeft uw voorkeur? Dan maak ik direct een reservering voor u aan!',
      default: 'Welkom! Ik ben de digitale gastheer van ons restaurant. Ik help u graag met reserveringen, menuinformatie, openingstijden en meer. Waarmee kan ik u van dienst zijn?',
    },
  },
}

function getInitialMessages(sector) {
  const qa = SECTOR_QA[sector.id] || SECTOR_QA.vastgoed
  const chip = qa.chips[0]
  const answer = qa.answers[chip] || qa.answers.default
  return [
    {
      from: 'ai',
      text: `Welkom! Ik ben de AI-assistent getraind op uw ${sector.name.toLowerCase()} bedrijf. Stel mij een vraag over uw sector, klanten of processen.`,
      time: getTime(-4),
    },
    {
      from: 'user',
      text: chip,
      time: getTime(-3),
    },
    {
      from: 'ai',
      text: answer,
      time: getTime(-2),
    },
  ]
}

function getTime(offsetMinutes = 0) {
  const d = new Date(Date.now() + offsetMinutes * 60000)
  return d.toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' })
}

export default function AIAssistant({ sector }) {
  const qa = SECTOR_QA[sector.id] || SECTOR_QA.vastgoed
  const [messages, setMessages] = useState(() => getInitialMessages(sector))
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    setMessages(getInitialMessages(sector))
    setInputValue('')
    setIsTyping(false)
  }, [sector.id])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  function getAnswer(question) {
    if (qa.answers[question]) return qa.answers[question]
    const lower = question.toLowerCase()
    for (const [key, val] of Object.entries(qa.answers)) {
      if (key !== 'default' && lower.includes(key.toLowerCase().slice(0, 15))) return val
    }
    return qa.answers.default || `Bedankt voor uw vraag over "${question}". Ik ben getraind op specifieke kennis van de ${sector.name} sector en help u graag verder. Kunt u uw vraag wat meer specificeren?`
  }

  function handleSend(text) {
    const q = (text || inputValue).trim()
    if (!q) return
    setInputValue('')
    const userMsg = { from: 'user', text: q, time: getTime() }
    setMessages(prev => [...prev, userMsg])
    setIsTyping(true)
    setTimeout(() => {
      const answer = getAnswer(q)
      const aiMsg = { from: 'ai', text: answer, time: getTime() }
      setMessages(prev => [...prev, aiMsg])
      setIsTyping(false)
    }, 1500)
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 0 }}>
      {/* Header badge */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '10px 16px',
          background: 'rgba(37,99,235,0.08)',
          border: '1px solid rgba(37,99,235,0.2)',
          borderRadius: 10,
          marginBottom: 16,
        }}
      >
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: 10,
            background: '#2563EB',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <Bot size={18} color="white" />
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'white' }}>
            Eigen AI getraind op uw bedrijf
          </div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)' }}>
            Sector: {sector.name} · Beschikbaar 24/7 · Getraind op uw data
          </div>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              fontSize: 10,
              color: '#10B981',
              fontFamily: 'JetBrains Mono, monospace',
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: '#10B981',
                animation: 'pulseDot 2s infinite',
                display: 'inline-block',
              }}
            />
            ONLINE
          </div>
          <div
            style={{
              fontSize: 10,
              padding: '3px 10px',
              borderRadius: 999,
              background: 'rgba(139,92,246,0.2)',
              color: '#A78BFA',
              fontFamily: 'JetBrains Mono, monospace',
              fontWeight: 700,
              border: '1px solid rgba(139,92,246,0.3)',
            }}
          >
            AI AGENT
          </div>
        </div>
      </div>

      {/* Quick reply chips */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 14 }}>
        {qa.chips.map((chip, i) => (
          <button
            key={i}
            onClick={() => handleSend(chip)}
            style={{
              padding: '6px 14px',
              borderRadius: 999,
              background: 'rgba(37,99,235,0.1)',
              border: '1px solid rgba(37,99,235,0.3)',
              color: '#60A5FA',
              fontSize: 12,
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(37,99,235,0.25)'
              e.currentTarget.style.borderColor = '#2563EB'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(37,99,235,0.1)'
              e.currentTarget.style.borderColor = 'rgba(37,99,235,0.3)'
            }}
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Messages */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
          padding: '16px',
          background: 'rgba(7,15,30,0.6)',
          borderRadius: 12,
          border: '1px solid rgba(37,99,235,0.12)',
          minHeight: 300,
          marginBottom: 14,
        }}
      >
        {messages.map((msg, i) => {
          const isAI = msg.from === 'ai'
          return (
            <div
              key={i}
              className="fade-in"
              style={{
                display: 'flex',
                justifyContent: isAI ? 'flex-start' : 'flex-end',
                alignItems: 'flex-end',
                gap: 8,
              }}
            >
              {isAI && (
                <div
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 8,
                    background: '#2563EB',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    fontSize: 11,
                    fontWeight: 700,
                    color: 'white',
                  }}
                >
                  AI
                </div>
              )}
              <div
                style={{
                  maxWidth: '72%',
                  padding: '10px 14px',
                  borderRadius: isAI ? '4px 12px 12px 12px' : '12px 4px 12px 12px',
                  background: isAI ? 'rgba(15,30,60,0.95)' : '#2563EB',
                  color: 'rgba(255,255,255,0.9)',
                  fontSize: 13,
                  lineHeight: 1.6,
                  whiteSpace: 'pre-wrap',
                  border: isAI ? '1px solid rgba(37,99,235,0.2)' : 'none',
                }}
              >
                {msg.text}
                <div
                  style={{
                    fontSize: 10,
                    color: 'rgba(255,255,255,0.3)',
                    marginTop: 5,
                    textAlign: isAI ? 'left' : 'right',
                  }}
                >
                  {msg.time}
                </div>
              </div>
              {!isAI && (
                <div
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 8,
                    background: 'rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <User size={15} color="rgba(255,255,255,0.6)" />
                </div>
              )}
            </div>
          )
        })}

        {/* Typing indicator */}
        {isTyping && (
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: 8,
                background: '#2563EB',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                fontSize: 11,
                fontWeight: 700,
                color: 'white',
              }}
            >
              AI
            </div>
            <div
              style={{
                padding: '12px 16px',
                borderRadius: '4px 12px 12px 12px',
                background: 'rgba(15,30,60,0.95)',
                border: '1px solid rgba(37,99,235,0.2)',
                display: 'flex',
                gap: 5,
                alignItems: 'center',
              }}
            >
              {[0, 1, 2].map(d => (
                <div
                  key={d}
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    background: '#2563EB',
                    animation: `pulseDot 1.2s ${d * 0.2}s infinite`,
                  }}
                />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div
        style={{
          display: 'flex',
          gap: 10,
          padding: '12px 14px',
          background: 'rgba(10,22,40,0.9)',
          border: '1px solid rgba(37,99,235,0.2)',
          borderRadius: 12,
        }}
      >
        <Sparkles size={16} style={{ color: 'rgba(37,99,235,0.6)', marginTop: 10, flexShrink: 0 }} />
        <input
          type="text"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={`Stel een vraag over ${sector.name.toLowerCase()}...`}
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: 'white',
            fontSize: 13,
          }}
        />
        <button
          onClick={() => handleSend()}
          disabled={!inputValue.trim() || isTyping}
          style={{
            width: 36,
            height: 36,
            borderRadius: 8,
            background: inputValue.trim() && !isTyping ? '#2563EB' : 'rgba(37,99,235,0.3)',
            border: 'none',
            cursor: inputValue.trim() && !isTyping ? 'pointer' : 'default',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            transition: 'background 0.15s',
          }}
        >
          <Send size={15} color="white" />
        </button>
      </div>
    </div>
  )
}
