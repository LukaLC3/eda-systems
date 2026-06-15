import { Clock, TrendingUp, TrendingDown, Send, CheckCircle, Calendar, BarChart2 } from 'lucide-react'
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, Cell } from 'recharts'

const DAYS = ['Ma','Di','Wo','Do','Vr','Za','Zo']

export default function Reports({ sector, activePackage }) {
  const { color, report, weekActivity, adminSummary, agendaStats } = sector
  if (!report) return <div style={{color:'#475569',padding:32}}>Geen rapportdata beschikbaar.</div>

  const chartData = weekActivity?.map((v,i) => ({ day:DAYS[i], v })) || []
  const isAI = activePackage === 'aiagent'
  const isPro = ['pro','allin','aiagent'].includes(activePackage)

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
      {/* Auto-send indicator */}
      <div style={{ background:'rgba(37,99,235,0.08)', border:'1px solid rgba(37,99,235,0.2)', borderRadius:12, padding:'12px 16px', display:'flex', alignItems:'center', gap:10 }}>
        <Clock size={15} color="#2563EB" />
        <div style={{ flex:1 }}>
          <span style={{ fontSize:12, fontWeight:600, color:'#fff' }}>Dit rapport wordt elke ochtend om 07:00 automatisch verstuurd</span>
          <span style={{ fontSize:11, color:'#475569', marginLeft:8 }}>aan {sector.accountManager || 'uw team'} · alle betrokkenen in CC</span>
        </div>
        {isAI && <span className="badge badge-purple" style={{fontSize:10}}>AI AGENT</span>}
        {isPro && !isAI && <span className="badge badge-blue" style={{fontSize:10}}>PRO</span>}
      </div>

      {/* Report preview — looks like a real report */}
      <div style={{ background:'linear-gradient(135deg, rgba(10,22,42,0.98) 0%, rgba(7,15,30,0.98) 100%)', border:`1px solid ${color}30`, borderRadius:16, overflow:'hidden', boxShadow:`0 20px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)` }}>
        {/* Report header */}
        <div style={{ background:`linear-gradient(135deg, ${color}22 0%, rgba(7,15,30,0) 100%)`, borderBottom:`1px solid ${color}20`, padding:'20px 28px', display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
          <div>
            <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:6 }}>
              <div style={{ width:32, height:32, borderRadius:8, background:color, display:'flex', alignItems:'center', justifyContent:'center', fontSize:12, fontWeight:800, color:'#fff', fontFamily:'monospace' }}>EDA</div>
              <div>
                <div style={{ fontSize:15, fontWeight:700, color:'#fff' }}>EDA Systems</div>
                <div style={{ fontSize:10, color:'rgba(255,255,255,0.4)', fontFamily:'monospace' }}>Automatisch gegenereerd rapport</div>
              </div>
            </div>
          </div>
          <div style={{ textAlign:'right' }}>
            <div style={{ fontSize:11, color:color, fontWeight:600, textTransform:'uppercase', letterSpacing:1, fontFamily:'monospace' }}>Weekrapport</div>
            <div style={{ fontSize:12, color:'rgba(255,255,255,0.5)', marginTop:3 }}>{report.period}</div>
            <div style={{ fontSize:10, color:'#334155', marginTop:2, fontFamily:'monospace' }}>Sector: {sector.name}</div>
          </div>
        </div>

        {/* Key numbers */}
        <div style={{ padding:'20px 28px', borderBottom:`1px solid rgba(255,255,255,0.05)` }}>
          <div style={{ fontSize:11, color:'#475569', fontWeight:600, textTransform:'uppercase', letterSpacing:0.8, marginBottom:14 }}>Kernresultaten</div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:14 }}>
            {report.highlights.map((h, i) => (
              <div key={i} style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.06)', borderRadius:10, padding:'12px 14px', position:'relative', overflow:'hidden' }}>
                <div style={{ position:'absolute', top:0, left:0, right:0, height:2, background:`linear-gradient(90deg, transparent, ${color}88, transparent)` }} />
                <div className="num" style={{ fontSize:22, fontWeight:700, color:'#fff', lineHeight:1 }}>{h.value}</div>
                <div style={{ fontSize:10, color:'#475569', marginTop:4, fontWeight:500 }}>{h.label}</div>
                <div style={{ display:'flex', alignItems:'center', gap:3, marginTop:5 }}>
                  {h.trend?.startsWith('+') || h.trend?.startsWith('-') ? (
                    <>
                      {h.trend.startsWith('+') ? <TrendingUp size={10} color="#10B981" /> : <TrendingDown size={10} color="#EF4444" />}
                      <span style={{ fontSize:10, color: h.trend.startsWith('+') ? '#10B981' : '#EF4444', fontWeight:600, fontFamily:'monospace' }}>{h.trend}</span>
                    </>
                  ) : <span style={{ fontSize:10, color:'#334155', fontFamily:'monospace' }}>{h.trend}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chart + action */}
        <div style={{ padding:'20px 28px', display:'grid', gridTemplateColumns:'1fr 1fr', gap:20 }}>
          <div>
            <div style={{ fontSize:11, color:'#475569', fontWeight:600, textTransform:'uppercase', letterSpacing:0.8, marginBottom:12 }}>Activiteit per dag</div>
            <ResponsiveContainer width="100%" height={120}>
              <BarChart data={chartData} margin={{top:0,right:0,bottom:0,left:-20}}>
                <XAxis dataKey="day" tick={{fill:'#475569',fontSize:10}} axisLine={false} tickLine={false} />
                <YAxis tick={{fill:'#475569',fontSize:10}} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{background:'rgba(10,22,42,0.97)',border:`1px solid ${color}44`,borderRadius:8,fontSize:11}} />
                <Bar dataKey="v" radius={[4,4,0,0]}>
                  {chartData.map((_,i) => <Cell key={i} fill={`${color}${i===chartData.length-2?'ff':'66'}`} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div>
            <div style={{ fontSize:11, color:'#475569', fontWeight:600, textTransform:'uppercase', letterSpacing:0.8, marginBottom:12 }}>Actie vereist</div>
            <div style={{ background:'rgba(245,158,11,0.08)', border:'1px solid rgba(245,158,11,0.25)', borderRadius:10, padding:'12px 14px' }}>
              <div style={{ display:'flex', gap:8 }}>
                <span style={{ fontSize:14, flexShrink:0 }}>⚠️</span>
                <div style={{ fontSize:12, color:'rgba(255,255,255,0.75)', lineHeight:1.55 }}>{report.topAction}</div>
              </div>
            </div>
            {isAI && (
              <div style={{ marginTop:10, background:'rgba(139,92,246,0.08)', border:'1px solid rgba(139,92,246,0.2)', borderRadius:10, padding:'10px 14px' }}>
                <div style={{ fontSize:10, color:'#A78BFA', fontWeight:600, marginBottom:4 }}>🤖 AI ANALYSE</div>
                <div style={{ fontSize:11, color:'rgba(255,255,255,0.6)', lineHeight:1.5 }}>Op basis van uw data van deze week: groei van {report.highlights[0]?.trend || '+8%'} in lijn met verwachtingen. Aanbeveling: focus op {report.highlights[2]?.label?.toLowerCase() || 'conversie'} voor verdere optimalisatie.</div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding:'14px 28px', borderTop:`1px solid rgba(255,255,255,0.05)`, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <div style={{ fontSize:11, color:'#334155', fontFamily:'monospace' }}>EDA Systems BV · Gegenereerd door AI · {new Date().toLocaleDateString('nl-BE')}</div>
          <div style={{ display:'flex', gap:8 }}>
            <button style={{ display:'flex', alignItems:'center', gap:5, padding:'6px 12px', borderRadius:7, background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', color:'rgba(255,255,255,0.5)', fontSize:11, cursor:'pointer' }}>
              <BarChart2 size={12} /> Detail
            </button>
            <button style={{ display:'flex', alignItems:'center', gap:5, padding:'6px 12px', borderRadius:7, background:`${color}20`, border:`1px solid ${color}44`, color, fontSize:11, cursor:'pointer', fontWeight:600 }}>
              <Send size={12} /> Versturen
            </button>
          </div>
        </div>
      </div>

      {/* History */}
      <div style={{ background:'rgba(7,15,30,0.7)', border:'1px solid rgba(255,255,255,0.05)', borderRadius:12, padding:'14px 16px' }}>
        <div style={{ fontSize:12, fontWeight:600, color:'#fff', marginBottom:12 }}>Vorige rapporten</div>
        <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
          {['Week 23 · 3-7 juni 2024','Week 22 · 27-31 mei 2024','Week 21 · 20-24 mei 2024','Maandrapport mei 2024'].map((r,i) => (
            <div key={i} style={{ display:'flex', alignItems:'center', gap:10, padding:'8px 10px', borderRadius:8, background:'rgba(255,255,255,0.02)', border:'1px solid rgba(255,255,255,0.04)', cursor:'pointer' }}
              onMouseEnter={e => e.currentTarget.style.background='rgba(255,255,255,0.05)'}
              onMouseLeave={e => e.currentTarget.style.background='rgba(255,255,255,0.02)'}>
              <CheckCircle size={13} color="#10B981" />
              <span style={{ fontSize:12, color:'rgba(255,255,255,0.55)', flex:1 }}>{r}</span>
              <span style={{ fontSize:10, color:'#334155', fontFamily:'monospace' }}>PDF</span>
              <button style={{ fontSize:10, color:color, background:`${color}15`, border:`1px solid ${color}30`, padding:'3px 8px', borderRadius:5, cursor:'pointer' }}>Bekijken</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
