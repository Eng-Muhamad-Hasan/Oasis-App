// src/features/auth/auth-store.ts
import type { AuthChangeEvent, Session, User } from "@supabase/supabase-js";
import { create } from "zustand";

type AuthState = {
  status: "initializing" | "signed-out" | "signed-in";
  session: Session | null;
  user: User | null;
  isRecovering: boolean; // signed in with a reset code, new password not set yet
  handleAuthEvent: (event: AuthChangeEvent, session: Session | null) => void;
  finishRecovery: () => void;
};

export const useAuthStore = create<AuthState>()((set) => ({
  status: "initializing",
  session: null,
  user: null,
  isRecovering: false,
  handleAuthEvent: (event, session) =>
    set((s) => ({
      session,
      user: session?.user ?? null,
      status: session ? "signed-in" : "signed-out",
      isRecovering:
        event === "PASSWORD_RECOVERY" ? true : session ? s.isRecovering : false,
    })),
  finishRecovery: () => set({ isRecovering: false }),
}));
