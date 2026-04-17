import type { ShopAdapter } from "./types";
import { mockAdapter } from "./mock";

// In Phase 2 we'll import shopifyAdapter and switch based on env vars.
// For now, always use mock data.
export const shop: ShopAdapter = mockAdapter;

export type { ShopAdapter } from "./types";
export type { Money, Image, Product, Variant, Collection, Cart, CartLine } from "./types";
