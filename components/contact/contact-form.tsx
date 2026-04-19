"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Enter a valid email"),
  subject: z.string().min(2, "Subject is required"),
  message: z.string().min(10, "Tell us a bit more — at least 10 characters"),
});

type FormValues = z.infer<typeof schema>;

export function ContactForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = async (data: FormValues) => {
    // Phase 2 or 4: POST to route handler → Resend email to owner.
    console.info("[contact] would send:", data);
    await new Promise((resolve) => setTimeout(resolve, 400));
    setSubmitted(true);
    form.reset();
  };

  if (submitted) {
    return (
      <div
        role="status"
        className="border border-ink bg-ink p-8 text-paper md:p-10"
      >
        <p className="mb-3 text-xs tracking-[0.22em] uppercase text-paper/60">
          Received
        </p>
        <h2 className="text-2xl tracking-[-0.02em] md:text-3xl">
          Thanks — we&rsquo;ll be in touch.
        </h2>
        <p className="mt-4 max-w-[40ch] text-sm text-paper/70 text-pretty">
          Expect a response within 48 hours. If it&rsquo;s urgent, hit us up on
          Instagram.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-8 border-b border-paper/60 pb-1 text-xs tracking-[0.22em] uppercase transition-colors hover:text-brand hover:border-brand"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs tracking-[0.18em] uppercase text-muted-1">
                  Name
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    autoComplete="name"
                    className="h-12 border-hairline"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs tracking-[0.18em] uppercase text-muted-1">
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    autoComplete="email"
                    className="h-12 border-hairline"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs tracking-[0.18em] uppercase text-muted-1">
                Subject
              </FormLabel>
              <FormControl>
                <Input {...field} className="h-12 border-hairline" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs tracking-[0.18em] uppercase text-muted-1">
                Message
              </FormLabel>
              <FormControl>
                <textarea
                  {...field}
                  rows={6}
                  className="w-full resize-y border border-hairline bg-paper px-3 py-3 text-sm focus-visible:border-ink focus-visible:outline-2 focus-visible:outline-ring"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          size="lg"
          disabled={form.formState.isSubmitting}
          className="h-14 px-10 text-xs tracking-[0.22em] uppercase"
        >
          {form.formState.isSubmitting ? "Sending..." : "Send message"}
        </Button>
      </form>
    </Form>
  );
}
