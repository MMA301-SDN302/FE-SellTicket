export const ApiConstant = {
  Login: "/auth/login",
  Logout: "/auth/logout",
  Register: "/auth/register",
  VerifyOTP: "/auth/verify-otp",
  ResendOTP: "/auth/resend-otp",
  RefreshToken: "/auth/refreshToken",
  ResetPassword: "/auth/reses-password",
  ChangePassword: "/auth/changePassword",
  ForgotPassword: "/auth/forgot-password",
  Ticket: "/tickets",
  Profile: "/profile",
  Payment: {
    CreateIntent: "/payment/create-intent",
    Confirm: "/payment/confirm",
    Config: "/payment/config",
    StripeSheet: "/payment/stripe-sheet",
    PayosPayment: "/payment/payos-payment"
  },
  Notification: {
    Send: "/notification/send",
    GetAll: "/notification/all",
    MarkRead: "/notification/read"
  }
};
