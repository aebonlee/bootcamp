import { useState } from 'react'
import { C } from '../theme'
import { CHAPTERS, TRACKS, byTrack } from '../data/curriculum'
import { Eyebrow, ChapterCard } from '../components/ui'
import Reveal from '../components/Reveal'
import { useProgress } from '../hooks/useProgress'

const FILTERS = [
  { id: 'all', label: '전체' },
  { id: 'react', label: 'React 프론트엔드' },
  { id: 'ai', label: 'AI 웹 서비스' },
  { id: 'ops', label: '실전 배포·협업' },
]

export default function Curriculum() {
  const [f, setF] = useState('all')
  const { doneCount } = useProgress() || {}
  const list = f === 'all' ? CHAPTERS : byTrack(f)
  const totalSec = CHAPTERS.reduce((n, c) => n + c.sections.length, 0)

  return (
    <main style={{ background: C.ink, color: '#fff', minHeight: '100vh' }}>
      <section style={{ maxWidth: 1480, margin: '0 auto', padding: 'clamp(48px,7vw,104px) clamp(20px,5vw,56px) clamp(30px,4vw,52px)' }}>
        <Eyebrow>CURRICULUM</Eyebrow>
        <h1 style={{ margin: '14px 0 0', fontSize: 'clamp(34px,7vw,104px)', lineHeight: 0.98, letterSpacing: '-0.04em', textTransform: 'uppercase', fontWeight: 300, animation: 'heroIn .7s both' }}>
          전체 <span style={{ fontWeight: 800 }}>커리큘럼</span>
        </h1>
        <p style={{ margin: '24px 0 0', maxWidth: 640, fontSize: 'clamp(15px,2vw,18px)', lineHeight: 1.7, color: '#9CA2AD' }}>
          {CHAPTERS.length}개 챕터 · {totalSec}개 강의. React 프론트엔드와 AI 웹 서비스, 두 트랙을 자유롭게 학습하세요.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 'clamp(28px,4vw,44px)' }}>
          {FILTERS.map((opt) => {
            const active = f === opt.id
            return (
              <button key={opt.id} onClick={() => setF(opt.id)} style={{
                padding: '11px 22px', borderRadius: 60, fontSize: 14.5, fontWeight: 600,
                background: active ? '#fff' : 'transparent', color: active ? C.ink : '#C7CCD6',
                border: `1px solid ${active ? '#fff' : 'rgba(255,255,255,0.22)'}`, transition: 'all .2s',
              }}>{opt.label}</button>
            )
          })}
        </div>
      </section>

      <section style={{ maxWidth: 1480, margin: '0 auto', padding: '0 clamp(20px,5vw,56px) clamp(64px,10vw,120px)' }}>
        {(f === 'all' ? ['react', 'ai', 'ops'] : [f]).map((tid) => {
          const chs = (f === 'all' ? byTrack(tid) : list)
          const tr = TRACKS[tid]
          return (
            <div key={tid} style={{ marginTop: 'clamp(28px,4vw,44px)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 22 }}>
                <span style={{ width: 10, height: 10, borderRadius: 99, background: tr.color }} />
                <h2 style={{ margin: 0, fontSize: 'clamp(18px,2.4vw,24px)', fontWeight: 700 }}>{tr.label}</h2>
                <span style={{ fontSize: 13.5, color: '#6B7178' }}>{chs.length}개 챕터</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 'clamp(14px,1.6vw,22px)' }}>
                {chs.map((ch, i) => (
                  <Reveal key={ch.id} delay={(i % 4) * 60}>
                    <ChapterCard ch={ch} progress={doneCount ? { done: doneCount(ch.id) } : null} />
                  </Reveal>
                ))}
              </div>
            </div>
          )
        })}
      </section>
    </main>
  )
}
