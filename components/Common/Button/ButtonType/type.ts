import type { Button, StyleProp, TextStyle } from "react-native";

// ButtonType/type.ts
export interface ButtonCommonProps {
  title: string;
  onPress: () => void;
  isActive?: boolean;
  borderColor?: string;
  backgroundColor?: string | number;
  textColor?: string;
  activeBackgroundColor?: string;
  activeTextColor?: string;
  disabled?: boolean;
  titleStyle?: StyleProp<TextStyle>;
  buttonStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
}
