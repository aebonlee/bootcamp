import { useParams, Link, Navigate, useNavigate } from 'react-router-dom'
import { C, grad, trackColor, trackGrad } from '../theme'
import { CHAPTERS, TRACKS, getChapter, byTrack } from '../data/curriculum'
import { labsOf } from '../data/labs'
import { Eyebrow, LevelBadge, TagRow } from '../components/ui'
import Reveal from '../components/Reveal'
import { useProgress } from '../hooks/useProgress'
import { useAuth } from '../hooks/useAuth'

export default function Lesson() {
  const { id } = useParams()
  const nav = useNavigate()
  const ch = getChapter(id)
  const { user } = useAuth()
  const prog = useProgress()
  if (!ch) return <Navigate to="/curriculum" replace />

  const tr = TRACKS[ch.track]
  const tc = trackColor(ch.track)
  const completed = prog?.completedSet(ch.id) || new Set()
  const done = completed.size
  const total = ch.sections.length
  const pct = Math.round((done / total) * 100)

  const siblings = byTrack(ch.track)
  const idx = siblings.findIndex((c) => c.id === ch.id)
  const prev = siblings[idx - 1]
  const next = siblings[idx + 1]

  const onToggle = (sno) => {
    if (!user) { nav('/login'); return }
    prog.toggle(ch.id, sno, !completed.has(sno))
  }

  return (
    <main style={{ background: '#fff', color: C.ink }}>
      {/* HERO */}
      <section style={{ background: ch.track === 'ai' ? grad.ai : 'linear-gradient(160deg,#16224A,#0A0B0D)', color: '#fff', position: 'relative', overflow: 'hidden' }}>
        <img src="/assets/silk.svg" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.18 }} />
        <div style={{ position: 'relative', maxWidth: 1080, margin: '0 auto', padding: 'clamp(40px,6vw,88px) clamp(20px,5vw,56px) clamp(36px,5vw,64px)' }}>
          <Link to={`/track/${ch.track}`} style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.72)', fontWeight: 600 }}>← {tr.label}</Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 18 }}>
            <span style={{ fontWeight: 800, fontSize: 14, color: ch.track === 'ai' ? '#FFB37A' : '#8FB4FF', letterSpacing: '0.04em' }}>
              {tr.en.toUpperCase()} · CHAPTER {String(ch.no).padStart(2, '0')}
            </span>
            <LevelBadge level={ch.level} track={ch.track} />
          </div>
          <h1 style={{ margin: '14px 0 0', fontSize: 'clamp(28px,4.5vw,52px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1 }}>{ch.title}</h1>
          <p style={{ margin: '18px 0 0', maxWidth: 720, fontSize: 'clamp(15px,2vw,17px)', lineHeight: 1.75, color: 'rgba(255,255,255,0.85)' }}>{ch.summary}</p>
          <div style={{ marginTop: 22 }}><TagRow tags={ch.tags} color={ch.track === 'ai' ? '#FFB37A' : '#8FB4FF'} /></div>

          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 18, marginTop: 28 }}>
            <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)' }}>{total}개 강의 · {ch.duration}</span>
            {user && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: '1 1 200px', minWidth: 180 }}>
                <div style={{ flex: 1, height: 6, borderRadius: 6, background: 'rgba(255,255,255,0.16)', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${pct}%`, background: trackGrad(ch.track), borderRadius: 6, transition: 'width .4s' }} />
                </div>
                <span style={{ fontSize: 13.5, fontWeight: 700, color: '#fff' }}>{pct}%</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SECTIONS */}
      <section style={{ maxWidth: 1080, margin: '0 auto', padding: 'clamp(40px,6vw,72px) clamp(20px,5vw,56px) clamp(20px,3vw,32px)' }}>
        <Eyebrow color={tc}>LESSONS</Eyebrow>
        <h2 style={{ margin: '12px 0 clamp(28px,4vw,40px)', fontSize: 'clamp(22px,3vw,32px)', fontWeight: 700, letterSpacing: '-0.02em' }}>이 챕터에서 배우는 것</h2>

        {!user && (
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 14, background: C.cream, borderRadius: 18, padding: '18px 24px', marginBottom: 28 }}>
            <span style={{ fontSize: 14.5, color: '#3A3F49', fontWeight: 500 }}>로그인하면 강의별 학습 진도를 저장할 수 있어요.</span>
            <Link to="/login" className="cta-pill" style={{ padding: '11px 22px', borderRadius: 60, background: grad.blue, color: '#fff', fontSize: 14, fontWeight: 700 }}>로그인 →</Link>
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {ch.sections.map((s, i) => {
            const isDone = completed.has(s.no)
            return (
              <Reveal key={s.no} delay={Math.min(i, 6) * 50}>
                <article style={{ border: `1px solid ${isDone ? tc + '55' : C.line}`, borderRadius: 20, padding: 'clamp(22px,3vw,32px)', background: isDone ? `${tc}08` : '#fff', transition: 'border-color .25s, background .25s' }}>
                  <div style={{ display: 'flex', gap: 18, alignItems: 'flex-start' }}>
                    <button onClick={() => onToggle(s.no)} aria-label="완료 표시" style={{
                      flexShrink: 0, width: 30, height: 30, borderRadius: 99, marginTop: 2,
                      border: isDone ? 'none' : '2px solid rgba(10,11,13,0.2)',
                      background: isDone ? trackGrad(ch.track) : '#fff', color: '#fff',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, transition: 'all .2s',
                    }}>{isDone ? '✓' : ''}</button>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap' }}>
                        <span style={{ fontSize: 13, fontWeight: 800, color: tc }}>{s.no}</span>
                        <h3 style={{ margin: 0, fontSize: 'clamp(17px,2vw,20px)', fontWeight: 700, letterSpacing: '-0.01em' }}>{s.title}</h3>
                      </div>
                      <p style={{ margin: '12px 0 0', fontSize: 15, lineHeight: 1.72, color: '#4A4F57' }}>{s.summary}</p>
                      <ul style={{ margin: '16px 0 0', display: 'flex', flexDirection: 'column', gap: 9 }}>
                        {s.points.map((p, j) => (
                          <li key={j} style={{ display: 'flex', gap: 10, fontSize: 14.5, lineHeight: 1.6, color: '#3A3F49' }}>
                            <span style={{ color: tc, fontWeight: 800, flexShrink: 0 }}>›</span>{p}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>
      </section>

      {/* 실습 예제 */}
      {labsOf(ch.id).length > 0 && (
        <section style={{ maxWidth: 1080, margin: '0 auto', padding: 'clamp(20px,3vw,32px) clamp(20px,5vw,56px) 0' }}>
          <Eyebrow color={tc}>HANDS-ON LABS</Eyebrow>
          <h2 style={{ margin: '12px 0 clamp(22px,3vw,30px)', fontSize: 'clamp(22px,3vw,32px)', fontWeight: 700, letterSpacing: '-0.02em' }}>이 챕터의 실습 예제</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 14 }}>
            {labsOf(ch.id).map((lab, i) => (
              <Reveal key={i} delay={Math.min(i, 5) * 50} className="hov-lift" style={{ border: `1px solid ${C.line}`, borderRadius: 18, padding: '22px 24px', background: C.cream }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <span style={{ width: 28, height: 28, borderRadius: 8, background: trackGrad(ch.track), color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800, flexShrink: 0 }}>{i + 1}</span>
                  <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, lineHeight: 1.35 }}>{lab.title}</h3>
                </div>
                <p style={{ margin: '0 0 14px', fontSize: 14, lineHeight: 1.6, color: '#4A4F57' }}>{lab.desc}</p>
                <TagRow tags={lab.stack} color={tc} />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* PREV / NEXT */}
      <section style={{ maxWidth: 1080, margin: '0 auto', padding: '0 clamp(20px,5vw,56px) clamp(64px,10vw,120px)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 16, marginTop: 28 }}>
          {prev ? (
            <Link to={`/lesson/${prev.id}`} className="card-link" style={{ display: 'block', border: `1px solid ${C.line}`, borderRadius: 18, padding: '22px 26px', background: '#fff' }}>
              <div style={{ fontSize: 12.5, color: '#9CA2AD', fontWeight: 700, letterSpacing: '0.04em' }}>← 이전 챕터</div>
              <div style={{ marginTop: 8, fontSize: 16, fontWeight: 700 }}>{String(prev.no).padStart(2, '0')}. {prev.title}</div>
            </Link>
          ) : <div />}
          {next ? (
            <Link to={`/lesson/${next.id}`} className="card-link" style={{ display: 'block', border: `1px solid ${C.line}`, borderRadius: 18, padding: '22px 26px', background: '#fff', textAlign: 'right' }}>
              <div style={{ fontSize: 12.5, color: '#9CA2AD', fontWeight: 700, letterSpacing: '0.04em' }}>다음 챕터 →</div>
              <div style={{ marginTop: 8, fontSize: 16, fontWeight: 700 }}>{String(next.no).padStart(2, '0')}. {next.title}</div>
            </Link>
          ) : (
            <Link to="/curriculum" className="card-link" style={{ display: 'block', border: 'none', borderRadius: 18, padding: '22px 26px', background: trackGrad(ch.track), color: '#fff', textAlign: 'right' }}>
              <div style={{ fontSize: 12.5, opacity: 0.85, fontWeight: 700, letterSpacing: '0.04em' }}>트랙 완주! 🎉</div>
              <div style={{ marginTop: 8, fontSize: 16, fontWeight: 700 }}>전체 커리큘럼으로 →</div>
            </Link>
          )}
        </div>
      </section>
    </main>
  )
}
