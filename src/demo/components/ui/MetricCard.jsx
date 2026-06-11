import React from 'react'

export default function MetricCard({ icon: Icon, label, value, subtext, color }) {
  return (
    <div className="rounded-xl p-5 border" style={{ background: '#0D1B2E', borderColor: '#1E2D45' }}>
      <div className="flex items-start justify-between mb-3">
        <div className="p-2 rounded-lg" style={{ background: color + '20' }}>
          {Icon && <Icon size={20} style={{ color }} />}
        </div>
      </div>
      <div className="text-2xl font-bold text-white mb-1">{value}</div>
      <div className="text-sm font-medium" style={{ color: '#94A3B8' }}>{label}</div>
      {subtext && <div className="text-xs mt-1" style={{ color: '#64748B' }}>{subtext}</div>}
    </div>
  )
}
