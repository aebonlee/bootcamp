import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { C, grad } from '../theme'
import Logo from '../components/Logo'
import { signIn, useAuth } from '../hooks/useAuth'

export default function Login() {
  const nav = useNavigate()
  const { user, loading } = useAuth()
  const [busy, setBusy] = useState('')
  const [err, setErr] = useState('')

  useEffect(() => { if (!loading && user) nav('/me', { replace: true }) }, [user, loading, nav])

  const handle = async (provider) => {
    setErr(''); setBusy(provider)
    const { error } = await signIn(provider)
    if (error) { setErr(error.message); setBusy('') }
  }

  return (
    <main style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,420px),1fr))' }}>
      {/* LEFT: brand */}
      <div style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(160deg,#16224A,#0A0B0D)', color: '#fff', padding: 'clamp(40px,6vw,72px)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 320 }}>
        <img src="/assets/silk.svg" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.16 }} />
        <img src="/assets/orn-rings.svg" alt="" style={{ position: 'absolute', right: -40, bottom: -40, width: 260, opacity: 0.2 }} />
        <Link to="/" style={{ position: 'relative' }}><Logo dark /></Link>
        <div style={{ position: 'relative' }}>
          <h2 style={{ margin: 0, fontSize: 'clamp(28px,4vw,46px)', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.03em' }}>
            웹 개발의 처음부터<br />끝까지, 함께.
          </h2>
          <p style={{ margin: '18px 0 0', maxWidth: 360, fontSize: 15.5, lineHeight: 1.7, color: 'rgba(255,255,255,0.8)' }}>
            로그인하면 16개 챕터 62개 강의의 학습 진도가 계정에 저장됩니다.
          </p>
        </div>
      </div>

      {/* RIGHT: auth */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'clamp(40px,6vw,72px)', background: '#fff' }}>
        <div style={{ width: '100%', maxWidth: 380 }}>
          <p style={{ margin: 0, fontSize: 12, fontWeight: 700, letterSpacing: '0.18em', color: C.orange }}>WELCOME</p>
          <h1 style={{ margin: '12px 0 0', fontSize: 'clamp(26px,3.4vw,34px)', fontWeight: 800, letterSpacing: '-0.02em' }}>시작하기</h1>
          <p style={{ margin: '12px 0 32px', fontSize: 15, color: '#6B7178', lineHeight: 1.6 }}>구글 또는 카카오 계정으로 간편하게 가입하고 로그인하세요.</p>

          <button onClick={() => handle('google')} disabled={!!busy} className="hov-lift" style={{
            width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
            padding: '15px', borderRadius: 14, border: '1px solid rgba(10,11,13,0.14)', background: '#fff',
            fontSize: 15.5, fontWeight: 600, color: C.ink, opacity: busy && busy !== 'google' ? 0.5 : 1, marginBottom: 12,
          }}>
            <GoogleIcon /> {busy === 'google' ? '연결 중…' : '구글로 계속하기'}
          </button>

          <button onClick={() => handle('kakao')} disabled={!!busy} className="hov-lift" style={{
            width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
            padding: '15px', borderRadius: 14, border: 'none', background: '#FEE500',
            fontSize: 15.5, fontWeight: 700, color: '#191600', opacity: busy && busy !== 'kakao' ? 0.5 : 1,
          }}>
            <KakaoIcon /> {busy === 'kakao' ? '연결 중…' : '카카오로 계속하기'}
          </button>

          {err && <p style={{ margin: '18px 0 0', color: '#D92D20', fontSize: 13.5, lineHeight: 1.5 }}>로그인 오류: {err}</p>}

          <p style={{ margin: '28px 0 0', fontSize: 12.5, color: '#9CA2AD', lineHeight: 1.6 }}>
            계속 진행하면 DreamIT 부트캠프의 서비스 이용에 동의하는 것으로 간주됩니다.
          </p>
          <Link to="/" style={{ display: 'inline-block', marginTop: 18, fontSize: 14, color: '#6B7178', fontWeight: 600 }}>← 홈으로 돌아가기</Link>
        </div>
      </div>
    </main>
  )
}

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 48 48">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  )
}
function KakaoIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="#191600">
      <path d="M12 3C6.48 3 2 6.58 2 11c0 2.84 1.93 5.33 4.83 6.74-.21.76-.77 2.76-.88 3.19-.14.54.2.53.42.39.17-.11 2.71-1.84 3.81-2.59.58.08 1.18.13 1.82.13 5.52 0 10-3.58 10-8 0-4.42-4.48-8-10-8z" />
    </svg>
  )
}
