import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/react";
import Link from "next/link";

const components: PortableTextComponents = {
  marks: {
    link: ({ value, children }) => {
      const href = (value?.href as string | undefined) ?? "#";
      const isExternal = /^https?:\/\//.test(href);
      if (isExternal) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:text-brand"
          >
            {children}
          </a>
        );
      }
      return (
        <Link href={href} className="underline underline-offset-4 hover:text-brand">
          {children}
        </Link>
      );
    },
  },
};

export function LegalPortableText({ value }: { value: PortableTextBlock[] }) {
  return <PortableText value={value} components={components} />;
}
