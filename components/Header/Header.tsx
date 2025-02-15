import { TouchableOpacity, View, Image, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import type { StackNavigationProp } from "@react-navigation/stack";

import type { RootStackParamList } from "../../types/NavigationTypes";
import { styles } from "./HeaderStyle";

const BackgroundImg = require("../../assets/HeaderBG.png");
const Person = require("../../assets/favicon.png");
const Logo = require("../../assets/logo.png");

type headerProps = {
  back?: boolean;
  goHome?: boolean;
};
export const Header = ({ back, goHome }: headerProps) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [isPerson, setIsPerson] = useState(false);
  return (
    <View style={styles.headerContainer}>
      <Image source={BackgroundImg} style={styles.drawerContent} />
      <View style={styles.container}>
        {back ? (
          <Ionicons
            onPress={() => {
              navigation.goBack();
            }}
            name="arrow-back"
            size={30}
            color={"#0c1440"}
          />
        ) : goHome ? (
          <Ionicons
            onPress={() => {
              navigation.reset({
                index: 0,
                routes: [{ name: "Home" }],
              });
            }}
            name="home-outline"
            size={30}
            color={"#0c1440"}
          />
        ) : (
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
        )}
        <TouchableOpacity
          onPress={() => {
            navigation.reset({
              index: 0,
              routes: [{ name: "Home" }],
            });
          }}
        >
          <Image style={styles.logoStyle} source={Logo} />
        </TouchableOpacity>
        <View style={styles.iconContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Notification");
            }}
          >
            <Ionicons
              name="notifications-outline"
              size={30}
              color={"#0c1440"}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Chat");
            }}
          >
            <Ionicons name="chatbubble-outline" size={30} color={"#0c1440"} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
