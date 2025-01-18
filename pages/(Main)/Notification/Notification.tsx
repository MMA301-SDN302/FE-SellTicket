import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const Notification = () => {
  return (
    <View style={{ width: "100%" }}>
      <Ionicons name="notifications-circle" size={40} color={"green"} />
    </View>
  );
};
