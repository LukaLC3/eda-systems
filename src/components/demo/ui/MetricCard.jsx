import { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export function MetricCard({ icon: Icon, label, value, delta, color }) {
  const [displayValue, setDisplayValue] = useState(0);
  const numericValue = typeof value === 'string' ? parseFloat(value.replace(/[^0-9.]/g, '')) : value;
  const isEuro = typeof value === 'string' && value.includes('€');
  const suffix = typeof value === 'string' && value.includes('uur') ? ' uur' : '';

  useEffect(() => {
    if (isNaN(numericValue)) return;
    let start = 0;
    const end = numericValue;
    const duration = 1200;
    const stepTime = 16;
    const steps = duration / stepTime;
    const increment = end / steps;
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setDisplayValue(end);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(start));
      }
    }, stepTime);
    return () => clearInterval(timer);
  }, [numericValue]);

  const formattedValue = isNaN(numericValue)
    ? value
    : isEuro
      ? `€${displayValue.toLocaleString('nl-BE')}`
      : `${displayValue}${suffix}`;

  return (
    <div style={{
      background: '#0D1B2E',
      border: '1px solid #1E2D45',
      borderRadius: '12px',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{
          width: 40, height: 40,
          borderRadius: '10px',
          background: `${color}20`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {Icon && <Icon size={20} color={color} />}
        </div>
        {delta !== undefined && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: 4,
            color: delta >= 0 ? '#10B981' : '#EF4444',
            fontSize: 13, fontWeight: 600,
          }}>
            {delta >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            {Math.abs(delta)}%
          </div>
        )}
      </div>
      <div>
        <div style={{ color: '#94A3B8', fontSize: 13, marginBottom: 4 }}>{label}</div>
        <div style={{ color: '#F1F5F9', fontSize: 28, fontWeight: 700, letterSpacing: '-0.5px' }}>
          {formattedValue}
        </div>
      </div>
    </div>
  );
}
