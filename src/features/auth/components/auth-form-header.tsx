import { Text, View } from "react-native";

type AuthFormHeaderProps = {
  title: string;
  body: string;
};

export function AuthFormHeader({ title, body }: AuthFormHeaderProps) {
  return (
    <View className="justify-center gap-2 mb-3">
      <Text className="text-center text-title font-semibold text-primary">
        {title}
      </Text>
      <Text className="text-center text-body font-normal text-muted">
        {body}
      </Text>
    </View>
  );
}
