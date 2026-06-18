import { defineConfig, devices } from '@playwright/test'

// E2E는 빌드 산출물(dist)을 preview 서버로 띄워 실제 브라우저로 검증.
// CI 배포 워크플로에는 포함하지 않음(브라우저 다운로드 비용) — 로컬/별도 실행용.
export default defineConfig({
  testDir: './e2e',
  timeout: 30000,
  fullyParallel: true,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:4399',
    trace: 'on-first-retry',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: 'npm run build && npm run preview -- --port 4399',
    url: 'http://localhost:4399',
    timeout: 120000,
    reuseExistingServer: true,
  },
})
