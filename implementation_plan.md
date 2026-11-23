# Implementation Plan

## Overview

Add a "First Time Guest / New Client 30% Off any service" promotional section to the Elara Glow Studio marketing website, mirroring the existing `LashLiftPromo` section pattern. The section will promote the offer from the attached flyer (30% off any service for new/first-time clients only, West El Paso, TX, book via GlossGenius) with no promo code mentioned. It will render on the home page in a prominent position and link to the existing GlossGenius booking URL.

## Types

No new type system changes are required. The component will be self-contained (following the existing `LashLiftPromo.tsx` pattern) and reference `siteConfig.bookingUrl` from `src/config/site.ts` for its CTA button. No modifications to `SiteConfig`, `Service`, `Treatment`, or related interfaces are needed.

## Files

### New file
- `src/components/sections/FirstTimeGuestPromo.tsx`
  - New React section component promoting the first-time guest offer.
  - Follows the `LashLiftPromo.tsx` structure: `grain relative overflow-hidden bg-silence` section wrapper, `Reveal` animations, headline/kicker copy, pricing/offer callout, CTA button linking to `siteConfig.bookingUrl`, supporting treatment image.
  - Copy based on the attached flyer: "NEW CLIENT 30% OFF any service", "BECAUSE SMOOTH SKIN FEELS BETTER. Let's glow together.", "First-time clients only", "Serving West El Paso, TX", "Book your glow today!".
  - Image: references `/promos/first-time-guest.jpg` (to be added by user from attached flyer at `/public/promos/first-time-guest.jpg`), with fallback to `/treatments/face.jpg` using the same onError pattern as `LashLiftPromo.tsx`.
  - Accessibility: `aria-label`, `alt` text on image, semantic section.

### Modified file
- `src/App.tsx`
  - Add import: `import { FirstTimeGuestPromo } from "./components/sections/FirstTimeGuestPromo";`
  - Add `<FirstTimeGuestPromo />` to the `Home()` component JSX, placed immediately after `<Hero />` (before `<Services />`) for prominent above-the-fold visibility of the new-client offer.

### Asset to add (user action)
- `/public/promos/first-time-guest.jpg` — the attached flyer image, saved by the user. Component includes an onError fallback to an existing treatment image so the site never breaks if the asset is missing.

### Files to delete or move
- None.

### Configuration updates
- None required.

## Functions

### New functions
- `FirstTimeGuestPromo()` in `src/components/sections/FirstTimeGuestPromo.tsx`
  - Signature: `export function FirstTimeGuestPromo() { return <section>...</section>; }`
  - Purpose: Renders the first-time guest promo section on the home page.

### Modified functions
- `Home()` in `src/App.tsx`
  - Required changes: import and render `<FirstTimeGuestPromo />` after `<Hero />`.

### Removed functions
- None.

## Classes

No class-based components are used in this codebase (functional components only). No class changes.

## Dependencies

No new dependencies. Uses existing libraries already in `package.json`: `react`, `react-router-dom`, `tailwindcss`, plus local utilities (`cn`, `Reveal`, `Button`, `siteConfig`).

## Testing

- No test framework is currently configured in the project (no vitest/jest, no `.test.*` files). No new test files will be added.
- Validation strategy:
  1. Run `npm run typecheck` (`tsc --noEmit`) to confirm TypeScript compiles.
  2. Run `npm run build` (`vite build`) to confirm the production build succeeds.
  3. Run `npm run dev` and manually inspect the home page to confirm the section renders, the CTA button links to the GlossGenius booking URL, and the image loads (with fallback working if the asset is not yet placed).
  4. Verify responsive behavior on mobile (Tailwind `md:` breakpoints match existing sections).

## Implementation Order

1. Create `src/components/sections/FirstTimeGuestPromo.tsx` (new section component).
2. Modify `src/App.tsx`: import and render `<FirstTimeGuestPromo />` in `Home()` after `<Hero />`.
3. User places the flyer image at `/public/promos/first-time-guest.jpg`.
4. Run `npm run typecheck` and `npm run build` to verify no errors.
5. Run `npm run dev` and manually verify rendering, CTA link, image, and responsive layout.
6. Commit changes.
