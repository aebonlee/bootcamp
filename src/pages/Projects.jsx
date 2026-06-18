import { useState } from 'react'
import { Link } from 'react-router-dom'
import { C, grad } from '../theme'
import { PROJECTS, PROJECT_LEVELS, byLevel, TOTAL_PROJECTS } from '../data/projects'
import { getChapter } from '../data/curriculum'
import { Eyebrow } from '../components/ui'
import Reveal from '../components/Reveal'

const TRACK_META = {
  web: { label: '웹 기초', color: '#7C3AED', grad: 'linear-gradient(135deg,#A78BFA,#7C3AED)' },
  react: { label: 'React', color: '#1A45D8', grad: grad.blue },
  ai: { label: 'AI', color: '#E0470A', grad: 'linear-gradient(135deg,#FF7A1E,#E0470A)' },
  fullstack: { label: '풀스택', color: '#7A3CF0', grad: 'linear-gradient(135deg,#9B6BFF,#6A2BD9)' },
  ops: { label: '배포', color: '#0E8F63', grad: 'linear-gradient(135deg,#22C58A,#0E8F63)' },
}
const chBadge = (t) => (t === 'ai' ? 'AI' : t === 'ops' ? 'Deploy' : t === 'web' ? 'Web' : 'React')
const LEVEL_COLOR = { 입문: '#16A34A', 중급: '#1A45D8', 고급: '#E0470A' }
const FILTERS = ['전체', ...PROJECT_LEVELS]

