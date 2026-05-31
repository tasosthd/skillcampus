-- SkillCampus Pro Supabase schema
-- Run in Supabase SQL editor. Then add your URL + anon key to assets/js/config.js.

create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text,
  avatar_url text,
  role text default 'member' check (role in ('member','admin')),
  is_premium boolean default false,
  points integer default 0,
  streak integer default 0,
  created_at timestamptz default now()
);

create table if not exists public.campuses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  level text default 'Beginner',
  cover_url text,
  is_premium boolean default false,
  created_by uuid references public.profiles(id),
  created_at timestamptz default now()
);

create table if not exists public.lessons (
  id uuid primary key default gen_random_uuid(),
  campus_id uuid references public.campuses(id) on delete cascade,
  title text not null,
  content text,
  video_url text,
  position integer default 0,
  is_premium boolean default false,
  created_at timestamptz default now()
);

create table if not exists public.lesson_progress (
  user_id uuid references public.profiles(id) on delete cascade,
  lesson_id uuid references public.lessons(id) on delete cascade,
  completed boolean default false,
  completed_at timestamptz,
  primary key (user_id, lesson_id)
);

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,
  body text not null,
  created_at timestamptz default now()
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
  created_at timestamptz default now()
);

create table if not exists public.resources (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  resource_url text,
  type text default 'Template',
  is_premium boolean default false,
  created_at timestamptz default now()
);

alter table public.profiles enable row level security;
alter table public.campuses enable row level security;
alter table public.lessons enable row level security;
alter table public.lesson_progress enable row level security;
alter table public.posts enable row level security;
alter table public.post_likes enable row level security;
alter table public.comments enable row level security;
alter table public.messages enable row level security;
alter table public.resources enable row level security;

create policy "profiles are readable" on public.profiles for select using (true);
create policy "users update own profile" on public.profiles for update using (auth.uid() = id);
create policy "users insert own profile" on public.profiles for insert with check (auth.uid() = id);

create policy "campuses readable" on public.campuses for select using (true);
create policy "admins manage campuses" on public.campuses for all using (exists(select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

create policy "lessons readable if open or premium" on public.lessons for select using (
  is_premium = false or exists(select 1 from public.profiles p where p.id = auth.uid() and p.is_premium = true)
);
create policy "admins manage lessons" on public.lessons for all using (exists(select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

create policy "own progress" on public.lesson_progress for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "posts readable" on public.posts for select using (true);
create policy "users create posts" on public.posts for insert with check (auth.uid() = user_id);
create policy "users update own posts" on public.posts for update using (auth.uid() = user_id);
create policy "users delete own posts" on public.posts for delete using (auth.uid() = user_id);
create policy "likes readable" on public.post_likes for select using (true);
create policy "users manage own likes" on public.post_likes for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "comments readable" on public.comments for select using (true);
create policy "users create comments" on public.comments for insert with check (auth.uid() = user_id);
create policy "messages visible to participants" on public.messages for select using (auth.uid() = sender_id or auth.uid() = receiver_id);
create policy "users send messages" on public.messages for insert with check (auth.uid() = sender_id);
create policy "resources readable if open or premium" on public.resources for select using (
  is_premium = false or exists(select 1 from public.profiles p where p.id = auth.uid() and p.is_premium = true)
);
create policy "admins manage resources" on public.resources for all using (exists(select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, name)
  values (new.id, coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)))
  on conflict (id) do nothing;
  return new;
end; $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();
