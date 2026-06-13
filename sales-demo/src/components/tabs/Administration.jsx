import { Euro, FileText, Clock, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react'

const STATUS_CONFIG = {
  betaald: { color: '#10B981', bg: 'rgba(16,185,129,0.12)', label: 'Betaald', Icon: CheckCircle },
  openstaand: { color: '#F59E0B', bg: 'rgba(245,158,11,0.12)', label: 'Openstaand', Icon: AlertCircle },
  verwerkt: { color: '#2563EB', bg: 'rgba(37,99,235,0.12)', label: 'Verwerkt', Icon: RefreshCw },
}

function parseAmount(str) {
  return parseFloat(str.replace('€', '').replace('.', '').replace(',', '.')) || 0
}

export default function Administration({ sector, activePackage }) {
  const items = sector.adminItems
  const totalAmount = items.reduce((sum, item) => sum + parseAmount(item.amount), 0)
  const timeSaved = (items.length * 0.25).toFixed(1)
  const paidCount = items.filter(i => i.status === 'betaald').length
  const showAccountManager = activePackage === 'allin' || activePackage === 'aiagent'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Summary cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
        <SummaryCard
          icon={<Euro size={18} />}
          label="Totaal bedrag"
          value={`€${totalAmount.toLocaleString('nl-NL', { minimumFractionDigits: 2 })}`}
          color="#10B981"
        />
        <SummaryCard
          icon={<FileText size={18} />}
          label="Documenten verwerkt"
          value={`${items.length} stuks`}
          color="#2563EB"
        />
        <SummaryCard
          icon={<Clock size={18} />}
          label="Tijdsbesparing"
          value={`${timeSaved} uur`}
          color="#F59E0B"
          sub="deze periode"
        />
      </div>

      {/* Account manager badge */}
      {showAccountManager && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '10px 16px',
            borderRadius: 10,
            background: 'rgba(139,92,246,0.12)',
            border: '1px solid rgba(139,92,246,0.3)',
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: 'rgba(139,92,246,0.25)',
              border: '2px solid #8B5CF6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 13,
              fontWeight: 700,
              color: '#8B5CF6',
              flexShrink: 0,
            }}
          >
            NJ
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'white' }}>Accountmanager: Nina Jacobs</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)' }}>
              Dedicated support · Bereikbaar ma–vr 09:00–17:00
            </div>
          </div>
          <div
            style={{
              marginLeft: 'auto',
              fontSize: 10,
              padding: '3px 10px',
              borderRadius: 999,
              background: 'rgba(139,92,246,0.2)',
              color: '#8B5CF6',
              fontWeight: 600,
              fontFamily: 'JetBrains Mono, monospace',
            }}
          >
            {activePackage === 'aiagent' ? 'AI AGENT' : 'ALL-IN'}
          </div>
        </div>
      )}

      {/* Table */}
      <div
        style={{
          background: 'rgba(10,22,40,0.8)',
          border: '1px solid rgba(37,99,235,0.15)',
          borderRadius: 12,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '110px 1fr 130px 110px 100px',
            padding: '10px 16px',
            background: 'rgba(255,255,255,0.03)',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            fontSize: 11,
            color: 'rgba(255,255,255,0.4)',
            fontWeight: 600,
            letterSpacing: 0.5,
            textTransform: 'uppercase',
          }}
        >
          <div>Datum</div>
          <div>Omschrijving</div>
          <div style={{ textAlign: 'right' }}>Bedrag</div>
          <div style={{ textAlign: 'center' }}>Status</div>
          <div style={{ textAlign: 'center' }}>Actie</div>
        </div>

        {items.map((item, i) => {
          const cfg = STATUS_CONFIG[item.status] || STATUS_CONFIG.verwerkt
          const StatusIcon = cfg.Icon
          return (
            <div
              key={i}
              style={{
                display: 'grid',
                gridTemplateColumns: '110px 1fr 130px 110px 100px',
                padding: '12px 16px',
                borderBottom: i < items.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                alignItems: 'center',
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(37,99,235,0.04)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <div
                style={{
                  fontSize: 12,
                  color: 'rgba(255,255,255,0.45)',
                  fontFamily: 'JetBrains Mono, monospace',
                }}
              >
                {item.date}
              </div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', paddingRight: 12 }}>
                {item.description}
              </div>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: 'white',
                  textAlign: 'right',
                  fontFamily: 'JetBrains Mono, monospace',
                }}
              >
                {item.amount}
              </div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 5,
                    fontSize: 11,
                    padding: '3px 10px',
                    borderRadius: 999,
                    background: cfg.bg,
                    color: cfg.color,
                    fontWeight: 600,
                  }}
                >
                  <StatusIcon size={11} />
                  {cfg.label}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button
                  style={{
                    background: 'rgba(37,99,235,0.12)',
                    border: '1px solid rgba(37,99,235,0.3)',
                    color: '#60A5FA',
                    borderRadius: 6,
                    padding: '4px 10px',
                    cursor: 'pointer',
                    fontSize: 11,
                  }}
                >
                  Bekijken
                </button>
              </div>
            </div>
          )
        })}
      </div>

      <div
        style={{
          fontSize: 12,
          color: 'rgba(255,255,255,0.3)',
          textAlign: 'center',
          padding: '4px 0',
        }}
      >
        Documenten worden automatisch aangemaakt, verstuurd en gearchiveerd · GDPR-compliant opslag
      </div>
    </div>
  )
}

function SummaryCard({ icon, label, value, color, sub }) {
  return (
    <div
      style={{
        background: 'rgba(10,22,40,0.8)',
        border: `1px solid ${color}30`,
        borderRadius: 12,
        padding: '16px 18px',
        boxShadow: `0 0 20px ${color}10`,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, color }}>
        {icon}
        <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>{label}</span>
      </div>
      <div
        style={{
          fontSize: 22,
          fontWeight: 700,
          color,
          fontFamily: 'JetBrains Mono, monospace',
          lineHeight: 1,
        }}
      >
        {value}
      </div>
      {sub && (
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 4 }}>{sub}</div>
      )}
    </div>
  )
}
