-- Colheita Feliz 2 · Sistema social online (fase 1)
-- Execute no SQL Editor do Supabase depois da migration 001_farm_saves.sql.
-- Todas as operações sociais passam por RPCs SECURITY DEFINER; tabelas privadas.

create table if not exists public.social_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  farm_name text not null default 'Minha fazenda',
  level integer not null default 1 check (level >= 1),
  popularity bigint not null default 0 check (popularity >= 0),
  farm_snapshot jsonb not null default '{}'::jsonb check (jsonb_typeof(farm_snapshot) = 'object'),
  updated_at timestamptz not null default now()
);

create table if not exists public.social_friend_requests (
  id uuid primary key default gen_random_uuid(),
  sender_id uuid not null references auth.users(id) on delete cascade,
  receiver_id uuid not null references auth.users(id) on delete cascade,
  status text not null default 'pending' check (status in ('pending','accepted','rejected','cancelled')),
  created_at timestamptz not null default now(),
  responded_at timestamptz,
  constraint social_friend_requests_not_self check (sender_id <> receiver_id)
);
create unique index if not exists social_friend_requests_pending_pair
  on public.social_friend_requests(sender_id, receiver_id) where status = 'pending';
create index if not exists social_friend_requests_receiver_pending
  on public.social_friend_requests(receiver_id, created_at desc) where status = 'pending';

create table if not exists public.social_friendships (
  user_low uuid not null references auth.users(id) on delete cascade,
  user_high uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_low, user_high),
  constraint social_friendships_order check (user_low < user_high)
);

create table if not exists public.social_messages (
  id uuid primary key default gen_random_uuid(),
  sender_id uuid not null references auth.users(id) on delete cascade,
  receiver_id uuid not null references auth.users(id) on delete cascade,
  body text not null check (char_length(body) between 1 and 500),
  created_at timestamptz not null default now(),
  read_at timestamptz,
  constraint social_messages_not_self check (sender_id <> receiver_id)
);
create index if not exists social_messages_inbox
  on public.social_messages(receiver_id, created_at desc);

create table if not exists public.social_notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  actor_id uuid references auth.users(id) on delete set null,
  kind text not null check (kind in ('friend_request','friend_accepted','message','gift','help')),
  reference_id uuid,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  read_at timestamptz
);
create index if not exists social_notifications_unread
  on public.social_notifications(user_id, created_at desc) where read_at is null;

alter table public.social_profiles enable row level security;
alter table public.social_friend_requests enable row level security;
alter table public.social_friendships enable row level security;
alter table public.social_messages enable row level security;
alter table public.social_notifications enable row level security;

-- Nenhuma tabela social pode ser lida ou alterada diretamente pelo cliente.
revoke all on public.social_profiles, public.social_friend_requests,
  public.social_friendships, public.social_messages, public.social_notifications
  from anon, authenticated;

create or replace function public.social_publish_profile(
  p_farm_name text,
  p_level integer,
  p_popularity bigint,
  p_farm_snapshot jsonb
) returns void
language plpgsql
security definer
set search_path = ''
as $$
declare v_uid uuid := auth.uid();
begin
  if v_uid is null then raise exception 'É necessário entrar na conta.'; end if;
  if p_farm_snapshot is null or jsonb_typeof(p_farm_snapshot) <> 'object'
     or pg_column_size(p_farm_snapshot) > 150000 then
    raise exception 'Resumo público da fazenda inválido ou muito grande.';
  end if;
  insert into public.social_profiles(user_id,farm_name,level,popularity,farm_snapshot,updated_at)
  values(v_uid,left(coalesce(nullif(btrim(p_farm_name),''),'Minha fazenda'),40),
    greatest(1,least(coalesce(p_level,1),999)),
    greatest(0,coalesce(p_popularity,0)),p_farm_snapshot,now())
  on conflict(user_id) do update set
    farm_name=excluded.farm_name, level=excluded.level,
    popularity=excluded.popularity, farm_snapshot=excluded.farm_snapshot,
    updated_at=now();
end;
$$;

create or replace function public.social_search_players(p_query text)
returns table(user_id uuid,farm_name text,level integer,popularity bigint,relationship text)
language plpgsql
security definer
set search_path = ''
as $$
declare v_uid uuid := auth.uid(); v_query text := left(btrim(coalesce(p_query,'')),40);
begin
  if v_uid is null then raise exception 'É necessário entrar na conta.'; end if;
  if char_length(v_query) < 2 then raise exception 'Digite pelo menos 2 caracteres para pesquisar.'; end if;
  return query
  select p.user_id,p.farm_name,p.level,p.popularity,
    case
      when exists(select 1 from public.social_friendships f where f.user_low=least(v_uid,p.user_id) and f.user_high=greatest(v_uid,p.user_id)) then 'friend'
      when exists(select 1 from public.social_friend_requests r where r.status='pending' and ((r.sender_id=v_uid and r.receiver_id=p.user_id) or (r.sender_id=p.user_id and r.receiver_id=v_uid))) then 'pending'
      else 'none'
    end
  from public.social_profiles p
  where p.user_id<>v_uid and p.farm_name ilike '%'||v_query||'%'
  order by p.updated_at desc
  limit 20;
