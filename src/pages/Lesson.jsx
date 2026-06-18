import { useEffect, useState } from 'react'
import { useParams, Link, Navigate, useNavigate, useLocation } from 'react-router-dom'
import { C, grad, trackColor, trackGrad, trackHero } from '../theme'
import { TRACKS, getChapter, byTrack } from '../data/curriculum'
import { labsOf } from '../data/labs'
import { loadContent } from '../content'
import { Eyebrow, LevelBadge, TagRow } from '../components/ui'
import Markdown, { sectionAnchor } from '../components/Markdown'
import Reveal from '../components/Reveal'
import { useProgress } from '../hooks/useProgress'
import { useAuth } from '../hooks/useAuth'

export default function Lesson() {
  const { id } = useParams()
  const nav = useNavigate()
  const loc = useLocation()
  const ch = getChapter(id)
  const { user } = useAuth()
  const prog = useProgress()
  const [content, setContent] = useState('')

  // 챕터 본문 lazy 로드
  useEffect(() => {
    let on = true
    setContent('')
    loadContent(id).then((md) => { if (on) setContent(md || '') })
    return () => { on = false }
  }, [id])

  // #s-5.1 같은 해시로 진입하면 본문 로드 후 해당 섹션으로 스크롤
  useEffect(() => {
    if (!loc.hash || !content) return
    const t = setTimeout(() => {
      const el = document.getElementById(loc.hash.slice(1))
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 80)
    return () => clearTimeout(t)
  }, [loc.hash, content])

  if (!ch) return <Navigate to="/curriculum" replace />

  const tr = TRACKS[ch.track]
  const tc = trackColor(ch.track)
  const completed = prog?.completedSet(ch.id) || new Set()
  const done = completed.size
  const total = ch.sections.length
  const pct = total ? Math.round((done / total) * 100) : 0

  const siblings = byTrack(ch.track)
  const idx = siblings.findIndex((c) => c.id === ch.id)
  const prev = siblings[idx - 1]
  const next = siblings[idx + 1]

  const toggle = (sno) => {
    if (!user) { nav('/login'); return }
    prog.toggle(ch.id, sno, !completed.has(sno))
  }
  const goAnchor = (e, sno) => {
    e.preventDefault()
    const el = document.getElementById(sectionAnchor(sno))
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <main style={{ background: '#fff', color: C.ink }}>
      {/* HERO */}
      <section style={{ background: trackHero(ch.track), color: '#fff', position: 'relative', overflow: 'hidden' }}>
        <img src="/assets/silk.svg" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.18 }} />
        <div style={{ position: 'relative', maxWidth: 1280, margin: '0 auto', padding: 'clamp(40px,6vw,84px) clamp(20px,5vw,56px) clamp(34px,5vw,56px)' }}>
          <Link to={`/track/${ch.track}`} style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.72)', fontWeight: 600 }}>← {tr.label}</Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 18 }}>
            <span style={{ fontWeight: 800, fontSize: 14, color: ch.track === 'ai' ? '#FFB37A' : ch.track === 'ops' ? '#5CE0A8' : ch.track === 'web' ? '#C4B5FD' : '#8FB4FF', letterSpacing: '0.04em' }}>
              {tr.en.toUpperCase()} · CHAPTER {String(ch.no).padStart(2, '0')}
            </span>
            <LevelBadge level={ch.level} track={ch.track} />
          </div>
          <h1 style={{ margin: '14px 0 0', fontSize: 'clamp(28px,4.5vw,52px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1 }}>{ch.title}</h1>
          <p style={{ margin: '18px 0 0', maxWidth: 760, fontSize: 'clamp(15px,2vw,17px)', lineHeight: 1.75, color: 'rgba(255,255,255,0.85)' }}>{ch.summary}</p>
          <div style={{ marginTop: 22 }}><TagRow tags={ch.tags} color={ch.track === 'ai' ? '#FFB37A' : ch.track === 'ops' ? '#5CE0A8' : ch.track === 'web' ? '#C4B5FD' : '#8FB4FF'} /></div>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 18, marginTop: 26 }}>
            <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)' }}>{total}개 강의 · {ch.duration}</span>
            {user && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: '1 1 200px', minWidth: 180, maxWidth: 320 }}>
                <div style={{ flex: 1, height: 6, borderRadius: 6, background: 'rgba(255,255,255,0.16)', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${pct}%`, background: trackGrad(ch.track), borderRadius: 6, transition: 'width .4s' }} />
                </div>
                <span style={{ fontSize: 13.5, fontWeight: 700, color: '#fff' }}>{pct}%</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* BODY: TOC + content */}
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '0 clamp(20px,5vw,56px)' }}>
        <div className="lesson-grid">
          {/* TOC */}
          <aside className="lesson-toc">
            <div className="toc-inner">
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', color: '#9CA2AD', margin: '0 0 14px' }}>목차 · 진도 · CONTENTS</div>
              <nav style={{ display: 'flex', flexDirection: 'column', gap: 2, borderLeft: `2px solid ${C.line}`, paddingLeft: 2 }}>
                {ch.sections.map((s) => {
                  const isDone = completed.has(s.no)
                  return (
                    <div key={s.no} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginLeft: -2, borderLeft: `2px solid ${isDone ? tc : 'transparent'}`, paddingLeft: 12 }}>
                      <button onClick={() => toggle(s.no)} title={isDone ? '완료 취소' : '완료 표시'} style={{
                        flexShrink: 0, width: 18, height: 18, borderRadius: 99, marginTop: 9,
                        border: isDone ? 'none' : '2px solid rgba(10,11,13,0.18)', background: isDone ? trackGrad(ch.track) : '#fff',
                        color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10,
                      }}>{isDone ? '✓' : ''}</button>
                      <a href={`#${sectionAnchor(s.no)}`} onClick={(e) => goAnchor(e, s.no)} style={{ padding: '7px 0', fontSize: 13.5, lineHeight: 1.5, color: isDone ? tc : '#4A4F57', fontWeight: isDone ? 700 : 500 }}>
                        <b style={{ color: isDone ? tc : '#9CA2AD', fontWeight: 700, marginRight: 5 }}>{s.no}</b>{s.title}
                      </a>
                    </div>
                  )
                })}
              </nav>
              {!user && (
                <Link to="/login" className="cta-pill" style={{ display: 'block', textAlign: 'center', marginTop: 20, padding: '11px', borderRadius: 12, background: grad.blue, color: '#fff', fontSize: 13.5, fontWeight: 700 }}>로그인하고 진도 저장</Link>
              )}
            </div>
          </aside>

          {/* CONTENT */}
          <article className="lesson-content" style={{ minWidth: 0, padding: 'clamp(32px,4vw,52px) 0 clamp(40px,5vw,64px)' }}>
            {content
              ? <Markdown accent={tc}>{content}</Markdown>
              : <p style={{ color: '#9CA2AD', padding: '20px 0' }}>본문을 불러오는 중입니다…</p>}
          </article>
        </div>
      </section>

      {/* 실습 예제 */}
      {labsOf(ch.id).length > 0 && (
        <section style={{ maxWidth: 1280, margin: '0 auto', padding: 'clamp(8px,2vw,16px) clamp(20px,5vw,56px) 0' }}>
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
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '0 clamp(20px,5vw,56px) clamp(64px,10vw,120px)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 16, marginTop: 36 }}>
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
            <Link to="/curriculum" className="card-link" style={{ display: 'block', borderRadius: 18, padding: '22px 26px', background: trackGrad(ch.track), color: '#fff', textAlign: 'right' }}>
              <div style={{ fontSize: 12.5, opacity: 0.85, fontWeight: 700, letterSpacing: '0.04em' }}>트랙 완주! 🎉</div>
              <div style={{ marginTop: 8, fontSize: 16, fontWeight: 700 }}>전체 커리큘럼으로 →</div>
            </Link>
          )}
        </div>
      </section>
    </main>
  )
}
