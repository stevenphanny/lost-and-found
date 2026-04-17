import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Capture 10% of transactions in production; increase as needed.
  tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1.0,

  // Capture 100% of replays for errors.
  replaysOnErrorSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,

  debug: false,
});
