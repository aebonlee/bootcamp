import { Routes, Route, useLocation } from 'react-router-dom'
import { lazy, Suspense, useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'

// 라우트 단위 코드 분할 — 무거운 페이지(강의 본문 렌더러·구문강조 등)를 지연 로드해 초기 번들 경량화
const Curriculum = lazy(() => import('./pages/Curriculum'))
const Track = lazy(() => import('./pages/Track'))
const Lesson = lazy(() => import('./pages/Lesson'))
const Resources = lazy(() => import('./pages/Resources'))
const Projects = lazy(() => import('./pages/Projects'))
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'))
const Quiz = lazy(() => import('./pages/Quiz'))
const Login = lazy(() => import('./pages/Login'))
const MyPage = lazy(() => import('./pages/MyPage'))
const About = lazy(() => import('./pages/About'))
const AuthCallback = lazy(() => import('./pages/AuthCallback'))
const NotFound = lazy(() => import('./pages/NotFound'))

function ScrollTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function Loading() {
  return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: 38, height: 38, borderRadius: 99, border: '3px solid #e6e8ec', borderTopColor: '#1A45D8', animation: 'spinSlow .8s linear infinite' }} />
    </div>
  )
}

export default function App() {
  const loc = useLocation()
  const bare = loc.pathname === '/login' || loc.pathname === '/auth/callback'
  return (
    <>
      <ScrollTop />
      {!bare && <Header />}
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/curriculum" element={<Curriculum />} />
          <Route path="/track/:track" element={<Track />} />
          <Route path="/lesson/:id" element={<Lesson />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/me" element={<MyPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      {!bare && <Footer />}
    </>
  )
}
