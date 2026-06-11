export function StatusBadge({ status }) {
  const config = {
    'Verwerkt': { bg: '#10B98120', color: '#10B981', label: 'Verwerkt' },
    'OCR Klaar': { bg: '#10B98120', color: '#10B981', label: 'OCR Klaar' },
    'Klaar voor boekhouder': { bg: '#2563EB20', color: '#60A5FA', label: 'Klaar voor boekhouder' },
    'In behandeling': { bg: '#F59E0B20', color: '#F59E0B', label: 'In behandeling' },
    'Fout': { bg: '#EF444420', color: '#EF4444', label: 'Fout' },
  };
  const style = config[status] || { bg: '#94A3B820', color: '#94A3B8', label: status };
  return (
    <span style={{
      background: style.bg,
      color: style.color,
      borderRadius: 6,
      padding: '3px 10px',
      fontSize: 12,
      fontWeight: 600,
      whiteSpace: 'nowrap',
    }}>
      {style.label}
    </span>
  );
}
