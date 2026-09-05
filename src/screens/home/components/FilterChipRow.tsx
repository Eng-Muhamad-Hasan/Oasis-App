import { Pressable, Text } from 'react-native';
import * as Haptics from 'expo-haptics';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { SCREEN_ENTER_MS } from '@/constants/animation';
import { colors } from '@/theme';
import Feather from '@react-native-vector-icons/feather';

type FilterChipRowProps = {
  filters: string[];
  active: string;
  enterDelay: number;
  onSelect: (filter: string) => void;
};

export function FilterChipRow({ filters, active, enterDelay, onSelect }: FilterChipRowProps) {
  return (
    <Animated.ScrollView
      entering={FadeInDown.delay(enterDelay).duration(SCREEN_ENTER_MS)}
      horizontal
      showsHorizontalScrollIndicator={false}
      className="mt-4"
      contentContainerClassName="gap-2 px-5"
    >
      {filters.map((filter) => {
        const isActive = filter === active;
        return (
          <Pressable
            key={filter}
            className={`h-10 flex-row items-center gap-1 rounded-full px-4 ${
              isActive ? 'bg-pill' : 'bg-chip'
            }`}
            onPress={() => {
              Haptics.selectionAsync();
              onSelect(filter);
            }}
          >
            <Text
              className={`font-jakarta-medium text-[13px] ${isActive ? 'text-white' : 'text-ink'}`}
            >
              {filter}
            </Text>
            <Feather
              name="chevron-down"
              size={14}
              color={isActive ? colors.dark.accent : colors.dark.ink}
            />
          </Pressable>
        );
      })}
    </Animated.ScrollView>
  );
}
