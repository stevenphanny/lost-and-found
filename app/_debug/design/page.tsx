import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const swatches = [
  { name: "ink", hex: "#0A0A0A", bg: "bg-ink", fg: "text-paper" },
  { name: "paper", hex: "#FAFAFA", bg: "bg-paper", fg: "text-ink" },
  { name: "brand", hex: "#E53935", bg: "bg-brand", fg: "text-brand-ink" },
  { name: "muted-1", hex: "#6B6B6B", bg: "bg-muted-1", fg: "text-paper" },
  { name: "muted-2", hex: "#A1A1A1", bg: "bg-muted-2", fg: "text-ink" },
  { name: "muted-3", hex: "#E5E5E5", bg: "bg-muted-3", fg: "text-ink" },
  { name: "hairline", hex: "#E0E0E0", bg: "bg-hairline", fg: "text-ink" },
];

export default function DesignDebugPage() {
  return (
    <div className="mx-auto w-full max-w-[1440px] px-6 py-16 md:px-10 md:py-24">
      <div className="mb-12 flex items-end justify-between">
        <h1 className="text-5xl md:text-6xl">Design system</h1>
        <p className="text-xs tracking-[0.18em] uppercase text-muted-1">
          /_debug/design
        </p>
      </div>

      <Separator className="my-8" />

      {/* Typography */}
      <section className="mb-16">
        <p className="mb-6 text-xs tracking-[0.18em] uppercase text-muted-1">
          Typography
        </p>
        <div className="space-y-6">
          <h1 className="text-[clamp(3rem,8vw,6rem)] leading-[0.95] tracking-[-0.03em] text-balance">
            Display XL — Lost in a dream
          </h1>
          <h2 className="text-5xl md:text-6xl tracking-[-0.025em]">
            Display L — new arrivals
          </h2>
          <h1 className="text-4xl md:text-5xl">H1 — Page title</h1>
          <h2 className="text-3xl md:text-4xl">H2 — Section</h2>
          <h3 className="text-xl md:text-2xl">H3 — Product name</h3>
          <p className="max-w-xl text-base text-pretty">
            Body copy. Inter at 16px. Built with the brand's cadence in mind —
            quiet, direct, not overwritten. The spec lives in docs/design-system.md.
          </p>
          <p className="text-sm text-muted-1">Small — metadata, captions, prices-were.</p>
          <p className="text-xs tracking-[0.18em] uppercase text-muted-1">
            Micro — eyebrow / badge label
          </p>
        </div>
      </section>

      <Separator className="my-8" />

      {/* Colour */}
      <section className="mb-16">
        <p className="mb-6 text-xs tracking-[0.18em] uppercase text-muted-1">
          Colour
        </p>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-7">
          {swatches.map((s) => (
            <div key={s.name} className="border border-hairline">
              <div className={`aspect-square ${s.bg} ${s.fg} flex items-end p-3`}>
                <span className="text-xs font-medium">{s.name}</span>
              </div>
              <div className="border-t border-hairline bg-paper px-3 py-2 text-ink">
                <p className="text-xs tracking-[0.1em] uppercase">{s.hex}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Separator className="my-8" />

      {/* Buttons */}
      <section className="mb-16">
        <p className="mb-6 text-xs tracking-[0.18em] uppercase text-muted-1">
          Buttons
        </p>
        <div className="flex flex-wrap gap-3">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button disabled>Disabled</Button>
        </div>
      </section>

      <Separator className="my-8" />

      {/* Form */}
      <section className="mb-16 max-w-md">
        <p className="mb-6 text-xs tracking-[0.18em] uppercase text-muted-1">
          Form inputs
        </p>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email-demo">Email</Label>
            <Input id="email-demo" type="email" placeholder="you@example.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="name-demo">Name</Label>
            <Input id="name-demo" placeholder="Your name" />
          </div>
        </div>
      </section>

      <Separator className="my-8" />

      {/* Spacing */}
      <section>
        <p className="mb-6 text-xs tracking-[0.18em] uppercase text-muted-1">
          Radius (sharp on purpose)
        </p>
        <div className="flex gap-4">
          {[
            { label: "sm (0)", cls: "rounded-sm" },
            { label: "md (2)", cls: "rounded-md" },
            { label: "lg (4)", cls: "rounded-lg" },
            { label: "xl (8)", cls: "rounded-xl" },
          ].map((r) => (
            <div key={r.label} className="text-center">
              <div
                className={`h-16 w-16 border border-hairline bg-muted-3 ${r.cls}`}
              />
              <p className="mt-2 text-xs text-muted-1">{r.label}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
