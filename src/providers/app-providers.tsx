// import { SessionProvider } from '@/features/auth/auth-session';
// import { WorkspaceProvider } from '@/features/workspace/workspace-store';
// import { I18nProvider } from '@/i18n';
import { AppThemeProvider } from "@/theme/theme-provider";

// import  AuthProvider  from "@/providers/auth-provider";
// import { BiometricLockProvider } from "@/features/biometrics/biometric-lock-provider";
import { QueryProvider } from "@/providers/query-provider";
import { ToastivaProvider } from "toastiva";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <AppThemeProvider>
      <QueryProvider>
        <ToastivaProvider
          position="top-center"
          animationPreset="smooth"
          fill="#f4eaf7"
          showProgress={false}
          showTimestamp={false}
          styles={{
            title: { color: "#000" },
            content:{justifyContent:'center'},
            description: {
              color: "#000",
              alignSelf: "center",
              justifyContent:'center',
              verticalAlign: "middle",
            },
          }}
        >
          {/* <AuthProvider> */}

          {/* <AuthProvider> */}
          {/* <BiometricLockProvider> */}
          {children}
          {/* </BiometricLockProvider> */}
          {/* </AuthProvider> */}
          {/* </AuthProvider> */}
        </ToastivaProvider>
      </QueryProvider>
    </AppThemeProvider>
    // <I18nProvider>
    // <SessionProvider> */}
    // <WorkspaceProvider> */}
    // </WorkspaceProvider> */}
    // </SessionProvider> */}
    // </I18nProvider>
  );
}

// <AppThemeProvider>

// </AppThemeProvider>;
