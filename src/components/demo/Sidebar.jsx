import {
  LayoutDashboard, Calendar, FileText, MessageCircle,
  BarChart2, Bot, Zap, ArrowLeft, ChevronRight,
} from 'lucide-react';
import { Building2, Heart, Activity, PenTool, Wrench, UtensilsCrossed } from 'lucide-react';
import { sectors } from './data/sectors.js';

const iconMap = { Building2, Heart, Activity, FileText, PenTool, Wrench, UtensilsCrossed };

const tabConfig = [
  { id: 'overzicht', label: 'Overzicht', icon: LayoutDashboard, packages: ['starter', 'pro', 'allin', 'aiagent'] },
  { id: 'agenda', label: 'Agenda', icon: Calendar, packages: ['starter', 'pro', 'allin', 'aiagent'] },
  { id: 'administratie', label: 'Administratie', icon: FileText, packages: ['starter', 'pro', 'allin', 'aiagent'] },
  { id: 'communicatie', label: 'Communicatie', icon: MessageCircle, packages: ['pro', 'allin', 'aiagent'] },
  { id: 'rapporten', label: 'Rapporten', icon: BarChart2, packages: ['allin', 'aiagent'] },
  { id: 'ai-assistent', label: 'AI Assistent', icon: Bot, packages: ['aiagent'] },
];

export function Sidebar({ selectedSector, activeTab, setActiveTab, activePackage, onBack }) {
  const sector = sectors.find((s) => s.id === selectedSector);
  const SectorIcon = sector ? iconMap[sector.icon] : null;
  const availableTabs = tabConfig.filter((t) => t.packages.includes(activePackage));

  return (
    <div style={{
      position: 'fixed', left: 0, top: 0, bottom: 0,
      width: 240,
      background: '#0D1B2E',
      borderRight: '1px solid #1E2D45',
      display: 'flex', flexDirection: 'column',
      zIndex: 100,
      fontFamily: 'Inter, system-ui, sans-serif',
    }}>
      {/* Logo */}
      <div style={{ padding: '20px 20px 0', borderBottom: '1px solid #1E2D45', paddingBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: '#2563EB',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Zap size={16} color="#fff" fill="#fff" />
          </div>
          <span style={{ color: '#2563EB', fontWeight: 800, fontSize: 17 }}>EDA</span>
          <span style={{ color: '#F1F5F9', fontWeight: 800, fontSize: 17 }}>Systems</span>
        </div>

        {/* Sector badge */}
        {sector && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: '#060D1A', borderRadius: 8,
            padding: '8px 12px',
            border: '1px solid #1E2D45',
          }}>
            <div style={{
              width: 24, height: 24, borderRadius: 6,
              background: `${sector.color}20`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              {SectorIcon && <SectorIcon size={13} color={sector.color} />}
            </div>
            <span style={{ color: '#F1F5F9', fontSize: 13, fontWeight: 600 }}>{sector.name}</span>
            <div style={{
              width: 8, height: 8, borderRadius: '50%',
              background: sector.color, marginLeft: 'auto', flexShrink: 0,
            }} />
          </div>
        )}
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '12px 12px', overflowY: 'auto' }}>
        <div style={{ color: '#475569', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, padding: '8px 8px 4px' }}>
          Menu
        </div>
        {availableTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                width: '100%', textAlign: 'left',
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '10px 12px',
                borderRadius: 8,
                border: 'none',
                cursor: 'pointer',
                marginBottom: 2,
                transition: 'all 0.15s',
                background: isActive ? `${sector?.color || '#2563EB'}15` : 'transparent',
                color: isActive ? (sector?.color || '#2563EB') : '#94A3B8',
                borderLeft: isActive ? `3px solid ${sector?.color || '#2563EB'}` : '3px solid transparent',
                fontFamily: 'Inter, system-ui, sans-serif',
                fontWeight: isActive ? 600 : 500,
                fontSize: 14,
              }}
            >
              <Icon size={16} />
              {tab.label}
              {isActive && <ChevronRight size={14} style={{ marginLeft: 'auto' }} />}
            </button>
          );
        })}
      </nav>

      {/* Back button */}
      <div style={{ padding: 12, borderTop: '1px solid #1E2D45' }}>
        <button
          onClick={onBack}
          style={{
            width: '100%', display: 'flex', alignItems: 'center', gap: 8,
            padding: '10px 12px', borderRadius: 8,
            border: '1px solid #1E2D45', background: 'transparent',
            color: '#94A3B8', cursor: 'pointer', fontSize: 13, fontWeight: 500,
            fontFamily: 'Inter, system-ui, sans-serif',
          }}
        >
          <ArrowLeft size={15} />
          Sector wijzigen
        </button>
      </div>
    </div>
  );
}
