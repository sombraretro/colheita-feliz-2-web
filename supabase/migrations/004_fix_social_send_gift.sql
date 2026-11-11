-- Correção da concatenação de texto na notificação de envio de presentes.
-- A migração 003 usava +, operador inválido para concatenar texto no PostgreSQL.
create or replace function public.social_send_gift(p_receiver uuid,p_gift_type text,p_gift_id text)
returns table(state jsonb,revision bigint)
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_uid uuid := auth.uid();
  v_state jsonb;
  v_revision bigint;
  v_root text;
  v_count integer;
  v_label text;
begin
  if v_uid is null then raise exception 'É necessário entrar na conta.'; end if;
  if p_receiver is null or p_receiver=v_uid then raise exception 'Destinatário inválido.'; end if;
  if not exists(select 1 from public.social_friendships f
    where f.user_low=least(v_uid,p_receiver) and f.user_high=greatest(v_uid,p_receiver)) then
    raise exception 'Você só pode presentear jogadores que são seus amigos.';
  end if;
  if p_gift_type='bouquet' and p_gift_id=any(array['crisantemo','peonia','cravo','rosa_vermelha']) then
    v_root:='bouquets'; v_label:='um buquê';
  elsif p_gift_type='item' and p_gift_id=any(array['cabaca','flores_namorados','celebrando_namorados','eu_amo_voce','urso_namorados','onca','boca_leao','acai','afoxe','berimbau','cacau','chocalho','colares','espuma','maraca','martelo','mascara','papagaio','pau','peruca','serpentina']) then
    v_root:='giftInventory'; v_label:='um presente';
  else
    raise exception 'Tipo de presente não permitido.';
  end if;
  select fs.state,fs.revision into v_state,v_revision
    from public.farm_saves fs where fs.user_id=v_uid for update;
  if not found or v_state is null then raise exception 'Seu salvamento na nuvem não foi encontrado. Sincronize a fazenda e tente novamente.'; end if;
  v_count:=greatest(0,coalesce(nullif(v_state #>> array[v_root,p_gift_id],'')::integer,0));
  if v_count<1 then raise exception 'Você não possui este item para presentear.'; end if;
  v_state:=jsonb_set(v_state,array[v_root,p_gift_id],to_jsonb(v_count-1),true);
  v_state:=jsonb_set(v_state,'{updatedAt}',to_jsonb((extract(epoch from now())*1000)::bigint),true);
  update public.farm_saves fs set state=v_state,revision=fs.revision+1,updated_at=now()
    where fs.user_id=v_uid returning fs.revision into v_revision;
  insert into public.social_gifts(sender_id,receiver_id,gift_type,gift_id)
    values(v_uid,p_receiver,p_gift_type,p_gift_id);
  insert into public.social_notifications(user_id,actor_id,kind,payload)
    values(p_receiver,v_uid,'gift',jsonb_build_object('message','Enviou ' || v_label || '.','gift_type',p_gift_type,'gift_id',p_gift_id));
  return query select v_state,v_revision;
end;
$$;

revoke all on function public.social_send_gift(uuid,text,text) from public,anon;
grant execute on function public.social_send_gift(uuid,text,text) to authenticated;
