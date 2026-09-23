// src/features/auth/screens/verify-email.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Pressable, Text } from "react-native";

import {
  getCodeRequestErrorMessage,
  getOtpErrorMessage,
} from "@/features/auth/auth-errors";
import { AuthFormHeader } from "@/features/auth/components/auth-form-header";
import { AuthScreen } from "@/features/auth/components/auth-screen";
import { AuthSubmitButton } from "@/features/auth/components/auth-submit-button";
import { useOtpCooldown } from "@/features/auth/hooks/use-otp-cooldown";
import { authService } from "@/features/auth/service/auth-service";
import {
  verifyEmailOtpSchema,
  type VerifyEmailOtpValues,
} from "@/features/auth/validation/auth-schemas";
import { appToast } from "@/lib/toast/app-toast";
import { AuthOtpInput } from "../components/auth-otp-input";

export function VerifyEmailScreen() {
  const params = useLocalSearchParams<{ email?: string }>();
  const email = getStringParam(params.email)?.trim().toLowerCase() ?? "";
  const {
    isCoolingDown,
    restart: restartCooldown,
    secondsRemaining,
  } = useOtpCooldown();
  const [isResending, setIsResending] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useForm<VerifyEmailOtpValues>({
    resolver: zodResolver(verifyEmailOtpSchema),
    defaultValues: { otp: "" },
    mode: "onChange",
  });

  async function submit(values: VerifyEmailOtpValues) {
    if (!email) return;

    try {
      const { error } = await authService.verifySignUpCode(
        email,
        values.otp.trim(),
      );
      if (error) {
        appToast.error("Verification failed", {
          description: getOtpErrorMessage(error),
        });
        return;
      }
      appToast.success("Email verified"); // signed in now: the route guard navigates
    } catch {
      appToast.error("Verification failed", {
        description: "Check your connection and try again.",
      });
    }
  }

  async function resend() {
    if (!email || isCoolingDown || isResending) return;
    setIsResending(true);

    try {
      const { error } = await authService.resendSignUpCode(email);
      if (error) {
        appToast.error("Code request failed", {
          description: getCodeRequestErrorMessage(error),
        });
        return;
      }
      restartCooldown();
      appToast.success("Code sent", {
        description: "Check your email for the new code.",
      });
    } catch {
      appToast.error("Code request failed", {
        description: "Check your connection and try again.",
      });
    } finally {
      setIsResending(false);
    }
  }

  if (!email) {
    return (
      <AuthScreen>
        <AuthFormHeader
          title="Email address missing"
          body="Go back to sign in. If your account still needs verification, signing in will send a fresh code."
        />
        <Link href="/sign-in" asChild>
          <Pressable accessibilityRole="button" className="self-center p-2">
            <Text className="text-body font-semibold text-primary">
              Back to sign in
            </Text>
          </Pressable>
        </Link>
      </AuthScreen>
    );
  }

  return (
    <AuthScreen showLogo={false}>
      <AuthFormHeader
        title="Check your email"
        body={`Enter the 6-digit code we sent to ${email}.`}
      />

      <Controller
        control={control}
        name="otp"
        render={({ field: { onChange, value }, fieldState }) => (
          <AuthOtpInput
            value={value}
            onChange={onChange}
            error={fieldState.error?.message}
          />
        )}
      />

      <AuthSubmitButton
        label="Verify email"
        loadingLabel="Verifying…"
        isLoading={isSubmitting}
        disabled={!isValid}
        onPress={() => void handleSubmit(submit)()}
      />

      <Pressable
        accessibilityRole="button"
        disabled={isCoolingDown || isResending}
        onPress={() => void resend()}
        className="self-center p-2"
      >
        <Text className="text-caption text-muted">
          {isResending
            ? "Sending…"
            : isCoolingDown
              ? `Resend code in ${secondsRemaining}s`
              : "Resend code"}
        </Text>
      </Pressable>

      <Link href="/sign-in" asChild>
        <Pressable accessibilityRole="button" className="self-center p-1">
          <Text className="text-caption text-primary">Back to sign in</Text>
        </Pressable>
      </Link>
    </AuthScreen>
  );
}

function getStringParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}
