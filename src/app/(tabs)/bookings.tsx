import { AuthSubmitButton } from "@/features/auth/components/auth-submit-button";
import { authService } from "@/features/auth/service/auth-service";
import { appToast } from "@/lib/toast/app-toast";
import { Text, View } from "react-native";
async function signOut() {
  try {
    const { error } = await authService.signOut();
    if (!error) return; // onAuthStateChange updates the store; the route guard navigates

    appToast.error("Sign-out failed", {
      description: "Check your connection and try again.",
    });
  } catch {
    appToast.error("Sign-out failed", {
      description: "Check your connection and try again.",
    });
  }
}
const Bookings = () => {
  return (
    <View className="flex-1  items-center  justify-center top-safe  ">
      <View className="bg-chip p-2 m-0.5 rounded-2xl">
        <Text className="font-light text-2xl text-ink ">
          Expirement with NativeWind & Expo Router
        </Text>

        <AuthSubmitButton
          label="Sign out"
          onPress={() => {
            signOut();
          }}
        />
      </View>
    </View>
  );
};

export default Bookings;
