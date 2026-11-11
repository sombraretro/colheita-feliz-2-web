-- Colheita cooperativa: permite que amigos colham ciclos maduros na fazenda visitada.
-- A validação de maturidade e os dados de rendimento/XP são calculados no servidor.

alter table public.friend_farm_help_actions
  drop constraint if exists friend_farm_help_actions_action_type_check;

alter table public.friend_farm_help_actions
  add constraint friend_farm_help_actions_action_type_check
  check (action_type in ('water','weed','pest','harvest'));

alter table public.friend_farm_help_actions
  add column if not exists crop_id text,
  add column if not exists crop_yield integer,
  add column if not exists crop_xp integer,
  add column if not exists crop_seasons integer,
  add column if not exists crop_is_flower boolean;

drop function if exists public.help_friend_farm_plot(uuid, integer, text);

create function public.help_friend_farm_plot(
  p_owner_id uuid,
  p_plot_index integer,
  p_action_type text
)
returns table (
  action_id uuid,
  helper_id uuid,
  planted_at bigint,
  acted_at_ms bigint,
  reward integer,
  crop_id text,
  crop_yield integer,
  crop_xp integer,
  crop_seasons integer,
  crop_is_flower boolean
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
  v_crop_id text;
  v_hours numeric;
  v_regrow_hours numeric;
  v_crop_yield integer;
  v_crop_xp integer;
  v_crop_seasons integer;
  v_crop_is_flower boolean;
  v_duration_hours numeric;
begin
  if v_helper is null then raise exception 'Entre na sua conta para ajudar um amigo.'; end if;
  if p_owner_id is null or p_owner_id = v_helper then raise exception 'Esta ação só pode ser feita na fazenda de um amigo.'; end if;
  if p_plot_index is null or p_plot_index < 0 or p_plot_index > 35 then raise exception 'Canteiro inválido.'; end if;
  if p_action_type is null or p_action_type not in ('water','weed','pest','harvest') then raise exception 'Ação de ajuda inválida.'; end if;
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
  elsif p_action_type = 'harvest' then
    v_crop_id := v_plot ->> 'crop';
    select c.hours, c.regrow_hours, c.crop_yield, c.crop_xp, c.crop_seasons, c.crop_is_flower
      into v_hours, v_regrow_hours, v_crop_yield, v_crop_xp, v_crop_seasons, v_crop_is_flower
    from (values
    ('nabo', 10, 10, 36, 40, 1, false),
    ('cenoura', 15, 15, 41, 40, 1, false),
    ('milho', 20, 20, 42, 40, 1, false),
    ('batata', 24, 24, 48, 40, 1, false),
    ('berinjela', 30, 30, 54, 40, 1, false),
    ('tomate', 26, 10, 35, 90, 2, false),
    ('pimenta', 30, 12, 39, 90, 2, false),
    ('abobora', 34, 12, 36, 90, 2, false),
    ('ervilha', 34, 34, 43, 90, 1, false),
    ('morango', 31, 12, 31, 150, 3, false),
    ('maca', 35, 14, 28, 150, 3, false),
    ('melancia', 40, 14, 30, 153, 3, false),
    ('banana', 45, 18, 33, 156, 3, false),
    ('pessego', 60, 22, 32, 159, 3, false),
    ('laranja', 66, 24, 34, 162, 3, false),
    ('uva', 66, 24, 30, 220, 4, false),
    ('roma', 55, 22, 29, 224, 4, false),
    ('melao', 40, 16, 40, 150, 3, false),
    ('cana', 40, 16, 40, 150, 3, false),
    ('lichia', 61, 27, 42, 165, 3, false),
    ('kiwi', 40, 16, 46, 195, 3, false),
    ('abacaxi', 56, 22, 48, 210, 3, false),
    ('cereja', 40, 16, 52, 240, 3, false),
    ('pitaya', 50, 18, 46, 240, 4, false),
    ('manga', 45, 18, 46, 240, 4, false),
    ('cacau', 86, 51, 78, 224, 4, false),
    ('caviar', 70, 70, 20, 120, 1, false),
    ('goiaba', 40, 16, 40, 240, 4, false),
    ('coco', 35, 14, 40, 280, 4, false),
    ('arvore_natal', 72, 72, 12, 50, 1, false),
    ('batata_doce', 18, 18, 47, 75, 1, false),
    ('amendoim', 25, 25, 57, 80, 1, false),
    ('limao', 40, 16, 50, 225, 3, false),
    ('noz', 92, 54, 28, 248, 4, false),
    ('cabaceira', 42, 16, 45, 140, 3, false),
    ('cacau_pascoa', 48, 18, 52, 150, 3, false),
    ('pinheiro_natal', 27, 11, 51, 120, 4, false),
    ('trigo', 35, 14, 30, 120, 2, false),
    ('beterraba', 34, 34, 47, 88, 1, false),
    ('capim_limao', 40, 40, 50, 65, 1, false),
    ('semente_papai', 35, 35, 80, 150, 1, false),
    ('arvore_jujuba', 33, 14, 45, 114, 3, false),
    ('arvore_pirulito', 40, 40, 70, 140, 1, false),
    ('louro', 34, 14, 46, 165, 3, false),
    ('uva_verde', 36, 14, 62, 130, 2, false),
    ('begonia', 35, 13, 24, 60, 2, true),
    ('bordo', 34, 12, 45, 144, 4, false),
    ('abacate_australiano', 32, 13, 30, 112, 4, false),
    ('eucalipto', 34, 14, 66, 60, 4, false),
    ('arvore_serpentina', 33, 12, 32, 51, 3, false),
    ('pinha', 37, 15, 39, 240, 3, false),
    ('lilas', 34, 34, 75, 65, 1, false),
    ('cominho', 37, 16, 70, 144, 8, false),
    ('bromelia', 33, 15, 60, 128, 8, false),
    ('alpinia', 49, 20, 73, 176, 8, false),
    ('arvore_garrafa', 44, 18, 64, 160, 8, false),
    ('nepenthes', 46, 19, 62, 176, 8, false),
    ('lirio_aranha', 39, 17, 68, 152, 8, false),
    ('lotus_neve', 52, 21, 58, 192, 8, false),
    ('neve', 189, 72, 45, 966, 8, false),
    ('planta_fogo', 50, 18, 70, 220, 8, false),
    ('fenix', 42, 18, 72, 208, 8, false),
    ('crisantemo', 8, 8, 2, 35, 1, true),
    ('peonia', 12, 12, 4, 60, 1, true),
    ('cravo', 16, 16, 5, 80, 1, true),
    ('rosa_vermelha', 20, 20, 6, 110, 1, true),
    ('flor_tilia', 12, 12, 3, 35, 1, true),
    ('flor_ouro', 14, 14, 3, 40, 1, true),
    ('copo_leite', 12, 12, 3, 35, 1, true),
    ('narciso', 14, 14, 3, 40, 1, true),
    ('flor_ameixa', 16, 16, 4, 45, 1, true),
    ('gloria_manha', 16, 16, 4, 48, 1, true),
    ('tulipa', 18, 18, 4, 50, 1, true),
    ('lirio', 20, 20, 5, 55, 1, true),
    ('rosas_azuis', 22, 22, 6, 65, 1, true),
    ('flor_pessego', 18, 18, 4, 50, 1, true),
    ('arvore_romantica_chinesa', 34, 12, 33, 125, 5, false),
    ('cevada_terras', 43, 16, 65, 150, 3, false),
    ('lirio_kafir', 31, 12, 27, 325, 5, true),
    ('arvore_namorados', 38, 16, 38, 150, 4, false),
    ('carambola', 42, 18, 54, 165, 4, false),
    ('acerola', 36, 15, 48, 145, 4, false),
    ('jaca', 54, 24, 62, 190, 4, false),
    ('caju', 39, 17, 49, 150, 4, false),
    ('pera', 38, 16, 46, 145, 4, false),
    ('jabuticaba', 46, 20, 55, 170, 4, false),
    ('alface', 10, 10, 32, 55, 1, false),
    ('guarana', 48, 21, 51, 175, 4, false),
    ('mamao', 34, 14, 46, 140, 3, false)
    ) as c(crop_id,hours,regrow_hours,crop_yield,crop_xp,crop_seasons,crop_is_flower)
    where c.crop_id = v_crop_id;
    if not found then raise exception 'Esta cultura não está habilitada para colheita por amigos.'; end if;
    v_duration_hours := case when coalesce((v_plot ->> 'regrowing')::boolean,false) then v_regrow_hours else v_hours end;
    if v_now_ms < v_planted_at + floor(v_duration_hours * 0.2 * 3600000)::bigint then
      raise exception 'Esta plantação ainda não está madura para a colheita.';
    end if;
  end if;

  insert into public.friend_farm_help_actions (
    owner_id, helper_id, plot_index, action_type, planted_at,
    previous_watered_at, acted_at_ms, crop_id, crop_yield, crop_xp,
    crop_seasons, crop_is_flower
  ) values (
    p_owner_id, v_helper, p_plot_index, p_action_type, v_planted_at,
    case when p_action_type = 'water' then v_watered_at else null end,
    v_now_ms, v_crop_id, v_crop_yield, v_crop_xp, v_crop_seasons, v_crop_is_flower
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
    return query select v_existing.id, v_existing.helper_id, v_existing.planted_at,
      v_existing.acted_at_ms, 1, v_existing.crop_id, v_existing.crop_yield,
      v_existing.crop_xp, v_existing.crop_seasons, v_existing.crop_is_flower;
    return;
  end if;

  return query select v_action_id, v_helper, v_planted_at, v_now_ms, 1,
    v_crop_id, v_crop_yield, v_crop_xp, v_crop_seasons, v_crop_is_flower;
end;
$$;

revoke all on function public.help_friend_farm_plot(uuid, integer, text) from public, anon;
grant execute on function public.help_friend_farm_plot(uuid, integer, text) to authenticated;
