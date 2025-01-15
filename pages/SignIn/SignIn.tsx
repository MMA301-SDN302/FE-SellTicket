import { useState } from "react";

import {
  View,
  Image,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { styles } from "./SignInStyle";
import React from "react";
import type { RootStackParamList } from "../../types/NavigationTypes";
import type { StackNavigationProp } from "@react-navigation/stack";

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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const CheckAccount = () => {
    if (email === "admin" && password === "admin") {
      console.log("Login success");
    } else {
      alert("Login failed");
    }
  };

  return (
    <View
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
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
          <View style={styles.textForgotContainer}>
            <Text
              style={{
                color: "gray",
                textDecorationColor: "gray",
                fontStyle: "italic",
              }}
              onPress={() => {
                console.log("Forgot password?");
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

        <View style={styles.buttonContinue}>
          <Button title="Continue" color="green" onPress={CheckAccount} />
          <Text>
            By Clicking on Continue, you are agree to{" "}
            <Text style={{ color: "red", textDecorationLine: "underline" }}>
              Privacy Policy{" "}
            </Text>{" "}
            <Text style={{ color: "red", textDecorationLine: "underline" }}>
              Terms & Conditions{" "}
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
};
