import React from 'react'
import WhatsAppChat from '../ui/WhatsAppChat'
import StatusBadge from '../ui/StatusBadge'

function DocumentVerwerking({ sectorData, liveMode }) {
  const [items, setItems] = React.useState(sectorData.documentItems || [])

  React.useEffect(() => {
    if (!liveMode) return
    const newDoc = {
      id: Date.now(),
      datum: '2024-06-10',
      leverancier: 'DHL Express',
      bedrag: '€42,80',
      type: 'Aankoopfactuur',
      ocrStatus: 'Verwerkt',
    }
    const t = setTimeout(() => {
      setItems(prev => [newDoc, ...prev])
    }, 3000)
    return () => clearTimeout(t)
  }, [liveMode])

  return (
    <div className="rounded-xl overflow-hidden" style={{ border: '1px solid #1E2D45' }}>
      <div className="px-5 py-3 flex items-center justify-between" style={{ background: '#0D1B2E', borderBottom: '1px solid #1E2D45' }}>
        <h3 className="text-sm font-semibold text-white">Documenten & OCR Verwerking</h3>
        <span className="text-xs px-2 py-1 rounded-full" style={{ background: '#8B5CF620', color: '#8B5CF6' }}>
          {items.filter(i => i.ocrStatus === 'Verwerkt').length} / {items.length} verwerkt
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ background: '#060D1A' }}>
              {['Datum', 'Leverancier', 'Bedrag', 'Type', 'OCR Status'].map(h => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: '#475569' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr key={item.id} className="animate-fade-in" style={{ borderTop: '1px solid #1E2D45', background: i % 2 === 0 ? '#060D1A' : '#0D1B2E' }}>
                <td className="px-4 py-3" style={{ color: '#94A3B8' }}>{item.datum}</td>
                <td className="px-4 py-3 font-medium text-white">{item.leverancier}</td>
                <td className="px-4 py-3 font-semibold" style={{ color: '#F1F5F9' }}>{item.bedrag}</td>
                <td className="px-4 py-3" style={{ color: '#64748B' }}>{item.type}</td>
                <td className="px-4 py-3">
                  <OcrBadge status={item.ocrStatus} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function OcrBadge({ status }) {
  const map = {
    'Verwerkt': { dot: '#22c55e', text: '#4ade80', bg: '#052e16' },
    'In behandeling': { dot: '#f59e0b', text: '#fbbf24', bg: '#422006' },
    'Fout': { dot: '#ef4444', text: '#f87171', bg: '#2d0a0a' },
  }
  const c = map[status] || map['In behandeling']
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium" style={{ background: c.bg, color: c.text }}>
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: c.dot }} />
      {status}
    </span>
  )
}

export default function CommunicationTab({ sector, sectorData, liveMode }) {
  if (sector.id === 'accountant') {
    return <DocumentVerwerking sectorData={sectorData} liveMode={liveMode} />
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white">WhatsApp Communicatie</h3>
        <span className="text-xs px-2 py-1 rounded-full" style={{ background: '#25D36620', color: '#25D366' }}>
          ● WhatsApp Business
        </span>
      </div>
      <WhatsAppChat conversations={sectorData.whatsappConversations} liveMode={liveMode} />
    </div>
  )
}
