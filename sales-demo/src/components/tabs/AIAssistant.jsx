import { useState, useEffect, useRef } from 'react'
import {
  Send, User, Sparkles, Brain, Database, Zap, CheckCircle2,
  Calendar, Receipt, Mail, Phone, FileBarChart, Search, XCircle, Bell, Calculator
} from 'lucide-react'

function getTime(offsetMin = 0) {
  const d = new Date(Date.now() + offsetMin * 60000)
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
}
function futureTime(minAhead) {
  const d = new Date(Date.now() + minAhead * 60000)
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
}
const DAYS = ['zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag']
function nextDayLabel(daysAhead = 1) {
  const d = new Date(Date.now() + daysAhead * 86400000)
  return `${DAYS[d.getDay()]} ${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}`
}
function euro(n) {
  return '€' + n.toLocaleString('nl-BE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}
function pickName(sector) {
  const c = sector.whatsapp?.[0]?.contact
  return c || 'de klant'
}
function rand(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min }

// ── Intent engine ───────────────────────────────────────────────
// Returns { text, action } where action is an optional result card.
function interpret(raw, sector) {
  const q = raw.toLowerCase().trim()
  const has = (...words) => words.some(w => q.includes(w))
  const mgr = sector.accountManager || 'uw accountmanager'
  const isHoreca = sector.id === 'horeca'

  // ACTION: send message / reminder / confirmation
  if (has('stuur', 'verstuur', 'verzend', 'mail ', 'mailen', 'herinner', 'herinnering', 'bevestig', 'bericht')) {
    const target = pickName(sector)
    const channel = has('mail', 'email', 'e-mail') ? 'E-mail' : 'WhatsApp'
    return {
      text: `Komt in orde. Ik stel het bericht op, personaliseer het met de klantgegevens uit het dossier en verstuur het meteen via ${channel}.`,
      action: {
        kind: 'confirm', accent: '#10B981', icon: channel === 'E-mail' ? Mail : Bell,
        title: `Bericht verzonden via ${channel}`,
        rows: [
          ['Ontvanger', target],
          ['Kanaal', channel],
          ['Verzonden', getTime()],
          ['Status', 'Afgeleverd ✓'],
        ],
        note: 'Ik volg automatisch op als er binnen 24u geen reactie komt.',
      },
    }
  }

  // ACTION: schedule appointment / booking
  if (has('plan', 'inplannen', 'boek', 'reserveer', 'afspraak maken', 'zet ', 'agendeer')) {
    const slot = futureTime(rand(60, 240))
    const day = nextDayLabel(rand(1, 4))
    const what = isHoreca ? 'Tafelreservering' : 'Afspraak'
    return {
      text: `Ik check de agenda op vrije slots, vermijd dubbele boekingen en plan het direct in. De klant krijgt automatisch een bevestiging + herinnering.`,
      action: {
        kind: 'confirm', accent: '#2563EB', icon: Calendar,
        title: `${what} ingepland`,
        rows: [
          [isHoreca ? 'Gast' : 'Klant', pickName(sector)],
          ['Datum', `${day}`],
          ['Tijdstip', slot],
          ['Bevestiging', 'Verstuurd ✓'],
          ['Herinnering', `${nextDayLabel(1)} 09:00 ingepland`],
        ],
        note: 'Toegevoegd aan de agenda — zichtbaar in tab "Agenda".',
      },
    }
  }

  // ACTION: generate invoice
  if ((has('maak', 'genereer', 'opstellen', 'stel op', 'creëer') && has('factuur', 'rekening', 'nota')) || has('factureer')) {
    const num = `F2026-${rand(100, 999)}`
    const base = rand(150, 4500)
    const vat = Math.round(base * 0.21 * 100) / 100
    return {
      text: `Ik genereer de factuur op basis van de geleverde diensten, bereken automatisch 21% BTW, koppel uw bedrijfsgegevens en IBAN, en zet hem klaar in de administratie.`,
      action: {
        kind: 'confirm', accent: '#F59E0B', icon: Receipt,
        title: `Factuur ${num} gegenereerd`,
        rows: [
          ['Klant', pickName(sector)],
          ['Bedrag excl.', euro(base)],
          ['BTW 21%', euro(vat)],
          ['Totaal', euro(base + vat)],
          ['Vervaldatum', nextDayLabel(30)],
          ['Status', 'Klaar om te versturen'],
        ],
        note: 'Open de tab "Administratie" om de factuur te bekijken of direct te versturen.',
      },
    }
  }

  // ACTION: cancel
  if (has('annuleer', 'cancel', 'schrap', 'verzet')) {
    return {
      text: `Ik annuleer dit, stel het tijdslot weer vrij en breng de klant automatisch op de hoogte met een vriendelijk bericht + voorstel voor een nieuw moment.`,
      action: {
        kind: 'confirm', accent: '#EF4444', icon: XCircle,
        title: 'Geannuleerd & klant geïnformeerd',
        rows: [
          ['Klant', pickName(sector)],
          ['Tijdslot', 'Weer vrijgegeven ✓'],
          ['Bericht', 'Verstuurd met nieuwe slots'],
          ['Status', 'Afgehandeld'],
        ],
        note: 'Het vrijgekomen slot is automatisch aangeboden aan de wachtlijst.',
      },
    }
  }

  // ACTION: callback
  if (has('bel', 'terugbel', 'opbellen', 'telefoon')) {
    return {
      text: `Ik zet een terugbelverzoek klaar, prioriteer op basis van leadwaarde en plan het op het eerstvolgende vrije moment in uw agenda.`,
      action: {
        kind: 'confirm', accent: '#06B6D4', icon: Phone,
        title: 'Terugbelverzoek ingepland',
        rows: [
          ['Contact', pickName(sector)],
          ['Gepland', `vandaag ${futureTime(rand(30, 120))}`],
          ['Prioriteit', 'Hoog'],
          ['Notitie', 'Klantdossier bijgevoegd'],
        ],
      },
    }
  }

  // ACTION: generate report
  if (has('rapport', 'verslag', 'samenvatting') && has('maak', 'genereer', 'stuur', 'geef', 'toon')) {
    const a = sector.adminSummary || {}
    return {
      text: `Ik stel een volledig rapport samen op basis van alle data van deze week en stuur het naar uw e-mail.`,
      action: {
        kind: 'confirm', accent: '#8B5CF6', icon: FileBarChart,
        title: 'Weekrapport gegenereerd',
        rows: [
          ['Periode', 'Deze week'],
          ['Omzet', euro(a.total || 0)],
          ['Openstaand', euro(a.openstaand || 0)],
          ['Tijd bespaard', a.timeSaved || '—'],
          ['Verzonden naar', 'uw e-mail ✓'],
        ],
        note: 'Volledig rapport ook zichtbaar in tab "Rapporten".',
      },
    }
  }

  // ── QUESTIONS — match against sector Q&A ──────────────────────
  const questions = sector.aiQuestions || []
  const exact = questions.find(x => x.q.toLowerCase() === q)
  if (exact) return { text: exact.a }

  // best keyword score against predefined Q&A
  let best = null, bestScore = 0
  for (const item of questions) {
    const words = item.q.toLowerCase().split(/\W+/).filter(w => w.length > 3)
    let score = 0
    for (const w of words) if (q.includes(w)) score++
    if (score > bestScore) { bestScore = score; best = item }
  }
  if (best && bestScore >= 1) return { text: best.a }

  // topical keyword fallback
  if (has('lead', 'aanvrag', 'contact', 'nieuwe klant')) {
    return { text: questions[0]?.a || `Vandaag zijn er ${sector.metrics?.[0]?.value} nieuwe ${sector.metrics?.[0]?.label?.toLowerCase()} binnengekomen — allemaal automatisch opgevolgd binnen 2 minuten.` }
  }
  if (has('afspraak', 'agenda', 'no-show', 'reservering', 'planning')) {
    const s = sector.agendaStats || {}
    return { text: `Agenda-overzicht: ${s.reminders || 0} herinneringen verstuurd deze week, ${s.noShows || 0} no-shows (${s.trend || ''} t.o.v. vorige periode). Alle afspraken worden automatisch bevestigd en herinnerd.` }
  }
  if (has('factuur', 'betaling', 'openstaand', 'omzet', 'geld', 'verdien')) {
    const a = sector.adminSummary || {}
    return { text: `Financieel overzicht:\n\n💰 Omzet: ${euro(a.total || 0)} (${a.count || 0} facturen)\n⏳ Openstaand: ${euro(a.openstaand || 0)}\n⏱️ Tijd bespaard op administratie: ${a.timeSaved || '—'}\n\nWil je dat ik de openstaande facturen automatisch laat aanmanen?` }
  }
  if (has('tijd', 'bespaar', 'efficiënt', 'productiv')) {
    return { text: `Tijdsbesparing voor uw ${sector.name.toLowerCase()}:\n\n⏱️ Administratie: 2.8u/dag\n📱 Communicatie: 1.4u/dag\n📅 Agendabeheer: 0.8u/dag\n\nTotaal ±5u/dag = ruim €5.000/maand aan bespaarde werktijd.` }
  }
  if (has('klant', 'tevred', 'review', 'score')) {
    return { text: `Klanttevredenheid: ⭐ 4.8/5 op basis van 47 reviews dit jaar (+0.3 t.o.v. vorig jaar).\n\nTop redenen: snelle respons (gem. 2 min), proactieve communicatie en minder fouten dankzij automatisering.` }
  }
  if (has('wat kan', 'help', 'wie ben', 'wat doe', 'mogelijk')) {
    return {
      text: `Ik ben uw persoonlijke AI-agent, getraind op uw ${sector.name.toLowerCase()}. Ik kan niet alleen vragen beantwoorden — ik voer ook taken uit:\n\n📤 "Stuur een herinnering naar de klant"\n📅 "Plan een afspraak in"\n🧾 "Maak een factuur op"\n📊 "Genereer een weekrapport"\n📞 "Plan een terugbelverzoek"\n❌ "Annuleer de afspraak"\n\nEn ik beantwoord elke vraag over uw leads, agenda, omzet en klanten — direct uit uw bedrijfsdata.`,
    }
  }

  // INTELLIGENT GENERIC FALLBACK — always grounded in data
  const m = sector.metrics || []
  return {
    text: `Goede vraag. Op basis van uw actuele ${sector.name.toLowerCase()}-data:\n\n• ${m[0]?.label}: ${m[0]?.value} (${m[0]?.delta})\n• ${m[1]?.label}: ${m[1]?.value} (${m[1]?.delta})\n• ${m[2]?.label}: ${m[2]?.value}\n\nWil je dat ik hier een concrete actie aan koppel? Zeg bijvoorbeeld "stuur een rapport" of "plan dit in" en ik regel het direct. (Vraag begeleid door ${mgr})`,
  }
}

// ── Action result card ──────────────────────────────────────────
function ActionCard({ action }) {
  const Icon = action.icon || CheckCircle2
  const c = action.accent || '#10B981'
  return (
    <div className="fade-in" style={{ marginTop: 10, background: 'rgba(7,15,30,0.9)', border: `1px solid ${c}40`, borderRadius: 12, overflow: 'hidden', boxShadow: `0 4px 20px ${c}22` }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '10px 14px', background: `${c}14`, borderBottom: `1px solid ${c}30` }}>
        <div style={{ width: 26, height: 26, borderRadius: 7, background: c, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Icon size={14} color="#fff" />
        </div>
        <span style={{ fontSize: 12.5, fontWeight: 700, color: '#fff' }}>{action.title}</span>
        <span style={{ marginLeft: 'auto', fontSize: 9, fontFamily: 'monospace', color: c, background: `${c}1f`, padding: '2px 7px', borderRadius: 999, border: `1px solid ${c}40` }}>UITGEVOERD</span>
      </div>
      <div style={{ padding: '10px 14px', display: 'flex', flexDirection: 'column', gap: 5 }}>
        {action.rows.map(([k, v], i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11.5, gap: 12 }}>
            <span style={{ color: 'rgba(255,255,255,0.4)' }}>{k}</span>
            <span className="num" style={{ color: 'rgba(255,255,255,0.92)', fontWeight: 600, textAlign: 'right' }}>{v}</span>
          </div>
        ))}
        {action.note && (
          <div style={{ marginTop: 6, paddingTop: 8, borderTop: '1px solid rgba(255,255,255,0.06)', fontSize: 10.5, color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>
            ⚡ {action.note}
          </div>
        )}
      </div>
    </div>
  )
}

const SUGGESTIONS = [
  { label: '📅 Plan een afspraak in', cmd: 'Plan een afspraak in voor de klant' },
  { label: '📤 Stuur een herinnering', cmd: 'Stuur een herinnering naar de klant' },
  { label: '🧾 Maak een factuur op', cmd: 'Maak een factuur op voor de laatste opdracht' },
  { label: '📊 Genereer een weekrapport', cmd: 'Genereer een weekrapport en stuur het' },
  { label: '📞 Plan een terugbelverzoek', cmd: 'Bel de klant terug' },
]

export default function AIAssistant({ sector }) {
  const questions = sector.aiQuestions || []
  const [msgs, setMsgs] = useState([])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    setMsgs([
      { from: 'ai', text: `Welkom! Ik ben de persoonlijke AI-agent van uw ${sector.name.toLowerCase()}. Ik ben getraind op al uw klantdata, agenda, facturen en communicatie.\n\nIk beantwoord niet alleen vragen — ik voer ook taken uit. Zeg bijvoorbeeld "plan een afspraak in" of "maak een factuur op" en ik regel het direct.`, time: getTime(-3) },
    ])
    setInput('')
    setTyping(false)
  }, [sector.id])

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [msgs, typing])

  function send(text) {
    const qStr = (text ?? input).trim()
    if (!qStr || typing) return
    setInput('')
    setMsgs(m => [...m, { from: 'user', text: qStr, time: getTime() }])
    setTyping(true)
    setTimeout(() => {
      const res = interpret(qStr, sector)
      setMsgs(m => [...m, { from: 'ai', text: res.text, action: res.action, time: getTime() }])
      setTyping(false)
    }, rand(800, 1500))
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 12 }}>
      {/* Header */}
      <div style={{ background: 'rgba(37,99,235,0.07)', border: '1px solid rgba(37,99,235,0.2)', borderRadius: 12, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg,#2563EB,#7C3AED)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 4px 12px rgba(37,99,235,0.4)' }}>
          <Brain size={18} color="#fff" />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>Persoonlijke AI-agent — uw {sector.name.toLowerCase()}</div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 1 }}>Beantwoordt vragen · voert taken uit · 24/7 beschikbaar</div>
        </div>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 10, color: '#10B981', fontFamily: 'monospace', background: 'rgba(16,185,129,0.1)', padding: '3px 8px', borderRadius: 999, border: '1px solid rgba(16,185,129,0.2)' }}>
            <span className="pulse-dot" style={{ width: 5, height: 5, borderRadius: '50%', background: '#10B981', display: 'inline-block' }} />
            ONLINE
          </div>
          <span className="badge badge-purple" style={{ fontSize: 9 }}>AI AGENT</span>
        </div>
      </div>

      {/* Data sources */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {[
          { icon: <Database size={11} />, label: 'Klantendossiers', color: '#2563EB' },
          { icon: <Zap size={11} />, label: 'Real-time agenda', color: '#10B981' },
          { icon: <Sparkles size={11} />, label: 'Facturen & betalingen', color: '#F59E0B' },
          { icon: <Brain size={11} />, label: 'Communicatie history', color: '#8B5CF6' },
        ].map((s, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '4px 10px', borderRadius: 7, background: `${s.color}10`, border: `1px solid ${s.color}25`, fontSize: 10, color: s.color, fontWeight: 500 }}>
            {s.icon} {s.label}
          </div>
        ))}
      </div>

      {/* Action suggestions + questions */}
      <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
        {SUGGESTIONS.map((s, i) => (
          <button key={i} onClick={() => send(s.cmd)} style={{ padding: '6px 13px', borderRadius: 999, background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.3)', color: '#C4B5FD', fontSize: 11, cursor: 'pointer', transition: 'all 0.15s', fontWeight: 600 }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(124,58,237,0.25)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(124,58,237,0.1)' }}>
            {s.label}
          </button>
        ))}
        {questions.slice(0, 3).map((qn, i) => (
          <button key={'q' + i} onClick={() => send(qn.q)} style={{ padding: '6px 13px', borderRadius: 999, background: 'rgba(37,99,235,0.08)', border: '1px solid rgba(37,99,235,0.25)', color: '#93C5FD', fontSize: 11, cursor: 'pointer', transition: 'all 0.15s', fontWeight: 500 }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(37,99,235,0.2)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(37,99,235,0.08)' }}>
            {qn.q}
          </button>
        ))}
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 12, padding: 16, background: 'rgba(7,15,30,0.6)', borderRadius: 12, border: '1px solid rgba(37,99,235,0.1)', minHeight: 260 }}>
        {msgs.map((msg, i) => {
          const isAI = msg.from === 'ai'
          return (
            <div key={i} className="fade-in" style={{ display: 'flex', justifyContent: isAI ? 'flex-start' : 'flex-end', gap: 8, alignItems: 'flex-end' }}>
              {isAI && (
                <div style={{ width: 28, height: 28, borderRadius: 8, background: 'linear-gradient(135deg,#2563EB,#7C3AED)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Brain size={13} color="#fff" />
                </div>
              )}
              <div style={{ maxWidth: '78%', padding: '10px 14px', borderRadius: isAI ? '4px 14px 14px 14px' : '14px 4px 14px 14px', background: isAI ? 'rgba(12,26,52,0.97)' : '#2563EB', color: 'rgba(255,255,255,0.9)', fontSize: 12.5, lineHeight: 1.65, whiteSpace: 'pre-wrap', border: isAI ? '1px solid rgba(37,99,235,0.2)' : 'none', boxShadow: isAI ? '0 4px 12px rgba(0,0,0,0.3)' : '0 4px 12px rgba(37,99,235,0.3)' }}>
                {msg.text}
                {msg.action && <ActionCard action={msg.action} />}
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)', marginTop: 5, textAlign: isAI ? 'left' : 'right', fontFamily: 'monospace' }}>{msg.time}</div>
              </div>
              {!isAI && (
                <div style={{ width: 28, height: 28, borderRadius: 8, background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <User size={13} color="rgba(255,255,255,0.5)" />
                </div>
              )}
            </div>
          )
        })}
        {typing && (
          <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: 'linear-gradient(135deg,#2563EB,#7C3AED)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Brain size={13} color="#fff" />
            </div>
            <div style={{ padding: '12px 16px', borderRadius: '4px 14px 14px 14px', background: 'rgba(12,26,52,0.97)', border: '1px solid rgba(37,99,235,0.2)', display: 'flex', gap: 5, alignItems: 'center' }}>
              {[0, 1, 2].map(j => <div key={j} className="typing-dot" style={{ width: 7, height: 7, borderRadius: '50%', background: '#2563EB' }} />)}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{ display: 'flex', gap: 10, padding: '11px 14px', background: 'rgba(10,22,40,0.9)', border: '1px solid rgba(37,99,235,0.2)', borderRadius: 12, alignItems: 'center' }}>
        <Sparkles size={15} color="rgba(37,99,235,0.6)" style={{ flexShrink: 0 }} />
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && !e.shiftKey && send()} placeholder={`Stel een vraag of geef een opdracht aan uw AI-agent...`} style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: 'rgba(255,255,255,0.85)', fontSize: 13 }} />
        <button onClick={() => send()} disabled={!input.trim() || typing} style={{ width: 36, height: 36, borderRadius: 9, background: input.trim() && !typing ? '#2563EB' : 'rgba(37,99,235,0.2)', border: 'none', cursor: input.trim() && !typing ? 'pointer' : 'default', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.15s', boxShadow: input.trim() && !typing ? '0 4px 12px rgba(37,99,235,0.4)' : 'none' }}>
          <Send size={14} color="#fff" />
        </button>
      </div>
    </div>
  )
}
