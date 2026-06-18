// 프로필 카드 갤러리 — 배열 데이터를 map으로 반복 렌더링, props로 카드에 전달
const MEMBERS = [
  { id: 1, name: '김리액트', role: '프론트엔드', emoji: '🧑‍💻', active: true },
  { id: 2, name: '이파이', role: 'AI 엔지니어', emoji: '👩‍🔬', active: true },
  { id: 3, name: '박배포', role: 'DevOps', emoji: '🧑‍🔧', active: false },
  { id: 4, name: '최풀스택', role: '풀스택', emoji: '🧑‍🚀', active: true },
]

// 재사용 카드 컴포넌트 — 필요한 값만 props로 받음
function Card({ name, role, emoji, active }) {
  return (
    <div style={{ border: '1px solid #eceef2', borderRadius: 16, padding: 20, textAlign: 'center', background: '#fff' }}>
      <div style={{ width: 56, height: 56, borderRadius: 99, background: '#eef1f8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, margin: '0 auto 12px' }}>{emoji}</div>
      <div style={{ fontSize: 16, fontWeight: 800 }}>{name}</div>
      <div style={{ fontSize: 13, color: '#6B7178', marginTop: 4 }}>{role}</div>
      {/* 조건부 렌더링: 재직 상태 배지 */}
      <span style={{ display: 'inline-block', marginTop: 10, fontSize: 11.5, fontWeight: 700, padding: '3px 10px', borderRadius: 60, background: active ? '#dcfce7' : '#f1f3f6', color: active ? '#16A34A' : '#9CA2AD' }}>
        {active ? '재직중' : '휴직'}
      </span>
    </div>
  )
}

export default function ProfileApp() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(140px,1fr))', gap: 12 }}>
      {MEMBERS.map((m) => (
        <Card key={m.id} name={m.name} role={m.role} emoji={m.emoji} active={m.active} />
      ))}
    </div>
  )
}
