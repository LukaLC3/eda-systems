import { useState } from 'react'
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, Cell } from 'recharts'
import { Bell, RefreshCw, ChefHat, UtensilsCrossed, Clock, Users, AlertCircle } from 'lucide-react'

const DAYS = ['Ma','Di','Wo','Do','Vr']

const STATUS_COLOR = {
  'Bezet':         { bg:'rgba(239,68,68,0.12)',   border:'rgba(239,68,68,0.35)',   dot:'#EF4444', label:'Bezet' },
  'Vrij':          { bg:'rgba(16,185,129,0.08)',  border:'rgba(16,185,129,0.25)',  dot:'#10B981', label:'Vrij' },
  'Gereserveerd':  { bg:'rgba(37,99,235,0.1)',    border:'rgba(37,99,235,0.3)',    dot:'#2563EB', label:'Gereserveerd' },
  'Schoonmaken':   { bg:'rgba(245,158,11,0.1)',   border:'rgba(245,158,11,0.3)',   dot:'#F59E0B', label:'Schoonmaken' },
  'Gepland':       { bg:'rgba(139,92,246,0.1)',   border:'rgba(139,92,246,0.3)',   dot:'#8B5CF6', label:'Gepland' },
  'Klaar':         { bg:'rgba(16,185,129,0.12)',  border:'rgba(16,185,129,0.35)', dot:'#10B981', label:'Klaar ✅' },
}

const ORDER_STATUS = {
  'Klaar':       { bg:'rgba(16,185,129,0.15)', color:'#10B981', border:'rgba(16,185,129,0.3)' },
  'In bereiding':{ bg:'rgba(245,158,11,0.15)', color:'#F59E0B', border:'rgba(245,158,11,0.3)' },
  'Wacht':       { bg:'rgba(37,99,235,0.12)',  color:'#60A5FA', border:'rgba(37,99,235,0.25)' },
  'Gepland':     { bg:'rgba(139,92,246,0.12)', color:'#A78BFA', border:'rgba(139,92,246,0.25)' },
}

