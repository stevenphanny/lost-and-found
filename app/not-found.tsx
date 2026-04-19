import { BrandNotFound } from "@/components/system/brand-not-found";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

/**
 * Root not-found: hits when a URL doesn't match any route at all
 * (e.g. /garbage). Because the (site) route group's layout isn't
 * applied to us here, render the chrome inline so the page still
 * feels like the brand.
 */
export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <BrandNotFound />
      </main>
      <SiteFooter />
    </>
  );
}
