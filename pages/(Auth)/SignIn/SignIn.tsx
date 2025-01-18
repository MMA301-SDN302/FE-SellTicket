import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  Button,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import type { StackNavigationProp } from "@react-navigation/stack";

import { styles } from "./SignInStyle";
import type { RootStackParamList } from "../../../types/NavigationTypes";
import { CheckUserAccount } from "../../../utils";
import { AsyncStorageLocal } from "../../../utils/AsyncStorageLocal";
import TextInputCommon from "../../../components/TextInputCommon/TextInputCommon";

const SignInImg = require("../../../assets/Auth.png");

export interface AccountProps {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  password: string;
}
type SignInProp = StackNavigationProp<RootStackParamList, "SignIn">;

type Props = {
  navigation: SignInProp;
};

export const SignIn: React.FC<Props> = ({ navigation }: Props) => {
  const [remember, setRemember] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);

  const CheckAccount = () => {
    if (CheckUserAccount(email, password)) {
      AsyncStorageLocal.set("user", email);
      navigation.navigate("Home");
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
            <Text style={{ color: "#A0A0A0", fontWeight: 400, fontSize: 18 }}>
              Login to book ticket
            </Text>
          </View>

          <>
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

            <TouchableOpacity
              onPress={() => {
                setRemember(!remember);
              }}
              style={styles.textRememberMe}
            >
              <Ionicons
                name={remember ? "checkbox-outline" : "square-outline"}
                size={24}
                color="green"
              />
              <Text style={{ color: "gray" }}>Remember me?</Text>
            </TouchableOpacity>

            <View style={styles.buttonContinue}>
              <Button title="Sign In" color="green" onPress={CheckAccount} />
            </View>
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
                style={{ color: "green", textDecorationLine: "underline" }}
                onPress={() => {
                  navigation.navigate("SignUp");
                }}
              >
                SignUp
              </Text>
            </View>
          </>
        </View>
      </View>
    </SafeAreaView>
  );
};
