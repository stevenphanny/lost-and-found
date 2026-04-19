import type { Metadata } from "next";

import { ContactForm } from "@/components/contact/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Lost and Found.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-[1440px] px-6 py-16 md:px-10 md:py-24">
      <div className="grid gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-5 lg:col-span-4">
          <p className="mb-4 text-xs tracking-[0.22em] uppercase text-muted-1">
            Contact
          </p>
          <h1 className="text-4xl tracking-[-0.02em] md:text-5xl text-balance">
            Say hello.
          </h1>
          <p className="mt-6 max-w-[38ch] text-base text-muted-1 text-pretty">
            Questions about an order, restock info, wholesale, or anything else.
            We read every message.
          </p>

          <dl className="mt-12 space-y-6 text-sm">
            <div>
              <dt className="text-xs tracking-[0.18em] uppercase text-muted-1">
                Response time
              </dt>
              <dd className="mt-1">Within 48 hours, weekdays.</dd>
            </div>
            <div>
              <dt className="text-xs tracking-[0.18em] uppercase text-muted-1">
                Follow
              </dt>
              <dd className="mt-1 space-y-1">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:text-brand"
                >
                  Instagram
                </a>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:text-brand"
                >
                  TikTok
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-xs tracking-[0.18em] uppercase text-muted-1">
                Business
              </dt>
              <dd className="mt-1">
                ABN <span className="tracking-wider">123 456 789</span>
              </dd>
            </div>
          </dl>
        </div>

        <div className="md:col-span-7 lg:col-span-7 lg:col-start-6">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
