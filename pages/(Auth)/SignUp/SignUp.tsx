import React, { useEffect, useState } from "react";
import { View, Image, Text, Button, SafeAreaView, Alert } from "react-native";
import type { StackNavigationProp } from "@react-navigation/stack";

import type { RootStackParamList } from "../../../types/NavigationTypes";
import { styles } from "./SignUpStyle";
import TextInputCommon from "../../../components/Common/TextInput/TextInputCommon";
import {
  checkFormError,
  ValidatePassword,
  ValidateUserName,
  validateVietnamesePhoneNumber,
} from "../../../utils";
import { InputValue } from "../../../components/Common/TextInput/InputType/type";
import FormArea from "../../../components/Common/Form/FormArea";

const SignUpImg = require("../../../assets/Auth.png");

type SignUpProp = StackNavigationProp<RootStackParamList, "SignUp">;

type Props = {
  navigation: SignUpProp;
};
export const SignUp: React.FC<Props> = ({ navigation }) => {
  const [firstName, setFirstName] = useState<InputValue>("");
  const [lastName, setLastName] = useState<InputValue>("");
  const [phone, setPhone] = useState<InputValue>("");
  const [password, setPassword] = useState<InputValue>("");
  const [showError, setShowError] = useState(false);
  const [isError, setIsError] = useState(true);

  const CheckAccount = () => {
    var formHasError = checkFormError([
      // ValidateUserName(firstName),
      // ValidateUserName(lastName),
      // validateVietnamesePhoneNumber(phone),
      // ValidatePassword(password),
    ]);
    if (formHasError) {
      setShowError(true);
    } else {
      Alert.alert("Sign up success");
      navigation.navigate("SignIn");
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
        <Image style={styles.imageSignUp} source={SignUpImg} />
        <View style={styles.signUpContainer}>
          <View style={styles.titleWelcome}>
            <Text
              style={{
                color: "#000000",
                fontWeight: 500,
                fontSize: 32,
              }}
            >
              Chào mừng
            </Text>
            <Text style={{ color: "#A0A0A0", fontWeight: 400, fontSize: 18 }}>
              Đăng ký để dùng ứng dụng
            </Text>
          </View>

          <FormArea
            initialValues={{ phone: "", password: "" }}
            onSubmit={CheckAccount}
            buttonTitle="Đăng ký"
            buttonStyle={styles.buttonContinue}
          >
            {/* UserName */}
            <TextInputCommon
              type={"text"}
              value={firstName}
              onChangeText={setFirstName}
              textTitle="Tên người dùng"
              placeholder="Nhập tên người dùng "
              fieldName={""}
              errorName={""}
            />

            {/* Phone */}
            <TextInputCommon
              type={"phone"}
              fieldName="phone"
              textTitle="Số điện thoại"
              errorName="Phone number"
              placeholder="Nhập số điện thoại"
              required={true}
            />

            {/* Password */}
            <TextInputCommon
              type={"password"}
              fieldName="password"
              textTitle="Mật khẩu"
              errorName="Password"
              placeholder="Nhập mật khẩu"
              required={true}
              minLength={6}
            />

            {/* Extend */}
            <View style={styles.textForgotContainer}>
              <Text
                style={{ color: "#4D5995", textDecorationLine: "underline" }}
                onPress={() => {
                  navigation.reset({ index: 0, routes: [{ name: "SignIn" }] });
                }}
              >
                Đăng nhập
              </Text>
            </View>
          </FormArea>

          <View style={styles.buttonContinue}>
            <Text>
              Bằng cách nhấp vào Tiếp tục, bạn đồng ý với{" "}
              <Text style={{ color: "red", textDecorationLine: "underline" }}>
                Chính sách bảo mật
              </Text>{" "}
              và {""}
              <Text style={{ color: "red", textDecorationLine: "underline" }}>
                Điều khoản & Điều kiện{" "}
              </Text>
              của ứng dụng
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
