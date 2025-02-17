import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  Button,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import type { StackNavigationProp } from "@react-navigation/stack";
import { styles } from "./SignInStyle";
import type { RootStackParamList } from "../../../types/NavigationTypes";
import TextInputCommon from "../../../components/Common/TextInput/TextInputCommon";
import FormArea from "../../../components/Common/Form/FormArea";
import { CheckUserAccount } from "../../../utils";
import { AsyncStorageLocal } from "../../../utils/AsyncStorageLocal";

const SignInImg = require("../../../assets/Auth.png");

type SignInProp = StackNavigationProp<RootStackParamList, "SignIn">;

type Props = {
  navigation: SignInProp;
};
type FormValues = {
  phone: string;
  password: string;
};

export const SignIn: React.FC<Props> = ({ navigation }: Props) => {
  const [remember, setRemember] = useState(false);

  const CheckAccount = (formdata: FormValues) => {
    if (CheckUserAccount(formdata.phone, formdata.password)) {
      AsyncStorageLocal.set("user", formdata.phone);
      navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
      });
    } else {
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
            <Text
              style={{ color: "#A0A0A0", fontWeight: 400, fontSize: 18 }}
            ></Text>
          </View>
          <FormArea
            initialValues={{ phone: "", password: "" }}
            onSubmit={CheckAccount}
            buttonTitle="Sign In"
            buttonStyle={styles.buttonContinue}
          >
            <TextInputCommon
              type={"phone"}
              fieldName="phone"
              errorName="Phone number"
              required={true}
            />

            {/* Password */}
            <TextInputCommon
              type={"password"}
              fieldName="password"
              errorName="Password"
              required={true}
              minLength={6}
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
