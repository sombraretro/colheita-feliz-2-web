-- Mantém compatibilidade com a versão Production anterior enquanto o novo cliente é validado na Preview.
-- A implementação real permanece centralizada em social_help_friend_action.
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
set search_path=''
as $$
begin
 return query
 select r.state,r.revision,r.daily_used,r.daily_limit,r.xp_awarded,
        r.green_coin_awarded,r.slot,r.action_kind
 from public.social_help_friend_action(
   p_owner,'farm',p_plot_index,p_action,null,'America/Sao_Paulo'
 ) r;
end;
$$;
revoke all on function public.social_help_friend_farm(uuid,integer,text) from public,anon;
grant execute on function public.social_help_friend_farm(uuid,integer,text) to authenticated;
