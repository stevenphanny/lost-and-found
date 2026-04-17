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
  client: {},

  /**
   * Explicit destructuring of process.env required by t3-env.
   * Mirror every key from server + client here.
   */
  runtimeEnv: {},

  /**
   * Skip validation in CI or when building without real env vars.
   * Remove this once real env vars are wired up.
   */
  skipValidation: process.env.SKIP_ENV_VALIDATION === "true",
});
