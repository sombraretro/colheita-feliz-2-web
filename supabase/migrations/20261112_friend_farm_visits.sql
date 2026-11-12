-- Colheita Feliz 2: visitas somente para leitura, curtidas e privacidade da fazenda.
-- Execute no SQL Editor do Supabase após a migration de códigos de jogador.

create table if not exists public.social_farm_visit_settings (
  user_id uuid primary key references auth.users(id) on delete cascade,
  allow_friend_visits boolean not null default true,
  updated_at timestamptz not null default now()
);

create table if not exists public.social_farm_likes (
  owner_id uuid not null references auth.users(id) on delete cascade,
  liker_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (owner_id, liker_id),
  constraint social_farm_likes_no_self check (owner_id <> liker_id)
);

create index if not exists social_farm_likes_owner_idx
  on public.social_farm_likes(owner_id);

alter table public.social_farm_visit_settings enable row level security;
alter table public.social_farm_likes enable row level security;
revoke all on table public.social_farm_visit_settings from anon, authenticated;
revoke all on table public.social_farm_likes from anon, authenticated;

create or replace function public.social_get_farm_visit_settings()
returns jsonb
language plpgsql
security definer
set search_path = public, auth, pg_temp
as $$
declare
  v_user uuid := auth.uid();
  v_allowed boolean;
  v_likes bigint;
begin
  if v_user is null then raise exception 'Autenticação obrigatória.'; end if;

  insert into public.social_farm_visit_settings(user_id)
  values (v_user)
  on conflict (user_id) do nothing;

  select allow_friend_visits into v_allowed
  from public.social_farm_visit_settings where user_id = v_user;

  select count(*) into v_likes
  from public.social_farm_likes where owner_id = v_user;

  return jsonb_build_object(
    'allow_visits', coalesce(v_allowed, true),
    'like_count', coalesce(v_likes, 0)
  );
end;
$$;

create or replace function public.social_set_farm_visit_permission(p_allow boolean)
returns jsonb
language plpgsql
security definer
set search_path = public, auth, pg_temp
as $$
declare v_user uuid := auth.uid();
begin
  if v_user is null then raise exception 'Autenticação obrigatória.'; end if;
  insert into public.social_farm_visit_settings(user_id, allow_friend_visits, updated_at)
  values (v_user, coalesce(p_allow, false), now())
  on conflict (user_id) do update
    set allow_friend_visits = excluded.allow_friend_visits,
        updated_at = now();
  return public.social_get_farm_visit_settings();
end;
$$;

create or replace function public.social_visit_friend_farm(p_friend uuid)
returns jsonb
language plpgsql
security definer
set search_path = public, auth, pg_temp
as $$
declare
  v_user uuid := auth.uid();
  v_allowed boolean := true;
  v_farm jsonb;
  v_likes bigint;
  v_liked boolean;
begin
  if v_user is null then raise exception 'Entre na sua conta para visitar fazendas.'; end if;
  if p_friend is null or p_friend = v_user then raise exception 'Fazenda inválida para visita.'; end if;

  select allow_friend_visits into v_allowed
  from public.social_farm_visit_settings where user_id = p_friend;
  if not coalesce(v_allowed, true) then
    raise exception 'Este jogador bloqueou visitas à fazenda.';
  end if;

  -- A função existente continua sendo a autoridade para validar a amizade.
  execute 'select to_jsonb(f) from public.social_get_friend_farm($1) as f limit 1'
    into v_farm using p_friend;
  if v_farm is null then
    raise exception 'A fazenda não está disponível para sua conta.';
  end if;
  if jsonb_typeof(v_farm) = 'object' and v_farm ? 'social_get_friend_farm' then
    v_farm := v_farm -> 'social_get_friend_farm';
  end if;

  select count(*) into v_likes
  from public.social_farm_likes where owner_id = p_friend;
  select exists(
    select 1 from public.social_farm_likes
    where owner_id = p_friend and liker_id = v_user
  ) into v_liked;

  return v_farm || jsonb_build_object(
    'like_count', coalesce(v_likes, 0),
    'liked_by_me', coalesce(v_liked, false)
  );
end;
$$;

create or replace function public.social_toggle_farm_like(p_owner uuid)
returns jsonb
language plpgsql
security definer
set search_path = public, auth, pg_temp
as $$
declare
  v_user uuid := auth.uid();
  v_deleted boolean;
  v_likes bigint;
  v_liked boolean;
begin
  if v_user is null then raise exception 'Autenticação obrigatória.'; end if;
  if p_owner is null or p_owner = v_user then raise exception 'Não é possível curtir a própria fazenda.'; end if;

  -- Revalida amizade e permissão de visita no servidor antes de alterar a curtida.
  perform public.social_visit_friend_farm(p_owner);

  delete from public.social_farm_likes
  where owner_id = p_owner and liker_id = v_user;
  v_deleted := found;

  if not v_deleted then
    insert into public.social_farm_likes(owner_id, liker_id)
    values (p_owner, v_user)
    on conflict (owner_id, liker_id) do nothing;
  end if;

  select count(*) into v_likes
  from public.social_farm_likes where owner_id = p_owner;
  select exists(
    select 1 from public.social_farm_likes
    where owner_id = p_owner and liker_id = v_user
  ) into v_liked;

  return jsonb_build_object(
    'like_count', coalesce(v_likes, 0),
    'liked_by_me', coalesce(v_liked, false)
  );
end;
$$;

revoke all on function public.social_get_farm_visit_settings() from public, anon;
revoke all on function public.social_set_farm_visit_permission(boolean) from public, anon;
revoke all on function public.social_visit_friend_farm(uuid) from public, anon;
revoke all on function public.social_toggle_farm_like(uuid) from public, anon;

grant execute on function public.social_get_farm_visit_settings() to authenticated;
grant execute on function public.social_set_farm_visit_permission(boolean) to authenticated;
grant execute on function public.social_visit_friend_farm(uuid) to authenticated;
grant execute on function public.social_toggle_farm_like(uuid) to authenticated;

-- Impede que o cliente contorne a preferência chamando a RPC antiga diretamente.
-- A nova RPC social_visit_friend_farm a invoca internamente com privilégios do servidor.
revoke all on function public.social_get_friend_farm(uuid) from public, anon, authenticated;
