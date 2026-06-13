import { useEffect, useRef } from 'react'

export default function CircuitBoard() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let animationId = null
    let lastTime = 0
    const FPS = 30
    const INTERVAL = 1000 / FPS

    const nodes = []
    const connections = []
    const pulses = []

    function resize() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initGraph()
    }

    function initGraph() {
      nodes.length = 0
      connections.length = 0
      pulses.length = 0

      const w = canvas.width
      const h = canvas.height
      const count = 60

      // Generate nodes on a rough grid with jitter
      const cols = Math.ceil(Math.sqrt(count * (w / h)))
      const rows = Math.ceil(count / cols)
      const cellW = w / cols
      const cellH = h / rows

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (nodes.length >= count) break
          const x = c * cellW + cellW * 0.2 + Math.random() * cellW * 0.6
          const y = r * cellH + cellH * 0.2 + Math.random() * cellH * 0.6
          const isGold = Math.random() < 0.07
          const isFilled = Math.random() > 0.4
          nodes.push({ x, y, isGold, isFilled, pulsePhase: Math.random() * Math.PI * 2 })
        }
      }

      // Connect nearby nodes with axis-aligned lines (L-shaped or straight)
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]
        let connected = 0
        // Find 2-4 nearest nodes
        const dists = []
        for (let j = 0; j < nodes.length; j++) {
          if (i === j) continue
          const dx = nodes[j].x - a.x
          const dy = nodes[j].y - a.y
          dists.push({ j, dist: Math.sqrt(dx * dx + dy * dy) })
        }
        dists.sort((p, q) => p.dist - q.dist)
        const maxConn = 2 + Math.floor(Math.random() * 3)
        for (const { j, dist } of dists) {
          if (connected >= maxConn) break
          if (dist > Math.min(canvas.width, canvas.height) * 0.35) break
          // Avoid duplicate connections
          const exists = connections.find(
            c => (c.a === i && c.b === j) || (c.a === j && c.b === i)
          )
          if (!exists) {
            connections.push({ a: i, b: j })
            connected++
          }
        }
      }

      // Seed 8-10 pulses
      const pulseCount = 8 + Math.floor(Math.random() * 3)
      for (let p = 0; p < pulseCount; p++) {
        spawnPulse()
      }
    }

    function spawnPulse() {
      if (connections.length === 0) return
      const connIdx = Math.floor(Math.random() * connections.length)
      const conn = connections[connIdx]
      const forward = Math.random() > 0.5
      pulses.push({
        connIdx,
        t: 0,
        speed: 0.003 + Math.random() * 0.006,
        forward,
        isGold: nodes[conn.a].isGold || nodes[conn.b].isGold,
      })
    }

    function draw(timestamp) {
      if (document.hidden) {
        animationId = requestAnimationFrame(draw)
        return
      }
      const delta = timestamp - lastTime
      if (delta < INTERVAL) {
        animationId = requestAnimationFrame(draw)
        return
      }
      lastTime = timestamp - (delta % INTERVAL)

      const w = canvas.width
      const h = canvas.height
      ctx.clearRect(0, 0, w, h)

      // Draw connections
      for (const conn of connections) {
        const a = nodes[conn.a]
        const b = nodes[conn.b]
        // L-shaped routing: go horizontal then vertical
        const midX = b.x
        const midY = a.y
        ctx.beginPath()
        ctx.moveTo(a.x, a.y)
        ctx.lineTo(midX, midY)
        ctx.lineTo(b.x, b.y)
        ctx.strokeStyle = 'rgba(37,99,235,0.2)'
        ctx.lineWidth = 1
        ctx.stroke()
      }

      // Draw pulses
      for (let p = pulses.length - 1; p >= 0; p--) {
        const pulse = pulses[p]
        pulse.t += pulse.speed
        if (pulse.t > 1) {
          pulses.splice(p, 1)
          spawnPulse()
          continue
        }
        const conn = connections[pulse.connIdx]
        const a = nodes[conn.a]
        const b = nodes[conn.b]
        const startNode = pulse.forward ? a : b
        const endNode = pulse.forward ? b : a

        // L-shaped path points
        const pathPoints = [
          { x: startNode.x, y: startNode.y },
          { x: endNode.x, y: startNode.y },
          { x: endNode.x, y: endNode.y },
        ]

        // Interpolate position along path
        const seg1Len = Math.abs(endNode.x - startNode.x)
        const seg2Len = Math.abs(endNode.y - startNode.y)
        const totalLen = seg1Len + seg2Len
        let px, py
        if (totalLen === 0) {
          px = startNode.x
          py = startNode.y
        } else {
          const dist = pulse.t * totalLen
          if (dist <= seg1Len) {
            const ratio = seg1Len > 0 ? dist / seg1Len : 0
            px = startNode.x + (pathPoints[1].x - pathPoints[0].x) * ratio
            py = startNode.y
          } else {
            const ratio = seg2Len > 0 ? (dist - seg1Len) / seg2Len : 0
            px = endNode.x
            py = pathPoints[1].y + (pathPoints[2].y - pathPoints[1].y) * ratio
          }
        }

        const color = pulse.isGold ? '#F59E0B' : '#2563EB'
        const grd = ctx.createRadialGradient(px, py, 0, px, py, 6)
        grd.addColorStop(0, color)
        grd.addColorStop(1, 'transparent')
        ctx.beginPath()
        ctx.arc(px, py, 6, 0, Math.PI * 2)
        ctx.fillStyle = grd
        ctx.fill()

        // Trail
        ctx.beginPath()
        ctx.arc(px, py, 2, 0, Math.PI * 2)
        ctx.fillStyle = color
        ctx.fill()
      }

      // Draw nodes
      const now = Date.now() / 1000
      for (const node of nodes) {
        if (node.isGold) {
          const alpha = 0.5 + 0.5 * Math.sin(now * 2 + node.pulsePhase)
          ctx.beginPath()
          ctx.arc(node.x, node.y, 5, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(245,158,11,${alpha})`
          ctx.fill()
          ctx.beginPath()
          ctx.arc(node.x, node.y, 8, 0, Math.PI * 2)
          ctx.strokeStyle = `rgba(245,158,11,${alpha * 0.4})`
          ctx.lineWidth = 1
          ctx.stroke()
        } else if (node.isFilled) {
          ctx.beginPath()
          ctx.arc(node.x, node.y, 3, 0, Math.PI * 2)
          ctx.fillStyle = '#2563EB'
          ctx.fill()
        } else {
          ctx.beginPath()
          ctx.arc(node.x, node.y, 3, 0, Math.PI * 2)
          ctx.strokeStyle = 'rgba(37,99,235,0.6)'
          ctx.lineWidth = 1.5
          ctx.stroke()
        }
      }

      animationId = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    animationId = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('resize', resize)
      if (animationId) cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        opacity: 0.18,
        pointerEvents: 'none',
      }}
    />
  )
}