/* Horeca: Kitchen orders board */
function KitchenBoard({ sector }) {
  const [orders, setOrders] = useState(sector.kitchenOrders || [])
  function advance(idx) {
    setOrders(o => o.map((order, i) => {
      if (i !== idx) return order
      const next = { 'Wacht':'In bereiding', 'In bereiding':'Klaar', 'Gepland':'Wacht' }
      return { ...order, status: next[order.status] || order.status }
    }))
  }
  return (
    <div style={{ background:'rgba(7,15,30,0.85)', border:'1px solid rgba(249,115,22,0.2)', borderRadius:14, overflow:'hidden' }}>
      <div style={{ padding:'12px 18px', borderBottom:'1px solid rgba(249,115,22,0.15)', display:'flex', alignItems:'center', gap:10 }}>
        <ChefHat size={16} color="#F97316" />
        <div style={{ fontSize:13, fontWeight:700, color:'#fff' }}>Keuken Bonnenboard</div>
        <div style={{ marginLeft:'auto', fontSize:10, fontFamily:'monospace', color:'#F97316', background:'rgba(249,115,22,0.1)', padding:'3px 8px', borderRadius:999, border:'1px solid rgba(249,115,22,0.25)' }}>LIVE KEUKEN</div>
      </div>
      <div style={{ padding:14, display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10 }}>
        {orders.map((order, i) => {
          const st = ORDER_STATUS[order.status] || ORDER_STATUS['Gepland']
          return (
            <div key={i} style={{ background:st.bg, border:`1px solid ${st.border}`, borderRadius:10, padding:12, cursor:'pointer', transition:'all 0.2s' }} onClick={() => advance(i)}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8 }}>
                <span style={{ fontSize:11, fontWeight:700, color:'#fff', fontFamily:'monospace' }}>{order.order}</span>
                <span style={{ fontSize:10, background:st.bg, color:st.color, border:`1px solid ${st.border}`, padding:'2px 7px', borderRadius:999, fontWeight:600 }}>{order.status}</span>
              </div>
              <div style={{ fontSize:11, color:'#F97316', fontWeight:600, marginBottom:6 }}>🪑 {order.table}</div>
              {order.items.map((item, j) => (
                <div key={j} style={{ fontSize:11, color:'rgba(255,255,255,0.65)', lineHeight:1.5 }}>• {item}</div>
              ))}
              <div style={{ display:'flex', justify:'space-between', marginTop:8, fontSize:10, color:'#475569', fontFamily:'monospace' }}>
                <span>🕐 {order.time}</span>
                {order.prepTime !== '—' && <span>⏱️ {order.prepTime}</span>}
              </div>
              {order.status === 'Wacht' && <div style={{ marginTop:6, fontSize:10, color:'#60A5FA', textAlign:'center' }}>→ Klik om te starten</div>}
              {order.status === 'In bereiding' && <div style={{ marginTop:6, fontSize:10, color:'#F59E0B', textAlign:'center' }}>→ Klik als klaar</div>}
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* Horeca: Restaurant table map */
function RestaurantMap({ sector }) {
  const [tables, setTables] = useState(sector.restaurantTables || [])
  const [selected, setSelected] = useState(null)
  const bezet = tables.filter(t => t.status === 'Bezet').length
  const total = tables.length
  const pct = Math.round((bezet / total) * 100)

  return (
    <div style={{ background:'rgba(7,15,30,0.85)', border:'1px solid rgba(249,115,22,0.2)', borderRadius:14, overflow:'hidden' }}>
      <div style={{ padding:'12px 18px', borderBottom:'1px solid rgba(249,115,22,0.15)', display:'flex', alignItems:'center', gap:10 }}>
        <UtensilsCrossed size={16} color="#F97316" />
        <div style={{ fontSize:13, fontWeight:700, color:'#fff' }}>Restaurant (50 couverts)</div>
        <div style={{ marginLeft:'auto', display:'flex', alignItems:'center', gap:8 }}>
          <div style={{ fontSize:11, color:'#F59E0B' }} className="num">{pct}% bezet</div>
          <div style={{ width:80, height:6, background:'rgba(255,255,255,0.08)', borderRadius:999, overflow:'hidden' }}>
            <div style={{ width:`${pct}%`, height:'100%', background: pct>85?'#EF4444':pct>60?'#F59E0B':'#10B981', borderRadius:999, transition:'width 0.5s' }} />
          </div>
        </div>
      </div>

      {/* Legend */}
      <div style={{ padding:'8px 14px', display:'flex', gap:14, borderBottom:'1px solid rgba(255,255,255,0.05)' }}>
        {Object.entries(STATUS_COLOR).slice(0,5).map(([k,v]) => (
          <div key={k} style={{ display:'flex', alignItems:'center', gap:5, fontSize:10, color:'#475569' }}>
            <div style={{ width:8, height:8, borderRadius:2, background:v.dot, opacity:0.8 }} />
            {v.label}
          </div>
        ))}
      </div>

      {/* Table grid */}
      <div style={{ padding:14, display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:8 }}>
        {tables.filter(t => t.id !== 'Salon').map(t => {
          const st = STATUS_COLOR[t.status] || STATUS_COLOR['Vrij']
          const isSelected = selected === t.id
          return (
            <div key={t.id} onClick={() => setSelected(isSelected ? null : t.id)}
              style={{ background:isSelected ? st.bg : `${st.bg.replace('0.12','0.07')}`, border:`1px solid ${isSelected ? st.border : st.border.replace('0.35','0.2')}`, borderRadius:10, padding:'10px 8px', cursor:'pointer', transition:'all 0.2s', transform: isSelected?'scale(1.03)':'scale(1)' }}>
              <div style={{ fontSize:9, color:'#475569', fontFamily:'monospace', marginBottom:3 }}>{t.id}</div>
              <div style={{ display:'flex', alignItems:'center', gap:3, marginBottom:4 }}>
                <div style={{ width:6, height:6, borderRadius:'50%', background:st.dot }} className={t.status==='Bezet'?'pulse-dot':''} />
                <span style={{ fontSize:10, color:st.dot, fontWeight:600 }}>{t.status}</span>
              </div>
              <div style={{ fontSize:10, color:'rgba(255,255,255,0.6)', lineHeight:1.4 }}>
                {t.status === 'Bezet' && t.name && <div style={{fontWeight:600,color:'#fff',fontSize:10}}>{t.name}</div>}
                <div style={{fontSize:9,color:'#334155'}}>{t.seats}p</div>
                {t.expectedLeave && <div style={{fontSize:9,color:'#F59E0B',fontFamily:'monospace'}}>vrij ~{t.expectedLeave}</div>}
              </div>
            </div>
          )
        })}
      </div>

      {/* Salon */}
      {tables.find(t => t.id === 'Salon') && (() => {
        const salon = tables.find(t => t.id === 'Salon')
        const st = STATUS_COLOR[salon.status] || STATUS_COLOR['Vrij']
        return (
          <div style={{ margin:'0 14px 14px', background:st.bg, border:`1px solid ${st.border}`, borderRadius:10, padding:'10px 14px', display:'flex', alignItems:'center', gap:12 }}>
            <div style={{ width:8, height:8, borderRadius:'50%', background:st.dot }} />
            <div>
              <div style={{ fontSize:12, fontWeight:700, color:'#fff' }}>Salon Privé — {salon.seats} personen max</div>
              <div style={{ fontSize:11, color:'#475569', marginTop:1 }}>{salon.nextReservation}</div>
            </div>
            <span style={{ marginLeft:'auto', fontSize:10, color:st.dot, fontWeight:600 }}>{salon.status}</span>
          </div>
        )
      })()}

      {/* Selected detail */}
      {selected && (() => {
        const t = tables.find(t => t.id === selected)
        if (!t) return null
        return (
          <div className="fade-in" style={{ margin:'0 14px 14px', background:'rgba(37,99,235,0.08)', border:'1px solid rgba(37,99,235,0.2)', borderRadius:10, padding:'10px 14px' }}>
            <div style={{ fontSize:12, fontWeight:600, color:'#fff', marginBottom:6 }}>Tafel {t.id} — {t.seats} personen</div>
            {t.name && <div style={{ fontSize:11, color:'rgba(255,255,255,0.7)', marginBottom:3 }}>👥 Nu: {t.name} {t.since && `(sinds ${t.since})`}</div>}
            {t.expectedLeave && <div style={{ fontSize:11, color:'#F59E0B', marginBottom:3 }}>⏱️ Vrij verwacht: {t.expectedLeave}</div>}
            {t.nextReservation && <div style={{ fontSize:11, color:'#60A5FA' }}>📅 Volgende: {t.nextReservation}</div>}
          </div>
        )
      })()}
    </div>
  )
}

/* Standard week agenda */
function WeekAgenda({ sector }) {
  const { color, agenda = [], agendaStats } = sector
  const data = (agendaStats?.weekData || [5,6,5,7,6]).map((v,i)=>({day:DAYS[i],v}))
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
      <div style={{ background:'rgba(7,15,30,0.8)', border:'1px solid rgba(255,255,255,0.06)', borderRadius:14, overflow:'hidden' }}>
        <div style={{ padding:'12px 18px', borderBottom:'1px solid rgba(255,255,255,0.06)', display:'flex', alignItems:'center', gap:10 }}>
          <div style={{ fontSize:13, fontWeight:700, color:'#fff' }}>Weekplanning</div>
          <div style={{ marginLeft:'auto', fontSize:11, color:'#475569' }}>Week 24 · 10–14 juni 2024</div>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:0 }}>
          {DAYS.map((day, di) => {
            const dayData = agenda.find(a => a.day === day)
            return (
              <div key={day} style={{ borderRight: di < 4 ? '1px solid rgba(255,255,255,0.04)' : 'none', minHeight:220 }}>
                <div style={{ padding:'8px 10px', borderBottom:'1px solid rgba(255,255,255,0.04)', fontSize:11, fontWeight:700, color:'rgba(255,255,255,0.5)', textAlign:'center', background:'rgba(255,255,255,0.02)' }}>{day}</div>
                <div style={{ padding:6, display:'flex', flexDirection:'column', gap:5 }}>
                  {(dayData?.items || []).map((item, ii) => (
                    <div key={ii} style={{ background:`${item.color}15`, border:`1px solid ${item.color}30`, borderLeft:`3px solid ${item.color}`, borderRadius:7, padding:'7px 9px', cursor:'pointer', transition:'all 0.15s' }}
                      onMouseEnter={e => e.currentTarget.style.background=`${item.color}25`}
                      onMouseLeave={e => e.currentTarget.style.background=`${item.color}15`}>
                      <div style={{ fontSize:10, fontFamily:'monospace', color:'rgba(255,255,255,0.35)', marginBottom:2 }}>{item.time}</div>
                      <div style={{ fontSize:11, fontWeight:600, color:'#fff', lineHeight:1.3 }}>{item.title}</div>
                      <div style={{ fontSize:10, color:'rgba(255,255,255,0.45)', marginTop:2, lineHeight:1.3 }}>{item.sub}</div>
                      {item.duration && <div style={{ fontSize:9, color:item.color, marginTop:3, fontFamily:'monospace' }}>{item.duration} min</div>}
                      {item.status && <div style={{ fontSize:9, color:'#10B981', marginTop:2 }}>✅ {item.status}</div>}
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:12 }}>
        <div style={{ background:'rgba(7,15,30,0.7)', border:'1px solid rgba(255,255,255,0.05)', borderRadius:12, padding:'12px 14px', display:'flex', alignItems:'center', gap:10 }}>
          <Bell size={16} color="#F59E0B" />
          <div>
            <div className="num" style={{ fontSize:20, fontWeight:700, color:'#fff' }}>{agendaStats?.reminders ?? 0}</div>
            <div style={{ fontSize:11, color:'#475569' }}>Herinneringen verstuurd</div>
          </div>
        </div>
        <div style={{ background:'rgba(7,15,30,0.7)', border:'1px solid rgba(255,255,255,0.05)', borderRadius:12, padding:'12px 14px', display:'flex', alignItems:'center', gap:10 }}>
          <RefreshCw size={16} color="#EF4444" />
          <div>
            <div className="num" style={{ fontSize:20, fontWeight:700, color:'#fff' }}>{agendaStats?.noShows ?? 0}</div>
            <div style={{ fontSize:11, color:'#475569' }}>No-shows herplant</div>
          </div>
        </div>
        <div style={{ background:'rgba(7,15,30,0.7)', border:'1px solid rgba(255,255,255,0.05)', borderRadius:12, padding:'12px 14px' }}>
          <div style={{ fontSize:11, color:'#475569', marginBottom:6 }}>Afspraken per dag</div>
          <ResponsiveContainer width="100%" height={40}>
            <BarChart data={data} margin={{top:0,right:0,bottom:0,left:0}}>
              <Bar dataKey="v" radius={[3,3,0,0]}>
                {data.map((_, i) => <Cell key={i} fill={`${color}${i===4?'ff':'88'}`} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div style={{ display:'flex', justifyContent:'flex-end', marginTop:3 }}>
            <span style={{ fontSize:10, color: agendaStats?.trend?.startsWith('+') ? '#10B981' : '#EF4444' }}>{agendaStats?.trend}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Agenda({ sector }) {
  const isHoreca = sector.id === 'horeca'
  const [view, setView] = useState(isHoreca ? 'restaurant' : 'week')

  if (isHoreca) {
    return (
      <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
        {/* Toggle */}
        <div style={{ display:'flex', gap:8, background:'rgba(7,15,30,0.6)', padding:4, borderRadius:10, border:'1px solid rgba(255,255,255,0.06)', width:'fit-content' }}>
          {[
            { id:'restaurant', label:'🍽️ Restaurantplanning', desc:'Tafelindeling & bezetting' },
            { id:'keuken', label:'👨‍🍳 Keukenplanning', desc:'Bonnen & bereiding' },
            { id:'week', label:'📅 Weekplanning', desc:'Services & events' },
          ].map(v => (
            <button key={v.id} onClick={() => setView(v.id)} style={{ padding:'8px 14px', borderRadius:7, background: view===v.id ? '#F97316' : 'transparent', border:'none', color: view===v.id ? '#fff' : 'rgba(255,255,255,0.4)', fontSize:12, fontWeight:600, cursor:'pointer', transition:'all 0.15s' }}>
              {v.label}
            </button>
          ))}
        </div>

        {view === 'restaurant' && <RestaurantMap sector={sector} />}
        {view === 'keuken' && <KitchenBoard sector={sector} />}
        {view === 'week' && <WeekAgenda sector={sector} />}

        {/* Allergie alert */}
        <div style={{ background:'rgba(239,68,68,0.08)', border:'1px solid rgba(239,68,68,0.25)', borderRadius:12, padding:'12px 16px', display:'flex', alignItems:'flex-start', gap:10 }}>
          <AlertCircle size={15} color="#EF4444" style={{ flexShrink:0, marginTop:1 }} />
          <div>
            <div style={{ fontSize:12, fontWeight:700, color:'#F87171', marginBottom:4 }}>Allergieën komende 48u</div>
            <div style={{ fontSize:11, color:'rgba(255,255,255,0.6)', lineHeight:1.6 }}>
              🌾 Vrijdag 20:00 — De Backer (1×) glutenvrij · 🥛 Zaterdag 19:30 — Hermans (2×) lactose · ⚠️ Zaterdag 20:00 — Peeters (1×) <strong style={{color:'#EF4444'}}>NOTEN ALLERGIE (ERNSTIG)</strong> — chef persoonlijk verwittigd
            </div>
          </div>
        </div>
      </div>
    )
  }

  return <WeekAgenda sector={sector} />
}
