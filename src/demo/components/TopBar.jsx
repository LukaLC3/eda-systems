import React from 'react'
import { Calculator, ArrowLeft, Radio } from 'lucide-react'

const packageMap = {
  starter: { label: 'Starter', color: '#10B981' },
  pro: { label: 'Pro', color: '#2563EB' },
  allin: { label: 'All-in', color: '#8B5CF6' },
  ai: { label: 'AI Agent', color: '#F59E0B' },
}

export default function TopBar({ sector, currentPackage, liveMode, onToggleLive, onOpenROI, onBack }) {
  const pkg = packageMap[currentPackage] || packageMap.starter

  return (
    <div className="flex items-center justify-between px-6 py-3" style={{ background: '#0D1B2E', borderBottom: '1px solid #1E2D45', height: '60px', flexShrink: 0 }}>
      {/* Left: breadcrumb */}
      <div className="flex items-center gap-2 text-sm" style={{ color: '#64748B' }}>
        <span className="font-semibold" style={{ color: '#2563EB' }}>EDA Systems</span>
        <span>›</span>
        <span style={{ color: sector.color }}>{sector.name}</span>
      </div>

      {/* Center: package badge */}
      <div
        className="px-3 py-1 rounded-full text-xs font-semibold"
        style={{ background: pkg.color + '20', color: pkg.color, border: `1px solid ${pkg.color}40` }}
      >
        {pkg.label} pakket
      </div>

      {/* Right: buttons */}
      <div className="flex items-center gap-2">
        {liveMode && (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold animate-pulse" style={{ background: '#2d0a0a', color: '#ef4444' }}>
            <div className="w-2 h-2 rounded-full" style={{ background: '#ef4444' }} />
            LIVE
          </div>
        )}
        <button
          onClick={onToggleLive}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
          style={{
            background: liveMode ? '#ef4444' : '#1E2D45',
            color: liveMode ? '#fff' : '#94A3B8',
            border: `1px solid ${liveMode ? '#ef4444' : '#334155'}`,
          }}
        >
          <Radio size={12} />
          {liveMode ? 'Live Stoppen' : 'Live Demo'}
        </button>
        <button
          onClick={onOpenROI}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
          style={{ background: '#1E2D45', color: '#94A3B8', border: '1px solid #334155' }}
        >
          <Calculator size={12} />
          ROI
        </button>
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
          style={{ background: '#1E2D45', color: '#94A3B8', border: '1px solid #334155' }}
        >
          <ArrowLeft size={12} />
          Terug
        </button>
      </div>
    </div>
  )
}
