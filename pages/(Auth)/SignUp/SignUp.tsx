import React, { useState } from "react";
import { View, Image, Text, Button, SafeAreaView, Alert } from "react-native";

import { styles } from "./SignUpStyle";
import TextInputCommon from "../../../components/Common/TextInput/TextInputCommon";

import { Props, SignUpRequest, SignUpResponse } from "./Types";
import FormArea from "../../../components/Common/Form/FormArea";
import useApi from "../../../hooks/useApi";
import { ApiConstant } from "../../../data/ApiConstant";
import { ErrorResponse } from "../../../types/ApiTypes";
import ERROR_CODES from "../../../data/ErrorCode";
import useToast from "../../../hooks/useToast";

const SignUpImg = require("../../../assets/Auth.png");

export const SignUp: React.FC<Props> = ({ navigation }) => {
  const { showToast } = useToast();
  const { fetchData } = useApi<SignUpResponse>({
    method: "POST",
    url: ApiConstant.Register,
  });
  const [data, setData] = useState<SignUpRequest>({
    firstName: "",
    lastName: "",
    mobilePhone: "",
    password: "",
    sex: "Male",
  });
  const handleSignUp = async (formData: SignUpRequest) => {
    console.log("formData", formData);

    await fetchData(formData)
      .then((res) => {
        navigation.navigate("OtpVerify", {
          mobilePhone: res.phone_number,
        });
      })
      .catch((err: ErrorResponse) => {
        if (err.error_code === ERROR_CODES.MISSING_FIELD) {
          showToast({
            type: "error",
            message: "Đăng ký thất bại",
            description: "Vui lòng điền đầy đủ thông tin",
          });
        }
        if (err.error_code === ERROR_CODES.INVALID_PHONE_NUMBER) {
          showToast({
            type: "error",
            message: "Đăng ký thất bại",
            description: "Số điện thoại không hợp lệ",
          });
        }
        if (err.error_code === ERROR_CODES.DUPLICATE_ENTRY) {
          showToast({
            type: "error",
            message: "Đăng ký thất bại",
            description: "Số điện thoại đã tồn tại",
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
              Welcome
            </Text>
            <Text style={{ color: "#A0A0A0", fontWeight: 400, fontSize: 18 }}>
              Đăng ký tài khoản để bắt đầu
            </Text>
          </View>

          <FormArea
            buttonTitle="Đăng Ký"
            initialValues={data}
            onSubmit={handleSignUp}
          >
            {/* UserName */}
            <TextInputCommon
              type={"text"}
              errorName="Họ"
              fieldName="firstName"
              placeholder="Nhập Họ của bạn"
              required
            />
            <TextInputCommon
              type={"text"}
              errorName="Tên"
              fieldName="lastName"
              placeholder="Nhập Tên của bạn"
              required
            />
            {/* Email */}
            <TextInputCommon
              type={"phone"}
              errorName="Số Điện Thoại"
              fieldName="mobilePhone"
              pattern={/(84|0[3|5|7|8|9])+([0-9]{8})\b/}
              patternMess="Số điện thoại không hợp lệ"
              required
            />

            {/* Password */}
            <TextInputCommon
              type={"password"}
              errorName="Mật Khẩu"
              fieldName="password"
              minLength={8}
              required
            />
            <TextInputCommon
              type={"checkbox"}
              fieldName="sex"
              checkBoxOptions={{
                type: "single",
                labels: [
                  {
                    title: "Nam",
                    value: "Male",
                  },
                  {
                    title: "Nữ",
                    value: "Female",
                  },
                  {
                    title: "Khác",
                    value: "Other",
                  },
                ],
                defaultValue: ["Male"],
              }}
            />

            {/* Extend */}
          </FormArea>

          <View style={styles.buttonContinue}>
            <Text>
              Bằng cách nhấn vào Đăng Ký, bạn đồng ý với{" "}
              <Text style={{ color: "red", textDecorationLine: "underline" }}>
                Chính Sách Bảo Mật
              </Text>{" "}
              và {""}
              <Text style={{ color: "red", textDecorationLine: "underline" }}>
                Điều Khoản & Điều Kiện
              </Text>
              của ứng dụng
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
