import { User } from "lucide-react";
import Link from "next/link";

import { CartDrawer } from "@/components/cart/cart-drawer";
import { MobileNav } from "@/components/layout/mobile-nav";
import { SiteLogo } from "@/components/layout/site-logo";

const primaryLinks = [
  { href: "/", label: "Home" },
  { href: "/catalog", label: "Catalogue" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-hairline bg-paper/85 backdrop-blur supports-[backdrop-filter]:bg-paper/70">
      <div className="relative mx-auto flex h-16 w-full max-w-[1440px] items-center justify-between gap-6 px-6 md:px-10">
        {/* Left — brand + nav (desktop) / hamburger (mobile) */}
        <div className="flex items-center gap-6">
          <MobileNav />
          <span className="hidden font-display text-lg font-bold leading-none tracking-[-0.02em] uppercase md:block">
            Lost<span className="text-brand">.</span>Found
          </span>
          <nav
            aria-label="Primary"
            className="hidden items-center gap-8 md:flex"
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
        </div>

        {/* Centre — logo (true-centred) */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <SiteLogo />
        </div>

        {/* Right — profile + cart */}
        <div className="flex items-center gap-1">
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
