# Tickets — Phases 0 & 1

Work through these sequentially. Each ticket is self-contained: acceptance criteria and verification steps listed. Don't start ticket N+1 until ticket N is committed and verified.

When you finish a ticket: check the box, commit with the ticket ID in the message (e.g. `feat(0.1): initial next.js scaffold`), and move on.

---

### 0.2 Tooling

- [x] Add Prettier + `prettier-plugin-tailwindcss`, commit config
- [x] Add `@t3-oss/env-nextjs` + `zod`, create `env.ts` with empty schema for now
- [x] Configure `tsconfig.json` with `"strict": true`, `"noUncheckedIndexedAccess": true`
- [x] Add `.nvmrc` (Node 20 LTS)
- [x] Add `.editorconfig`

**Verify:** `npm run format` works, `npm run typecheck` script exists and passes.

### 0.3 shadcn/ui baseline

- [x] `npx shadcn@latest init` — base colour slate, CSS variables enabled
- [x] Add these components: `button`, `input`, `label`, `sheet` (for cart drawer), `dialog`, `accordion`, `dropdown-menu`, `form`, `select`, `separator`, `sonner` (toasts)
- [x] Remove the default template's `page.tsx` content; leave a placeholder "Lost and Found" text

**Verify:** import and render a `<Button>` somewhere to confirm wiring.

### 0.4 Commerce adapter skeleton (mock only)

- [x] Create `lib/shop/types.ts` with types: `Money`, `Image`, `Product`, `Variant`, `Collection`, `Cart`, `CartLine`
- [x] Create `lib/shop/mock.ts` with hardcoded data for 3 products: black LOST tee, white LOST tee, a placeholder hoodie. Each with S/M/L/XL variants, realistic stock levels, 2+ images (use Unsplash or placeholder URLs), prices in AUD.
- [x] Create `lib/shop/index.ts` exporting `shop: ShopAdapter` — for now always returns the mock adapter (Shopify adapter comes in Phase 2).
- [x] Follow the interface defined in CLAUDE.md §"Adapter pattern".

**Verify:** write a scratch page at `/app/_debug/page.tsx` that calls `shop.getProducts()` and renders JSON. Delete the scratch page when done.

### 0.5 Sanity project + Studio route

- [ ] Create Sanity project at sanity.io (free tier). Copy project ID + dataset name into `.env.local`.
- [ ] Install `next-sanity`, `@sanity/vision`, `sanity`
- [ ] Mount Studio at `/app/studio/[[...tool]]/page.tsx`
- [ ] Define initial schemas in `sanity/schemas/`:
  - `homepage` (singleton: heroVideoUrl, heroPosterUrl, heroHeadline, campaignTitle, campaignBody, campaignImage, campaignCtaLabel, campaignCtaHref, manifestoTitle, manifestoBody)
  - `lookbook` (singleton: images array with alt text)
  - `sizeGuide` (title, rows: [size, chest, length, shoulder])
  - `legalPage` (slug, title, body as portable text) — used for privacy/terms/returns/shipping
- [ ] Add `env.ts` entries: `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`

**Verify:** `/studio` loads in the browser, the schemas appear, you can create a Homepage document.

### 0.6 Observability baseline

- [ ] Install `@sentry/nextjs`. Run the wizard or manual config. Add DSN to env.
- [ ] Install `posthog-js` + `posthog-node`. Cookieless mode (`persistence: 'memory'`). Add key to env.
- [ ] Enable Vercel Analytics (`@vercel/analytics`) via `<Analytics />` in root layout.

**Verify:** trigger a test error in dev — Sentry captures it. Navigate a few pages — PostHog event stream shows pageviews.

### 0.7 Vercel preview deploy

- [ ] Push repo to GitHub
- [ ] Connect to Vercel, configure env vars on preview environment
- [ ] Confirm preview URL serves the placeholder page

**Verify:** preview URL loads, Sentry receives errors from preview, no console errors.

---

## Phase 1 — Public shell (powered by mock data + Sanity)

Goal: site looks and feels like the brand. No cart, no auth, no checkout yet. **"Does it feel like a brand" milestone.**

### 1.1 Design tokens

- [ ] Define CSS custom properties in `app/globals.css`: colour tokens (background, foreground, muted, accent-red), font stacks, spacing scale (use Tailwind defaults where possible), radius values.
- [ ] Pick and load two fonts via `next/font`:
  - Display: start with **Inter tight** as placeholder — swap to a paid display face (candidates in PRD §10) once chosen
  - Body: **Inter**
- [ ] Document every token in `docs/design-system.md` with usage notes.

**Verify:** render a typography stack (h1–h6, body, small) and colour swatches at `/_debug/design`. Delete when Phase 1 done.

### 1.2 Layout shell

