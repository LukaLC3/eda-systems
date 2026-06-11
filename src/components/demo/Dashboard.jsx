import { Sidebar } from './Sidebar.jsx';
import { TopBar } from './TopBar.jsx';
import { ROICalculator } from './ROICalculator.jsx';
import { OverviewTab } from './tabs/OverviewTab.jsx';
import { CommunicationTab } from './tabs/CommunicationTab.jsx';
import { AgendaTab } from './tabs/AgendaTab.jsx';
import { AdminTab } from './tabs/AdminTab.jsx';
import { RapportsTab } from './tabs/RapportsTab.jsx';
import { AIAssistantTab } from './tabs/AIAssistantTab.jsx';
import { sectorData } from './data/sectorData.js';
import { sectors } from './data/sectors.js';

const tabComponents = {
  overzicht: OverviewTab,
  communicatie: CommunicationTab,
  agenda: AgendaTab,
  administratie: AdminTab,
  rapporten: RapportsTab,
  'ai-assistent': AIAssistantTab,
};

export function Dashboard({
  selectedSector,
  activeTab, setActiveTab,
  activePackage, setActivePackage,
  liveMode, setLiveMode,
  showROI, setShowROI,
  onBack,
}) {
  const data = sectorData[selectedSector] || {};
  const sector = sectors.find((s) => s.id === selectedSector);
  const TabComponent = tabComponents[activeTab] || OverviewTab;

  return (
    <div style={{ minHeight: '100vh', background: '#060D1A', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <Sidebar
        selectedSector={selectedSector}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        activePackage={activePackage}
        onBack={onBack}
      />
      <TopBar
        selectedSector={selectedSector}
        activePackage={activePackage}
        setActivePackage={setActivePackage}
        liveMode={liveMode}
        setLiveMode={setLiveMode}
        showROI={showROI}
        setShowROI={setShowROI}
      />
      <div style={{ marginLeft: 240, paddingTop: 64, minHeight: '100vh' }}>
        <TabComponent
          data={data}
          sector={sector}
          liveMode={liveMode}
          activePackage={activePackage}
        />
      </div>
      {showROI && (
        <ROICalculator onClose={() => setShowROI(false)} activePackage={activePackage} />
      )}
    </div>
  );
}
