import { TouchableOpacity, View, Image, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import React from 'react';
import { NotificationBadge } from '../NotificationBadge/NotificationBadge';

import type { RootStackParamList } from "../../types/NavigationTypes";
import { styles } from "./HeaderStyle";
import ButtonCommon from "../Common/Button/ButtonCommon";
import { useAuth } from "../../hooks/useAuth";

const BackgroundImg = require("../../assets/HeaderBG.png");
const Logo = require("../../assets/logo.png");

type HeaderProps = {
  back?: boolean;
  goHome?: boolean;
};

type HeaderNavigationProp = StackNavigationProp<RootStackParamList>;

export const Header = ({ back, goHome }: HeaderProps) => {
  const navigation = useNavigation<HeaderNavigationProp>();
  const { userInfo } = useAuth();

  const handleNotificationPress = () => {
    navigation.navigate('Notification');
  };

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
        ) : userInfo != undefined ? (
          <View style={styles.welcomeText}>
            <Text style={styles.welcomeTitle}>Xin chào</Text>
            <Text
              style={styles.userName}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {userInfo.user.displayName}
            </Text>
          </View>
        ) : (
          <View style={styles.welcomeText}>
            <Text
              style={styles.userName}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              Ứng dụng
            </Text>
            <Text
              style={styles.welcomeTitle}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              Fast Ticket
            </Text>
          </View>
        )}

        <TouchableOpacity onPress={() => navigation.navigate("HomeStack")}>
          <Image style={styles.logoStyle} source={Logo} />
        </TouchableOpacity>
        {userInfo != undefined ? (
          <View style={styles.iconContainer}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={handleNotificationPress}
            >
              <Ionicons
                name="notifications-outline"
                size={24}
                color={"#0c1440"}
              />
              <NotificationBadge size={8} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
              <Ionicons name="chatbubbles-outline" size={24} color={"#0c1440"} />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.welcomeText}>
            <ButtonCommon
              title="SIGN IN"
              onPress={() => navigation.navigate("SignIn")}
              backgroundColor="#fff"
              borderColor="blue"
              activeTextColor="#fff"
            />
          </View>
        )}
      </View>
    </View>
  );
};
