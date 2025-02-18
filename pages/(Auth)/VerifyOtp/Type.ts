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
  phone_number: string;
  userId: string;
  name: string;
  token: {
    accessToken: string;
    refreshToken: string;
  };
};
