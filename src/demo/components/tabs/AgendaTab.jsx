import React from 'react'
import { Bell, UserX } from 'lucide-react'

const DAYS = ['Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag']
const HOURS = Array.from({ length: 11 }, (_, i) => i + 8) // 8 to 18

function timeToMinutes(timeStr) {
  const [h, m] = timeStr.split(':').map(Number)
  return h * 60 + m
}

export default function AgendaTab({ sector, sectorData }) {
  const { agendaItems } = sectorData
  const startHour = 8
  const hourHeight = 56 // px per hour

  return (
    <div className="space-y-4">
      <div className="rounded-xl overflow-hidden" style={{ border: '1px solid #1E2D45' }}>
        {/* Header */}
        <div className="grid" style={{ gridTemplateColumns: '60px repeat(5, 1fr)', background: '#0D1B2E', borderBottom: '1px solid #1E2D45' }}>
          <div className="px-2 py-3 text-xs" style={{ color: '#475569' }} />
          {DAYS.map(day => (
            <div key={day} className="px-3 py-3 text-xs font-semibold text-center" style={{ color: '#94A3B8', borderLeft: '1px solid #1E2D45' }}>{day}</div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="relative overflow-y-auto" style={{ maxHeight: '400px' }}>
          <div className="grid" style={{ gridTemplateColumns: '60px repeat(5, 1fr)' }}>
            {/* Time column */}
            <div>
              {HOURS.map(h => (
                <div key={h} className="flex items-start justify-end pr-2 text-xs" style={{ height: `${hourHeight}px`, color: '#475569', paddingTop: '4px', borderBottom: '1px solid #0D1B2E' }}>
                  {h}:00
                </div>
              ))}
            </div>

            {/* Day columns */}
            {DAYS.map((day, dayIndex) => {
              const dayItems = agendaItems.filter(item => item.day === dayIndex)
              return (
                <div key={day} className="relative" style={{ borderLeft: '1px solid #1E2D45' }}>
                  {/* Hour grid lines */}
                  {HOURS.map(h => (
                    <div key={h} style={{ height: `${hourHeight}px`, borderBottom: '1px solid #1E2D45' }} />
                  ))}
                  {/* Appointments */}
                  {dayItems.map(item => {
                    const startMin = timeToMinutes(item.time)
                    const topPx = (startMin - startHour * 60) * (hourHeight / 60)
                    const heightPx = Math.max(item.duration * (hourHeight / 60), 28)
                    return (
                      <div
                        key={item.id}
                        className="absolute left-1 right-1 rounded-lg px-2 py-1 text-xs font-medium overflow-hidden"
                        style={{
                          top: `${topPx}px`,
                          height: `${heightPx}px`,
                          background: item.color + '20',
                          color: item.color,
                          border: `1px solid ${item.color}40`,
                        }}
                      >
                        <div className="truncate font-semibold">{item.title}</div>
                        <div style={{ opacity: 0.7 }}>{item.time}</div>
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Info row */}
      <div className="flex gap-3 flex-wrap">
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm" style={{ background: '#0D1B2E', border: '1px solid #1E2D45' }}>
          <Bell size={14} style={{ color: '#10B981' }} />
          <span style={{ color: '#94A3B8' }}>3 herinneringen automatisch verstuurd vandaag</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm" style={{ background: '#0D1B2E', border: '1px solid #1E2D45' }}>
          <UserX size={14} style={{ color: '#F59E0B' }} />
          <span style={{ color: '#94A3B8' }}>1 no-show automatisch opgevolgd</span>
        </div>
      </div>
    </div>
  )
}
