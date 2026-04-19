"use client";

import { useEffect, useRef } from "react";

type HeroProps = {
  videoUrl: string | null;
  posterUrl: string | null;
  headline: string;
};

export function Hero({ videoUrl, posterUrl, headline }: HeroProps) {
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = headlineRef.current;
    if (!el) return;

    let ctx: { revert: () => void } | null = null;
    let cancelled = false;

    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const words = el.querySelectorAll<HTMLElement>("[data-word]");
        gsap.set(words, { yPercent: 100, opacity: 0 });
        gsap.to(words, {
          yPercent: 0,
          opacity: 1,
          duration: 1.2,
          ease: "expo.out",
          stagger: 0.08,
          delay: 0.15,
        });

        gsap.to(el, {
          yPercent: -15,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "+=600",
            scrub: true,
          },
        });
      }, el);
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  const words = headline.split(/\s+/);

  return (
    <section className="relative isolate h-[92svh] min-h-[640px] w-full overflow-hidden bg-ink text-paper">
      {videoUrl ? (
        <video
          src={videoUrl}
          poster={posterUrl ?? undefined}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover opacity-80"
          aria-hidden="true"
        />
      ) : posterUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={posterUrl}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-80"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-b from-[#111] via-[#0a0a0a] to-[#1a1a1a]" />
      )}

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ink/20 to-ink/70" />

      <div className="relative z-10 mx-auto flex h-full w-full max-w-[1440px] flex-col justify-end px-6 pb-16 md:px-10 md:pb-24">
        <p className="mb-4 text-xs tracking-[0.22em] uppercase text-paper/70">
          Current drop
        </p>
        <h1
          ref={headlineRef}
          className="font-display text-[clamp(3rem,10vw,8.5rem)] leading-[0.9] tracking-[-0.03em] uppercase text-balance"
          aria-label={headline}
        >
          {words.map((word, i) => (
            <span
              key={`${word}-${i}`}
              className="inline-block overflow-hidden align-bottom pr-[0.25em]"
            >
              <span data-word className="inline-block will-change-transform">
                {word}
              </span>
            </span>
          ))}
        </h1>
      </div>

      <div
        aria-hidden="true"
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-xs tracking-[0.18em] uppercase text-paper/60"
      >
        Scroll
      </div>
    </section>
  );
}
