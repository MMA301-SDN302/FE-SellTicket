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
const SignInImg = require("../../../assets/Auth.png");

export const SignIn: React.FC<Props> = ({ navigation }: Props) => {
  const [remember, setRemember] = useState(false);
  const [formValues, setFormValues] = useState<FormValues>({
    phoneNumber: "",
    password: "",
  });
  const { fetchData } = useApi<LoginResponse>({
    method: "POST",
    url: "/auth/login",
  });

  const CheckAccount = async (formdata: FormValues) => {
    setFormValues(formdata);
    await fetchData(formdata)
      .then((res) => {
        console.log(res.user);
      })
      .catch((err: ErrorResponse) => {
        console.log(err);
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
            buttonStyle={styles.buttonContinue}
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
