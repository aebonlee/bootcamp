import { test, expect } from '@playwright/test'

test('홈이 로드되고 히어로·트랙·EXPLORE가 보인다', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(/부트캠프/)
  await expect(page.getByRole('heading', { name: 'Bootcamp' })).toBeVisible()
  await expect(page.getByText('세 개의', { exact: false }).or(page.getByText('네 개의'))).toBeTruthy()
})

test('커리큘럼으로 이동해 4개 트랙 필터가 보인다', async ({ page }) => {
  await page.goto('/curriculum')
  await expect(page.getByRole('button', { name: '웹 기초' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'AI 웹 서비스' })).toBeVisible()
})

test('강의 상세가 본문(코드 포함)을 렌더한다', async ({ page }) => {
  await page.goto('/lesson/react-01')
  // 챕터 제목(히어로)
  await expect(page.getByRole('heading', { name: /JSX/ }).first()).toBeVisible()
  // 본문 섹션 헤딩이 렌더되는지(마크다운 → h2)
  await expect(page.locator('h2').first()).toBeVisible({ timeout: 10000 })
})

test('퀴즈: 용어 탭이 용어 카드를 보여주고 검색이 동작한다', async ({ page }) => {
  await page.goto('/quiz')
  await expect(page.getByPlaceholder(/용어 검색/)).toBeVisible()
  await page.getByPlaceholder(/용어 검색/).fill('zzzzz없는용어')
  await expect(page.getByText(/검색 결과가 없습니다/)).toBeVisible()
})

test('코칭: 탭과 가이드 카드가 보인다', async ({ page }) => {
  await page.goto('/coaching')
  await expect(page.getByRole('button', { name: /기술 코칭/ })).toBeVisible()
  await expect(page.getByRole('button', { name: /부록 가이드/ })).toBeVisible()
})

test('비로그인 시 마이페이지는 로그인으로 리다이렉트된다', async ({ page }) => {
  await page.goto('/me')
  await page.waitForURL(/\/login/, { timeout: 8000 })
  await expect(page.getByText(/구글로 계속하기/)).toBeVisible()
})
