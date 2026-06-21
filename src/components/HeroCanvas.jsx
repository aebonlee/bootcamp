import { useEffect, useRef } from 'react'

// 히어로 배경 — 깔끔한 라인 네트워크.
// 흰 배경 위로 옅은 점들이 천천히 떠다니며 가까운 점끼리 가는 선으로 연결된다(선의 움직임).
// 과한 효과 없이 정돈된 느낌. 접근성: prefers-reduced-motion 시 정적 1프레임. 성능: DPR 보정·점 수 상한·rAF·정리.
export default function HeroCanvas({ style }) {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext && canvas.getContext('2d')
    if (!ctx) return // 캔버스 미지원 환경(jsdom 등)에서는 조용히 건너뜀
    const reduce = typeof window.matchMedia === 'function'
      && window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let w = 0, h = 0, dpr = Math.min(window.devicePixelRatio || 1, 2)
    let particles = []
    let raf = 0
    const mouse = { x: -9999, y: -9999, active: false }

    const LINE = '26,69,216'   // 브랜드 블루
    const LINK_DIST = 120      // 점끼리 연결 거리
    const MOUSE_DIST = 160     // 마우스 영향 거리

    function resize() {
      const rect = canvas.getBoundingClientRect()
      w = rect.width; h = rect.height
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.max(24, Math.min(56, Math.round((w * h) / 20000)))
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.32,
        vy: (Math.random() - 0.5) * 0.32,
        r: Math.random() * 1.4 + 1,
      }))
    }

    function step() {
      ctx.clearRect(0, 0, w, h)

      for (const p of particles) {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0 || p.x > w) p.vx *= -1
        if (p.y < 0 || p.y > h) p.vy *= -1
        p.x = Math.max(0, Math.min(w, p.x))
        p.y = Math.max(0, Math.min(h, p.y))

        // 마우스 근처면 아주 살짝 끌림
        if (mouse.active) {
          const mdx = mouse.x - p.x, mdy = mouse.y - p.y
          const md = Math.hypot(mdx, mdy)
          if (md < MOUSE_DIST) {
            const f = (1 - md / MOUSE_DIST) * 0.3
            p.x += (mdx / (md || 1)) * f
            p.y += (mdy / (md || 1)) * f
          }
        }
      }

      // 연결선 (가늘고 옅게)
      ctx.lineWidth = 1
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i]
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j]
          const d = Math.hypot(a.x - b.x, a.y - b.y)
          if (d < LINK_DIST) {
            ctx.strokeStyle = `rgba(${LINE},${(1 - d / LINK_DIST) * 0.14})`
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke()
          }
        }
        if (mouse.active) {
          const dm = Math.hypot(a.x - mouse.x, a.y - mouse.y)
          if (dm < MOUSE_DIST) {
            ctx.strokeStyle = `rgba(${LINE},${(1 - dm / MOUSE_DIST) * 0.2})`
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke()
          }
        }
      }

      // 점
      ctx.fillStyle = `rgba(${LINE},0.4)`
      for (const p of particles) {
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill()
      }

      raf = requestAnimationFrame(step)
    }

    function onMove(e) {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
      mouse.active = mouse.x >= 0 && mouse.x <= w && mouse.y >= 0 && mouse.y <= h
    }
    function onLeave() { mouse.active = false }

    resize()
    if (reduce) {
      step(); cancelAnimationFrame(raf) // 1프레임만 그리고 정지
    } else {
      raf = requestAnimationFrame(step)
      window.addEventListener('pointermove', onMove, { passive: true })
      window.addEventListener('pointerleave', onLeave, { passive: true })
    }
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', ...style }}
    />
  )
}
