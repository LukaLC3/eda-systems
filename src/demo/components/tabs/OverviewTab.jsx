import React from 'react'
import { MessageSquare, Clock, Calendar, TrendingUp } from 'lucide-react'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import MetricCard from '../ui/MetricCard'

export default function OverviewTab({ sector, sectorData }) {
  const { metrics, chartData } = sectorData

  const cards = [
    { icon: MessageSquare, label: 'Berichten deze maand', value: metrics.berichten, subtext: 'Automatisch beantwoord', color: sector.color },
    { icon: Clock, label: 'Uren bespaard/week', value: `${metrics.tijdBespaard} uur`, subtext: 'Minder manueel werk', color: '#10B981' },
    { icon: Calendar, label: 'Afspraken ingepland', value: metrics.afspraken, subtext: 'Deze maand', color: '#F59E0B' },
    { icon: TrendingUp, label: 'Omzet bijgedragen', value: metrics.omzet, subtext: 'Dankzij automatisering', color: '#8B5CF6' },
  ]

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null
    return (
      <div className="rounded-xl px-4 py-3" style={{ background: '#1E2D45', border: '1px solid #334155' }}>
        <div className="text-sm font-semibold text-white mb-2">{label}</div>
        {payload.map(p => (
          <div key={p.dataKey} className="text-xs" style={{ color: p.color }}>
            {p.name}: {p.value} uur
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c, i) => (
          <MetricCard key={i} {...c} />
        ))}
      </div>

      {/* Chart */}
      <div className="rounded-xl p-5" style={{ background: '#0D1B2E', border: '1px solid #1E2D45' }}>
        <h3 className="text-sm font-semibold text-white mb-4">Tijdsbesparing per maand (uren)</h3>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1E2D45" />
            <XAxis dataKey="month" tick={{ fill: '#94A3B8', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#94A3B8', fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ color: '#94A3B8', fontSize: '12px' }} />
            <Line type="monotone" dataKey="voor" name="Vóór EDA" stroke="#EF4444" strokeWidth={2} dot={{ fill: '#EF4444', r: 4 }} />
            <Line type="monotone" dataKey="met" name="Met EDA" stroke="#2563EB" strokeWidth={2} dot={{ fill: '#2563EB', r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
