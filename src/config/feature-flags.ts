import { env } from '@/config/env';

export const featureFlags = {
  enableAnalytics: env.analyticsEnabled,
  enableNotifications: env.notificationsEnabled,
  enableComponentGallery: true,
} as const;
