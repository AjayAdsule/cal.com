import { logLevels } from "@/lib/logger";

export type Environment = {
  NODE_ENV: "development" | "production";
  API_PORT: string;
  API_URL: string;
  DATABASE_READ_URL: string;
  DATABASE_WRITE_URL: string;
  NEXTAUTH_SECRET: string;
  DATABASE_URL: string;
  JWT_SECRET: string;
  SENTRY_DSN: string;
  SENTRY_TRACES_SAMPLE_RATE?: number;
  SENTRY_PROFILES_SAMPLE_RATE?: number;
  LOG_LEVEL: keyof typeof logLevels;
  REDIS_URL: string;
  STRIPE_API_KEY: string;
  STRIPE_WEBHOOK_SECRET: string;
  WEB_APP_URL: string;
  IS_E2E: boolean;
  CALCOM_LICENSE_KEY: string;
  GET_LICENSE_KEY_URL: string;
  API_KEY_PREFIX: string;
  DOCS_URL: string;
  RATE_LIMIT_DEFAULT_TTL_MS: number;
  RATE_LIMIT_DEFAULT_LIMIT_API_KEY: number;
  RATE_LIMIT_DEFAULT_LIMIT_OAUTH_CLIENT: number;
  RATE_LIMIT_DEFAULT_LIMIT_ACCESS_TOKEN: number;
  RATE_LIMIT_DEFAULT_LIMIT: number;
  RATE_LIMIT_DEFAULT_BLOCK_DURATION_MS: number;
  AXIOM_DATASET: string;
  AXIOM_TOKEN: string;
  STRIPE_TEAM_MONTHLY_PRICE_ID: string;
  IS_TEAM_BILLING_ENABLED: boolean;
  // Used to enable/disable the rewrite of /api/v2 to /v2, active by default.
  REWRITE_API_V2_PREFIX: string;
};

export const getEnv = <K extends keyof Environment>(key: K, fallback?: Environment[K]): Environment[K] => {
  const value = process.env[key] as Environment[K] | undefined;

  if (value === undefined) {
    // handle fallback falsy cases that should still be used as value
    if (fallback === false || fallback === "" || fallback === 0) {
      return fallback;
    }
    if (fallback) {
      return fallback;
    }
    throw new Error(`Missing environment variable: ${key}.`);
  }

  return value;
};
