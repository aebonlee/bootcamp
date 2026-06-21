import { Link } from 'react-router-dom'
import { useState } from 'react'
import { C, grad, trackHero, trackGrad } from '../theme'
import { CHAPTERS, TRACKS, byTrack, TOTAL_CHAPTERS, TOTAL_LESSONS } from '../data/curriculum'
import { Eyebrow, ChapterCard } from '../components/ui'
import Reveal from '../components/Reveal'
import { useProgress } from '../hooks/useProgress'
import { usePageMeta } from '../hooks/usePageMeta'

const STACK = ['React 19', 'Vite', 'Supabase', 'FastAPI', 'Hugging Face', 'Docker', 'AWS', 'Git · GitHub', 'Nginx', 'PostgreSQL', 'JavaScript', 'REST API']

const FEATURES = [
  { t: '실무 중심 커리큘럼', d: `JSX 기초부터 인증·배포까지, 현업 프로젝트 흐름 그대로 설계된 ${TOTAL_CHAPTERS}개 챕터.`, orn: 'orn-bowtie.svg' },
  { t: '웹기초부터 배포까지 네 트랙', d: 'HTML·CSS·JS 웹 기초, React 프론트엔드, 생성형 AI 웹 서비스, Git·AWS·Docker 실전 배포까지.', orn: 'orn-tunnel.svg' },
  { t: `${TOTAL_LESSONS}개 강의 · 진도 관리`, d: '섹션 단위로 학습을 체크하고 트랙별 달성률을 한눈에 추적합니다.', orn: 'orn-rings.svg' },
  { t: '바로 쓰는 예제 코드', d: '감정분석 API, 이미지 생성, 멀티모달 챗봇 등 그대로 응용 가능한 실습 자료.', orn: 'orn-flower.svg' },
]

const PROCESS = [
  { n: '01', t: '개념 학습', d: '핵심 개념을 강의 카드와 요약으로 빠르게 이해합니다.' },
  { n: '02', t: '손으로 실습', d: '챕터별 예제를 직접 따라 만들며 코드를 체득합니다.' },
  { n: '03', t: '프로젝트 적용', d: '배운 내용을 실전 미니 프로젝트로 통합해 완성합니다.' },
  { n: '04', t: '리팩터링 & 배포', d: '코드를 다듬고 실제 서비스로 배포하는 경험까지.' },
]

const FAQS = [
  { q: '완전 입문자도 들을 수 있나요?', a: 'React 트랙은 JSX와 개발환경 구성부터 시작합니다. HTML/CSS와 기본 JavaScript만 알면 무리 없이 따라올 수 있도록 단계적으로 구성했습니다.' },
  { q: '어떤 트랙부터 들어야 하나요?', a: '웹 개발이 처음이라면 웹 기초(HTML·CSS·JavaScript) 트랙부터 시작해 React 프론트엔드로 넘어가는 흐름을 권장합니다. AI 트랙은 Python·FastAPI로 모델을 웹 API로 노출하는 관점을, 배포·협업 트랙은 Git·GitHub과 AWS·Docker 실전 배포를 다룹니다. 네 트랙은 독립적으로 수강할 수 있습니다.' },
  { q: '학습 진도는 저장되나요?', a: '구글 또는 카카오로 로그인하면 섹션 단위 학습 체크가 계정에 저장되어, 트랙별 달성률을 언제든 이어볼 수 있습니다.' },
  { q: '배운 내용을 어떻게 점검하나요?', a: '강의마다 핵심 용어 정리와 객관식 퀴즈로 이해도를 직접 검증하고, 입문·중급·고급 프로젝트 예제로 실전에 적용해볼 수 있습니다.' },
  { q: '강의 자료와 코드는 어디서 보나요?', a: '모든 강의 본문·예제 코드·실습이 웹페이지로 제공되어, 별도 파일 없이 강의 상세 페이지에서 바로 학습하고 코드를 복사해 사용할 수 있습니다.' },
]

