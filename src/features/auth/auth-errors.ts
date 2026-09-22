type AuthError = { status?: number; code?: string; name?: string };

const isNetworkError = (e: AuthError) => e.name === "AuthRetryableFetchError";

export function isEmailNotVerifiedError(error: AuthError) {
  return error.code === "email_not_confirmed";
}

export function getCodeRequestErrorMessage(error: AuthError) {
  if (isNetworkError(error)) return "Check your connection and try again.";
  if (error.status === 429)
    return "Please wait a minute before requesting another code.";
  return "We could not send a code right now. Please try again.";
}

export function getSignInErrorMessage(error: AuthError) {
  if (isNetworkError(error)) return "Check your connection and try again.";
  if (error.status === 429)
    return "Too many sign-in attempts. Please wait and try again.";
  if (error.status && error.status >= 500)
    return "We cannot sign you in right now. Please try again.";
  return "The email or password is incorrect.";
}

export function getSignUpErrorMessage(error: AuthError) {
  if (isNetworkError(error)) return "Check your connection and try again.";
  if (error.status === 429)
    return "Too many requests. Please wait and try again.";
  if (error.code === "weak_password") return "Choose a stronger password.";
  if (error.status && error.status >= 500)
    return "We cannot create your account right now. Please try again.";
  return "We could not create an account with those details.";
}

// verify-email and reset-password (verifyOtp reports wrong AND expired codes as otp_expired)
export function getOtpErrorMessage(error: AuthError) {
  if (isNetworkError(error)) return "Check your connection and try again.";
  if (error.status === 429)
    return "Too many attempts. Please wait and try again.";
  if (error.code === "otp_expired")
    return "That code is incorrect or has expired. Request a new one.";
  if (error.status && error.status >= 500)
    return "We cannot verify that code right now. Please try again.";
  return "We could not verify that code. Request a new one and try again.";
}

export function getResetPasswordErrorMessage(error: AuthError) {
  if (error.code === "same_password")
    return "Choose a password different from your current one.";
  if (error.code === "weak_password") return "Choose a stronger password.";
  return getOtpErrorMessage(error);
}
