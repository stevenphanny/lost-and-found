"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
});

type FormValues = z.infer<typeof schema>;

export function Newsletter() {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "" },
  });

  const onSubmit = (data: FormValues) => {
    // Phase 2: POST to Shopify Admin API to create a marketing-opted customer.
    console.info("[newsletter] would subscribe:", data.email);
    toast.success("Thanks — we'll be in touch.");
    form.reset();
  };

  return (
    <section className="border-t border-hairline bg-paper">
      <div className="mx-auto grid w-full max-w-[1440px] gap-10 px-6 py-20 md:grid-cols-2 md:gap-16 md:px-10 md:py-28">
        <div>
          <p className="mb-4 text-xs tracking-[0.22em] uppercase text-muted-1">
            Newsletter
          </p>
          <h2 className="text-3xl tracking-[-0.02em] md:text-4xl text-balance">
            Hear about drops first.
          </h2>
          <p className="mt-4 max-w-[40ch] text-sm text-muted-1 text-pretty">
            We send less than one email a month. Drop releases, behind-the-scenes,
            nothing else.
          </p>
        </div>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col justify-end"
          noValidate
        >
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
            <Input
              id="newsletter-email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              aria-invalid={!!form.formState.errors.email}
              className="h-12 flex-1 border-hairline bg-transparent"
              {...form.register("email")}
            />
            <Button
              type="submit"
              size="lg"
              className="h-12 px-8 text-xs tracking-[0.18em] uppercase"
              disabled={form.formState.isSubmitting}
            >
              Subscribe
            </Button>
          </div>
          {form.formState.errors.email ? (
            <p role="alert" className="mt-2 text-xs text-brand">
              {form.formState.errors.email.message}
            </p>
          ) : null}
          <p className="mt-4 text-xs text-muted-2">
            By subscribing you agree to our{" "}
            <a href="/legal/privacy" className="underline underline-offset-2">
              privacy policy
            </a>
            .
          </p>
        </form>
      </div>
    </section>
  );
}
