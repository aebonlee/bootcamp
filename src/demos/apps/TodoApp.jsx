import { useState } from 'react'

// 할 일 관리 Todo 앱 — useState로 추가·완료·삭제, 불변성을 지켜 상태 갱신
export default function TodoApp() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'React 컴포넌트 이해하기', done: true },
    { id: 2, text: 'useState로 상태 관리하기', done: false },
  ])
  const [input, setInput] = useState('')
  const [filter, setFilter] = useState('all') // all | active | done

  // 새 할 일 추가 (기존 배열을 복사해 새 배열 반환 = 불변성)
  const addTodo = () => {
    const text = input.trim()
    if (!text) return
    setTodos([...todos, { id: Date.now(), text, done: false }])
    setInput('')
  }
  // 완료 토글 — 해당 id만 새 객체로 교체
  const toggle = (id) => setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
  // 삭제 — filter로 해당 id 제외
  const remove = (id) => setTodos(todos.filter((t) => t.id !== id))

  const shown = todos.filter((t) => (filter === 'active' ? !t.done : filter === 'done' ? t.done : true))
  const left = todos.filter((t) => !t.done).length

  return (
    <div style={{ fontFamily: 'inherit', maxWidth: 420, margin: '0 auto' }}>
      <h3 style={{ margin: '0 0 14px', fontSize: 20, fontWeight: 800 }}>📝 할 일 목록</h3>
      <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTodo()}
          placeholder="할 일을 입력하고 Enter"
          style={{ flex: 1, padding: '10px 14px', borderRadius: 10, border: '1px solid #d8dce3', fontSize: 14, outline: 'none' }}
        />
        <button onClick={addTodo} style={{ padding: '10px 18px', borderRadius: 10, background: '#1A45D8', color: '#fff', fontWeight: 700, fontSize: 14 }}>추가</button>
      </div>
      <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
        {[['all', '전체'], ['active', '진행'], ['done', '완료']].map(([k, label]) => (
          <button key={k} onClick={() => setFilter(k)} style={{ padding: '6px 12px', borderRadius: 8, fontSize: 12.5, fontWeight: 600, background: filter === k ? '#0A0B0D' : '#f1f3f6', color: filter === k ? '#fff' : '#4a4f57' }}>{label}</button>
        ))}
        <span style={{ marginLeft: 'auto', alignSelf: 'center', fontSize: 12.5, color: '#9CA2AD' }}>남은 일 {left}개</span>
      </div>
      <ul style={{ display: 'flex', flexDirection: 'column', gap: 8, listStyle: 'none', padding: 0, margin: 0 }}>
        {shown.map((t) => (
          <li key={t.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 14px', borderRadius: 10, border: '1px solid #eceef2', background: '#fff' }}>
            <input type="checkbox" checked={t.done} onChange={() => toggle(t.id)} style={{ width: 18, height: 18 }} />
            <span style={{ flex: 1, fontSize: 14.5, textDecoration: t.done ? 'line-through' : 'none', color: t.done ? '#9CA2AD' : '#2c3037' }}>{t.text}</span>
            <button onClick={() => remove(t.id)} style={{ color: '#E0470A', fontSize: 13, fontWeight: 600 }}>삭제</button>
          </li>
        ))}
        {shown.length === 0 && <li style={{ textAlign: 'center', color: '#9CA2AD', fontSize: 14, padding: 20 }}>할 일이 없습니다 🎉</li>}
      </ul>
    </div>
  )
}
