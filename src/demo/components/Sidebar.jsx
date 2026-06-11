import React from 'react'
import { LayoutDashboard, MessageSquare, Calendar, FileText, BarChart2, Bot } from 'lucide-react'

const allTabs = [
  { id: 'overzicht', label: 'Overzicht', icon: LayoutDashboard, package: 'starter' },
  { id: 'agenda', label: 'Agenda', icon: Calendar, package: 'starter' },
  { id: 'administratie', label: 'Administratie', icon: FileText, package: 'starter' },
  { id: 'communicatie', label: 'Communicatie', icon: MessageSquare, package: 'pro' },
  { id: 'rapporten', label: 'Rapporten', icon: BarChart2, package: 'allin' },
  { id: 'ai-assistent', label: 'AI Assistent', icon: Bot, package: 'ai' },
]

const packageOrder = { starter: 0, pro: 1, allin: 2, ai: 3 }

function isTabAvailable(tab, currentPackage) {
  return packageOrder[currentPackage] >= packageOrder[tab.package]
}

export default function Sidebar({ sector, activeTab, onTabChange, currentPackage }) {
  const availableTabs = allTabs.filter(t => isTabAvailable(t, currentPackage))
  const lockedTabs = allTabs.filter(t => !isTabAvailable(t, currentPackage))

  return (
    <div className="flex flex-col h-full" style={{ background: '#060D1A', borderRight: '1px solid #1E2D45', width: '220px', minWidth: '220px' }}>
      {/* Logo */}
      <div className="px-5 py-5" style={{ borderBottom: '1px solid #1E2D45' }}>
        <div className="flex items-center gap-1">
          <span className="text-xl font-black" style={{ color: '#2563EB' }}>EDA</span>
          <span className="text-xl font-black text-white">Systems</span>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <div className="w-2 h-2 rounded-full" style={{ background: sector.color }} />
          <span className="text-xs font-medium" style={{ color: sector.color }}>{sector.name}</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-3 overflow-y-auto">
        {availableTabs.map(tab => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="w-full flex items-center gap-3 px-5 py-3 text-sm font-medium transition-colors relative"
              style={{
                background: isActive ? sector.color + '15' : 'transparent',
                color: isActive ? sector.color : '#94A3B8',
                borderLeft: isActive ? `3px solid ${sector.color}` : '3px solid transparent',
              }}
            >
              <Icon size={16} />
              {tab.label}
            </button>
          )
        })}

        {lockedTabs.length > 0 && (
          <div className="mt-3 mx-3">
            <div className="text-xs px-2 py-1 mb-1" style={{ color: '#475569' }}>Upgrade vereist</div>
            {lockedTabs.map(tab => {
              const Icon = tab.icon
              return (
                <div
                  key={tab.id}
                  className="flex items-center gap-3 px-2 py-3 text-sm rounded-lg opacity-40 cursor-not-allowed"
                  style={{ color: '#475569' }}
                >
                  <Icon size={16} />
                  {tab.label}
                  <span className="ml-auto text-xs" style={{ color: '#334155' }}>🔒</span>
                </div>
              )
            })}
          </div>
        )}
      </nav>

      {/* Package badge */}
      <div className="px-5 py-4" style={{ borderTop: '1px solid #1E2D45' }}>
        <div className="text-xs" style={{ color: '#475569' }}>Huidig pakket</div>
        <PackageBadge pkg={currentPackage} />
      </div>
    </div>
  )
}

function PackageBadge({ pkg }) {
  const map = {
    starter: { label: 'Starter', color: '#10B981' },
    pro: { label: 'Pro', color: '#2563EB' },
    allin: { label: 'All-in', color: '#8B5CF6' },
    ai: { label: 'AI Agent', color: '#F59E0B' },
  }
  const { label, color } = map[pkg] || map.starter
  return (
    <div className="mt-1 inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold" style={{ background: color + '20', color }}>
      {label}
    </div>
  )
}
