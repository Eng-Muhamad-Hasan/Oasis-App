import { Stack } from "expo-router/stack";

import { useAuthStore } from "@/store/authStore";
import { useAppTheme } from "@/theme/theme-provider";

export default function AuthLayout() {
  const { colors } = useAppTheme();
  const { shouldCreateAccount } = useAuthStore();
  return (
    <Stack
      initialRouteName="sign-in"
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="sign-in" options={{ headerShown: false }} />
      <Stack.Protected guard={shouldCreateAccount}>
        <Stack.Screen name="sign-up" />
      </Stack.Protected>
    </Stack>
  );
}
