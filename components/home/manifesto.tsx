type ManifestoProps = {
  title: string;
  body: string;
};

export function Manifesto({ title, body }: ManifestoProps) {
  return (
    <section className="w-full bg-ink text-paper">
      <div className="mx-auto w-full max-w-[1100px] px-6 py-20 md:px-10 md:py-32">
        <p className="mb-6 text-xs tracking-[0.22em] uppercase text-paper/60">
          Manifesto
        </p>
        <h2 className="text-3xl leading-tight tracking-[-0.02em] md:text-5xl lg:text-6xl text-balance">
          {title}
        </h2>
        <div className="mt-10 max-w-[58ch] whitespace-pre-line text-base leading-relaxed text-paper/80 text-pretty md:text-lg">
          {body}
        </div>
      </div>
    </section>
  );
}
