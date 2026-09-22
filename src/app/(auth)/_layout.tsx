// src/app/(auth)/_layout.tsx
import { Stack } from "expo-router/stack";
import { useAppTheme } from "@/theme/theme-provider";

// expo-router skill: `initialRouteName` was renamed to `anchor`
export const unstable_settings = { anchor: "sign-in" };

export default function AuthLayout() {
  const { colors } = useAppTheme();
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    />
  );
}
