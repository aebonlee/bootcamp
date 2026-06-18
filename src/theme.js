// NOVAWORKS 디자인 아티팩트에서 추출한 디자인 토큰
export const C = {
  ink: '#0A0B0D',
  ink2: '#15171C',
  panel: '#101115',
  panel2: '#16181D',
  gray: '#6B7178',
  grayD: '#9CA2AD',
  line: 'rgba(10,11,13,0.08)',
  lineD: 'rgba(255,255,255,0.08)',
  bg: '#fff',
  soft: '#EEEEF1',
  cream: '#F6F4F0',
  blue: '#4B86FF',
  blueD: '#1A45D8',
  blue2: '#173FCC',
  orange: '#FF6A1A',
  orange2: '#F15A0C',
}

export const grad = {
  blue: 'linear-gradient(135deg,#4B86FF,#1A45D8)',
  blueSoft: 'linear-gradient(150deg,#2F6BFF,#1334B8)',
  orange: 'linear-gradient(150deg,#FF7A1E,#E0470A)',
  ai: 'linear-gradient(160deg,#1A2A55,#0A0B0D)',
}

export const MAXW = 1480
export const font = '"Pretendard", -apple-system, BlinkMacSystemFont, system-ui, sans-serif'

// 트랙별 강조색
export const trackColor = (t) =>
  t === 'ai' ? C.orange2 : t === 'ops' ? '#0E9F6E' : t === 'web' ? '#7C3AED' : C.blueD
export const trackGrad = (t) =>
  t === 'ai' ? 'linear-gradient(135deg,#FF7A1E,#E0470A)'
    : t === 'ops' ? 'linear-gradient(135deg,#22C58A,#0E8F63)'
    : t === 'web' ? 'linear-gradient(135deg,#A78BFA,#7C3AED)'
    : grad.blue
// 강의/트랙 히어로 배경 그라데이션
export const trackHero = (t) =>
  t === 'ai' ? grad.ai
    : t === 'ops' ? 'linear-gradient(160deg,#0C3D2E,#0A0B0D)'
    : t === 'web' ? 'linear-gradient(160deg,#2A1A57,#0A0B0D)'
    : 'linear-gradient(160deg,#16224A,#0A0B0D)'
// 트랙별 밝은 강조색(히어로 eyebrow/태그용)
export const trackLight = (t) =>
  t === 'ai' ? '#FFB37A' : t === 'ops' ? '#5CE0A8' : t === 'web' ? '#C4B5FD' : '#8FB4FF'
