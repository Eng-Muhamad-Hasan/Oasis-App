// src/features/auth/components/auth-screen.tsx
import { Image } from "expo-image";
import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Brand = require("@/assets/images/Brand-Logo.svg");

export function AuthScreen({
  children,
  showLogo = true,
}: {
  children: React.ReactNode;
  showLogo?: boolean;
}) {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      contentContainerClassName="grow"
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      
    >
      <View
        className="flex-1 justify-center gap-4 px-6"
        style={{ paddingTop: insets.top + 24, paddingBottom: 24 }}
      >
        {showLogo ? (
          <Image
            source={Brand}
            contentFit="contain"
            style={{ height: 120, width: 140, alignSelf: "center" }}
          />
        ) : null}
        {children}
      </View>
    </ScrollView>
  );
}
