-- Colheita Feliz 2: códigos públicos e exclusivos de jogador.
-- Execute este arquivo no SQL Editor do projeto Supabase antes de usar a busca por código.

create table if not exists public.social_player_codes (
  user_id uuid primary key references auth.users(id) on delete cascade,
  player_code text not null unique,
  farm_name text not null default 'Minha fazenda',
  level integer not null default 1 check (level >= 1),
  popularity integer not null default 0 check (popularity >= 0),
  updated_at timestamptz not null default now(),
  constraint social_player_codes_format check (player_code ~ '^CF-[A-F0-9]{8}$')
);

alter table public.social_player_codes enable row level security;
revoke all on table public.social_player_codes from anon, authenticated;

create or replace function public.social_get_player_code()
returns text
language plpgsql
security definer
set search_path = public, auth
as $$
declare
  v_user uuid := auth.uid();
  v_code text;
begin
  if v_user is null then
    raise exception 'Entre na sua conta para consultar seu código.';
  end if;
  select player_code into v_code from public.social_player_codes where user_id = v_user;
  if v_code is null then
    loop
      v_code := 'CF-' || upper(substr(encode(gen_random_bytes(4), 'hex'), 1, 8));
      insert into public.social_player_codes(user_id, player_code)
      values (v_user, v_code)
      on conflict do nothing;
      exit when found;
      select player_code into v_code from public.social_player_codes where user_id = v_user;
      exit when v_code is not null;
    end loop;
  end if;
  return v_code;
end;
$$;

create or replace function public.social_update_player_code_profile(
  p_farm_name text, p_level integer, p_popularity integer
)
returns void
language plpgsql
security definer
set search_path = public, auth
as $$
declare v_user uuid := auth.uid();
begin
  if v_user is null then raise exception 'Autenticação obrigatória.'; end if;
  perform public.social_get_player_code();
  update public.social_player_codes
  set farm_name = left(coalesce(nullif(trim(p_farm_name), ''), 'Minha fazenda'), 40),
      level = greatest(1, coalesce(p_level, 1)),
      popularity = greatest(0, coalesce(p_popularity, 0)),
      updated_at = now()
  where user_id = v_user;
end;
$$;

create or replace function public.social_find_player_by_code(p_code text)
returns table(user_id uuid, farm_name text, level integer, popularity integer)
language plpgsql
security definer
set search_path = public, auth
as $$
declare
  v_user uuid := auth.uid();
  v_code text := upper(trim(coalesce(p_code, '')));
begin
  if v_user is null then raise exception 'Entre na sua conta para procurar jogadores.'; end if;
  if v_code !~ '^CF-[A-F0-9]{8}$' then raise exception 'Código de jogador inválido.'; end if;
  return query
  select p.user_id, p.farm_name, p.level, p.popularity
  from public.social_player_codes p
  where p.player_code = v_code and p.user_id <> v_user
  limit 1;
end;
$$;

revoke all on function public.social_get_player_code() from public, anon;
revoke all on function public.social_update_player_code_profile(text, integer, integer) from public, anon;
revoke all on function public.social_find_player_by_code(text) from public, anon;
grant execute on function public.social_get_player_code() to authenticated;
grant execute on function public.social_update_player_code_profile(text, integer, integer) to authenticated;
grant execute on function public.social_find_player_by_code(text) to authenticated;
