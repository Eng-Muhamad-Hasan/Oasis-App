// src/features/auth/screens/sign-up.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { Pressable } from "react-native";

import { AppText } from "@/components/ui/app-text";
import { Input } from "@/components/ui/input";
import { getSignUpErrorMessage } from "@/features/auth/auth-errors";
import { AuthFormHeader } from "@/features/auth/components/auth-form-header";
import { AuthScreen } from "@/features/auth/components/auth-screen";
import { AuthSubmitButton } from "@/features/auth/components/auth-submit-button";
import { authService } from "@/features/auth/service/auth-service";
import {
  signUpSchema,
  type SignUpValues,
} from "@/features/auth/validation/auth-schemas";
import { appToast } from "@/lib/toast/app-toast";

export function SignUpScreen() {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
    mode: "onChange",
  });

  async function submit(values: SignUpValues) {
    const email = values.email.trim().toLowerCase();

    try {
      const { data, error } = await authService.signUp(
        email,
        values.password,
        values.name.trim(),
      );

      if (error) {
        appToast.error("Account creation failed", {
          description: getSignUpErrorMessage(error),
        });
        return;
      }

      if (data.session) return; // "Confirm email" off: onAuthStateChange signs them in

      // Always continue to verification, even for an existing email, so the screen
      // does not reveal which addresses are registered.
      router.replace({ pathname: "/verify-email", params: { email } });
    } catch {
      appToast.error("Account creation failed", {
        description: "Check your connection and try again.",
      });
    }
  }

  return (
    <AuthScreen>
      <AuthFormHeader
        title="Join our family"
        body="Start your journey with a new experience."
      />

      <Controller
        control={control}
        name="name"
        render={({ field: { onBlur, onChange, value }, fieldState }) => (
          <Input
            accessibilityLabel="Name"
            placeholder="Name"
            leftIcon="person"
            variant="filled"
            value={value}
            error={fieldState.error?.message}
            onBlur={onBlur}
            onChangeText={onChange}
            autoComplete="name"
          />
        )}
      />
      <Controller
        control={control}
        name="email"
        render={({ field: { onBlur, onChange, value }, fieldState }) => (
          <Input
            accessibilityLabel="Email"
            placeholder="Email"
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
      <Controller
        control={control}
        name="password"
        render={({ field: { onBlur, onChange, value }, fieldState }) => (
          <Input
            accessibilityLabel="Password"
            placeholder="Password"
            leftIcon="lock"
            variant="filled"
            value={value}
            error={fieldState.error?.message}
            onBlur={onBlur}
            onChangeText={onChange}
            autoComplete="new-password"
            secureTextEntry
          />
        )}
      />
      <Controller
        control={control}
        name="confirmPassword"
        render={({ field: { onBlur, onChange, value }, fieldState }) => (
          <Input
            accessibilityLabel="Confirm password"
            placeholder="Confirm password"
            leftIcon="lock"
            variant="filled"
            value={value}
            error={fieldState.error?.message}
            onBlur={onBlur}
            onChangeText={onChange}
            autoComplete="new-password"
            secureTextEntry
          />
        )}
      />

      <AuthSubmitButton
        label="Create Account"
        loadingLabel="Creating account…"
        isLoading={isSubmitting}
        disabled={!isValid}
        onPress={() => void handleSubmit(submit)()}
      />
   
      <Link href="/sign-in" asChild>
        <Pressable accessibilityRole="button" className="self-center p-1">
          <AppText variant="caption" tone="muted">
            Already have an account?{" "}
            <AppText variant="caption" tone="primary">
              Sign in
            </AppText>
          </AppText>
        </Pressable>
      </Link>
    </AuthScreen>
  );
}
