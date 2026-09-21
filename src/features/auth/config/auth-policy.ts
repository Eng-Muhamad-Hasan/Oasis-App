const MINUTES_IN_SECONDS = 60;

export const authPolicy = {
  minimumPasswordLength: 6,
  maximumPasswordLength: 16,
  sensitiveActionFreshnessSeconds: 15 * MINUTES_IN_SECONDS,
} as const;
