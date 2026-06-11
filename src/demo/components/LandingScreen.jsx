import React from 'react'
import { Building2, Heart, Activity, FileText, PenTool, Wrench, UtensilsCrossed } from 'lucide-react'
import { sectors } from '../data/sectors'

const iconMap = {
  Building2,
  Heart,
  Activity,
  FileText,
  PenTool,
  Wrench,
  UtensilsCrossed,
}

export default function LandingScreen({ onSelectSector }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12" style={{ background: '#060D1A' }}>
      {/* Logo */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-4xl font-black" style={{ color: '#2563EB' }}>EDA</span>
        <span className="text-4xl font-black text-white">Systems</span>
      </div>

      <p className="text-base text-center mb-2" style={{ color: '#94A3B8', maxWidth: '480px' }}>
        Selecteer uw sector om de demo te starten
      </p>
      <p className="text-sm text-center mb-10" style={{ color: '#475569', maxWidth: '440px' }}>
        Ontdek hoe EDA Systems uw bedrijf automatiseert en uren per week bespaart.
      </p>

      {/* Sector grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-4xl">
        {sectors.map((sector, i) => {
          const Icon = iconMap[sector.icon] || FileText
          const isLast = i === sectors.length - 1
          const isOdd = sectors.length % 4 !== 0

          return (
            <SectorCard
              key={sector.id}
              sector={sector}
              Icon={Icon}
              onSelect={() => onSelectSector(sector)}
              isLast={isLast}
            />
          )
        })}
      </div>

      <p className="mt-10 text-xs" style={{ color: '#334155' }}>
        EDA Systems — uw bedrijf op automatische piloot
      </p>
    </div>
  )
}

function SectorCard({ sector, Icon, onSelect, isLast }) {
  const [hovered, setHovered] = React.useState(false)

  return (
    <button
      onClick={onSelect}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex flex-col items-center text-center p-6 rounded-2xl transition-all duration-200"
      style={{
        background: hovered ? sector.color + '15' : '#0D1B2E',
        border: `2px solid ${hovered ? sector.color : '#1E2D45'}`,
        transform: hovered ? 'scale(1.05)' : 'scale(1)',
        boxShadow: hovered ? `0 0 24px ${sector.color}40` : 'none',
        cursor: 'pointer',
      }}
    >
      <div
        className="p-3 rounded-xl mb-3 transition-all duration-200"
        style={{ background: hovered ? sector.color + '30' : sector.color + '15' }}
      >
        <Icon size={28} style={{ color: sector.color }} />
      </div>
      <div className="text-sm font-semibold text-white mb-1">{sector.name}</div>
      <div className="text-xs leading-relaxed" style={{ color: '#64748B' }}>{sector.description}</div>
    </button>
  )
}
