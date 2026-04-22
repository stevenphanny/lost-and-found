"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { SiteLogo } from "@/components/layout/site-logo";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const links = [
  { href: "/", label: "Home" },
  { href: "/catalog", label: "Catalogue" },
  { href: "/contact", label: "Contact" },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label="Open navigation"
          className="inline-flex h-10 w-10 items-center justify-center text-ink md:hidden"
        >
          <Menu className="h-5 w-5" strokeWidth={1.5} />
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="w-full bg-paper p-0 sm:max-w-none">
        <SheetHeader className="border-b border-hairline px-6 py-5">
          <SheetTitle asChild>
            <SiteLogo />
          </SheetTitle>
        </SheetHeader>
        <nav
          aria-label="Mobile primary"
          className="flex flex-col px-6 pt-10"
        >
          {links.map((link) => (
            <SheetClose asChild key={link.href}>
              <Link
                href={link.href}
                className="font-display text-4xl uppercase tracking-[-0.02em] border-b border-hairline py-5 transition-colors hover:text-brand"
              >
                {link.label}
              </Link>
            </SheetClose>
          ))}
          <SheetClose asChild>
            <Link
              href="/auth/sign-in"
              className="font-display text-4xl uppercase tracking-[-0.02em] border-b border-hairline py-5 transition-colors hover:text-brand"
            >
              Account
            </Link>
          </SheetClose>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
