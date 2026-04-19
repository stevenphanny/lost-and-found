import { BrandNotFound } from "@/components/system/brand-not-found";

/**
 * Fired by notFound() inside any (site) route (e.g. unknown product
 * handle). Wrapped by the (site) layout → header + footer.
 */
export default function SiteNotFound() {
  return <BrandNotFound />;
}
