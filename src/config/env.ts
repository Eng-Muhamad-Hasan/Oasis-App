import Constants from "expo-constants";

export type AppEnvironment = "development" | "staging" | "production";
const configuredAppEnvironment =
  process.env.EXPO_PUBLIC_APP_ENV ?? "development";

if (
  !["development", "staging", "production"].includes(configuredAppEnvironment)
) {
  throw new Error(
    "EXPO_PUBLIC_APP_ENV must be development, staging, or production",
  );
}
const extra = Constants.expoConfig?.extra as
  Record<string, unknown> | undefined;

export const env = {
  appEnvironment: configuredAppEnvironment as AppEnvironment,
  apiBaseUrl: process.env.EXPO_PUBLIC_API_URL ?? null,
  googleAndroidClientId:
    process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID ?? null,
  googleIosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID ?? null,
  googleWebClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID ?? null,
  notificationsEnabled:
    (extra?.notificationsEnabled as boolean | undefined) ?? false,
  analyticsEnabled: (extra?.analyticsEnabled as boolean | undefined) ?? false,
} as const;

export const isGoogleAuthConfigured = Boolean(
  env.googleWebClientId && env.googleIosClientId && env.googleAndroidClientId,
);
