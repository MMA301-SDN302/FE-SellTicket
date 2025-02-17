import { TouchableOpacity, View, Image, Text, Button } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import type { StackNavigationProp } from "@react-navigation/stack";

import type { RootStackParamList } from "../../types/NavigationTypes";
import { styles } from "./HeaderStyle";
import { AsyncStorageLocal } from "../../utils/AsyncStorageLocal";

const BackgroundImg = require("../../assets/HeaderBG.png");
const Logo = require("../../assets/logo.png");

type HeaderProps = {
  back?: boolean;
  goHome?: boolean;
};

export const Header = ({ back, goHome }: HeaderProps) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [isPerson, setIsPerson] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const user = await AsyncStorageLocal.get("user");
      setIsPerson(user !== null);
    };
    checkUser();
  }, []);

  return (
    <View style={styles.headerContainer}>
      <Image source={BackgroundImg} style={styles.drawerContent} />
      <View style={styles.container}>
        {back ? (
          <Ionicons
            onPress={() => navigation.goBack()}
            name="arrow-back"
            size={30}
            color={"#0c1440"}
          />
        ) : goHome ? (
          <Ionicons
            onPress={() => {
              navigation.reset({ index: 0, routes: [{ name: "HomeStack" }] });
            }}
            name="home-outline"
            size={30}
            color={"#0c1440"}
          />
        ) : isPerson ? (
          <View style={styles.welcomeText}>
            <Text style={styles.welcomeTitle}>Welcome</Text>
            <Text
              style={styles.userName}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              Thanh Thủy
            </Text>
          </View>
        ) : (
          <View style={styles.welcomeText}>
            <Button
              title="Sign In"
              onPress={() => navigation.navigate("SignIn")}
            />
          </View>
        )}
        <TouchableOpacity onPress={() => navigation.navigate("HomeStack")}>
          <Image style={styles.logoStyle} source={Logo} />
        </TouchableOpacity>
        <View style={styles.iconContainer}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(isPerson ? "Notification" : "SignIn")
            }
          >
            <Ionicons
              name="notifications-outline"
              size={30}
              color={"#0c1440"}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate(isPerson ? "Chat" : "SignIn")}
          >
            <Ionicons name="chatbubble-outline" size={30} color={"#0c1440"} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
