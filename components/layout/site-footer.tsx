import Link from "next/link";

import { PaymentMarks } from "@/components/layout/payment-marks";
import { SiteLogo } from "@/components/layout/site-logo";

const socialLinks = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "TikTok", href: "https://tiktok.com" },
  { label: "Email", href: "mailto:hello@lostandfound.example.com" },
];

const legalLinks = [
  { label: "Privacy", href: "/legal/privacy" },
  { label: "Terms", href: "/legal/terms" },
  { label: "Returns", href: "/legal/returns" },
  { label: "Shipping", href: "/legal/shipping" },
];

const shopLinks = [
  { label: "Catalog", href: "/catalog" },
  { label: "Contact", href: "/contact" },
  { label: "Account", href: "/auth/sign-in" },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-hairline bg-paper text-ink">
      <div className="mx-auto w-full max-w-[1440px] px-6 pt-16 pb-10 md:px-10 md:pt-24">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4 md:gap-6">
          <div className="col-span-2 md:col-span-1">
            <SiteLogo />
            <p className="mt-4 max-w-[28ch] text-sm text-muted-1 text-pretty">
              Streetwear for the in-between. Small drops, made well, worn harder.
            </p>
          </div>

          <FooterColumn title="Shop" links={shopLinks} />
          <FooterColumn title="Legal" links={legalLinks} />

          <div>
            <h4 className="mb-4 text-xs tracking-[0.18em] uppercase text-muted-1">
              Connect
            </h4>
            <ul className="space-y-2 text-sm">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      link.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="transition-colors hover:text-brand"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-hairline pt-6">
          <PaymentMarks />
        </div>

        <div className="mt-8 flex flex-col gap-3 text-xs text-muted-1 md:flex-row md:items-center md:justify-between">
          <p>© {year} Lost and Found. All rights reserved.</p>
          <p>
            ABN <span className="tracking-wider">123 456 789</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h4 className="mb-4 text-xs tracking-[0.18em] uppercase text-muted-1">
        {title}
      </h4>
      <ul className="space-y-2 text-sm">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="transition-colors hover:text-brand">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
