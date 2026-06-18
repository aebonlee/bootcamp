import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { C, grad, trackColor } from '../theme'
import { CHAPTERS, TRACKS, getChapter } from '../data/curriculum'
import { QUIZZES, GLOSSARY, quizOf, TOTAL_QUIZ, TOTAL_TERMS } from '../data/review'
import { Eyebrow } from '../components/ui'
import Reveal from '../components/Reveal'
import { useAuth } from '../hooks/useAuth'
import { fetchQuizResults, saveQuizResult } from '../lib/db'

// 트랙별 짧은 배지 라벨
const TRACK_BADGE = { web: 'Web', react: 'React', ai: 'AI', ops: 'Deploy' }

export default function Quiz() {
  const [tab, setTab] = useState('terms')
  return (
    <main style={{ background: '#fff', minHeight: '100vh' }}>
      {/* HERO */}
      <section style={{ position: 'relative', overflow: 'hidden', background: C.ink, color: '#fff' }}>
        <img src="/assets/silk.svg" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.12 }} />
        <div style={{ position: 'relative', maxWidth: 1180, margin: '0 auto', padding: 'clamp(48px,7vw,100px) clamp(20px,5vw,56px) 0' }}>
          <Eyebrow>REVIEW &amp; QUIZ</Eyebrow>
          <h1 style={{ margin: '14px 0 0', fontSize: 'clamp(32px,6.5vw,92px)', lineHeight: 0.96, letterSpacing: '-0.04em', fontWeight: 300, textTransform: 'uppercase' }}>
            복습 &amp; <span style={{ fontWeight: 800 }}>퀴즈</span>
          </h1>
          <p style={{ margin: '22px 0 0', maxWidth: 660, fontSize: 'clamp(15px,2vw,18px)', lineHeight: 1.7, color: '#9CA2AD' }}>
            핵심 용어 {TOTAL_TERMS}개로 개념을 정리하고, {TOTAL_QUIZ}개의 퀴즈로 이해도를 직접 검증하세요.
          </p>
          {/* TABS */}
          <div style={{ display: 'flex', gap: 6, marginTop: 'clamp(28px,4vw,40px)' }}>
            {[['terms', '핵심 용어', TOTAL_TERMS], ['quiz', '퀴즈', TOTAL_QUIZ]].map(([id, label, n]) => {
              const active = tab === id
              return (
                <button key={id} onClick={() => setTab(id)} style={{
                  padding: '12px 24px', borderRadius: '14px 14px 0 0', fontSize: 15, fontWeight: 700,
                  background: active ? '#fff' : 'rgba(255,255,255,0.06)', color: active ? C.ink : '#C7CCD6',
                  border: 'none', transition: 'all .2s',
                }}>{label} <span style={{ fontSize: 12, opacity: 0.6 }}>{n}</span></button>
              )
            })}
          </div>
        </div>
      </section>

      {tab === 'terms' ? <Glossary /> : <QuizRunner />}
    </main>
  )
}

