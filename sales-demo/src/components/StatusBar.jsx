import { ArrowLeft, ChevronDown } from 'lucide-react'
import { useState } from 'react'

export default function StatusBar({ onROIClick, activeSector, onSectorChange, sectors, onBack }) {
  const [dropdownOpen, setDropdownOpen] = useState(false)

  return (
    <div
      style={{
        background: 'rgba(6,13,26,0.95)',
        borderBottom: '1px solid rgba(37,99,235,0.2)',
        backdropFilter: 'blur(8px)',
        position: 'relative',
        zIndex: 50,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 20px' }}>
        {/* Left: Logo + back */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {onBack && (
            <button
              onClick={onBack}
              style={{
                background: 'none',
                border: '1px solid rgba(37,99,235,0.4)',
                color: '#2563EB',
                borderRadius: 6,
                padding: '4px 8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                fontSize: 12,
              }}
            >
              <ArrowLeft size={13} />
            </button>
          )}
          <span
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontWeight: 600,
              fontSize: 15,
              letterSpacing: 1,
            }}
          >
            <span style={{ color: '#2563EB' }}>EDA</span>
            <span style={{ color: 'white' }}>Systems</span>
          </span>
        </div>

        {/* Center: Status bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div
            style={{
              width: 7,
              height: 7,
              borderRadius: '50%',
              background: '#10B981',
              animation: 'pulseDot 2s infinite',
            }}
          />
          <span
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 10,
              color: 'rgba(255,255,255,0.45)',
              letterSpacing: 0.5,
            }}
          >
            SYSTEM STATUS: OPERATIONAL · UPTIME 99.9% · ACTIVE CLIENTS 500+ · EU-HOSTED · GDPR COMPLIANT
          </span>
        </div>

        {/* Right: ROI button + sector dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button
            onClick={onROIClick}
            style={{
              background: 'transparent',
              border: '1px solid #2563EB',
              color: '#2563EB',
              borderRadius: 6,
              padding: '5px 12px',
              cursor: 'pointer',
              fontSize: 12,
              fontWeight: 500,
              whiteSpace: 'nowrap',
            }}
          >
            ROI Calculator
          </button>

          {activeSector && sectors && onSectorChange && (
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                style={{
                  background: 'rgba(37,99,235,0.15)',
                  border: '1px solid rgba(37,99,235,0.4)',
                  color: 'white',
                  borderRadius: 6,
                  padding: '5px 10px',
                  cursor: 'pointer',
                  fontSize: 12,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: activeSector.color,
                    display: 'inline-block',
                  }}
                />
                {activeSector.name}
                <ChevronDown size={12} />
              </button>
              {dropdownOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: '110%',
                    right: 0,
                    background: '#0A1628',
                    border: '1px solid rgba(37,99,235,0.3)',
                    borderRadius: 8,
                    minWidth: 180,
                    zIndex: 200,
                    overflow: 'hidden',
                  }}
                >
                  {sectors.map(s => (
                    <button
                      key={s.id}
                      onClick={() => { onSectorChange(s); setDropdownOpen(false) }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        width: '100%',
                        padding: '8px 14px',
                        background: s.id === activeSector.id ? 'rgba(37,99,235,0.2)' : 'transparent',
                        border: 'none',
                        color: 'white',
                        cursor: 'pointer',
                        fontSize: 13,
                        textAlign: 'left',
                      }}
                    >
                      <span
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          background: s.color,
                          display: 'inline-block',
                          flexShrink: 0,
                        }}
                      />
                      {s.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
