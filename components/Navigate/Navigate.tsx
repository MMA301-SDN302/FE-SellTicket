import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Alert } from "react-native";
import { RootStackParamList } from "../../types/NavigationTypes";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const useNavigate = () => {
  const navigation = useNavigation<NavigationProp>();

  /**
   * Navigate to a target screen with parameters.
   * @param {keyof RootStackParamList} target - The name of the screen to navigate to.
   * @param {object} params - The parameters to pass to the target screen.
   */
  const navigateTo = <T extends keyof RootStackParamList>(
    target: T,
    params: RootStackParamList[T] = {} as RootStackParamList[T]
  ) => {
    try {
      if (!(target in ({} as RootStackParamList))) {
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

  return { navigateTo };
};

export default useNavigate;
