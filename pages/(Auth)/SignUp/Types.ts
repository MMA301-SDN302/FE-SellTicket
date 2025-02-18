import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../types/NavigationTypes";

export type SignUpProp = StackNavigationProp<RootStackParamList, "SignUp">;

export type Props = {
  navigation: SignUpProp;
};
export type SignUpRequest = {
  password: string;
  firstName: string;
  lastName: string;
  mobilePhone: string;
  sex: "Male" | "Female" | "Other";
};
export type SignUpResponse = {
  phone_number: string;
};
