// ButtonCommon.js
import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from "react-native";
import type { ButtonCommonProps } from "./ButtonType/type";
import { styles } from "./ButtonCommonStyle";

const ButtonCommon = ({
  title,
  onPress,
  isActive = true,
  textColor = "black",
  activeTextColor = "#fff",
  titleStyle = {},
  buttonStyle = {},
}: ButtonCommonProps) => {
  return (
    <TouchableOpacity
      style={[
        {
          marginTop: 2,
          paddingVertical: 12,
          paddingHorizontal: 20,
          width: "100%",
          borderRadius: 20,
          borderWidth: 1,
          borderColor: "gray",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: isActive ? "#4D5995" : "#fff",
        },
        buttonStyle,
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.buttonText,
          { color: isActive ? activeTextColor : textColor },
          titleStyle,
        ]}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default ButtonCommon;
