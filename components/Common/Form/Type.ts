import { ReactNode } from "react";
import { StyleProp, TextStyle } from "react-native";

export type FormAreaProps<T> = {
    children: ReactNode;
    onSubmit: (values: T) => void;
    initialValues: T;
    buttonTitle?: string;
    wrapStyle?: StyleProp<TextStyle>
    buttonStyle?: StyleProp<TextStyle>
    titleStyle?: StyleProp<TextStyle>
};
export type ErrorCondition = {
    required: boolean;
    minLength: number;
    maxLength: number;
    pattern: string;
    patternMess: string;
    errorName: string;
}
export type FormErrors<T> = {
    [K in keyof T]?: ErrorCondition; // Key là tên trường, value là thông báo lỗi
}