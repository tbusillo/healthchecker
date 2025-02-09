create table if not exists public.organizations (
  id uuid not null default gen_random_uuid (),
  name text not null,
  constraint organizations_pkey primary key(id),
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

alter table organizations enable row level security;