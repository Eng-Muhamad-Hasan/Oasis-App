import { zodResolver } from "@hookform/resolvers/zod";
import { Link, router, useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { Pressable, ScrollView, Text, View } from "react-native";

import { AppText } from "@/components/ui/app-text";
// import { Button } from "@/components/ui/button";
import { Button } from "@/shared/button";

import { Input } from "@/components/ui/input";
import {
  getSignInErrorMessage,
  isEmailNotVerifiedError,
} from "@/features/auth/auth-errors";
import { AuthFormHeader } from "@/features/auth/components/auth-form-header";
import {
  signInSchema,
  type SignInValues,
} from "@/features/auth/validation/auth-schemas";
import { appToast } from "@/lib/toast/app-toast";
import { CircularLoader } from "@/shared/circular-loader";
import { useAuthStore } from "@/store/authStore";
import { useAppTheme } from "@/theme/theme-provider";
import { Image } from "expo-image";
import { authService } from "../service/auth-service";

const Brand = require("@/assets/images/Brand-Logo.svg");

export function SignInScreen() {
  const { signUp } = useAuthStore();
  const { spacing } = useAppTheme();
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
    const { error } = await authService.signIn(email, values.password);

    if (error) {
      if (isEmailNotVerifiedError(error)) {
        void authService.resendSignUpCode(email); // Supabase won't resend on sign-in
        router.replace({ pathname: "/verify-email", params: { email } });
        return;
      }
      appToast.error("Sign-in failed", {
        description: getSignInErrorMessage(error),
      });
    }
    // Success: onAuthStateChange updates the store and the guard navigates
  }

  return (
    <ScrollView
      contentContainerClassName="flex-1"
      contentInsetAdjustmentBehavior="automatic"
      showsVerticalScrollIndicator={false}

      automaticallyAdjustKeyboardInsets
      scrollEnabled
    >
      <View className="flex-1 justify-center px-6 gap-5">
        <Image
          source={Brand}
          contentFit="contain"
          style={{ height: "15%", width: "35%", alignSelf: "center" }}
        />
        <AuthFormHeader
          title="Welcome back"
          body="Sign in with your email and password."
        />

        <Controller
          control={control}

          name="email"
          render={({ field: { onBlur, onChange, value }, fieldState }) => (
            <Input
              // label="Enter your email"
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
              size="md"
            />
          )}
        />
        <View className="mb-6">
          <Controller
            control={control}
            name="password"
            render={({ field: { onBlur, onChange, value }, fieldState }) => (
              <Input
                // label="Enter your password"
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
                size="md"
              />
            )}
          />
          <Link href="/forgot-password" asChild>
            <Pressable accessibilityRole="button" className="self-end">
              <Text className="text-primary font-normal text-caption">
                Forgot password ?
              </Text>
            </Pressable>
          </Link>
        </View>
        <Button.Root
          isLoading={isSubmitting}
          loadingBackgroundColor="#000"
          disabled={!isValid}
          onPress={
            () => void handleSubmit(submit)()
            // logOut();
            // redirect.dismissTo("/onboarding");
          }
        >
          <Button.Content>
            <View
              className={`${isValid ? "opacity-100" : "opacity-90"} flex-row bg-primary h-14 rounded-full flex-1 items-center justify-center gap-2.5`}
            >
              {/* <Ionicons name="arrow-forward" size={18} color="#ffffff" /> */}
              <Text className="text-secondary font-semibold text-body">
                Sign In
              </Text>
            </View>
          </Button.Content>

          <Button.Loading>
            <Button.Indicator>
              <CircularLoader
                activeColor="#fff"
                size={18}
                strokeWidth={2.5}
                enableBlur
                gradientLength={50}
                duration={500}
              />
            </Button.Indicator>
            <Button.Label className="text-secondary p-3 font-semibold">
              Submitting ..
            </Button.Label>
          </Button.Loading>
        </Button.Root>

        {/* <SocialAuthButtons /> */}

        <Link href="/sign-up" asChild>
          <Pressable
            accessibilityRole="button"
            style={{ alignSelf: "center", padding: spacing.xs }}
            onPress={signUp}
          >
            <AppText variant="caption" tone="muted">
              New here?{" "}
              <AppText variant="caption" tone="primary">
                Create an account
              </AppText>
            </AppText>
          </Pressable>
        </Link>
        <Link href="/public" asChild>
          <Pressable
            accessibilityRole="button"
            style={{
              alignSelf: "center",
              paddingHorizontal: spacing.md,
              paddingVertical: spacing.xs,
            }}
          >
            <Text>Continue without signing in</Text>
          </Pressable>
        </Link>
      </View>
    </ScrollView>
  );
}
