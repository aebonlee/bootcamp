-- ============================================================
--  WEB PRO 웹개발 부트캠프 — Supabase 스키마
--  공용 단일 프로젝트(hcmgdztsgjvzcyxyayaj)에 적재되므로
--  모든 객체는 webpro_ 접두사를 사용합니다.
-- ============================================================

-- ===== 프로필 =====
create table if not exists public.webpro_profiles (
  id           uuid primary key references auth.users(id) on delete cascade,
  email        text,
  name         text,
  avatar_url   text,
  provider     text,
  created_at   timestamptz not null default now(),
  last_login_at timestamptz
);

alter table public.webpro_profiles enable row level security;

drop policy if exists "webpro_profiles_select_own" on public.webpro_profiles;
create policy "webpro_profiles_select_own" on public.webpro_profiles
  for select using (auth.uid() = id);

drop policy if exists "webpro_profiles_upsert_own" on public.webpro_profiles;
create policy "webpro_profiles_upsert_own" on public.webpro_profiles
  for insert with check (auth.uid() = id);

drop policy if exists "webpro_profiles_update_own" on public.webpro_profiles;
create policy "webpro_profiles_update_own" on public.webpro_profiles
  for update using (auth.uid() = id);

-- ===== 학습 진도 (섹션 단위) =====
create table if not exists public.webpro_progress (
  user_id     uuid not null references auth.users(id) on delete cascade,
  chapter_id  text not null,           -- 예: react-01, ai-05
  section_no  text not null,           -- 예: 1.1, 5.3
  completed   boolean not null default true,
  updated_at  timestamptz not null default now(),
  primary key (user_id, chapter_id, section_no)
);

create index if not exists webpro_progress_user_idx
  on public.webpro_progress (user_id);

alter table public.webpro_progress enable row level security;

drop policy if exists "webpro_progress_select_own" on public.webpro_progress;
create policy "webpro_progress_select_own" on public.webpro_progress
  for select using (auth.uid() = user_id);

drop policy if exists "webpro_progress_insert_own" on public.webpro_progress;
create policy "webpro_progress_insert_own" on public.webpro_progress
  for insert with check (auth.uid() = user_id);

drop policy if exists "webpro_progress_update_own" on public.webpro_progress;
create policy "webpro_progress_update_own" on public.webpro_progress
  for update using (auth.uid() = user_id);

drop policy if exists "webpro_progress_delete_own" on public.webpro_progress;
create policy "webpro_progress_delete_own" on public.webpro_progress
  for delete using (auth.uid() = user_id);

-- ===== (선택) 트랙 수강 신청 =====
create table if not exists public.webpro_enrollments (
  user_id     uuid not null references auth.users(id) on delete cascade,
  track       text not null,           -- react | ai
  created_at  timestamptz not null default now(),
  primary key (user_id, track)
);

alter table public.webpro_enrollments enable row level security;

drop policy if exists "webpro_enrollments_all_own" on public.webpro_enrollments;
create policy "webpro_enrollments_all_own" on public.webpro_enrollments
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ===== 퀴즈 결과(최고 점수) =====
create table if not exists public.webpro_quiz_results (
  user_id     uuid not null references auth.users(id) on delete cascade,
  scope       text not null,           -- 챕터 id(react-01 등) 또는 'random'
  best_pct    int  not null default 0, -- 0~100 최고 점수
  attempts    int  not null default 1, -- 시도 횟수
  updated_at  timestamptz not null default now(),
  primary key (user_id, scope)
);

create index if not exists webpro_quiz_results_user_idx
  on public.webpro_quiz_results (user_id);

alter table public.webpro_quiz_results enable row level security;

drop policy if exists "webpro_quiz_select_own" on public.webpro_quiz_results;
create policy "webpro_quiz_select_own" on public.webpro_quiz_results
  for select using (auth.uid() = user_id);

drop policy if exists "webpro_quiz_insert_own" on public.webpro_quiz_results;
create policy "webpro_quiz_insert_own" on public.webpro_quiz_results
  for insert with check (auth.uid() = user_id);

drop policy if exists "webpro_quiz_update_own" on public.webpro_quiz_results;
create policy "webpro_quiz_update_own" on public.webpro_quiz_results
  for update using (auth.uid() = user_id);
