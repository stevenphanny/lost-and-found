import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Server-side env vars. Never exposed to the browser.
   * Add new server vars here as the project grows.
   */
  server: {},

  /**
   * Client-side env vars. Must be prefixed with NEXT_PUBLIC_.
   * Add new public vars here as the project grows.
   */
  client: {
    NEXT_PUBLIC_SANITY_PROJECT_ID: z.string().min(1),
    NEXT_PUBLIC_SANITY_DATASET: z.string().min(1),
  },

  /**
   * Explicit destructuring of process.env required by t3-env.
   * Mirror every key from server + client here.
   */
  runtimeEnv: {
    NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
  },

  /**
   * Skip validation in CI or when building without real env vars.
   * Set SKIP_ENV_VALIDATION=true in .env.local until Sanity creds are added.
   */
  skipValidation: process.env.SKIP_ENV_VALIDATION === "true",
});
