
revoke all on function public.social_help_friend_action(uuid,text,integer,text,text,text) from public,anon;
grant execute on function public.social_help_friend_action(uuid,text,integer,text,text,text) to authenticated;
