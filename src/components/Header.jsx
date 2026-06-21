import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Logo from './Logo'
import { grad } from '../theme'
import { useAuth } from '../hooks/useAuth'

// 단일 라벨(한글) · 한 줄 구성. 트랙 4종도 그대로 노출, 드롭다운 없음.
const NAV = [
  { to: '/about', label: '소개', en: 'ABOUT' },
  { to: '/curriculum', label: '커리큘럼', en: 'CURRICULUM' },
  { to: '/track/web', label: '웹기초', en: 'WEB', track: true },
  { to: '/track/react', label: '프론트엔드', en: 'REACT', track: true },
  { to: '/track/ai', label: 'AI', en: 'AI', track: true },
  { to: '/track/ops', label: '배포', en: 'DEPLOY', track: true },
  { to: '/projects', label: '프로젝트', en: 'PROJECTS' },
  { to: '/quiz', label: '퀴즈', en: 'QUIZ' },
  { to: '/resources', label: '자료', en: 'RESOURCES' },
  { to: '/coaching', label: '코칭·가이드', en: 'COACHING' },
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

  const mains = NAV.filter((n) => !n.track)
  const tracks = NAV.filter((n) => n.track)

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
          <div style={{ padding: '0 clamp(16px,2vw,28px)', height: 70, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 18 }}>
            <Link to="/" aria-label="홈"><Logo /></Link>

            {/* 데스크톱: 단일 라벨 한 줄 */}
            <nav className="desknav" style={{ alignItems: 'center', gap: 'clamp(13px,1.5vw,24px)' }}>
              {NAV.map((n) => {
                const active = loc.pathname.startsWith(n.to)
                return (
                  <Link key={n.to} to={n.to} className="navlink"
                    style={{ position: 'relative', fontSize: 15.5, fontWeight: active ? 700 : 600, letterSpacing: '-0.01em', color: active ? '#1A45D8' : '#15171C', whiteSpace: 'nowrap' }}>
                    {n.label}
                    {active && <span style={{ position: 'absolute', left: 0, right: 0, bottom: -10, height: 2, borderRadius: 2, background: '#1A45D8' }} />}
                  </Link>
                )
              })}
            </nav>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Link to={user ? '/me' : '/login'} className="desknav cta-pill"
                style={{ padding: '12px 20px', borderRadius: 60, background: grad.blue, color: '#fff', fontSize: 14.5, fontWeight: 700, letterSpacing: '0.01em', whiteSpace: 'nowrap', boxShadow: '0 8px 22px rgba(26,69,216,0.3)' }}>
                {user ? '내 학습' : '로그인'}
              </Link>
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

      {/* 모바일 풀스크린 메뉴 */}
      {menuOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 70, background: '#0A0B0D', color: '#fff', animation: 'revealFade .25s both', padding: '96px clamp(20px,6vw,40px) 40px', display: 'flex', flexDirection: 'column' }}>
          <button onClick={() => setMenuOpen(false)} aria-label="닫기"
            style={{ position: 'absolute', top: 26, right: 24, width: 46, height: 46, borderRadius: 14, border: '1px solid rgba(255,255,255,0.2)', color: '#fff', fontSize: 22 }}>✕</button>

          {mains.slice(0, 2).map((n) => (
            <button key={n.to} onClick={() => nav(n.to)}
              style={{ textAlign: 'left', padding: '16px 0', borderBottom: '1px solid rgba(255,255,255,0.12)', fontSize: 28, fontWeight: 300, letterSpacing: '0.02em', color: '#fff' }}>
              {n.label} <span style={{ fontSize: 14, color: '#777', marginLeft: 8 }}>{n.en}</span>
            </button>
          ))}

          {/* 학습 트랙 그룹 */}
          <div style={{ padding: '18px 0 8px', borderBottom: '1px solid rgba(255,255,255,0.12)' }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.14em', color: '#FF6A1A', marginBottom: 12 }}>학습 트랙</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {tracks.map((n) => (
                <button key={n.to} onClick={() => nav(n.to)}
                  style={{ textAlign: 'left', padding: '12px 14px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.14)', background: 'rgba(255,255,255,0.05)', color: '#fff' }}>
                  <div style={{ fontSize: 16, fontWeight: 600 }}>{n.label}</div>
                  <div style={{ fontSize: 12, color: '#9CA2AD', marginTop: 2 }}>{n.en}</div>
                </button>
              ))}
            </div>
          </div>

          {mains.slice(2).map((n) => (
            <button key={n.to} onClick={() => nav(n.to)}
              style={{ textAlign: 'left', padding: '16px 0', borderBottom: '1px solid rgba(255,255,255,0.12)', fontSize: 28, fontWeight: 300, letterSpacing: '0.02em', color: '#fff' }}>
              {n.label} <span style={{ fontSize: 14, color: '#777', marginLeft: 8 }}>{n.en}</span>
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
