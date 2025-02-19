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
export type LoginRequest = {
  phone: string;
  password: string;
};
export type UserResponse = {
  userId: string;
  phoneNumber: string;
  email: string;
  displayName: string;
  avatar: any;
  gender: "Male" | "Female" | "Other";
  dateOfBirth: Date;
};

export type LoginResponse = {
  user: UserResponse;
  token: {
    accessToken: string;
    refreshToken: string;
  };
};
