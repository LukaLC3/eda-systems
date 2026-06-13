import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts'

const DAY_NAMES = ['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo']

export default function Reports({ sector, activePackage }) {
  const barData = sector.weekActivity.map((v, i) => ({ name: DAY_NAMES[i], waarde: v }))

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: 'white' }}>Rapportage</h3>
        <span
          style={{
            fontSize: 10,
            padding: '3px 10px',
            borderRadius: 999,
            background: 'rgba(37,99,235,0.2)',
            color: '#60A5FA',
            fontWeight: 700,
            fontFamily: 'JetBrains Mono, monospace',
            border: '1px solid rgba(37,99,235,0.3)',
          }}
        >
          PRO
        </span>
      </div>

      {/* Report preview card */}
      <div
        style={{
          background: '#F8FAFC',
          borderRadius: 14,
          padding: '28px 32px',
          maxWidth: 680,
          boxShadow: '0 4px 32px rgba(0,0,0,0.4)',
          color: '#1E293B',
        }}
      >
        {/* Report header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            marginBottom: 20,
          }}
        >
          <div>
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: '#2563EB',
                letterSpacing: 1.5,
                fontFamily: 'JetBrains Mono, monospace',
                marginBottom: 6,
              }}
            >
              EDA Systems
            </div>
            <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: '#0F172A' }}>
              {sector.reportData.title}
            </h2>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '4px 12px',
                borderRadius: 999,
                background: '#EFF6FF',
                border: '1px solid #BFDBFE',
                fontSize: 11,
                color: '#2563EB',
                fontWeight: 600,
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: '#2563EB',
                  display: 'inline-block',
                }}
              />
              Automatisch rapport
            </div>
            <div style={{ fontSize: 12, color: '#64748B', marginTop: 6 }}>
              Gegenereerd op {new Date().toLocaleDateString('nl-NL')}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            height: 2,
            background: 'linear-gradient(90deg, #2563EB, #7C3AED)',
            borderRadius: 1,
            marginBottom: 20,
          }}
        />

        {/* Period */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            marginBottom: 20,
            fontSize: 13,
            color: '#475569',
          }}
        >
          <span style={{ fontWeight: 500 }}>Periode:</span>
          <span style={{ color: '#0F172A', fontWeight: 600 }}>{sector.reportData.period}</span>
        </div>

        {/* Metrics 2x2 grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 14,
            marginBottom: 24,
          }}
        >
          {sector.reportData.highlights.map((h, i) => (
            <div
              key={i}
              style={{
                padding: '14px 16px',
                borderRadius: 10,
                background: i % 2 === 0 ? '#EFF6FF' : '#F0FDF4',
                border: `1px solid ${i % 2 === 0 ? '#BFDBFE' : '#BBF7D0'}`,
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  color: '#64748B',
                  fontWeight: 500,
                  marginBottom: 6,
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                }}
              >
                {h.label}
              </div>
              <div
                style={{
                  fontSize: 24,
                  fontWeight: 700,
                  color: i % 2 === 0 ? '#1D4ED8' : '#059669',
                  fontFamily: 'JetBrains Mono, monospace',
                  lineHeight: 1,
                }}
              >
                {h.value}
              </div>
            </div>
          ))}
        </div>

        {/* Small bar chart */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#0F172A', marginBottom: 12 }}>
            Activiteit per dag
          </div>
          <ResponsiveContainer width="100%" height={100}>
            <BarChart data={barData}>
              <CartesianGrid stroke="#E2E8F0" vertical={false} />
              <XAxis
                dataKey="name"
                tick={{ fill: '#94A3B8', fontSize: 10 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis hide />
              <Tooltip
                contentStyle={{
                  background: 'white',
                  border: '1px solid #E2E8F0',
                  borderRadius: 8,
                  fontSize: 12,
                  color: '#0F172A',
                }}
              />
              <Bar dataKey="waarde" fill="#2563EB" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Footer */}
        <div
          style={{
            padding: '12px 16px',
            background: '#F1F5F9',
            borderRadius: 8,
            fontSize: 12,
            color: '#64748B',
            textAlign: 'center',
          }}
        >
          📊 Dit rapport wordt elke ochtend om 07:00 automatisch verstuurd naar uw e-mail
        </div>
      </div>

      <div
        style={{
          fontSize: 12,
          color: 'rgba(255,255,255,0.3)',
          textAlign: 'center',
        }}
      >
        Rapporten worden automatisch gegenereerd en verstuurd · Beschikbaar in Pro, All-in en AI Agent pakket
      </div>
    </div>
  )
}
