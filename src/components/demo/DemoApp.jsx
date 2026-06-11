import { useState } from 'react';
import { LandingScreen } from './LandingScreen';
import { Dashboard } from './Dashboard';
import { sectors } from './data/sectors';

export function DemoApp() {
  const [selectedSector, setSelectedSector] = useState(null);
  const [activeTab, setActiveTab] = useState('overzicht');
  const [activePackage, setActivePackage] = useState('starter');
  const [liveMode, setLiveMode] = useState(false);
  const [showROI, setShowROI] = useState(false);

  const handleSelectSector = (sector) => {
    setSelectedSector(sector);
    setActiveTab('overzicht');
  };

  const handleBack = () => {
    setSelectedSector(null);
    setLiveMode(false);
    setShowROI(false);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Inter', sans-serif; background: #060D1A; color: #F1F5F9; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: #0D1B2E; }
        ::-webkit-scrollbar-thumb { background: #1E2D45; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: #2563EB; }
      `}</style>
      {!selectedSector ? (
        <LandingScreen sectors={sectors} onSelectSector={handleSelectSector} />
      ) : (
        <Dashboard
          sector={selectedSector}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          activePackage={activePackage}
          setActivePackage={setActivePackage}
          liveMode={liveMode}
          setLiveMode={setLiveMode}
          showROI={showROI}
          setShowROI={setShowROI}
          onBack={handleBack}
        />
      )}
    </>
  );
}
