import { zodResolver } from "@hookform/resolvers/zod";
import { Link, router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { Pressable, ScrollView, Text, View } from "react-native";

import { AppText } from "@/components/ui/app-text";
// import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getSignUpErrorMessage } from "@/features/auth/auth-errors";
import { AuthFormHeader } from "@/features/auth/components/auth-form-header";
import { authPolicy } from "@/features/auth/config/auth-policy";
import {
  signUpSchema,
  type SignUpValues,
} from "@/features/auth/validation/auth-schemas";
import { Button } from "@/shared/button";

import { supabase } from "@/lib/supabase";
import { appToast } from "@/lib/toast/app-toast";
import { useAppTheme } from "@/theme/theme-provider";
import { Image } from "expo-image";
import { CircularLoader } from "@/shared/circular-loader";
const Brand = require("@/assets/images/Brand-Logo.svg");

export function SignUpScreen() {
  const { spacing } = useAppTheme();
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
      const {
        data: { session },
        error,
      } = await supabase.auth.signUp({
        email: email,
        password: values.password,
      });

      // const result = await authClient.signUp.email({
      //   name: values.name.trim(),
      //   email,
      //   password: values.password,
      // });

      if (error) {
        appToast.error("Account creation failed", {
          description: getSignUpErrorMessage(error),
        });
        return;
      }

      if (!session)
        appToast.warning("Please check your inbox for email verification!");

      router.replace({ pathname: "/sign-in", params: { email } });
    } catch {
      appToast.error("Account creation failed", {
        description: "Check your connection and try again.",
      });
    }
  }

  return (
    <ScrollView
      contentContainerClassName="flex-1"
      contentInsetAdjustmentBehavior="automatic"
      showsVerticalScrollIndicator={false}

      automaticallyAdjustKeyboardInsets
      scrollEnabled
    >
      <View className="flex-1 justify-center px-6 gap-3">
        <Image
          source={Brand}
          contentFit="contain"
          style={{ height: "15%", width: "35%", alignSelf: "center" }}
        />
        <AuthFormHeader
          title="Join to our family"
          body={'Start your journey with new experience'}
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
              size="md"
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
              size="md"
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
              size="md"
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
              size="md"
            />
          )}
        />
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
              Create Account
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

        <Link href="/sign-in" asChild>
          <Pressable
            accessibilityRole="button"
            style={{ alignSelf: "center", padding: spacing.xs }}
          >
            <AppText variant="caption" tone="muted">
              Already have an account?{" "}
              <AppText variant="caption" tone="primary">
                Sign in
              </AppText>
            </AppText>
          </Pressable>
        </Link>
      </View>
    </ScrollView>
  );
}
