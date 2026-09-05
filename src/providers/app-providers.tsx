// import { SessionProvider } from '@/features/auth/auth-session';
// import { WorkspaceProvider } from '@/features/workspace/workspace-store';
// import { I18nProvider } from '@/i18n';
// import { AppThemeProvider } from '@/theme/theme-provider';

import { AuthProvider } from "@/features/auth/auth-provider";
import { BiometricLockProvider } from "@/features/biometrics/biometric-lock-provider";
import { QueryProvider } from "@/providers/query-provider";
import { AppThemeProvider } from "@/theme/theme-provider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    {children}
    // <AppThemeProvider>
      // <I18nProvider>
        // <SessionProvider> */}
        // <WorkspaceProvider> */}
           // </WorkspaceProvider> */}
       // </SessionProvider> */}
      // </I18nProvider>
    // </AppThemeProvider> */}
  );
}

  // <AppThemeProvider>
  //   <QueryProvider>
  //     <AuthProvider>
  //       <BiometricLockProvider>{children}</BiometricLockProvider>
  //     </AuthProvider>
  //   </QueryProvider>
  // </AppThemeProvider>;
