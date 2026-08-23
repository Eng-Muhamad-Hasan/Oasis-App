import { cn } from "@/utils/cn";
import { View } from "react-native";

type CardProp = {
  isActive: boolean;
  isDisabled: boolean;
  className: string;
};

export const Card = ({ isActive, isDisabled, className }: CardProp) => (
  <View
    className={cn(
      "p-4 rounded-lg border",
      isActive && "border-blue-500 bg-blue-50",
      isDisabled && "opacity-50",
      !isDisabled && "active:scale-95",
      className,
    )}
  />
);
