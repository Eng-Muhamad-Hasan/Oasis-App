import { Text, type TextProps } from "react-native";

import { cn } from "@/utils/cn";

type AppTextProps = TextProps & {
  variant?: "hero" | "title" | "subtitle" | "body" | "content" | "caption";
  tone?: "primary" | "muted" | "danger";
};

export function AppText({
  variant = "body",
  tone = "primary",
  selectable = true,
  className,
  ...props
}: AppTextProps) {
  return (
    <Text
      {...props}
      selectable={selectable}
      className={cn(
        variant === "hero" && "text-hero",
        variant === "title" && "text-title",
        variant === "subtitle" && "text-subtitle",
        variant === "body" && "text-body",
        variant === "content" && "text-content",
        // `text-${variant}`,
        `text-${tone}`,
        "font-normal",
        className,
      )}
    />
  );
}
