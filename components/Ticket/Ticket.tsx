import { View, Text } from "react-native";
import { styles } from "./TicketStyle";
import { Ionicons } from "@expo/vector-icons";

export type TicketProps = {
  seatNO?: string[];
  ticketNo?: string;
  DepatureTime: Date;
  ArriveTime: Date;
  Depature: String;
  Arrive: String;
  Passenger?: String;
  Price?: string;
  status?: string;
  Quantity?: number;
};

export const Ticket = (ticket: TicketProps) => (
  <View style={styles.ticketContainer}>
    <View style={styles.header}>
      <Text style={styles.headerText}>Ticket Bus</Text>

      <View style={styles.priceBox}>
        {ticket.Price == undefined ? (
          <Text
            style={
              (styles.inforText,
              { right: 5, position: "absolute", bottom: -20 })
            }
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            Deposit
          </Text>
        ) : (
          <></>
        )}
        <View style={styles.price}>
          <Text style={styles.priceText} numberOfLines={1} ellipsizeMode="tail">
            {ticket.Price ?? " > 100,000 VND"}
          </Text>
        </View>
      </View>
    </View>
    <View style={styles.inforTicket}>
      <View style={styles.detailTicket}>
        <View style={styles.detailBox}>
          {ticket.seatNO && (
            <View style={{ width: "50%" }}>
              <Text
                style={styles.inforText}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                SEAT NO.
              </Text>
              <Text
                style={styles.detailText}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {ticket.seatNO}
              </Text>
            </View>
          )}
          {ticket.ticketNo && (
            <View style={{ width: "40%" }}>
              <Text
                style={styles.inforText}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                TICKET NO.
              </Text>
              <Text
                style={styles.detailText}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {ticket.ticketNo}
              </Text>
            </View>
          )}
        </View>
        <View style={styles.detailBox}>
          <View>
            <Text
              style={styles.inforText}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              Departure Time
            </Text>
            <Text
              style={styles.detailText}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {ticket.DepatureTime?.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
            <Text
              style={styles.dateText}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {ticket.DepatureTime?.toLocaleDateString([], {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
            </Text>
          </View>
          <View>
            <Text
              style={styles.inforText}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              Arrival Time
            </Text>
            <Text
              style={styles.detailText}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {ticket.ArriveTime?.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
            <Text
              style={styles.dateText}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {ticket.ArriveTime?.toLocaleDateString([], {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.location}>
        <View
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 5,
          }}
        >
          <Text
            style={styles.locationText}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {ticket.Depature}
          </Text>
          <View
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Ionicons name="bus" size={45} color={"#42509a"} />
            <Text style={{ color: "#3e5221", fontWeight: "500" }}>TO</Text>
          </View>
          <Text
            style={styles.locationText}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {ticket.Arrive}
          </Text>
        </View>
      </View>
    </View>
  </View>
);
