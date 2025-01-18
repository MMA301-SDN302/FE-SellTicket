import { TouchableOpacity, View, Image } from "react-native";
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
            size={40}
            color={"green"}
          />
        ) : goHome ? (
          <Ionicons
            onPress={() => {
              navigation.navigate("Home");
            }}
            name="home-outline"
            size={40}
            color={"green"}
          />
        ) : (
          <Ionicons
            onPress={() => {
              navigation.navigate("MyTicket");
            }}
            name="ticket-outline"
            size={40}
            color={"green"}
          />
        )}
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          <Image style={styles.logoStyle} source={Logo} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Profile");
          }}
        >
          {isPerson ? (
            <Image source={Person} style={styles.avatarStyle} />
          ) : (
            <Ionicons name="person-circle" size={40} color={"green"} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};
