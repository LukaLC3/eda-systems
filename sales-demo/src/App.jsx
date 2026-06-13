import { useState } from 'react'
import CircuitBoard from './components/CircuitBoard'
import LandingScreen from './components/LandingScreen'
import Dashboard from './components/Dashboard'
import ROICalculator from './components/ROICalculator'

export default function App() {
  const [activeSector, setActiveSector] = useState(null)
  const [showROI, setShowROI] = useState(false)

  return (
    <div style={{ minHeight: '100vh', background: '#060D1A', position: 'relative' }}>
      <CircuitBoard />
      {showROI && <ROICalculator onClose={() => setShowROI(false)} />}
      {!activeSector ? (
        <LandingScreen
          onSelectSector={setActiveSector}
          onShowROI={() => setShowROI(true)}
        />
      ) : (
        <Dashboard
          sector={activeSector}
          onBack={() => setActiveSector(null)}
          onShowROI={() => setShowROI(true)}
        />
      )}
    </div>
  )
}
