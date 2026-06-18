import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Curriculum from './pages/Curriculum'
import Track from './pages/Track'
import Lesson from './pages/Lesson'
import Resources from './pages/Resources'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import Quiz from './pages/Quiz'
import Login from './pages/Login'
import MyPage from './pages/MyPage'
import About from './pages/About'
import AuthCallback from './pages/AuthCallback'
import NotFound from './pages/NotFound'

function ScrollTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  const loc = useLocation()
  const bare = loc.pathname === '/login' || loc.pathname === '/auth/callback'
  return (
    <>
      <ScrollTop />
      {!bare && <Header />}
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
      {!bare && <Footer />}
    </>
  )
}
