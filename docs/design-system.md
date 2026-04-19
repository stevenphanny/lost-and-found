# Design System

Single source of truth for visual tokens. Defined in `app/globals.css` as CSS custom properties and exposed to Tailwind via `@theme`. If you need a new token, add it here first, then to `globals.css`.

> Streetwear-first. Monochrome base, one accent, tight type, hard edges. Motion is slow and deliberate. When in doubt, remove an effect rather than add one.

---

## Colour

All values are raw hex so they're easy to reason about. The palette is monochrome plus a single accent. No gradients, no shadows outside the `shadow-*` debug utilities.

| Token | Hex | Tailwind class | Usage |
| --- | --- | --- | --- |
| `--ink` | `#0A0A0A` | `bg-ink` / `text-ink` | Primary text, buttons, logo. Near-black (not pure black — softer on paper-white). |
| `--paper` | `#FAFAFA` | `bg-paper` / `text-paper` | Page background, inverse text on ink. |
| `--brand` | `#E53935` | `bg-brand` / `text-brand` | **One use only**: conversion CTAs, drop countdowns, sold-out strike. Never decorative. This is the "accent" in PRD §10, renamed to avoid colliding with shadcn's neutral `accent` hover token. |
| `--brand-ink` | `#FFFFFF` | `text-brand-ink` | Text colour on brand fills. |
| `--muted-1` | `#6B6B6B` | `text-muted-1` | Secondary text (prices-were, metadata, captions). |
| `--muted-2` | `#A1A1A1` | `text-muted-2` | Placeholder text, disabled controls. |
| `--muted-3` | `#E5E5E5` | `bg-muted-3` | Soft surfaces (pill backgrounds, inputs). |
| `--hairline` | `#E0E0E0` | `border-hairline` | 1px dividers. Always 1px — never thicker. |

### Semantic mappings

The shadcn tokens (`--background`, `--foreground`, `--primary`, etc.) are re-mapped to the brand palette in `globals.css`. Components that come from shadcn ship as-is and automatically inherit the brand. Never change a shadcn component to a brand token manually — change the mapping in `globals.css`.

### Dark mode

Dark mode flips ink/paper. Accent red stays the same. Wired in `.dark` selector. Not exposed in the UI yet — will re-evaluate post-Phase 1. Build components so they respond to the class; don't hardcode light values.

---

## Typography

Two families, both from Google Fonts via `next/font`. They are **placeholders** until the display face is locked (see PRD §10 and `docs/decisions.md`). Candidates: Neue Haas Grotesk Display, TWK Everett, PP Neue Montreal.

- **Display** — `var(--font-display)` → Inter Tight → tight tracking, used for headings, product names, hero. Weight 600 default, 700 for hero.
- **Body** — `var(--font-sans)` → Inter → long copy, UI, forms.

### Scale

| Role | Tailwind class | Size / line-height | Tracking |
| --- | --- | --- | --- |
| Display XL | `text-[clamp(3rem,8vw,6rem)]` | Hero headline | `-0.03em` |
| Display L | `text-5xl md:text-6xl` | Section intros | `-0.025em` |
| H1 | `text-4xl md:text-5xl` | Page titles | `-0.02em` |
| H2 | `text-3xl md:text-4xl` | Section titles | `-0.02em` |
| H3 | `text-xl md:text-2xl` | Card titles, product names | `-0.015em` |
| Body | `text-base` | Default paragraph | `0` |
| Small | `text-sm` | Metadata, footnotes | `0` |
| Micro | `text-xs uppercase tracking-[0.18em]` | Eyebrows, badges | `0.18em` |

Headings use `font-display` automatically via `@layer base`. Don't apply `font-display` explicitly to an `<h2>` — it's already there.

### Rules

- No italics. If you want emphasis, use weight or the accent colour.
- Never centre-align body copy longer than one line.
- Use `text-balance` on headings, `text-pretty` on lead paragraphs.
- Uppercase is reserved for micro labels and badges only. Never for headings.

---

## Spacing

Use Tailwind defaults (`4px` grid). Two project-specific conventions:

- **Section padding**: `py-16 md:py-24 lg:py-32` for full-bleed sections on marketing pages.
- **Container**: `mx-auto w-full max-w-[1440px] px-6 md:px-10` — generous gutters, wide cap, never centre-cramped.

---

## Radius

| Token | Value | Usage |
| --- | --- | --- |
| `--radius-sm` | `0px` | Buttons, inputs, cards — default. Sharp corners read as "brand". |
| `--radius-md` | `2px` | Rare — toasts, chips. |
| `--radius-lg` | `4px` | Occasional — never on images. |

`--radius` (shadcn base) is `0`. If you need rounded corners, think twice.

---

## Motion

- **Ease** — always `var(--ease-brand)` (`cubic-bezier(0.22, 1, 0.36, 1)`). No bouncy springs, no default ease.
- **Duration** — 400–800ms for reveals, 150–250ms for hover/state. Never instant, never over 1s.
- **GSAP** — used for cinematic scroll-triggered reveals (hero, manifesto). Dynamic import in client components to avoid SSR weight.
- **Framer Motion** (added when needed) — reserved for component micro-interactions (drawer, dialog, hover).

---

## Icons

Use `lucide-react`. Default size `h-4 w-4`. Icon-only buttons must carry an `aria-label`.

---

## Imagery

- 4:5 aspect on product grids and PDP primary gallery.
- 16:9 or 21:9 on editorial / lookbook.
- Always `next/image`; hero poster uses `priority`, everything else lazy.
- Photo treatment (grain, soft focus, motion blur) belongs in post-production, not CSS filters.

---

## Debug

`app/debug/design/page.tsx` renders the full stack (type, colours, components) for visual verification. Deleted before Phase 1 ships.
