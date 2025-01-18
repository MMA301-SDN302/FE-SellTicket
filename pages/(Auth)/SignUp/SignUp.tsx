import React, { useEffect, useState } from "react";
import { View, Image, Text, Button, SafeAreaView, Alert } from "react-native";
import type { StackNavigationProp } from "@react-navigation/stack";

import type { RootStackParamList } from "../../../types/NavigationTypes";
import { styles } from "./SignUpStyle";
import TextInputCommon from "../../../components/TextInputCommon/TextInputCommon";
import {
  checkFormError,
  ValidateEmail,
  ValidatePassword,
  ValidateUserName,
} from "../../../utils";

const SignUpImg = require("../../../assets/Auth.png");

type SignUpProp = StackNavigationProp<RootStackParamList, "SignUp">;

type Props = {
  navigation: SignUpProp;
};
export const SignUp: React.FC<Props> = ({ navigation }) => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showError, setShowError] = useState(false);
  const [isError, setIsError] = useState(true);

  const CheckAccount = () => {
    var formHasError = checkFormError([
      ValidateEmail(email),
      ValidateUserName(userName),
      ValidatePassword(password),
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
              Welcome
            </Text>
            <Text style={{ color: "#A0A0A0", fontWeight: 400, fontSize: 18 }}>
              Signup to get started
            </Text>
          </View>

          <>
            {/* UserName */}
            <TextInputCommon
              type={"name"}
              value={userName}
              setValue={setUserName}
              showError={showError}
            />

            {/* Email */}
            <TextInputCommon
              type={"email"}
              value={email}
              setValue={setEmail}
              showError={showError}
            />
            {/* Password */}
            <TextInputCommon
              type={"password"}
              value={password}
              setValue={setPassword}
              showError={showError}
            />
            {/* Extend */}
            <View style={styles.textForgotContainer}>
              <Text
                style={{ color: "#4D5995", textDecorationLine: "underline" }}
                onPress={() => {
                  navigation.reset({ index: 0, routes: [{ name: "SignIn" }] });
                }}
              >
                SignIn
              </Text>
            </View>
          </>

          <View style={styles.buttonContinue}>
            <Button title="Send OTP" color="#4D5995" onPress={CheckAccount} />
            <Text>
              By Clicking on Continue, you are agree to{" "}
              <Text style={{ color: "red", textDecorationLine: "underline" }}>
                Privacy Policy
              </Text>{" "}
              and {""}
              <Text style={{ color: "red", textDecorationLine: "underline" }}>
                Terms & Conditions
              </Text>
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
