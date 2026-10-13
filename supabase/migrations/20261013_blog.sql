-- Elara Glow Studio blog schema
-- Run in Supabase SQL editor (or supabase db push if CLI linked).

-- Required for gen_random_uuid()
create extension if not exists "pgcrypto";

-- 1) Admin allowlist: only user_ids present here can manage the blog.
create table if not exists public.blog_admins (
  user_id uuid primary key references auth.users (id) on delete cascade,
  email text,
  created_at timestamptz not null default now()
);

-- 2) Blog posts
create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(title) between 1 and 200),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  excerpt text,
  content jsonb not null default '{"type":"doc","content":[{"type":"paragraph"}]}'::jsonb,
  featured_image_url text,
  seo_title text,
  seo_description text,
  social_image_url text,
  status text not null default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  author_id uuid references auth.users (id) on delete set null
);

create index if not exists blog_posts_status_published_idx
  on public.blog_posts (status, published_at desc);
create index if not exists blog_posts_slug_idx on public.blog_posts (slug);
create unique index if not exists blog_posts_slug_unique_idx
  on public.blog_posts (slug);

-- Keep updated_at fresh (UTC via now())
create or replace function public.handle_blog_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists blog_posts_updated_at on public.blog_posts;
create trigger blog_posts_updated_at
  before update on public.blog_posts
  for each row execute function public.handle_blog_updated_at();

-- Helper: is the current user a blog admin? (no recursion: reads allowlist only)
create or replace function public.is_blog_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.blog_admins a where a.user_id = auth.uid()
  );
$$;

-- 3) Row Level Security
alter table public.blog_admins enable row level security;
alter table public.blog_posts enable row level security;

-- blog_admins: admins can read the allowlist; nobody else can.
drop policy if exists "blog_admins_admin_read" on public.blog_admins;
create policy "blog_admins_admin_read"
  on public.blog_admins for select
  to authenticated
  using (public.is_blog_admin());

-- blog_posts: public can read PUBLISHED posts only.
drop policy if exists "blog_posts_public_read" on public.blog_posts;
create policy "blog_posts_public_read"
  on public.blog_posts for select
  to anon, authenticated
  using (status = 'published');

-- blog_posts: admins can read everything.
drop policy if exists "blog_posts_admin_read" on public.blog_posts;
create policy "blog_posts_admin_read"
  on public.blog_posts for select
  to authenticated
  using (public.is_blog_admin());

-- blog_posts: admins can insert/update/delete.
drop policy if exists "blog_posts_admin_insert" on public.blog_posts;
create policy "blog_posts_admin_insert"
  on public.blog_posts for insert
  to authenticated
  with check (public.is_blog_admin());

drop policy if exists "blog_posts_admin_update" on public.blog_posts;
create policy "blog_posts_admin_update"
  on public.blog_posts for update
  to authenticated
  using (public.is_blog_admin())
  with check (public.is_blog_admin());

drop policy if exists "blog_posts_admin_delete" on public.blog_posts;
create policy "blog_posts_admin_delete"
  on public.blog_posts for delete
  to authenticated
  using (public.is_blog_admin());

-- 4) Storage: public bucket `blog-images` (create in Dashboard > Storage if missing)
--    then run the policies below.
  --  insert into storage.buckets (id, name, public) values ('blog-images','blog-images', true)
  --  on conflict (id) do update set public = true;

drop policy if exists "blog_images_public_read" on storage.objects;
create policy "blog_images_public_read"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'blog-images');

drop policy if exists "blog_images_admin_insert" on storage.objects;
create policy "blog_images_admin_insert"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'blog-images' and public.is_blog_admin());

drop policy if exists "blog_images_admin_update" on storage.objects;
create policy "blog_images_admin_update"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'blog-images' and public.is_blog_admin())
  with check (bucket_id = 'blog-images' and public.is_blog_admin());

drop policy if exists "blog_images_admin_delete" on storage.objects;
create policy "blog_images_admin_delete"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'blog-images' and public.is_blog_admin());

-- 5) Grant the first administrator (replace with the real auth user id + email):
  --  insert into public.blog_admins (user_id, email)
  --  values ('', '')
  --  on conflict (user_id) do nothing;
