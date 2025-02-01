create table
  public.user_settings (
    id uuid not null references auth.users on delete cascade,
    created_at timestamp with time zone not null default now(),
    is_admin boolean not null default false,
    primary key (id),
    constraint users_id_key unique (id)
  ) tablespace pg_default;