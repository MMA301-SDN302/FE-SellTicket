import { Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Toast, { ToastConfig } from "react-native-toast-message";
import { StyleType, ToastMessageProps, ToastType } from "./Types";

const ToastMessage = () => {
  const toastConfig: ToastConfig = {
    success: ({ text1, text2, ...rest }) => (
      <ToastBasic
        message={text1}
        description={text2}
        params={rest}
        type="success"
      />
    ),
    error: ({ text1, text2, ...rest }) => (
      <ToastBasic
        message={text1}
        description={text2}
        params={rest}
        type="error"
      />
    ),
    info: ({ text1, text2, ...rest }) => (
      <ToastBasic
        message={text1}
        description={text2}
        params={rest}
        type="info"
      />
    ),
  };

  return <Toast config={toastConfig} topOffset={100} />;
};

const ToastBasic = ({
  message,
  description,
  params,
  type,
}: ToastMessageProps) => {
  const backgroundColorType: Record<ToastType, StyleType> = {
    success: {
      backgroundColor: "#2F1389",
      iconColor: "#E4B823",
      textColor: "#fff",
      icon: "sparkles-outline",
      descriptionColor: "#fff",
    },
    error: {
      backgroundColor: "#FB6323",
      iconColor: "#fff",
      textColor: "#2F1389",
      icon: "sad-sharp",
      descriptionColor: "#fff",
    },
    info: {
      backgroundColor: "#BBD38B",
      iconColor: "#777D71",
      textColor: "#666",
      icon: "navigate-outline",
      descriptionColor: "#000",
    },
  };
  return (
    <View
      style={{
        height: 120,
        width: "100%",
        backgroundColor: backgroundColorType[type].backgroundColor,
        padding: 10,
        borderRadius: 5,
      }}
    >
      <View
        style={{ flexDirection: "row", alignItems: "center", height: "100%" }}
      >
        <Ionicons
          name={backgroundColorType[type].icon as any}
          size={66}
          style={{
            paddingLeft: 10,
            color: backgroundColorType[type].iconColor,
            marginLeft: 30,
            marginRight: 15,
          }}
        />
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            padding: 10,
          }}
        >
          <Text
            style={{
              color: backgroundColorType[type].textColor,
              fontSize: 24,
              fontWeight: "900",
              textDecorationLine: "underline",
              paddingLeft: 10,
              width: "100%",
              marginBottom: 5,
            }}
          >
            {message}
          </Text>
          <Text
            style={{
              color: backgroundColorType[type].descriptionColor,
              fontSize: 16,
              paddingLeft: 10,
              paddingRight: 10,
              fontStyle: "italic",
            }}
          >
            {description}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ToastMessage;
