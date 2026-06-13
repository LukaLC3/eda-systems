import { useState } from 'react'
import { X, TrendingUp, Clock, Euro, Zap } from 'lucide-react'

export default function ROICalculator({ onClose }) {
  const [employees, setEmployees] = useState(5)
  const [adminHours, setAdminHours] = useState(10)

  const timeSaved = adminHours * 0.7 * 4
  const costSaved = timeSaved * 45
  const packageCost = 397
  const paybackWeeks = Math.ceil(packageCost / (adminHours * 0.7 * 45))
  const annualSaving = costSaved * 12 - packageCost * 12

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.75)',
        backdropFilter: 'blur(4px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
      }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        style={{
          background: '#0A1628',
          border: '1px solid rgba(37,99,235,0.35)',
          borderRadius: 16,
          padding: 36,
          width: '100%',
          maxWidth: 560,
          position: 'relative',
          boxShadow: '0 0 60px rgba(37,99,235,0.2)',
        }}
        className="fade-in"
      >
        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            background: 'rgba(255,255,255,0.08)',
            border: 'none',
            color: 'white',
            width: 32,
            height: 32,
            borderRadius: 8,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <X size={16} />
        </button>

        <div style={{ marginBottom: 28 }}>
          <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: 'white' }}>ROI Calculator</h2>
          <p style={{ margin: '6px 0 0', fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>
            Bereken uw terugverdientijd in seconden
          </p>
        </div>

        {/* Sliders */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginBottom: 32 }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
              <label style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>
                Aantal medewerkers
              </label>
              <span
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  color: '#2563EB',
                  fontFamily: 'JetBrains Mono, monospace',
                }}
              >
                {employees}
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={20}
              value={employees}
              onChange={e => setEmployees(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#2563EB', cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 4 }}>
              <span>1</span><span>20</span>
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
              <label style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>
                Admin uren per week
              </label>
              <span
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  color: '#2563EB',
                  fontFamily: 'JetBrains Mono, monospace',
                }}
              >
                {adminHours}u
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={40}
              value={adminHours}
              onChange={e => setAdminHours(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#2563EB', cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 4 }}>
              <span>1u</span><span>40u</span>
            </div>
          </div>
        </div>

        {/* Results */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
          <ResultCard
            icon={<Clock size={18} />}
            label="Uren bespaard/mnd"
            value={`${timeSaved.toFixed(0)}u`}
            color="#2563EB"
          />
          <ResultCard
            icon={<Euro size={18} />}
            label="Kostenbesparing/mnd"
            value={`€${costSaved.toFixed(0)}`}
            color="#10B981"
          />
          <ResultCard
            icon={<Zap size={18} />}
            label="Terugverdientijd"
            value={`${paybackWeeks} weken`}
            color="#F59E0B"
          />
          <ResultCard
            icon={<TrendingUp size={18} />}
            label="Jaarlijkse besparing"
            value={`€${annualSaving.toLocaleString('nl-NL')}`}
            color="#EC4899"
          />
        </div>

        <div
          style={{
            background: 'rgba(37,99,235,0.1)',
            border: '1px solid rgba(37,99,235,0.3)',
            borderRadius: 10,
            padding: '12px 16px',
            fontSize: 12,
            color: 'rgba(255,255,255,0.6)',
            textAlign: 'center',
          }}
        >
          Op basis van EDA Pro pakket (€397/mnd) · Gemiddeld tarief €45/uur · 70% tijdsbesparing door automatisering
        </div>

        <button
          style={{
            marginTop: 20,
            width: '100%',
            background: '#2563EB',
            border: 'none',
            color: 'white',
            borderRadius: 10,
            padding: '13px 20px',
            fontSize: 14,
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 0 20px rgba(37,99,235,0.4)',
          }}
        >
          Start gratis proefperiode →
        </button>
      </div>
    </div>
  )
}

function ResultCard({ icon, label, value, color }) {
  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: `1px solid ${color}40`,
        borderRadius: 10,
        padding: '14px 16px',
        boxShadow: `0 0 20px ${color}20`,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8, color }}>
        {icon}
        <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>{label}</span>
      </div>
      <div
        style={{
          fontSize: 22,
          fontWeight: 700,
          color,
          fontFamily: 'JetBrains Mono, monospace',
        }}
      >
        {value}
      </div>
    </div>
  )
}