- [ ] Root layout: html lang="en", body with font vars, `<Toaster />`, `<Analytics />`
- [ ] Top nav: logo (link to home), links (Catalog, Contact), icons (search — disabled stub, account — links to sign-in, cart — opens drawer)
- [ ] Footer: social links, legal nav, payment method marks (use SVG from a royalty-free set), ABN `123456789`, © year
- [ ] Mobile: hamburger triggers `<Sheet>` with full-screen nav
- [ ] Don't implement search yet — just the icon, disabled

**Verify:** nav works across pages, mobile drawer opens, focus trap correct, no layout shift.

### 1.3 Home page

- [ ] Fetch homepage document from Sanity (server component)
- [ ] Sections per PRD §6.1: hero video (with `<video>` + poster fallback), campaign block, featured products (pull first 3 from `shop.getProducts()`), manifesto, lookbook strip, newsletter signup (form doesn't submit yet — just renders), footer
- [ ] Implement GSAP scroll-triggered text reveal on hero headline (use `gsap/ScrollTrigger`, dynamic import to avoid SSR issues)
- [ ] Horizontal scroll on lookbook strip (CSS scroll-snap)
- [ ] Lazy-load below-fold images with `next/image`; hero poster uses `priority`

**Verify:** Lighthouse Performance > 85 on preview (will tune later in Phase 5). No CLS on hero. Video loads on fast connections, poster shown on slow.

### 1.4 Catalog page

- [ ] `/catalog` route
- [ ] Grid: 2-col mobile, 3-col tablet, 4-col desktop
- [ ] Product card: primary image, hover crossfade to second image (use CSS `:hover` + image stack; no JS state needed), name, price, sold-out badge if no variant `availableForSale`
- [ ] Filter UI (don't wire filtering logic yet — render dropdowns/buttons only): category, size, sort
- [ ] Pull products from `shop.getProducts()`

**Verify:** cards render, hover works on desktop, tap-target sizes correct on mobile, sold-out state visible on a variant-less mock product.

### 1.5 Product detail page

- [ ] `/catalog/[handle]` route
- [ ] Gallery with thumbnail strip on desktop (vertical or horizontal), swipe carousel on mobile. Click primary image opens fullscreen lightbox (use `<Dialog>`).
- [ ] Info panel: title, price, size selector (dynamic from variants), quantity stepper, Add-to-cart button (disabled / stubbed — no cart yet), accordions (description from mock product, size guide from Sanity, materials & care, shipping & returns from Sanity)
- [ ] Primary CTA state machine (per PRD §6.3): "Dropping {date}" → "Notify me" → "Add to cart". Notify-me form doesn't submit yet; just render state.
- [ ] Related products (bottom): pull 4 other products from mock

**Verify:** clicking a product card navigates to PDP, gallery works on both desktop and mobile, sold-out size buttons are disabled and visually struck through, lightbox opens.

### 1.6 Contact page

- [ ] `/contact` route
- [ ] Form: name, email, subject, message (React Hook Form + Zod)
- [ ] Submit handler is a stub that logs to console for now (wire Resend in Phase 2 or 4)
- [ ] Success state toggles to a thank-you panel
- [ ] Below form: response time copy ("within 48h"), social links, ABN

**Verify:** validation errors display, successful submit shows thank-you panel, no accessibility issues from axe DevTools.

### 1.7 Legal pages

- [ ] `/legal/[slug]` dynamic route
- [ ] Fetches `legalPage` doc by slug from Sanity
- [ ] Renders portable text with Tailwind Typography plugin
- [ ] Footer links: `/legal/privacy`, `/legal/terms`, `/legal/returns`, `/legal/shipping`
- [ ] Seed each with placeholder content in Sanity Studio (real copy owner-provided later)

**Verify:** all four legal URLs render Sanity content, typography looks right.

### 1.8 404 and error states

- [ ] Custom `not-found.tsx` at app root — on-brand, link back to home
- [ ] Custom `error.tsx` — on-brand, "something went wrong", retry button

**Verify:** navigate to a bad URL → 404 shows. Throw an error in a page → error page shows (in production build).

### 1.9 Phase 1 review and preview

- [ ] Full walkthrough on desktop + mobile (real device, not just devtools)
- [ ] Lighthouse audit on 3 pages (home, catalog, PDP)
- [ ] Accessibility audit with axe DevTools on same 3 pages
- [ ] Share preview URL with user for "does it feel like the brand" review

**Verify:** user signs off before moving to Phase 2.

---

## Notes for working through these

- If a ticket seems to require a decision that isn't in CLAUDE.md or the PRD, **stop and ask the user**. Don't assume.
- If a ticket's scope is growing (e.g. 1.3 Home page taking more than ~4 hours), split it and ask for confirmation.
- If a dependency you want to add isn't on the approved stack, ask before adding.
- Preview deploys are cheap and fast — push often. Don't save up a massive PR.
