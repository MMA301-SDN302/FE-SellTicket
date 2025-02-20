import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { styles } from "./SignInStyle";
import TextInputCommon from "../../../components/Common/TextInput/TextInputCommon";
import FormArea from "../../../components/Common/Form/FormArea";
import { FormValues, LoginResponse, Props } from "./Types";
import useApi from "../../../hooks/useApi";
import { ErrorResponse } from "../../../types/ApiTypes";
import { useAuth } from "../../../hooks/useAuth";
import ERROR_CODES from "../../../data/ErrorCode";
import useToast from "../../../hooks/useToast";
const SignInImg = require("../../../assets/Auth.png");

export const SignIn: React.FC<Props> = ({ navigation }: Props) => {
  const [remember, setRemember] = useState(false);
  const { saveUser } = useAuth();
  const { fetchData } = useApi<LoginResponse>({
    method: "POST",
    url: "/auth/login",
  });
  const { showToast } = useToast();

  const handleSignUp = async (formdata: FormValues) => {
    await fetchData(formdata)
      .then((res) => {
        saveUser({
          token: res.token,
          user: res.user,
        });
        navigation.navigate("HomeStack");
      })
      .catch((err: ErrorResponse) => {
        if (err.error_code === ERROR_CODES.MISSING_FIELD) {
          showToast({
            type: "error",
            message: "Đăng Nhập Thất Bại",
            description: "Vui lòng điền đầy đủ thông tin",
          });
        } else if (err.error_code === ERROR_CODES.INVALID_CREDENTIALS) {
          showToast({
            type: "error",
            message: "Đăng Nhập Thất Bại",
            description: "Số điện thoại hoặc mật khẩu không chính xác",
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
        <Image style={styles.imageSignIn} source={SignInImg} />
        <View style={styles.signInContainer}>
          <View style={styles.titleWelcome}>
            <Text
              style={{
                color: "#000000",
                fontWeight: 500,
                fontSize: 32,
                marginTop: 32,
              }}
            >
              Welcome
            </Text>
            <Text
              style={{ color: "#A0A0A0", fontWeight: 400, fontSize: 18 }}
            ></Text>
          </View>
          <FormArea
            initialValues={{
              phoneNumber: "",
              password: "",
            }}
            onSubmit={handleSignUp}
            buttonTitle="Đăng nhập"
            titleStyle={styles.buttonContinue}
          >
            <TextInputCommon
              type={"phone"}
              fieldName="phoneNumber"
              errorName="Phone Number"
              required={true}
            />

            {/* Password */}
            <TextInputCommon
              type={"password"}
              fieldName="password"
              errorName="Password"
              required={true}
            />

            {/* Extend */}

            <TouchableOpacity
              onPress={() => {
                setRemember(!remember);
              }}
              style={styles.textRememberMe}
            >
              <Ionicons
                name={remember ? "checkbox-outline" : "square-outline"}
                size={24}
                color="#4D5995"
              />
              <Text style={{ color: "gray" }}>Ghi nhớ ?</Text>
            </TouchableOpacity>
          </FormArea>
          <View style={styles.textForgotContainer}>
            <Text
              style={{
                color: "gray",
                textDecorationColor: "gray",
                fontStyle: "italic",
              }}
              onPress={() => {
                navigation.navigate("ForgotPassword");
              }}
            >
              Quên Mật Khẩu?
            </Text>
            <Text
              style={{ color: "#4D5995", textDecorationLine: "underline" }}
              onPress={() => {
                navigation.navigate("SignUp");
              }}
            >
              Đăng Ký
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