export default function Projects() {
  const [f, setF] = useState('전체')
  const list = f === '전체' ? PROJECTS : byLevel(f)

  return (
    <main style={{ background: C.ink, color: '#fff', minHeight: '100vh' }}>
      {/* HERO */}
      <section style={{ position: 'relative', overflow: 'hidden' }}>
        <img src="/assets/silk.svg" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.12 }} />
        <div style={{ position: 'relative', maxWidth: 1280, margin: '0 auto', padding: 'clamp(48px,7vw,108px) clamp(20px,5vw,56px) clamp(28px,4vw,44px)' }}>
          <Eyebrow>PROJECTS</Eyebrow>
          <h1 style={{ margin: '14px 0 0', fontSize: 'clamp(34px,7vw,100px)', lineHeight: 0.96, letterSpacing: '-0.04em', fontWeight: 300, textTransform: 'uppercase' }}>
            프로젝트로<br /><span style={{ fontWeight: 800 }}>완성하기</span>
          </h1>
          <p style={{ margin: '24px 0 0', maxWidth: 680, fontSize: 'clamp(15px,2vw,18px)', lineHeight: 1.7, color: '#9CA2AD' }}>
            배운 내용을 직접 만들며 체화하세요. 입문부터 중급·고급까지 단계별 {TOTAL_PROJECTS}개의 실전 프로젝트 예제를 제공합니다. 각 프로젝트는 관련 강의와 연결됩니다.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 'clamp(28px,4vw,40px)' }}>
            {FILTERS.map((opt) => {
              const active = f === opt
              return (
                <button key={opt} onClick={() => setF(opt)} style={{
                  padding: '11px 22px', borderRadius: 60, fontSize: 14.5, fontWeight: 600,
                  background: active ? '#fff' : 'transparent', color: active ? C.ink : '#C7CCD6',
                  border: `1px solid ${active ? '#fff' : 'rgba(255,255,255,0.22)'}`, transition: 'all .2s',
                }}>{opt}{opt !== '전체' && <span style={{ marginLeft: 6, opacity: 0.6, fontSize: 12 }}>{byLevel(opt).length}</span>}</button>
              )
            })}
          </div>
        </div>
      </section>

      {/* LIST */}
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '0 clamp(20px,5vw,56px) clamp(64px,10vw,120px)' }}>
        {(f === '전체' ? PROJECT_LEVELS : [f]).map((lv) => {
          const items = byLevel(lv)
          if (!items.length) return null
          return (
            <div key={lv} style={{ marginTop: 'clamp(30px,4vw,48px)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                <span style={{ width: 10, height: 10, borderRadius: 99, background: LEVEL_COLOR[lv] }} />
                <h2 style={{ margin: 0, fontSize: 'clamp(19px,2.4vw,24px)', fontWeight: 800 }}>{lv}</h2>
                <span style={{ fontSize: 13, color: '#6B7178' }}>
                  {lv === '입문' ? '핵심 개념을 한 가지씩' : lv === '중급' ? '여러 기술을 조합' : '실무 수준의 통합 프로젝트'}
                </span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(320px,1fr))', gap: 'clamp(14px,1.6vw,20px)' }}>
                {items.map((p, i) => {
                  const tm = TRACK_META[p.track]
                  return (
                    <Reveal key={p.id} delay={(i % 3) * 60} className="hov-lift" style={{
                      display: 'flex', flexDirection: 'column', background: '#121317',
                      border: '1px solid rgba(255,255,255,0.08)', borderRadius: 22, padding: 'clamp(24px,2.6vw,32px)', position: 'relative', overflow: 'hidden',
                    }}>
                      <div aria-hidden style={{ position: 'absolute', top: -40, right: -40, width: 140, height: 140, borderRadius: 99, background: tm.grad, opacity: 0.16, filter: 'blur(6px)' }} />
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontSize: 11.5, fontWeight: 700, padding: '4px 10px', borderRadius: 60, background: `${LEVEL_COLOR[lv]}22`, color: LEVEL_COLOR[lv] === '#1A45D8' ? '#8FB4FF' : LEVEL_COLOR[lv] }}>{lv}</span>
                        <span style={{ fontSize: 11.5, fontWeight: 700, padding: '4px 10px', borderRadius: 60, background: 'rgba(255,255,255,0.08)', color: '#C7CCD6' }}>{tm.label}</span>
                        <span style={{ marginLeft: 'auto', fontSize: 12, color: '#6B7178' }}>{p.duration}</span>
                      </div>
                      <h3 style={{ margin: '16px 0 8px', fontSize: 20, fontWeight: 700, letterSpacing: '-0.01em' }}>{p.title}</h3>
                      <p style={{ margin: 0, color: '#9CA2AD', fontSize: 14.5, lineHeight: 1.65 }}>{p.summary}</p>

                      <div style={{ margin: '18px 0 0' }}>
                        <div style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: '0.08em', color: '#6B7178', marginBottom: 10 }}>주요 기능</div>
                        <ul style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                          {p.features.map((ft, j) => (
                            <li key={j} style={{ display: 'flex', gap: 9, fontSize: 13.5, lineHeight: 1.5, color: '#C7CCD6' }}>
                              <span style={{ color: tm.color === '#1A45D8' ? '#8FB4FF' : tm.color, fontWeight: 800, flexShrink: 0 }}>›</span>{ft}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginTop: 18 }}>
                        {p.stack.map((s) => (
                          <span key={s} style={{ fontSize: 12, fontWeight: 600, color: '#C7CCD6', background: 'rgba(255,255,255,0.06)', padding: '5px 11px', borderRadius: 60 }}>{s}</span>
                        ))}
                      </div>

                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 18, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                        <span style={{ fontSize: 12, color: '#6B7178', alignSelf: 'center' }}>관련 강의</span>
                        {p.chapters.map((cid) => {
                          const ch = getChapter(cid)
                          if (!ch) return null
                          return (
                            <Link key={cid} to={`/lesson/${cid}`} className="hov-lift" style={{ fontSize: 12.5, fontWeight: 600, color: '#fff', background: tm.grad, padding: '5px 11px', borderRadius: 60 }}>
                              {chBadge(ch.track)} {String(ch.no).padStart(2, '0')} →
                            </Link>
                          )
                        })}
                      </div>

                      <Link to={`/project/${p.id}`} className="cta-pill" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 16, padding: '12px', borderRadius: 12, background: tm.grad, color: '#fff', fontSize: 14, fontWeight: 700 }}>
                        구현 예제 · 동작 보기 <span>→</span>
                      </Link>
                    </Reveal>
                  )
                })}
              </div>
            </div>
          )
        })}
      </section>
    </main>
  )
}
