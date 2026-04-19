import type { Cart, Collection, Money, Product, ShopAdapter, Variant } from "./types";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function aud(amount: string): Money {
  return { amount, currencyCode: "AUD" };
}

function makeVariants(
  productId: string,
  price: string,
  stock: Record<string, number>
): Variant[] {
  return (["S", "M", "L", "XL"] as const).map((size) => ({
    id: `${productId}-variant-${size}`,
    title: size,
    availableForSale: (stock[size] ?? 0) > 0,
    quantityAvailable: stock[size] ?? 0,
    price: aud(price),
    compareAtPrice: null,
    selectedOptions: [{ name: "Size", value: size }],
  }));
}

// ---------------------------------------------------------------------------
// Mock products
// ---------------------------------------------------------------------------

const PRODUCTS: Product[] = [
  {
    id: "mock-product-black-tee",
    handle: "lost-black-tee",
    title: "LOST Tee — Black",
    description:
      "Heavy-weight 320gsm cotton jersey. Screen-printed LOST logo on chest. Dropped shoulders, boxy fit. Preshrunk.",
    descriptionHtml:
      "<p>Heavy-weight 320gsm cotton jersey. Screen-printed LOST logo on chest. Dropped shoulders, boxy fit. Preshrunk.</p>",
    availableForSale: true,
    images: [
      {
        url: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80",
        altText: "LOST Black Tee — front",
        width: 800,
        height: 1000,
      },
      {
        url: "https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?w=800&q=80",
        altText: "LOST Black Tee — back",
        width: 800,
        height: 1000,
      },
    ],
    variants: makeVariants("mock-product-black-tee", "89.00", {
      S: 12,
      M: 8,
      L: 4,
      XL: 0,
    }),
    priceRange: {
      minVariantPrice: aud("89.00"),
      maxVariantPrice: aud("89.00"),
    },
    tags: ["tee", "essentials"],
    releaseAt: null,
    notifyMeEnabled: true,
    materialsCare:
      "100% heavyweight cotton jersey, 320gsm. Wash cold, inside out. Tumble dry low. Do not bleach. Iron inside out on medium.",
  },
  {
    id: "mock-product-white-tee",
    handle: "lost-white-tee",
    title: "LOST Tee — White",
    description:
      "Heavy-weight 320gsm cotton jersey. Screen-printed LOST logo on chest. Dropped shoulders, boxy fit. Preshrunk.",
    descriptionHtml:
      "<p>Heavy-weight 320gsm cotton jersey. Screen-printed LOST logo on chest. Dropped shoulders, boxy fit. Preshrunk.</p>",
    availableForSale: true,
    images: [
      {
        url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
        altText: "LOST White Tee — front",
        width: 800,
        height: 1000,
      },
      {
        url: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80",
        altText: "LOST White Tee — back",
        width: 800,
        height: 1000,
      },
    ],
    variants: makeVariants("mock-product-white-tee", "89.00", {
      S: 6,
      M: 10,
      L: 7,
      XL: 2,
    }),
    priceRange: {
      minVariantPrice: aud("89.00"),
      maxVariantPrice: aud("89.00"),
    },
    tags: ["tee", "essentials"],
    // Future drop date — PDP renders "Dropping {date}" state.
    releaseAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    notifyMeEnabled: true,
    materialsCare:
      "100% heavyweight cotton jersey, 320gsm. Wash cold, inside out. Tumble dry low.",
  },
  {
    id: "mock-product-hoodie",
    handle: "lost-hoodie",
    title: "LOST Hoodie",
    description:
      "Midweight 380gsm brushed fleece hoodie. Embroidered LOST wordmark. Kangaroo pocket, ribbed cuffs and hem. Relaxed fit.",
    descriptionHtml:
      "<p>Midweight 380gsm brushed fleece hoodie. Embroidered LOST wordmark. Kangaroo pocket, ribbed cuffs and hem. Relaxed fit.</p>",
    availableForSale: true,
    images: [
      {
        url: "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=800&q=80",
        altText: "LOST Hoodie — front",
        width: 800,
        height: 1000,
      },
      {
        url: "https://images.unsplash.com/photo-1578681994506-b8f463449011?w=800&q=80",
        altText: "LOST Hoodie — back",
        width: 800,
        height: 1000,
      },
    ],
    variants: makeVariants("mock-product-hoodie", "149.00", {
      S: 0,
      M: 0,
      L: 0,
      XL: 0,
    }),
    priceRange: {
      minVariantPrice: aud("149.00"),
      maxVariantPrice: aud("149.00"),
    },
    tags: ["hoodie", "outerwear"],
    // All variants sold out + notify-me enabled → PDP renders Notify Me CTA.
    releaseAt: null,
    notifyMeEnabled: true,
    materialsCare:
      "80% cotton / 20% polyester brushed fleece, 380gsm. Wash cold. Tumble dry low. Do not iron print.",
  },
];

