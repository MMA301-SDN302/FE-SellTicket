import Toast from "react-native-toast-message";
import { ToastType } from "../components/Common/ToastMessage/Types";

// Định nghĩa kiểu dữ liệu cho tham số của hàm toast
interface ToastParams {
  type: ToastType;
  message: string;
  description?: string;
  duration?: number;
}
type UseToastReturn = {
  showToast: (params: ToastParams) => void;
};

const useToast = (): UseToastReturn => {
  /**
   * Hiển thị toast message
   * @param {ToastParams} params - Tham số để hiển thị toast
   * @param {ToastType} params.type - Loại toast (success, error, info)
   * @param {string} params.message - Tin nhắn chính của toast
   * @param {string} [params.description] - Mô tả chi tiết (tùy chọn)
   * @param {number} [params.duration] - Thời gian hiển thị toast (tùy chọn, mặc định là 4000ms)
   */
  const showToast = (params: ToastParams): void => {
    const { type, message, description, duration = 4000 } = params;

    Toast.show({
      type,
      text1: message,
      text2: description,
      visibilityTime: duration,
      topOffset: 0,
    });
  };
  return { showToast };
};

// Xuất hàm để sử dụng ở các nơi khác
export default useToast;
