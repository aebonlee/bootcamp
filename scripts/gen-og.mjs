// OG 이미지 생성기 — sharp로 SVG를 1200x630 PNG로 렌더링
// 사용: npm run og  →  public/og-image-v2.png 생성
// 파일명에 버전을 두는 이유: 캐시(CDN/소셜)가 옛 이미지를 계속 보여주는 것을 방지
import sharp from 'sharp'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { TOTAL_CHAPTERS, TOTAL_LESSONS } from '../src/data/curriculum.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const out = resolve(__dirname, '../public/og-image-v2.png')

const W = 1200, H = 630

const svg = `
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#16224A"/>
      <stop offset="0.55" stop-color="#0C1330"/>
      <stop offset="1" stop-color="#0A0B0D"/>
    </linearGradient>
    <linearGradient id="blue" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#5C93FF"/>
      <stop offset="1" stop-color="#1A45D8"/>
    </linearGradient>
    <linearGradient id="logo" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#4B86FF"/>
      <stop offset="1" stop-color="#1A45D8"/>
    </linearGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg)"/>

  <!-- decorative rings -->
  <circle cx="1040" cy="120" r="240" fill="none" stroke="#4B86FF" stroke-width="60" opacity="0.10"/>
  <circle cx="160" cy="560" r="150" fill="none" stroke="#FF6A1A" stroke-width="40" opacity="0.10"/>

  <!-- logo mark -->
  <g transform="translate(90,86)">
    <circle cx="22" cy="20" r="17" fill="none" stroke="#ffffff" stroke-width="6.5"/>
    <circle cx="56" cy="20" r="17" fill="none" stroke="url(#logo)" stroke-width="6.5"/>
    <rect x="22" y="15" width="34" height="10" rx="5" fill="#ffffff"/>
    <text x="96" y="30" font-family="Pretendard, sans-serif" font-size="30" font-weight="800" fill="#ffffff" letter-spacing="1">BOOTCAMP</text>
  </g>

  <!-- eyebrow -->
  <text x="92" y="250" font-family="Pretendard, sans-serif" font-size="26" font-weight="700" fill="#FF8A3D" letter-spacing="5">REACT · AI 웹 서비스 부트캠프</text>

  <!-- title -->
  <text x="88" y="360" font-family="Pretendard, sans-serif" font-size="118" font-weight="800" fill="#ffffff" letter-spacing="-3">웹개발의 처음부터</text>
  <text x="88" y="478" font-family="Pretendard, sans-serif" font-size="118" font-weight="800" letter-spacing="-3" fill="url(#blue)">끝까지, 한 곳에서.</text>

  <!-- subtitle -->
  <text x="92" y="556" font-family="Pretendard, sans-serif" font-size="30" font-weight="500" fill="#AEB6C6">HTML·CSS·JS · React · 인증·배포 + FastAPI · Hugging Face 생성형 AI</text>

  <!-- badge -->
  <g transform="translate(92,584)">
    <rect x="0" y="0" width="250" height="40" rx="20" fill="#ffffff" opacity="0.12"/>
    <text x="125" y="26" text-anchor="middle" font-family="Pretendard, sans-serif" font-size="20" font-weight="700" fill="#ffffff">${TOTAL_CHAPTERS}개 챕터 · ${TOTAL_LESSONS}개 강의</text>
  </g>

  <text x="${W - 60}" y="${H - 44}" text-anchor="end" font-family="Pretendard, sans-serif" font-size="22" font-weight="600" fill="#6B7390">bootcamp.dreamitbiz.com</text>
</svg>`

await sharp(Buffer.from(svg)).png().toFile(out)
console.log('✓ OG image generated →', out)
