// src/features/auth/screens/sign-in.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { Pressable, Text, View } from "react-native";

import { AppText } from "@/components/ui/app-text";
import { Input } from "@/components/ui/input";
import {
  getSignInErrorMessage,
  isEmailNotVerifiedError,
} from "@/features/auth/auth-errors";
import { AuthFormHeader } from "@/features/auth/components/auth-form-header";
import { AuthScreen } from "@/features/auth/components/auth-screen";
import { AuthSubmitButton } from "@/features/auth/components/auth-submit-button";
import { authService } from "@/features/auth/service/auth-service";
import {
  signInSchema,
  type SignInValues,
} from "@/features/auth/validation/auth-schemas";
import { appToast } from "@/lib/toast/app-toast";

export function SignInScreen() {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
    mode: "onChange",
  });

  async function submit(values: SignInValues) {
    const email = values.email.trim().toLowerCase();

    try {
      const { error } = await authService.signIn(email, values.password);
      if (!error) return; // onAuthStateChange updates the store; the route guard navigates

      if (isEmailNotVerifiedError(error)) {
        void authService.resendSignUpCode(email); // Supabase does not resend on sign-in
        router.replace({ pathname: "/verify-email", params: { email } });
        return;
      }

      appToast.error("Sign-in failed", {
        description: getSignInErrorMessage(error),
      });
    } catch {
      appToast.error("Sign-in failed", {
        description: "Check your connection and try again.",
      });
    }
  }

  return (
    <AuthScreen>
      <AuthFormHeader
        title="Welcome back"
        body="Sign in with your email and password."
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

      <View>
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
              autoComplete="current-password"
              secureTextEntry
            />
          )}
        />
        <Link href="/forgot-password" asChild>
          <Pressable accessibilityRole="button" className="self-end">
            <Text className="text-caption font-normal text-primary">
              Forgot password?
            </Text>
          </Pressable>
        </Link>
      </View>

      <AuthSubmitButton
        label="Sign In"
        loadingLabel="Signing in…"
        isLoading={isSubmitting}
        disabled={!isValid}
        onPress={() => void handleSubmit(submit)()}
      />

      <Link href="/sign-up" asChild>
        <Pressable accessibilityRole="button" className="self-center p-1">
          <AppText variant="caption" tone="muted">
            New here?{" "}
            <AppText variant="caption" tone="primary">
              Create an account
            </AppText>
          </AppText>
        </Pressable>
      </Link>

      <Link href="/public" asChild>
        <Pressable accessibilityRole="button" className="self-center px-3 py-1">
          <Text className="text-caption text-muted">
            Continue without signing in
          </Text>
        </Pressable>
      </Link>
    </AuthScreen>
  );
}
