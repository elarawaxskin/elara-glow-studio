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
```
