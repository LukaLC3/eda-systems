import React from 'react'

const packages = [
  { id: 'starter', label: 'Starter', color: '#10B981' },
  { id: 'pro', label: 'Pro', color: '#2563EB' },
  { id: 'allin', label: 'All-in', color: '#8B5CF6' },
  { id: 'ai', label: 'AI Agent', color: '#F59E0B' },
]

export default function PackageToggle({ current, onChange }) {
  return (
    <div className="flex gap-2 flex-wrap">
      {packages.map(pkg => {
        const isActive = current === pkg.id
        return (
          <button
            key={pkg.id}
            onClick={() => onChange(pkg.id)}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
            style={{
              background: isActive ? pkg.color : 'transparent',
              color: isActive ? '#fff' : pkg.color,
              border: `2px solid ${pkg.color}`,
            }}
          >
            {pkg.label}
          </button>
        )
      })}
    </div>
  )
}
