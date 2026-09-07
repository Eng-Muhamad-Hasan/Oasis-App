import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { SafeAreaListener } from "react-native-safe-area-context";
import { Uniwind } from "uniwind";

import "../global.css";

import { IntroRevealProvider, SplashOverlay } from "@/components/splash";
import { AppProviders } from "@/providers/app-providers";
import { useAuthStore } from "@/utils/authStore";
import { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "react-native";

SplashScreen.preventAutoHideAsync();

function RootNavigator() {
  const {
    isLoggedIn,
    shouldCreateAccount,
    hasCompletedOnboarding,
    _hasHydrated,
  } = useAuthStore();

  useEffect(() => {
    if (_hasHydrated) {
      SplashScreen.hideAsync();
    }
  }, [_hasHydrated]);

  if (!_hasHydrated) {
    return null;
  }

  return (
    <>
      <StatusBar barStyle={"default"} />
      <Stack>
        <Stack.Protected guard={isLoggedIn}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="hotel/[id]" options={{ headerShown: false }} />
          <Stack.Screen name="(modals)" options={{ presentation: "modal" }} />
        </Stack.Protected>

        <Stack.Protected guard={!isLoggedIn && hasCompletedOnboarding}>
          <Stack.Screen name="(auth)/sign-in" />
          <Stack.Protected guard={shouldCreateAccount}>
            <Stack.Screen name="(auth)/sign-up" />
          </Stack.Protected>
        </Stack.Protected>

        <Stack.Protected guard={!hasCompletedOnboarding}>
          <Stack.Screen name="onboarding" options={{ headerShown: false }} />
        </Stack.Protected>
      </Stack>
    </>
  );
}

export default function RootLayout() {
  // const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();
  const [revealed, setRevealed] = useState(false);
  const [splashDone, setSplashDone] = useState(false);

  return (
    <GestureHandlerRootView style={{ flex: 1, paddingBottom: insets.bottom }}>
      <SafeAreaListener
        onChange={({ insets }) => {
          Uniwind.updateInsets(insets);
        }}
      >
        <AppProviders>
        {/* <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}> */}
        <IntroRevealProvider value={revealed}>
          <RootNavigator />
          {!splashDone ? (
            <SplashOverlay
              onReveal={() => setRevealed(true)}
              onDone={() => {
                setSplashDone(true);
              }}
            />
          ) : null}
          {/* <AppToaster /> */}
        </IntroRevealProvider>
        </AppProviders>
        {/* </ThemeProvider> */}
      </SafeAreaListener>
    </GestureHandlerRootView>
  );
}
