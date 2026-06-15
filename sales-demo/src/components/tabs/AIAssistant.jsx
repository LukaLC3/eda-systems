import { useState, useEffect, useRef } from 'react'
import { Send, Bot, User, Sparkles, Brain, Database, Zap } from 'lucide-react'

function getTime(offsetMin = 0) {
  const d = new Date(Date.now() + offsetMin * 60000)
  return `${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`
}

function buildSmartAnswer(question, sector) {
  const q = question.toLowerCase().trim()
  const questions = sector.aiQuestions || []

  // Exact match
  const exact = questions.find(x => x.q.toLowerCase() === q)
  if (exact) return exact.a

  // Keyword matching against predefined Q&A
  const keywords = {
    'lead': 0, 'leads': 0, 'aanvrag': 0, 'contact': 0,
    'no-show': 1, 'afspraak': 1, 'reservering': 1, 'agenda': 1, 'plan': 1,
    'factuur': 2, 'betaling': 2, 'omzet': 2, 'openstaand': 2, 'admin': 2,
    'rapport': 3, 'analyse': 3, 'overzicht': 3, 'genereer': 3, 'stuur': 3,
  }
  for (const [kw, idx] of Object.entries(keywords)) {
    if (q.includes(kw) && questions[idx]) return questions[idx].a
  }

  // Generic smart responses based on sector
  if (q.includes('help') || q.includes('wat kan')) {
    const qList = questions.map((x,i) => `${i+1}. ${x.q}`).join('\n')
    return `Ik ben uw persoonlijke AI getraind op uw ${sector.name.toLowerCase()} bedrijf. Ik kan u helpen met:\n\n${qList}\n\nStuur mij ook een eigen vraag — ik gebruik uw bedrijfsdata voor een accuraat antwoord.`
  }
  if (q.includes('hoe') || q.includes('wat is')) {
    return `Op basis van uw bedrijfsdata in het systeem kan ik dit berekenen. Momenteel heb ik toegang tot uw:\n\n• Klantendossiers & contacthistory\n• Agenda & afspraken (real-time)\n• Facturen & betalingen\n• Communicatiegeschiedenis (WhatsApp + e-mail)\n\nKunt u uw vraag wat specifieker stellen? Bijv. "Hoeveel [X] hadden we deze week?"?`
  }
  if (q.includes('tijd') || q.includes('bespaar')) {
    return `Tijdsbesparingsanalyse voor uw bedrijf:\n\n⏱️ Administratie: gemiddeld 2.8u/dag bespaard\n📱 Communicatie: 1.4u/dag (automatische antwoorden)\n📅 Agendabeheer: 0.8u/dag\n📄 Facturatie: 0.6u/dag\n\nTotaal: ~5.6u/dag — dat is €252/dag bij €45/u tarief.\n\nMaandelijkse besparing: ±€5.544 vs pakketprijs van €597.`
  }
  if (q.includes('klant') || q.includes('tevred')) {
    return `Klanttevredenheidsoverzicht:\n\n⭐ Gemiddelde score: 4.8/5\n📊 Gebaseerd op: 47 reviews dit jaar\n📈 Trend: +0.3 vs vorig jaar\n\nTopredenen voor tevredenheid:\n1. Snelle responstijd (gem. 2 min)\n2. Proactieve communicatie\n3. Minder fouten door automatisering\n\n3 negatieve reviews → allemaal persoonlijk opgevolgd → 2 klanten terug.`
  }

  // Fallback — always useful
  return `Bedankt voor uw vraag! Op basis van uw ${sector.name.toLowerCase()} data analyseer ik dit momenteel.\n\nKorte update:\n• Vandaag zijn er ${sector.metrics?.[0]?.value || 'meerdere'} ${sector.metrics?.[0]?.label?.toLowerCase() || 'activiteiten'} geregistreerd\n• Systeem draait optimaal — ${sector.metrics?.[2]?.value || '—'} bespaard\n• Alle automatisaties actief ✅\n\nWil u een gedetailleerd rapport ontvangen? Ik stuur het direct naar uw e-mail.`
}

