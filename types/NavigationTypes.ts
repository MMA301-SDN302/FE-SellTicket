import { ROLE_NAME } from "./../utils/constant";
export type RootStackParamList = {
  HomeStack: undefined;
  Welcome: undefined;
  SignIn: undefined;
  SignUp: undefined;
  Logout: undefined;
  ForgotPassword: undefined;
  ResetPassword: {
    mobilePhone: string;
    userId: string;
  };
  ChangePassword: undefined;
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
    routeId: string,
  }; 
  Booking: {
    from: string;
    to: string;
    date: string;
    routeName: string; 
    time: string; 
    price: number | null; 
    travelTime: number; 
    routeId: string;
    policy: string | null; 
  };
  PlaceOrder: {
    from: string;
    to: string;
    date: string;
    busName: string;
    time: string;
    price: string;
    selectedSeats: string[];
    travelTime: number;
  }; // Thêm travelTime vào PlaceOrder
  OtpVerify: {
    mobilePhone: string;
    sendType: string;
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
  "Trang chủ": undefined;
  "Trang cá nhân": undefined;
  "Đăng xuất": undefined;
  "Vị trí": undefined;
  "Vé của tôi": undefined;
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
  "OtpVerify",
  "Chat",
  "Notification",
];