export default function Home() {
  usePageMeta(null, `웹 기초(HTML·CSS·JS)부터 React·AI·실전 배포까지 — ${TOTAL_CHAPTERS}개 챕터 ${TOTAL_LESSONS}개 강의의 실무형 웹 개발 학습 플랫폼.`)
  const { doneCount } = useProgress() || {}
  // 메인 커리큘럼 프리뷰: 트랙별로 9장을 뽑아 3×3 정렬
  const preview = [
    ...byTrack('web').slice(0, 3),
    ...byTrack('react').slice(0, 2),
    ...byTrack('ai').slice(0, 2),
    ...byTrack('ops').slice(0, 2),
  ]

  return (
    <main>
      {/* ===== HERO ===== */}
      <section style={{ position: 'relative', overflow: 'hidden', background: '#fff' }}>
        <img src="/assets/silk.svg" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '-10%', left: '30%', width: '60%', height: '80%', background: 'radial-gradient(circle,rgba(75,134,255,0.1),transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', maxWidth: 1480, margin: '0 auto', padding: 'clamp(56px,9vw,124px) clamp(20px,5vw,56px) clamp(48px,7vw,96px)' }}>
          <p style={{ margin: 0, fontSize: 'clamp(14px,1.8vw,18px)', fontWeight: 600, color: '#3A3F49', animation: 'heroIn .7s both' }}>