/* ===================== 핵심 용어 ===================== */
function Glossary() {
  const [q, setQ] = useState('')
  const [tf, setTf] = useState('all')
  const filtered = GLOSSARY.filter((g) => {
    if (tf !== 'all' && g.track !== tf) return false
    if (!q.trim()) return true
    const s = q.trim().toLowerCase()
    return g.term.toLowerCase().includes(s) || g.def.toLowerCase().includes(s)
  })

  return (
    <section style={{ maxWidth: 1180, margin: '0 auto', padding: 'clamp(32px,4vw,52px) clamp(20px,5vw,56px) clamp(64px,10vw,110px)' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center', marginBottom: 28 }}>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="용어 검색 (예: JSX, FastAPI, useState)"
          style={{ flex: '1 1 280px', padding: '13px 18px', borderRadius: 12, border: `1px solid ${C.line}`, fontSize: 15, outline: 'none', background: C.cream }} />
        <div style={{ display: 'flex', gap: 8 }}>
          {[['all', '전체'], ['web', '웹 기초'], ['react', 'React'], ['ai', 'AI'], ['ops', '배포']].map(([id, label]) => {
            const active = tf === id
            return (
              <button key={id} onClick={() => setTf(id)} style={{
                padding: '11px 18px', borderRadius: 60, fontSize: 14, fontWeight: 600,
                background: active ? C.ink : '#fff', color: active ? '#fff' : '#4A4F57',
                border: `1px solid ${active ? C.ink : C.line}`, transition: 'all .2s',
              }}>{label}</button>
            )
          })}
        </div>
      </div>
      <p style={{ margin: '0 0 18px', fontSize: 13.5, color: '#9CA2AD' }}>{filtered.length}개 용어</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 14 }}>
        {filtered.map((g, i) => {
          const tc = trackColor(g.track)
          const ch = getChapter(g.chapter)
          return (
            <Reveal key={g.term + i} delay={(i % 6) * 30} style={{ border: `1px solid ${C.line}`, borderRadius: 16, padding: '20px 22px', background: '#fff' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 10 }}>
                <h3 style={{ margin: 0, fontSize: 17, fontWeight: 800, color: tc, letterSpacing: '-0.01em' }}>{g.term}</h3>
                {ch && <Link to={`/lesson/${g.chapter}`} style={{ fontSize: 11.5, fontWeight: 600, color: '#9CA2AD' }}>{TRACK_BADGE[g.track]} {String(ch.no).padStart(2, '0')} →</Link>}
              </div>
              <p style={{ margin: '10px 0 0', fontSize: 14, lineHeight: 1.65, color: '#3A3F49' }}>{g.def}</p>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}

/* ===================== 퀴즈 ===================== */
function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function buildQuestions(scope) {
  if (scope === 'random') {
    const all = []
    for (const id of Object.keys(QUIZZES)) QUIZZES[id].forEach((qq) => all.push({ ...qq, chapter: id }))
    return shuffle(all).slice(0, 10)
  }
  return quizOf(scope).map((qq) => ({ ...qq, chapter: scope }))
}

function bestKey(scope) { return `webpro_quizbest_${scope}` }
const lsGet = (scope) => { try { return Number(localStorage.getItem(bestKey(scope)) || 0) } catch { return 0 } }
const lsSet = (scope, pct) => { try { localStorage.setItem(bestKey(scope), String(pct)) } catch { /* noop */ } }

function QuizRunner() {
  const { user } = useAuth()
  const [scope, setScope] = useState('')
  const [questions, setQuestions] = useState([])
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [bests, setBests] = useState({}) // scope -> 최고 %

  // 로그인 시 서버에서 최고 점수 로드(실패하면 로컬 폴백 유지)
  useEffect(() => {
    let on = true
    if (!user) return
    fetchQuizResults(user.id).then((map) => { if (on) setBests((prev) => ({ ...prev, ...map })) })
    return () => { on = false }
  }, [user])

  const bestOf = (sc) => Math.max(bests[sc] || 0, lsGet(sc))

  const start = (sc) => {
    setScope(sc)
    setQuestions(buildQuestions(sc))
    setAnswers({})
    setSubmitted(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const score = useMemo(() => questions.reduce((n, qq, i) => n + (answers[i] === qq.answer ? 1 : 0), 0), [questions, answers, submitted])

  const submit = () => {
    setSubmitted(true)
    const pct = Math.round((score / questions.length) * 100)
    const prev = bestOf(scope)
    const best = Math.max(pct, prev)
    setBests((m) => ({ ...m, [scope]: best }))
    lsSet(scope, best) // 항상 로컬 캐시
    if (user) saveQuizResult(user.id, scope, pct, prev) // 로그인 시 서버 저장
  }

  // 시작 화면(스코프 선택)
  if (!scope) {
    return (
      <section style={{ maxWidth: 1180, margin: '0 auto', padding: 'clamp(32px,4vw,52px) clamp(20px,5vw,56px) clamp(64px,10vw,110px)' }}>
        <button onClick={() => start('random')} className="hov-lift" style={{
          width: '100%', textAlign: 'left', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
          background: grad.blue, color: '#fff', border: 'none', borderRadius: 20, padding: 'clamp(24px,3vw,34px)', marginBottom: 26,
        }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', opacity: 0.85 }}>RANDOM</div>
            <div style={{ fontSize: 'clamp(20px,2.6vw,26px)', fontWeight: 800, marginTop: 6 }}>전체 랜덤 10문항 도전</div>
            <div style={{ fontSize: 14, opacity: 0.9, marginTop: 6 }}>모든 챕터에서 무작위로 출제됩니다.</div>
          </div>
          <span style={{ fontSize: 24 }}>→</span>
        </button>

        {['web', 'react', 'ai', 'ops'].map((tid) => (
          <div key={tid} style={{ marginBottom: 32 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <span style={{ width: 10, height: 10, borderRadius: 99, background: trackColor(tid) }} />
              <h2 style={{ margin: 0, fontSize: 'clamp(18px,2.4vw,22px)', fontWeight: 800 }}>{TRACKS[tid].label}</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: 12 }}>
              {CHAPTERS.filter((c) => c.track === tid).map((c) => {
                const tc = trackColor(tid)
                const n = quizOf(c.id).length
                const best = bestOf(c.id)
                return (
                  <button key={c.id} onClick={() => start(c.id)} className="card-link" style={{ textAlign: 'left', background: '#fff', border: `1px solid ${C.line}`, borderRadius: 16, padding: '18px 20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: 12.5, fontWeight: 800, color: tc }}>CH {String(c.no).padStart(2, '0')}</span>
                      {best > 0 && <span style={{ fontSize: 11.5, fontWeight: 700, color: best === 100 ? tc : '#9CA2AD' }}>최고 {best}%</span>}
                    </div>
                    <div style={{ margin: '8px 0 12px', fontSize: 15, fontWeight: 700, lineHeight: 1.35, color: C.ink }}>{c.title}</div>
                    <div style={{ fontSize: 12.5, color: '#9CA2AD' }}>{n}문항 풀기 →</div>
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </section>
    )
  }

  const allAnswered = questions.every((_, i) => answers[i] !== undefined)
  const pct = Math.round((score / questions.length) * 100)
  const scopeLabel = scope === 'random' ? '전체 랜덤' : `${getChapter(scope)?.title}`

  return (
    <section style={{ maxWidth: 820, margin: '0 auto', padding: 'clamp(32px,4vw,52px) clamp(20px,5vw,56px) clamp(64px,10vw,110px)' }}>
      <button onClick={() => setScope('')} style={{ fontSize: 13.5, color: '#6B7178', fontWeight: 600, marginBottom: 18 }}>← 퀴즈 선택으로</button>
      <h2 style={{ margin: '0 0 6px', fontSize: 'clamp(20px,3vw,28px)', fontWeight: 800, letterSpacing: '-0.02em' }}>{scopeLabel} 퀴즈</h2>
      <p style={{ margin: '0 0 24px', fontSize: 14, color: '#9CA2AD' }}>{questions.length}문항 · 객관식</p>

      {/* 결과 배너 */}
      {submitted && (
        <div style={{ background: pct >= 80 ? 'rgba(22,163,74,0.1)' : pct >= 50 ? 'rgba(26,69,216,0.08)' : 'rgba(224,71,10,0.08)', border: `1px solid ${pct >= 80 ? 'rgba(22,163,74,0.3)' : pct >= 50 ? 'rgba(26,69,216,0.25)' : 'rgba(224,71,10,0.25)'}`, borderRadius: 18, padding: 'clamp(22px,3vw,30px)', marginBottom: 26, textAlign: 'center' }}>
          <div style={{ fontSize: 'clamp(36px,6vw,52px)', fontWeight: 800, letterSpacing: '-0.02em', color: pct >= 80 ? '#16A34A' : pct >= 50 ? C.blueD : '#E0470A' }}>{pct}점</div>
          <div style={{ fontSize: 15, color: '#3A3F49', marginTop: 4 }}>{questions.length}문제 중 {score}개 정답 · {pct >= 80 ? '훌륭해요! 🎉' : pct >= 50 ? '좋아요, 조금만 더!' : '복습이 필요해요'}</div>
          <button onClick={() => start(scope)} className="cta-pill" style={{ marginTop: 18, padding: '11px 26px', borderRadius: 60, background: grad.blue, color: '#fff', fontSize: 14, fontWeight: 700 }}>다시 풀기</button>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {questions.map((qq, i) => {
          const userAns = answers[i]
          return (
            <div key={i} style={{ border: `1px solid ${C.line}`, borderRadius: 18, padding: 'clamp(20px,3vw,28px)', background: '#fff' }}>
              <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
                <span style={{ flexShrink: 0, fontSize: 14, fontWeight: 800, color: C.blueD }}>Q{i + 1}.</span>
                <h3 style={{ margin: 0, fontSize: 16.5, fontWeight: 700, lineHeight: 1.5 }}>{qq.q}</h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                {qq.options.map((opt, oi) => {
                  const chosen = userAns === oi
                  const isCorrect = qq.answer === oi
                  let bg = '#fff', bd = C.line, col = '#2C3037'
                  if (submitted) {
                    if (isCorrect) { bg = 'rgba(22,163,74,0.08)'; bd = 'rgba(22,163,74,0.5)'; col = '#15803D' }
                    else if (chosen) { bg = 'rgba(224,71,10,0.06)'; bd = 'rgba(224,71,10,0.4)'; col = '#C2410C' }
                  } else if (chosen) { bg = 'rgba(26,69,216,0.06)'; bd = C.blue }
                  return (
                    <button key={oi} disabled={submitted} onClick={() => setAnswers((p) => ({ ...p, [i]: oi }))}
                      style={{ textAlign: 'left', display: 'flex', alignItems: 'center', gap: 12, padding: '13px 16px', borderRadius: 12, border: `1.5px solid ${bd}`, background: bg, color: col, fontSize: 14.5, fontWeight: chosen || (submitted && isCorrect) ? 600 : 500, cursor: submitted ? 'default' : 'pointer', transition: 'all .15s' }}>
                      <span style={{ flexShrink: 0, width: 22, height: 22, borderRadius: 99, border: `1.5px solid ${chosen || (submitted && isCorrect) ? 'transparent' : 'rgba(10,11,13,0.2)'}`, background: submitted ? (isCorrect ? '#16A34A' : chosen ? '#E0470A' : 'transparent') : (chosen ? C.blue : 'transparent'), color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800 }}>
                        {submitted ? (isCorrect ? '✓' : chosen ? '✕' : '') : (chosen ? '●' : '')}
                      </span>
                      {opt}
                    </button>
                  )
                })}
              </div>
              {submitted && (
                <div style={{ marginTop: 14, padding: '12px 16px', borderRadius: 12, background: C.cream, fontSize: 13.5, lineHeight: 1.6, color: '#3A3F49' }}>
                  <b style={{ color: C.ink }}>해설</b> · {qq.explain}
                  {qq.chapter && <Link to={`/lesson/${qq.chapter}`} style={{ marginLeft: 8, color: C.blueD, fontWeight: 600 }}>강의 보기 →</Link>}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {!submitted && (
        <button onClick={submit} disabled={!allAnswered} className="cta-pill" style={{ width: '100%', marginTop: 22, padding: '16px', borderRadius: 14, background: allAnswered ? grad.blue : '#C7CCD6', color: '#fff', fontSize: 16, fontWeight: 700, cursor: allAnswered ? 'pointer' : 'not-allowed' }}>
          {allAnswered ? '채점하기' : `모든 문항에 답해주세요 (${Object.keys(answers).length}/${questions.length})`}
        </button>
      )}
    </section>
  )
}
