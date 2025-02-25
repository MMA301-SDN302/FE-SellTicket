import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { styles } from "./SignInStyle";
import TextInputCommon from "../../../components/Common/TextInput/TextInputCommon";
import FormArea from "../../../components/Common/Form/FormArea";
import { FormValues, LoginResponse, Props } from "./Types";
import useApi from "../../../hooks/useApi";
import { ErrorResponse } from "../../../types/ApiTypes";
import { ApiConstant } from "../../../data/ApiConstant";
import { useAuth } from "../../../hooks/useAuth";
import useToast from "../../../hooks/useToast";
import ERROR_CODES from "../../../data/ErrorCode";
import { AsyncStorageLocal } from "../../../utils/AsyncStorageLocal";
const SignInImg = require("../../../assets/Auth.png");

export const SignIn: React.FC<Props> = ({ navigation }: Props) => {
  const [remember, setRemember] = useState(false);
  const [formValues, setFormValues] = useState<FormValues>({
    phoneNumber: "",
    password: "",
  });
  const { fetchData } = useApi<LoginResponse>({
    method: "POST",
    url: ApiConstant.Login,
  });
  const { saveUser } = useAuth();
  const { showToast } = useToast();

  useEffect(() => {
    AsyncStorageLocal.get("account").then((res) => {
      if (res) {
        setFormValues(JSON.parse(res));
      }
    });
  }, []);

  const CheckAccount = async (formdata: FormValues) => {
    setFormValues(formdata);
    await fetchData(formdata)
      .then((res) => {
        if (remember) {
          AsyncStorageLocal.set("account", JSON.stringify(formdata));
        } else {
          AsyncStorageLocal.remove("account");
        }
        saveUser(res);
        navigation.pop();
      })
      .catch((err: ErrorResponse) => {
        if (err.error_code === ERROR_CODES.MISSING_FIELD) {
          showToast({
            type: "error",
            message: "Thất bại",
            description: "Vui lòng nhập đầy đủ thông tin",
          });
        } else if (err.error_code === ERROR_CODES.INVALID_CREDENTIALS) {
          showToast({
            type: "error",
            message: "Thất bại",
            description: "Số điện thoại hoặc mật khẩu không đúng",
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
              }}
            >
              Welcome
            </Text>
            <Text
              style={{ color: "#A0A0A0", fontWeight: 400, fontSize: 18 }}
            ></Text>
          </View>
          <FormArea
            initialValues={formValues}
            onSubmit={CheckAccount}
            buttonTitle="Sign In"
          >
            <TextInputCommon
              type={"phone"}
              errorName="Số Điện Thoại"
              fieldName="phoneNumber"
              pattern={/(84|0[3|5|7|8|9])+([0-9]{8})\b/}
              patternMess="Số điện thoại không hợp lệ"
              required
            />

            {/* Password */}
            <TextInputCommon
              type={"password"}
              fieldName="password"
              errorName="Mật Khẩu"
              minLength={8}
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
              <Text style={{ color: "gray" }}>Remember me?</Text>
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
              Forgot password?
            </Text>
            <Text
              style={{ color: "#4D5995", textDecorationLine: "underline" }}
              onPress={() => {
                navigation.navigate("SignUp");
              }}
            >
              SignUp
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
