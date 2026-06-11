const packages = [
  { id: 'starter', label: 'Starter', color: '#10B981' },
  { id: 'pro', label: 'Pro', color: '#2563EB' },
  { id: 'allin', label: 'All-in', color: '#8B5CF6' },
  { id: 'aiagent', label: 'AI Agent', color: '#F59E0B' },
];

export function PackageToggle({ activePackage, setActivePackage }) {
  return (
    <div style={{ display: 'flex', gap: 4, background: '#060D1A', borderRadius: 10, padding: 4 }}>
      {packages.map((pkg) => {
        const isActive = activePackage === pkg.id;
        return (
          <button
            key={pkg.id}
            onClick={() => setActivePackage(pkg.id)}
            style={{
              padding: '6px 14px',
              borderRadius: 7,
              border: 'none',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: 13,
              transition: 'all 0.15s',
              background: isActive ? pkg.color : 'transparent',
              color: isActive ? '#fff' : pkg.color,
            }}
          >
            {pkg.label}
          </button>
        );
      })}
    </div>
  );
}
