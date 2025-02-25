import { ReactNode } from "react";
import { StyleProp, TextStyle } from "react-native";
import { ErrorMessages } from "../../../hooks/useFormBasic";

export type FormAreaProps<T> = {
  children: ReactNode;
  onSubmit: (values: T) => void;
  initialValues: T;
  buttonTitle?: string;
  wrapStyle?: StyleProp<TextStyle>;
  titleStyle?: StyleProp<TextStyle>;
};
export type ErrorCondition = {
  required: boolean;
  minLength: number;
  maxLength: number;
  pattern: RegExp;
  patternMess: string;
  errorName: string;
  isMatch: string;
};
export type FormErrors<T> = {
  [K in keyof T]?: ErrorCondition; // Key là tên trường, value là thông báo lỗi
};
