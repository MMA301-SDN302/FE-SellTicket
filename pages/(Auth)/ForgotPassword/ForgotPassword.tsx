import { Button, SafeAreaView, View, Image, Text } from "react-native";
import { useState } from "react";

import type { StackNavigationProp } from "@react-navigation/stack";

import type { RootStackParamList } from "../../../types/NavigationTypes";
import { styles } from "./ForgotPasswordStyle";
import { CheckUserAccount } from "../../../utils";
import TextInputCommon from "../../../components/Common/TextInput/TextInputCommon";
import ButtonCommon from "../../../components/Common/Button/ButtonCommon";

const ForgotPasswordImg = require("../../../assets/Auth.png");

type ForgotPasswordProp = StackNavigationProp<
  RootStackParamList,
  "ForgotPassword"
>;
type Props = {
  navigation: ForgotPasswordProp;
};
const ForgotPassword = ({ navigation }: Props) => {
  const [email, setEmail] = useState("");
  const [showError, setShowError] = useState(false);

  const CheckAccount = () => {
    if (CheckUserAccount(email)) {
      console.log(" success");
      navigation.navigate("SignIn");
      return;
    } else {
      setShowError(true);
    }
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
              Nhập email để xác thưuc
            </Text>
          </View>

          <>
            {/* Phone */}
            <TextInputCommon
              type={"phone"}
              fieldName="phone"
              errorName="Phone number"
              placeholder="Nhập số điện thoại"
              required={true}
            />
            <View style={styles.buttonContinue}>
              <ButtonCommon title={"Gửi mã xác thực"} onPress={() => {}} />
            </View>
            <View style={styles.textForgotContainer}>
              <Text
                style={{ color: "#4D5995", textDecorationLine: "underline" }}
                onPress={() => {
                  navigation.reset({
                    index: 0,
                    routes: [{ name: "SignIn" }],
                  });
                }}
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
