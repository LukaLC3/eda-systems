import { useState } from 'react';
import { Building2, Heart, Activity, FileText, PenTool, Wrench, UtensilsCrossed } from 'lucide-react';

const iconMap = { Building2, Heart, Activity, FileText, PenTool, Wrench, UtensilsCrossed };

export function LandingScreen({ sectors, onSelectSector }) {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <div style={{
      minHeight: '100vh',
      background: '#060D1A',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
      fontFamily: "'Inter', sans-serif",
    }}>
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <div style={{ fontSize: 48, fontWeight: 800, letterSpacing: '-1px', marginBottom: 12 }}>
          <span style={{ color: '#2563EB' }}>EDA</span>
          <span style={{ color: '#F1F5F9' }}> Systems</span>
        </div>
        <p style={{ color: '#94A3B8', fontSize: 18, fontWeight: 400 }}>
          Selecteer uw sector om de demo te starten
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 20,
        maxWidth: 960,
        width: '100%',
      }}>
        {sectors.map((sector) => {
          const Icon = iconMap[sector.icon];
          const isHovered = hoveredId === sector.id;
          return (
            <div
              key={sector.id}
              onClick={() => onSelectSector(sector)}
              onMouseEnter={() => setHoveredId(sector.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                background: '#0D1B2E',
                border: `1px solid ${isHovered ? sector.color : '#1E2D45'}`,
                borderRadius: 16,
                padding: '28px 24px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                transform: isHovered ? 'scale(1.02)' : 'scale(1)',
                boxShadow: isHovered ? `0 0 24px ${sector.color}22` : 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
              }}
            >
              <div style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: `${sector.color}20`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {Icon && <Icon size={24} style={{ color: sector.color }} />}
              </div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 600, color: '#F1F5F9', marginBottom: 6 }}>
                  {sector.name}
                </div>
                <div style={{ fontSize: 13, color: '#94A3B8', lineHeight: 1.5 }}>
                  {sector.description}
                </div>
              </div>
              <div style={{
                fontSize: 12,
                color: sector.color,
                fontWeight: 500,
                opacity: isHovered ? 1 : 0,
                transition: 'opacity 0.2s ease',
              }}>
                Demo starten →
              </div>
            </div>
          );
        })}
      </div>

      <p style={{ color: '#1E2D45', fontSize: 12, marginTop: 48 }}>
        © 2024 EDA Systems — Automatisering voor KMO's
      </p>
    </div>
  );
}