end;
$$;

create or replace function public.social_send_friend_request(p_receiver uuid)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare v_uid uuid := auth.uid(); v_id uuid;
begin
  if v_uid is null then raise exception 'É necessário entrar na conta.'; end if;
  if p_receiver is null or p_receiver=v_uid then raise exception 'Jogador inválido.'; end if;
  if not exists(select 1 from public.social_profiles p where p.user_id=p_receiver) then raise exception 'Jogador não encontrado.'; end if;
  if exists(select 1 from public.social_friendships f where f.user_low=least(v_uid,p_receiver) and f.user_high=greatest(v_uid,p_receiver)) then raise exception 'Este jogador já é seu amigo.'; end if;
  if exists(select 1 from public.social_friend_requests r where r.status='pending' and r.sender_id=p_receiver and r.receiver_id=v_uid) then
    raise exception 'Este jogador já enviou uma solicitação para você. Confira as solicitações recebidas.';
  end if;
  insert into public.social_friend_requests(sender_id,receiver_id)
  values(v_uid,p_receiver) returning id into v_id;
  insert into public.social_notifications(user_id,actor_id,kind,reference_id,payload)
  values(p_receiver,v_uid,'friend_request',v_id,jsonb_build_object('message','Enviou uma solicitação de amizade.'));
  return v_id;
exception when unique_violation then
  raise exception 'Já existe uma solicitação pendente para este jogador.';
end;
$$;

create or replace function public.social_respond_friend_request(p_request uuid,p_accept boolean)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare v_uid uuid := auth.uid(); v_sender uuid; v_status text;
begin
  if v_uid is null then raise exception 'É necessário entrar na conta.'; end if;
  select sender_id,status into v_sender,v_status
    from public.social_friend_requests
    where id=p_request and receiver_id=v_uid for update;
  if not found or v_status<>'pending' then raise exception 'Solicitação não encontrada ou já respondida.'; end if;
  update public.social_friend_requests set status=case when p_accept then 'accepted' else 'rejected' end,
    responded_at=now() where id=p_request;
  if p_accept then
    insert into public.social_friendships(user_low,user_high)
      values(least(v_uid,v_sender),greatest(v_uid,v_sender)) on conflict do nothing;
    insert into public.social_notifications(user_id,actor_id,kind,reference_id,payload)
      values(v_sender,v_uid,'friend_accepted',p_request,jsonb_build_object('message','Aceitou sua solicitação de amizade.'));
  end if;
end;
$$;

create or replace function public.social_remove_friend(p_friend uuid)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare v_uid uuid := auth.uid();
begin
  if v_uid is null then raise exception 'É necessário entrar na conta.'; end if;
  delete from public.social_friendships
    where user_low=least(v_uid,p_friend) and user_high=greatest(v_uid,p_friend);
  if not found then raise exception 'Amizade não encontrada.'; end if;
end;
$$;

create or replace function public.social_list_friends()
returns table(user_id uuid,farm_name text,level integer,popularity bigint,updated_at timestamptz)
language sql
security definer
set search_path = ''
as $$
  select p.user_id,p.farm_name,p.level,p.popularity,p.updated_at
  from public.social_friendships f
  join public.social_profiles p on p.user_id=case when f.user_low=auth.uid() then f.user_high else f.user_low end
  where f.user_low=auth.uid() or f.user_high=auth.uid()
  order by p.farm_name;
$$;

create or replace function public.social_list_requests()
returns table(id uuid,sender_id uuid,farm_name text,level integer,created_at timestamptz)
language sql
security definer
set search_path = ''
as $$
  select r.id,r.sender_id,p.farm_name,p.level,r.created_at
  from public.social_friend_requests r
  join public.social_profiles p on p.user_id=r.sender_id
  where r.receiver_id=auth.uid() and r.status='pending'
  order by r.created_at desc;
$$;

create or replace function public.social_get_friend_farm(p_friend uuid)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare v_uid uuid := auth.uid(); v_snapshot jsonb;
begin
  if v_uid is null then raise exception 'É necessário entrar na conta.'; end if;
  if not exists(select 1 from public.social_friendships f
    where f.user_low=least(v_uid,p_friend) and f.user_high=greatest(v_uid,p_friend)) then
    raise exception 'Você precisa ser amigo deste jogador para visitar a fazenda.';
  end if;
  select jsonb_build_object('farm_name',farm_name,'level',level,'popularity',popularity,
    'snapshot',farm_snapshot,'updated_at',updated_at)
    into v_snapshot from public.social_profiles where user_id=p_friend;
  if v_snapshot is null then raise exception 'Resumo da fazenda indisponível.'; end if;
  return v_snapshot;
