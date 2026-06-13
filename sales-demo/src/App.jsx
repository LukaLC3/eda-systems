import { useState } from 'react'
import LandingScreen from './components/LandingScreen'
import Dashboard from './components/Dashboard'
import ROICalculator from './components/ROICalculator'
import SECTORS from './data/sectors'

export default function App() {
  const [activeSector, setActiveSector] = useState(null)
  const [showROI, setShowROI] = useState(false)

  return (
    <div style={{ minHeight: '100vh', background: '#060D1A', position: 'relative' }}>
      {showROI && <ROICalculator onClose={() => setShowROI(false)} />}
      {!activeSector ? (
        <LandingScreen
          sectors={SECTORS}
          onSelectSector={setActiveSector}
          onROIClick={() => setShowROI(true)}
        />
      ) : (
        <Dashboard
          sector={activeSector}
          sectors={SECTORS}
          onBack={() => setActiveSector(null)}
          onSectorChange={setActiveSector}
          onROIClick={() => setShowROI(true)}
        />
      )}
    </div>
  )
}