export default function AIAssistant({ sector, activePackage }) {
  const questions = sector.aiQuestions || []
  const [msgs, setMsgs] = useState([])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const bottomRef = useRef(null)

  // Init messages on sector change
  useEffect(() => {
    const first = questions[0]
    setMsgs([
      { from:'ai', text:`Welkom! Ik ben de eigen AI van uw ${sector.name.toLowerCase()} bedrijf. Ik ben getraind op al uw klantdata, agenda, facturen en communicatie.\n\nStel mij een vraag of gebruik een van de snelle knoppen hieronder.`, time: getTime(-5) },
      ...(first ? [
        { from:'user', text: first.q, time: getTime(-4) },
        { from:'ai', text: first.a, time: getTime(-3) },
      ] : [])
    ])
    setInput('')
    setTyping(false)
  }, [sector.id])

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior:'smooth' }) }, [msgs, typing])

  function send(text) {
    const q = (text ?? input).trim()
    if (!q || typing) return
    setInput('')
    setMsgs(m => [...m, { from:'user', text:q, time:getTime() }])
    setTyping(true)
    setTimeout(() => {
      const answer = buildSmartAnswer(q, sector)
      setMsgs(m => [...m, { from:'ai', text:answer, time:getTime() }])
      setTyping(false)
    }, Math.random() * 600 + 900)
  }

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100%', gap:12 }}>
      {/* Header */}
      <div style={{ background:'rgba(37,99,235,0.07)', border:'1px solid rgba(37,99,235,0.2)', borderRadius:12, padding:'12px 16px', display:'flex', alignItems:'center', gap:10 }}>
        <div style={{ width:36, height:36, borderRadius:10, background:'linear-gradient(135deg,#2563EB,#7C3AED)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, boxShadow:'0 4px 12px rgba(37,99,235,0.4)' }}>
          <Brain size={18} color="#fff" />
        </div>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:13, fontWeight:700, color:'#fff' }}>Eigen AI — getraind op uw {sector.name.toLowerCase()} bedrijf</div>
          <div style={{ fontSize:11, color:'rgba(255,255,255,0.4)', marginTop:1 }}>Toegang tot klantdata · agenda · facturen · communicatie · 24/7 beschikbaar</div>
        </div>
        <div style={{ display:'flex', gap:6, alignItems:'center' }}>
          <div style={{ display:'flex', alignItems:'center', gap:4, fontSize:10, color:'#10B981', fontFamily:'monospace', background:'rgba(16,185,129,0.1)', padding:'3px 8px', borderRadius:999, border:'1px solid rgba(16,185,129,0.2)' }}>
            <span className="pulse-dot" style={{ width:5, height:5, borderRadius:'50%', background:'#10B981', display:'inline-block' }} />
            ONLINE
          </div>
          <span className="badge badge-purple" style={{fontSize:9}}>AI AGENT</span>
        </div>
      </div>

      {/* Data sources */}
      <div style={{ display:'flex', gap:8 }}>
        {[
          { icon:<Database size={11}/>, label:'Klantendossiers', color:'#2563EB' },
          { icon:<Zap size={11}/>, label:'Real-time agenda', color:'#10B981' },
          { icon:<Sparkles size={11}/>, label:'Facturen & betalingen', color:'#F59E0B' },
          { icon:<Bot size={11}/>, label:'Communicatie history', color:'#8B5CF6' },
        ].map((s,i) => (
          <div key={i} style={{ display:'flex', alignItems:'center', gap:5, padding:'4px 10px', borderRadius:7, background:`${s.color}10`, border:`1px solid ${s.color}25`, fontSize:10, color:s.color, fontWeight:500 }}>
            {s.icon} {s.label}
          </div>
        ))}
      </div>

      {/* Quick chips */}
      <div style={{ display:'flex', gap:7, flexWrap:'wrap' }}>
        {questions.map((qn,i) => (
          <button key={i} onClick={() => send(qn.q)} style={{ padding:'6px 13px', borderRadius:999, background:'rgba(37,99,235,0.08)', border:'1px solid rgba(37,99,235,0.25)', color:'#93C5FD', fontSize:11, cursor:'pointer', transition:'all 0.15s', fontWeight:500 }}
            onMouseEnter={e => { e.currentTarget.style.background='rgba(37,99,235,0.2)'; e.currentTarget.style.borderColor='#2563EB' }}
            onMouseLeave={e => { e.currentTarget.style.background='rgba(37,99,235,0.08)'; e.currentTarget.style.borderColor='rgba(37,99,235,0.25)' }}>
            {qn.q}
          </button>
        ))}
      </div>

      {/* Messages */}
      <div style={{ flex:1, overflowY:'auto', display:'flex', flexDirection:'column', gap:12, padding:16, background:'rgba(7,15,30,0.6)', borderRadius:12, border:'1px solid rgba(37,99,235,0.1)', minHeight:280 }}>
        {msgs.map((msg, i) => {
          const isAI = msg.from === 'ai'
          return (
            <div key={i} className="fade-in" style={{ display:'flex', justifyContent: isAI?'flex-start':'flex-end', gap:8, alignItems:'flex-end' }}>
              {isAI && (
                <div style={{ width:28, height:28, borderRadius:8, background:'linear-gradient(135deg,#2563EB,#7C3AED)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  <Brain size={13} color="#fff" />
                </div>
              )}
              <div style={{ maxWidth:'75%', padding:'10px 14px', borderRadius: isAI?'4px 14px 14px 14px':'14px 4px 14px 14px', background: isAI?'rgba(12,26,52,0.97)':'#2563EB', color:'rgba(255,255,255,0.9)', fontSize:12.5, lineHeight:1.65, whiteSpace:'pre-wrap', border: isAI?'1px solid rgba(37,99,235,0.2)':'none', boxShadow: isAI?'0 4px 12px rgba(0,0,0,0.3)':'0 4px 12px rgba(37,99,235,0.3)' }}>
                {msg.text}
                <div style={{ fontSize:10, color:'rgba(255,255,255,0.25)', marginTop:5, textAlign: isAI?'left':'right', fontFamily:'monospace' }}>{msg.time}</div>
              </div>
              {!isAI && (
                <div style={{ width:28, height:28, borderRadius:8, background:'rgba(255,255,255,0.08)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  <User size={13} color="rgba(255,255,255,0.5)" />
                </div>
              )}
            </div>
          )
        })}
        {typing && (
          <div style={{ display:'flex', gap:8, alignItems:'flex-end' }}>
            <div style={{ width:28, height:28, borderRadius:8, background:'linear-gradient(135deg,#2563EB,#7C3AED)', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <Brain size={13} color="#fff" />
            </div>
            <div style={{ padding:'12px 16px', borderRadius:'4px 14px 14px 14px', background:'rgba(12,26,52,0.97)', border:'1px solid rgba(37,99,235,0.2)', display:'flex', gap:5, alignItems:'center' }}>
              {[0,1,2].map(j => <div key={j} className="typing-dot" style={{ width:7, height:7, borderRadius:'50%', background:'#2563EB' }} />)}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{ display:'flex', gap:10, padding:'11px 14px', background:'rgba(10,22,40,0.9)', border:'1px solid rgba(37,99,235,0.2)', borderRadius:12, alignItems:'center' }}>
        <Sparkles size={15} color="rgba(37,99,235,0.6)" style={{ flexShrink:0 }} />
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key==='Enter' && !e.shiftKey && send()} placeholder={`Stel een vraag over uw ${sector.name.toLowerCase()} bedrijf...`} style={{ flex:1, background:'transparent', border:'none', outline:'none', color:'rgba(255,255,255,0.85)', fontSize:13 }} />
        <button onClick={() => send()} disabled={!input.trim() || typing} style={{ width:36, height:36, borderRadius:9, background: input.trim() && !typing ? '#2563EB' : 'rgba(37,99,235,0.2)', border:'none', cursor: input.trim() && !typing ? 'pointer' : 'default', display:'flex', alignItems:'center', justifyContent:'center', transition:'background 0.15s', boxShadow: input.trim() && !typing ? '0 4px 12px rgba(37,99,235,0.4)' : 'none' }}>
          <Send size={14} color="#fff" />
        </button>
      </div>
    </div>
  )
}
