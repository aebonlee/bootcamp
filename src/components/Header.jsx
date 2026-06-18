import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Logo from './Logo'
import { grad } from '../theme'
import { useAuth } from '../hooks/useAuth'

// 학습 흐름 순서: 소개 → 커리큘럼 → 트랙(프론트·AI·배포) → 자료 → 프로젝트(적용) → 퀴즈(검증)
const NAV = [
  { to: '/about', label: 'ABOUT', ko: '소개' },
  { to: '/curriculum', label: 'CURRICULUM', ko: '커리큘럼' },
  { to: '/track/web', label: 'WEB', ko: '웹 기초' },
  { to: '/track/react', label: 'REACT', ko: '프론트엔드' },
  { to: '/track/ai', label: 'AI', ko: 'AI 서비스' },
  { to: '/track/ops', label: 'DEPLOY', ko: '배포·협업' },
  { to: '/resources', label: 'RESOURCES', ko: '자료·실습' },
  { to: '/projects', label: 'PROJECTS', ko: '프로젝트' },
  { to: '/quiz', label: 'QUIZ', ko: '복습·퀴즈' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const loc = useLocation()
  const nav = useNavigate()
  const { user } = useAuth()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  useEffect(() => setMenuOpen(false), [loc.pathname])

  return (
    <>
      <div style={{ position: 'sticky', top: 0, zIndex: 60, padding: '14px clamp(12px,3vw,28px) 0' }}>
        <header
          style={{
            maxWidth: 1480, margin: '0 auto',
            background: scrolled ? 'rgba(255,255,255,0.82)' : 'rgba(255,255,255,0.7)',
            backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(10,11,13,0.08)', borderRadius: 60,
            boxShadow: scrolled ? '0 10px 30px rgba(10,11,13,0.08)' : 'none',
            transition: 'background .4s, box-shadow .4s',
          }}
        >
          <div style={{ padding: '0 clamp(16px,2vw,28px)', height: 70, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
            <Link to="/" aria-label="홈"><Logo /></Link>

            <nav className="desknav" style={{ alignItems: 'center', gap: 'clamp(12px,1.6vw,28px)' }}>
              {NAV.map((n) => {
                const active = loc.pathname.startsWith(n.to)
                return (
                  <Link key={n.to} to={n.to} className="navlink"
                    style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', lineHeight: 1.08, color: '#15171C' }}>
                    <span style={{ fontSize: 15.5, fontWeight: 600, letterSpacing: '0.04em' }}>{n.label}</span>
                    <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.02em', color: '#1A45D8', marginTop: 1.5 }}>{n.ko}</span>
                    {active && <span style={{ position: 'absolute', left: 0, right: 0, bottom: -9, height: 2, borderRadius: 2, background: '#1A45D8' }} />}
                  </Link>
                )
              })}
            </nav>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              {user ? (
                <Link to="/me" className="desknav cta-pill"
                  style={{ padding: '12px 22px', borderRadius: 60, background: grad.blue, color: '#fff', fontSize: 14.5, fontWeight: 700, letterSpacing: '0.02em', boxShadow: '0 8px 22px rgba(26,69,216,0.3)' }}>
                  내 학습
                </Link>
              ) : (
                <Link to="/login" className="desknav cta-pill"
                  style={{ padding: '12px 22px', borderRadius: 60, background: grad.blue, color: '#fff', fontSize: 14.5, fontWeight: 700, letterSpacing: '0.02em', boxShadow: '0 8px 22px rgba(26,69,216,0.3)' }}>
                  로그인 / 시작하기
                </Link>
              )}
              <button className="burger" onClick={() => setMenuOpen(true)} aria-label="메뉴"
                style={{ width: 46, height: 46, borderRadius: 14, border: '1px solid rgba(10,11,13,0.14)', display: 'none', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 5 }}>
                <span style={{ width: 20, height: 2, background: 'currentColor', borderRadius: 2 }} />
                <span style={{ width: 20, height: 2, background: 'currentColor', borderRadius: 2 }} />
                <span style={{ width: 13, height: 2, background: 'currentColor', borderRadius: 2 }} />
              </button>
            </div>
          </div>
        </header>
      </div>

      {menuOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 70, background: '#0A0B0D', color: '#fff', animation: 'revealFade .25s both', padding: '96px clamp(20px,6vw,40px) 40px', display: 'flex', flexDirection: 'column' }}>
          <button onClick={() => setMenuOpen(false)} aria-label="닫기"
            style={{ position: 'absolute', top: 26, right: 24, width: 46, height: 46, borderRadius: 14, border: '1px solid rgba(255,255,255,0.2)', color: '#fff', fontSize: 22 }}>✕</button>
          {NAV.map((n) => (
            <button key={n.to} onClick={() => nav(n.to)}
              style={{ textAlign: 'left', padding: '18px 0', borderBottom: '1px solid rgba(255,255,255,0.12)', fontSize: 30, fontWeight: 300, letterSpacing: '0.02em', color: '#fff' }}>
              {n.label} <span style={{ fontSize: 15, color: '#777', marginLeft: 8 }}>{n.ko}</span>
            </button>
          ))}
          <button onClick={() => nav(user ? '/me' : '/login')}
            style={{ marginTop: 28, padding: 20, borderRadius: 60, background: grad.blue, color: '#fff', fontSize: 18, fontWeight: 700, letterSpacing: '0.04em' }}>
            {user ? '내 학습 →' : '로그인 / 시작하기 →'}
          </button>
        </div>
      )}
    </>
  )
}
