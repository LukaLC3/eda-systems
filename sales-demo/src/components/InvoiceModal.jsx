import { X, Download, Send, Printer, CheckCircle, Clock } from 'lucide-react'

function fmt(n) {
  return new Intl.NumberFormat('nl-BE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n)
}

const COMPANY = {
  name: 'EDA Systems BV',
  address: 'Industrielaan 45',
  city: '3500 Hasselt',
  vat: 'BE 0789.123.456',
  iban: 'BE68 5390 0754 7034',
  bic: 'TRIOBEBB',
  email: 'info@eda-systems.be',
  phone: '+32 11 22 33 44',
  logo: 'EDA',
}

export default function InvoiceModal({ invoice, sector, onClose }) {
  if (!invoice) return null

  const isPaid = invoice.status === 'Betaald' || invoice.status === 'Verwerkt'
  const subtotal = invoice.amount
  const vat = invoice.vat ?? 0
  const total = invoice.total ?? (subtotal + vat)
  const vatPct = subtotal > 0 && vat > 0 ? Math.round((vat / subtotal) * 100) : 21

  // Parse line items from description
  const lineItems = [
    { desc: invoice.desc, unit: 1, price: subtotal, total: subtotal },
  ]
  if (invoice.mutualiteit && invoice.mutualiteit !== 'Niet terugbetaald') {
    const match = invoice.mutualiteit.match(/€([\d.]+)/)
    if (match) {
      lineItems.push({ desc: `Terugbetaling ${invoice.mutualiteit.split(' — ')[0]}`, unit: 1, price: -parseFloat(match[1].replace('.', '')), total: -parseFloat(match[1].replace('.', '')), note: true })
    }
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: 760, maxHeight: '90vh', overflowY: 'auto',
          background: '#0A1628', borderRadius: 16,
          border: '1px solid rgba(37,99,235,0.25)',
          boxShadow: '0 40px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(37,99,235,0.1)',
        }}
      >
        {/* Modal header */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'16px 24px', borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <div style={{ width:8, height:8, borderRadius:'50%', background: isPaid ? '#10B981' : '#F59E0B' }} className="pulse-dot" />
            <span style={{ fontSize:13, color:'rgba(255,255,255,0.5)', fontFamily:'monospace' }}>{invoice.id}</span>
            <span className={`badge ${isPaid ? 'badge-green' : 'badge-gold'}`}>{invoice.status}</span>
          </div>
          <div style={{ display:'flex', gap:8, alignItems:'center' }}>
            <button style={btnStyle} title="Afdrukken"><Printer size={14} /></button>
            <button style={btnStyle} title="Versturen"><Send size={14} /></button>
            <button style={btnStyle} title="Downloaden"><Download size={14} /></button>
            <button onClick={onClose} style={{ ...btnStyle, background:'rgba(239,68,68,0.15)', color:'#F87171' }}><X size={14} /></button>
          </div>
        </div>

        {/* Invoice body — white/light paper style */}
        <div style={{ margin:24, background:'#fff', borderRadius:12, overflow:'hidden', color:'#1a1a1a' }}>

          {/* Invoice top bar */}
          <div style={{ background: sector?.color || '#2563EB', padding:'20px 32px', display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
            <div>
              <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:4 }}>
                <div style={{ width:36, height:36, background:'rgba(255,255,255,0.2)', borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', fontSize:14, fontWeight:800, color:'#fff', fontFamily:'monospace' }}>
                  EDA
                </div>
                <div>
                  <div style={{ fontSize:18, fontWeight:700, color:'#fff', letterSpacing:-0.5 }}>EDA Systems</div>
                  <div style={{ fontSize:11, color:'rgba(255,255,255,0.7)', fontFamily:'monospace' }}>Automatisering & AI voor {sector?.name || 'bedrijven'}</div>
                </div>
              </div>
            </div>
            <div style={{ textAlign:'right' }}>
              <div style={{ fontSize:26, fontWeight:800, color:'#fff', letterSpacing:-1, fontFamily:'monospace' }}>FACTUUR</div>
              <div style={{ fontSize:13, color:'rgba(255,255,255,0.8)', fontFamily:'monospace', marginTop:2 }}>{invoice.id}</div>
            </div>
          </div>

          {/* From / To / Details */}
          <div style={{ padding:'24px 32px', display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:24, borderBottom:'1px solid #f0f0f0' }}>
            <div>
              <div style={labelStyle}>Van</div>
              <div style={{ fontWeight:700, fontSize:14, marginBottom:3 }}>EDA Systems BV</div>
              <div style={detailStyle}>Industrielaan 45<br />3500 Hasselt, België<br />BTW: BE 0789.123.456<br />info@eda-systems.be<br />+32 11 22 33 44</div>
            </div>
            <div>
              <div style={labelStyle}>Aan</div>
              <div style={{ fontWeight:700, fontSize:14, marginBottom:3 }}>{invoice.client}</div>
              {invoice.mutualiteit && <div style={{ ...detailStyle, marginTop:6, padding:'6px 10px', background:'#f0f9ff', borderRadius:6, border:'1px solid #bae6fd', fontSize:11 }}>
                🏥 {invoice.mutualiteit}
              </div>}
              {invoice.mileage && <div style={{ ...detailStyle, marginTop:6, padding:'6px 10px', background:'#f0fdf4', borderRadius:6, border:'1px solid #bbf7d0', fontSize:11 }}>
                🚗 {invoice.mileage} | Volgend onderhoud: {invoice.nextService}
              </div>}
            </div>
            <div>
              <div style={labelStyle}>Factuurgegevens</div>
              <table style={{ fontSize:12, borderCollapse:'collapse', width:'100%' }}>
                <tbody>
                  {[
                    ['Factuurnr.', invoice.id],
                    ['Datum', invoice.date],
                    ['Vervaldatum', addDays(invoice.date, 30)],
                    ['Betalingst.', '30 dagen netto'],
                    ['Ref.', invoice.category],
                  ].map(([k,v]) => (
                    <tr key={k}>
                      <td style={{ color:'#666', paddingBottom:3, paddingRight:12, fontWeight:500 }}>{k}</td>
                      <td style={{ fontWeight:600, fontFamily:'monospace', fontSize:11 }}>{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Line items */}
          <div style={{ padding:'0 32px' }}>
            <table style={{ width:'100%', borderCollapse:'collapse', fontSize:13 }}>
              <thead>
                <tr style={{ borderBottom:'2px solid #1a1a1a' }}>
                  {['Omschrijving','Qty','Eenheidsprijs','BTW','Totaal'].map(h => (
                    <th key={h} style={{ padding:'10px 0', textAlign:h==='Omschrijving'?'left':'right', fontSize:10, textTransform:'uppercase', letterSpacing:0.8, color:'#666', fontWeight:600 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom:'1px solid #f0f0f0' }}>
                  <td style={{ padding:'14px 0', lineHeight:1.5 }}>
                    <div style={{ fontWeight:600 }}>{invoice.desc}</div>
                    {invoice.behandelaar && <div style={{ fontSize:11, color:'#888', marginTop:2 }}>Behandelaar: {invoice.behandelaar}</div>}
                    {invoice.category && <div style={{ fontSize:11, color:'#888' }}>Categorie: {invoice.category}</div>}
                  </td>
                  <td style={{ textAlign:'right', padding:'14px 0 14px 16px', fontFamily:'monospace', fontWeight:500 }}>1</td>
                  <td style={{ textAlign:'right', padding:'14px 0 14px 16px', fontFamily:'monospace', fontWeight:500 }}>€ {fmt(subtotal)}</td>
                  <td style={{ textAlign:'right', padding:'14px 0 14px 16px', fontFamily:'monospace', color:'#666' }}>{vatPct}%</td>
                  <td style={{ textAlign:'right', padding:'14px 0 14px 16px', fontFamily:'monospace', fontWeight:700 }}>€ {fmt(subtotal)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div style={{ padding:'0 32px 24px', display:'flex', justifyContent:'flex-end' }}>
            <div style={{ minWidth:260 }}>
              <div style={{ display:'flex', justifyContent:'space-between', padding:'6px 0', fontSize:12, color:'#666' }}>
                <span>Subtotaal</span><span style={{ fontFamily:'monospace' }}>€ {fmt(subtotal)}</span>
              </div>
              {vat > 0 && (
                <div style={{ display:'flex', justifyContent:'space-between', padding:'6px 0', fontSize:12, color:'#666' }}>
                  <span>BTW {vatPct}%</span><span style={{ fontFamily:'monospace' }}>€ {fmt(vat)}</span>
                </div>
              )}
              <div style={{ display:'flex', justifyContent:'space-between', padding:'10px 0', fontSize:15, fontWeight:800, borderTop:'2px solid #1a1a1a', marginTop:4 }}>
                <span>TOTAAL</span><span style={{ fontFamily:'monospace', color: sector?.color || '#2563EB' }}>€ {fmt(total)}</span>
              </div>
              {isPaid ? (
                <div style={{ display:'flex', alignItems:'center', gap:6, marginTop:10, padding:'8px 12px', background:'#f0fdf4', borderRadius:8, border:'1px solid #bbf7d0' }}>
                  <CheckCircle size={14} color="#10B981" />
                  <span style={{ fontSize:12, color:'#059669', fontWeight:600 }}>Betaald — dank u!</span>
                </div>
              ) : (
                <div style={{ marginTop:10, padding:'8px 12px', background:'#fefce8', borderRadius:8, border:'1px solid #fde68a' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:3 }}>
                    <Clock size={13} color="#D97706" />
                    <span style={{ fontSize:11, color:'#92400E', fontWeight:600 }}>Openstaand — vervalt {addDays(invoice.date, 30)}</span>
                  </div>
                  <div style={{ fontSize:11, color:'#78350F' }}>IBAN: BE68 5390 0754 7034 · BIC: TRIOBEBB</div>
                  <div style={{ fontSize:11, color:'#78350F' }}>Mededeling: {invoice.id}</div>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div style={{ padding:'16px 32px', background:'#f8fafc', borderTop:'1px solid #f0f0f0', display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:16 }}>
            {[
              ['Bedrijf', 'EDA Systems BV · BE 0789.123.456'],
              ['Bank', 'BE68 5390 0754 7034 (TRIOBEBB)'],
              ['Contact', 'info@eda-systems.be · +32 11 22 33 44'],
            ].map(([k,v]) => (
              <div key={k}>
                <div style={{ fontSize:9, textTransform:'uppercase', letterSpacing:0.8, color:'#999', marginBottom:2, fontWeight:600 }}>{k}</div>
                <div style={{ fontSize:11, color:'#444' }}>{v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div style={{ padding:'0 24px 20px', display:'flex', gap:10, justifyContent:'flex-end' }}>
          <button onClick={onClose} style={{ padding:'9px 20px', borderRadius:8, background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)', color:'rgba(255,255,255,0.6)', fontSize:13, cursor:'pointer' }}>
            Sluiten
          </button>
          {!isPaid && (
            <button style={{ padding:'9px 20px', borderRadius:8, background:'#10B981', border:'none', color:'#fff', fontSize:13, fontWeight:600, cursor:'pointer', display:'flex', alignItems:'center', gap:6 }}>
              <CheckCircle size={14} /> Markeer als betaald
            </button>
          )}
          <button style={{ padding:'9px 20px', borderRadius:8, background:'#2563EB', border:'none', color:'#fff', fontSize:13, fontWeight:600, cursor:'pointer', display:'flex', alignItems:'center', gap:6 }}>
            <Send size={14} /> Verstuur naar klant
          </button>
        </div>
      </div>
    </div>
  )
}

function addDays(dateStr, days) {
  const [d, m, y] = dateStr.split('/')
  const date = new Date(`${y}-${m}-${d}`)
  date.setDate(date.getDate() + days)
  return date.toLocaleDateString('nl-BE', { day:'2-digit', month:'2-digit', year:'numeric' })
}

const btnStyle = {
  width:30, height:30, borderRadius:7, background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)',
  color:'rgba(255,255,255,0.5)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center',
}
const labelStyle = { fontSize:10, textTransform:'uppercase', letterSpacing:0.8, color:'#999', fontWeight:600, marginBottom:6 }
const detailStyle = { fontSize:12, color:'#555', lineHeight:1.7 }
