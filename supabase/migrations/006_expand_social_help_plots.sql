-- Expansão da ajuda entre amigos para os 72 canteiros.
-- A nova área (índices 36 a 71) exige nível 50 a 85, um canteiro por nível.
create or replace function public.social_help_friend_farm(
  p_owner uuid,
  p_plot_index integer,
  p_action text
)
returns table(
  state jsonb,
  revision bigint,
  daily_used integer,
  daily_limit integer,
  xp_awarded integer,
  green_coin_awarded integer,
  plot_index integer,
  action_kind text
)
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_uid uuid := auth.uid();
  v_day date := timezone('America/Sao_Paulo',now())::date;
  v_used integer;
  v_helper_state jsonb;
  v_owner_state jsonb;
  v_helper_revision bigint;
  v_owner_revision bigint;
  v_plot jsonb;
  v_snapshot jsonb;
  v_catalog jsonb := '{"nabo":{"xp":40,"yield":36,"seasons":1,"hours":10,"regrowHours":null,"kind":"crop"},"cenoura":{"xp":40,"yield":41,"seasons":1,"hours":15,"regrowHours":null,"kind":"crop"},"feijao":{"xp":42,"yield":42,"seasons":1,"hours":17,"regrowHours":null,"kind":"crop"},"arroz":{"xp":44,"yield":44,"seasons":1,"hours":18,"regrowHours":null,"kind":"crop"},"milho":{"xp":40,"yield":42,"seasons":1,"hours":20,"regrowHours":null,"kind":"crop"},"batata":{"xp":40,"yield":48,"seasons":1,"hours":24,"regrowHours":null,"kind":"crop"},"berinjela":{"xp":40,"yield":54,"seasons":1,"hours":30,"regrowHours":null,"kind":"crop"},"tomate":{"xp":90,"yield":35,"seasons":2,"hours":26,"regrowHours":10,"kind":"crop"},"pimenta":{"xp":90,"yield":39,"seasons":2,"hours":30,"regrowHours":12,"kind":"crop"},"abobora":{"xp":90,"yield":36,"seasons":2,"hours":34,"regrowHours":12,"kind":"crop"},"ervilha":{"xp":90,"yield":43,"seasons":1,"hours":34,"regrowHours":null,"kind":"crop"},"morango":{"xp":150,"yield":31,"seasons":3,"hours":31,"regrowHours":12,"kind":"crop"},"maca":{"xp":150,"yield":28,"seasons":3,"hours":35,"regrowHours":14,"kind":"crop"},"melancia":{"xp":153,"yield":30,"seasons":3,"hours":40,"regrowHours":14,"kind":"crop"},"banana":{"xp":156,"yield":33,"seasons":3,"hours":45,"regrowHours":18,"kind":"crop"},"pessego":{"xp":159,"yield":32,"seasons":3,"hours":60,"regrowHours":22,"kind":"crop"},"laranja":{"xp":162,"yield":34,"seasons":3,"hours":66,"regrowHours":24,"kind":"crop"},"uva":{"xp":220,"yield":30,"seasons":4,"hours":66,"regrowHours":24,"kind":"crop"},"roma":{"xp":224,"yield":29,"seasons":4,"hours":55,"regrowHours":22,"kind":"crop"},"melao":{"xp":150,"yield":40,"seasons":3,"hours":40,"regrowHours":16,"kind":"crop"},"cana":{"xp":150,"yield":40,"seasons":3,"hours":40,"regrowHours":16,"kind":"crop"},"lichia":{"xp":165,"yield":42,"seasons":3,"hours":61,"regrowHours":27,"kind":"crop"},"kiwi":{"xp":195,"yield":46,"seasons":3,"hours":40,"regrowHours":16,"kind":"crop"},"abacaxi":{"xp":210,"yield":48,"seasons":3,"hours":56,"regrowHours":22,"kind":"crop"},"cereja":{"xp":240,"yield":52,"seasons":3,"hours":40,"regrowHours":16,"kind":"crop"},"pitaya":{"xp":240,"yield":46,"seasons":4,"hours":50,"regrowHours":18,"kind":"crop"},"manga":{"xp":240,"yield":46,"seasons":4,"hours":45,"regrowHours":18,"kind":"crop"},"cacau":{"xp":224,"yield":78,"seasons":4,"hours":86,"regrowHours":51,"kind":"crop"},"caviar":{"xp":120,"yield":20,"seasons":1,"hours":70,"regrowHours":null,"kind":"crop"},"goiaba":{"xp":240,"yield":40,"seasons":4,"hours":40,"regrowHours":16,"kind":"crop"},"coco":{"xp":280,"yield":40,"seasons":4,"hours":35,"regrowHours":14,"kind":"crop"},"arvore_natal":{"xp":50,"yield":12,"seasons":1,"hours":72,"regrowHours":null,"kind":"crop"},"batata_doce":{"xp":75,"yield":47,"seasons":1,"hours":18,"regrowHours":null,"kind":"crop"},"amendoim":{"xp":80,"yield":57,"seasons":1,"hours":25,"regrowHours":null,"kind":"crop"},"limao":{"xp":225,"yield":50,"seasons":3,"hours":40,"regrowHours":16,"kind":"crop"},"noz":{"xp":248,"yield":28,"seasons":4,"hours":92,"regrowHours":54,"kind":"crop"},"cabaceira":{"xp":140,"yield":45,"seasons":3,"hours":42,"regrowHours":16,"kind":"crop"},"cacau_pascoa":{"xp":150,"yield":52,"seasons":3,"hours":48,"regrowHours":18,"kind":"crop"},"pinheiro_natal":{"xp":120,"yield":51,"seasons":4,"hours":27,"regrowHours":11,"kind":"crop"},"trigo":{"xp":120,"yield":30,"seasons":2,"hours":35,"regrowHours":14,"kind":"crop"},"beterraba":{"xp":88,"yield":47,"seasons":1,"hours":34,"regrowHours":null,"kind":"crop"},"capim_limao":{"xp":65,"yield":50,"seasons":1,"hours":40,"regrowHours":null,"kind":"crop"},"semente_papai":{"xp":150,"yield":80,"seasons":1,"hours":35,"regrowHours":null,"kind":"crop"},"arvore_jujuba":{"xp":114,"yield":45,"seasons":3,"hours":33,"regrowHours":14,"kind":"crop"},"arvore_pirulito":{"xp":140,"yield":70,"seasons":1,"hours":40,"regrowHours":null,"kind":"crop"},"louro":{"xp":165,"yield":46,"seasons":3,"hours":34,"regrowHours":14,"kind":"crop"},"uva_verde":{"xp":130,"yield":62,"seasons":2,"hours":36,"regrowHours":14,"kind":"crop"},"begonia":{"xp":60,"yield":24,"seasons":2,"hours":35,"regrowHours":13,"kind":"flower"},"bordo":{"xp":144,"yield":45,"seasons":4,"hours":34,"regrowHours":12,"kind":"crop"},"abacate_australiano":{"xp":112,"yield":30,"seasons":4,"hours":32,"regrowHours":13,"kind":"crop"},"eucalipto":{"xp":60,"yield":66,"seasons":4,"hours":34,"regrowHours":14,"kind":"crop"},"arvore_serpentina":{"xp":51,"yield":32,"seasons":3,"hours":33,"regrowHours":12,"kind":"crop"},"pinha":{"xp":240,"yield":39,"seasons":3,"hours":37,"regrowHours":15,"kind":"crop"},"lilas":{"xp":65,"yield":75,"seasons":1,"hours":34,"regrowHours":null,"kind":"crop"},"cominho":{"xp":144,"yield":70,"seasons":8,"hours":37,"regrowHours":16,"kind":"crop"},"bromelia":{"xp":128,"yield":60,"seasons":8,"hours":33,"regrowHours":15,"kind":"crop"},"alpinia":{"xp":176,"yield":73,"seasons":8,"hours":49,"regrowHours":20,"kind":"crop"},"arvore_garrafa":{"xp":160,"yield":64,"seasons":8,"hours":44,"regrowHours":18,"kind":"crop"},"nepenthes":{"xp":176,"yield":62,"seasons":8,"hours":46,"regrowHours":19,"kind":"crop"},"lirio_aranha":{"xp":152,"yield":68,"seasons":8,"hours":39,"regrowHours":17,"kind":"crop"},"lotus_neve":{"xp":192,"yield":58,"seasons":8,"hours":52,"regrowHours":21,"kind":"crop"},"neve":{"xp":966,"yield":45,"seasons":8,"hours":189,"regrowHours":72,"kind":"crop"},"planta_fogo":{"xp":220,"yield":70,"seasons":8,"hours":50,"regrowHours":18,"kind":"crop"},"fenix":{"xp":208,"yield":72,"seasons":8,"hours":42,"regrowHours":18,"kind":"crop"},"crisantemo":{"xp":35,"yield":2,"seasons":1,"hours":8,"regrowHours":null,"kind":"flower"},"peonia":{"xp":60,"yield":4,"seasons":1,"hours":12,"regrowHours":null,"kind":"flower"},"cravo":{"xp":80,"yield":5,"seasons":1,"hours":16,"regrowHours":null,"kind":"flower"},"rosa_vermelha":{"xp":110,"yield":6,"seasons":1,"hours":20,"regrowHours":null,"kind":"flower"},"flor_tilia":{"xp":35,"yield":3,"seasons":1,"hours":12,"regrowHours":null,"kind":"flower"},"flor_ouro":{"xp":40,"yield":3,"seasons":1,"hours":14,"regrowHours":null,"kind":"flower"},"copo_leite":{"xp":35,"yield":3,"seasons":1,"hours":12,"regrowHours":null,"kind":"flower"},"narciso":{"xp":40,"yield":3,"seasons":1,"hours":14,"regrowHours":null,"kind":"flower"},"flor_ameixa":{"xp":45,"yield":4,"seasons":1,"hours":16,"regrowHours":null,"kind":"flower"},"gloria_manha":{"xp":48,"yield":4,"seasons":1,"hours":16,"regrowHours":null,"kind":"flower"},"tulipa":{"xp":50,"yield":4,"seasons":1,"hours":18,"regrowHours":null,"kind":"flower"},"lirio":{"xp":55,"yield":5,"seasons":1,"hours":20,"regrowHours":null,"kind":"flower"},"rosas_azuis":{"xp":65,"yield":6,"seasons":1,"hours":22,"regrowHours":null,"kind":"flower"},"flor_pessego":{"xp":50,"yield":4,"seasons":1,"hours":18,"regrowHours":null,"kind":"flower"},"arvore_romantica_chinesa":{"xp":125,"yield":33,"seasons":5,"hours":34,"regrowHours":12,"kind":"crop"},"cevada_terras":{"xp":150,"yield":65,"seasons":3,"hours":43,"regrowHours":16,"kind":"crop"},"lirio_kafir":{"xp":325,"yield":27,"seasons":5,"hours":31,"regrowHours":12,"kind":"flower"},"arvore_namorados":{"xp":150,"yield":38,"seasons":4,"hours":38,"regrowHours":16,"kind":"crop"},"carambola":{"xp":165,"yield":54,"seasons":4,"hours":42,"regrowHours":18,"kind":"crop"},"acerola":{"xp":145,"yield":48,"seasons":4,"hours":36,"regrowHours":15,"kind":"crop"},"jaca":{"xp":190,"yield":62,"seasons":4,"hours":54,"regrowHours":24,"kind":"crop"},"caju":{"xp":150,"yield":49,"seasons":4,"hours":39,"regrowHours":17,"kind":"crop"},"pera":{"xp":145,"yield":46,"seasons":4,"hours":38,"regrowHours":16,"kind":"crop"},"jabuticaba":{"xp":170,"yield":55,"seasons":4,"hours":46,"regrowHours":20,"kind":"crop"},"alface":{"xp":55,"yield":32,"seasons":1,"hours":10,"regrowHours":0,"kind":"crop"},"guarana":{"xp":175,"yield":51,"seasons":4,"hours":48,"regrowHours":21,"kind":"crop"},"mamao":{"xp":140,"yield":46,"seasons":3,"hours":34,"regrowHours":14,"kind":"crop"}}'::jsonb;
  v_crop jsonb;
  v_crop_id text;
  v_root text;
  v_count integer;
  v_remaining integer;
  v_now_ms bigint := (extract(epoch from now())*1000)::bigint;
  v_total_hours numeric;
  v_planted_at numeric;
  v_xp integer;
  v_before_level integer;
  v_owner_level integer;
  v_after_level integer;
  v_last_level integer;
  v_level_bonus integer := 0;
  v_green_award integer := 1;
  v_label text;
  v_progress numeric;
  v_public_plot jsonb;
