import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const SAMPLE = `# 마크다운 미리보기

**굵게**, *기울임*, \`코드\`를 지원합니다.

- 입력과 동시에
- 실시간으로 변환됩니다

> 인용문도 가능해요.
`

// 실시간 마크다운 미리보기 — 제어 컴포넌트 입력값을 즉시 HTML로 변환
export default function MarkdownApp() {
  const [text, setText] = useState(SAMPLE)
  const words = text.trim() ? text.trim().split(/\s+/).length : 0

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, minHeight: 220 }}>
        {/* 입력: textarea를 state로 제어 */}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{ padding: 14, borderRadius: 12, border: '1px solid #d8dce3', fontSize: 13.5, lineHeight: 1.6, fontFamily: 'ui-monospace, Menlo, monospace', resize: 'vertical', outline: 'none' }}
        />
        {/* 출력: 입력값을 마크다운으로 렌더링 */}
        <div style={{ padding: 14, borderRadius: 12, border: '1px solid #eceef2', background: '#fafafb', fontSize: 14, overflow: 'auto' }}>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
        </div>
      </div>
      <div style={{ marginTop: 10, fontSize: 12.5, color: '#9CA2AD' }}>글자 {text.length}자 · 단어 {words}개</div>
    </div>
  )
}
