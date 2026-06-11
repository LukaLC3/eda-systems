import React from 'react'

const configs = {
  'Verwerkt': { bg: '#052e16', text: '#4ade80', dot: '#22c55e', label: 'Verwerkt' },
  'Klaar voor boekhouder': { bg: '#0c1a4a', text: '#60a5fa', dot: '#3b82f6', label: 'Klaar voor boekhouder' },
  'In behandeling': { bg: '#422006', text: '#fbbf24', dot: '#f59e0b', label: 'In behandeling' },
  'Fout': { bg: '#2d0a0a', text: '#f87171', dot: '#ef4444', label: 'Fout' },
}

export default function StatusBadge({ status }) {
  const cfg = configs[status] || configs['In behandeling']
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
      style={{ background: cfg.bg, color: cfg.text }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: cfg.dot }} />
      {cfg.label}
    </span>
  )
}
