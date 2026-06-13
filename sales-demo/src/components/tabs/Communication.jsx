import { useState, useEffect } from 'react'
import { Phone, Video, MoreVertical, Send, Clock, Smile, ChevronRight } from 'lucide-react'

const SENTIMENT_COLORS = {
  positief: '#10B981',
  negatief: '#EF4444',
  neutraal: '#F59E0B',
}

function detectSentiment(text) {
  const lower = text.toLowerCase()
  if (lower.includes('super') || lower.includes('dank') || lower.includes('prima') || lower.includes('graag') || lower.includes('uitstekend')) return 'positief'
  if (lower.includes('niet') || lower.includes('kapot') || lower.includes('verkeerd') || lower.includes('klopt niet')) return 'negatief'
  return 'neutraal'
}

export default function Communication({ sector, liveDemoMode, activePackage }) {
  const [activeContact, setActiveContact] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const conversations = sector.whatsappConversations

  useEffect(() => {
    if (!liveDemoMode) return
    const interval = setInterval(() => {
      setIsTyping(true)
      setTimeout(() => setIsTyping(false), 2500)
    }, 6000)
    return () => clearInterval(interval)
  }, [liveDemoMode])

  const activeConv = conversations[activeContact]

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '55% 45%', gap: 16, height: '100%' }}>
      {/* WhatsApp mockup */}
      <div
        style={{
          background: '#111B21',
          borderRadius: 12,
          border: '1px solid rgba(37,99,235,0.15)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          minHeight: 480,
        }}
      >
        {/* WA Header */}
        <div
          style={{
            background: '#202C33',
            padding: '10px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            flexShrink: 0,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                background: `${sector.color}30`,
                border: `2px solid ${sector.color}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 12,
                fontWeight: 700,
                color: sector.color,
                flexShrink: 0,
              }}
            >
              {activeConv.avatar}
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'white' }}>{activeConv.contact}</div>
              <div style={{ fontSize: 11, color: '#25D366' }}>
                {isTyping ? 'Aan het typen...' : 'online'}
              </div>
            </div>
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 14, color: 'rgba(255,255,255,0.5)' }}>
            <Phone size={16} style={{ cursor: 'pointer' }} />
            <Video size={16} style={{ cursor: 'pointer' }} />
            <MoreVertical size={16} style={{ cursor: 'pointer' }} />
          </div>
        </div>

        <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          {/* Contact list */}
          <div
            style={{
              width: 160,
              background: '#111B21',
              borderRight: '1px solid rgba(255,255,255,0.05)',
              overflowY: 'auto',
              flexShrink: 0,
            }}
          >
            {conversations.map((conv, idx) => (
              <div
                key={idx}
                onClick={() => setActiveContact(idx)}
                style={{
                  padding: '12px 14px',
                  cursor: 'pointer',
                  background: idx === activeContact ? 'rgba(255,255,255,0.05)' : 'transparent',
                  borderBottom: '1px solid rgba(255,255,255,0.04)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: `${sector.color}25`,
                    border: `1.5px solid ${sector.color}60`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 10,
                    fontWeight: 700,
                    color: sector.color,
                    flexShrink: 0,
                  }}
                >
                  {conv.avatar}
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: 'white', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {conv.contact.split(' ')[0]}
                  </div>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>
                    {conv.messages.length} berichten
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Chat window */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: '16px 14px',
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
                backgroundImage: 'radial-gradient(circle, rgba(37,99,235,0.03) 1px, transparent 1px)',
                backgroundSize: '20px 20px',
              }}
            >
              {activeConv.messages.map((msg, i) => {
                const isAI = msg.from === 'ai'
                const sentiment = activePackage === 'aiagent' && !isAI ? detectSentiment(msg.text) : null
                return (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      justifyContent: isAI ? 'flex-end' : 'flex-start',
                      alignItems: 'flex-end',
                      gap: 6,
                    }}
                  >
                    {!isAI && (
                      <div
                        style={{
                          width: 24,
                          height: 24,
                          borderRadius: '50%',
                          background: `${sector.color}30`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 8,
                          fontWeight: 700,
                          color: sector.color,
                          flexShrink: 0,
                        }}
                      >
                        {activeConv.avatar}
                      </div>
                    )}
                    <div style={{ maxWidth: '75%' }}>
                      {isAI && (
                        <div style={{ fontSize: 9, color: '#25D366', marginBottom: 3, textAlign: 'right', fontWeight: 600 }}>
                          AI Agent
                        </div>
                      )}
                      <div
                        style={{
                          padding: '8px 12px',
                          borderRadius: isAI ? '12px 2px 12px 12px' : '2px 12px 12px 12px',
                          background: isAI ? '#005C4B' : '#202C33',
                          color: 'rgba(255,255,255,0.9)',
                          fontSize: 12.5,
                          lineHeight: 1.5,
                          whiteSpace: 'pre-wrap',
                        }}
                      >
                        {msg.text}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 3, justifyContent: isAI ? 'flex-end' : 'flex-start' }}>
                        <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)' }}>{msg.time}</span>
                        {sentiment && (
                          <span
                            style={{
                              fontSize: 9,
                              padding: '1px 6px',
                              borderRadius: 999,
                              background: `${SENTIMENT_COLORS[sentiment]}20`,
                              color: SENTIMENT_COLORS[sentiment],
                              fontWeight: 600,
                              border: `1px solid ${SENTIMENT_COLORS[sentiment]}40`,
                            }}
                          >
                            {sentiment}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}

              {/* Typing indicator */}
              {isTyping && (
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <div
                    style={{
                      padding: '10px 14px',
                      borderRadius: '12px 2px 12px 12px',
                      background: '#005C4B',
                      display: 'flex',
                      gap: 4,
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
                          background: '#25D366',
                          animation: `pulseDot 1.2s ${d * 0.2}s infinite`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Input bar */}
            <div
              style={{
                padding: '10px 14px',
                background: '#202C33',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                flexShrink: 0,
              }}
            >
              <Smile size={18} style={{ color: 'rgba(255,255,255,0.4)', flexShrink: 0 }} />
              <div
                style={{
                  flex: 1,
                  background: '#2A3942',
                  borderRadius: 20,
                  padding: '8px 14px',
                  fontSize: 12,
                  color: 'rgba(255,255,255,0.4)',
                }}
              >
                Typ een bericht...
              </div>
              <Send size={18} style={{ color: '#25D366', flexShrink: 0 }} />
            </div>
          </div>
        </div>
      </div>

      {/* Email section */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: 'white' }}>E-mail Automatisering</div>
          <div
            style={{
              fontSize: 10,
              padding: '2px 8px',
              borderRadius: 999,
              background: 'rgba(37,99,235,0.2)',
              color: '#60A5FA',
              fontFamily: 'JetBrains Mono, monospace',
            }}
          >
            AI
          </div>
        </div>

        {/* Original email */}
        <div
          style={{
            background: 'rgba(10,22,40,0.8)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 10,
            padding: 16,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
            <div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 3 }}>VAN</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)' }}>{sector.emailExample.from}</div>
            </div>
            <div
              style={{
                fontSize: 10,
                padding: '3px 8px',
                borderRadius: 6,
                background: 'rgba(255,255,255,0.06)',
                color: 'rgba(255,255,255,0.4)',
              }}
            >
              Inkomend
            </div>
          </div>
          <div
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: 'white',
              marginBottom: 10,
              padding: '6px 0',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            {sector.emailExample.subject}
          </div>
          <p
            style={{
              margin: 0,
              fontSize: 12,
              color: 'rgba(255,255,255,0.6)',
              lineHeight: 1.6,
              whiteSpace: 'pre-wrap',
            }}
          >
            {sector.emailExample.original}
          </p>
        </div>

        {/* Arrow */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' }} />
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '4px 12px',
              borderRadius: 999,
              background: 'rgba(37,99,235,0.15)',
              border: '1px solid rgba(37,99,235,0.3)',
              fontSize: 11,
              color: '#60A5FA',
            }}
          >
            <Clock size={11} />
            AI analyseert & antwoordt in {sector.emailExample.responseTime}
          </div>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' }} />
        </div>

        {/* AI Reply */}
        <div
          style={{
            background: 'rgba(37,99,235,0.06)',
            border: '1px solid rgba(37,99,235,0.25)',
            borderRadius: 10,
            padding: 16,
            boxShadow: '0 0 20px rgba(37,99,235,0.08)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 6,
                  background: '#2563EB',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 10,
                  fontWeight: 700,
                  color: 'white',
                }}
              >
                AI
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: 'white' }}>AI Antwoord</div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>automatisch verstuurd</div>
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 5,
                fontSize: 10,
                padding: '3px 10px',
                borderRadius: 999,
                background: 'rgba(16,185,129,0.15)',
                color: '#10B981',
                border: '1px solid rgba(16,185,129,0.3)',
              }}
            >
              <Clock size={9} />
              {sector.emailExample.responseTime}
            </div>
          </div>
          <p
            style={{
              margin: 0,
              fontSize: 12,
              color: 'rgba(255,255,255,0.75)',
              lineHeight: 1.6,
              whiteSpace: 'pre-wrap',
            }}
          >
            {sector.emailExample.aiReply}
          </p>
        </div>

        <div
          style={{
            textAlign: 'center',
            fontSize: 11,
            color: 'rgba(255,255,255,0.35)',
            padding: '4px 0',
          }}
        >
          AI leest en beantwoordt e-mails automatisch · 24/7 beschikbaar
        </div>
      </div>
    </div>
  )
}
