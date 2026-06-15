import { useState, useEffect, useRef } from 'react'
import { TrendingUp, TrendingDown, Clock, Zap, Shield, Server, Activity } from 'lucide-react'
import { AreaChart, Area, BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'

const DAYS = ['Ma','Di','Wo','Do','Vr','Za','Zo']

const ICON_MAP = { Calendar:'📅', MessageSquare:'💬', FileText:'📄', Receipt:'🧾', UserPlus:'👤', Bell:'🔔', RefreshCw:'🔄', Layout:'📋', FileCheck:'✅', CheckCircle:'✅', Calculator:'🧮', AlertCircle:'⚠️', Send:'📤', Star:'⭐', Scan:'🔍', Building:'🏢', Clipboard:'📋', PenTool:'✏️', Users:'👥', Gift:'🎁', TrendingUp:'📈' }

function SparkLine({ data, color }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const w = 80, h = 32, pts = data.length
  const xs = data.map((_, i) => (i / (pts - 1)) * w)
  const ys = data.map(v => h - ((v - min) / range) * (h - 4) - 2)
  const path = xs.map((x, i) => `${i === 0 ? 'M' : 'L'}${x},${ys[i]}`).join(' ')
  const fill = `${path} L${w},${h} L0,${h} Z`
  return (
    <svg width={w} height={h} style={{ overflow:'visible' }}>
      <defs>
        <linearGradient id={`sg-${color.replace('#','')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={fill} fill={`url(#sg-${color.replace('#','')})`} />
      <path d={path} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={xs[xs.length-1]} cy={ys[ys.length-1]} r="3" fill={color} />
    </svg>
  )
}

function MetricCard({ metric, color, idx }) {
  const isUp = metric.deltaPos
  return (
    <div className="metric-card fade-in" style={{ animationDelay:`${idx*0.07}s`, borderTop:`2px solid ${color}22` }}>
      <div style={{ position:'absolute', top:0, left:0, right:0, height:2, background:`linear-gradient(90deg, transparent, ${color}, transparent)`, opacity:0.5 }} />
      <div style={{ fontSize:11, color:'#475569', fontWeight:600, textTransform:'uppercase', letterSpacing:0.8, marginBottom:10 }}>{metric.label}</div>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end' }}>
        <div>
          <div className="num" style={{ fontSize:28, fontWeight:700, color:'#fff', lineHeight:1, letterSpacing:-1, textShadow:`0 0 20px ${color}55` }}>
            {metric.value}
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:4, marginTop:6 }}>
            {isUp ? <TrendingUp size={11} color="#10B981" /> : <TrendingDown size={11} color="#EF4444" />}
            <span style={{ fontSize:11, color: isUp ? '#10B981' : '#EF4444', fontWeight:600 }} className="num">{metric.delta}</span>
            <span style={{ fontSize:10, color:'#334155' }}>vs gisteren</span>
          </div>
        </div>
        {metric.sparkline && <SparkLine data={metric.sparkline} color={color} />}
      </div>
    </div>
  )
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background:'rgba(10,22,42,0.97)', border:'1px solid rgba(37,99,235,0.3)', borderRadius:8, padding:'8px 12px', fontSize:12 }}>
      <div style={{ color:'#475569', marginBottom:3 }}>{label}</div>
      <div className="num" style={{ color:'#fff', fontWeight:600 }}>{payload[0].value} acties</div>
    </div>
  )
}