웹기초 · React · AI · 배포 부트캠프 · <span style={{ color: C.orange, fontWeight: 800 }}>{TOTAL_CHAPTERS}챕터 {TOTAL_LESSONS}강의</span> 풀코스
          </p>
          <h1 style={{ margin: 'clamp(18px,3vw,32px) 0 0', fontWeight: 800, fontSize: 'clamp(46px,12vw,176px)', lineHeight: 0.9, letterSpacing: '-0.045em', color: C.ink, textTransform: 'uppercase' }}>
            <span style={{ display: 'block', fontWeight: 300 }}>DreamIT</span>
            <span style={{ display: 'block', animation: 'heroIn .9s .12s both' }}>Bootcamp</span>
          </h1>
          <div style={{ height: 1, background: 'rgba(10,11,13,0.14)', margin: 'clamp(30px,5vw,52px) 0 clamp(20px,3vw,26px)', transformOrigin: 'left', animation: 'growLine 1s .3s both' }} />
          <p style={{ margin: 0, maxWidth: 580, fontSize: 'clamp(15px,2vw,19px)', lineHeight: 1.7, color: '#6B7178', animation: 'heroIn .8s .25s both' }}>
            JSX 기초부터 상태관리·인증·배포까지, 그리고 FastAPI와 Hugging Face로 만드는 생성형 AI 웹 서비스까지. 실무로 이어지는 웹 개발의 모든 것을 한 곳에서 학습하세요.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginTop: 'clamp(26px,4vw,38px)', animation: 'heroIn .8s .35s both' }}>
            <Link to="/curriculum" className="cta-pill" style={{ padding: '16px 32px', borderRadius: 60, background: grad.blue, color: '#fff', fontSize: 16, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 9, boxShadow: '0 10px 26px rgba(26,69,216,0.28)' }}>
              커리큘럼 보기 <span>→</span>
            </Link>
            <Link to="/login" className="btn-ghost" style={{ padding: '16px 32px', borderRadius: 60, border: '1px solid rgba(10,11,13,0.2)', color: C.ink, fontSize: 16, fontWeight: 600 }}>
              무료로 시작하기
            </Link>
          </div>
        </div>
      </section>

      {/* ===== MARQUEE ===== */}
      <section style={{ padding: 'clamp(24px,4vw,40px) 0', borderTop: '1px solid rgba(10,11,13,0.08)', borderBottom: '1px solid rgba(10,11,13,0.08)', overflow: 'hidden', background: '#fff' }}>
        <p style={{ textAlign: 'center', fontSize: 12, fontWeight: 700, letterSpacing: '0.16em', color: '#9CA2AD', margin: '0 0 20px' }}>커리큘럼에서 다루는 핵심 기술 스택</p>
        <div style={{ display: 'flex', whiteSpace: 'nowrap', width: 'max-content', animation: 'marquee 26s linear infinite' }}>
          {[0, 1].map((dup) => (
            <div key={dup} aria-hidden={dup === 1} style={{ display: 'flex', alignItems: 'center', gap: 'clamp(40px,6vw,80px)', paddingRight: 'clamp(40px,6vw,80px)' }}>
              {STACK.map((s, i) => (
                <span key={s + dup} style={{ fontWeight: i % 2 ? 600 : 800, fontSize: 'clamp(20px,3vw,30px)', color: C.ink, opacity: 0.38, letterSpacing: '-0.02em' }}>{s}</span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ===== TRACKS ===== */}
      <section style={{ background: C.ink, color: '#fff', padding: 'clamp(64px,10vw,140px) 0' }}>
        <div style={{ maxWidth: 1480, margin: '0 auto', padding: '0 clamp(20px,5vw,56px)' }}>
          <Reveal style={{ textAlign: 'center', marginBottom: 'clamp(40px,5vw,60px)' }}>
            <Eyebrow>LEARNING TRACKS</Eyebrow>
            <h2 style={{ margin: '14px 0 0', fontSize: 'clamp(30px,5.5vw,68px)', lineHeight: 1, letterSpacing: '-0.035em', textTransform: 'uppercase', fontWeight: 300 }}>
              네 개의 <span style={{ fontWeight: 800 }}>전문 트랙</span>
            </h2>
            <p style={{ margin: '22px auto 0', maxWidth: 620, fontSize: 'clamp(15px,2vw,18px)', lineHeight: 1.7, color: '#9CA2AD' }}>
              웹 기초 · React · AI · 배포, 각자의 목표에 맞춰 선택하세요. 모든 트랙이 <b style={{ color: '#fff' }}>개념 → 실습 → 프로젝트</b> 흐름으로 완성됩니다.
            </p>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 'clamp(16px,2vw,24px)' }}>
            {Object.values(TRACKS).map((tr, idx) => {
              const chs = byTrack(tr.id)
              const totalSec = chs.reduce((n, c) => n + c.sections.length, 0)
              return (
                <Reveal key={tr.id} delay={idx * 90}>
                  <Link to={`/track/${tr.id}`} className="card-link" style={{
                    display: 'flex', flexDirection: 'column', minHeight: 320,
                    background: trackHero(tr.id),
                    border: `1px solid ${tr.color}55`, borderRadius: 26, padding: 'clamp(30px,3.4vw,46px)', color: '#fff', position: 'relative', overflow: 'hidden',
                  }}>
                    <img src={`/assets/${tr.id === 'ai' ? 'orn-flower' : tr.id === 'ops' ? 'orn-tunnel' : 'orn-rings'}.svg`} alt="" style={{ position: 'absolute', right: -30, bottom: -30, width: 200, height: 200, opacity: 0.22 }} />
                    <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.16em', color: tr.id === 'ai' ? '#FFB37A' : tr.id === 'ops' ? '#5CE0A8' : '#8FB4FF' }}>{tr.en.toUpperCase()}</span>
                    <h3 style={{ margin: '16px 0 0', fontSize: 'clamp(26px,3vw,40px)', fontWeight: 800, letterSpacing: '-0.02em' }}>{tr.label}</h3>
                    <p style={{ margin: '16px 0 auto', maxWidth: 420, fontSize: 15.5, lineHeight: 1.7, color: 'rgba(255,255,255,0.82)' }}>{tr.desc}</p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 28 }}>
                      <div style={{ display: 'flex', gap: 18, fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.9)' }}>
                        <span>{chs.length}개 챕터</span><span>{totalSec}개 강의</span>
                      </div>
                      <span style={{ width: 46, height: 46, borderRadius: 99, background: trackGrad(tr.id), display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>→</span>
                    </div>
                  </Link>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== FEATURES (ORANGE) ===== */}
      <section style={{ background: C.orange2, color: '#fff', padding: 'clamp(64px,10vw,140px) 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 1, background: 'rgba(255,255,255,0.16)' }} />
        <div style={{ maxWidth: 1480, margin: '0 auto', padding: '0 clamp(20px,5vw,56px)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: 'clamp(36px,5vw,64px)', alignItems: 'start' }}>
          <Reveal>
            <Eyebrow color="#fff">WHY BOOTCAMP</Eyebrow>
            <h2 style={{ margin: '18px 0 0', fontSize: 'clamp(36px,6vw,80px)', lineHeight: 0.98, letterSpacing: '-0.035em', textTransform: 'uppercase', fontWeight: 300 }}>
              Learn<br />Like a<br /><span style={{ fontWeight: 800 }}>Pro</span>
            </h2>
            <p style={{ margin: '28px 0 0', maxWidth: 360, fontSize: 16, lineHeight: 1.7, color: 'rgba(255,255,255,0.9)' }}>
              강의를 위한 강의가 아니라, 실제로 만들 수 있게 되는 학습. 현업 프로젝트의 순서 그대로 배웁니다.
            </p>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,250px),1fr))', gap: 'clamp(16px,1.8vw,22px)' }}>
            {FEATURES.map((f, i) => (
              <Reveal key={f.t} delay={i * 70} className="hov-lift" style={{ background: 'rgba(0,0,0,0.42)', borderRadius: 22, padding: 'clamp(26px,3vw,38px)', position: 'relative', overflow: 'hidden', minHeight: 'clamp(230px,26vw,300px)' }}>
                <h3 style={{ margin: '0 0 14px', fontSize: 'clamp(19px,1.7vw,23px)', fontWeight: 700 }}>{f.t}</h3>
                <p style={{ margin: 0, color: 'rgba(255,255,255,0.82)', fontSize: 14.5, lineHeight: 1.65 }}>{f.d}</p>
                <img src={`/assets/${f.orn}`} alt="" style={{ position: 'absolute', right: -4, bottom: -4, width: 'clamp(130px,15vw,176px)', height: 'clamp(130px,15vw,176px)', opacity: 0.85 }} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CURRICULUM PREVIEW ===== */}
      <section style={{ background: C.ink, color: '#fff', padding: 'clamp(60px,9vw,128px) 0' }}>
        <div style={{ maxWidth: 1480, margin: '0 auto', padding: '0 clamp(20px,5vw,56px)' }}>
          <Reveal style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, marginBottom: 'clamp(34px,4vw,52px)' }}>
            <div>
              <Eyebrow>CURRICULUM</Eyebrow>
              <h2 style={{ margin: '14px 0 0', fontSize: 'clamp(30px,5vw,64px)', fontWeight: 800, letterSpacing: '-0.035em', lineHeight: 0.96, textTransform: 'uppercase' }}>
                지금 바로<br />시작하는 강의
              </h2>
            </div>
            <Link to="/curriculum" className="btn-ghost-d" style={{ padding: '13px 28px', borderRadius: 60, border: '1px solid rgba(255,255,255,0.25)', color: '#fff', fontSize: 14.5, fontWeight: 600 }}>전체 {TOTAL_LESSONS}개 강의 보기 →</Link>
          </Reveal>
          <div className="grid-3">
            {preview.map((ch, i) => (
              <Reveal key={ch.id} delay={(i % 3) * 70}>
                <ChapterCard ch={ch} progress={doneCount ? { done: doneCount(ch.id) } : null} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== EXPLORE (프로젝트·퀴즈·자료) ===== */}
      <section style={{ background: '#fff', padding: 'clamp(60px,9vw,120px) 0 0' }}>
        <div style={{ maxWidth: 1480, margin: '0 auto', padding: '0 clamp(20px,5vw,56px)' }}>
          <Reveal style={{ marginBottom: 'clamp(28px,4vw,44px)' }}>
            <Eyebrow>EXPLORE</Eyebrow>
            <h2 style={{ margin: '14px 0 0', fontSize: 'clamp(26px,4.5vw,52px)', fontWeight: 800, letterSpacing: '-0.035em', lineHeight: 1 }}>학습을 넘어, 실력으로</h2>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 'clamp(14px,1.6vw,20px)' }}>
            {[
              { to: '/projects', ey: 'PROJECTS', t: '프로젝트로 완성', d: '입문·중급·고급 18개 실전 프로젝트로 배운 내용을 직접 만들어 봅니다.', g: grad.blue, orn: 'orn-rings.svg' },
              { to: '/quiz', ey: 'REVIEW · QUIZ', t: '용어 · 퀴즈로 점검', d: '핵심 용어 정리와 객관식 퀴즈로 이해도를 스스로 검증합니다.', g: 'linear-gradient(135deg,#22C58A,#0E8F63)', orn: 'orn-flower.svg' },
              { to: '/coaching', ey: 'COACHING', t: '코칭 · 가이드 · Tips', d: '기술 코칭과 실무 부록 가이드, 실전 Tips!를 한곳에서 만나보세요.', g: 'linear-gradient(135deg,#8B7BE0,#5848B8)', orn: 'orn-bowtie.svg' },
              { to: '/resources', ey: 'RESOURCES', t: '자료 · 실습 모아보기', d: '전 챕터의 강의 목차와 실습 예제를 한곳에서 살펴봅니다.', g: grad.orange, orn: 'orn-tunnel.svg' },
            ].map((c, i) => (
              <Reveal key={c.to} delay={i * 80}>
                <Link to={c.to} className="card-link" style={{ display: 'flex', flexDirection: 'column', minHeight: 230, background: c.g, color: '#fff', borderRadius: 24, padding: 'clamp(26px,3vw,38px)', position: 'relative', overflow: 'hidden' }}>
                  <img src={`/assets/${c.orn}`} alt="" style={{ position: 'absolute', right: -24, bottom: -24, width: 170, height: 170, opacity: 0.22, filter: 'brightness(2)' }} />
                  <div style={{ position: 'relative', fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', opacity: 0.85 }}>{c.ey}</div>
                  <h3 style={{ position: 'relative', margin: '14px 0 0', fontSize: 'clamp(22px,2.6vw,28px)', fontWeight: 800, letterSpacing: '-0.01em' }}>{c.t}</h3>
                  <p style={{ position: 'relative', margin: '12px 0 auto', fontSize: 14.5, lineHeight: 1.6, color: 'rgba(255,255,255,0.9)' }}>{c.d}</p>
                  <span style={{ position: 'relative', width: 44, height: 44, borderRadius: 99, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, marginTop: 18 }}>→</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROCESS ===== */}
      <section style={{ maxWidth: 1480, margin: '0 auto', padding: '0 clamp(20px,5vw,56px) clamp(64px,10vw,140px)', background: '#fff' }}>
        <div style={{ background: C.cream, borderRadius: 28, padding: 'clamp(32px,5vw,72px)', marginTop: 'clamp(56px,8vw,110px)' }}>
          <Eyebrow>HOW IT WORKS</Eyebrow>
          <h2 style={{ margin: '14px 0 clamp(36px,5vw,56px)', fontSize: 'clamp(26px,4vw,46px)', letterSpacing: '-0.03em', fontWeight: 700 }}>완성으로 이어지는 4단계 학습</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 'clamp(24px,3vw,40px)' }}>
            {PROCESS.map((p, i) => (
              <Reveal key={p.n} delay={i * 70}>
                <div style={{ fontWeight: 800, fontSize: 18, color: C.orange, marginBottom: 16 }}>{p.n}</div>
                <div style={{ height: 2, background: 'rgba(255,106,26,0.3)', marginBottom: 18 }} />
                <h3 style={{ margin: '0 0 8px', fontSize: 19, fontWeight: 700 }}>{p.t}</h3>
                <p style={{ margin: 0, color: '#6B7178', fontSize: 14, lineHeight: 1.6 }}>{p.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section style={{ padding: '0 clamp(20px,5vw,56px) clamp(64px,10vw,120px)', background: '#fff' }}>
        <div style={{ maxWidth: 1480, margin: '0 auto', background: 'linear-gradient(135deg,#3D7BFF,#1A39C0)', borderRadius: 32, padding: 'clamp(48px,7vw,104px)', textAlign: 'center', color: '#fff', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -70, left: -40, width: 220, height: 220, borderRadius: 99, border: '32px solid rgba(255,255,255,0.1)', animation: 'spinSlow 24s linear infinite' }} />
          <img src="/assets/orn-bowtie.svg" alt="" style={{ position: 'absolute', right: -30, bottom: -30, width: 280, height: 280, opacity: 0.18, filter: 'brightness(3)' }} />
          <h2 style={{ position: 'relative', margin: 0, fontSize: 'clamp(30px,5.5vw,76px)', lineHeight: 1, letterSpacing: '-0.035em', textTransform: 'uppercase', fontWeight: 300 }}>
            Start<br /><span style={{ fontWeight: 800 }}>Building Today</span>
          </h2>
          <p style={{ position: 'relative', margin: '22px auto 0', maxWidth: 460, fontSize: 'clamp(15px,2vw,18px)', color: 'rgba(255,255,255,0.88)' }}>구글 또는 카카오 계정으로 30초 만에 시작하고, 학습 진도를 저장하세요.</p>
          <Link to="/login" className="btn-ghost-d" style={{ position: 'relative', display: 'inline-block', marginTop: 34, padding: '18px 40px', borderRadius: 60, background: '#fff', color: '#1A39C0', fontSize: 17, fontWeight: 700 }}>무료로 시작하기 →</Link>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <Faq />
    </main>
  )
}

function Faq() {
  const [open, setOpen] = useState(0)
  return (
    <section style={{ background: C.ink, color: '#fff', padding: 'clamp(56px,8vw,116px) 0' }}>
      <div style={{ maxWidth: 1480, margin: '0 auto', padding: '0 clamp(20px,5vw,56px)' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(22px,2.6vw,38px)', alignItems: 'stretch' }}>
          <div style={{ flex: '1 1 440px', minWidth: 300 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 18, marginBottom: 'clamp(26px,4vw,44px)' }}>
              <h2 style={{ margin: 0, fontSize: 'clamp(46px,6.5vw,90px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1 }}>FAQ</h2>
              <span style={{ fontSize: 'clamp(16px,2vw,21px)', color: '#9CA2AD' }}>자주 묻는 질문</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {FAQS.map((f, i) => {
                const isOpen = open === i
                return (
                  <div key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    <button onClick={() => setOpen(isOpen ? -1 : i)} style={{ width: '100%', textAlign: 'left', padding: '24px 6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, color: '#fff' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                        <span style={{ fontWeight: 800, fontSize: 19, color: isOpen ? C.orange : '#4B86FF' }}>Q</span>
                        <span style={{ fontSize: 'clamp(15px,1.8vw,18px)', fontWeight: 600, letterSpacing: '-0.01em' }}>{f.q}</span>
                      </span>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9CA2AD" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, transition: 'transform .3s', transform: isOpen ? 'rotate(180deg)' : 'none' }}><path d="M6 9l6 6 6-6" /></svg>
                    </button>
                    {isOpen && <p style={{ margin: 0, padding: '0 16px 26px 41px', color: '#A4AAB4', fontSize: 15.5, lineHeight: 1.75 }}>{f.a}</p>}
                  </div>
                )
              })}
            </div>
          </div>
          <div style={{ flex: '1 1 340px', minWidth: 280, display: 'flex', flexDirection: 'column', gap: 18 }}>
            <Link to="/curriculum" className="cta-pill" style={{ background: grad.blueSoft, borderRadius: 24, padding: 'clamp(30px,3.4vw,44px)', color: '#fff', position: 'relative', overflow: 'hidden', flex: 1.3, minHeight: 280, display: 'flex', flexDirection: 'column' }}>
              <img src="/assets/silk.svg" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3, filter: 'invert(1)' }} />
              <div style={{ position: 'relative', fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', opacity: 0.85 }}>CURRICULUM</div>
              <h3 style={{ position: 'relative', margin: '16px 0 0', fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, lineHeight: 1.22 }}>{TOTAL_CHAPTERS}개 챕터를<br />한눈에 보기</h3>
              <p style={{ position: 'relative', margin: '16px 0 auto', fontSize: 15, color: 'rgba(255,255,255,0.85)' }}>나에게 맞는 강의를 골라보세요.</p>
              <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 24, padding: '12px 12px 12px 22px', borderRadius: 60, background: 'rgba(255,255,255,0.16)' }}>
                <span style={{ fontWeight: 700, fontSize: 15 }}>커리큘럼 보기</span>
                <span style={{ width: 40, height: 40, borderRadius: 99, background: grad.blue, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17 }}>→</span>
              </div>
            </Link>
            <Link to="/about" className="cta-pill" style={{ background: grad.orange, borderRadius: 24, padding: 'clamp(30px,3.4vw,44px)', color: '#fff', position: 'relative', overflow: 'hidden', flex: 1, minHeight: 220, display: 'flex', flexDirection: 'column' }}>
              <img src="/assets/orn-rings.svg" alt="" style={{ position: 'absolute', right: -20, bottom: -20, width: 200, height: 200, opacity: 0.3, filter: 'brightness(2.5)' }} />
              <div style={{ position: 'relative', fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', opacity: 0.85 }}>ABOUT</div>
              <h3 style={{ position: 'relative', margin: '16px 0 0', fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, lineHeight: 1.22 }}>부트캠프는<br />어떻게 다른가</h3>
              <p style={{ position: 'relative', margin: '16px 0 auto', fontSize: 15, color: 'rgba(255,255,255,0.9)' }}>부트캠프의 학습 철학을 확인하세요.</p>
              <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 24, padding: '12px 12px 12px 22px', borderRadius: 60, background: 'rgba(255,255,255,0.2)' }}>
                <span style={{ fontWeight: 700, fontSize: 15 }}>소개 보기</span>
                <span style={{ width: 40, height: 40, borderRadius: 99, background: 'rgba(255,255,255,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17 }}>→</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
