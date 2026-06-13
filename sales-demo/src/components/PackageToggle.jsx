const PACKAGES = [
  { id: 'starter', label: 'Starter', price: '€247' },
  { id: 'pro', label: 'Pro', price: '€397' },
  { id: 'allin', label: 'All-in', price: '€597' },
  { id: 'aiagent', label: 'AI Agent', price: '€997' },
]

export default function PackageToggle({ activePackage, onPackageChange }) {
  return (
    <div
      style={{
        display: 'flex',
        background: 'rgba(255,255,255,0.05)',
        borderRadius: 10,
        padding: 4,
        gap: 2,
        border: '1px solid rgba(37,99,235,0.2)',
      }}
    >
      {PACKAGES.map(pkg => {
        const isActive = pkg.id === activePackage
        return (
          <button
            key={pkg.id}
            onClick={() => onPackageChange(pkg.id)}
            style={{
              padding: '6px 14px',
              borderRadius: 7,
              border: 'none',
              cursor: 'pointer',
              background: isActive ? '#2563EB' : 'transparent',
              color: isActive ? 'white' : 'rgba(255,255,255,0.5)',
              fontSize: 12,
              fontWeight: isActive ? 600 : 400,
              transition: 'all 0.15s',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              lineHeight: 1.3,
            }}
          >
            <span>{pkg.label}</span>
            <span
              style={{
                fontSize: 10,
                opacity: 0.8,
                fontFamily: 'JetBrains Mono, monospace',
                color: isActive ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.35)',
              }}
            >
              {pkg.price}
            </span>
          </button>
        )
      })}
    </div>
  )
}
