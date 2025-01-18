import { TouchableOpacity, View, Image } from "react-native";
import { styles } from "./HeaderStyle";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { RootStackParamList } from "../../types/NavigationTypes";
import { useNavigation } from "@react-navigation/native";

const BackgroundImg = require("../../assets/HeaderBG.png");
const Person = require("../../assets/favicon.png");
const Logo = require("../../assets/logo.png");

export const Header = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [isPerson, setIsPerson] = useState(false);
  return (
    <View style={styles.headerContainer}>
      <Image source={BackgroundImg} style={styles.drawerContent} />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "90%",
          height: 100,
        }}
      >
        <Ionicons name="menu" size={40} color={"green"} />
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
