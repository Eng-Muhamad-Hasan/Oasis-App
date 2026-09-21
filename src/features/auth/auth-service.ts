// src/features/auth/auth-service.ts
import { supabase } from "@/lib/supabase/client";

export const authService = {
  signUp: (email: string, password: string, name: string) =>
    supabase.auth.signUp({ email, password, options: { data: { name } } }),
  verifySignUpCode: (email: string, token: string) =>
    supabase.auth.verifyOtp({ email, token, type: "signup" }),
  resendSignUpCode: (email: string) =>
    supabase.auth.resend({ type: "signup", email }),
  signIn: (email: string, password: string) =>
    supabase.auth.signInWithPassword({ email, password }),
  requestPasswordReset: (email: string) =>
    supabase.auth.resetPasswordForEmail(email),
  verifyRecoveryCode: (email: string, token: string) =>
    supabase.auth.verifyOtp({ email, token, type: "recovery" }),
  updatePassword: (password: string) => supabase.auth.updateUser({ password }),
  signOut: () => supabase.auth.signOut({ scope: "local" }), // "global" signs out all devices
};
