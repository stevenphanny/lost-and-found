import Link from "next/link";
import Image from "next/image";

export function SiteLogo({
  className,
  srText = "Lost and Found — home",
}: {
  className?: string;
  srText?: string;
}) {
  return (
    <Link
      href="/"
      aria-label={srText}
      className={`font-display text-lg leading-none tracking-[-0.02em] font-bold uppercase ${className ?? ""}`}
    >
      {/* Site logo found in public */}
      <Image
        src="/lost-and-found-images/logo-clear.png"
        alt="Lost and Found"
        width={50}
        height={50}
        className="invert"
      />
    </Link>
  );
}
