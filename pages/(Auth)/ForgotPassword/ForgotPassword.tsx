import { SafeAreaView, View, Image, Text } from "react-native";

import type { StackNavigationProp } from "@react-navigation/stack";

import type { RootStackParamList } from "../../../types/NavigationTypes";
import { styles } from "./ForgotPasswordStyle";
import TextInputCommon from "../../../components/Common/TextInput/TextInputCommon";
import FormArea from "../../../components/Common/Form/FormArea";
import useApi from "../../../hooks/useApi";
import { ApiConstant } from "../../../data/ApiConstant";
import useToast from "../../../hooks/useToast";
import ERROR_CODES from "../../../data/ErrorCode";

const ForgotPasswordImg = require("../../../assets/Auth.png");

type ForgotPasswordProp = StackNavigationProp<
  RootStackParamList,
  "ForgotPassword"
>;
type Props = {
  navigation: ForgotPasswordProp;
};
const ForgotPassword = ({ navigation }: Props) => {
  const { fetchData } = useApi({
    method: "POST",
    url: ApiConstant.ForgotPassword,
  });
  const { showToast } = useToast();

  const handleForgotPassword = async (values: any) => {
    await fetchData(values)
      .then(() => {
        navigation.navigate("OtpVerify", {
          mobilePhone: values.mobilePhone,
          sendType: "FORGET_PASSWORD",
        });
      })
      .catch((err) => {
        if (err.error_code === ERROR_CODES.MISSING_FIELD) {
          showToast({
            type: "error",
            message: "Không Thành Công!",
            description: "Vui lòng điền đầy đủ thông tin",
          });
        } else if (err.error_code === ERROR_CODES.INVALID_PHONE_NUMBER) {
          showToast({
            type: "error",
            message: "Không Thành Công!",
            description: "Số điện thoại không hợp lệ",
          });
        } else if (err.error_code === ERROR_CODES.INVALID_CREDENTIALS) {
          showToast({
            type: "error",
            message: "Không Thành Công!",
            description: "Số điện thoại chưa đăng ký",
          });
        }
      });
  };

  return (
    <SafeAreaView>
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        {/* Welcome */}
        <Image style={styles.imageForgotPassword} source={ForgotPasswordImg} />
        <View style={styles.forgotPasswordContainer}>
          <View style={styles.title}>
            <Text
              style={{
                color: "#000000",
                fontWeight: 500,
                fontSize: 32,
              }}
            >
              Quên mật khẩu
            </Text>
            <Text style={{ color: "#A0A0A0", fontWeight: 400, fontSize: 18 }}>
              Nhập Số điện thoại đăng ký
            </Text>
          </View>

          <>
            {/* Phone */}
            <FormArea
              buttonTitle="Gửi mã xác nhận"
              initialValues={{
                mobilePhone: "",
              }}
              onSubmit={handleForgotPassword}
            >
              <TextInputCommon
                type={"phone"}
                fieldName="mobilePhone"
                errorName="Số điện thoại"
                placeholder="Nhập số điện thoại"
                required={true}
                pattern={/(84|0[3|5|7|8|9])+([0-9]{8})\b/}
                patternMess="Số điện thoại không hợp lệ"
              />
            </FormArea>

            <View style={styles.textForgotContainer}>
              <Text
                style={{ color: "#4D5995", textDecorationLine: "underline" }}
                onPress={() => navigation.pop()}
              >
                Đăng nhập
              </Text>
            </View>
          </>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPassword;
