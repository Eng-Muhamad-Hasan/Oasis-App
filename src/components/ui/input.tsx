import { Text, TextInput, View, type TextInputProps } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { Icon, type IconName } from '@/components/ui/icon';
import { useAppTheme } from '@/theme/theme-provider';
import { cn } from '@/utils/cn';
import { shadows } from '@/theme';

type InputProps = TextInputProps & {
  label?: string;
  variant?: 'default' | 'filled' | 'quiet';
  size?: 'sm' | 'md' | 'lg';
  leftIcon?: IconName;
  rightIcon?: IconName;
  error?: string;
};

export function Input({
  label,
  variant = 'default',
  size = 'md',
  leftIcon,
  rightIcon,
  error,
  style,
  secureTextEntry,
  autoCapitalize,
  autoCorrect,
  spellCheck,
  ...props
}: InputProps) {
  const { colors, radius, spacing } = useAppTheme();
  const isQuiet = variant === 'quiet';
  const inputHeight = size === 'sm' ? 44 : size === 'lg' ? 60 : 52;

  return (
    <View className="gap-2" style={[shadows.halo]}>
      {label ? (
        <Text className='text-primary font-light' >
          {label}
        </Text>
      ) : null}
      <View
        style={[
          {
            minHeight: inputHeight,
            flexDirection: "row",
            alignItems: "center",
            gap: spacing.sm,
            borderWidth: 1,
            borderColor: error
              ? colors.danger
              : isQuiet
                ? "transparent"
                : colors.border,
            borderRadius: radius.lg,
            paddingHorizontal: spacing.lg,
            backgroundColor:
              variant === "filled" ? colors.lavender : colors.surface,
          },
        ]}
      >
        {leftIcon ? (
          <Icon name={leftIcon} size={18} color={colors.textMuted} />
        ) : null}
        <TextInput
        className='flex-1 font-normal text-primary text-content'
          autoCapitalize={
            autoCapitalize ?? (secureTextEntry ? "none" : undefined)
          }
          autoCorrect={autoCorrect ?? (secureTextEntry ? false : undefined)}
          secureTextEntry={secureTextEntry}
          spellCheck={spellCheck ?? (secureTextEntry ? false : undefined)}
         
         
         showSoftInputOnFocus
          {...props}
        />
        {rightIcon ? (
          <Icon name={rightIcon} size={18} color={colors.textMuted} />
        ) : null}
      </View>
      {error ? (
        <Text className='text-danger font-light text-caption' >
          {error}
        </Text>
      ) : <Text className='text-caption'/>}
    </View>
  );
}
