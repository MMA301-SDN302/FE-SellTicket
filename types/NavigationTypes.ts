import type { DrawerLayoutAndroid } from "react-native";

export type RootStackParamList = {
  Welcome: undefined;
  SignIn: undefined;
  SignUp: undefined;
  Home: undefined;
  Profile: undefined;
  Logout: undefined;
  ForgotPassword: undefined;
  Chat: undefined;
  Notification: { drawer: React.RefObject<DrawerLayoutAndroid> };
};
