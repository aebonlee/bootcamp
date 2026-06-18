import { supabase, T } from './supabase'

// ===== 프로필 =====
export async function upsertProfile(user) {
  if (!user) return
  const meta = user.user_metadata || {}
  const row = {
    id: user.id,
    email: user.email,
    name: meta.full_name || meta.name || meta.nickname || (user.email || '').split('@')[0],
    avatar_url: meta.avatar_url || meta.picture || null,
    provider: (user.app_metadata && user.app_metadata.provider) || null,
    last_login_at: new Date().toISOString(),
  }
  const { error } = await supabase.from(T.profiles).upsert(row, { onConflict: 'id' })
  if (error) console.warn('upsertProfile', error.message)
}

// ===== 진도 =====
export async function fetchProgress(userId) {
  if (!userId) return []
  const { data, error } = await supabase
    .from(T.progress)
    .select('chapter_id, section_no, completed, updated_at')
    .eq('user_id', userId)
  if (error) {
    console.warn('fetchProgress', error.message)
    return []
  }
  return data || []
}

export async function setSectionDone(userId, chapterId, sectionNo, completed) {
  if (!userId) return { error: { message: '로그인이 필요합니다.' } }
  const row = {
    user_id: userId,
    chapter_id: chapterId,
    section_no: sectionNo,
    completed,
    updated_at: new Date().toISOString(),
  }
  return supabase.from(T.progress).upsert(row, { onConflict: 'user_id,chapter_id,section_no' })
}

// ===== 퀴즈 결과(최고 점수) =====
// scope -> best_pct 맵 반환. 테이블 미생성 등 오류 시 빈 맵(로컬 폴백 유지)
export async function fetchQuizResults(userId) {
  if (!userId) return {}
  const { data, error } = await supabase
    .from(T.quizResults)
    .select('scope, best_pct')
    .eq('user_id', userId)
  if (error) {
    console.warn('fetchQuizResults', error.message)
    return {}
  }
  const map = {}
  for (const r of data || []) map[r.scope] = r.best_pct
  return map
}

// 최고 점수 갱신(기존보다 높을 때만). 성공 시 저장된 best 반환, 실패 시 null
export async function saveQuizResult(userId, scope, pct, prevBest = 0) {
  if (!userId) return null
  const best = Math.max(pct, prevBest)
  const row = {
    user_id: userId,
    scope,
    best_pct: best,
    updated_at: new Date().toISOString(),
  }
  const { error } = await supabase.from(T.quizResults).upsert(row, { onConflict: 'user_id,scope' })
  if (error) {
    console.warn('saveQuizResult', error.message)
    return null
  }
  return best
}
