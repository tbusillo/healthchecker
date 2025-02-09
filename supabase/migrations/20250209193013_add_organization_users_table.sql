
create table if not exists public.organization_users (
  id uuid not null default gen_random_uuid (),
  organization_id uuid not null,
  user_id uuid not null,
  is_admin boolean not null default false,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  constraint organization_users_pkey primary key(id),
  constraint organization_users_organization_id_fkey foreign key (organization_id) references public.organizations(id),
  constraint organization_users_user_id_fkey foreign key (user_id) references auth.users(id)
);

alter table organization_users enable row level security;