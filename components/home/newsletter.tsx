"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
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
    <section className="border-t border-hairline">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between md:px-10">
        <div>
          <p className="text-sm text-ink">Get early access to drops.</p>
          <p className="mt-0.5 text-xs text-muted-2">
            Less than one email a month.{" "}
            <Link href="/legal/privacy" className="underline underline-offset-2">
              Privacy policy
            </Link>
            .
          </p>
        </div>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="shrink-0"
          noValidate
        >
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <div className="flex gap-2">
            <Input
              id="newsletter-email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              aria-invalid={!!form.formState.errors.email}
              className="h-9 w-52 border-hairline bg-transparent text-sm"
              {...form.register("email")}
            />
            <Button
              type="submit"
              size="sm"
              className="h-9 px-5 text-xs tracking-[0.18em] uppercase"
              disabled={form.formState.isSubmitting}
            >
              Subscribe
            </Button>
          </div>
          {form.formState.errors.email ? (
            <p role="alert" className="mt-1 text-xs text-brand">
              {form.formState.errors.email.message}
            </p>
          ) : null}
        </form>
      </div>
    </section>
  );
}
