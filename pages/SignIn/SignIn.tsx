import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import type { StackNavigationProp } from "@react-navigation/stack";

import { styles } from "./SignInStyle";
import type { RootStackParamList } from "../../types/NavigationTypes";
import { CheckUserAccount, ValidateEmail, ValidatePassword } from "../../utils";

const SignInImg = require("../../assets/SignIn.png");

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
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const CheckAccount = () => {
    setErrorEmail("");
    setErrorPassword("");
    if (CheckUserAccount(email, password)) {
      console.log("Login success");

      return;
    } else {
      setErrorEmail(ValidateEmail(email));
      setErrorPassword(ValidatePassword(password));
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
              You are just one step away
            </Text>
          </View>

          <>
            {/* Email */}
            <View style={styles.textInputContainer}>
              <MaterialCommunityIcons name="email" size={24} color="green" />
              <TextInput
                style={{ width: "100%", height: "100%", borderColor: "gray" }}
                placeholder="Input email"
                selectionColor={"gray"}
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                }}
              />
            </View>
            <Text style={styles.textError}>{errorEmail}</Text>
            {/* Password */}
            <View style={styles.textInputContainer}>
              <Ionicons name="key" size={24} color="green" />
              <TextInput
                style={{ width: 220, height: "100%", borderColor: "gray" }}
                placeholder="Input password"
                selectionColor={"gray"}
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                }}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                style={{ marginRight: 10 }}
                onPress={() => {
                  setShowPassword(!showPassword);
                }}
              >
                <Ionicons
                  name={showPassword ? "eye" : "eye-off"}
                  size={24}
                  color="green"
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.textError}>{errorPassword}</Text>
            {/* Extend */}

            <View style={styles.textRememberMe}>
              <TouchableOpacity
                onPress={() => {
                  setRemember(!remember);
                }}
              >
                <Ionicons
                  name={remember ? "checkbox-outline" : "square-outline"}
                  size={24}
                  color="green"
                />
              </TouchableOpacity>
              <Text style={{ color: "gray" }}>Remember me?</Text>
            </View>

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
