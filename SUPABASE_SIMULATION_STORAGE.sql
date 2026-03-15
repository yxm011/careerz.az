-- Run in Supabase SQL Editor

-- 1) Simulations created by companies
create table if not exists public.simulations (
  id text primary key,
  company_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  description text,
  tags text[] not null default '{}',
  difficulty text not null default 'Beginner',
  duration text not null default '30-45 mins',
  status text not null default 'draft' check (status in ('draft', 'published', 'template')),
  stages jsonb not null default '[]'::jsonb,
  version integer not null default 1,
  template_level text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  published_at timestamptz
);

create index if not exists simulations_company_id_idx on public.simulations(company_id);
create index if not exists simulations_status_idx on public.simulations(status);

-- 2) User submissions/answers for simulations
create table if not exists public.simulation_submissions (
  id text primary key,
  sim_id text not null references public.simulations(id) on delete cascade,
  student_id uuid not null references auth.users(id) on delete cascade,
  submission_data jsonb not null default '{}'::jsonb,
  status text not null default 'submitted' check (status in ('submitted')),
  submitted_at timestamptz not null default now()
);

create index if not exists simulation_submissions_sim_id_idx on public.simulation_submissions(sim_id);
create index if not exists simulation_submissions_student_id_idx on public.simulation_submissions(student_id);

-- 3) Keep updated_at fresh
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_simulations_set_updated_at on public.simulations;
create trigger trg_simulations_set_updated_at
before update on public.simulations
for each row execute function public.set_updated_at();

-- 4) Enable RLS
alter table public.simulations enable row level security;
alter table public.simulation_submissions enable row level security;

-- Simulations policies
-- Anyone can read published simulations
drop policy if exists "Published simulations are readable" on public.simulations;
create policy "Published simulations are readable"
on public.simulations
for select
using (status = 'published');

-- Company can read own simulations (including drafts)
drop policy if exists "Company can read own simulations" on public.simulations;
create policy "Company can read own simulations"
on public.simulations
for select
using (auth.uid() = company_id);

-- Company can create own simulations
drop policy if exists "Company can insert own simulations" on public.simulations;
create policy "Company can insert own simulations"
on public.simulations
for insert
with check (auth.uid() = company_id);

-- Company can update own simulations
drop policy if exists "Company can update own simulations" on public.simulations;
create policy "Company can update own simulations"
on public.simulations
for update
using (auth.uid() = company_id)
with check (auth.uid() = company_id);

-- Company can delete own simulations
drop policy if exists "Company can delete own simulations" on public.simulations;
create policy "Company can delete own simulations"
on public.simulations
for delete
using (auth.uid() = company_id);

-- Submissions policies
-- Student can insert own submissions
drop policy if exists "Student can insert own submissions" on public.simulation_submissions;
create policy "Student can insert own submissions"
on public.simulation_submissions
for insert
with check (auth.uid() = student_id);

-- Student can read own submissions
drop policy if exists "Student can read own submissions" on public.simulation_submissions;
create policy "Student can read own submissions"
on public.simulation_submissions
for select
using (auth.uid() = student_id);

-- Company can read submissions for their simulations
drop policy if exists "Company can read submissions for own simulations" on public.simulation_submissions;
create policy "Company can read submissions for own simulations"
on public.simulation_submissions
for select
using (
  exists (
    select 1 from public.simulations s
    where s.id = simulation_submissions.sim_id
      and s.company_id = auth.uid()
  )
);