begin
  if v_uid is null then raise exception 'É necessário entrar na conta.'; end if;
  if p_owner is null or p_owner=v_uid then raise exception 'Fazenda inválida.'; end if;
  if p_plot_index is null or p_plot_index<0 or p_plot_index>71 then raise exception 'Canteiro inválido.'; end if;
  if p_action is null or p_action not in ('water','harvest','pest','weed') then raise exception 'Ação de ajuda inválida.'; end if;

  if not exists(
    select 1 from public.social_friendships f
    where f.user_low=least(v_uid,p_owner) and f.user_high=greatest(v_uid,p_owner)
  ) then raise exception 'Você precisa ser amigo deste jogador para ajudar na fazenda.'; end if;

  insert into public.social_help_daily(helper_id,help_date,actions)
  values(v_uid,v_day,0) on conflict(helper_id,help_date) do nothing;
  select d.actions into v_used from public.social_help_daily d
   where d.helper_id=v_uid and d.help_date=v_day for update;
  if coalesce(v_used,0)>=10 then raise exception 'Você já utilizou suas 10 ajudas de hoje. Tente novamente amanhã.'; end if;

  -- Bloqueia os dois salvamentos sempre na mesma ordem para evitar deadlocks entre amigos.
  perform fs.user_id from public.farm_saves fs
   where fs.user_id in (v_uid,p_owner) order by fs.user_id for update;

  select fs.state,fs.revision into v_helper_state,v_helper_revision
   from public.farm_saves fs where fs.user_id=v_uid;
  if not found or v_helper_state is null then raise exception 'Seu salvamento na nuvem não foi encontrado. Sincronize a fazenda.'; end if;

  select fs.state,fs.revision into v_owner_state,v_owner_revision
   from public.farm_saves fs where fs.user_id=p_owner;
  if not found or v_owner_state is null then raise exception 'O salvamento desta fazenda não foi encontrado.'; end if;

  -- Revalida a amizade após obter os bloqueios.
  if not exists(
    select 1 from public.social_friendships f
    where f.user_low=least(v_uid,p_owner) and f.user_high=greatest(v_uid,p_owner)
  ) then raise exception 'A amizade não está mais ativa.'; end if;

  -- A segunda área é desbloqueada um canteiro por nível, do nível 50 ao 85.
  if p_plot_index>=36 then
    v_owner_level:=greatest(1,floor((-192+sqrt(36864+32*greatest(0,coalesce((v_owner_state->>'xp')::numeric,0))))/16)::integer+1);
    if v_owner_level < 50+(p_plot_index-36) then
      raise exception 'Este canteiro será liberado no nível %.',50+(p_plot_index-36);
    end if;
  end if;

  if jsonb_typeof(v_owner_state->'plots')<>'array'
     or jsonb_array_length(v_owner_state->'plots')<=p_plot_index then
    raise exception 'Canteiro não encontrado nesta fazenda.'; end if;
  v_plot:=v_owner_state->'plots'->p_plot_index;
  if coalesce(v_plot->>'status','')<>'growing' then raise exception 'Este canteiro não possui uma plantação ativa.'; end if;
  v_crop_id:=v_plot->>'crop';
  v_crop:=v_catalog->v_crop_id;
  if v_crop is null then raise exception 'Esta cultura não está disponível para ajuda online.'; end if;

  if p_action='water' then
    v_plot:=jsonb_set(v_plot,'{wateredAt}',to_jsonb(v_now_ms),true);
    v_xp:=2; v_label:='irrigação';
  elsif p_action='weed' then
    if coalesce((v_plot->>'weed')::boolean,false) is not true then raise exception 'Este canteiro não possui ervas daninhas.'; end if;
    v_plot:=jsonb_set(v_plot,'{weed}','false'::jsonb,true);
    v_plot:=jsonb_set(v_plot,'{weedCleared}','true'::jsonb,true);
    v_xp:=2; v_label:='remoção de ervas daninhas';
  elsif p_action='pest' then
    if coalesce((v_plot->>'pest')::boolean,false) is not true then raise exception 'Este canteiro não possui pragas.'; end if;
    v_plot:=jsonb_set(v_plot,'{pest}','false'::jsonb,true);
    v_plot:=jsonb_set(v_plot,'{pestCleared}','true'::jsonb,true);
    v_xp:=2; v_label:='remoção de pragas';
  else
    v_total_hours:=case
      when coalesce((v_plot->>'regrowing')::boolean,false) and v_crop->>'regrowHours' is not null
        then (v_crop->>'regrowHours')::numeric
      else (v_crop->>'hours')::numeric end * 0.2;
    v_planted_at:=coalesce(nullif(v_plot->>'plantedAt','')::numeric,0);
    v_progress:=case when v_total_hours>0 then (v_now_ms-v_planted_at)/(v_total_hours*3600000) else 0 end;
    if v_progress<1 then raise exception 'Esta plantação ainda não está pronta para colher.'; end if;

    v_root:=case when v_crop->>'kind'='flower' then 'flowerWarehouse' else 'warehouse' end;
    v_owner_state:=jsonb_set(v_owner_state,array[v_root],coalesce(v_owner_state->v_root,'{}'::jsonb),true);
    v_count:=greatest(0,coalesce(nullif(v_owner_state #>> array[v_root,v_crop_id],'')::integer,0));
    v_owner_state:=jsonb_set(v_owner_state,array[v_root,v_crop_id],to_jsonb(v_count+(v_crop->>'yield')::integer),true);
    v_remaining:=greatest(0,coalesce(nullif(v_plot->>'harvestsRemaining','')::integer,1)-1);
    if v_crop_id='pinheiro_natal' and v_remaining=0 then
      v_owner_state:=jsonb_set(v_owner_state,'{decorInventory}',coalesce(v_owner_state->'decorInventory','{}'::jsonb),true);
      v_count:=greatest(0,coalesce(nullif(v_owner_state #>> '{decorInventory,christmas_tree}','')::integer,0));
      v_owner_state:=jsonb_set(v_owner_state,'{decorInventory,christmas_tree}',to_jsonb(v_count+1),true);
    end if;
    if v_remaining>0 then
      v_plot:=jsonb_set(v_plot,'{plantedAt}',to_jsonb(v_now_ms),true);
      v_plot:=jsonb_set(v_plot,'{wateredAt}',to_jsonb(v_now_ms),true);
      v_plot:=jsonb_set(v_plot,'{harvestsRemaining}',to_jsonb(v_remaining),true);
      v_plot:=jsonb_set(v_plot,'{weed}','false'::jsonb,true);
      v_plot:=jsonb_set(v_plot,'{pest}','false'::jsonb,true);
      v_plot:=jsonb_set(v_plot,'{weedCleared}','false'::jsonb,true);
      v_plot:=jsonb_set(v_plot,'{pestCleared}','false'::jsonb,true);
      v_plot:=jsonb_set(v_plot,'{regrowing}','true'::jsonb,true);
    else
      v_plot:=jsonb_set(v_plot,'{status}','"spent"'::jsonb,true);
      v_plot:=jsonb_set(v_plot,'{crop}','null'::jsonb,true);
      v_plot:=jsonb_set(v_plot,'{plantedAt}','null'::jsonb,true);
      v_plot:=jsonb_set(v_plot,'{wateredAt}','null'::jsonb,true);
      v_plot:=jsonb_set(v_plot,'{weed}','false'::jsonb,true);
      v_plot:=jsonb_set(v_plot,'{pest}','false'::jsonb,true);
      v_plot:=jsonb_set(v_plot,'{harvestsRemaining}','0'::jsonb,true);
    end if;
    v_xp:=floor((v_crop->>'xp')::numeric/greatest(1,(v_crop->>'seasons')::numeric))::integer;
    v_label:='colheita de '||v_crop_id;
  end if;

  v_owner_state:=jsonb_set(v_owner_state,array['plots',p_plot_index::text],v_plot,true);
  v_owner_state:=jsonb_set(v_owner_state,'{updatedAt}',to_jsonb(v_now_ms),true);

  -- Recompensa no salvamento do ajudante; XP e moedas do proprietário nunca são tocados.
  v_before_level:=greatest(1,floor((-192+sqrt(36864+32*greatest(0,coalesce((v_helper_state->>'xp')::numeric,0))))/16)::integer+1);
  v_helper_state:=jsonb_set(v_helper_state,'{xp}',to_jsonb(greatest(0,coalesce((v_helper_state->>'xp')::numeric,0)+v_xp)),true);
  v_after_level:=greatest(1,floor((-192+sqrt(36864+32*greatest(0,(v_helper_state->>'xp')::numeric)))/16)::integer+1);
  v_last_level:=coalesce(nullif(v_helper_state->>'lastLevelRewarded','')::integer,v_before_level);
  if v_after_level>v_last_level then
    v_level_bonus:=v_after_level-v_last_level;
    v_helper_state:=jsonb_set(v_helper_state,'{lastLevelRewarded}',to_jsonb(v_after_level),true);
  elsif v_helper_state->>'lastLevelRewarded' is null then
    v_helper_state:=jsonb_set(v_helper_state,'{lastLevelRewarded}',to_jsonb(v_after_level),true);
  end if;
  v_green_award:=1+v_level_bonus;
  v_helper_state:=jsonb_set(v_helper_state,'{greenCoins}',to_jsonb(greatest(0,coalesce((v_helper_state->>'greenCoins')::integer,0)+v_green_award)),true);
  v_helper_state:=jsonb_set(v_helper_state,'{updatedAt}',to_jsonb(v_now_ms),true);

  update public.farm_saves fs set state=v_owner_state,revision=fs.revision+1,updated_at=now()
   where fs.user_id=p_owner returning fs.revision into v_owner_revision;
  update public.farm_saves fs set state=v_helper_state,revision=fs.revision+1,updated_at=now()
   where fs.user_id=v_uid returning fs.revision into v_helper_revision;

  update public.social_help_daily d set actions=d.actions+1,updated_at=now()
   where d.helper_id=v_uid and d.help_date=v_day returning d.actions into v_used;

  -- Atualiza apenas o canteiro público correspondente; não publica o salvamento privado.
  select p.farm_snapshot into v_snapshot from public.social_profiles p where p.user_id=p_owner for update;
  if v_snapshot is not null and jsonb_typeof(v_snapshot->'plots')='array'
     and jsonb_array_length(v_snapshot->'plots')>p_plot_index then
    v_public_plot:=jsonb_build_object(
      'status',v_plot->>'status',
      'crop',case when v_plot->>'crop'='null' then null else v_plot->>'crop' end,
      'progress',case when v_plot->>'status'='growing' then
        greatest(0,least(1,(v_now_ms-coalesce(nullif(v_plot->>'plantedAt','')::numeric,0))/
          (case when coalesce((v_plot->>'regrowing')::boolean,false) and v_crop->>'regrowHours' is not null then (v_crop->>'regrowHours')::numeric else (v_crop->>'hours')::numeric end*0.2*3600000)))
        else 0 end,
      'weed',coalesce((v_plot->>'weed')::boolean,false),
      'pest',coalesce((v_plot->>'pest')::boolean,false),
      'soil',case when v_plot->>'soil'='red' then 'red' else 'normal' end
    );
    v_snapshot:=jsonb_set(v_snapshot,array['plots',p_plot_index::text],v_public_plot,true);
    update public.social_profiles set farm_snapshot=v_snapshot,updated_at=now() where user_id=p_owner;
  end if;

  insert into public.social_notifications(user_id,actor_id,kind,payload)
  values(p_owner,v_uid,'help',jsonb_build_object('message','Ajudou no canteiro '||(p_plot_index+1)::text||': '||v_label||'.','action',p_action,'plot_index',p_plot_index));

  return query select v_helper_state,v_helper_revision,v_used,10,v_xp,v_green_award,p_plot_index,p_action;
end;
$$;

revoke all on function public.social_help_friend_farm(uuid,integer,text) from public,anon;
grant execute on function public.social_help_friend_farm(uuid,integer,text) to authenticated;
