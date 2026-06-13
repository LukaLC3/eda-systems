import { Building2, Heart, Activity, FileText, PenTool, Wrench, UtensilsCrossed, ArrowRight, Zap } from 'lucide-react'
import CircuitBoard from './CircuitBoard'
import StatusBar from './StatusBar'

const ICON_MAP = {
  Building2,
  Heart,
  Activity,
  FileText,
  PenTool,
  Wrench,
  UtensilsCrossed,
}

export default function LandingScreen({ sectors, onSelectSector, onROIClick }) {
  return (
    <div style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      <CircuitBoard />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <StatusBar onROIClick={onROIClick} />

        {/* Hero */}
        <div style={{ textAlign: 'center', padding: '56px 20px 48px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'rgba(37,99,235,0.12)',
              border: '1px solid rgba(37,99,235,0.35)',
              borderRadius: 999,
              padding: '6px 16px',
              marginBottom: 24,
              fontSize: 11,
              color: '#60A5FA',
              fontFamily: 'JetBrains Mono, monospace',
              letterSpacing: 1,
            }}
          >
            <Zap size={11} />
            SLIMME BEDRIJFSAUTOMATISERING · LIVE DEMO
          </div>

          <h1
            style={{
              margin: 0,
              fontSize: 'clamp(36px, 6vw, 72px)',
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: -1,
            }}
          >
            <span style={{ color: '#2563EB' }}>EDA</span>
            <span style={{ color: 'white' }}> Systems</span>
          </h1>
          <p
            style={{
              margin: '16px auto 0',
              fontSize: 18,
              color: 'rgba(255,255,255,0.55)',
              maxWidth: 480,
              lineHeight: 1.6,
            }}
          >
            Slimme automatisering voor de moderne ondernemer
          </p>
          <p
            style={{
              margin: '8px auto 0',
              fontSize: 14,
              color: 'rgba(255,255,255,0.35)',
              maxWidth: 500,
            }}
          >
            Kies uw branche hieronder voor een gepersonaliseerde demonstratie
          </p>
        </div>

        {/* Sector grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: 16,
            maxWidth: 1200,
            margin: '0 auto',
            padding: '0 24px 60px',
          }}
        >
          {sectors.map((sector, idx) => {
            const Icon = ICON_MAP[sector.icon] || Building2
            return (
              <SectorCard
                key={sector.id}
                sector={sector}
                Icon={Icon}
                idx={idx}
                onSelect={() => onSelectSector(sector)}
              />
            )
          })}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            textAlign: 'center',
            padding: '24px 20px 40px',
            borderTop: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)', fontFamily: 'JetBrains Mono, monospace', margin: 0 }}>
            EU-HOSTED · GDPR COMPLIANT · ISO 27001 · 99.9% UPTIME SLA · 500+ ACTIEVE KLANTEN
          </p>
        </div>
      </div>
    </div>
  )
}

function SectorCard({ sector, Icon, idx, onSelect }) {
  const delay = idx * 60

  return (
    <div
      className="fade-in"
      onClick={onSelect}
      style={{
        animationDelay: `${delay}ms`,
        background: 'rgba(10,22,40,0.85)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderLeft: `3px solid ${sector.color}`,
        borderRadius: 12,
        padding: 22,
        cursor: 'pointer',
        transition: 'all 0.2s',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = 'rgba(15,30,60,0.95)'
        e.currentTarget.style.borderColor = sector.color
        e.currentTarget.style.transform = 'translateY(-2px)'
        e.currentTarget.style.boxShadow = `0 8px 32px ${sector.color}25`
        e.currentTarget.querySelector('.bullets').style.opacity = '1'
        e.currentTarget.querySelector('.bullets').style.maxHeight = '200px'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = 'rgba(10,22,40,0.85)'
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
        e.currentTarget.style.borderLeftColor = sector.color
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = 'none'
        e.currentTarget.querySelector('.bullets').style.opacity = '0'
        e.currentTarget.querySelector('.bullets').style.maxHeight = '0'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 10,
            background: `${sector.color}20`,
            border: `1px solid ${sector.color}40`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: sector.color,
          }}
        >
          <Icon size={22} />
        </div>
        <ArrowRight size={16} style={{ color: 'rgba(255,255,255,0.25)', marginTop: 4 }} />
      </div>

      <h3 style={{ margin: '0 0 4px', fontSize: 17, fontWeight: 600, color: 'white' }}>
        {sector.name}
      </h3>
      <p style={{ margin: 0, fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>
        {sector.metrics[0].label}: <span style={{ color: sector.color, fontWeight: 600 }}>{sector.metrics[0].value}</span>
      </p>

      {/* Hover bullets */}
      <div
        className="bullets"
        style={{
          maxHeight: 0,
          opacity: 0,
          overflow: 'hidden',
          transition: 'all 0.25s ease',
          marginTop: 12,
        }}
      >
        {sector.automationBullets.map((b, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 8,
              marginBottom: 7,
              fontSize: 12,
              color: 'rgba(255,255,255,0.65)',
              lineHeight: 1.4,
            }}
          >
            <span style={{ color: sector.color, marginTop: 1, flexShrink: 0 }}>▸</span>
            {b}
          </div>
        ))}
        <div
          style={{
            marginTop: 12,
            fontSize: 11,
            color: sector.color,
            fontWeight: 600,
            fontFamily: 'JetBrains Mono, monospace',
          }}
        >
          KLIK OM DEMO TE STARTEN →
        </div>
      </div>
    </div>
  )
}
