import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { Product } from "@/lib/shop/types";
import { sanityFetch } from "@/sanity/lib/fetch";
import { sizeGuideQuery } from "@/sanity/lib/queries";
import type { SizeGuide } from "@/sanity/lib/types";

const DEFAULT_SHIPPING_COPY =
  "Australia-wide shipping via AusPost. Free standard shipping on orders over $150. Dispatched within 2 business days. Full details on our shipping page.";

const DEFAULT_RETURNS_COPY =
  "Our goal is for every customer to be totally satisfied. If something isn't right, let us know within 30 days and we'll work with you to make it right.";

export async function ProductAccordions({ product }: { product: Product }) {
  // Size guide title is keyed to category; for Phase 1, all categories
  // resolve to a single "Default" doc. Phase 2 will match against
  // Shopify collection handles.
  const sizeGuide = await sanityFetch<SizeGuide>(
    sizeGuideQuery,
    { title: "Default" },
    { tags: ["sanity", "sizeGuide"] }
  ).catch(() => null);

  return (
    <Accordion type="multiple" className="border-t border-hairline">
      <AccordionItem value="description" className="border-b border-hairline">
        <AccordionTrigger className="px-0 text-xs tracking-[0.18em] uppercase">
          Description
        </AccordionTrigger>
        <AccordionContent className="px-0 text-sm leading-relaxed text-muted-1">
          <p>{product.description}</p>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="size-guide" className="border-b border-hairline" id="size-guide">
        <AccordionTrigger className="px-0 text-xs tracking-[0.18em] uppercase">
          Size guide
        </AccordionTrigger>
        <AccordionContent className="px-0 text-sm text-muted-1">
          {sizeGuide?.rows?.length ? (
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-hairline text-ink">
                  <th className="py-2 pr-4 text-xs tracking-[0.12em] uppercase font-medium">Size</th>
                  <th className="py-2 pr-4 text-xs tracking-[0.12em] uppercase font-medium">Chest</th>
                  <th className="py-2 pr-4 text-xs tracking-[0.12em] uppercase font-medium">Length</th>
                  <th className="py-2 text-xs tracking-[0.12em] uppercase font-medium">Shoulder</th>
                </tr>
              </thead>
              <tbody>
                {sizeGuide.rows.map((row) => (
                  <tr key={row.size} className="border-b border-hairline/60">
                    <td className="py-2 pr-4 text-ink">{row.size}</td>
                    <td className="py-2 pr-4">{row.chest}</td>
                    <td className="py-2 pr-4">{row.length}</td>
                    <td className="py-2">{row.shoulder}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Size guide will be published in Sanity Studio shortly.</p>
          )}
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="materials" className="border-b border-hairline">
        <AccordionTrigger className="px-0 text-xs tracking-[0.18em] uppercase">
          Materials &amp; care
        </AccordionTrigger>
        <AccordionContent className="px-0 text-sm leading-relaxed text-muted-1">
          <p>{product.materialsCare ?? "Care instructions on the garment label."}</p>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="shipping" className="border-b border-hairline">
        <AccordionTrigger className="px-0 text-xs tracking-[0.18em] uppercase">
          Shipping &amp; returns
        </AccordionTrigger>
        <AccordionContent className="px-0 text-sm leading-relaxed text-muted-1">
          <p>{DEFAULT_SHIPPING_COPY}</p>
          <p>{DEFAULT_RETURNS_COPY}</p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
