type ManifestoProps = {
  title: string;
  body: string;
};

export function Manifesto({ title }: ManifestoProps) {
  return (
    <section className="w-full bg-ink text-paper">
      <div className="mx-auto w-full max-w-[1440px] px-6 py-12 md:px-10 md:py-16">
        <p className="max-w-[26ch] text-2xl leading-snug tracking-[-0.02em] text-paper/90 text-balance md:text-3xl lg:text-4xl">
          {title}
        </p>
      </div>
    </section>
  );
}
