import { ChevronRight, TrendingUp } from 'lucide-react';
import { sectors } from './data/sectors.js';
import { PackageToggle } from './PackageToggle.jsx';

export function TopBar({
  selectedSector, activePackage, setActivePackage,
  liveMode, setLiveMode, showROI, setShowROI,
}) {
  const sector = sectors.find((s) => s.id === selectedSector);

  return (
    <div style={{
      position: 'fixed', top: 0, left: 240, right: 0,
      height: 64,
      background: '#0D1B2E',
      borderBottom: '1px solid #1E2D45',
      display: 'flex', alignItems: 'center',
      padding: '0 24px',
      gap: 12,
      zIndex: 99,
      fontFamily: 'Inter, system-ui, sans-serif',
    }}>
      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, flex: 1, minWidth: 0 }}>
        <span style={{ color: '#475569', fontSize: 13 }}>Demo</span>
        <ChevronRight size={14} color="#475569" />
        {sector && (
          <span style={{ color: '#94A3B8', fontSize: 13, fontWeight: 600 }}>{sector.name}</span>
        )}
      </div>

      {/* Package toggle */}
      <PackageToggle activePackage={activePackage} setActivePackage={setActivePackage} />

      {/* Live demo toggle */}
      <button
        onClick={() => setLiveMode(!liveMode)}
        style={{
          display: 'flex', alignItems: 'center', gap: 7,
          padding: '7px 14px',
          borderRadius: 8,
          border: `1px solid ${liveMode ? '#10B98150' : '#1E2D45'}`,
          background: liveMode ? '#10B98115' : 'transparent',
          color: liveMode ? '#10B981' : '#94A3B8',
          cursor: 'pointer',
          fontWeight: 600, fontSize: 13,
          fontFamily: 'Inter, system-ui, sans-serif',
        }}
      >
        <span style={{
          width: 8, height: 8, borderRadius: '50%',
          background: liveMode ? '#10B981' : '#475569',
          boxShadow: liveMode ? '0 0 0 3px #10B98130' : 'none',
          animation: liveMode ? 'pulse 2s infinite' : 'none',
        }} />
        Live Demo
      </button>

      {/* ROI button */}
      <button
        onClick={() => setShowROI(true)}
        style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '7px 14px',
          borderRadius: 8,
          border: '1px solid #1E2D45',
          background: 'transparent',
          color: '#94A3B8',
          cursor: 'pointer',
          fontWeight: 600, fontSize: 13,
          fontFamily: 'Inter, system-ui, sans-serif',
        }}
      >
        <TrendingUp size={14} />
        ROI
      </button>

      <style>{`
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 #10B98150; }
          70% { box-shadow: 0 0 0 6px transparent; }
          100% { box-shadow: 0 0 0 0 transparent; }
        }
      `}</style>
    </div>
  );
}
