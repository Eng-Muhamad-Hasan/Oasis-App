// src/features/auth/screens/forgot-password.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { Pressable, Text } from "react-native";

import { Input } from "@/components/ui/input";
import { getCodeRequestErrorMessage } from "@/features/auth/auth-errors";
import { AuthFormHeader } from "@/features/auth/components/auth-form-header";
import { AuthScreen } from "@/features/auth/components/auth-screen";
import { AuthSubmitButton } from "@/features/auth/components/auth-submit-button";
import { authService } from "@/features/auth/service/auth-service";
import {
  forgotPasswordSchema,
  type ForgotPasswordValues,
} from "@/features/auth/validation/auth-schemas";
import { appToast } from "@/lib/toast/app-toast";

export function ForgotPasswordScreen() {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
    mode: "onChange",
  });

  async function submit(values: ForgotPasswordValues) {
    const email = values.email.trim().toLowerCase();

    try {
      const { error } = await authService.requestPasswordReset(email);
      if (error) {
        appToast.error("Reset request failed", {
          description: getCodeRequestErrorMessage(error),
        });
        return;
      }
      // Supabase reports success for unknown emails too, so this does not leak accounts
      router.replace({ pathname: "/reset-password", params: { email } });
    } catch {
      appToast.error("Reset request failed", {
        description: "Check your connection and try again.",
      });
    }
  }

  return (
    <AuthScreen showLogo={false}>
      <AuthFormHeader
        title="Reset your password"
        body="Enter your email and we'll send you a 6-digit code."
      />

      <Controller
        control={control}
        name="email"
        render={({ field: { onBlur, onChange, value }, fieldState }) => (
          <Input
            accessibilityLabel="Email"
            placeholder="example@gmail.com"
            leftIcon="mail"
            variant="filled"
            value={value}
            error={fieldState.error?.message}
            onBlur={onBlur}
            onChangeText={onChange}
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect={false}
            keyboardType="email-address"
          />
        )}
      />

      <AuthSubmitButton
        label="Send reset code"
        loadingLabel="Sending…"
        isLoading={isSubmitting}
        disabled={!isValid}
        onPress={() => void handleSubmit(submit)()}
      />

      <Link href="/sign-in" asChild>
        <Pressable accessibilityRole="button" className="self-center p-1">
          <Text className="text-caption text-primary">Back to sign in</Text>
        </Pressable>
      </Link>
    </AuthScreen>
  );
}