end;
$$;

create or replace function public.social_send_message(p_receiver uuid,p_body text)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare v_uid uuid := auth.uid(); v_id uuid; v_body text := btrim(coalesce(p_body,''));
begin
  if v_uid is null then raise exception 'É necessário entrar na conta.'; end if;
  if v_uid=p_receiver or char_length(v_body) not between 1 and 500 then raise exception 'Mensagem inválida.'; end if;
  if not exists(select 1 from public.social_friendships f where f.user_low=least(v_uid,p_receiver) and f.user_high=greatest(v_uid,p_receiver)) then
    raise exception 'Mensagens só podem ser enviadas a amigos.';
  end if;
  insert into public.social_messages(sender_id,receiver_id,body)
    values(v_uid,p_receiver,v_body) returning id into v_id;
  insert into public.social_notifications(user_id,actor_id,kind,reference_id,payload)
    values(p_receiver,v_uid,'message',v_id,jsonb_build_object('message','Enviou uma mensagem.'));
  return v_id;
end;
$$;

create or replace function public.social_list_messages(p_friend uuid)
returns table(id uuid,sender_id uuid,body text,created_at timestamptz,read_at timestamptz)
language plpgsql
security definer
set search_path = ''
as $$
declare v_uid uuid := auth.uid();
begin
  if v_uid is null then raise exception 'É necessário entrar na conta.'; end if;
  if not exists(select 1 from public.social_friendships f where f.user_low=least(v_uid,p_friend) and f.user_high=greatest(v_uid,p_friend)) then
    raise exception 'Mensagens disponíveis apenas entre amigos.';
  end if;
  return query select m.id,m.sender_id,m.body,m.created_at,m.read_at
    from public.social_messages m
    where (m.sender_id=v_uid and m.receiver_id=p_friend) or (m.sender_id=p_friend and m.receiver_id=v_uid)
    order by m.created_at desc limit 100;
end;
$$;

create or replace function public.social_mark_message_read(p_message uuid)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  update public.social_messages set read_at=now()
    where id=p_message and receiver_id=auth.uid() and read_at is null;
end;
$$;

create or replace function public.social_list_notifications()
returns table(id uuid,actor_id uuid,kind text,reference_id uuid,payload jsonb,created_at timestamptz,read_at timestamptz)
language sql
security definer
set search_path = ''
as $$
  select n.id,n.actor_id,n.kind,n.reference_id,n.payload,n.created_at,n.read_at
  from public.social_notifications n
  where n.user_id=auth.uid()
  order by n.created_at desc limit 100;
$$;

create or replace function public.social_mark_notification_read(p_notification uuid)
returns void
language sql
security definer
set search_path = ''
as $$
  update public.social_notifications set read_at=now()
  where id=p_notification and user_id=auth.uid() and read_at is null;
$$;

revoke all on function public.social_publish_profile(text,integer,bigint,jsonb) from public,anon;
revoke all on function public.social_search_players(text) from public,anon;
revoke all on function public.social_send_friend_request(uuid) from public,anon;
revoke all on function public.social_respond_friend_request(uuid,boolean) from public,anon;
revoke all on function public.social_remove_friend(uuid) from public,anon;
revoke all on function public.social_list_friends() from public,anon;
revoke all on function public.social_list_requests() from public,anon;
revoke all on function public.social_get_friend_farm(uuid) from public,anon;
revoke all on function public.social_send_message(uuid,text) from public,anon;
revoke all on function public.social_list_messages(uuid) from public,anon;
revoke all on function public.social_mark_message_read(uuid) from public,anon;
revoke all on function public.social_list_notifications() from public,anon;
revoke all on function public.social_mark_notification_read(uuid) from public,anon;

grant execute on function public.social_publish_profile(text,integer,bigint,jsonb) to authenticated;
grant execute on function public.social_search_players(text) to authenticated;
grant execute on function public.social_send_friend_request(uuid) to authenticated;
grant execute on function public.social_respond_friend_request(uuid,boolean) to authenticated;
grant execute on function public.social_remove_friend(uuid) to authenticated;
grant execute on function public.social_list_friends() to authenticated;
grant execute on function public.social_list_requests() to authenticated;
grant execute on function public.social_get_friend_farm(uuid) to authenticated;
grant execute on function public.social_send_message(uuid,text) to authenticated;
grant execute on function public.social_list_messages(uuid) to authenticated;
grant execute on function public.social_mark_message_read(uuid) to authenticated;
grant execute on function public.social_list_notifications() to authenticated;
grant execute on function public.social_mark_notification_read(uuid) to authenticated;
