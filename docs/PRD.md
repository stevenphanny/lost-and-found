# Lost and Found — Website PRD (v1.0)

> Custom Next.js storefront for streetwear brand _Lost and Found_ on **headless Shopify (Basic plan)**.
> Shopify powers commerce (products, inventory, customers, orders, payments, fulfilment, email).
> Our Next.js app is the fully custom, brand-forward frontend.
> Sanity handles editorial content (hero, manifesto, lookbook, legal pages).

**Status:** Architecture locked. Ready to break into tickets.

---

## 1. Vision

Lost and Found is a visually-led streetwear brand with a dreamlike, slightly melancholic aesthetic (butterflies, reaching hands, 失物招領, Y2K star motifs). The site should feel like **an editorial moodboard first, a store second** — conversion matters, but so does differentiating from generic Shopify themes.

**Success criteria:**

1. Visitors feel the brand within 3 seconds of landing.
2. First-time visitor can go homepage → product → checkout in under 60 seconds.
3. Owner manages everything commerce-related in Shopify admin they already know; editorial content in Sanity.

---

## 2. Users

- **Buyer** — 18–28, mobile-first (~70%+ mobile), discovers via Instagram/TikTok, impulse-driven, expects Apple Pay speed.
- **Returning customer** — checks order status, tracking, re-buys.
- **Admin (owner)** — non-technical; uses Shopify admin + Sanity Studio.

---

## 3. Decisions Locked In

