import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./NotificationDetailStyle";

export type NotificationProps = {
  id?: string;
  mess: string;
  time: Date;
  unRead: boolean;
};

export const NotificationDetail = (noti: NotificationProps) => (
  <View style={styles.container}>
    <View style={styles.box}>
      <View style={styles.icon}>
        <Ionicons name="bus" size={24} color="#2a3266" />
      </View>
      <View style={styles.detailMess}>
        <Text style={styles.mess}>{noti.mess}</Text>
        <Text style={styles.time}>{noti.time.getHours()} giờ trước</Text>
      </View>
      {noti.unRead && (
        <Ionicons
          name="ellipse"
          style={styles.statusIcon}
          color={"#007bff"}
          size={12}
        />
      )}
    </View>
  </View>
);
