// 라우트별 정적 메타 프리렌더
// dist/index.html을 템플릿으로, 주요 라우트마다 route별 title/description/og를
// 주입한 정적 HTML(dist/<route>/index.html)을 생성한다.
// → 소셜 크롤러·검색엔진이 라우트별 메타를 읽는다(JS 미실행 환경 대응). 사용자는 그대로 SPA로 동작.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { CHAPTERS, TRACKS } from '../src/data/curriculum.js'
import { PROJECTS } from '../src/data/projects.js'
import { GUIDES } from '../src/data/coaching.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DIST = resolve(__dirname, '../dist')
const ORIGIN = 'https://bootcamp.dreamitbiz.com'
const BASE = 'DreamIT 부트캠프'
const DEFAULT_DESC = '웹 기초(HTML·CSS·JS)부터 React·AI·실전 배포까지 — 27개 챕터 137개 강의의 실무형 웹 개발 학습 플랫폼.'

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

// 생성할 라우트 목록
const routes = []
const add = (path, title, desc) => routes.push({ path, title, desc: desc || DEFAULT_DESC })

add('/curriculum', '전체 커리큘럼', '웹 기초·React·AI·배포 4개 트랙 27개 챕터 137개 강의를 한눈에.')
for (const tr of Object.values(TRACKS)) add(`/track/${tr.id}`, `${tr.label} 트랙`, tr.desc)
for (const ch of CHAPTERS) add(`/lesson/${ch.id}`, ch.title, ch.summary)
add('/projects', '프로젝트', '입문·중급·고급 18개 실전 프로젝트 — 실제 구현 코드와 동작 데모.')
for (const p of PROJECTS) add(`/project/${p.id}`, `${p.title} 프로젝트`, p.summary)
add('/quiz', '복습·퀴즈', '핵심 용어 216개와 퀴즈 135문항으로 이해도를 검증하세요.')
add('/resources', '학습 자료·실습', '전 챕터 강의 목차와 실습 예제를 한곳에서.')
add('/coaching', '코칭·가이드', '기술 코칭 4회차와 부록 가이드 9종, 실전 Tips! 17개.')
for (const g of GUIDES) add(`/coaching/${g.id}`, g.title, g.summary)
add('/about', '소개', 'DreamIT 부트캠프의 학습 철학과 4개 트랙 소개.')

const template = readFileSync(resolve(DIST, 'index.html'), 'utf8')

function inject(html, { path, title, desc }) {
  const full = esc(`${title} · ${BASE}`)
  const d = esc(desc)
  const url = esc(`${ORIGIN}${path}`)
  return html
    .replace(/<title>[^<]*<\/title>/, `<title>${full}</title>`)
    .replace(/<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${d}" />`)
    .replace(/<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${url}" />`)
    .replace(/<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${full}" />`)
    .replace(/<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${d}" />`)
    .replace(/<meta name="twitter:title" content="[^"]*" \/>/, `<meta name="twitter:title" content="${full}" />`)
    .replace(/<meta name="twitter:description" content="[^"]*" \/>/, `<meta name="twitter:description" content="${d}" />`)
}

let count = 0
for (const r of routes) {
  const out = resolve(DIST, '.' + r.path, 'index.html')
  mkdirSync(dirname(out), { recursive: true })
  writeFileSync(out, inject(template, r))
  count++
}
console.log(`✓ prerendered ${count} routes with route-specific meta`)
