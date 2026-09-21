// src/features/auth/use-auth-listener.ts
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { AppState } from "react-native";

import { supabase } from "@/lib/supabase/client";
import { useAuthStore } from "../auth-store";

export function useAuthListener() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      // Keep synchronous: awaiting Supabase calls in here can deadlock
      useAuthStore.getState().handleAuthEvent(event, session);
      if (event === "SIGNED_OUT") queryClient.clear();
    });

    // Android pauses JS timers in the background, so only refresh in the foreground
    supabase.auth.startAutoRefresh();
    const appState = AppState.addEventListener("change", (state) => {
      if (state === "active") supabase.auth.startAutoRefresh();
      else supabase.auth.stopAutoRefresh();
    });

    return () => {
      data.subscription.unsubscribe();
      appState.remove();
      supabase.auth.stopAutoRefresh();
    };
  }, [queryClient]);
}
