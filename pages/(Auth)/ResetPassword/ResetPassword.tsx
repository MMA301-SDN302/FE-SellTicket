import { View, Text, Image } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { styles } from "./ResetPasswordStyle";
import TextInputCommon from "../../../components/Common/TextInput/TextInputCommon";

import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../types/NavigationTypes";
import FormArea from "../../../components/Common/Form/FormArea";
import { RouteProp } from "@react-navigation/native";
import useApi from "../../../hooks/useApi";
import { ApiConstant } from "../../../data/ApiConstant";
import { ErrorResponse } from "../../../types/ApiTypes";
import useToast from "../../../hooks/useToast";
import ERROR_CODES from "../../../data/ErrorCode";
type ResetPasswordProp = StackNavigationProp<
  RootStackParamList,
  "ResetPassword"
>;
type RouteProps = RouteProp<RootStackParamList, "ResetPassword">;
type Props = {
  navigation: ResetPasswordProp;
  route: RouteProps;
};

const ResetPassword = ({ navigation, route }: Props) => {
  const { mobilePhone, userId } = route.params;
  const { showToast } = useToast();
  const { fetchData } = useApi<any>({
    method: "POST",
    url: ApiConstant.ResetPassword,
  });
  const handleResetPassword = (value: any) => {
    if (value.password === value.confirmPassword) {
      fetchData({
        userId: userId,
        mobilePhone: mobilePhone,
        password: value.password,
      })
        .then((res) => {
          navigation.reset({
            index: 1,
            routes: [{ name: "SignIn" }],
            
          });
        })
        .catch((error: ErrorResponse) => {
          if (error.error_code === ERROR_CODES.MISSING_FIELD) {
            showToast({
              type: "error",
              message: "Thất Bại",
              description: "Vui lòng nhập đầy đủ thông tin",
            });
          } else if (error.error_code === ERROR_CODES.INVALID_PHONE_NUMBER) {
            showToast({
              type: "error",
              message: "Thất Bại",
              description: "Số điện thoại không hợp lệ",
            });
          } else {
            showToast({
              type: "error",
              message: "Thất Bại",
              description: "Đặt lại mật khẩu không thành công",
            });
          }
        });
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.centeredView}>
        <View style={styles.modalView}>
          <Image
            style={styles.imageSignUp}
            source={require("../../../assets/Auth.png")}
          />
          <View style={styles.header}>
            <Text style={styles.modalText}>ĐẶT LẠI MẬT KHẨU</Text>
          </View>
          <FormArea
            initialValues={{ password: "", confirmPassword: "" }}
            onSubmit={handleResetPassword}
            buttonTitle="Đặt lại mật khẩu"
          >
            <TextInputCommon
              type={"password"}
              placeholder="Nhập mật khẩu mới"
              errorName="Mật Khẩu mới"
              required={true}
              minLength={8}
              fieldName={"password"}
            />
            {/* Password */}
            <TextInputCommon
              type={"password"}
              errorName="Mật Khẩu mới"
              placeholder="Nhập lại Mật khẩu mới"
              required={true}
              minLength={8}
              isMatch="password"
              fieldName={"confirmPassword"}
            />
          </FormArea>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default ResetPassword;
