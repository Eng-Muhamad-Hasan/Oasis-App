// src/features/auth/components/auth-submit-button.tsx
import { Text, useWindowDimensions } from "react-native";

import { Button } from "@/shared/button";
import { CircularLoader } from "@/shared/circular-loader";
import { OrbitDotLoader } from "@/shared/orbiting-dots";

const PRIMARY_HEX = "#0F1012"; // hex twin of --color-primary (Reanimated can't interpolate oklch)

type AuthSubmitButtonProps = {
  label: string;
  loadingLabel?: string;
  isLoading?: boolean;
  disabled?: boolean;
  onPress: () => void;
};

export function AuthSubmitButton({
  label,
  loadingLabel = "Please wait…",
  isLoading,
  disabled = false,
  onPress,
}: AuthSubmitButtonProps) {
  const { width } = useWindowDimensions();

  return (
    <Button.Root
      isLoading={isLoading}
      disabled={disabled}
      onPress={onPress}
      width={width - 48} // matches px-6 on both sides
      height={56}
      backgroundColor={PRIMARY_HEX}
      loadingBackgroundColor="#000000"
    >
      <Button.Content>
        <Text className="text-body font-semibold text-secondary">{label}</Text>
      </Button.Content>

      <Button.Loading>
        <Button.Indicator>
         <OrbitDotLoader numDots={3} size={18}/>
         
          {/* <CircularLoader
            activeColor="#fff"
            size={18}
            strokeWidth={2.5}
            enableBlur
            gradientLength={50}
            duration={500}
          /> */}
        </Button.Indicator>
        <Button.Label className="p-3 font-semibold text-secondary">
          {loadingLabel}
        </Button.Label>
      </Button.Loading>
    </Button.Root>
  );
}
