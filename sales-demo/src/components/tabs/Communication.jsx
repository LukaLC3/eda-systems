import { useState, useEffect } from 'react'
import { Send, Mail, CheckCheck, Clock, Smile, AlertCircle, ChevronRight } from 'lucide-react'

function SentimentBadge({ text }) {
  const pos = ['dank','super','perfect','goed','graag','fantastisch','geweldig','fijn','prima','top']
  const neg = ['klacht','koud','traag','slecht','teleur','vervelend','pijn']
  const l = text.toLowerCase()
  if (neg.some(w => l.includes(w))) return <span className="badge badge-red" style={{fontSize:9}}>Negatief</span>
  if (pos.some(w => l.includes(w))) return <span className="badge badge-green" style={{fontSize:9}}>Positief</span>
  return <span className="badge" style={{fontSize:9,background:'rgba(100,116,139,0.15)',color:'#64748B',border:'1px solid rgba(100,116,139,0.2)'}}>Neutraal</span>
}

function TypingIndicator() {
  return (
    <div style={{ display:'flex', alignItems:'flex-end', gap:8, padding:'8px 0' }}>
      <div style={{ width:28, height:28, borderRadius:8, background:'#25D366', display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:700, color:'#fff', flexShrink:0 }}>AI</div>
      <div style={{ padding:'10px 14px', borderRadius:'4px 14px 14px 14px', background:'rgba(15,30,55,0.95)', border:'1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ display:'flex', gap:4, alignItems:'center' }}>
          {[0,1,2].map(i => <div key={i} className="typing-dot" style={{ width:7, height:7, borderRadius:'50%', background:'#25D366', animationDelay:`${i*0.2}s` }} />)}
        </div>
      </div>
    </div>
  )
}

export default function Communication({ sector, activePackage, liveDemoMode }) {
  const { whatsapp = [], email, color } = sector
  const [activeConv, setActiveConv] = useState(0)
  const [showTyping, setShowTyping] = useState(false)
  const [messages, setMessages] = useState(whatsapp[0]?.messages || [])
  const [inputVal, setInputVal] = useState('')
  const showSentiment = activePackage === 'aiagent'

  useEffect(() => {
    setActiveConv(0)
    setMessages(whatsapp[0]?.messages || [])
  }, [sector.id])

  useEffect(() => {
    setMessages(whatsapp[activeConv]?.messages || [])
  }, [activeConv])

  useEffect(() => {
    if (!liveDemoMode) return
    const t = setTimeout(() => {
      setShowTyping(true)
      setTimeout(() => {
        const now = new Date()
        const ts = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`
        setMessages(m => [...m, { from:'client', text:'Kunt u dit bevestigen?', time:ts }])
        setShowTyping(false)
        setTimeout(() => {
          setShowTyping(true)
          setTimeout(() => {
            setMessages(m => [...m, { from:'ai', text:'✅ Bevestigd! Alles is automatisch verwerkt en u ontvangt een bevestigingsbericht.', time:ts, delay:'3 sec' }])
            setShowTyping(false)
          }, 1500)
        }, 2000)
      }, 1500)
    }, 6000)
    return () => clearTimeout(t)
  }, [liveDemoMode, sector.id])

  function sendMsg() {
    if (!inputVal.trim()) return
    const now = new Date()
    const ts = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`
    setMessages(m => [...m, { from:'client', text:inputVal, time:ts }])
    setInputVal('')
    setShowTyping(true)
    setTimeout(() => {
      setMessages(m => [...m, { from:'ai', text:'Bedankt voor uw bericht! Ik verwerk dit automatisch en kom zo snel mogelijk bij u terug. 🤖', time:ts, delay:'2 sec' }])
      setShowTyping(false)
    }, 1600)
  }

  const conv = whatsapp[activeConv]

  return (
    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, height:'100%' }}>
      {/* WhatsApp panel */}
      <div style={{ background:'rgba(7,15,30,0.8)', border:'1px solid rgba(37,185,99,0.2)', borderRadius:14, overflow:'hidden', display:'flex', flexDirection:'column' }}>
        {/* WA Header */}
        <div style={{ background:'#075E54', padding:'12px 16px', display:'flex', alignItems:'center', gap:10 }}>
          <div style={{ width:8, height:8, borderRadius:'50%', background:'#25D366' }} className="pulse-dot" />
          <div style={{ flex:1 }}>
            <div style={{ fontSize:13, fontWeight:600, color:'#fff' }}>WhatsApp Business</div>
            <div style={{ fontSize:10, color:'rgba(255,255,255,0.6)' }}>EDA Assistant · Online · reageert in seconden</div>
          </div>
          <div style={{ fontSize:10, fontFamily:'monospace', color:'#25D366', background:'rgba(37,211,102,0.15)', padding:'3px 8px', borderRadius:999, border:'1px solid rgba(37,211,102,0.3)' }}>LIVE AI</div>
        </div>

        {/* Conversation list */}
        <div style={{ display:'flex', borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
          {whatsapp.map((c, i) => (
            <button key={c.id} onClick={() => setActiveConv(i)} style={{ flex:1, padding:'10px 12px', background: i===activeConv ? 'rgba(37,211,102,0.08)' : 'transparent', border:'none', cursor:'pointer', borderBottom: i===activeConv ? '2px solid #25D366' : '2px solid transparent', transition:'all 0.15s' }}>
              <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                <div style={{ width:28, height:28, borderRadius:'50%', background: i===activeConv ? '#25D366' : 'rgba(255,255,255,0.1)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:10, fontWeight:700, color:'#fff', flexShrink:0 }}>{c.avatar}</div>
                <div style={{ textAlign:'left', minWidth:0 }}>
                  <div style={{ fontSize:11, fontWeight:600, color: i===activeConv ? '#fff' : 'rgba(255,255,255,0.5)', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{c.contact}</div>
                  {c.status && <div style={{ fontSize:9, color:'#334155' }}>{c.status}</div>}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Messages */}
        <div style={{ flex:1, overflowY:'auto', padding:'12px 14px', display:'flex', flexDirection:'column', gap:10, background:'#0B1E17' }}>
          {messages.map((msg, i) => {
            const isAI = msg.from === 'ai'
            return (
              <div key={i} className={i >= messages.length - 1 && msg.isNew ? 'fade-in' : ''} style={{ display:'flex', flexDirection:'column', alignItems: isAI ? 'flex-start' : 'flex-end', gap:3 }}>
                {isAI && (
                  <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:1 }}>
                    <div style={{ width:20, height:20, borderRadius:5, background:'#25D366', display:'flex', alignItems:'center', justifyContent:'center', fontSize:8, fontWeight:700, color:'#fff' }}>AI</div>
                    <span style={{ fontSize:10, color:'#25D366', fontWeight:600 }}>EDA Assistant</span>
                  </div>
                )}
                <div style={{ maxWidth:'82%', padding:'9px 13px', borderRadius: isAI ? '4px 14px 14px 14px' : '14px 4px 14px 14px', background: isAI ? 'rgba(15,30,40,0.97)' : '#005C4B', color:'rgba(255,255,255,0.9)', fontSize:12.5, lineHeight:1.55, whiteSpace:'pre-wrap', border: isAI ? '1px solid rgba(255,255,255,0.08)' : 'none', boxShadow: isAI ? '0 2px 8px rgba(0,0,0,0.3)' : 'none' }}>
                  {msg.text}
                  <div style={{ display:'flex', alignItems:'center', justifyContent:'flex-end', gap:5, marginTop:4 }}>
                    {showSentiment && <SentimentBadge text={msg.text} />}
                    <span style={{ fontSize:10, color:'rgba(255,255,255,0.3)', fontFamily:'monospace' }}>{msg.time}</span>
                    {isAI && msg.delay && <span style={{ fontSize:9, color:'#25D366', background:'rgba(37,211,102,0.1)', padding:'1px 5px', borderRadius:3 }}>⚡ {msg.delay}</span>}
                    {!isAI && <CheckCheck size={11} color="rgba(255,255,255,0.3)" />}
                  </div>
                </div>
              </div>
            )
          })}
          {showTyping && <TypingIndicator />}
        </div>

        {/* Input */}
        <div style={{ padding:'10px 12px', background:'#075E54', display:'flex', gap:8, alignItems:'center' }}>
          <input value={inputVal} onChange={e => setInputVal(e.target.value)} onKeyDown={e => e.key==='Enter' && sendMsg()} placeholder="Typ een testbericht..." style={{ flex:1, background:'rgba(255,255,255,0.1)', border:'none', borderRadius:999, padding:'8px 14px', color:'#fff', fontSize:12, outline:'none' }} />
          <button onClick={sendMsg} style={{ width:34, height:34, borderRadius:'50%', background:'#25D366', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <Send size={14} color="#fff" />
          </button>
        </div>
      </div>

      {/* Email panel */}
      <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
        {email && (
          <div style={{ background:'rgba(7,15,30,0.8)', border:'1px solid rgba(255,255,255,0.06)', borderRadius:14, overflow:'hidden', flex:1 }}>
            <div style={{ padding:'12px 16px', borderBottom:'1px solid rgba(255,255,255,0.06)', display:'flex', alignItems:'center', gap:8 }}>
              <Mail size={15} color={color} />
              <div>
                <div style={{ fontSize:13, fontWeight:600, color:'#fff' }}>E-mail Automatisering</div>
                <div style={{ fontSize:10, color:'#475569' }}>AI leest & beantwoordt e-mails automatisch</div>
              </div>
              <div style={{ marginLeft:'auto', fontSize:10, fontFamily:'monospace', color:'#10B981', background:'rgba(16,185,129,0.1)', padding:'3px 8px', borderRadius:999, border:'1px solid rgba(16,185,129,0.2)' }}>
                ⚡ {email.responseTime}
              </div>
            </div>

            {/* Original */}
            <div style={{ padding:'14px 16px', borderBottom:'1px solid rgba(255,255,255,0.04)' }}>
              <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:8 }}>
                <div style={{ width:6, height:6, borderRadius:'50%', background:'#475569' }} />
                <span style={{ fontSize:10, color:'#475569', fontWeight:600, textTransform:'uppercase', letterSpacing:0.8 }}>Ontvangen e-mail</span>
              </div>
              <div style={{ fontSize:11, color:'#64748B', marginBottom:6 }}>
                <strong style={{ color:'rgba(255,255,255,0.4)' }}>Van:</strong> {email.from}<br />
                <strong style={{ color:'rgba(255,255,255,0.4)' }}>Onderwerp:</strong> {email.subject}
              </div>
              <div style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.06)', borderRadius:8, padding:'10px 12px', fontSize:12, color:'rgba(255,255,255,0.5)', lineHeight:1.6, whiteSpace:'pre-wrap' }}>
                {email.original}
              </div>
            </div>

            {/* AI Reply */}
            <div style={{ padding:'14px 16px' }}>
              <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:8 }}>
                <div style={{ width:6, height:6, borderRadius:'50%', background:color }} />
                <span style={{ fontSize:10, color:color, fontWeight:600, textTransform:'uppercase', letterSpacing:0.8 }}>AI Antwoord</span>
                <span style={{ marginLeft:'auto', fontSize:9, color:'#475569', fontFamily:'monospace' }}>Verstuurd binnen {email.responseTime}</span>
              </div>
              <div style={{ background:`${color}10`, border:`1px solid ${color}25`, borderRadius:8, padding:'10px 12px', fontSize:12, color:'rgba(255,255,255,0.75)', lineHeight:1.7, whiteSpace:'pre-wrap' }}>
                {email.aiReply}
              </div>
            </div>
          </div>
        )}

        {/* AI stats */}
        <div style={{ background:'rgba(7,15,30,0.8)', border:'1px solid rgba(255,255,255,0.06)', borderRadius:14, padding:16 }}>
          <div style={{ fontSize:12, fontWeight:600, color:'#fff', marginBottom:12 }}>Communicatiestatistieken vandaag</div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
            {[
              { label:'WhatsApp beantwoord', value:'100%', color:'#25D366' },
              { label:'E-mails verwerkt', value:'18', color:color },
              { label:'Gem. responstijd', value:email?.responseTime || '2m 30s', color:'#F59E0B' },
              { label:'Klanttevredenheid', value:'4.8★', color:'#F59E0B' },
            ].map((s,i) => (
              <div key={i} style={{ background:'rgba(255,255,255,0.03)', borderRadius:9, padding:'10px 12px', border:'1px solid rgba(255,255,255,0.05)' }}>
                <div className="num" style={{ fontSize:18, fontWeight:700, color:s.color }}>{s.value}</div>
                <div style={{ fontSize:10, color:'#475569', marginTop:2 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
