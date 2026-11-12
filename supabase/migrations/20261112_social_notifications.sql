-- Colheita Feliz 2: notificações sociais para visitas e curtidas, com leitura em lote.
-- Mantém a caixa social existente e amplia os tipos de evento suportados.
alter table public.social_notifications drop constraint if exists social_notifications_kind_check;
alter table public.social_notifications add constraint social_notifications_kind_check
check (kind in ('friend_request','friend_accepted','message','gift','help','farm_visit','farm_like'));

create or replace function public.social_notify_farm_visit(p_owner uuid)
returns void language plpgsql security definer set search_path = '' as $$
declare v_uid uuid := auth.uid();
begin
 if v_uid is null then raise exception 'É necessário entrar na conta.'; end if;
 if p_owner is null or p_owner=v_uid then raise exception 'Visita inválida.'; end if;
 if not exists(select 1 from public.social_friendships f where f.user_low=least(v_uid,p_owner) and f.user_high=greatest(v_uid,p_owner)) then raise exception 'Apenas amigos podem visitar esta fazenda.'; end if;
 if exists(select 1 from public.social_farm_visit_settings s where s.user_id=p_owner and s.allow_friend_visits=false) then raise exception 'Este jogador bloqueou visitas à fazenda.'; end if;
 if not exists(select 1 from public.social_notifications n where n.user_id=p_owner and n.actor_id=v_uid and n.kind='farm_visit' and n.created_at>now()-interval '5 minutes') then
  insert into public.social_notifications(user_id,actor_id,kind,payload) values(p_owner,v_uid,'farm_visit',jsonb_build_object('message','Visitou sua fazenda.'));
 end if;
end; $$;

create or replace function public.social_notify_farm_like(p_owner uuid)
returns void language plpgsql security definer set search_path = '' as $$
declare v_uid uuid := auth.uid();
begin
 if v_uid is null then raise exception 'É necessário entrar na conta.'; end if;
 if p_owner is null or p_owner=v_uid then raise exception 'Curtida inválida.'; end if;
 if not exists(select 1 from public.social_friendships f where f.user_low=least(v_uid,p_owner) and f.user_high=greatest(v_uid,p_owner)) then raise exception 'Apenas amigos podem curtir esta fazenda.'; end if;
 if not exists(select 1 from public.social_farm_likes l where l.owner_id=p_owner and l.liker_id=v_uid) then raise exception 'A curtida não está ativa.'; end if;
 if not exists(select 1 from public.social_notifications n where n.user_id=p_owner and n.actor_id=v_uid and n.kind='farm_like' and n.created_at>now()-interval '1 minute') then
  insert into public.social_notifications(user_id,actor_id,kind,payload) values(p_owner,v_uid,'farm_like',jsonb_build_object('message','Curtiu sua fazenda.'));
 end if;
end; $$;

create or replace function public.social_mark_all_notifications_read()
returns integer language plpgsql security definer set search_path = '' as $$
declare v_uid uuid := auth.uid(); v_count integer;
begin
 if v_uid is null then raise exception 'É necessário entrar na conta.'; end if;
 update public.social_notifications set read_at=now() where user_id=v_uid and read_at is null;
 get diagnostics v_count=row_count;
 return v_count;
end; $$;

revoke all on function public.social_notify_farm_visit(uuid) from public,anon;
revoke all on function public.social_notify_farm_like(uuid) from public,anon;
revoke all on function public.social_mark_all_notifications_read() from public,anon;
grant execute on function public.social_notify_farm_visit(uuid) to authenticated;
grant execute on function public.social_notify_farm_like(uuid) to authenticated;
grant execute on function public.social_mark_all_notifications_read() to authenticated;
