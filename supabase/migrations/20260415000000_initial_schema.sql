-- TODO_TEMPLATE: replace this file with the first real migration for the app.

create extension if not exists pgcrypto;

create table if not exists public.healthcheck (
  id uuid primary key default gen_random_uuid(),
  environment text not null,
  created_at timestamptz not null default now()
);

insert into public.healthcheck (environment)
values ('template');