| Decision               | Choice                                          | Rationale                                                                           |
| ---------------------- | ----------------------------------------------- | ----------------------------------------------------------------------------------- |
| Architecture           | Headless Shopify                                | Client already pays; removes ~40% backend work; no customer/order migration needed  |
| Shopify plan           | Basic                                           | Sufficient for launch; upgrade triggers documented                                  |
| Auth                   | Shopify Customer Account API (OAuth)            | Links users natively to Shopify orders/addresses; passkeys + passwordless supported |
| Storefront data        | Shopify Storefront API (GraphQL)                | Cached aggressively at edge                                                         |
| Admin ops              | Shopify admin                                   | Owner already trained                                                               |
| CMS (editorial)        | Sanity                                          | Hero, manifesto, lookbook, legal pages; not products                                |
| Product images         | Shopify CDN (native)                            | —                                                                                   |
| Editorial images       | Sanity CDN (native)                             | —                                                                                   |
| Payments               | Shopify Checkout (hosted)                       | Shop Pay, Apple Pay, Google Pay, card, Afterpay, Link; PCI + fraud + tax handled    |
| Shop Pay on storefront | Hidden (we don't render the button)             | Keeps brand coherent; still available on Shopify checkout page                      |
| Database (custom)      | None                                            | Shopify owns all transactional data                                                 |
| Transactional email    | Shopify Email (native)                          | Order confirmation, shipping notification                                           |
| Marketing email        | Shopify Email                                   | 10k free/mo; unified in Shopify admin; list portable via CSV export                 |
| Contact form email     | Resend                                          | Dev-friendly; relays to owner's inbox                                               |
| Hosting                | Vercel                                          | —                                                                                   |
| Analytics              | Vercel Analytics + PostHog free                 | —                                                                                   |
| Error tracking         | Sentry free                                     | —                                                                                   |
| Shipping at launch     | AU-only                                         | Flip International on via Shopify shipping zones later                              |
| Guest checkout         | Allowed                                         | Shopify native                                                                      |
| Stock tracking         | Shopify native, per variant                     | Zero custom                                                                         |
| Drops / releases       | Countdown + notify-me via metafields            | No true pre-order at launch (revisit v2 with paid Shopify app if needed)            |
| Catalog page name      | "Catalog" (kept)                                | —                                                                                   |
| Dev bootstrap          | Stubbed shop adapter until Shopify creds arrive | Unblocks frontend build                                                             |
| ABN                    | `123456789` placeholder                         | Replace before launch                                                               |
| Domain                 | TBD (to be purchased)                           | —                                                                                   |

---

## 4. Tech Stack

### Frontend

| Layer         | Choice                                                                            |
| ------------- | --------------------------------------------------------------------------------- |
| Framework     | Next.js 15 (App Router, RSC)                                                      |
| Language      | TypeScript (strict)                                                               |
| Styling       | Tailwind CSS v4                                                                   |
| UI primitives | shadcn/ui + Radix                                                                 |
| Motion        | GSAP (cinematic, scroll-triggered) + Framer Motion (component micro-interactions) |
| Forms         | React Hook Form + Zod                                                             |
| Cart state    | Zustand + localStorage persistence                                                |
| Icons         | Lucide                                                                            |

### Backend / Data

| Layer                           | Choice                                                        |
| ------------------------------- | ------------------------------------------------------------- |
| Runtime                         | Next.js Server Actions + Route Handlers                       |
| Commerce                        | Shopify Storefront API + Admin API + Customer Account API     |
| GraphQL client                  | Typed fetch with codegen (`gql.tada` or `graphql-codegen`)    |
| Content                         | Sanity (Studio at `/studio`)                                  |
| Validation                      | Zod                                                           |
| Email (marketing/transactional) | Shopify Email                                                 |
| Email (contact form)            | Resend + React Email                                          |
| Webhooks                        | Shopify → Next.js route handlers at `/api/webhooks/shopify/*` |

### Monthly cost at launch

- Shopify Basic: **paid by client** (≈$39 USD/mo)
- Vercel: **$0** (free tier)
- Sanity: **$0** (free tier)
- Resend: **$0** (free tier)
- PostHog: **$0** (free tier)
- Sentry: **$0** (free tier)
- Payment processing: **Shopify Payments** at AU domestic rates

**Additional cost added by this project: $0.**

---

## 5. Information Architecture

```
/                       → Home
/catalog                → Catalog
/catalog/[handle]       → Product detail (Shopify uses "handle")
/cart                   → Cart page (+ global drawer)
/checkout               → Redirect to Shopify Checkout
/checkout/success       → Post-checkout return page
/account                → Customer profile (Shopify Customer Account)
/account/orders         → Order history
/account/orders/[id]    → Order detail + tracking
/account/addresses      → Address book
/contact                → Contact form
/auth/sign-in           → Triggers Shopify Customer Account OAuth
/auth/callback          → OAuth callback
/studio                 → Sanity Studio (editorial only)
/legal/privacy
/legal/terms
/legal/returns
/legal/shipping
```

No custom admin panel. No custom studio for products.

---

## 6. Feature Specs

### 6.1 Home

1. **Hero** — full-viewport video loop, brand mark, minimal nav, scroll indicator. GSAP scroll-triggered reveal. Poster fallback. Managed in Sanity.
2. **Current drop / campaign** — editorial block ("LOST IN A DREAM"), CTA. Sanity.
3. **Featured products** — 2–4 Shopify products from a "Featured" collection.
4. **Brand manifesto** — short copy + subtle parallax. Sanity.
5. **Lookbook strip** — horizontal scroll of 4–6 lifestyle shots. Sanity.
6. **Newsletter signup** — email field → creates Shopify customer with marketing opt-in via Admin API.
7. **Footer** — socials, legal, payment marks, ABN, © year.

**Performance targets:** LCP < 2.0s on 4G, CLS < 0.05. Video ≤ 3MB, AV1 + H.264 sources.

### 6.2 Catalog

Grid: 2-col mobile, 3-col tablet, 4-col desktop. Generous whitespace.

**Product card:** primary Shopify image (4:5), hover crossfade to second image, name, price, sold-out badge, "DROPPING {date}" badge if `release_at` metafield future.

**Filters v1:** Shopify collections as categories, size availability, sort (newest / price asc / price desc).

**Data:** Storefront API via Next.js `fetch` with tag-based revalidation. Tags invalidated by Shopify product-update webhook.

### 6.3 Product Detail

**Layout:** gallery left/top, info right/bottom.

- **Gallery:** all Shopify product images, thumbnails on desktop, swipe carousel on mobile, click-to-zoom, fullscreen lightbox.
- **Info panel:**
  - Title, price (GST-inclusive, "$42 AUD")
  - **Size selector — fully dynamic from Shopify variants.** 4 sizes, 7 sizes, one-size, no-size — render whatever exists. Disabled + strikethrough if `availableForSale: false`.
  - Quantity stepper (max = `quantityAvailable`)
  - Primary CTA priority:
    1. `Dropping {date}` countdown — if `release_at` future; not purchasable
    2. `Notify me` — if all variants sold out AND `notify_me_enabled`
    3. `Add to cart` — default
  - Accordions: description (Shopify), size guide (Sanity per category), materials & care (Shopify metafield), shipping & returns (Sanity)
- **Related products** — from Shopify `productRecommendations` query, 4 cards.

### 6.4 Cart

- **Drawer** (opens on add) — line items, subtotal, Checkout CTA, View cart CTA.
- **Full page `/cart`** — same + promo code field (redeemed on Shopify checkout).
- **No Shop Pay accelerated button** — keeps brand coherent.
- **Line item:** thumbnail, name, size, qty stepper, price, remove.
- **Persistence:** Shopify Cart API via `cartId` in localStorage. Survives refresh, continuity on login.
- **Edge cases:** variant unavailable (remove + toast), stock changed (clamp + warn), price changed (old → new).

### 6.5 Checkout

**Shopify-hosted Checkout.**

1. Cart → Checkout → redirect to `cart.checkoutUrl` (on Shopify's domain, Basic plan)
2. Shopify handles: address, shipping methods, payment (Shop Pay, Apple Pay, Google Pay, card, Afterpay, Link), tax, fraud, PCI
3. On success → redirect to our `/checkout/success`
4. Shopify sends branded order confirmation via Shopify Email

**Shopify Email branding:** templates configured in Shopify admin (`Settings > Notifications`) to match the Next.js site visually — same fonts (via web-safe fallbacks for email), colours, logo placement.

**Shipping rates:** configured in Shopify admin (AU Standard, AU Express, free-over-$X). Zero code.

**Tax:** Shopify native, GST-inclusive.

**Shop Pay on checkout page:** left enabled as a payment option (the Shop Pay modal appears alongside card/Apple Pay for returning Shop Pay users, capturing conversion). Can fully disable later in `Settings > Payments > Shopify Payments > Manage` if brand feel is too compromised.

**Known Basic-plan limitation:** checkout URL lives on `{store}.myshopify.com`, not our domain. Custom checkout domain is Plus-only. Industry-standard tradeoff; customers don't think twice.

### 6.6 Account (Shopify Customer Account API)

- `/auth/sign-in` → Shopify OAuth flow (user authenticates on Shopify's hosted page — email + code, passkey, or social) → returns to `/auth/callback` → store session.
- `/account` — profile (name, email) from Shopify customer.
- `/account/orders` — order list from Customer Account API.
- `/account/orders/[id]` — items, tracking number + URL (populated when Shopify marks fulfilled).
- `/account/addresses` — CRUD on Shopify-stored addresses.

No user data stored in our app. Just a session token.

### 6.7 Contact

Form: name, email, subject, message → route handler → Resend email to owner. Success state, response time expectation (48h), social handles, ABN.

If email matches an existing Shopify customer, attach a note to their customer record via Admin API (nice-to-have, v1.1).

### 6.8 Admin

**None built by us.** Owner uses:

- **Shopify admin** — products, variants, stock, orders, customers, fulfilment (print AusPost labels, mark shipped, add tracking, refunds, Shopify Email campaigns)
- **Sanity Studio** at `/studio` — homepage hero, manifesto, lookbook, size guides, legal pages, campaign blocks

---

## 7. Drops / Release Logic (no pre-order at launch)

Owner toggles per-product via **Shopify metafields** (one-time schema setup):

| Metafield (namespace `custom`) | Type        | Purpose                                                   |
| ------------------------------ | ----------- | --------------------------------------------------------- |
| `release_at`                   | Date + time | If future, product shows countdown and is non-purchasable |
| `notify_me_enabled`            | Boolean     | Show Notify Me button when sold out                       |
| `drop_badge_text`              | Short text  | Override default "DROPPING"                               |

**Notify Me flow:**

1. User submits email on PDP → route handler
2. POST to Shopify Admin API: create/update customer with `variantsOfInterest` metafield (array of variant IDs)
3. Shopify webhook `inventory_levels/update` fires on restock
4. Our handler: query customers with that variant in `variantsOfInterest` → send Shopify Email campaign (or individual email via Shopify Email API)
5. Remove variant from user's list

**Post-launch v2:** add true pre-order via Shopify app (Timesact, Preorder Manager, etc. ~$10/mo) if needed.

---

## 8. Data Flow Summary

```
 ┌──────────────┐         ┌──────────────────┐
 │   Browser    │◄───────►│  Next.js (Vercel)│
 └──────────────┘         └────────┬─────────┘
                                   │
               ┌───────────────────┼───────────────────┐
               ▼                   ▼                   ▼
      ┌─────────────────┐ ┌─────────────────┐ ┌────────────────┐
      │    Shopify      │ │     Sanity      │ │    Resend      │
      │ • Storefront API│ │ • Editorial     │ │ • Contact form │
      │ • Admin API     │ │   content       │ │   relay email  │
      │ • Customer Acct │ │ • Image CDN     │ │                │
      │ • Checkout host │ │                 │ │                │
      │ • Image CDN     │ │                 │ │                │
      │ • Email (all)   │ │                 │ │                │
      │ • Webhooks ─────┼─┤                 │ │                │
      └─────────────────┘ └─────────────────┘ └────────────────┘
```

**Caching:**

- Product queries: RSC `fetch` with `next: { tags: ['product-{handle}'] }` and `revalidateTag` triggered by Shopify product-update webhook.
- Collection queries: similar with `collection-{handle}` tags.
- Sanity content: tag-based with webhook-triggered revalidation.
- Customer account data: per-request, not cached.

---

## 9. Non-Functional Requirements

| Area            | Target                                                                                                                                   |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Performance     | LCP < 2.0s, INP < 200ms, CLS < 0.05 on mid-tier mobile 4G                                                                                |
| Lighthouse      | Perf 90+, A11y 95+, Best Practices 100, SEO 100                                                                                          |
| Accessibility   | WCAG 2.1 AA                                                                                                                              |
| SEO             | Per-route metadata, OG/Twitter cards, Product JSON-LD from Shopify data, dynamic sitemap, robots.txt, canonicals                         |
| Browser support | Latest 2 of Chrome/Safari/Firefox/Edge; iOS Safari 15+                                                                                   |
| Security        | Signed Shopify webhooks (HMAC verify), Customer Account OAuth PKCE, CSP headers, rate-limited contact form, Zod validation on all inputs |
| Privacy         | Privacy Act 1988 compliant; prefer cookieless PostHog (no banner); add banner if cookies enabled                                         |
| Legal (AU)      | ABN in footer (`123456789` placeholder), GST-inclusive pricing, ACL returns policy                                                       |

---

## 10. Design System (sketch)

**Palette:** near-black `#0A0A0A`, off-white `#FAFAFA`, accent red ≈`#E53935`, muted greys.

**Typography:** condensed sans for display, clean neutral sans for body. Candidates — display: Neue Haas Grotesk Display / TWK Everett / PP Neue Montreal; body: Inter or Söhne.

**Imagery:** grain, soft focus, motion blur, dreamy. Build photo treatment guidelines early.

**Motion:** slow, deliberate. Ease-out cubic. Avoid bouncy/springy.

Full tokens + components → `/docs/design-system.md` during Phase 1 using the `frontend-design` skill.

**Brand assets:** PNG logos provided by owner. Vectorise to SVG before launch (we can trace in-house) for crispness at all sizes.

---

## 11. Stub Data Layer (dev before Shopify creds)

```ts
// lib/shop/index.ts
export interface ShopAdapter {
  getProducts(params): Promise<Product[]>;
  getProduct(handle: string): Promise<Product | null>;
  getCollections(): Promise<Collection[]>;
  getCollection(handle: string): Promise<Collection | null>;
  getProductRecommendations(productId: string): Promise<Product[]>;
  createCart(): Promise<Cart>;
  addToCart(cartId: string, lines: CartLine[]): Promise<Cart>;
  updateCartLine(cartId: string, lineId: string, qty: number): Promise<Cart>;
  removeFromCart(cartId: string, lineId: string): Promise<Cart>;
  getCheckoutUrl(cartId: string): Promise<string>;
}

// lib/shop/mock.ts → hardcoded adapter matching Shopify's type shapes
// lib/shop/shopify.ts → real Storefront API calls

export const shop: ShopAdapter = process.env.SHOPIFY_STORE_DOMAIN ? shopifyAdapter : mockAdapter;
```

Mock data matches the two current products (black/white tees) + a hoodie placeholder, with realistic Shopify variant structures. Swap is a one-line env change when Shopify creds arrive.

---

## 12. Return Policy (owner-provided)

> Our goal is for every customer to be totally satisfied with their purchase. If this isn't the case, let us know and we'll do our best to work with you to make it right.

Stored in Sanity, rendered on `/legal/returns` and in PDP accordion. Pair with standard ACL boilerplate on the Terms page (consumer guarantees apply by law regardless of store policy).

---

## 13. Phased Rollout

### Phase 0 — Setup (1 day)

Repo, Next.js + TS + Tailwind v4, Vercel project, Sanity project + Studio, shadcn/ui, Sentry, PostHog, env structure, stub shop adapter.

### Phase 1 — Public shell (3–5 days)

Home, Catalog, Product detail, Contact — powered by stub + Sanity. Design system. First preview deploy. **"Does it feel like a brand" milestone.**

### Phase 2 — Shopify integration (3–4 days)

Swap stub → real Storefront API. Cart (Shopify Cart API + Zustand). Checkout redirect. Return URL handling. Webhook handlers for product/inventory updates. Verify stock + sold-out from real data.

### Phase 3 — Customer accounts (2–3 days)

Shopify Customer Account OAuth flow, session management, account pages.

### Phase 4 — Drops & content polish (2 days)

Metafield wiring for countdowns + notify-me. Notify-me email flow. Finalise Sanity schemas. Populate real content.

### Phase 5 — Launch prep (3–4 days)

SEO, sitemap, Product JSON-LD, legal pages, 404/500, loading/empty states, cross-browser QA, Lighthouse tune, Playwright smoke tests (add-to-cart, checkout redirect, sign-in, order view). Shopify Email templates branded to match site.

**Solo + AI-assisted, decent pace: ~2.5–3 weeks to launch.**

### Phase 6 — Post-launch backlog

- International shipping (enable Shopify shipping zones, ~half day)
- SVG logo (trace from PNG)
- Pre-order via Shopify app if demand exists
- Wishlist, reviews, editorial blog, gift cards
- Klaviyo migration if Shopify Email's automation is too limiting

---

## 14. Risks & Mitigations

| Risk                                          | Mitigation                                                                              |
| --------------------------------------------- | --------------------------------------------------------------------------------------- |
| Storefront API rate limits                    | Aggressive edge caching + tag revalidation; only hit API on webhook or cache miss       |
| Webhook delivery missed → stale stock         | Shopify retries + daily revalidation cron + short cache TTL fallback                    |
| Checkout brand feel compromised by Shopify UI | Use Shopify checkout branding settings (logo, colours, fonts); accept tradeoff on Basic |
| Customer Account OAuth edge cases             | Follow Shopify Hydrogen reference; test sign-in/out, token refresh, expired session     |
| Owner doesn't configure metafields correctly  | Ship metafield-definition JSON for one-time import; document with screenshots           |
| Launch-day bugs                               | Playwright smoke tests on critical flows + soft-launch to friends first                 |
| SVG logo not ready                            | In-house tracing from PNG; commission proper vector later                               |

---

## 15. Scalability Assessment

### What scales freely

- **Commerce ops** — Shopify handles 10,000+ orders/mo and 100,000+ products natively; none of our concern.
- **Vercel free tier** — ~30–50k visits/mo on bandwidth. Pro at $20/mo extends well past 100k.
- **Shopify Email** — 10k emails/mo free; $1 per 1,000 after.
- **Sanity free tier** — 10k documents, 500k CDN hits/mo. Far exceeds editorial content needs.

### Pressure points, in order of likelihood

1. Vercel bandwidth → upgrade to Pro ($20/mo).
2. Shopify Email past 10k/mo → small linear cost.
3. Advanced email automation (branching flows, heavy personalisation) → Klaviyo ($35–200/mo depending on list) — common "outgrew Shopify Email" moment.
4. Search when catalog passes ~50–100 SKUs → Algolia or Typesense.

### The one real cliff

Shopify Plus (~$2,400 AUD/mo) becomes necessary only if you need full checkout customisation (embedded checkout, custom checkout domain, React-based checkout UI). Only justified at serious revenue. Not a concern for launch or early growth.

### Portability

- Our frontend uses an adapter pattern (§11). To leave Shopify later: replace `shop` adapter → weeks of work, not a rewrite.
- Customers, orders, products all CSV-exportable from Shopify any time.
- Password hashes not transferable — users reset on first return to a new system.

### Overall grade

| Axis                  | Grade                                               |
| --------------------- | --------------------------------------------------- |
| Content scalability   | Excellent                                           |
| Commerce scalability  | Excellent                                           |
| Design flexibility    | Excellent                                           |
| Cost scalability      | Excellent (free at launch, cheap well into success) |
| Migration flexibility | Good (adapter pattern mitigates most lock-in)       |

Architecture is sound for the next 2–3 years of growth without meaningful rework.

---

## 16. Out of Scope (v1)

Live chat, product reviews, gift cards, loyalty/referral, multi-currency, blog, mobile app, international shipping, true pre-order (charge now, ship later).

---

## 17. Pre-Launch Checklist

- [ ] Shopify credentials provisioned (Storefront API token, Admin API access, Customer Account API app)
- [ ] Shopify metafield definitions imported (`release_at`, `notify_me_enabled`, `drop_badge_text`)
- [ ] Shopify Email notification templates branded
- [ ] Shopify shipping rates configured (AU Standard, AU Express, free-over-$X)
- [ ] Shopify return policy URL set (points to our `/legal/returns`)
- [ ] Real ABN replaces `123456789`
- [ ] Domain purchased + DNS pointed at Vercel
- [ ] SVG logo traced from PNG
- [ ] Legal pages populated in Sanity (privacy, terms, returns, shipping)
- [ ] Shopify Customer Account API redirect URIs whitelisted
- [ ] Sentry + PostHog + Vercel Analytics wired and verified
- [ ] Playwright smoke tests green on staging
- [ ] Soft-launch access granted to 5–10 friends for bug-hunt