// ---------------------------------------------------------------------------
// Mock adapter
// ---------------------------------------------------------------------------

let _mockCart: Cart | null = null;

export const mockAdapter: ShopAdapter = {
  async getProducts({ first, query } = {}) {
    let results = [...PRODUCTS];
    if (query) {
      const q = query.toLowerCase();
      results = results.filter(
        (p) => p.title.toLowerCase().includes(q) || p.tags.some((t) => t.includes(q))
      );
    }
    return first !== undefined ? results.slice(0, first) : results;
  },

  async getProduct(handle) {
    return PRODUCTS.find((p) => p.handle === handle) ?? null;
  },

  async getCollection(handle) {
    const products = await mockAdapter.getProducts();
    const collection: Collection = {
      id: `mock-collection-${handle}`,
      handle,
      title: handle.charAt(0).toUpperCase() + handle.slice(1),
      description: "",
      image: null,
      products,
    };
    return collection;
  },

  async createCart() {
    _mockCart = {
      id: "mock-cart-1",
      checkoutUrl: "#",
      lines: [],
      cost: {
        subtotalAmount: aud("0.00"),
        totalAmount: aud("0.00"),
        totalTaxAmount: null,
      },
      totalQuantity: 0,
    };
    return _mockCart;
  },

  async getCart(cartId) {
    if (_mockCart?.id === cartId) return _mockCart;
    return null;
  },

  async addToCart(cartId, lines) {
    const cart = _mockCart ?? (await mockAdapter.createCart());
    for (const line of lines) {
      const existing = cart.lines.find((l) => l.merchandise.id === line.merchandiseId);
      if (existing) {
        existing.quantity += line.quantity;
      } else {
        const variant = PRODUCTS.flatMap((p) => p.variants).find(
          (v) => v.id === line.merchandiseId
        );
        const product = PRODUCTS.find((p) => p.variants.some((v) => v.id === line.merchandiseId));
        if (variant && product) {
          cart.lines.push({
            id: `mock-line-${Date.now()}`,
            quantity: line.quantity,
            merchandise: {
              id: variant.id,
              title: variant.title,
              product: {
                id: product.id,
                handle: product.handle,
                title: product.title,
                images: product.images,
              },
            },
            cost: {
              totalAmount: aud(
                (parseFloat(variant.price.amount) * line.quantity).toFixed(2)
              ),
            },
          });
        }
      }
    }
    cart.totalQuantity = cart.lines.reduce((sum, l) => sum + l.quantity, 0);
    return cart;
  },

  async updateCartLines(cartId, lines) {
    const cart = _mockCart ?? (await mockAdapter.createCart());
    for (const update of lines) {
      const line = cart.lines.find((l) => l.id === update.id);
      if (line) line.quantity = update.quantity;
    }
    cart.lines = cart.lines.filter((l) => l.quantity > 0);
    cart.totalQuantity = cart.lines.reduce((sum, l) => sum + l.quantity, 0);
    return cart;
  },

  async removeFromCart(cartId, lineIds) {
    const cart = _mockCart ?? (await mockAdapter.createCart());
    cart.lines = cart.lines.filter((l) => !lineIds.includes(l.id));
    cart.totalQuantity = cart.lines.reduce((sum, l) => sum + l.quantity, 0);
    return cart;
  },
};
