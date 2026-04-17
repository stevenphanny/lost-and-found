export type Money = {
  amount: string; // decimal string e.g. "89.00"
  currencyCode: string; // ISO 4217 e.g. "AUD"
};

export type Image = {
  url: string;
  altText: string | null;
  width: number | null;
  height: number | null;
};

export type Variant = {
  id: string;
  title: string; // e.g. "S", "M", "L", "XL"
  availableForSale: boolean;
  quantityAvailable: number | null;
  price: Money;
  compareAtPrice: Money | null;
  selectedOptions: { name: string; value: string }[];
};

export type Product = {
  id: string;
  handle: string; // URL slug
  title: string;
  description: string;
  descriptionHtml: string;
  availableForSale: boolean;
  images: Image[];
  variants: Variant[];
  priceRange: {
    minVariantPrice: Money;
    maxVariantPrice: Money;
  };
  tags: string[];
};

export type Collection = {
  id: string;
  handle: string;
  title: string;
  description: string;
  image: Image | null;
  products: Product[];
};

export type CartLine = {
  id: string;
  quantity: number;
  merchandise: {
    id: string; // variant id
    title: string; // variant title
    product: Pick<Product, "id" | "handle" | "title" | "images">;
  };
  cost: {
    totalAmount: Money;
  };
};

export type Cart = {
  id: string;
  checkoutUrl: string;
  lines: CartLine[];
  cost: {
    subtotalAmount: Money;
    totalAmount: Money;
    totalTaxAmount: Money | null;
  };
  totalQuantity: number;
};

export interface ShopAdapter {
  getProducts(options?: { first?: number; query?: string }): Promise<Product[]>;
  getProduct(handle: string): Promise<Product | null>;
  getCollection(handle: string): Promise<Collection | null>;

  createCart(): Promise<Cart>;
  getCart(cartId: string): Promise<Cart | null>;
  addToCart(cartId: string, lines: { merchandiseId: string; quantity: number }[]): Promise<Cart>;
  updateCartLines(
    cartId: string,
    lines: { id: string; quantity: number }[]
  ): Promise<Cart>;
  removeFromCart(cartId: string, lineIds: string[]): Promise<Cart>;
}
