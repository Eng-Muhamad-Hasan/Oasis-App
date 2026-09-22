// src/features/auth/screens/reset-password.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { Keyboard, Pressable, Text } from "react-native";

import { Input } from "@/components/ui/input";
import {
  getCodeRequestErrorMessage,
  getOtpErrorMessage,
  getResetPasswordErrorMessage,
} from "@/features/auth/auth-errors";
import { AuthFormHeader } from "@/features/auth/components/auth-form-header";
import { AuthScreen } from "@/features/auth/components/auth-screen";
import { AuthSubmitButton } from "@/features/auth/components/auth-submit-button";
import { OtpCodeInput } from "@/features/auth/components/otp-code-input";
import { useOtpCooldown } from "@/features/auth/hooks/use-otp-cooldown";
import { authService } from "@/features/auth/service/auth-service";
import { useAuthStore } from "@/features/auth/store/auth-store";
import {
  resetPasswordSchema,
  type ResetPasswordValues,
} from "@/features/auth/validation/auth-schemas";
import { appToast } from "@/lib/toast/app-toast";

export function ResetPasswordScreen() {
  const params = useLocalSearchParams<{ email?: string }>();
  const email = getStringParam(params.email)?.trim().toLowerCase() ?? "";
  const {
    isCoolingDown,
    restart: restartCooldown,
    secondsRemaining,
  } = useOtpCooldown();
  const [isResending, setIsResending] = useState(false);
  const [isVerifyingCode, setIsVerifyingCode] = useState(false);
  const [codeVerified, setCodeVerified] = useState(false);
  const {
    control,
    getValues,
    handleSubmit,
    resetField,
    trigger,
    formState: { isSubmitting, isValid },
  } = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { otp: "", password: "", confirmPassword: "" },
    mode: "onChange",
  });
  const otp = useWatch({ control, name: "otp" });
  const isCodeComplete = /^\d{6}$/.test(otp.trim());

  async function verifyCode() {
    if (!email) return;
    if (!(await trigger("otp"))) return;

    setIsVerifyingCode(true);
    try {
      const { error } = await authService.verifyRecoveryCode(
        email,
        getValues("otp").trim(),
      );
      if (error) {
        appToast.error("Code not verified", {
          description: getOtpErrorMessage(error),
        });
        return;
      }
      Keyboard.dismiss();
      setCodeVerified(true); // the store now has a recovery session with isRecovering = true
    } catch {
      appToast.error("Code not verified", {
        description: "Check your connection and try again.",
      });
    } finally {
      setIsVerifyingCode(false);
    }
  }

  async function updatePassword(values: ResetPasswordValues) {
    try {
      const { error } = await authService.updatePassword(values.password);
      if (error) {
        // Stay on step 2: the code is spent but the recovery session is still live
        appToast.error("Password reset failed", {
          description: getResetPasswordErrorMessage(error),
        });
        return;
      }
      useAuthStore.getState().finishRecovery(); // the route guard now lets them into the app
      appToast.success("Password updated");
    } catch {
      appToast.error("Password reset failed", {
        description: "Check your connection and try again.",
      });
    }
  }

  async function resend() {
    if (!email || isCoolingDown || isResending) return;
    setIsResending(true);

    try {
      const { error } = await authService.requestPasswordReset(email);
      if (error) {
        appToast.error("Code request failed", {
          description: getCodeRequestErrorMessage(error),
        });
        return;
      }
      resetField("otp");
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
      <AuthScreen showLogo={false}>
        <AuthFormHeader
          title="Request a reset code"
          body="Enter your account email first so we can send you a code."
        />
        <Link href="/forgot-password" asChild>
          <Pressable accessibilityRole="button" className="self-center p-2">
            <Text className="text-body font-semibold text-primary">
              Request a code
            </Text>
          </Pressable>
        </Link>
      </AuthScreen>
    );
  }

  if (!codeVerified) {
    return (
      <AuthScreen showLogo={false}>
        <AuthFormHeader
          title="Check your email"
          body={`Enter the 6-digit reset code we sent to ${email}.`}
        />

        <Controller
          control={control}
          name="otp"
          render={({ field: { onBlur, onChange, value } }) => (
            <OtpCodeInput value={value} onBlur={onBlur} onChange={onChange} />
          )}
        />

        <AuthSubmitButton
          label="Verify code"
          loadingLabel="Verifying…"
          isLoading={isVerifyingCode}
          disabled={!isCodeComplete}
          onPress={() => void verifyCode()}
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

        <Link href="/forgot-password" asChild>
          <Pressable accessibilityRole="button" className="self-center p-1">
            <Text className="text-caption text-primary">
              Use a different email
            </Text>
          </Pressable>
        </Link>
      </AuthScreen>
    );
  }

  return (
    <AuthScreen showLogo={false}>
      <AuthFormHeader
        title="Create a new password"
        body="Your code was confirmed. Choose a new password."
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { onBlur, onChange, value }, fieldState }) => (
          <Input
            accessibilityLabel="New password"
            placeholder="New password"
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
            accessibilityLabel="Confirm new password"
            placeholder="Confirm new password"
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
        label="Update password"
        loadingLabel="Updating…"
        isLoading={isSubmitting}
        disabled={!isValid}
        onPress={() => void handleSubmit(updatePassword)()}
      />
    </AuthScreen>
  );
}

function getStringParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}
