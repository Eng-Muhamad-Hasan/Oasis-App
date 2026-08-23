import { Pressable, Text, View } from 'react-native';
import * as Haptics from 'expo-haptics';

import { CURRENT_USER } from '@/data/user';
import { palette } from '@/theme';
import Ionicons from '@react-native-vector-icons/ionicons';

export function GreetingHeader() {
  return (
    <View className="flex-row items-start justify-between">
      <View>
        <Text className="font-jakarta-bold text-[22px] text-ink">
          Hey, {CURRENT_USER.firstName}
        </Text>
        <Text className="mt-1 font-jakarta text-[13px] text-muted">
          Explore new hotels for your next stay!
        </Text>
      </View>
      <Pressable
        hitSlop={6}
        className="h-11 w-11 items-center justify-center rounded-full active:bg-chip"
        onPress={() => Haptics.selectionAsync()}
      >
        <Ionicons name="notifications-outline" size={21} color={palette.ink} />
        <View className="absolute right-1 top-0.5 h-4 w-4 items-center justify-center rounded-full bg-coral">
          <Text className="font-jakarta-semibold text-[9px] text-white">
            {CURRENT_USER.unreadNotifications}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}
