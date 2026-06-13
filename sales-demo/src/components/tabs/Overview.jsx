import { useEffect, useState } from 'react'
import {
  LineChart, Line, AreaChart, Area, XAxis, YAxis,
  Tooltip, ResponsiveContainer, CartesianGrid
} from 'recharts'

const DAY_NAMES = ['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo']

const LIVE_ITEMS = [
  { time: 'nu', text: 'Nieuwe AI chat sessie gestart', icon: '🤖', type: 'ai' },
  { time: 'nu', text: 'Automatisch antwoord verstuurd', icon: '✉️', type: 'email' },
  { time: 'nu', text: 'Afspraak bevestiging verzonden', icon: '📅', type: 'calendar' },
  { time: 'nu', text: 'Document automatisch gegenereerd', icon: '📄', type: 'doc' },
  { time: 'nu', text: 'Klant herinnering verstuurd', icon: '🔔', type: 'reminder' },
]

const ICON_COLORS = {
  ai: '#2563EB',
  email: '#10B981',
  calendar: '#F59E0B',
  doc: '#8B5CF6',
  reminder: '#EC4899',
  lead: '#06B6D4',
  finance: '#10B981',
  alert: '#EF4444',
  report: '#8B5CF6',
  event: '#F97316',
}

export default function Overview({ sector, liveDemoMode }) {
  const [feedItems, setFeedItems] = useState(sector.activityFeed)

  const weekData = sector.weekActivity.map((v, i) => ({ name: DAY_NAMES[i], value: v }))

  useEffect(() => {
    setFeedItems(sector.activityFeed)
  }, [sector])

  useEffect(() => {
    if (!liveDemoMode) return
    const interval = setInterval(() => {
      const item = LIVE_ITEMS[Math.floor(Math.random() * LIVE_ITEMS.length)]
      const newItem = {
        ...item,
        time: 'zojuist',
        _new: true,
        _id: Date.now(),
      }
      setFeedItems(prev => [newItem, ...prev].slice(0, 20))
    }, 5000)
    return () => clearInterval(interval)
  }, [liveDemoMode])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Metric cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
        {sector.metrics.map((metric, i) => {
          const sparkData = sector.weekActivity.map((v, idx) => ({
            name: idx,
            value: Math.max(1, v + (Math.random() - 0.5) * 5),
          }))
          return (
            <MetricCard key={i} metric={metric} sparkData={sparkData} color={sector.color} />
          )
        })}
      </div>

      {/* Charts + Feed row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 16 }}>
        {/* Area chart */}
        <div
          style={{
            background: 'rgba(10,22,40,0.8)',
            border: '1px solid rgba(37,99,235,0.15)',
            borderRadius: 12,
            padding: '20px 20px 12px',
          }}
        >
          <div style={{ marginBottom: 16 }}>
            <h3 style={{ margin: 0, fontSize: 14, fontWeight: 600, color: 'white' }}>Activiteit deze week</h3>
            <p style={{ margin: '4px 0 0', fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>
              Automatische acties per dag
            </p>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={weekData}>
              <defs>
                <linearGradient id={`grad-${sector.id}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={sector.color} stopOpacity={0.4} />
                  <stop offset="100%" stopColor={sector.color} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis
                dataKey="name"
                tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  background: '#0A1628',
                  border: '1px solid rgba(37,99,235,0.3)',
                  borderRadius: 8,
                  color: 'white',
                  fontSize: 12,
                }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke={sector.color}
                strokeWidth={2}
                fill={`url(#grad-${sector.id})`}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Activity feed */}
        <div
          style={{
            background: 'rgba(10,22,40,0.8)',
            border: '1px solid rgba(37,99,235,0.15)',
            borderRadius: 12,
            padding: 20,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <h3 style={{ margin: 0, fontSize: 14, fontWeight: 600, color: 'white' }}>Activiteit feed</h3>
            {liveDemoMode && (
              <span style={{ fontSize: 10, color: '#10B981', fontFamily: 'JetBrains Mono, monospace' }}>
                ● LIVE
              </span>
            )}
          </div>
          <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {feedItems.map((item, i) => (
              <div
                key={item._id || i}
                className={item._new ? 'fade-in' : ''}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 10,
                  padding: '8px 10px',
                  borderRadius: 8,
                  background: item._new ? 'rgba(37,99,235,0.08)' : 'transparent',
                  border: item._new ? '1px solid rgba(37,99,235,0.2)' : '1px solid transparent',
                }}
              >
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 7,
                    background: `${ICON_COLORS[item.type] || '#2563EB'}20`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 12,
                    flexShrink: 0,
                  }}
                >
                  {item.icon && typeof item.icon === 'string' && item.icon.length <= 2 ? item.icon : '⚡'}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ margin: 0, fontSize: 12, color: 'rgba(255,255,255,0.8)', lineHeight: 1.4 }}>
                    {item.text}
                  </p>
                  <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', fontFamily: 'JetBrains Mono, monospace' }}>
                    {item.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom pills */}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        {[
          { label: '3.2u bespaard/dag', color: '#10B981' },
          { label: '<24u implementatie', color: '#2563EB' },
          { label: '99.9% uptime', color: '#F59E0B' },
          { label: 'GDPR compliant', color: '#8B5CF6' },
        ].map(pill => (
          <div
            key={pill.label}
            style={{
              padding: '7px 16px',
              borderRadius: 999,
              background: `${pill.color}15`,
              border: `1px solid ${pill.color}40`,
              fontSize: 12,
              color: pill.color,
              fontWeight: 500,
            }}
          >
            {pill.label}
          </div>
        ))}
      </div>
    </div>
  )
}

function MetricCard({ metric, sparkData, color }) {
  return (
    <div
      style={{
        background: 'rgba(10,22,40,0.8)',
        border: '1px solid rgba(37,99,235,0.15)',
        borderRadius: 12,
        padding: '16px 18px',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
        <div>
          <div
            style={{
              fontSize: 26,
              fontWeight: 700,
              color: 'white',
              fontFamily: 'JetBrains Mono, monospace',
              lineHeight: 1,
            }}
          >
            {metric.value}
          </div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', marginTop: 5 }}>
            {metric.label}
          </div>
        </div>
        <span
          style={{
            fontSize: 11,
            fontWeight: 600,
            padding: '3px 8px',
            borderRadius: 999,
            background: metric.deltaPositive ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)',
            color: metric.deltaPositive ? '#10B981' : '#EF4444',
            fontFamily: 'JetBrains Mono, monospace',
          }}
        >
          {metric.delta}
        </span>
      </div>
      <ResponsiveContainer width="100%" height={40}>
        <LineChart data={sparkData}>
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={1.5}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
