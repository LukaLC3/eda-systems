import { Building2, Heart, Activity, FileText, PenTool, Wrench, UtensilsCrossed, ArrowRight, Zap, Shield, Clock, CheckCircle } from 'lucide-react'
import CircuitBoard from './CircuitBoard'
import StatusBar from './StatusBar'

const ICON_MAP = { Building2, Heart, Activity, FileText, PenTool, Wrench, UtensilsCrossed }

export default function LandingScreen({ sectors, onSelectSector, onROIClick }) {
  return (
    <div style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      <CircuitBoard />
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <StatusBar onROIClick={onROIClick} />

        <div style={{ flex: 1, maxWidth: 1100, margin: '0 auto', width: '100%', padding: '0 24px 60px' }}>

          {/* Hero */}
          <div style={{ textAlign: 'center', padding: '52px 0 44px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(37,99,235,0.1)', border: '1px solid rgba(37,99,235,0.3)', borderRadius: 999, padding: '6px 18px', marginBottom: 28, fontSize: 11, color: '#60A5FA', fontFamily: 'monospace', letterSpacing: 1.2 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#2563EB', display: 'inline-block', animation: 'pulseDot 1.5s infinite' }} />
              SLIMME BEDRIJFSAUTOMATISERING · LIVE DEMO
            </div>

            <h1 style={{ margin: '0 0 6px', fontSize: 'clamp(42px, 6vw, 76px)', fontWeight: 800, lineHeight: 1.05, letterSpacing: -2 }}>
              <span style={{ color: '#2563EB' }}>EDA</span>
              <span style={{ color: '#fff' }}> Systems</span>
            </h1>
            <p style={{ margin: '14px auto 0', fontSize: 18, color: 'rgba(255,255,255,0.5)', maxWidth: 500, lineHeight: 1.6, fontWeight: 400 }}>
              Slimme automatisering voor de moderne ondernemer
            </p>

            {/* Trust pills */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginTop: 28, flexWrap: 'wrap' }}>
              {[
                { icon: <Clock size={11} />, text: '<24u implementatie' },
                { icon: <Shield size={11} />, text: 'GDPR Compliant' },
                { icon: <CheckCircle size={11} />, text: '99.9% Uptime SLA' },
                { icon: <Zap size={11} />, text: '500+ actieve klanten' },
              ].map((p, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: 'rgba(255,255,255,0.45)', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 999, padding: '5px 13px', fontWeight: 500 }}>
                  <span style={{ color: 'rgba(255,255,255,0.3)' }}>{p.icon}</span>
                  {p.text}
                </div>
              ))}
            </div>
          </div>

          {/* Section label */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' }} />
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', fontFamily: 'monospace', letterSpacing: 1.5, whiteSpace: 'nowrap' }}>KIES UW SECTOR</span>
            <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' }} />
          </div>

          {/* Sector list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {sectors.map((sector, idx) => {
              const Icon = ICON_MAP[sector.icon] || Building2
              return <SectorRow key={sector.id} sector={sector} Icon={Icon} idx={idx} onSelect={() => onSelectSector(sector)} />
            })}
          </div>

          {/* CTA */}
          <div style={{ marginTop: 32, textAlign: 'center' }}>
            <button onClick={onROIClick} style={{ padding: '12px 28px', borderRadius: 10, background: 'rgba(37,99,235,0.12)', border: '1px solid rgba(37,99,235,0.35)', color: '#93C5FD', fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(37,99,235,0.25)'; e.currentTarget.style.borderColor = '#2563EB' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(37,99,235,0.12)'; e.currentTarget.style.borderColor = 'rgba(37,99,235,0.35)' }}>
              <span style={{ marginRight: 8 }}>🧮</span> Bereken uw ROI
            </button>
          </div>
        </div>

        {/* Footer */}
        <div style={{ textAlign: 'center', padding: '16px 20px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)', fontFamily: 'monospace', margin: 0, letterSpacing: 1 }}>
            EU-HOSTED · GDPR COMPLIANT · ISO 27001 · © 2026 EDA SYSTEMS
          </p>
        </div>
      </div>
    </div>
  )
}

function SectorRow({ sector, Icon, idx, onSelect }) {
  return (
    <div
      className="fade-in"
      onClick={onSelect}
      style={{
        animationDelay: `${idx * 55}ms`,
        background: 'rgba(10,22,40,0.75)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 14,
        padding: '18px 24px',
        cursor: 'pointer',
        transition: 'all 0.2s',
        display: 'flex',
        alignItems: 'center',
        gap: 20,
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget
        el.style.background = 'rgba(15,30,60,0.92)'
        el.style.border = `1px solid ${sector.color}50`
        el.style.transform = 'translateX(4px)'
        el.style.boxShadow = `0 4px 28px ${sector.color}20`
        el.querySelector('.row-bullets').style.maxHeight = '120px'
        el.querySelector('.row-bullets').style.opacity = '1'
        el.querySelector('.row-cta').style.opacity = '1'
        el.querySelector('.row-glow').style.opacity = '1'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget
        el.style.background = 'rgba(10,22,40,0.75)'
        el.style.border = '1px solid rgba(255,255,255,0.07)'
        el.style.transform = 'translateX(0)'
        el.style.boxShadow = 'none'
        el.querySelector('.row-bullets').style.maxHeight = '0'
        el.querySelector('.row-bullets').style.opacity = '0'
        el.querySelector('.row-cta').style.opacity = '0'
        el.querySelector('.row-glow').style.opacity = '0'
      }}
    >
      {/* Glow accent */}
      <div className="row-glow" style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: sector.color, borderRadius: '14px 0 0 14px', opacity: 0, transition: 'opacity 0.2s' }} />
      <div className="row-glow" style={{ position: 'absolute', left: 0, top: 0, right: 0, height: 1, background: `linear-gradient(90deg, ${sector.color}60, transparent)`, opacity: 0, transition: 'opacity 0.2s' }} />

      {/* Icon */}
      <div style={{ width: 48, height: 48, borderRadius: 12, background: `${sector.color}18`, border: `1px solid ${sector.color}35`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: sector.color, flexShrink: 0 }}>
        <Icon size={22} />
      </div>

      {/* Text */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 3 }}>
          <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: '#fff' }}>{sector.name}</h3>
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', fontFamily: 'monospace' }}>#{String(idx + 1).padStart(2, '0')}</span>
        </div>
        <p style={{ margin: 0, fontSize: 12, color: 'rgba(255,255,255,0.4)', lineHeight: 1.4 }}>{sector.tagline}</p>

        {/* Expandable bullets */}
        <div className="row-bullets" style={{ maxHeight: 0, opacity: 0, overflow: 'hidden', transition: 'all 0.25s ease', marginTop: 0 }}>
          <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 5 }}>
            {sector.automationBullets.map((b, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 7, fontSize: 12, color: 'rgba(255,255,255,0.6)', lineHeight: 1.4 }}>
                <span style={{ color: sector.color, flexShrink: 0, marginTop: 1 }}>▸</span>
                {b}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right side: metrics + arrow */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6, flexShrink: 0 }}>
        <div style={{ display: 'flex', gap: 16 }}>
          {sector.metrics.slice(0, 2).map((m, i) => (
            <div key={i} style={{ textAlign: 'right' }}>
              <div className="num" style={{ fontSize: 16, fontWeight: 700, color: sector.color, lineHeight: 1 }}>{m.value}</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', marginTop: 2 }}>{m.label}</div>
            </div>
          ))}
        </div>
        <div className="row-cta" style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: sector.color, fontFamily: 'monospace', fontWeight: 600, opacity: 0, transition: 'opacity 0.2s', letterSpacing: 0.5 }}>
          OPEN DEMO <ArrowRight size={12} />
        </div>
      </div>
    </div>
  )
}
