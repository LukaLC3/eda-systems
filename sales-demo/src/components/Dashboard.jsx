import { useState, useEffect } from 'react'
import {
  LayoutDashboard, MessageSquare, Calendar, BarChart2,
  FileText, Bot, Lock, Zap, Radio
} from 'lucide-react'
import StatusBar from './StatusBar'
import PackageToggle from './PackageToggle'
import Overview from './tabs/Overview'
import Communication from './tabs/Communication'
import Agenda from './tabs/Agenda'
import Reports from './tabs/Reports'
import Administration from './tabs/Administration'
import AIAssistant from './tabs/AIAssistant'

const ICON_MAP = {
  LayoutDashboard,
  MessageSquare,
  Calendar,
  BarChart2,
  FileText,
  Bot,
}

const TABS = [
  { id: 'overzicht', label: 'Overzicht', icon: 'LayoutDashboard', packages: ['starter', 'pro', 'allin', 'aiagent'] },
  { id: 'communicatie', label: 'Communicatie', icon: 'MessageSquare', packages: ['starter', 'pro', 'allin', 'aiagent'] },
  { id: 'agenda', label: 'Agenda', icon: 'Calendar', packages: ['starter', 'pro', 'allin', 'aiagent'] },
  { id: 'rapporten', label: 'Rapporten', icon: 'BarChart2', packages: ['pro', 'allin', 'aiagent'] },
  { id: 'administratie', label: 'Administratie', icon: 'FileText', packages: ['allin', 'aiagent'] },
  { id: 'ai-assistent', label: 'AI Assistent', icon: 'Bot', packages: ['aiagent'] },
]

export default function Dashboard({ sector, onBack, onROIClick, sectors, onSectorChange }) {
  const [activeTab, setActiveTab] = useState('overzicht')
  const [activePackage, setActivePackage] = useState('pro')
  const [liveDemoMode, setLiveDemoMode] = useState(false)
  const [secondsCounter, setSecondsCounter] = useState(0)

  // Counter that increments and resets randomly
  useEffect(() => {
    const tick = setInterval(() => {
      setSecondsCounter(prev => {
        const next = prev + 1
        const resetAt = 12 + Math.floor(Math.random() * 19) // 12-30
        if (next >= resetAt) return 0
        return next
      })
    }, 1000)
    return () => clearInterval(tick)
  }, [])

  // When switching sector or package, reset to overzicht if current tab not available
  useEffect(() => {
    const tab = TABS.find(t => t.id === activeTab)
    if (tab && !tab.packages.includes(activePackage)) {
      setActiveTab('overzicht')
    }
  }, [activePackage, activeTab])

  function handleTabClick(tab) {
    if (!tab.packages.includes(activePackage)) return
    setActiveTab(tab.id)
  }

  function renderContent() {
    switch (activeTab) {
      case 'overzicht':
        return <Overview sector={sector} liveDemoMode={liveDemoMode} />
      case 'communicatie':
        return <Communication sector={sector} liveDemoMode={liveDemoMode} activePackage={activePackage} />
      case 'agenda':
        return <Agenda sector={sector} />
      case 'rapporten':
        return <Reports sector={sector} activePackage={activePackage} />
      case 'administratie':
        return <Administration sector={sector} activePackage={activePackage} />
      case 'ai-assistent':
        return <AIAssistant sector={sector} />
      default:
        return <Overview sector={sector} liveDemoMode={liveDemoMode} />
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: '#060D1A' }}>
      <StatusBar
        onROIClick={onROIClick}
        activeSector={sector}
        onSectorChange={onSectorChange}
        sectors={sectors}
        onBack={onBack}
      />

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Sidebar */}
        <div
          style={{
            width: 220,
            background: 'rgba(7,15,30,0.95)',
            borderRight: '1px solid rgba(37,99,235,0.15)',
            display: 'flex',
            flexDirection: 'column',
            flexShrink: 0,
            overflowY: 'auto',
          }}
        >
          {/* Sector info */}
          <div style={{ padding: '20px 16px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  background: sector.color,
                  boxShadow: `0 0 8px ${sector.color}`,
                  flexShrink: 0,
                }}
              />
              <span style={{ fontSize: 13, fontWeight: 600, color: 'white' }}>{sector.name}</span>
            </div>
            <div style={{ marginTop: 6, fontSize: 11, color: 'rgba(255,255,255,0.35)', fontFamily: 'JetBrains Mono, monospace' }}>
              DEMO OMGEVING
            </div>
          </div>

          {/* Tab list */}
          <nav style={{ padding: '10px 8px', flex: 1 }}>
            {TABS.map(tab => {
              const Icon = ICON_MAP[tab.icon]
              const isActive = activeTab === tab.id
              const isLocked = !tab.packages.includes(activePackage)
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    width: '100%',
                    padding: '9px 12px',
                    marginBottom: 2,
                    borderRadius: 8,
                    border: 'none',
                    cursor: isLocked ? 'not-allowed' : 'pointer',
                    background: isActive ? `${sector.color}20` : 'transparent',
                    color: isActive ? 'white' : isLocked ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.6)',
                    fontSize: 13,
                    textAlign: 'left',
                    transition: 'all 0.15s',
                    borderLeft: isActive ? `2px solid ${sector.color}` : '2px solid transparent',
                  }}
                >
                  {Icon && <Icon size={15} style={{ flexShrink: 0 }} />}
                  <span style={{ flex: 1 }}>{tab.label}</span>
                  {isLocked && <Lock size={11} style={{ opacity: 0.4 }} />}
                </button>
              )
            })}
          </nav>

          {/* Live demo toggle */}
          <div style={{ padding: 16, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <button
              onClick={() => setLiveDemoMode(!liveDemoMode)}
              style={{
                width: '100%',
                padding: '8px 12px',
                borderRadius: 8,
                border: `1px solid ${liveDemoMode ? '#10B981' : 'rgba(255,255,255,0.15)'}`,
                background: liveDemoMode ? 'rgba(16,185,129,0.1)' : 'transparent',
                color: liveDemoMode ? '#10B981' : 'rgba(255,255,255,0.5)',
                fontSize: 12,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <Radio size={13} />
              {liveDemoMode ? 'Live Modus AAN' : 'Live Modus'}
            </button>
          </div>
        </div>

        {/* Main area */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {/* Header */}
          <div
            style={{
              padding: '16px 24px',
              borderBottom: '1px solid rgba(37,99,235,0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexShrink: 0,
              gap: 16,
              flexWrap: 'wrap',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <h2 style={{ margin: 0, fontSize: 17, fontWeight: 600, color: 'white' }}>
                {sector.name} Dashboard
              </h2>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 5,
                  background: 'rgba(239,68,68,0.15)',
                  border: '1px solid rgba(239,68,68,0.4)',
                  borderRadius: 999,
                  padding: '3px 10px',
                  fontSize: 10,
                  color: '#F87171',
                  fontFamily: 'JetBrains Mono, monospace',
                  letterSpacing: 0.5,
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: '#EF4444',
                    animation: 'pulseDot 1.5s infinite',
                  }}
                />
                LIVE
              </div>
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', fontFamily: 'JetBrains Mono, monospace' }}>
                Laatste bijgewerkt: {secondsCounter}s geleden
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <PackageToggle activePackage={activePackage} onPackageChange={setActivePackage} />
            </div>
          </div>

          {/* Tab content */}
          <div style={{ flex: 1, overflow: 'auto', padding: 24 }}>
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  )
}
