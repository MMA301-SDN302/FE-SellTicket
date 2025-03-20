import { ToastConfigParams } from "react-native-toast-message";

export type ToastMessageProps = {
  message: string | undefined;
  description: string | undefined;
  params: ToastConfigParams<any>;
  type: ToastType;
};

export type ToastMessageConfig = {
  success: string | undefined;
};
// Định nghĩa kiểu dữ liệu cho các loại toast
export type ToastType = "success" | "error" | "info";

export type StyleType = {
  backgroundColor: string;
  iconColor: string;
  textColor: string;
  descriptionColor: string;
  icon: string;
};