export default function Overview({ sector, liveDemoMode, activePackage }) {
  const { color, metrics, weekActivity, activityFeed, liveItems = [] } = sector
  const [feed, setFeed] = useState(activityFeed)
  const [seconds, setSeconds] = useState(0)

  useEffect(() => { setFeed(activityFeed) }, [sector.id])

  useEffect(() => {
    const t = setInterval(() => setSeconds(s => s + 1), 1000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    if (!liveDemoMode) return
    const idx = { current: 0 }
    const t = setInterval(() => {
      const item = liveItems[idx.current % liveItems.length]
      const now = new Date()
      const ts = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`
      setFeed(f => [{ time: ts, text: item, icon: 'Zap', color: '#F59E0B', isNew: true }, ...f].slice(0, 12))
      idx.current++
    }, 5000)
    return () => clearInterval(t)
  }, [liveDemoMode, sector.id])

  const chartData = weekActivity.map((v, i) => ({ day: DAYS[i], value: v }))

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
      {/* Metrics */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:14 }}>
        {metrics.map((m, i) => <MetricCard key={i} metric={m} color={color} idx={i} />)}
      </div>

      {/* Chart + Activity */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 360px', gap:14 }}>
        {/* Area chart */}
        <div style={{ background:'rgba(7,15,30,0.8)', border:'1px solid rgba(255,255,255,0.06)', borderRadius:14, padding:20 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
            <div>
              <div style={{ fontSize:14, fontWeight:600, color:'#fff' }}>Activiteit deze week</div>
              <div style={{ fontSize:11, color:'#475569', marginTop:2 }}>Automatische acties per dag</div>
            </div>
            <div style={{ display:'flex', gap:6 }}>
              {['W','M','J'].map(p => (
                <button key={p} style={{ padding:'4px 10px', borderRadius:6, background: p==='W' ? `${color}22` : 'transparent', border:`1px solid ${p==='W' ? color+'44' : 'rgba(255,255,255,0.08)'}`, color: p==='W' ? color : '#475569', fontSize:11, cursor:'pointer', fontWeight:600 }}>{p}</button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={chartData} margin={{ top:5, right:5, bottom:0, left:-20 }}>
              <defs>
                <linearGradient id="aGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={color} stopOpacity={0.4} />
                  <stop offset="100%" stopColor={color} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="day" tick={{ fill:'#475569', fontSize:11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill:'#475569', fontSize:11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="value" stroke={color} strokeWidth={2.5} fill="url(#aGrad)" dot={{ fill:color, r:3, strokeWidth:0 }} activeDot={{ r:5, fill:color }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Activity feed */}
        <div style={{ background:'rgba(7,15,30,0.8)', border:'1px solid rgba(255,255,255,0.06)', borderRadius:14, padding:20, display:'flex', flexDirection:'column', maxHeight:340, overflow:'hidden' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:14, flexShrink:0 }}>
            <div style={{ fontSize:14, fontWeight:600, color:'#fff' }}>Live activiteit</div>
            {liveDemoMode && (
              <div style={{ display:'flex', alignItems:'center', gap:5, fontSize:10, color:'#10B981', fontFamily:'monospace' }}>
                <span className="pulse-dot" style={{ width:6, height:6, borderRadius:'50%', background:'#10B981', display:'inline-block' }} />
                LIVE
              </div>
            )}
          </div>
          <div style={{ overflowY:'auto', flex:1, display:'flex', flexDirection:'column', gap:1 }}>
            {feed.map((item, i) => (
              <div key={i} className={item.isNew ? 'fade-in' : ''} style={{ display:'flex', alignItems:'flex-start', gap:8, padding:'8px 0', borderBottom:'1px solid rgba(255,255,255,0.04)' }}>
                <div style={{ width:28, height:28, borderRadius:7, background:`${item.color || color}18`, border:`1px solid ${item.color || color}33`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:12, flexShrink:0 }}>
                  {ICON_MAP[item.icon] || '⚡'}
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:12, color:'rgba(255,255,255,0.8)', lineHeight:1.4 }}>{item.text}</div>
                  <div className="num" style={{ fontSize:10, color:'#334155', marginTop:2 }}>{item.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trust numbers */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12 }}>
        {[
          { icon: <Clock size={16} color="#2563EB" />, value: '3.2u', label: 'Bespaard per dag', sub: 'Gemiddeld per klant' },
          { icon: <Zap size={16} color="#F59E0B" />, value: '<24u', label: 'Implementatietijd', sub: 'Klaar in minder dan 1 dag' },
          { icon: <Server size={16} color="#10B981" />, value: '99.9%', label: 'Uptime garantie', sub: 'EU-gehoste infrastructuur' },
          { icon: <Shield size={16} color="#8B5CF6" />, value: 'GDPR', label: 'Compliant', sub: 'Belgische data, veilig' },
        ].map((t, i) => (
          <div key={i} style={{ background:'rgba(7,15,30,0.6)', border:'1px solid rgba(255,255,255,0.05)', borderRadius:12, padding:'14px 16px', display:'flex', alignItems:'center', gap:12 }}>
            <div style={{ width:34, height:34, borderRadius:9, background:'rgba(255,255,255,0.04)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
              {t.icon}
            </div>
            <div>
              <div className="num" style={{ fontSize:18, fontWeight:700, color:'#fff', lineHeight:1 }}>{t.value}</div>
              <div style={{ fontSize:11, fontWeight:600, color:'rgba(255,255,255,0.5)', marginTop:2 }}>{t.label}</div>
              <div style={{ fontSize:10, color:'#334155', marginTop:1 }}>{t.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
