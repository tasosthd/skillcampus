-- SkillCampus Pro production-oriented Supabase schema
-- Run in Supabase SQL editor. Keep service_role keys out of frontend code.

create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text,
  handle text unique,
  avatar_url text,
  bio text,
  role text default 'member' check (role in ('member','mentor','admin')),
  plan text default 'free' check (plan in ('free','pro','team')),
  is_premium boolean generated always as (plan in ('pro','team')) stored,
  level integer default 1 check (level >= 1),
  xp integer default 0 check (xp >= 0),
  reputation integer default 0 check (reputation >= 0),
  current_streak integer default 0 check (current_streak >= 0),
  longest_streak integer default 0 check (longest_streak >= 0),
  last_active_on date,
  public_profile boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.campuses (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  description text,
  category text,
  level text default 'Beginner',
  outcome text,
  cover_url text,
  is_premium boolean default false,
  is_published boolean default false,
  created_by uuid references public.profiles(id),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.campus_enrollments (
  campus_id uuid references public.campuses(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete cascade,
  status text default 'active' check (status in ('active','completed','paused')),
  progress_percent numeric default 0 check (progress_percent between 0 and 100),
  enrolled_at timestamptz default now(),
  completed_at timestamptz,
  primary key (campus_id, user_id)
);

create table if not exists public.lessons (
  id uuid primary key default gen_random_uuid(),
  campus_id uuid references public.campuses(id) on delete cascade,
  title text not null,
  summary text,
  content text,
  video_url text,
  duration_minutes integer default 0,
  xp_reward integer default 100,
  position integer default 0,
  is_premium boolean default false,
  is_published boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.lesson_progress (
  user_id uuid references public.profiles(id) on delete cascade,
  lesson_id uuid references public.lessons(id) on delete cascade,
  completed boolean default false,
  progress_percent numeric default 0 check (progress_percent between 0 and 100),
  last_position_seconds integer default 0,
  started_at timestamptz default now(),
  completed_at timestamptz,
  primary key (user_id, lesson_id)
);

create table if not exists public.recently_viewed_lessons (
  user_id uuid references public.profiles(id) on delete cascade,
  lesson_id uuid references public.lessons(id) on delete cascade,
  viewed_at timestamptz default now(),
  primary key (user_id, lesson_id)
);

create table if not exists public.achievements (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  title text not null,
  description text,
  icon text,
  xp_bonus integer default 0,
  created_at timestamptz default now()
);

create table if not exists public.user_achievements (
  user_id uuid references public.profiles(id) on delete cascade,
  achievement_id uuid references public.achievements(id) on delete cascade,
  unlocked_at timestamptz default now(),
  primary key (user_id, achievement_id)
);

create table if not exists public.challenges (
  id uuid primary key default gen_random_uuid(),
  campus_id uuid references public.campuses(id) on delete set null,
  title text not null,
  description text,
  xp_reward integer default 250,
  due_at timestamptz,
  is_premium boolean default false,
  is_active boolean default true,
  created_at timestamptz default now()
);

create table if not exists public.challenge_submissions (
  id uuid primary key default gen_random_uuid(),
  challenge_id uuid references public.challenges(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete cascade,
  body text,
  proof_url text,
  status text default 'submitted' check (status in ('submitted','approved','rejected')),
  reviewed_by uuid references public.profiles(id),
  reviewed_at timestamptz,
  created_at timestamptz default now()
);

create table if not exists public.certificates (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,
  campus_id uuid references public.campuses(id) on delete cascade,
  certificate_url text,
  verification_code text unique default encode(gen_random_bytes(8), 'hex'),
  issued_at timestamptz default now(),
  unique (user_id, campus_id)
);

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,
  body text not null,
  tag text default 'Post',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.post_likes (
  post_id uuid references public.posts(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete cascade,
  created_at timestamptz default now(),
  primary key (post_id, user_id)
);

create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid references public.posts(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete cascade,
  body text not null,
  created_at timestamptz default now()
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  sender_id uuid references public.profiles(id) on delete cascade,
  receiver_id uuid references public.profiles(id) on delete cascade,
  body text not null,
  read_at timestamptz,
  created_at timestamptz default now()
);

create table if not exists public.resources (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  resource_url text,
  type text default 'Template',
  is_premium boolean default false,
  download_count integer default 0,
  created_at timestamptz default now()
);

create table if not exists public.mentors (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.profiles(id) on delete cascade,
  title text,
  specialty text,
  rating numeric default 5,
  available_slots integer default 0,
  is_featured boolean default false
);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,
  type text not null,
  title text not null,
  body text,
  read_at timestamptz,
  created_at timestamptz default now()
);

create table if not exists public.activity_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,
  event_type text not null,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,
  provider text default 'stripe',
  provider_customer_id text,
  provider_subscription_id text unique,
  plan text not null check (plan in ('pro','team')),
  status text not null default 'incomplete',
  current_period_end timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.user_settings (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  email_notifications boolean default true,
  weekly_digest boolean default true,
  compact_mode boolean default false,
  language text default 'en' check (language in ('en','el')),
  updated_at timestamptz default now()
);

create index if not exists idx_lessons_campus_position on public.lessons(campus_id, position);
create index if not exists idx_posts_created_at on public.posts(created_at desc);
create index if not exists idx_messages_participants on public.messages(sender_id, receiver_id, created_at desc);
create index if not exists idx_activity_user_created on public.activity_events(user_id, created_at desc);
create index if not exists idx_notifications_user_read on public.notifications(user_id, read_at, created_at desc);
create index if not exists idx_subscriptions_user_status on public.subscriptions(user_id, status);

alter table public.profiles enable row level security;
alter table public.campuses enable row level security;
alter table public.campus_enrollments enable row level security;
alter table public.lessons enable row level security;
alter table public.lesson_progress enable row level security;
alter table public.recently_viewed_lessons enable row level security;
alter table public.achievements enable row level security;
alter table public.user_achievements enable row level security;
alter table public.challenges enable row level security;
alter table public.challenge_submissions enable row level security;
alter table public.certificates enable row level security;
alter table public.posts enable row level security;
alter table public.post_likes enable row level security;
alter table public.comments enable row level security;
alter table public.messages enable row level security;
alter table public.resources enable row level security;
alter table public.mentors enable row level security;
alter table public.notifications enable row level security;
alter table public.activity_events enable row level security;
alter table public.subscriptions enable row level security;
alter table public.user_settings enable row level security;

create or replace function public.is_admin()
returns boolean language sql stable as $$
  select exists(select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin');
$$;

create or replace function public.is_premium_member()
returns boolean language sql stable as $$
  select exists(select 1 from public.profiles p where p.id = auth.uid() and p.plan in ('pro','team'));
$$;

create policy "profiles readable" on public.profiles for select using (public_profile = true or auth.uid() = id or public.is_admin());
create policy "users insert own profile" on public.profiles for insert with check (auth.uid() = id);
create policy "users update own profile" on public.profiles for update using (auth.uid() = id or public.is_admin());

create policy "published campuses readable" on public.campuses for select using (is_published = true or public.is_admin());
create policy "admins manage campuses" on public.campuses for all using (public.is_admin()) with check (public.is_admin());

create policy "own enrollments readable" on public.campus_enrollments for select using (auth.uid() = user_id or public.is_admin());
create policy "users enroll self" on public.campus_enrollments for insert with check (auth.uid() = user_id);
create policy "users update own enrollment" on public.campus_enrollments for update using (auth.uid() = user_id or public.is_admin());

create policy "lessons gated by premium" on public.lessons for select using (is_published = true and (is_premium = false or public.is_premium_member()) or public.is_admin());
create policy "admins manage lessons" on public.lessons for all using (public.is_admin()) with check (public.is_admin());

create policy "own progress" on public.lesson_progress for all using (auth.uid() = user_id or public.is_admin()) with check (auth.uid() = user_id or public.is_admin());
create policy "own recent lessons" on public.recently_viewed_lessons for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "achievements readable" on public.achievements for select using (true);
create policy "own achievements readable" on public.user_achievements for select using (auth.uid() = user_id or public.is_admin());
create policy "admins award achievements" on public.user_achievements for all using (public.is_admin()) with check (public.is_admin());

create policy "challenges readable" on public.challenges for select using (is_active = true and (is_premium = false or public.is_premium_member()) or public.is_admin());
create policy "admins manage challenges" on public.challenges for all using (public.is_admin()) with check (public.is_admin());
create policy "own challenge submissions" on public.challenge_submissions for select using (auth.uid() = user_id or public.is_admin());
create policy "users submit challenges" on public.challenge_submissions for insert with check (auth.uid() = user_id);
create policy "admins review submissions" on public.challenge_submissions for update using (public.is_admin());

create policy "own certificates" on public.certificates for select using (auth.uid() = user_id or public.is_admin());
create policy "admins issue certificates" on public.certificates for all using (public.is_admin()) with check (public.is_admin());

create policy "posts readable" on public.posts for select using (true);
create policy "users create posts" on public.posts for insert with check (auth.uid() = user_id);
create policy "users manage own posts" on public.posts for update using (auth.uid() = user_id or public.is_admin());
create policy "users delete own posts" on public.posts for delete using (auth.uid() = user_id or public.is_admin());
create policy "likes readable" on public.post_likes for select using (true);
create policy "users manage own likes" on public.post_likes for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "comments readable" on public.comments for select using (true);
create policy "users create comments" on public.comments for insert with check (auth.uid() = user_id);

create policy "messages visible to participants" on public.messages for select using (auth.uid() = sender_id or auth.uid() = receiver_id or public.is_admin());
create policy "users send messages" on public.messages for insert with check (auth.uid() = sender_id);
create policy "participants update read receipts" on public.messages for update using (auth.uid() = receiver_id);

create policy "resources gated by premium" on public.resources for select using (is_premium = false or public.is_premium_member() or public.is_admin());
create policy "admins manage resources" on public.resources for all using (public.is_admin()) with check (public.is_admin());

create policy "mentors readable" on public.mentors for select using (true);
create policy "admins manage mentors" on public.mentors for all using (public.is_admin()) with check (public.is_admin());

create policy "own notifications" on public.notifications for all using (auth.uid() = user_id or public.is_admin()) with check (auth.uid() = user_id or public.is_admin());
create policy "own activity" on public.activity_events for select using (auth.uid() = user_id or public.is_admin());
create policy "system inserts activity" on public.activity_events for insert with check (auth.uid() = user_id or public.is_admin());

create policy "own subscriptions" on public.subscriptions for select using (auth.uid() = user_id or public.is_admin());
create policy "admins manage subscriptions" on public.subscriptions for all using (public.is_admin()) with check (public.is_admin());
create policy "own settings" on public.user_settings for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, name, handle)
  values (new.id, coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)), lower(regexp_replace(split_part(new.email, '@', 1), '[^a-zA-Z0-9_]+', '', 'g')))
  on conflict (id) do nothing;
  insert into public.user_settings (user_id) values (new.id) on conflict (user_id) do nothing;
  return new;
end; $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();
