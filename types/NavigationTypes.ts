export type RootStackParamList = {
  Home: undefined;
  Welcome: undefined;
  SignIn: undefined;
  SignUp: undefined;
  Logout: undefined;
  ForgotPassword: undefined;
  ResetPassword: undefined;
  Profile: undefined;
  MyTicket: undefined;
  Route: { from: string; to: string; date: string; isRoundTrip: boolean; travelTime: number }; // Thêm travelTime vào Route
  Booking: { from: string; to: string; date: string; busName: string; time: string; price: string; travelTime: number }; // Thêm travelTime vào Booking
  PlaceOrder: { from: string; to: string; date: string; busName: string; time: string; price: string; selectedSeats: string[]; travelTime: number }; // Thêm travelTime vào PlaceOrder
};

export type RootTabParamList = {
  Home: undefined;
  Profile: undefined;
  Logout: undefined;
  Chat: undefined;
  Notification: undefined;
};

export const rootStackRoutes: (keyof RootStackParamList)[] = [
  "Home",
  "Welcome",
  "SignIn",
  "SignUp",
  "Logout",
  "ForgotPassword",
  "ResetPassword",
  "Profile",
  "MyTicket",
  "Route",
  "Booking",
  "PlaceOrder"
];

export const rootTabRoutes: (keyof RootTabParamList)[] = [
  "Home",
  "Profile",
  "Logout",
  "Chat",
  "Notification",
];
