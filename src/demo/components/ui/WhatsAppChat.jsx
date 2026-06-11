import React, { useState, useEffect, useRef } from 'react'

function TypingIndicator() {
  return (
    <div className="flex items-end gap-1 px-4 py-3 rounded-2xl rounded-bl-none" style={{ background: '#1E2D45', maxWidth: '80px' }}>
      <span className="typing-dot w-2 h-2 rounded-full" style={{ background: '#94A3B8', display: 'inline-block' }} />
      <span className="typing-dot w-2 h-2 rounded-full" style={{ background: '#94A3B8', display: 'inline-block' }} />
      <span className="typing-dot w-2 h-2 rounded-full" style={{ background: '#94A3B8', display: 'inline-block' }} />
    </div>
  )
}

export default function WhatsAppChat({ conversations, liveMode }) {
  const [activeId, setActiveId] = useState(conversations[0]?.id)
  const [visibleMessages, setVisibleMessages] = useState({})
  const [showTyping, setShowTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const activeConv = conversations.find(c => c.id === activeId) || conversations[0]

  useEffect(() => {
    // Initialize with all messages for non-liveMode
    const init = {}
    conversations.forEach(c => {
      init[c.id] = liveMode ? (c.messages.length > 0 ? [c.messages[0]] : []) : [...c.messages]
    })
    setVisibleMessages(init)
  }, [conversations, liveMode])

  useEffect(() => {
    if (!liveMode || !activeConv) return
    const msgs = activeConv.messages
    const current = visibleMessages[activeConv.id] || []
    if (current.length >= msgs.length) return

    const nextMsg = msgs[current.length]
    if (!nextMsg) return

    if (nextMsg.sender === 'ai') {
      setShowTyping(true)
      const t = setTimeout(() => {
        setShowTyping(false)
        setVisibleMessages(prev => ({
          ...prev,
          [activeConv.id]: [...(prev[activeConv.id] || []), nextMsg]
        }))
      }, 1800)
      return () => clearTimeout(t)
    } else {
      const t = setTimeout(() => {
        setVisibleMessages(prev => ({
          ...prev,
          [activeConv.id]: [...(prev[activeConv.id] || []), nextMsg]
        }))
      }, 1200)
      return () => clearTimeout(t)
    }
  }, [visibleMessages, activeConv, liveMode])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [visibleMessages, showTyping])

  const getLastMessage = (conv) => {
    const msgs = visibleMessages[conv.id] || conv.messages
    const last = msgs[msgs.length - 1]
    if (!last) return ''
    const text = last.text || ''
    return text.length > 40 ? text.slice(0, 40) + '...' : text
  }

  const currentMessages = visibleMessages[activeConv?.id] || activeConv?.messages || []

  return (
    <div className="flex rounded-xl overflow-hidden" style={{ height: '480px', background: '#0D1B2E', border: '1px solid #1E2D45' }}>
      {/* Sidebar */}
      <div className="w-72 flex flex-col" style={{ borderRight: '1px solid #1E2D45' }}>
        <div className="px-4 py-3" style={{ background: '#075E54' }}>
          <div className="text-white font-semibold text-sm">WhatsApp Business</div>
          <div className="text-xs" style={{ color: '#a7f3d0' }}>Automatische berichten</div>
        </div>
        <div className="overflow-y-auto flex-1">
          {conversations.map(conv => (
            <div
              key={conv.id}
              onClick={() => setActiveId(conv.id)}
              className="flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors"
              style={{
                background: conv.id === activeId ? '#1E2D45' : 'transparent',
                borderBottom: '1px solid #1E2D45'
              }}
            >
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0" style={{ background: '#075E54', color: '#fff' }}>
                {conv.avatar}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium text-white truncate">{conv.name}</div>
                <div className="text-xs truncate" style={{ color: '#64748B' }}>{getLastMessage(conv)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 flex flex-col">
        {/* Chat header */}
        <div className="px-4 py-3 flex items-center gap-3" style={{ background: '#075E54' }}>
          <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: '#128C7E', color: '#fff' }}>
            {activeConv?.avatar}
          </div>
          <div>
            <div className="text-white font-semibold text-sm">{activeConv?.name}</div>
            <div className="text-xs" style={{ color: '#a7f3d0' }}>online</div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2" style={{ background: '#060D1A' }}>
          {currentMessages.map((msg, i) => (
            <div key={msg.id} className={`flex animate-fade-in ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className="px-3 py-2 rounded-2xl text-sm"
                style={{
                  maxWidth: '70%',
                  background: msg.sender === 'user' ? '#25D366' : '#1E2D45',
                  color: msg.sender === 'user' ? '#fff' : '#E2E8F0',
                  borderBottomRightRadius: msg.sender === 'user' ? '4px' : '16px',
                  borderBottomLeftRadius: msg.sender === 'user' ? '16px' : '4px',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                }}
              >
                {msg.text}
                <div className="text-right mt-1" style={{ fontSize: '10px', opacity: 0.7 }}>{msg.time}</div>
              </div>
            </div>
          ))}
          {showTyping && (
            <div className="flex justify-start animate-fade-in">
              <TypingIndicator />
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input bar */}
        <div className="px-4 py-3 flex items-center gap-2" style={{ background: '#0D1B2E', borderTop: '1px solid #1E2D45' }}>
          <input
            readOnly
            placeholder="AI beantwoordt automatisch..."
            className="flex-1 px-4 py-2 rounded-full text-sm outline-none"
            style={{ background: '#1E2D45', color: '#64748B', border: 'none' }}
          />
        </div>
      </div>
    </div>
  )
}
