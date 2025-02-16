drop type if exists public.color_modes;
create type public.color_modes as enum ('system', 'light', 'dark');

alter table if exists public.user_settings
  add column if not exists first_name text null,
  add column if not exists last_name text null,
  add column if not exists email text null,
  add column if not exists phone_number text null,
  add column if not exists color_mode public.color_modes null default 'system'::color_modes,
  add constraint users_phone_number_key unique (phone_number),
  add constraint users_email_key unique (email);