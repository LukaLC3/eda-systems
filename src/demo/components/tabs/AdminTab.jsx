import React from 'react'
import { Download, CheckCircle } from 'lucide-react'
import StatusBadge from '../ui/StatusBadge'

export default function AdminTab({ sector, sectorData }) {
  const { adminItems } = sectorData
  const readyItems = adminItems.filter(i => i.status === 'Klaar voor boekhouder')
  const totalReady = readyItems.reduce((sum, i) => {
    const num = parseFloat(i.bedrag.replace(/[€.]/g, '').replace(',', '.'))
    return sum + (isNaN(num) ? 0 : num)
  }, 0)

  return (
    <div className="space-y-4">
      {/* Summary box */}
      {readyItems.length > 0 && (
        <div className="flex items-center gap-4 px-5 py-4 rounded-xl" style={{ background: '#0a2540', border: '1px solid #1e40af' }}>
          <CheckCircle size={20} style={{ color: '#3b82f6', flexShrink: 0 }} />
          <div>
            <div className="text-sm font-semibold text-white">
              {readyItems.length} item{readyItems.length !== 1 ? 's' : ''} klaar voor boekhouder
            </div>
            <div className="text-xs mt-0.5" style={{ color: '#60a5fa' }}>
              Totaal: €{totalReady.toLocaleString('nl-BE')} — documenten zijn gevalideerd
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="rounded-xl overflow-hidden" style={{ border: '1px solid #1E2D45' }}>
        <div className="px-5 py-3" style={{ background: '#0D1B2E', borderBottom: '1px solid #1E2D45' }}>
          <h3 className="text-sm font-semibold text-white">Administratie overzicht</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: '#060D1A' }}>
                {['Datum', 'Omschrijving', 'Bedrag', 'Status', 'Actie'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: '#475569' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {adminItems.map((item, i) => (
                <tr key={item.id} style={{ borderTop: '1px solid #1E2D45', background: i % 2 === 0 ? '#060D1A' : '#0D1B2E' }}>
                  <td className="px-4 py-3 text-xs" style={{ color: '#64748B' }}>{item.datum}</td>
                  <td className="px-4 py-3 font-medium text-white">{item.omschrijving}</td>
                  <td className="px-4 py-3 font-semibold" style={{ color: '#F1F5F9' }}>{item.bedrag}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={item.status} />
                  </td>
                  <td className="px-4 py-3">
                    <button
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                      style={{ background: '#1E2D45', color: '#94A3B8', border: '1px solid #334155' }}
                    >
                      <Download size={11} />
                      Exporteer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
