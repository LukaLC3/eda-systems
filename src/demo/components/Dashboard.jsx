import React, { useState } from 'react'
import Sidebar from './Sidebar'
import TopBar from './TopBar'
import PackageToggle from './PackageToggle'
import ROICalculator from './ROICalculator'
import OverviewTab from './tabs/OverviewTab'
import CommunicationTab from './tabs/CommunicationTab'
import AgendaTab from './tabs/AgendaTab'
import AdminTab from './tabs/AdminTab'
import RapportsTab from './tabs/RapportsTab'
import AIAssistantTab from './tabs/AIAssistantTab'
import { sectorData as allSectorData } from '../data/sectorData'
import { Lock } from 'lucide-react'

const packageOrder = { starter: 0, pro: 1, allin: 2, ai: 3 }

const tabPackage = {
  overzicht: 'starter',
  agenda: 'starter',
  administratie: 'starter',
  communicatie: 'pro',
  rapporten: 'allin',
  'ai-assistent': 'ai',
}

function isAvailable(tab, pkg) {
  return packageOrder[pkg] >= packageOrder[tabPackage[tab] || 'starter']
}

const packageNames = {
  starter: 'Starter',
  pro: 'Pro',
  allin: 'All-in',
  ai: 'AI Agent',
}

const packageColors = {
  starter: '#10B981',
  pro: '#2563EB',
  allin: '#8B5CF6',
  ai: '#F59E0B',
}

export default function Dashboard({ sector, onBack }) {
  const [activeTab, setActiveTab] = useState('overzicht')
  const [currentPackage, setCurrentPackage] = useState('starter')
  const [liveMode, setLiveMode] = useState(false)
  const [showROI, setShowROI] = useState(false)
  const data = allSectorData[sector.id]

  function handleTabChange(tab) {
    setActiveTab(tab)
  }

  const tabAvailable = isAvailable(activeTab, currentPackage)
  const requiredPkg = tabPackage[activeTab]

  function renderTab() {
    if (!tabAvailable) {
      return (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <div className="p-4 rounded-full mb-4" style={{ background: '#1E2D45' }}>
            <Lock size={28} style={{ color: '#475569' }} />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Upgrade vereist</h3>
          <p className="text-sm mb-5" style={{ color: '#64748B', maxWidth: '300px' }}>
            Deze functie is beschikbaar vanaf het <span style={{ color: packageColors[requiredPkg], fontWeight: 600 }}>{packageNames[requiredPkg]}</span> pakket.
          </p>
          <PackageToggle current={currentPackage} onChange={setCurrentPackage} />
        </div>
      )
    }

    switch (activeTab) {
      case 'overzicht':
        return <OverviewTab sector={sector} sectorData={data} />
      case 'agenda':
        return <AgendaTab sector={sector} sectorData={data} />
      case 'administratie':
        return <AdminTab sector={sector} sectorData={data} />
      case 'communicatie':
        return <CommunicationTab sector={sector} sectorData={data} liveMode={liveMode} />
      case 'rapporten':
        return <RapportsTab sector={sector} sectorData={data} />
      case 'ai-assistent':
        return <AIAssistantTab sector={sector} />
      default:
        return <OverviewTab sector={sector} sectorData={data} />
    }
  }

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#060D1A' }}>
      <Sidebar
        sector={sector}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        currentPackage={currentPackage}
      />

      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <TopBar
          sector={sector}
          currentPackage={currentPackage}
          liveMode={liveMode}
          onToggleLive={() => setLiveMode(v => !v)}
          onOpenROI={() => setShowROI(true)}
          onBack={onBack}
        />

        {/* Package selector bar */}
        <div className="px-6 py-3 flex items-center gap-4" style={{ background: '#0D1B2E', borderBottom: '1px solid #1E2D45' }}>
          <span className="text-xs font-medium" style={{ color: '#475569' }}>Pakket simuleren:</span>
          <PackageToggle current={currentPackage} onChange={setCurrentPackage} />
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-y-auto p-6">
          {renderTab()}
        </div>
      </div>

      {showROI && (
        <ROICalculator
          onClose={() => setShowROI(false)}
          sectorId={sector.id}
          activePackage={currentPackage}
        />
      )}
    </div>
  )
}
