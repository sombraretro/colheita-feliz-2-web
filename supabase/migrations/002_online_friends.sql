-- Colheita Feliz 2 · sistema online de amigos e visitas
-- Execute no SQL Editor do Supabase antes de ativar a interface social.
-- Esta migration NÃO altera farm_saves nem a versão 1.9.0 publicada.

create table if not exists public.player_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  friend_code text not null unique default upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 12)),
  display_name text not null default 'Fazendeiro',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.friendships (
  id uuid primary key default gen_random_uuid(),
  requester_id uuid not null references auth.users(id) on delete cascade,
  addressee_id uuid not null references auth.users(id) on delete cascade,
  status text not null default 'pending' check (status in ('pending', 'accepted', 'declined')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint friendships_no_self check (requester_id <> addressee_id)
);

-- Impede duas relações paralelas entre o mesmo par, independentemente da direção.
create unique index if not exists friendships_unique_pair
  on public.friendships (
    least(requester_id, addressee_id),
    greatest(requester_id, addressee_id)
  );

-- Dados públicos mínimos usados na lista de amigos.
alter table public.player_profiles enable row level security;

drop policy if exists "Authenticated players can view public profiles" on public.player_profiles;
drop policy if exists "Players can view own or related profiles" on public.player_profiles;
create policy "Players can view own or related profiles"
  on public.player_profiles for select
  to authenticated
  using (
    user_id = (select auth.uid())
    or exists (
      select 1 from public.friendships f
      where (f.requester_id = (select auth.uid()) and f.addressee_id = user_id)
         or (f.addressee_id = (select auth.uid()) and f.requester_id = user_id)
    )
  );

drop policy if exists "Players can update their own public name" on public.player_profiles;
create policy "Players can update their own public name"
  on public.player_profiles for update
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

revoke all on public.player_profiles from anon, authenticated;
grant select on public.player_profiles to authenticated;
grant update (display_name, updated_at) on public.player_profiles to authenticated;

-- Cria automaticamente um perfil e um código de amizade para cada conta nova.
create or replace function public.create_player_profile()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $$
begin
  insert into public.player_profiles (user_id, display_name)
  values (
    new.id,
    coalesce(
      nullif(left(trim(new.raw_user_meta_data ->> 'display_name'), 40), ''),
      'Fazendeiro'
    )
  )
  on conflict (user_id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created_player_profile on auth.users;
create trigger on_auth_user_created_player_profile
  after insert on auth.users
  for each row execute function public.create_player_profile();

-- Também cria perfis para contas que já existiam antes desta migration.
insert into public.player_profiles (user_id)
select id from auth.users
on conflict (user_id) do nothing;

-- A tabela de amizades só pode ser consultada pelos dois participantes.
alter table public.friendships enable row level security;

drop policy if exists "Players can view their own friendship rows" on public.friendships;
create policy "Players can view their own friendship rows"
  on public.friendships for select
  to authenticated
  using (
    (select auth.uid()) = requester_id
    or (select auth.uid()) = addressee_id
  );

revoke all on public.friendships from anon, authenticated;
grant select on public.friendships to authenticated;

-- Busca exata por código: retorna apenas nome e código, sem expor UUID nem listar jogadores.
create or replace function public.lookup_player_by_code(p_friend_code text)
returns table (friend_code text, display_name text)
language sql
security definer
set search_path = public, pg_temp
as $ 
  select p.friend_code, p.display_name
  from public.player_profiles p
  where auth.uid() is not null
    and p.friend_code = upper(trim(coalesce(p_friend_code, '')))
  limit 1;
$;

-- Solicitação por código público. A escrita é feita por função controlada,
-- nunca por INSERT/UPDATE direto do navegador.
create or replace function public.request_friend(p_friend_code text)
returns uuid
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_me uuid := auth.uid();
  v_target uuid;
  v_existing public.friendships%rowtype;
begin
  if v_me is null then
    raise exception 'É necessário entrar na sua conta.';
  end if;

  select user_id into v_target
  from public.player_profiles
  where friend_code = upper(trim(coalesce(p_friend_code, '')));

  if v_target is null then
    raise exception 'Nenhum jogador encontrado com esse código.';
  end if;
  if v_target = v_me then
    raise exception 'Você não pode adicionar sua própria conta.';
  end if;

  select * into v_existing
  from public.friendships
  where least(requester_id, addressee_id) = least(v_me, v_target)
    and greatest(requester_id, addressee_id) = greatest(v_me, v_target)
  limit 1;

  if found then
    if v_existing.status = 'accepted' then
      raise exception 'Este jogador já está na sua lista de amigos.';
    elsif v_existing.status = 'pending' then
      if v_existing.addressee_id = v_me then
        raise exception 'Este jogador já enviou uma solicitação para você. Verifique seus pedidos recebidos.';
      end if;
      raise exception 'Sua solicitação já foi enviada e ainda está pendente.';
    else
      update public.friendships
      set requester_id = v_me,
          addressee_id = v_target,
          status = 'pending',
          updated_at = now()
      where id = v_existing.id;
      return v_existing.id;
    end if;
  end if;

  insert into public.friendships (requester_id, addressee_id)
  values (v_me, v_target)
  returning id into v_existing.id;

  return v_existing.id;
end;
$$;

-- O destinatário aceita ou recusa somente a solicitação recebida por ele.
create or replace function public.respond_friend_request(
  p_request_id uuid,
  p_accept boolean
)
returns void
language plpgsql
security definer
set search_path = public, pg_temp
as $$
begin
  if auth.uid() is null then
    raise exception 'É necessário entrar na sua conta.';
  end if;

  update public.friendships
  set status = case when p_accept then 'accepted' else 'declined' end,
      updated_at = now()
  where id = p_request_id
    and addressee_id = auth.uid()
    and status = 'pending';

  if not found then
    raise exception 'Solicitação não encontrada ou já respondida.';
  end if;
end;
$$;

-- Qualquer um dos dois participantes pode encerrar uma amizade aceita.
create or replace function public.remove_friend(p_friend_user_id uuid)
returns void
language plpgsql
security definer
set search_path = public, pg_temp
as $$
begin
  if auth.uid() is null then
    raise exception 'É necessário entrar na sua conta.';
  end if;

  delete from public.friendships
  where status = 'accepted'
    and (
      (requester_id = auth.uid() and addressee_id = p_friend_user_id)
      or
      (addressee_id = auth.uid() and requester_id = p_friend_user_id)
    );

  if not found then
    raise exception 'Amizade não encontrada.';
  end if;
end;
$$;

-- Snapshot separado do save privado: somente os dados visuais necessários
-- para visitar uma fazenda serão publicados pelo jogo na próxima etapa.
create table if not exists public.farm_public_snapshots (
  owner_id uuid primary key references auth.users(id) on delete cascade,
  farm_name text not null default 'Minha fazenda',
  level integer not null default 1 check (level >= 1),
  popularity bigint not null default 0 check (popularity >= 0),
  snapshot jsonb not null default '{}'::jsonb
    check (jsonb_typeof(snapshot) = 'object'),
  updated_at timestamptz not null default now()
);

alter table public.farm_public_snapshots enable row level security;

drop policy if exists "Players can view own or accepted friends farms" on public.farm_public_snapshots;
create policy "Players can view own or accepted friends farms"
  on public.farm_public_snapshots for select
  to authenticated
  using (
    owner_id = (select auth.uid())
    or exists (
      select 1
      from public.friendships f
      where f.status = 'accepted'
        and (
          (f.requester_id = (select auth.uid()) and f.addressee_id = owner_id)
          or
          (f.addressee_id = (select auth.uid()) and f.requester_id = owner_id)
        )
    )
  );

drop policy if exists "Players can publish their own farm snapshot" on public.farm_public_snapshots;
create policy "Players can publish their own farm snapshot"
  on public.farm_public_snapshots for insert
  to authenticated
  with check (owner_id = (select auth.uid()));

drop policy if exists "Players can update their own farm snapshot" on public.farm_public_snapshots;
create policy "Players can update their own farm snapshot"
  on public.farm_public_snapshots for update
  to authenticated
  using (owner_id = (select auth.uid()))
  with check (owner_id = (select auth.uid()));

drop policy if exists "Players can delete their own farm snapshot" on public.farm_public_snapshots;
create policy "Players can delete their own farm snapshot"
  on public.farm_public_snapshots for delete
  to authenticated
  using (owner_id = (select auth.uid()));

grant select, insert, update, delete on public.farm_public_snapshots to authenticated;

-- As funções são executáveis apenas por usuários autenticados.
revoke all on function public.lookup_player_by_code(text) from public, anon;
revoke all on function public.request_friend(text) from public, anon;
revoke all on function public.respond_friend_request(uuid, boolean) from public, anon;
revoke all on function public.remove_friend(uuid) from public, anon;
grant execute on function public.lookup_player_by_code(text) to authenticated;
grant execute on function public.request_friend(text) to authenticated;
grant execute on function public.respond_friend_request(uuid, boolean) to authenticated;
grant execute on function public.remove_friend(uuid) to authenticated;
