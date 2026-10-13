# Elara Glow Studio

Refined body care & waxing treatments — West El Paso, TX.

## Stack

- React 18 + TypeScript + Vite 5
- Tailwind CSS 3

## Structure (feature-based)

```
src/
  main.tsx                 # Vite entry (StrictMode only)
  App.tsx                  # Composition only
  vite-env.d.ts
  index.css                # Design tokens + base styles
  config/site.ts           # Editable content + NAV_LINKS
  hooks/useReveal.ts       # Scroll-reveal IntersectionObserver
  lib/cn.ts                # classNames helper
  components/
    layout/Header.tsx
    layout/Footer.tsx
    sections/Hero.tsx
    sections/Services.tsx
    sections/Philosophy.tsx
    sections/About.tsx
    sections/Experience.tsx
    sections/Visit.tsx
    ui/Button.tsx
    ui/Badge.tsx
    ui/SectionHeading.tsx
    ui/Reveal.tsx
```

## Guidelines

- Functional components only, typed props (`*Props` interfaces), no `any`.
- One component per file, `PascalCase` filenames, named exports.
- Content lives in `src/config/site.ts` — no hardcoded copy in sections.
- Use theme tokens (`bg-perch`, `text-text-soft`, `border-line`, `font-display`) instead of `bg-[var(--...)]`.
- `Reveal` wrapper for scroll animations; respects `prefers-reduced-motion`.
- Semantic landmarks: `header` / `main` / `section` / `footer`, `aria-label` on navs.

## Run

```bash
npm install
npm run dev        # http://localhost:5173
npm run typecheck  # tsc --noEmit
npm run build      # typecheck + production build
npm run preview    # preview dist build
npm run sitemap    # rebuild public/sitemap.xml from published posts
```

## Blog & Studio Manager

Private admin at `/admin/login` (Supabase Auth email + password). Public
journal at `/blog` and `/blog/:slug`.

### Env (never commit `.env`)

```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
VITE_SITE_URL=https://www.elaraglowstudio.com
```

See `.env.example`. Only the anon key ships to the browser — never the
service-role key.

### Supabase setup (one-time, manual)

1. Create a Supabase project, then open the SQL editor and run
   `supabase/migrations/20261013_blog.sql` (creates `blog_admins`,
   `blog_posts`, RLS policies, and Storage policies for the `blog-images`
   bucket).
2. In **Storage**, create a public bucket named `blog-images` (the migration
   assumes it exists; policies restrict writes to admins).
3. In **Authentication → Users**, create the owner's login (email + password),
   copy the user UUID, then grant access:
   `insert into public.blog_admins (user_id, email) values ('<uuid>', '<email>');`
4. Add the env vars above locally and in your host (Netlify/Vercel/etc.),
   then redeploy. Run `npm run sitemap` before deploy so new posts enter
   `public/sitemap.xml` (`/admin` is disallowed in `robots.txt`).

### Testing checklist

- Signed-out visit to `/admin/blog` redirects to `/admin/login`.
- Wrong password shows an error; authorized login lands on `/admin/blog`.
- Non-allowlisted authenticated user is signed out with "not authorized".
- Create draft → invisible on `/blog`; publish → visible by slug;
  unpublish → 404-styled page; delete requires confirmation.
- Duplicate slug shows a friendly error (DB unique constraint backs it).
- JPEG/PNG/WebP ≤ 5 MB upload with preview; public images load on articles.
- Article shows SEO title/meta/canonical/OG + `BlogPosting` JSON-LD.
- `/` and `/treatments` unchanged; mobile + keyboard/focus states verified.
