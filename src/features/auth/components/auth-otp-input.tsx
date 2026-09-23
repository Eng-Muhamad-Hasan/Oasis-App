import { View } from "react-native";
import { FadeInUp } from "react-native-reanimated";

import { OtpInput } from "@/shared/otp-input";

type AuthOtpInputProps = {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
};

export function AuthOtpInput({
  value,
  onChange,
  onBlur,
  error,
}: AuthOtpInputProps) {
  return (
    <View className="items-center justify-center">
      <OtpInput
        animationVariant="fadeSlideDown"
        onBlur={onBlur}
        enableAutoFocus={true}
        focusedBackgroundColor="#fff"
        unfocusedBackgroundColor="#fff"
        focusedBorderColor="#b4adad"
        unfocusedBorderColor="#4f4f4f"
        errorBackgroundColor="#fff"
        errorBorderColor="#ff786e"
        enteringAnimated={FadeInUp}
        inputBorderRadius={10}
        inputHeight={52}
        inputWidth={52}
        textStyle={{ color: "black" }}
        otpCount={6}
        value={value}
        error={Boolean(error)}
        errorMessage={error}
        onChange={onChange}
       
      />
    </View>
  );
}
