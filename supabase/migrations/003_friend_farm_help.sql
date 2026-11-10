-- Colheita Feliz 2 · ajuda entre amigos e recompensa por ação
-- Ações são registradas no servidor e aplicadas à fazenda pelo próprio dono.
-- Cada ação concluída recompensa somente o primeiro ajudante com 1 moeda verde.

create table if not exists public.friend_farm_help_actions (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  helper_id uuid not null references auth.users(id) on delete cascade,
  plot_index integer not null check (plot_index between 0 and 35),
  action_type text not null check (action_type in ('water','weed','pest')),
  planted_at bigint not null,
  previous_watered_at bigint,
  acted_at_ms bigint not null,
  created_at timestamptz not null default now(),
  applied_at timestamptz,
  constraint friend_farm_help_not_self check (owner_id <> helper_id)
);

create unique index if not exists friend_farm_help_once_per_cycle
  on public.friend_farm_help_actions (
    owner_id, plot_index, action_type, planted_at,
    (coalesce(previous_watered_at, 0))
  );

alter table public.friend_farm_help_actions enable row level security;

drop policy if exists "Players can view help actions on own or friends farms" on public.friend_farm_help_actions;
create policy "Players can view help actions on own or friends farms"
  on public.friend_farm_help_actions for select
  to authenticated
  using (
    owner_id = (select auth.uid())
    or helper_id = (select auth.uid())
    or exists (
      select 1 from public.friendships f
      where f.status = 'accepted'
        and (
          (f.requester_id = (select auth.uid()) and f.addressee_id = owner_id)
          or (f.addressee_id = (select auth.uid()) and f.requester_id = owner_id)
        )
    )
  );

revoke all on public.friend_farm_help_actions from anon, authenticated;
grant select on public.friend_farm_help_actions to authenticated;

create or replace function public.help_friend_farm_plot(
  p_owner_id uuid,
  p_plot_index integer,
  p_action_type text
)
returns table (
  action_id uuid,
  helper_id uuid,
  planted_at bigint,
  acted_at_ms bigint,
  reward integer
)
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_helper uuid := auth.uid();
  v_snapshot jsonb;
  v_plot jsonb;
  v_planted_at bigint;
  v_watered_at bigint;
  v_now_ms bigint := floor(extract(epoch from clock_timestamp()) * 1000)::bigint;
  v_action_id uuid;
  v_existing public.friend_farm_help_actions%rowtype;
begin
  if v_helper is null then raise exception 'Entre na sua conta para ajudar um amigo.'; end if;
  if p_owner_id is null or p_owner_id = v_helper then raise exception 'Esta ação só pode ser feita na fazenda de um amigo.'; end if;
  if p_plot_index is null or p_plot_index < 0 or p_plot_index > 35 then raise exception 'Canteiro inválido.'; end if;
  if p_action_type not in ('water','weed','pest') then raise exception 'Ação de ajuda inválida.'; end if;
  if not exists (
    select 1 from public.friendships f
    where f.status = 'accepted'
      and ((f.requester_id = v_helper and f.addressee_id = p_owner_id)
        or (f.addressee_id = v_helper and f.requester_id = p_owner_id))
  ) then raise exception 'Somente amigos confirmados podem ajudar nesta fazenda.'; end if;

  select s.snapshot into v_snapshot
  from public.farm_public_snapshots s
  where s.owner_id = p_owner_id
  for update;
  if v_snapshot is null then raise exception 'A fazenda ainda não publicou seus dados.'; end if;

  v_plot := v_snapshot -> 'plots' -> p_plot_index;
  if v_plot is null or v_plot = 'null'::jsonb or v_plot ->> 'status' <> 'growing' then
    raise exception 'Este canteiro não possui uma plantação ativa.';
  end if;
  v_planted_at := nullif(v_plot ->> 'plantedAt','')::bigint;
  if v_planted_at is null then raise exception 'Não foi possível identificar este ciclo de plantio.'; end if;

  if p_action_type = 'weed' and coalesce((v_plot ->> 'weed')::boolean,false) is not true then
    raise exception 'Este canteiro não tem ervas daninhas.';
  elsif p_action_type = 'pest' and coalesce((v_plot ->> 'pest')::boolean,false) is not true then
    raise exception 'Este canteiro não tem pragas.';
  elsif p_action_type = 'water' then
    v_watered_at := nullif(v_plot ->> 'wateredAt','')::bigint;
    if v_watered_at is null or v_now_ms - v_watered_at < 2880000 then
      raise exception 'Esta plantação ainda não precisa ser regada.';
    end if;
  end if;

  insert into public.friend_farm_help_actions (
    owner_id, helper_id, plot_index, action_type, planted_at,
    previous_watered_at, acted_at_ms
  ) values (
    p_owner_id, v_helper, p_plot_index, p_action_type, v_planted_at,
    case when p_action_type = 'water' then v_watered_at else null end,
    v_now_ms
  )
  on conflict do nothing
  returning id into v_action_id;

  if v_action_id is null then
    select * into v_existing
    from public.friend_farm_help_actions a
    where a.owner_id = p_owner_id and a.plot_index = p_plot_index
      and a.action_type = p_action_type and a.planted_at = v_planted_at
      and coalesce(a.previous_watered_at,0) =
          coalesce(case when p_action_type = 'water' then v_watered_at else null end,0)
    limit 1;
    if v_existing.id is null then raise exception 'Esta ação já foi realizada.'; end if;
    if v_existing.helper_id <> v_helper then raise exception 'Outro amigo já realizou esta ação.'; end if;
    return query select v_existing.id, v_existing.helper_id, v_existing.planted_at, v_existing.acted_at_ms, 1;
    return;
  end if;

  return query select v_action_id, v_helper, v_planted_at, v_now_ms, 1;
end;
$$;

create or replace function public.ack_friend_farm_help_actions(p_action_ids uuid[])
returns void
language plpgsql
security definer
set search_path = public, pg_temp
as $$
begin
  if auth.uid() is null then raise exception 'Entre na sua conta para confirmar as ações.'; end if;
  update public.friend_farm_help_actions
  set applied_at = now()
  where owner_id = auth.uid()
    and id = any(coalesce(p_action_ids, array[]::uuid[]))
    and applied_at is null;
end;
$$;

revoke all on function public.help_friend_farm_plot(uuid, integer, text) from public, anon;
revoke all on function public.ack_friend_farm_help_actions(uuid[]) from public, anon;
grant execute on function public.help_friend_farm_plot(uuid, integer, text) to authenticated;
grant execute on function public.ack_friend_farm_help_actions(uuid[]) to authenticated;
