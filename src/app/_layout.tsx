import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { SafeAreaListener } from "react-native-safe-area-context";
import { Uniwind } from "uniwind";

import { useColorScheme } from "react-native";
import "../global.css";

import { AnimatedSplashOverlay } from "@/components/animated-icon";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();

  return (
    <GestureHandlerRootView style={{ flex: 1, paddingBottom: insets.bottom }}>
      <SafeAreaListener
        onChange={({ insets }) => {
          Uniwind.updateInsets(insets);
        }}
      >
        {/* <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}> */}
        <AnimatedSplashOverlay />
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
        {/* </ThemeProvider> */}
      </SafeAreaListener>
    </GestureHandlerRootView>
  );
}
