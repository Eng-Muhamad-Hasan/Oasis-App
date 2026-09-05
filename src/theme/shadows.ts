import { colors } from './colors';

export const shadows = {
  floatingBar: {
    shadowColor: colors.dark.ink,
    shadowOpacity: 0.25,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 14,
  },
  sliderThumb: {
    shadowColor: colors.dark.ink,
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  halo: {
    shadowColor: colors.dark.ink,
    shadowOpacity: 0.45,
    shadowRadius: 36,
    shadowOffset: { width: 0, height: 0 },
    elevation: 12,
  },
  featuredPhoto: {
    shadowColor: colors.dark.ink,
    shadowOpacity: 0.12,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
} as const;
