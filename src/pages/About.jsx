import { Link } from 'react-router-dom'
import { C, grad } from '../theme'
import { CHAPTERS } from '../data/curriculum'
import { Eyebrow } from '../components/ui'
import Reveal from '../components/Reveal'

const VALUES = [
  { t: '만들 수 있게 되는 학습', d: '이론을 위한 이론이 아니라, 강의가 끝나면 직접 서비스를 만들 수 있도록 실습 중심으로 설계했습니다.' },
  { t: '현업의 순서 그대로', d: '기획·컴포넌트 설계 → 상태관리 → API/인증 → 리팩터링·배포까지, 실제 프로젝트가 흘러가는 순서로 배웁니다.' },
  { t: '프론트와 AI를 한 흐름으로', d: 'React로 화면을 만들고, FastAPI·Hugging Face로 AI를 웹 서비스화하는 풀스택 관점을 갖춥니다.' },
]

export default function About() {
  const totalSec = CHAPTERS.reduce((n, c) => n + c.sections.length, 0)
  return (
    <main style={{ background: '#fff' }}>
      <section style={{ position: 'relative', overflow: 'hidden', background: '#fff' }}>
        <img src="/assets/silk.svg" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'relative', maxWidth: 1080, margin: '0 auto', padding: 'clamp(48px,8vw,120px) clamp(20px,5vw,56px) clamp(40px,6vw,80px)' }}>
          <Eyebrow>ABOUT</Eyebrow>
          <h1 style={{ margin: '14px 0 0', fontSize: 'clamp(34px,7vw,96px)', lineHeight: 0.96, letterSpacing: '-0.04em', fontWeight: 300, textTransform: 'uppercase' }}>
            Join the<br /><span style={{ fontWeight: 800 }}>Bootcamp</span>
          </h1>
          <p style={{ margin: '26px 0 0', maxWidth: 620, fontSize: 'clamp(15px,2vw,19px)', lineHeight: 1.75, color: '#6B7178' }}>
            DreamIT 부트캠프는 DreamIT Biz가 만든 실무형 웹 개발 학습 플랫폼입니다. 웹 기초(HTML·CSS·JS) · React 프론트엔드 · 생성형 AI 웹 서비스 · 실전 배포까지 네 트랙, {CHAPTERS.length}개 챕터 {totalSec}개 강의로 웹 개발의 처음부터 끝까지를 다룹니다.
          </p>
        </div>
      </section>

      <section style={{ background: C.ink, color: '#fff', padding: 'clamp(60px,9vw,128px) 0' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto', padding: '0 clamp(20px,5vw,56px)' }}>
          <Eyebrow>OUR APPROACH</Eyebrow>
          <h2 style={{ margin: '14px 0 clamp(36px,5vw,56px)', fontSize: 'clamp(26px,4vw,48px)', fontWeight: 700, letterSpacing: '-0.03em' }}>부트캠프가 학습을 설계하는 방식</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 18 }}>
            {VALUES.map((v, i) => (
              <Reveal key={v.t} delay={i * 80} className="hov-lift" style={{ background: C.panel, border: '1px solid rgba(255,255,255,0.08)', borderRadius: 22, padding: 'clamp(28px,3vw,38px)', minHeight: 220 }}>
                <div style={{ fontSize: 26, fontWeight: 800, color: C.orange, marginBottom: 18 }}>0{i + 1}</div>
                <h3 style={{ margin: '0 0 12px', fontSize: 20, fontWeight: 700 }}>{v.t}</h3>
                <p style={{ margin: 0, color: '#9CA2AD', fontSize: 14.5, lineHeight: 1.7 }}>{v.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: 'clamp(56px,8vw,110px) clamp(20px,5vw,56px)', background: '#fff' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto', background: grad.blue, borderRadius: 28, padding: 'clamp(40px,6vw,80px)', textAlign: 'center', color: '#fff' }}>
          <h2 style={{ margin: 0, fontSize: 'clamp(26px,4vw,46px)', fontWeight: 800, letterSpacing: '-0.02em' }}>지금, 첫 강의를 시작하세요</h2>
          <p style={{ margin: '16px auto 28px', maxWidth: 420, fontSize: 16, color: 'rgba(255,255,255,0.88)' }}>구글·카카오 로그인으로 진도를 저장하고 끝까지 완주해보세요.</p>
          <Link to="/curriculum" className="btn-ghost-d" style={{ display: 'inline-block', padding: '16px 36px', borderRadius: 60, background: '#fff', color: C.blueD, fontSize: 16, fontWeight: 700 }}>커리큘럼 보기 →</Link>
        </div>
      </section>
    </main>
  )
}
