import { Link } from 'react-router-dom'
import { C, trackColor, trackGrad } from '../theme'
import { CHAPTERS, TRACKS, byTrack } from '../data/curriculum'
import { labsOf, totalLabs } from '../data/labs'
import { pdfName, pdfUrl } from '../data/materials'
import { Eyebrow } from '../components/ui'
import Reveal from '../components/Reveal'

export default function Resources() {
  const totalSec = CHAPTERS.reduce((n, c) => n + c.sections.length, 0)

  return (
    <main style={{ background: '#fff' }}>
      {/* HERO */}
      <section style={{ position: 'relative', overflow: 'hidden', background: C.ink, color: '#fff' }}>
        <img src="/assets/silk.svg" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.14 }} />
        <div style={{ position: 'relative', maxWidth: 1280, margin: '0 auto', padding: 'clamp(48px,7vw,108px) clamp(20px,5vw,56px) clamp(36px,5vw,60px)' }}>
          <Eyebrow>RESOURCES</Eyebrow>
          <h1 style={{ margin: '14px 0 0', fontSize: 'clamp(34px,7vw,100px)', lineHeight: 0.96, letterSpacing: '-0.04em', fontWeight: 300, textTransform: 'uppercase' }}>
            학습 자료 &<br /><span style={{ fontWeight: 800 }}>실습 예제</span>
          </h1>
          <p style={{ margin: '24px 0 0', maxWidth: 680, fontSize: 'clamp(15px,2vw,18px)', lineHeight: 1.7, color: '#9CA2AD' }}>
            부트캠프가 제공하는 모든 교재와 실습을 한곳에 모았습니다. 16개 챕터 · {totalSec}개 강의 · {totalLabs}개 실습 예제, 그리고 원본 교재 PDF까지 챕터별로 확인하세요.
          </p>
          <div style={{ display: 'flex', gap: 28, marginTop: 30, flexWrap: 'wrap' }}>
            {[['교재 PDF', '16종'], ['강의', `${totalSec}개`], ['실습 예제', `${totalLabs}개`]].map(([k, v]) => (
              <div key={k}>
                <div style={{ fontSize: 'clamp(22px,3vw,34px)', fontWeight: 800, letterSpacing: '-0.02em' }}>{v}</div>
                <div style={{ fontSize: 13, color: '#6B7178', marginTop: 4 }}>{k}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BY TRACK */}
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: 'clamp(36px,5vw,60px) clamp(20px,5vw,56px) clamp(64px,10vw,110px)' }}>
        {Object.values(TRACKS).map((tr) => {
          const tc = trackColor(tr.id)
          return (
            <div key={tr.id} style={{ marginBottom: 'clamp(36px,5vw,56px)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
                <span style={{ width: 11, height: 11, borderRadius: 99, background: tc }} />
                <h2 style={{ margin: 0, fontSize: 'clamp(20px,2.6vw,26px)', fontWeight: 800, letterSpacing: '-0.02em' }}>{tr.label}</h2>
                <span style={{ fontSize: 13.5, color: '#9CA2AD' }}>{tr.en}</span>
              </div>
              <p style={{ margin: '0 0 22px 23px', fontSize: 14.5, color: '#6B7178' }}>{tr.desc}</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {byTrack(tr.id).map((ch) => {
                  const labs = labsOf(ch.id)
                  return (
                    <Reveal key={ch.id} style={{ border: `1px solid ${C.line}`, borderRadius: 22, padding: 'clamp(22px,3vw,30px)', background: '#fff' }}>
                      {/* chapter head */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 14 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 14, minWidth: 0 }}>
                          <span style={{ width: 46, height: 46, borderRadius: 12, background: trackGrad(ch.track), color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17, fontWeight: 800, flexShrink: 0 }}>{String(ch.no).padStart(2, '0')}</span>
                          <div style={{ minWidth: 0 }}>
                            <h3 style={{ margin: 0, fontSize: 'clamp(17px,2vw,21px)', fontWeight: 700, letterSpacing: '-0.01em' }}>{ch.title}</h3>
                            <div style={{ fontSize: 12.5, color: '#9CA2AD', marginTop: 4 }}>{ch.level} · {ch.sections.length}강의 · 실습 {labs.length}개 · {ch.duration}</div>
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                          {pdfName(ch.id) && (
                            <a href={pdfUrl(ch.id)} target="_blank" rel="noreferrer" className="hov-lift" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '9px 16px', borderRadius: 60, border: `1px solid ${C.line}`, background: '#fff', fontSize: 13, fontWeight: 600, color: C.ink }}>
                              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={tc} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /></svg>
                              교재 PDF
                            </a>
                          )}
                          <Link to={`/lesson/${ch.id}`} className="cta-pill" style={{ display: 'inline-flex', alignItems: 'center', padding: '9px 16px', borderRadius: 60, background: trackGrad(ch.track), color: '#fff', fontSize: 13, fontWeight: 700 }}>강의 보기 →</Link>
                        </div>
                      </div>

                      {/* sections */}
                      <div style={{ marginTop: 20 }}>
                        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', color: '#9CA2AD', marginBottom: 10 }}>강의 목차</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                          {ch.sections.map((s) => (
                            <span key={s.no} style={{ fontSize: 13, color: '#3A3F49', background: C.soft, padding: '6px 12px', borderRadius: 10 }}>
                              <b style={{ color: tc, fontWeight: 700 }}>{s.no}</b> {s.title}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* labs */}
                      {labs.length > 0 && (
                        <div style={{ marginTop: 18 }}>
                          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', color: '#9CA2AD', marginBottom: 10 }}>실습 예제</div>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: 10 }}>
                            {labs.map((lab, i) => (
                              <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', background: C.cream, borderRadius: 12, padding: '12px 14px' }}>
                                <span style={{ color: tc, fontWeight: 800, fontSize: 13, flexShrink: 0, marginTop: 1 }}>{i + 1}</span>
                                <div>
                                  <div style={{ fontSize: 13.5, fontWeight: 700, lineHeight: 1.35 }}>{lab.title}</div>
                                  <div style={{ fontSize: 12, color: '#6B7178', marginTop: 3 }}>{lab.stack.join(' · ')}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </Reveal>
                  )
                })}
              </div>
            </div>
          )
        })}

        <p style={{ marginTop: 8, fontSize: 13, color: '#9CA2AD', lineHeight: 1.6 }}>
          ※ 원본 교재 PDF·추출 텍스트·커리큘럼 데이터는 저장소{' '}
          <a href="https://github.com/aebonlee/bootcamp/tree/main/docs" target="_blank" rel="noreferrer" style={{ color: C.blueD, fontWeight: 600 }}>docs 폴더</a>
          에서 함께 제공됩니다.
        </p>
      </section>
    </main>
  )
}
