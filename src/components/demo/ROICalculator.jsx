import { useState } from 'react';
import { X } from 'lucide-react';

const packagePrices = { starter: 99, pro: 199, allin: 349, aiagent: 599 };
const packageNames = { starter: 'Starter', pro: 'Pro', allin: 'All-in', aiagent: 'AI Agent' };

export function ROICalculator({ onClose, activePackage }) {
  const [medewerkers, setMedewerkers] = useState(3);
  const [uurloon, setUurloon] = useState(35);
  const [berichtenPerDag, setBerichtenPerDag] = useState(50);

  const urenBespaard = Math.round(berichtenPerDag * 0.1 * 4);
  const kostenbesparing = urenBespaard * uurloon;
  const pakketprijs = packagePrices[activePackage] || 99;
  const roi = Math.round(((kostenbesparing - pakketprijs) / pakketprijs) * 100);
  const terugverdienWeeks = pakketprijs > 0
    ? Math.ceil(pakketprijs / (kostenbesparing / 4.33))
    : 0;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(0,0,0,0.7)',
        zIndex: 1000,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        backdropFilter: 'blur(4px)',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#0D1B2E',
          border: '1px solid #1E2D45',
          borderRadius: 16,
          padding: 32,
          width: 520,
          maxWidth: '95vw',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <h2 style={{ color: '#F1F5F9', fontSize: 22, fontWeight: 700, margin: 0 }}>ROI Calculator</h2>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: 4 }}
          >
            <X size={20} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginBottom: 28 }}>
          <SliderField
            label="Aantal medewerkers"
            value={medewerkers}
            min={1} max={50}
            onChange={setMedewerkers}
            format={(v) => `${v} personen`}
          />
          <SliderField
            label="Gemiddeld uurloon"
            value={uurloon}
            min={15} max={100}
            onChange={setUurloon}
            format={(v) => `€${v}/uur`}
          />
          <SliderField
            label="Berichten per dag"
            value={berichtenPerDag}
            min={10} max={500}
            onChange={setBerichtenPerDag}
            format={(v) => `${v} berichten`}
          />
        </div>

        <div style={{
          background: '#060D1A', borderRadius: 12,
          padding: 24, marginBottom: 20,
          border: '1px solid #1E2D45',
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <ResultItem label="Uren bespaard/maand" value={`${urenBespaard} uur`} color="#60A5FA" />
            <ResultItem label="Kostenbesparing/maand" value={`€${kostenbesparing.toLocaleString('nl-BE')}`} color="#10B981" />
            <ResultItem label={`Pakketprijs (${packageNames[activePackage]})`} value={`€${pakketprijs}/mnd`} color="#F59E0B" />
            <ResultItem label="Terugverdientijd" value={`${terugverdienWeeks} weken`} color="#8B5CF6" />
          </div>
          <div style={{ textAlign: 'center', paddingTop: 16, borderTop: '1px solid #1E2D45' }}>
            <div style={{ color: '#94A3B8', fontSize: 13, marginBottom: 4 }}>Maandelijkse ROI</div>
            <div style={{
              fontSize: 56, fontWeight: 800,
              color: roi > 0 ? '#10B981' : '#EF4444',
              letterSpacing: '-2px',
            }}>
              {roi > 0 ? '+' : ''}{roi}%
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          style={{
            width: '100%', padding: '14px',
            background: '#2563EB', color: '#fff',
            border: 'none', borderRadius: 10,
            fontWeight: 700, fontSize: 15,
            cursor: 'pointer',
          }}
        >
          Aan de slag met EDA Systems →
        </button>
      </div>
    </div>
  );
}

function SliderField({ label, value, min, max, onChange, format }) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
        <span style={{ color: '#94A3B8', fontSize: 13 }}>{label}</span>
        <span style={{ color: '#F1F5F9', fontSize: 13, fontWeight: 600 }}>{format(value)}</span>
      </div>
      <input
        type="range"
        min={min} max={max} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ width: '100%', accentColor: '#2563EB' }}
      />
    </div>
  );
}

function ResultItem({ label, value, color }) {
  return (
    <div style={{ background: '#0D1B2E', borderRadius: 8, padding: '12px 16px', border: '1px solid #1E2D45' }}>
      <div style={{ color: '#94A3B8', fontSize: 12, marginBottom: 4 }}>{label}</div>
      <div style={{ color, fontSize: 18, fontWeight: 700 }}>{value}</div>
    </div>
  );
}
