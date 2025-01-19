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
  }; // Thêm travelTime vào PlaceOrder
};

export type RootTabParamList = {
  HomeTab: undefined;
  ProfileTab: undefined;
  Logout: undefined;
  ChatTab: undefined;
  NotificationTab: undefined;
  ChatDetail: {
    chatId: string;
  };
};
