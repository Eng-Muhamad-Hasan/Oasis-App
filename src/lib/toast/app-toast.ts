import { toastiva } from "toastiva";

type ToastOptions = Parameters<typeof toastiva.success>[1];

const defaultOptions = {
  animationPreset: "smooth",
  fill: "#f4eaf7",
  showProgress: false,
  showTimestamp: false,
  styles: {
    title: { color: "#000" },
    description: { color: "#000", alignSelf: "center" },
  },
} satisfies ToastOptions;

function withDefaults(options?: ToastOptions): ToastOptions {
  return {
    ...defaultOptions,
    ...options,
    styles: {
      ...defaultOptions.styles,
      ...options?.styles,
    },
  };
}

export const appToast = {
  message(title: string, options?: ToastOptions) {
    return toastiva(title, withDefaults(options));
  },
  success(title: string, options?: ToastOptions) {
    return toastiva.success(title, withDefaults(options));
  },
  error(title: string, options?: ToastOptions) {
    return toastiva.error(title, withDefaults(options));
  },
  warning(title: string, options?: ToastOptions) {
    return toastiva.warning(title, withDefaults(options));
  },
  info(title: string, options?: ToastOptions) {
    return toastiva.info(title, withDefaults(options));
  },
  loading(title: string, options?: ToastOptions) {
    return toastiva(title, { ...withDefaults(options), isLoading: true });
  },
  dismiss(id?: string | number) {
    if (id === undefined) return toastiva.dismissAll();
    return toastiva.dismiss(String(id));
  },
};
