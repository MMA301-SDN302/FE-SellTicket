import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../types/NavigationTypes";

export type SignInProp = StackNavigationProp<RootStackParamList, "SignIn">;

export type Props = {
  navigation: SignInProp;
};
export type FormValues = {
  phoneNumber: string;
  password: string;
};
export type ResetPasswordValues = {
  password: string;
  newPassword: string;
  confirmPassword: string;
};
export type LoginRequest = {
  phone: string;
  password: string;
};
export type UserResponse = {
  userId: string;
  dateOfBirth?: string;
  displayName: string;
  email?: string;
  phoneNumber: string;
  gender: string;
  avatar?: string;
  role?: string;
};

export type LoginResponse = {
  user: UserResponse;
  token: {
    accessToken: string;
    refreshToken: string;
  };
};
