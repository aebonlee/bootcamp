import { Link } from 'react-router-dom'
import Logo from './Logo'

export default function Footer() {
  return (
    <footer style={{ background: '#0A0B0D', color: '#fff', padding: 'clamp(48px,7vw,88px) 0 40px' }}>
      <div style={{ maxWidth: 1480, margin: '0 auto', padding: '0 clamp(20px,5vw,56px)' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 40, justifyContent: 'space-between' }}>
          <div style={{ maxWidth: 360 }}>
            <Logo dark />
            <p style={{ margin: '20px 0 0', color: '#9CA2AD', fontSize: 14.5, lineHeight: 1.7 }}>
              React 프론트엔드부터 생성형 AI 웹 서비스까지.<br />
              실무로 이어지는 16개 챕터 · 62개 강의의 웹 개발 학습 플랫폼.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 'clamp(40px,7vw,90px)', flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.16em', color: '#FF6A1A', marginBottom: 18 }}>LEARN</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 14.5, color: '#C7CCD6' }}>
                <Link to="/curriculum">전체 커리큘럼</Link>
                <Link to="/track/react">React 프론트엔드</Link>
                <Link to="/track/ai">AI 웹 서비스</Link>
                <Link to="/resources">자료 · 실습 예제</Link>
                <Link to="/me">내 학습 현황</Link>
              </div>
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.16em', color: '#FF6A1A', marginBottom: 18 }}>INFO</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 14.5, color: '#C7CCD6' }}>
                <Link to="/about">부트캠프 소개</Link>
                <Link to="/login">로그인 / 가입</Link>
                <a href="https://dreamitbiz.com" target="_blank" rel="noreferrer">DreamIT Biz</a>
              </div>
            </div>
          </div>
        </div>
        <div style={{ height: 1, background: 'rgba(255,255,255,0.1)', margin: '40px 0 22px' }} />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'space-between', color: '#6B7178', fontSize: 13 }}>
          <span>© {new Date().getFullYear()} DreamIT Biz. 부트캠프 — 웹개발 학습 플랫폼.</span>
          <span>Powered by React · Vite · Supabase</span>
        </div>
      </div>
    </footer>
  )
}
