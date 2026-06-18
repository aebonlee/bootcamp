import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anon = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!url || !anon) {
  // 빌드/런타임에서 환경변수 누락을 빠르게 인지하기 위함
  console.warn('[bootcamp] Supabase 환경변수(VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY)가 설정되지 않았습니다.')
}

// 환경변수 누락 시에도 모듈 로드가 깨지지 않도록 안전한 더미값으로 폴백(테스트·오설정 대비)
export const supabase = createClient(url || 'https://placeholder.supabase.co', anon || 'placeholder-anon-key', {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
})

// 이 프로젝트의 모든 테이블 접두사
export const PREFIX = 'webpro_'
export const T = {
  profiles: `${PREFIX}profiles`,
  progress: `${PREFIX}progress`,
  quizResults: `${PREFIX}quiz_results`,
}
