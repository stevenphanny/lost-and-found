@AGENTS.md

# CLAUDE.md

This file is automatically loaded by Claude Code at the start of every session. It's the source of truth for how this codebase works. Keep it short, accurate, and current.

## What this is

**Lost and Found** — a streetwear brand's Next.js storefront on headless Shopify. The Next.js app is the brand-forward frontend; Shopify (Basic plan) handles commerce; Sanity handles editorial content.

Full product brief lives in `docs/PRD.md`. Read it once at the start of any substantial task, but don't re-read it every turn — use it as reference.

## Stack

- **Framework:** Next.js 16.2.4 (App Router, RSC, Server Actions)
- **Language:** TypeScript, strict mode
- **Styling:** Tailwind CSS v4
- **UI primitives:** shadcn/ui + Radix
- **Motion:** GSAP (cinematic, scroll-triggered) + Framer Motion (component micro-interactions)
- **Forms:** React Hook Form + Zod
- **Cart state:** Zustand + localStorage persistence
- **Commerce backend:** Shopify Storefront API + Admin API + Customer Account API
- **CMS (editorial only, not products):** Sanity
- **Email (customer-facing):** Shopify Email
- **Email (contact form relay):** Resend
- **Hosting:** Vercel
- **Analytics:** Vercel Analytics + PostHog (cookieless preferred)
- **Errors:** Sentry

## Non-negotiable rules

1. **No custom database.** Shopify owns products/variants/stock/customers/orders/addresses. Sanity owns editorial content. We don't add Postgres/MySQL/SQLite. If you think we need one, stop and ask.
2. **No Better Auth, NextAuth, Clerk, or any other auth library.** Auth = Shopify Customer Account API (OAuth 2.0 + PKCE). The one acceptable library for helper utilities around OAuth is one you find approved in `docs/approved-libraries.md` (doesn't exist yet — ask before adding).
3. **No Shop Pay button on our storefront.** Don't render any Shop Pay accelerated checkout button on PDP, cart, or drawer. (It can still appear on Shopify's hosted checkout page — that's fine, that's not us.)
4. **Products come from Shopify, not Sanity.** Sanity is for hero content, manifesto, lookbook, size guides, legal pages. Never model a product schema in Sanity.
5. **Adapter pattern for commerce data.** All Shopify reads/writes go through `lib/shop/` which exports a typed `shop` object. Components never import from `@shopify/*` packages directly.
6. **Server-first.** Default to React Server Components. Use `"use client"` only when required (interactivity, hooks, browser APIs). Cart is the main legitimate client-side surface.
7. **Cache aggressively.** Storefront API queries use `next: { tags: [...] }`. Webhook handlers call `revalidateTag`. Never `fetch` with `cache: 'no-store'` unless it's customer-specific data.
8. **Validate at every boundary.** Zod schemas for: form inputs, route handler bodies, webhook payloads, env vars.
9. **No secrets in client code.** Storefront API token is public (safe on client). Admin API token is server-only. Customer Account API uses OAuth (no long-lived secrets client-side).

## Repo conventions

- **Path aliases:** `@/*` → `./*` (repo root acts as the source root — there is no `src/` directory)
- **Route handlers:** `app/api/**/route.ts`
- **Server actions:** co-located in `app/**/actions.ts`
- **Commerce adapter:** `lib/shop/` (see §Adapter pattern below)
- **Sanity:** `sanity/` (schemas, client, queries)
- **UI primitives:** `components/ui/` (shadcn-generated)
- **App components:** `components/` (organised by domain: `product/`, `cart/`, `layout/`, etc.)
- **Types:** co-locate; only put in `types/` if truly cross-cutting
- **Env:** validated via `env.ts` using `@t3-oss/env-nextjs` — add new env vars here first

## Adapter pattern (commerce)

```
lib/shop/
  index.ts          # exports `shop: ShopAdapter` — use this everywhere
  types.ts          # Product, Variant, Cart, etc. — our domain types, not Shopify's raw types
  mock.ts           # hardcoded mock data for dev without Shopify creds
  shopify/          # real implementation
    index.ts        # exports shopifyAdapter
    client.ts       # Storefront API GraphQL client
    queries/        # .graphql files or gql template literals
    mappers.ts      # Shopify types → our domain types
```

The switch:

```ts
export const shop: ShopAdapter = process.env.SHOPIFY_STORE_DOMAIN ? shopifyAdapter : mockAdapter;
```

When adding a new data need (e.g. product reviews, wishlist), add the method to `ShopAdapter` interface, implement in both `mock.ts` and `shopify/`. Never add ad-hoc Shopify calls elsewhere.

## What you should always do

- Read `docs/PRD.md` once per fresh context before substantial work.
- Check `docs/tickets/` for the active ticket before starting.
- Run `npm run lint` and `npm run typecheck` before saying a task is done.
- When adding a dependency, explain why in the commit message and flag it to the user if it's non-trivial.
- When a decision isn't covered here or in the PRD, ask the user before picking.

## What you should never do

- Add a database.
- Add an auth library.
- Add Shopify SDK imports outside `lib/shop/`.
- Render Shop Pay UI on our pages.
- Store customer PII in our app (we hold session tokens only).
- Use `dangerouslySetInnerHTML` without explicit approval.
- Commit `.env*` files, `node_modules`, or build artifacts.

## Open decisions still to be made

Track in `docs/decisions.md` as they come up. Currently open:

- Exact display typeface (candidates: Neue Haas Grotesk Display, TWK Everett, PP Neue Montreal)
- Whether to use `gql.tada` or `graphql-codegen` for typed GraphQL — decide in Phase 2 when we start real Shopify integration
- Final colour token values (placeholder set in design system)
