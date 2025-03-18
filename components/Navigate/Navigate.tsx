import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Alert } from "react-native";
import { rootStackRoutes } from "../../types/NavigationTypes";
import { RootStackParamList } from "../../types/NavigationTypes";

// Định nghĩa kiểu NavigationProp từ RootStackParamList
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Lấy key từ RootStackParamList và tạo AvailableRoutes
type AvailableRoutes = keyof RootStackParamList;

const useNavigate = () => {
  const navigation = useNavigation<NavigationProp>();

  /**
   * Navigate to a target screen with parameters.
   * @param {AvailableRoutes} target - The name of the screen to navigate to.
   * @param {object} params - The parameters to pass to the target screen.
   */
  const navigateTo = (target: AvailableRoutes, params = {}) => {
    try {
      if (!rootStackRoutes.includes(target)) {
        throw new Error(`Invalid route: ${target}`);
      }

      navigation.navigate(target, params);
    } catch (error) {
      Alert.alert(
        "Lỗi Điều Hướng", // Tiêu đề
        "Không thể điều hướng tới trang đích. Vui lòng kiểm tra lại hoặc thử lại sau.", // Nội dung thông báo
        [{ text: "OK" }] // Nút OK
      );
    }
  };

  const goBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      Alert.alert("Thông báo", "Không thể quay lại màn hình trước.");
    }
  };

  return { 
    navigateTo,
    goBack 
  };
};

export default useNavigate;