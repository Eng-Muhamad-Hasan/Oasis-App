// src/lib/supabase/client.ts
import { createClient } from "@supabase/supabase-js";

import { LargeSecureStore } from "./large-secure-store";

const url = process.env.EXPO_PUBLIC_SUPABASE_URL;
const key = process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
if (!url || !key)
  throw new Error("Missing EXPO_PUBLIC_SUPABASE_* environment variables");

export const supabase = createClient(url, key, {
  auth: {
    storage: new LargeSecureStore(),
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
