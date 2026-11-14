-- Mantém a contagem diária compatível com o cliente Production legado (fuso de Brasília).
-- A Preview envia explicitamente o fuso local do visitante.
create or replace function public.social_help_friend_status(
 p_owner uuid,
 p_timezone text default 'America/Sao_Paulo'
)
returns jsonb
language plpgsql
security definer
set search_path=''
as $$
declare
 v_uid uuid:=auth.uid();
 v_timezone text:=coalesce(nullif(trim(p_timezone),''),'America/Sao_Paulo');
 v_today date;
 v_used integer:=0;
begin
 if v_uid is null then raise exception 'É necessário entrar na conta.';end if;
 if p_owner is null or p_owner=v_uid then raise exception 'Fazenda inválida.';end if;
 if not exists(select 1 from public.social_friendships f where f.user_low=least(v_uid,p_owner) and f.user_high=greatest(v_uid,p_owner)) then raise exception 'Você precisa ser amigo deste jogador para ajudar na fazenda.';end if;
 if not exists(select 1 from pg_catalog.pg_timezone_names z where z.name=v_timezone) then raise exception 'Fuso horário inválido.';end if;
 v_today:=(now() at time zone v_timezone)::date;
 select case when u.usage_date=v_today then u.interactions else 0 end into v_used
 from public.social_help_friend_daily_usage u where u.helper_id=v_uid;
 return jsonb_build_object('used',coalesce(v_used,0),'limit',15,'remaining',greatest(0,15-coalesce(v_used,0)),'timezone',v_timezone,'usage_date',v_today);
end;
$$;
revoke all on function public.social_help_friend_status(uuid,text) from public,anon;
grant execute on function public.social_help_friend_status(uuid,text) to authenticated;
