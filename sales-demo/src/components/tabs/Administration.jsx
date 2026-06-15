import { useState } from 'react'
import { Eye, TrendingUp, FileText, CheckCircle, Clock, Package, Search, Filter } from 'lucide-react'
import InvoiceModal from '../InvoiceModal'

function fmt(n) {
  return new Intl.NumberFormat('nl-BE', { style:'currency', currency:'EUR' }).format(n)
}

/* Accountants: document processing table */
function DocumentProcessing({ sector }) {
  return (
    <div style={{ background:'rgba(7,15,30,0.8)', border:'1px solid rgba(139,92,246,0.15)', borderRadius:14, overflow:'hidden' }}>
      <div style={{ padding:'12px 18px', borderBottom:'1px solid rgba(255,255,255,0.06)', display:'flex', alignItems:'center', gap:10 }}>
        <FileText size={15} color="#8B5CF6" />
        <div style={{ fontSize:13, fontWeight:700, color:'#fff' }}>Documentverwerking — OCR & Categorisatie</div>
        <div style={{ marginLeft:'auto', fontSize:10, fontFamily:'monospace', color:'#8B5CF6', background:'rgba(139,92,246,0.1)', padding:'3px 10px', borderRadius:999, border:'1px solid rgba(139,92,246,0.25)' }}>98.7% nauwkeurigheid</div>
      </div>
      <div style={{ overflowX:'auto' }}>
        <table className="data-table">
          <thead>
            <tr>
              {['Datum','Leverancier','Bedrag','Categorie','OCR Status','BTW-code','Bank ✓'].map(h => <th key={h}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {(sector.documentProcessing || []).map((doc, i) => (
              <tr key={i}>
                <td><span className="num" style={{color:'#475569',fontSize:11}}>{doc.date}</span></td>
                <td><span style={{color:'#fff',fontWeight:500}}>{doc.supplier}</span></td>
                <td><span className="num" style={{color:'#fff',fontWeight:600}}>{doc.amount}</span></td>
                <td><span style={{fontSize:11,padding:'3px 8px',background:'rgba(139,92,246,0.1)',color:'#A78BFA',borderRadius:6,border:'1px solid rgba(139,92,246,0.2)'}}>{doc.category}</span></td>
                <td>
                  <div style={{display:'flex',alignItems:'center',gap:5}}>
                    <span className={`badge ${doc.ocr==='Verwerkt'?'badge-green':'badge-gold'}`} style={{fontSize:10}}>{doc.ocr}</span>
                    {doc.confidence && <span style={{fontSize:10,color:'#334155',fontFamily:'monospace'}}>{doc.confidence}</span>}
                  </div>
                </td>
                <td><span className="num" style={{color:'#475569',fontSize:11}}>{doc.vatCode || '—'}</span></td>
                <td>
                  {doc.bankMatch
                    ? <span className="badge badge-green" style={{fontSize:10}}>✓ Match</span>
                    : <span className="badge badge-red" style={{fontSize:10}}>✗ Open</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default function Administration({ sector, activePackage }) {
  const [selectedInvoice, setSelectedInvoice] = useState(null)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('alle')
  const { color, adminItems = [], adminSummary, accountManager } = sector
  const isAccountant = sector.id === 'accountants'

  const filtered = adminItems.filter(inv => {
    const matchSearch = search === '' || inv.desc.toLowerCase().includes(search.toLowerCase()) || inv.client?.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'alle' || (filter === 'betaald' && (inv.status === 'Betaald' || inv.status === 'Verwerkt')) || (filter === 'open' && (inv.status === 'Openstaand'))
    return matchSearch && matchFilter
  })

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
      {selectedInvoice && <InvoiceModal invoice={selectedInvoice} sector={sector} onClose={() => setSelectedInvoice(null)} />}

      {/* Summary */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr 1fr', gap:12 }}>
        {[
          { label:'Totaal verwerkt', value: fmt(adminSummary?.total || 0), icon:<TrendingUp size={15} color={color}/>, color },
          { label:'Documenten deze maand', value: adminSummary?.count || 0, icon:<FileText size={15} color="#8B5CF6"/>, color:'#8B5CF6' },
          { label:'Openstaand', value: fmt(adminSummary?.openstaand || 0), icon:<Clock size={15} color="#F59E0B"/>, color:'#F59E0B' },
          { label:'Tijd bespaard', value: adminSummary?.timeSaved || '—', icon:<CheckCircle size={15} color="#10B981"/>, color:'#10B981' },
        ].map((s,i) => (
          <div key={i} style={{ background:'rgba(7,15,30,0.85)', border:`1px solid ${s.color}25`, borderRadius:12, padding:'14px 16px', position:'relative', overflow:'hidden' }}>
            <div style={{ position:'absolute', top:0, left:0, right:0, height:2, background:`linear-gradient(90deg, transparent, ${s.color}66, transparent)` }} />
            <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:8 }}>
              {s.icon}
              <span style={{ fontSize:10, color:'#475569', fontWeight:600, textTransform:'uppercase', letterSpacing:0.7 }}>{s.label}</span>
            </div>
            <div className="num" style={{ fontSize:20, fontWeight:700, color:'#fff' }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* All-in: accountmanager badge */}
      {(activePackage === 'allin' || activePackage === 'aiagent') && accountManager && (
        <div style={{ background:'rgba(37,99,235,0.08)', border:'1px solid rgba(37,99,235,0.2)', borderRadius:10, padding:'10px 14px', display:'flex', alignItems:'center', gap:10 }}>
          <div style={{ width:32, height:32, borderRadius:'50%', background:'#2563EB', display:'flex', alignItems:'center', justifyContent:'center', fontSize:12, fontWeight:700, color:'#fff', flexShrink:0 }}>
            {accountManager.split(' ').map(n=>n[0]).join('')}
          </div>
          <div>
            <div style={{ fontSize:12, fontWeight:600, color:'#fff' }}>Uw accountmanager: {accountManager}</div>
            <div style={{ fontSize:11, color:'#475569' }}>Persoonlijke opvolging · beschikbaar ma-vr 09:00-17:00</div>
          </div>
          <div style={{ marginLeft:'auto', display:'flex', gap:8 }}>
            <button style={{ padding:'6px 12px', borderRadius:7, background:'rgba(37,99,235,0.15)', border:'1px solid rgba(37,99,235,0.3)', color:'#60A5FA', fontSize:11, cursor:'pointer' }}>📞 Bellen</button>
            <button style={{ padding:'6px 12px', borderRadius:7, background:'rgba(37,99,235,0.15)', border:'1px solid rgba(37,99,235,0.3)', color:'#60A5FA', fontSize:11, cursor:'pointer' }}>✉️ Mailen</button>
          </div>
        </div>
      )}

      {/* Accountants special: document processing */}
      {isAccountant && sector.documentProcessing && <DocumentProcessing sector={sector} />}

      {/* Invoice table */}
      <div style={{ background:'rgba(7,15,30,0.8)', border:'1px solid rgba(255,255,255,0.06)', borderRadius:14, overflow:'hidden' }}>
        <div style={{ padding:'12px 18px', borderBottom:'1px solid rgba(255,255,255,0.06)', display:'flex', alignItems:'center', gap:10 }}>
          <div style={{ fontSize:13, fontWeight:700, color:'#fff' }}>Facturen & Documenten</div>
          <div style={{ marginLeft:'auto', display:'flex', gap:8, alignItems:'center' }}>
            {/* Search */}
            <div style={{ position:'relative', display:'flex', alignItems:'center' }}>
              <Search size={12} style={{ position:'absolute', left:8, color:'#475569' }} />
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Zoeken..." style={{ paddingLeft:26, paddingRight:10, paddingTop:5, paddingBottom:5, background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:7, color:'rgba(255,255,255,0.7)', fontSize:11, outline:'none', width:160 }} />
            </div>
            {/* Filter */}
            {['alle','betaald','open'].map(f => (
              <button key={f} onClick={() => setFilter(f)} style={{ padding:'4px 10px', borderRadius:6, background: filter===f ? `${color}22` : 'transparent', border:`1px solid ${filter===f ? color+'44' : 'rgba(255,255,255,0.08)'}`, color: filter===f ? color : '#475569', fontSize:11, cursor:'pointer', fontWeight:600, textTransform:'capitalize' }}>{f}</button>
            ))}
          </div>
        </div>
        <div style={{ overflowX:'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                {['Factuur','Datum','Omschrijving','Klant','Excl. BTW','BTW','Totaal','Status',''].map(h => <th key={h}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {filtered.map((inv, i) => {
                const isPaid = inv.status === 'Betaald' || inv.status === 'Verwerkt'
                return (
                  <tr key={i} style={{ cursor:'pointer' }} onClick={() => setSelectedInvoice(inv)}>
                    <td><span className="num" style={{color:color,fontWeight:600,fontSize:11}}>{inv.id}</span></td>
                    <td><span className="num" style={{color:'#475569',fontSize:11}}>{inv.date}</span></td>
                    <td><div style={{maxWidth:220,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',fontSize:12}}>{inv.desc}</div></td>
                    <td><span style={{fontSize:12,color:'rgba(255,255,255,0.6)'}}>{inv.client}</span></td>
                    <td><span className="num" style={{color:'rgba(255,255,255,0.7)',fontSize:12}}>{fmt(inv.amount)}</span></td>
                    <td><span className="num" style={{color:'#475569',fontSize:11}}>{fmt(inv.vat||0)}</span></td>
                    <td><span className="num" style={{color:'#fff',fontWeight:700,fontSize:12}}>{fmt(inv.total||inv.amount)}</span></td>
                    <td>
                      <span className={`badge ${isPaid?'badge-green':'badge-gold'}`}>{inv.status}</span>
                    </td>
                    <td>
                      <button style={{ display:'flex', alignItems:'center', gap:4, padding:'5px 10px', borderRadius:6, background:`${color}15`, border:`1px solid ${color}30`, color:color, fontSize:11, cursor:'pointer', fontWeight:600, whiteSpace:'nowrap' }} onClick={e => { e.stopPropagation(); setSelectedInvoice(inv) }}>
                        <Eye size={11} /> Bekijken
                      </button>
                    </td>
                  </tr>
                )
              })}
              {filtered.length === 0 && (
                <tr><td colSpan={9} style={{ textAlign:'center', color:'#334155', padding:'24px', fontSize:13 }}>Geen resultaten gevonden</td></tr>
              )}
            </tbody>
          </table>
        </div>
        <div style={{ padding:'10px 18px', borderTop:'1px solid rgba(255,255,255,0.04)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <span style={{ fontSize:11, color:'#334155' }}>{filtered.length} van {adminItems.length} facturen</span>
          <span className="num" style={{ fontSize:11, color:'#475569' }}>Totaal gefilterd: {fmt(filtered.reduce((s,i) => s + (i.total||i.amount||0), 0))}</span>
        </div>
      </div>
    </div>
  )
}
