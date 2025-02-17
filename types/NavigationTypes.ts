import { ROLE_NAME } from './../utils/constant';
export type RootStackParamList = {
  HomeStack: undefined;
  Welcome: undefined;
  SignIn: undefined;
  SignUp: undefined;
  Logout: undefined;
  ForgotPassword: undefined;
  ResetPassword: undefined;
  Chat: undefined;
  Notification: undefined;
  ChatDetail: {
    chatId: string;
  };
  Route: {
    from: string;
    to: string;
    date: string;
    isRoundTrip: boolean;
    travelTime: number;
  }; // Thêm travelTime vào Route
  Booking: {
    from: string;
    to: string;
    date: string;
    busName: string;
    time: string;
    price: string;
    travelTime: number;
  }; // Thêm travelTime vào Booking
  PlaceOrder: {
    from: string;
    to: string;
    date: string;
    busName: string;
    time: string;
    price: string;
    selectedSeats: string[];
    travelTime: number;
  }; 
    AdminPage: undefined;
    ProductDashboard: undefined;
    UserManagement: undefined;
    Orders: undefined;
    Reports: undefined;
    Settings: undefined;
    Admin: undefined;
};

 
export type AdminDrawerParamList = {
  AdminPage: undefined;
  ProductDashboard: undefined;
};

export type RootTabParamList = {
  Home: undefined;
  Profile: undefined;
  Logout: undefined;
  Map: undefined;
  MyTicket: undefined;
  Notification: undefined;
};

export const rootStackRoutes: (keyof RootStackParamList)[] = [
  "HomeStack",
  "Welcome",
  "SignIn",
  "SignUp",
  "Logout",
  "ForgotPassword",
  "ResetPassword",
  "Route",
  "Booking",
  "PlaceOrder",
  "Chat",
  "Notification",
];
