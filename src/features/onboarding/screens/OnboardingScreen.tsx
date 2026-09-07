import * as Haptics from "expo-haptics";
import { Text, View } from "react-native";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { PressableScale } from "@/components/PressableScale";

import { useAuthStore } from "@/utils/authStore";
import { PhotoOrbit } from "../components/PhotoOrbit";
import {
  CTA_ENTER_DELAY_MS,
  ONBOARDING_ENTER_MS,
  TAGLINE_ENTER_DELAY_MS,
} from "../onboarding.constants";

const TAGLINE = ["Sun, sea and slow days", 'Cozy rooms and warm nights', 'Special Service and local vibes'];
const TITLE = [
  "Your Mediterranean escape is a couple of taps away",
  "It's time to unwind and relax in style",
  "Unique experience that will make your stay unforgettable",
];

const BUTTON_TEXT = ['Next','Next',"Get Started"];

export function OnboardingScreen() {
  const insets = useSafeAreaInsets();
  const { completeOnboarding } = useAuthStore();
  const startExploring = () => {
    Haptics.performAndroidHapticsAsync(Haptics.AndroidHaptics.Confirm);
    completeOnboarding();
  };

  return (
    <View
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
      className="flex-1 justify-evenly bg-background px-6 "
    >
      <View className="flex-row items-center justify-center">
        <Text className="font-semibold text-body tracking-[3px] text-ink">
          Oasis
        </Text>
        <Text className="font-semibold text-content text-ink">°</Text>
      </View>

      <View className="items-center justify-center">
        <PhotoOrbit />
      </View>

      <Animated.View
        entering={FadeInDown.delay(TAGLINE_ENTER_DELAY_MS).duration(
          ONBOARDING_ENTER_MS,
        )}
        className="items-center"
      >
        <Text className="font-medium text-content text-muted">
          {TAGLINE[0]}
        </Text>
        <Text className="mt-3 text-center font-normal text-title leading-tight tracking-[-0.5px] text-primary">
          {TITLE[0]}
        </Text>
      </Animated.View>

      <Animated.View
        entering={FadeIn.delay(CTA_ENTER_DELAY_MS).duration(
          ONBOARDING_ENTER_MS,
        )}
        className="pb-2 pt-5"
      >
        <PressableScale
          scaleTo={0.97}
          className="h-14 items-center justify-center rounded-full bg-blend-color bg-primary"
          onPress={startExploring}
        >
          <Text className="font-jakarta-semibold text-body text-secondary">
            Get Started
          </Text>
        </PressableScale>
      </Animated.View>
    </View>
  );
}
