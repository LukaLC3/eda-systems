import React, { useState } from 'react'
import { X, Calculator } from 'lucide-react'

const packagePrices = {
  starter: 247,
  pro: 397,
  allin: 597,
  ai: 997,
}

export default function ROICalculator({ onClose, sectorId, activePackage }) {
  const [hoursPerMonth, setHoursPerMonth] = useState(14)
  const [hourlyRate, setHourlyRate] = useState(70)

  // Hours saved: from current admin hours down to 2-3h/month (use 2.5 as midpoint)
  const hoursAfter = 2.5
  const hoursSaved = Math.max(0, hoursPerMonth - hoursAfter)
  const savings = hoursSaved * hourlyRate
  const pkgPrice = packagePrices[activePackage] ?? packagePrices.allin

  const roi = pkgPrice > 0 ? Math.round((savings - pkgPrice) / pkgPrice * 100) : 0
  const payback = savings > 0 ? (pkgPrice / savings).toFixed(1) : '—'

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.7)' }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-lg rounded-2xl p-6" style={{ background: '#0D1B2E', border: '1px solid #1E2D45' }}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Calculator size={20} style={{ color: '#2563EB' }} />
            <h2 className="text-lg font-bold text-white">ROI Calculator</h2>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/10 transition-colors">
            <X size={20} style={{ color: '#64748B' }} />
          </button>
        </div>

        <div className="space-y-5">
          <SliderField
            label="Huidig aantal uren/maand aan administratie"
            value={hoursPerMonth}
            onChange={setHoursPerMonth}
            min={5}
            max={20}
            unit="u"
            color="#2563EB"
          />
          <SliderField
            label="Gemiddeld uurloon"
            value={hourlyRate}
            onChange={setHourlyRate}
            min={40}
            max={120}
            unit="€"
            prefix
            color="#10B981"
          />
        </div>

        <div className="mt-5 p-3 rounded-lg text-xs" style={{ background: '#0a2540', color: '#60a5fa' }}>
          💡 Van {hoursPerMonth}u/maand administratie naar ~2-3u/maand = <strong>{hoursSaved.toFixed(1)} uur bespaard</strong> per maand (waarde: €{savings.toFixed(0)} aan €{hourlyRate}/uur)
        </div>

        <div className="mt-4 rounded-xl p-5 space-y-3" style={{ background: '#060D1A', border: '1px solid #1E2D45' }}>
          <h3 className="text-sm font-semibold uppercase tracking-wider" style={{ color: '#64748B' }}>Resultaten</h3>
          <div className="grid grid-cols-2 gap-4">
            <ResultItem label="Uren bespaard/maand" value={`${hoursSaved.toFixed(1)} uur`} color="#2563EB" />
            <ResultItem label="Kostenbesparing/maand" value={`€${savings.toFixed(0)}`} color="#10B981" />
            <ResultItem label={`Pakketprijs (${activePackage ?? 'All-in'})`} value={`€${pkgPrice}/maand`} color="#8B5CF6" />
            <ResultItem label="ROI" value={`${roi}%`} color="#F59E0B" />
          </div>
          <div className="mt-2 pt-3 border-t" style={{ borderColor: '#1E2D45' }}>
            <div className="flex justify-between text-sm">
              <span style={{ color: '#94A3B8' }}>Terugverdientijd</span>
              <span className="font-bold text-white">{payback} maanden</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function SliderField({ label, value, onChange, min, max, unit, prefix, color }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <label className="text-sm font-medium" style={{ color: '#94A3B8' }}>{label}</label>
        <span className="text-sm font-bold" style={{ color }}>
          {prefix ? `${unit}${value}` : `${value}${unit}`}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="w-full h-2 rounded-full appearance-none cursor-pointer"
        style={{ accentColor: color, background: '#1E2D45' }}
      />
      <div className="flex justify-between text-xs mt-1" style={{ color: '#475569' }}>
        <span>{prefix ? `${unit}${min}` : `${min}${unit}`}</span>
        <span>{prefix ? `${unit}${max}` : `${max}${unit}`}</span>
      </div>
    </div>
  )
}

function ResultItem({ label, value, color }) {
  return (
    <div className="rounded-lg p-3" style={{ background: '#0D1B2E' }}>
      <div className="text-xs mb-1" style={{ color: '#64748B' }}>{label}</div>
      <div className="text-xl font-bold" style={{ color }}>{value}</div>
    </div>
  )
}
