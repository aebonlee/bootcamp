import { useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { C, grad } from '../theme'
import { getProject } from '../data/projects'
import { PROJECT_CODE } from '../data/projectCode'
import { DEMOS } from '../demos'
import { getChapter } from '../data/curriculum'
import { Eyebrow, TagRow } from '../components/ui'
import CodeBlock from '../components/CodeBlock'

const TRACK_META = {
  react: { label: 'React', color: '#1A45D8', grad: grad.blue },
  ai: { label: 'AI', color: '#E0470A', grad: 'linear-gradient(135deg,#FF7A1E,#E0470A)' },
  fullstack: { label: '풀스택', color: '#7A3CF0', grad: 'linear-gradient(135deg,#9B6BFF,#6A2BD9)' },
  ops: { label: '배포', color: '#0E8F63', grad: 'linear-gradient(135deg,#22C58A,#0E8F63)' },
}
const LEVEL_COLOR = { 입문: '#16A34A', 중급: '#1A45D8', 고급: '#E0470A' }
const chBadge = (t) => (t === 'ai' ? 'AI' : t === 'ops' ? 'Deploy' : 'React')

export default function ProjectDetail() {
  const { id } = useParams()
  const p = getProject(id)
  const [tab, setTab] = useState(0)
  if (!p) return <Navigate to="/projects" replace />

  const tm = TRACK_META[p.track]
  const demo = DEMOS[id]
  const code = PROJECT_CODE[id]
  const files = (demo?.files || code?.files || [])
  const result = code?.result
  const Demo = demo?.Component

  return (
    <main style={{ background: '#fff', color: C.ink }}>
      {/* HERO */}
      <section style={{ background: 'linear-gradient(160deg,#16224A,#0A0B0D)', color: '#fff', position: 'relative', overflow: 'hidden' }}>
        <img src="/assets/silk.svg" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.16 }} />
        <div style={{ position: 'relative', maxWidth: 1080, margin: '0 auto', padding: 'clamp(40px,6vw,84px) clamp(20px,5vw,56px) clamp(34px,5vw,56px)' }}>
          <Link to="/projects" style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.72)', fontWeight: 600 }}>← 프로젝트</Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 16 }}>
            <span style={{ fontSize: 11.5, fontWeight: 700, padding: '4px 11px', borderRadius: 60, background: 'rgba(255,255,255,0.12)', color: '#fff' }}>{p.level}</span>
            <span style={{ fontSize: 11.5, fontWeight: 700, padding: '4px 11px', borderRadius: 60, background: 'rgba(255,255,255,0.12)', color: '#fff' }}>{tm.label}</span>
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginLeft: 4 }}>{p.duration}</span>
          </div>
          <h1 style={{ margin: '14px 0 0', fontSize: 'clamp(28px,4.5vw,52px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1 }}>{p.title}</h1>
          <p style={{ margin: '18px 0 0', maxWidth: 720, fontSize: 'clamp(15px,2vw,17px)', lineHeight: 1.75, color: 'rgba(255,255,255,0.85)' }}>{p.summary}</p>
          <div style={{ marginTop: 22 }}><TagRow tags={p.stack} color="#8FB4FF" /></div>
        </div>
      </section>

      {/* 구현 미리보기 */}
      <section style={{ maxWidth: 1080, margin: '0 auto', padding: 'clamp(40px,6vw,64px) clamp(20px,5vw,56px) 0' }}>
        <Eyebrow color={tm.color}>{Demo ? 'LIVE DEMO' : 'PREVIEW'}</Eyebrow>
        <h2 style={{ margin: '12px 0 6px', fontSize: 'clamp(22px,3vw,30px)', fontWeight: 800, letterSpacing: '-0.02em' }}>구현된 상태 확인</h2>
        <p style={{ margin: '0 0 22px', fontSize: 14.5, color: '#6B7178' }}>
          {Demo ? '아래는 실제로 동작하는 데모입니다. 직접 눌러보세요.' : '백엔드·AI·배포 프로젝트는 서버 실행이 필요해 예상 결과를 미리 보여드립니다.'}
        </p>

        {/* 브라우저 프레임 */}
        <div style={{ border: '1px solid #e6e8ec', borderRadius: 16, overflow: 'hidden', boxShadow: '0 20px 50px rgba(10,11,13,0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '11px 16px', background: '#f3f4f6', borderBottom: '1px solid #e6e8ec' }}>
            <span style={{ width: 11, height: 11, borderRadius: 99, background: '#ff5f57' }} />
            <span style={{ width: 11, height: 11, borderRadius: 99, background: '#febc2e' }} />
            <span style={{ width: 11, height: 11, borderRadius: 99, background: '#28c840' }} />
            <span style={{ marginLeft: 10, fontSize: 12.5, color: '#9CA2AD' }}>{Demo ? 'localhost:5173' : (result?.title || '예상 결과')}</span>
          </div>
          <div style={{ padding: 'clamp(22px,3vw,36px)', background: '#fff' }}>
            {Demo ? <Demo />
              : result ? <ResultPreview result={result} accent={tm.color} />
              : <p style={{ color: '#9CA2AD', textAlign: 'center' }}>미리보기 준비 중</p>}
          </div>
        </div>
      </section>

      {/* 구현 코드 */}
      {files.length > 0 && (
        <section style={{ maxWidth: 1080, margin: '0 auto', padding: 'clamp(40px,6vw,60px) clamp(20px,5vw,56px) 0' }}>
          <Eyebrow color={tm.color}>SOURCE CODE</Eyebrow>
          <h2 style={{ margin: '12px 0 20px', fontSize: 'clamp(22px,3vw,30px)', fontWeight: 800, letterSpacing: '-0.02em' }}>실제 구현 코드</h2>
          {files.length > 1 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
              {files.map((f, i) => (
                <button key={f.name} onClick={() => setTab(i)} style={{
                  padding: '8px 16px', borderRadius: 10, fontSize: 13.5, fontWeight: 600, fontFamily: 'ui-monospace, Menlo, monospace',
                  background: tab === i ? C.ink : '#f1f3f6', color: tab === i ? '#fff' : '#4a4f57',
                }}>{f.name}</button>
              ))}
            </div>
          )}
          {files[tab] && (
            <>
              {files.length === 1 && <div style={{ fontSize: 13, fontWeight: 700, color: '#6B7178', marginBottom: 8, fontFamily: 'ui-monospace, Menlo, monospace' }}>{files[0].name}</div>}
              <CodeBlock code={files[tab].code} lang={files[tab].lang} />
            </>
          )}
        </section>
      )}

      {/* 관련 학습 자료 */}
      <section style={{ maxWidth: 1080, margin: '0 auto', padding: 'clamp(40px,6vw,60px) clamp(20px,5vw,56px) clamp(64px,10vw,110px)' }}>
        <Eyebrow color={tm.color}>LEARN</Eyebrow>
        <h2 style={{ margin: '12px 0 8px', fontSize: 'clamp(22px,3vw,30px)', fontWeight: 800, letterSpacing: '-0.02em' }}>관련 학습 자료</h2>
        <p style={{ margin: '0 0 20px', fontSize: 14.5, color: '#6B7178' }}>이 프로젝트에 필요한 개념은 아래 강의에서 학습할 수 있습니다.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 12 }}>
          {p.chapters.map((cid) => {
            const ch = getChapter(cid)
            if (!ch) return null
            return (
              <Link key={cid} to={`/lesson/${cid}`} className="card-link" style={{ display: 'block', border: `1px solid ${C.line}`, borderRadius: 16, padding: '18px 20px', background: '#fff' }}>
                <div style={{ fontSize: 12, fontWeight: 800, color: tm.color }}>{chBadge(ch.track)} · {String(ch.no).padStart(2, '0')}</div>
                <div style={{ margin: '8px 0 4px', fontSize: 15.5, fontWeight: 700, lineHeight: 1.35 }}>{ch.title}</div>
                <div style={{ fontSize: 12.5, color: '#9CA2AD' }}>{ch.sections.length}개 강의 · {ch.duration} →</div>
              </Link>
            )
          })}
        </div>
      </section>
    </main>
  )
}

// 결과 미리보기: kind에 따라 JSON/터미널/설명 카드 렌더
function ResultPreview({ result, accent }) {
  const isCode = result.kind === 'json' || result.kind === 'terminal'
  return (
    <div>
      {isCode ? (
        <div style={{ background: '#0d1117', borderRadius: 12, padding: '16px 18px', overflowX: 'auto' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', color: '#8893A7', marginBottom: 10, textTransform: 'uppercase' }}>{result.kind === 'json' ? 'Response' : 'Terminal'}</div>
          <pre style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: '#A5D6FF', fontFamily: 'ui-monospace, Menlo, monospace', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{result.content}</pre>
        </div>
      ) : (
        <div style={{ borderLeft: `4px solid ${accent}`, background: `${accent}0c`, borderRadius: '0 12px 12px 0', padding: '18px 22px', fontSize: 14.5, lineHeight: 1.75, color: '#3A3F49', whiteSpace: 'pre-wrap' }}>
          {result.content}
        </div>
      )}
    </div>
  )
}
