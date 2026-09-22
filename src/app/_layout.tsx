import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { SafeAreaListener } from "react-native-safe-area-context";
import { Uniwind } from "uniwind";

import "../global.css";

import { IntroRevealProvider, SplashOverlay } from "@/components/splash";
import { useAuthListener } from "@/features/auth/hooks/use-auth-listener";
import { useAuthStore } from "@/features/auth/store/auth-store";
import { useOnboardingStore } from "@/features/onboarding/onboarding-store";
import { AppProviders } from "@/providers/app-providers";
import { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
SplashScreen.preventAutoHideAsync();

// function RootNavigator() {
//   const { isLoggedIn, hasCompletedOnboarding, _hasHydrated } = useAuthStore();
//   useEffect(() => {
//     if (_hasHydrated) {
//       SplashScreen.hideAsync();
//     }
//   }, [_hasHydrated]);

//   if (!_hasHydrated) {
//     return null;
//   }

//   return (
//     <>
//       <StatusBar barStyle={"default"} />
//       <Stack>
//         <Stack.Protected guard={isLoggedIn}>
//           <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//           <Stack.Screen name="hotel/[id]" options={{ headerShown: false }} />
//           <Stack.Screen name="(modals)" options={{ presentation: "modal" }} />
//         </Stack.Protected>

//         <Stack.Protected guard={!isLoggedIn && hasCompletedOnboarding}>
//           <Stack.Screen name="(auth)" options={{ headerShown: false }} />
//         </Stack.Protected>

//         <Stack.Protected guard={!hasCompletedOnboarding}>
//           <Stack.Screen name="onboarding" options={{ headerShown: false }} />
//         </Stack.Protected>
//       </Stack>
//     </>
//   );
// }

function RootNavigator() {
  useAuthListener();

  const status = useAuthStore((s) => s.status);
  const isRecovering = useAuthStore((s) => s.isRecovering);
  const hasHydrated = useOnboardingStore((s) => s.hasHydrated);
  const hasCompletedOnboarding = useOnboardingStore(
    (s) => s.hasCompletedOnboarding,
  );

  const ready = hasHydrated && status !== "initializing";
  useEffect(() => {
    if (ready) SplashScreen.hideAsync();
  }, [ready]);
  if (!ready) return null;

  const isSignedIn = status === "signed-in" && !isRecovering;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!hasCompletedOnboarding}>
        <Stack.Screen name="onboarding" />
      </Stack.Protected>
      <Stack.Protected guard={hasCompletedOnboarding && !isSignedIn}>
        <Stack.Screen name="(auth)" />
      </Stack.Protected>
      <Stack.Protected guard={isSignedIn}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="hotel/[id]" />
        <Stack.Screen name="(modals)" options={{ presentation: "modal" }} />
      </Stack.Protected>
      <Stack.Screen name="(public)" />
    </Stack>
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
          </IntroRevealProvider>
        </AppProviders>
        {/* </ThemeProvider> */}
      </SafeAreaListener>
    </GestureHandlerRootView>
  );
}
