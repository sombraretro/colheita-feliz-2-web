-- Colheita Feliz 2 · Supabase cloud save schema
-- Execute no SQL Editor do projeto Supabase antes de publicar a edição online.

create table if not exists public.farm_saves (
  user_id uuid primary key references auth.users(id) on delete cascade,
  farm_name text not null default 'Minha fazenda',
  state jsonb not null check (jsonb_typeof(state) = 'object'),
  revision bigint not null default 1 check (revision > 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_farm_save_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists farm_saves_updated_at on public.farm_saves;
create trigger farm_saves_updated_at
before update on public.farm_saves
for each row execute function public.set_farm_save_updated_at();

alter table public.farm_saves enable row level security;

drop policy if exists "Players can read their own farm" on public.farm_saves;
create policy "Players can read their own farm"
on public.farm_saves for select
to authenticated
using ((select auth.uid()) = user_id);

drop policy if exists "Players can create their own farm" on public.farm_saves;
create policy "Players can create their own farm"
on public.farm_saves for insert
to authenticated
with check ((select auth.uid()) = user_id);

drop policy if exists "Players can update their own farm" on public.farm_saves;
create policy "Players can update their own farm"
on public.farm_saves for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

grant select, insert, update on public.farm_saves to authenticated;
