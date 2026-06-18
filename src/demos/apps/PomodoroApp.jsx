import { useEffect, useRef, useState } from 'react'

const FOCUS = 25 * 60 // 집중 25분
const BREAK = 5 * 60 // 휴식 5분

// 포모도로 집중 타이머 — useEffect로 1초마다 카운트다운, 모드 자동 전환
export default function PomodoroApp() {
  const [mode, setMode] = useState('focus') // focus | break
  const [left, setLeft] = useState(FOCUS)
  const [running, setRunning] = useState(false)
  const timer = useRef(null)

  useEffect(() => {
    if (!running) return
    // setInterval로 1초마다 남은 시간 감소
    timer.current = setInterval(() => setLeft((s) => s - 1), 1000)
    return () => clearInterval(timer.current) // 정리(cleanup)로 중복 타이머 방지
  }, [running])

  useEffect(() => {
    if (left > 0) return
    // 0이 되면 집중↔휴식 모드 전환
    const next = mode === 'focus' ? 'break' : 'focus'
    setMode(next)
    setLeft(next === 'focus' ? FOCUS : BREAK)
  }, [left, mode])

  const reset = () => { setRunning(false); setMode('focus'); setLeft(FOCUS) }
  const mm = String(Math.floor(left / 60)).padStart(2, '0')
  const ss = String(left % 60).padStart(2, '0')
  const total = mode === 'focus' ? FOCUS : BREAK
  const pct = ((total - left) / total) * 100

  return (
    <div style={{ textAlign: 'center', maxWidth: 320, margin: '0 auto' }}>
      <div style={{ display: 'inline-flex', gap: 6, marginBottom: 18 }}>
        {[['focus', '집중'], ['break', '휴식']].map(([k, label]) => (
          <span key={k} style={{ padding: '5px 14px', borderRadius: 60, fontSize: 13, fontWeight: 700, background: mode === k ? (k === 'focus' ? '#1A45D8' : '#16A34A') : '#f1f3f6', color: mode === k ? '#fff' : '#9CA2AD' }}>{label}</span>
        ))}
      </div>
      <div style={{ position: 'relative', width: 180, height: 180, margin: '0 auto' }}>
        <svg width="180" height="180" style={{ transform: 'rotate(-90deg)' }}>
          <circle cx="90" cy="90" r="80" fill="none" stroke="#eceef2" strokeWidth="12" />
          <circle cx="90" cy="90" r="80" fill="none" stroke={mode === 'focus' ? '#1A45D8' : '#16A34A'} strokeWidth="12" strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 80} strokeDashoffset={2 * Math.PI * 80 * (1 - pct / 100)} style={{ transition: 'stroke-dashoffset 1s linear' }} />
        </svg>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 42, fontWeight: 800, letterSpacing: '-0.02em' }}>{mm}:{ss}</div>
      </div>
      <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 22 }}>
        <button onClick={() => setRunning((r) => !r)} style={{ padding: '11px 28px', borderRadius: 60, background: '#0A0B0D', color: '#fff', fontWeight: 700, fontSize: 15 }}>{running ? '일시정지' : '시작'}</button>
        <button onClick={reset} style={{ padding: '11px 22px', borderRadius: 60, border: '1px solid #d8dce3', color: '#4a4f57', fontWeight: 600, fontSize: 15 }}>리셋</button>
      </div>
    </div>
  )
}
