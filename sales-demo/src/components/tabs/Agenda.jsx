import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts'

const DAYS = ['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo']
const START_HOUR = 8
const END_HOUR = 18
const HOUR_HEIGHT = 44

// Map JS getDay() (0=Sun) to column index (0=Mon)
function todayColumn() {
  const d = new Date().getDay()
  return d === 0 ? 6 : d - 1
}

export default function Agenda({ sector }) {
  const todayCol = todayColumn()
  const now = new Date()
  const currentHour = now.getHours() + now.getMinutes() / 60
  const todayLineTop = (currentHour - START_HOUR) * HOUR_HEIGHT

  const barData = DAYS.slice(0, 5).map((name, i) => ({
    name,
    waarde: sector.weekActivity[i] || 0,
  }))

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Calendar */}
      <div
        style={{
          background: 'rgba(10,22,40,0.8)',
          border: '1px solid rgba(37,99,235,0.15)',
          borderRadius: 12,
          overflow: 'hidden',
        }}
      >
        {/* Day headers */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '52px repeat(7, 1fr)',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <div style={{ padding: '10px 0' }} />
          {DAYS.map((day, i) => (
            <div
              key={day}
              style={{
                padding: '10px 8px',
                textAlign: 'center',
                fontSize: 12,
                fontWeight: i === todayCol ? 700 : 500,
                color: i === todayCol ? sector.color : 'rgba(255,255,255,0.5)',
                background: i === todayCol ? `${sector.color}10` : 'transparent',
                borderLeft: '1px solid rgba(255,255,255,0.04)',
              }}
            >
              {day}
            </div>
          ))}
        </div>

        {/* Grid */}
        <div style={{ position: 'relative', overflowY: 'auto', maxHeight: 420 }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '52px repeat(7, 1fr)',
              position: 'relative',
            }}
          >
            {/* Time column */}
            <div>
              {Array.from({ length: END_HOUR - START_HOUR }, (_, i) => (
                <div
                  key={i}
                  style={{
                    height: HOUR_HEIGHT,
                    padding: '4px 8px 0',
                    fontSize: 10,
                    color: 'rgba(255,255,255,0.3)',
                    fontFamily: 'JetBrains Mono, monospace',
                    borderTop: '1px solid rgba(255,255,255,0.04)',
                  }}
                >
                  {`${START_HOUR + i}:00`}
                </div>
              ))}
            </div>

            {/* Day columns */}
            {DAYS.map((day, colIdx) => (
              <div
                key={day}
                style={{
                  position: 'relative',
                  borderLeft: '1px solid rgba(255,255,255,0.04)',
                  background: colIdx === todayCol ? `${sector.color}05` : 'transparent',
                }}
              >
                {/* Hour lines */}
                {Array.from({ length: END_HOUR - START_HOUR }, (_, i) => (
                  <div
                    key={i}
                    style={{
                      height: HOUR_HEIGHT,
                      borderTop: '1px solid rgba(255,255,255,0.04)',
                    }}
                  />
                ))}

                {/* Today line */}
                {colIdx === todayCol && currentHour >= START_HOUR && currentHour <= END_HOUR && (
                  <div
                    style={{
                      position: 'absolute',
                      top: todayLineTop,
                      left: 0,
                      right: 0,
                      height: 2,
                      background: '#EF4444',
                      zIndex: 10,
                    }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        left: -4,
                        top: -4,
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                        background: '#EF4444',
                      }}
                    />
                  </div>
                )}

                {/* Appointments */}
                {sector.agendaItems
                  .filter(item => item.day === colIdx + 1 || (item.day === 0 && colIdx === 6))
                  .map((item, aIdx) => {
                    const top = (item.startHour - START_HOUR) * HOUR_HEIGHT
                    const height = item.duration * HOUR_HEIGHT - 3
                    if (top < 0 || top > (END_HOUR - START_HOUR) * HOUR_HEIGHT) return null
                    return (
                      <div
                        key={aIdx}
                        style={{
                          position: 'absolute',
                          top,
                          left: 2,
                          right: 2,
                          height,
                          borderRadius: 6,
                          background: `${item.color}25`,
                          border: `1px solid ${item.color}60`,
                          borderLeft: `3px solid ${item.color}`,
                          padding: '4px 6px',
                          overflow: 'hidden',
                          zIndex: 5,
                        }}
                      >
                        <div
                          style={{
                            fontSize: 10,
                            fontWeight: 600,
                            color: item.color,
                            lineHeight: 1.3,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: height > 50 ? 'normal' : 'nowrap',
                          }}
                        >
                          {item.title}
                        </div>
                        <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>
                          {`${item.startHour}:00`}
                        </div>
                      </div>
                    )
                  })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <StatBadge
            label="18 herinneringen automatisch verstuurd vandaag"
            color="#10B981"
          />
          <StatBadge
            label="3 no-shows automatisch opgevolgd door AI"
            color="#F59E0B"
          />
          <StatBadge
            label="Nieuwe afspraken direct bevestigd via WhatsApp"
            color="#2563EB"
          />
        </div>

        {/* Bar chart */}
        <div
          style={{
            background: 'rgba(10,22,40,0.8)',
            border: '1px solid rgba(37,99,235,0.15)',
            borderRadius: 12,
            padding: '16px 16px 10px',
          }}
        >
          <div style={{ fontSize: 12, fontWeight: 600, color: 'white', marginBottom: 12 }}>
            Afspraken per dag
          </div>
          <ResponsiveContainer width="100%" height={120}>
            <BarChart data={barData}>
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
              <Bar dataKey="waarde" fill={sector.color} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

function StatBadge({ label, color }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '10px 14px',
        borderRadius: 10,
        background: `${color}10`,
        border: `1px solid ${color}30`,
      }}
    >
      <div style={{ width: 8, height: 8, borderRadius: '50%', background: color, flexShrink: 0 }} />
      <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)' }}>{label}</span>
    </div>
  )
}
