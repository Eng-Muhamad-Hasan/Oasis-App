// Icon.tsx
import { HugeiconsIcon, IconSvgElement } from "@hugeicons/react-native";
import { StyleProp, ViewStyle } from "react-native";

type IconProps = {
  icon: IconSvgElement;
  altIcon?: IconSvgElement;
  showAlt?: boolean;
  size?: number;
  color?: string;
  strokeWidth?: number;
  style?: StyleProp<ViewStyle>;
};

export function Icon({
  size = 16,
  color = "black",
  strokeWidth = 1.5,
  ...rest
}: IconProps) {
  return (
    <HugeiconsIcon
      size={size}
      color={color}
      strokeWidth={strokeWidth}
      {...rest}
    />
  );
}
