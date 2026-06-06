import { useEffect, useRef } from "react";

type Node = {
  x: number;
  y: number;
  type: 1 | 2 | 3;
  phase: number;
  appearAt: number;
};

type Segment = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  length: number;
  drawAt: number;
  drawDur: number;
};

type Pulse = {
  segIndex: number;
  t: number; // 0..1 along segment
  speed: number; // units per second (fraction of length /s)
  color: string;
  size: number;
};

export function CircuitBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas!.getContext("2d", { alpha: true });
    if (!ctx) return;



    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    let segments: Segment[] = [];
    let nodes: Node[] = [];
    let pulses: Pulse[] = [];
    let startTime = performance.now();
    let rafId = 0;
    let lastFrame = 0;
    const targetFps = 30;
    const frameInterval = 1000 / targetFps;
    let visible = true;

    const rand = (a: number, b: number) => a + Math.random() * (b - a);
    const randi = (a: number, b: number) => Math.floor(rand(a, b));

    function build() {
      width = canvas!.clientWidth;
      height = canvas!.clientHeight;
      canvas!.width = Math.floor(width * dpr);
      canvas!.height = Math.floor(height * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      segments = [];
      nodes = [];
      pulses = [];

      const grid = 28; // px snap
      const snap = (v: number) => Math.round(v / grid) * grid;

      // Density falloff from edges to center (0 at center, 1 at edges)
      const edgeWeight = (x: number, y: number) => {
        const dx = Math.min(x, width - x) / (width / 2);
        const dy = Math.min(y, height - y) / (height / 2);
        const d = Math.min(dx, dy); // 0 at edge, 1 at center
        return Math.max(0, 1 - d); // 1 at edge, 0 at center
      };

      // Generate traces originating from edges/corners, growing inward via 90deg turns
      const origins: Array<{ x: number; y: number; dir: "in-x" | "in-y" }> = [];

      const corner = (cx: number, cy: number, count: number) => {
        for (let i = 0; i < count; i++) {
          const offX = snap(rand(0, 180));
          const offY = snap(rand(0, 180));
          origins.push({
            x: cx === 0 ? offX : width - offX,
            y: cy === 0 ? offY : height - offY,
            dir: Math.random() < 0.5 ? "in-x" : "in-y",
          });
        }
      };

      corner(0, 0, 14);
      corner(1, 0, 14);
      corner(0, 1, 10);
      corner(1, 1, 10);

      // Edge origins
      const edgeCount = 18;
      for (let i = 0; i < edgeCount; i++) {
        const side = randi(0, 4);
        if (side === 0) origins.push({ x: snap(rand(0, width)), y: 0, dir: "in-y" });
        else if (side === 1) origins.push({ x: width, y: snap(rand(0, height)), dir: "in-x" });
        else if (side === 2) origins.push({ x: snap(rand(0, width)), y: height, dir: "in-y" });
        else origins.push({ x: 0, y: snap(rand(0, height)), dir: "in-x" });
      }

      const totalDrawWindow = 1100; // ms for line drawing
      const addNode = (x: number, y: number, t: number) => {
        const r = Math.random();
        const type: 1 | 2 | 3 = r < 0.55 ? 1 : r < 0.95 ? 2 : 3;
        nodes.push({
          x,
          y,
          type,
          phase: Math.random() * Math.PI * 2,
          appearAt: t,
        });
      };

      origins.forEach((o) => {
        let x = o.x;
        let y = o.y;
        let dir: "in-x" | "in-y" = o.dir;
        const segCount = randi(2, 6);
        const originDist = Math.min(x, width - x, y, height - y);
        const startT = (originDist / (Math.min(width, height) / 2)) * 200; // edges first
        let t = startT;

        addNode(x, y, t);

        for (let i = 0; i < segCount; i++) {
          // Step length shrinks deeper inward
          const baseLen = rand(40, 140);
          // Direction sign: prefer inward
          let nx = x;
          let ny = y;
          if (dir === "in-x") {
            const sign = x < width / 2 ? 1 : -1;
            nx = snap(x + sign * baseLen);
            nx = Math.max(8, Math.min(width - 8, nx));
          } else {
            const sign = y < height / 2 ? 1 : -1;
            ny = snap(y + sign * baseLen);
            ny = Math.max(8, Math.min(height - 8, ny));
          }

          // Stop if we've drifted into the center "quiet zone"
          const w = edgeWeight((x + nx) / 2, (y + ny) / 2);
          if (w < 0.15 && Math.random() < 0.85) break;

          const length = Math.hypot(nx - x, ny - y);
          if (length < 4) break;
          const drawDur = Math.min(420, length * 3.2);
          segments.push({
            x1: x,
            y1: y,
            x2: nx,
            y2: ny,
            length,
            drawAt: t,
            drawDur,
          });
          t += drawDur * 0.55;
          if (t > totalDrawWindow) t = totalDrawWindow;

          x = nx;
          y = ny;
          addNode(x, y, t);
          dir = dir === "in-x" ? "in-y" : "in-x";
        }
      });

      // Force a few gold nodes (rare)
      const goldTargets = 3 + (Math.random() < 0.5 ? 1 : 0);
      let goldAssigned = 0;
      // remove any randomly assigned type 3 first
      nodes.forEach((n) => {
        if (n.type === 3) n.type = 1;
      });
      // pick nodes near edges
      const edgeNodes = nodes
        .map((n, i) => ({ i, w: edgeWeight(n.x, n.y) }))
        .filter((o) => o.w > 0.5)
        .sort(() => Math.random() - 0.5);
      for (const o of edgeNodes) {
        if (goldAssigned >= goldTargets) break;
        nodes[o.i].type = 3;
        goldAssigned++;
      }

      // Pulses — assign to a subset of segments
      pulses = [];
      const pulseCount = Math.min(64, Math.floor(segments.length * 0.42));
      for (let i = 0; i < pulseCount; i++) {
        const segIndex = randi(0, segments.length);
        const seg = segments[segIndex];
        if (!seg) continue;
        const pxPerSec = rand(45, 75);
        pulses.push({
          segIndex,
          t: Math.random(),
          speed: pxPerSec / seg.length,
          color: Math.random() < 0.12 ? "rgba(255,255,255,0.55)" : "rgba(59,130,246,0.95)",
          size: Math.random() < 0.12 ? 1.6 : 1.8,
        });
      }
    }

    function draw(now: number) {
      const elapsed = now - startTime;
      ctx!.clearRect(0, 0, width, height);

      // Lines
      ctx!.lineCap = "square";
      ctx!.lineWidth = 0.6;
      ctx!.strokeStyle = "#1E3A5F";
      for (const s of segments) {
        const p = Math.max(0, Math.min(1, (elapsed - s.drawAt) / s.drawDur));
        if (p <= 0) continue;
        const ex = s.x1 + (s.x2 - s.x1) * p;
        const ey = s.y1 + (s.y2 - s.y1) * p;
        ctx!.beginPath();
        ctx!.moveTo(s.x1, s.y1);
        ctx!.lineTo(ex, ey);
        ctx!.stroke();
      }

      // Nodes
      for (const n of nodes) {
        if (elapsed < n.appearAt) continue;
        const age = (elapsed - n.appearAt) / 400;
        const appear = Math.min(1, age);
        if (n.type === 1) {
          const pulse = 0.75 + 0.25 * Math.sin(now / 1400 + n.phase);
          ctx!.shadowBlur = 14 * appear;
          ctx!.shadowColor = "rgba(59,130,246,0.9)";
          ctx!.fillStyle = `rgba(96,165,250,${pulse * appear})`;
          ctx!.beginPath();
          ctx!.arc(n.x, n.y, 2.8, 0, Math.PI * 2);
          ctx!.fill();
          ctx!.shadowBlur = 0;
        } else if (n.type === 2) {
          ctx!.lineWidth = 0.9;
          ctx!.strokeStyle = `rgba(59,130,246,${0.55 * appear})`;
          ctx!.beginPath();
          ctx!.arc(n.x, n.y, 4, 0, Math.PI * 2);
          ctx!.stroke();
        } else {
          const pulse = 0.6 + 0.4 * Math.sin(now / 1800 + n.phase);
          ctx!.shadowBlur = 16 * appear;
          ctx!.shadowColor = "rgba(245,158,11,0.85)";
          ctx!.fillStyle = `rgba(252,211,77,${pulse * appear})`;
          ctx!.beginPath();
          ctx!.arc(n.x, n.y, 2.6, 0, Math.PI * 2);
          ctx!.fill();
          ctx!.shadowBlur = 0;
        }
      }

      // Pulses (start after 500ms)
      if (elapsed > 500) {
        const dt = Math.min(60, now - (lastFrame || now)) / 1000;
        for (const p of pulses) {
          const seg = segments[p.segIndex];
          if (!seg) continue;
          // wait until segment drawn
          if (elapsed < seg.drawAt + seg.drawDur) continue;
          p.t += p.speed * dt;
          if (p.t > 1) {
            // jump to another segment occasionally
            p.t = 0;
            p.segIndex = (p.segIndex + 1) % segments.length;
            const ns = segments[p.segIndex];
            if (ns) p.speed = rand(40, 60) / ns.length;
          }
          const x = seg.x1 + (seg.x2 - seg.x1) * p.t;
          const y = seg.y1 + (seg.y2 - seg.y1) * p.t;
          ctx!.shadowBlur = 8;
          ctx!.shadowColor = p.color;
          ctx!.fillStyle = p.color;
          ctx!.beginPath();
          ctx!.arc(x, y, p.size, 0, Math.PI * 2);
          ctx!.fill();
          ctx!.shadowBlur = 0;
        }
      }
    }

    function loop(now: number) {
      rafId = requestAnimationFrame(loop);
      if (!visible) return;
      if (now - lastFrame < frameInterval) return;
      draw(now);
      lastFrame = now;
    }

    function onResize() {
      build();
      startTime = performance.now();
    }

    function onVis() {
      visible = document.visibilityState === "visible";
      if (visible) lastFrame = 0;
    }

    build();
    rafId = requestAnimationFrame(loop);
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVis);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
        opacity: 0.25,
      }}
    />
  );
}
