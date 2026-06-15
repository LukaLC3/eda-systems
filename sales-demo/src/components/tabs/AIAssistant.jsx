import { useState, useEffect, useRef } from 'react'
import { Send, Bot, User, Sparkles } from 'lucide-react'

function getInitialMessages(sector) {
  const firstQ = sector.aiQuestions?.[0]
  return [
    {
      from: 'ai',
      text: `Welkom! Ik ben de AI-assistent getraind op uw ${sector.name.toLowerCase()} bedrijf. Ik heb toegang tot al uw klantdata, agenda en administratie. Stel mij een vraag.`,
      time: getTime(-4),
    },
    ...(firstQ ? [
      { from: 'user', text: firstQ.q, time: getTime(-3) },
      { from: 'ai', text: firstQ.a, time: getTime(-2) },
    ] : []),
  ]
}

function getTime(offsetMinutes = 0) {
  const d = new Date(Date.now() + offsetMinutes * 60000)
  return d.toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' })
}

export default function AIAssistant({ sector }) {
  const questions = sector.aiQuestions || []
  const chips = questions.map(q => q.q)

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
    // exact match on predefined questions
    const match = questions.find(q => q.q === question)
    if (match) return match.a
    // fuzzy match
    const lower = question.toLowerCase()
    const fuzzy = questions.find(q => lower.includes(q.q.toLowerCase().slice(0, 12)))
    if (fuzzy) return fuzzy.a
    return `Bedankt voor uw vraag! Ik ben getraind op de data van uw ${sector.name.toLowerCase()} bedrijf en help u graag verder. Voor dit specifieke onderwerp kan ik u doorverbinden met uw accountmanager of een gedetailleerd rapport genereren. Wat heeft uw voorkeur?`
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
        {chips.map((chip, i) => (
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
