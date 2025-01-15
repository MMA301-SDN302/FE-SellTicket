import {
  Button,
  SafeAreaView,
  View,
  Image,
  Text,
  TextInput,
} from "react-native";
import { useState } from "react";

import type { StackNavigationProp } from "@react-navigation/stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import type { RootStackParamList } from "../../types/NavigationTypes";
import { styles } from "./ForgotPasswordStyle";
import { CheckUserAccount } from "../../utils";

const SignInImg = require("../../assets/SignIn.png");

type ForgotPasswordProp = StackNavigationProp<
  RootStackParamList,
  "ForgotPassword"
>;
type Props = {
  navigation: ForgotPasswordProp;
};
const ForgotPassword = ({ navigation }: Props) => {
  const [email, setEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const CheckAccount = () => {
    setErrorEmail("");
    if (CheckUserAccount(email)) {
      console.log(" success");
      return;
    } else {
      setErrorEmail("Email is not exits");
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
            <View style={styles.buttonContinue}>
              <Button title="Send OTP" color="green" onPress={CheckAccount} />
            </View>
            <View style={styles.textForgotContainer}>
              <Text
                style={{ color: "green", textDecorationLine: "underline" }}
                onPress={() => {
                  navigation.reset({ index: 0, routes: [{ name: "SignIn" }] });
                }}
              >
                SignIn
              </Text>
            </View>
          </>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPassword;
