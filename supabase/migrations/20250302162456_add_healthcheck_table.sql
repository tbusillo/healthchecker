create table
  public.healthchecks (
    id uuid not null default gen_random_uuid (),
    name text not null,
    status text not null,
    url text not null,
    interval integer not null,
    timeout integer not null,
    expected_response jsonb null,
    created_at timestamp with time zone not null default now(),
    updated_at timestamp with time zone not null default now(),
    primary key (id)
  ) tablespace pg_default;

create table public.healthcheck_logs (
  id uuid not null default gen_random_uuid (),
  healthcheck_id uuid not null,
  status text not null,
  response jsonb null,
  created_at timestamp with time zone not null default now(),
  primary key (id),
  constraint healthcheck_logs_healthcheck_id_fkey foreign key (healthcheck_id) references public.healthchecks(id)
) tablespace pg_default;

create table public.organization_healthchecks (
  id uuid not null default gen_random_uuid (),
  organization_id uuid not null,
  healthcheck_id uuid not null,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  primary key (id),
  constraint organization_healthchecks_organization_id_fkey foreign key (organization_id) references public.organizations(id),
  constraint organization_healthchecks_healthcheck_id_fkey foreign key (healthcheck_id) references public.healthchecks(id)
) tablespace pg_default;

ALTER TABLE public.healthchecks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.healthcheck_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organization_healthchecks ENABLE ROW LEVEL SECURITY;