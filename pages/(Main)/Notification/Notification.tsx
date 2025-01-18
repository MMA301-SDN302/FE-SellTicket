import { useMemo, useState } from "react";
import { ScrollView, View, Text } from "react-native";
import { PreviewLayout } from "../../../components/PreviewLayout/PreviewLayout";
import { styles } from "./NotificationStyle";
import {
  NotificationDetail,
  type NotificationProps,
} from "../../../components/NotificationDetail/NotificationDetail";
export const Notification = () => {
  const [direction, setDirection] = useState("ALL");
  const notifications: NotificationProps[] = [
    {
      id: "1",
      mess: "Your bus ticket has been confirmed.",
      time: new Date("2025-01-18T14:00:00"),
      unRead: true,
    },
    {
      id: "2",
      mess: "Special promotion: 20% off on your next ticket!",
      time: new Date("2025-01-18T10:00:00"),
      unRead: true,
    },
    {
      id: "3",
      mess: "Your bus will depart in 1 hour.",
      time: new Date("2025-01-17T12:00:00"),
      unRead: false,
    },
  ];

  const filteredNotification = useMemo(() => {
    if (direction == "ALL") {
      return notifications;
    } else {
      return notifications.filter((noti) => {
        return noti.unRead;
      });
    }
  }, [direction]);

  return (
    <PreviewLayout
      label="Notification"
      selectedValue={direction}
      values={["ALL", "UNREAD"]}
      setSelectedValue={setDirection}
    >
      <ScrollView style={styles.container}>
        <View style={styles.containerView}>
          {filteredNotification.length === 0 ? (
            <Text style={styles.textNoDisplay}>No new promotions</Text>
          ) : (
            filteredNotification.map((notification) => (
              <View key={notification.id} style={styles.containerView}>
                <NotificationDetail
                  unRead={notification.unRead}
                  mess={notification.mess}
                  time={notification.time}
                />
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </PreviewLayout>
  );
};
