import { useState } from 'react'

const COLUMNS = [
  { id: 'todo', title: '할 일' },
  { id: 'doing', title: '진행중' },
  { id: 'done', title: '완료' },
]

// 칸반 보드 — 컬럼별 카드 상태를 객체로 관리, 버튼으로 카드 이동
export default function KanbanApp() {
  const [cards, setCards] = useState([
    { id: 1, text: 'UI 설계', col: 'todo' },
    { id: 2, text: 'API 연동', col: 'doing' },
    { id: 3, text: '프로젝트 셋업', col: 'done' },
  ])

  // 카드를 다음/이전 컬럼으로 이동 (불변성 유지)
  const move = (id, dir) => setCards((prev) => prev.map((c) => {
    if (c.id !== id) return c
    const i = COLUMNS.findIndex((k) => k.id === c.col)
    const ni = Math.min(COLUMNS.length - 1, Math.max(0, i + dir))
    return { ...c, col: COLUMNS[ni].id }
  }))

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10 }}>
      {COLUMNS.map((col, ci) => (
        <div key={col.id} style={{ background: '#f6f7f9', borderRadius: 12, padding: 10, minHeight: 180 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#4a4f57', marginBottom: 10, paddingLeft: 4 }}>{col.title}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {cards.filter((c) => c.col === col.id).map((c) => (
              <div key={c.id} style={{ background: '#fff', border: '1px solid #eceef2', borderRadius: 10, padding: '10px 12px' }}>
                <div style={{ fontSize: 13.5, fontWeight: 600, marginBottom: 8 }}>{c.text}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <button onClick={() => move(c.id, -1)} disabled={ci === 0} style={{ fontSize: 16, color: ci === 0 ? '#d8dce3' : '#1A45D8' }}>‹</button>
                  <button onClick={() => move(c.id, 1)} disabled={ci === 2} style={{ fontSize: 16, color: ci === 2 ? '#d8dce3' : '#1A45D8' }}>›</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
