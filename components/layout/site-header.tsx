import { Search, User } from "lucide-react";
import Link from "next/link";

import { CartDrawer } from "@/components/cart/cart-drawer";
import { MobileNav } from "@/components/layout/mobile-nav";
import { SiteLogo } from "@/components/layout/site-logo";

const primaryLinks = [
  { href: "/catalog", label: "Catalog" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-hairline bg-paper/85 backdrop-blur supports-[backdrop-filter]:bg-paper/70">
      <div className="mx-auto flex h-16 w-full max-w-[1440px] items-center justify-between gap-6 px-6 md:px-10">
        {/* Left — logo + mobile menu */}
        <div className="flex items-center gap-3">
          <MobileNav />
          <SiteLogo />
        </div>

        {/* Centre — primary nav (desktop only) */}
        <nav
          aria-label="Primary"
          className="hidden items-center gap-10 md:flex"
        >
          {primaryLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs tracking-[0.18em] uppercase transition-colors hover:text-brand"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right — icon tray */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            disabled
            aria-label="Search (coming soon)"
            title="Search coming soon"
            className="inline-flex h-10 w-10 items-center justify-center text-muted-2 cursor-not-allowed"
          >
            <Search className="h-5 w-5" strokeWidth={1.5} />
          </button>
          <Link
            href="/auth/sign-in"
            aria-label="Account"
            className="inline-flex h-10 w-10 items-center justify-center text-ink transition-colors hover:text-brand"
          >
            <User className="h-5 w-5" strokeWidth={1.5} />
          </Link>
          <CartDrawer />
        </div>
      </div>
    </header>
  );
}
