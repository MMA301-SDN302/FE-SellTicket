import { useState } from "react";

import {
  View,
  Image,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";

import React from "react";
import type { RootStackParamList } from "../../types/NavigationTypes";
import type { StackNavigationProp } from "@react-navigation/stack";
import { styles } from "./SignUpStyle";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
const SignInImg = require("../../assets/SignIn.png");

type SignUpProp = StackNavigationProp<RootStackParamList, "SignUp">;

type Props = {
  navigation: SignUpProp;
};
export const SignUp: React.FC<Props> = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
            <Ionicons name="person-sharp" size={24} color="green" />
            <TextInput
              style={{ width: "100%", height: "100%", borderColor: "gray" }}
              placeholder="Input your name"
              selectionColor={"gray"}
              value={userName}
              onChangeText={(text) => {
                setUserName(text);
              }}
            />
          </View>
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
              style={{ color: "green", textDecorationLine: "underline" }}
              onPress={() => {
                navigation.navigate("SignIn");
              }}
            >
              SignIn
            </Text>
          </View>
        </>

        <View style={styles.buttonContinue}>
          <Button title="Send OTP" color="green" />
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
  );
};
