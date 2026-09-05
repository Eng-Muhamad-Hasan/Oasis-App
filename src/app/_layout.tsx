import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { SafeAreaListener } from "react-native-safe-area-context";
import { Uniwind } from "uniwind";

import { StatusBar } from "react-native";
import "../global.css";

import { IntroRevealProvider, SplashOverlay } from "@/components/splash";
// import { AppProviders } from "@/providers/app-providers";
import { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();

function RootNavigator() {
  return (
    <>
      <StatusBar barStyle={"light-content"} />
      <Stack>
        <Stack.Screen
          name="onboarding"
          options={{
            headerShown: false,
            contentStyle: { backgroundColor: "#fff" },
          }}
        />
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
            contentStyle: { backgroundColor: "#fff" },
          }}
        />
        <Stack.Screen name="hotel/[id]" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  // const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();
  const [revealed, setRevealed] = useState(false);
  const [splashDone, setSplashDone] = useState(false);

  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1, paddingBottom: insets.bottom }}>
      <SafeAreaListener
        onChange={({ insets }) => {
          Uniwind.updateInsets(insets);
        }}
      >
        {/* <AppProviders> */}
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
        {/* </AppProviders> */}
        {/* </ThemeProvider> */}
      </SafeAreaListener>
    </GestureHandlerRootView>
  );
}
