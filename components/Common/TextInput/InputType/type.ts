import { Ionicons } from "@expo/vector-icons";
import {
  DimensionValue,
  StyleProp,
  TextInputProps,
  TextStyle,
} from "react-native";
import { PhoneInputProps } from "react-native-phone-number-input";

export type TypeTextInput =
  | "phone"
  | "email"
  | "text"
  | "password"
  | "date"
  | "search"
  | "checkbox"
  | null;

export type InputValue = Date | string | undefined;

export interface TextInputCommonProps {
  type: TypeTextInput;
  value?: InputValue;
  placeholder?: string;
  w?: DimensionValue;
  textTitle?: string;
  icon?: React.ComponentProps<typeof Ionicons>["name"];
  options?: TextInputProps | PhoneInputProps;
  style?: StyleProp<TextStyle>;
  error?: string;
  fieldName: string;
  errorName?: string;
  onChangeText?: (text: string | Array<string>) => void | undefined;
  required?: boolean;
  maxLength?: number;
  minLength?: number;
  pattern?: RegExp;
  patternMess?: string;
  checkBoxOptions?: CheckBoxOptions;
}

export type IInputTypeProps = {
  options?: TextInputProps;
  w?: DimensionValue;
  style?: StyleProp<TextStyle>;
  value: string | Date;
  title?: string;
  placeholder?: string;
  icon?: React.ComponentProps<typeof Ionicons>["name"];
  onChangeText?: (text: string | Array<string>) => void;
  checkBoxOptions?: CheckBoxOptions;
};

export type CheckBoxOptions = {
  type: "single" | "multiple";
  labels: Array<{
    title: string;
    value: string;
  }>;
  defaultValue: [string];
};
export type checkboxList = {
  title: string;
  value: string;
  checked: boolean;
};
