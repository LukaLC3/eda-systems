import React from 'react'
import { MessageSquare, Bell, TrendingUp, Clock } from 'lucide-react'

function getWeekNumber() {
  const now = new Date()
  const start = new Date(now.getFullYear(), 0, 1)
  return Math.ceil(((now - start) / 86400000 + start.getDay() + 1) / 7)
}

export default function RapportsTab({ sector, sectorData }) {
  const { metrics } = sectorData
  const weekNum = getWeekNumber()

  return (
    <div className="max-w-2xl">
      <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid #1E2D45' }}>
        {/* Email header */}
        <div className="px-8 py-6" style={{ background: 'linear-gradient(135deg, #0D1B2E 0%, #1E2D45 100%)', borderBottom: '1px solid #1E2D45' }}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-lg font-black" style={{ color: '#2563EB' }}>EDA</span>
              <span className="text-lg font-black text-white">Systems</span>
            </div>
            <span className="text-xs px-3 py-1 rounded-full font-medium" style={{ background: sector.color + '20', color: sector.color }}>
              Automatisch gegenereerd
            </span>
          </div>
          <h2 className="text-xl font-bold text-white">Weekrapport — week {weekNum}</h2>
          <p className="text-sm mt-1" style={{ color: '#94A3B8' }}>{sector.name} · Gegenereerd op {new Date().toLocaleDateString('nl-BE')}</p>
        </div>

        {/* Top metrics */}
        <div className="px-8 py-5" style={{ background: '#060D1A', borderBottom: '1px solid #1E2D45' }}>
          <h3 className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: '#475569' }}>Samenvatting deze week</h3>
          <div className="grid grid-cols-2 gap-3">
            <StatCard icon={MessageSquare} label="Berichten beantwoord" value={metrics.berichten} color={sector.color} />
            <StatCard icon={Clock} label="Uren bespaard" value={`${metrics.tijdBespaard} uur`} color="#10B981" />
            <StatCard icon={Bell} label="Herinneringen verstuurd" value={Math.round(metrics.afspraken * 0.8)} color="#F59E0B" />
            <StatCard icon={TrendingUp} label="Omzetbijdrage" value={metrics.omzet} color="#8B5CF6" />
          </div>
        </div>

        {/* Automatische acties */}
        <div className="px-8 py-5" style={{ background: '#0D1B2E', borderBottom: '1px solid #1E2D45' }}>
          <h3 className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: '#475569' }}>Automatisch uitgevoerd</h3>
          <div className="space-y-2">
            <AutoRow icon="💬" text={`${metrics.berichten} berichten automatisch beantwoord via WhatsApp`} />
            <AutoRow icon="📅" text={`${metrics.afspraken} afspraken bevestigd of ingepland`} />
            <AutoRow icon="🔔" text={`${Math.round(metrics.afspraken * 0.8)} herinneringen automatisch verstuurd`} />
            <AutoRow icon="📊" text="Weekrapport gegenereerd en verstuurd naar management" />
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-4" style={{ background: '#060D1A' }}>
          <p className="text-xs" style={{ color: '#334155' }}>
            Dit rapport is automatisch gegenereerd door EDA Systems. Vragen? Contacteer uw EDA adviseur.
          </p>
        </div>
      </div>
    </div>
  )
}

function StatCard({ icon: Icon, label, value, color }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl" style={{ background: '#0D1B2E', border: '1px solid #1E2D45' }}>
      <div className="p-2 rounded-lg" style={{ background: color + '20' }}>
        <Icon size={14} style={{ color }} />
      </div>
      <div>
        <div className="text-lg font-bold" style={{ color }}>{value}</div>
        <div className="text-xs" style={{ color: '#64748B' }}>{label}</div>
      </div>
    </div>
  )
}

function AutoRow({ icon, text }) {
  return (
    <div className="flex items-center gap-3 py-2" style={{ borderBottom: '1px solid #1E2D45' }}>
      <span className="text-base">{icon}</span>
      <span className="text-sm" style={{ color: '#94A3B8' }}>{text}</span>
    </div>
  )
}
