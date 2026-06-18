import { useParams, Link, Navigate } from 'react-router-dom'
import { C, grad, trackGrad, trackHero, trackColor } from '../theme'
import { TRACKS, byTrack } from '../data/curriculum'
import { Eyebrow, ChapterCard } from '../components/ui'
import Reveal from '../components/Reveal'
import { useProgress } from '../hooks/useProgress'

export default function Track() {
  const { track } = useParams()
  const tr = TRACKS[track]
  const { doneCount } = useProgress() || {}
  if (!tr) return <Navigate to="/curriculum" replace />
  const chs = byTrack(track)
  const totalSec = chs.reduce((n, c) => n + c.sections.length, 0)
  const isAi = track === 'ai'
  const orn = track === 'ai' ? 'orn-flower' : track === 'ops' ? 'orn-tunnel' : track === 'web' ? 'orn-bowtie' : 'orn-rings'
  const eyebrowC = track === 'ai' ? '#FFB37A' : track === 'ops' ? '#5CE0A8' : track === 'web' ? '#C4B5FD' : '#8FB4FF'

  return (
    <main style={{ background: C.ink, color: '#fff', minHeight: '100vh' }}>
      <section style={{ position: 'relative', overflow: 'hidden', background: trackHero(track) }}>
        <img src={`/assets/${orn}.svg`} alt="" style={{ position: 'absolute', right: '-4%', top: '10%', width: 'clamp(220px,30vw,420px)', opacity: 0.18 }} />
        <div style={{ position: 'relative', maxWidth: 1480, margin: '0 auto', padding: 'clamp(48px,7vw,108px) clamp(20px,5vw,56px) clamp(40px,6vw,80px)' }}>
          <Link to="/curriculum" style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>← 전체 커리큘럼</Link>
          <Eyebrow color={eyebrowC}>{tr.en.toUpperCase()} TRACK</Eyebrow>
          <h1 style={{ margin: '14px 0 0', fontSize: 'clamp(36px,7vw,108px)', lineHeight: 0.96, letterSpacing: '-0.04em', fontWeight: 800, animation: 'heroIn .7s both' }}>{tr.label}</h1>
          <p style={{ margin: '24px 0 0', maxWidth: 600, fontSize: 'clamp(15px,2vw,19px)', lineHeight: 1.7, color: 'rgba(255,255,255,0.85)' }}>{tr.desc}</p>
          <div style={{ display: 'flex', gap: 28, marginTop: 32, flexWrap: 'wrap' }}>
            {[['챕터', chs.length], ['강의', totalSec], ['난이도', `${chs[0].level} ~ ${chs[chs.length - 1].level}`]].map(([k, v]) => (
              <div key={k}>
                <div style={{ fontSize: 'clamp(24px,3vw,38px)', fontWeight: 800, letterSpacing: '-0.02em' }}>{v}</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginTop: 4 }}>{k}</div>
              </div>
            ))}
          </div>
          <Link to={`/lesson/${chs[0].id}`} className="cta-pill" style={{ display: 'inline-flex', marginTop: 34, padding: '15px 30px', borderRadius: 60, background: trackGrad(track), color: '#fff', fontSize: 15.5, fontWeight: 700, alignItems: 'center', gap: 8 }}>
            1강부터 시작하기 →
          </Link>
        </div>
      </section>

      <section style={{ maxWidth: 1480, margin: '0 auto', padding: 'clamp(40px,6vw,72px) clamp(20px,5vw,56px) clamp(64px,10vw,120px)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 'clamp(14px,1.6vw,22px)' }}>
          {chs.map((ch, i) => (
            <Reveal key={ch.id} delay={(i % 4) * 60}>
              <ChapterCard ch={ch} progress={doneCount ? { done: doneCount(ch.id) } : null} />
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  )
}
