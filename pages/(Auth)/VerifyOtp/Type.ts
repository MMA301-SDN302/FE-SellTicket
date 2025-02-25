import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../types/NavigationTypes";
import { RouteProp } from "@react-navigation/core";

type OtpVerifyProp = StackNavigationProp<RootStackParamList, "OtpVerify">;
type MobilePhoneProp = RouteProp<RootStackParamList, "OtpVerify">;
export type Props = {
  navigation: OtpVerifyProp;
  route: MobilePhoneProp;
};

export type VerifyOtpResponse = {
  user: {
    userId: string;
    dateOfBirth?: string;
    displayName: string;
    email?: string;
    phoneNumber: string;
    gender: string;
    avatar?: string;
  };
  token: {
    accessToken: string;
    refreshToken: string;
  };
  mobilePhone: string;
  userId: string;
};

export type ResendOtpResponse = {
  mobilePhone: string;
};
