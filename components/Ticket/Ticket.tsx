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
          >
            Deposit
          </Text>
        ) : (
          <></>
        )}
        <View style={styles.price}>
          <Text style={styles.priceText}>
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
              <Text style={styles.inforText}>SEAT NO.</Text>
              <Text style={styles.detailText}>{ticket.seatNO}</Text>
            </View>
          )}
          {ticket.ticketNo && (
            <View style={{ width: "40%" }}>
              <Text style={styles.inforText}>TICKET NO.</Text>
              <Text style={styles.detailText}>{ticket.ticketNo}</Text>
            </View>
          )}
        </View>
        <View style={styles.detailBox}>
          <View>
            <Text style={styles.inforText}>Departure Time</Text>
            <Text style={styles.detailText}>
              {ticket.DepatureTime?.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
            <Text style={styles.dateText}>
              {ticket.DepatureTime?.toLocaleDateString([], {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
            </Text>
          </View>
          <View>
            <Text style={styles.inforText}>Arrival Time</Text>
            <Text style={styles.detailText}>
              {ticket.ArriveTime?.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
            <Text style={styles.dateText}>
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
          }}
        >
          <Text style={styles.locationText}>{ticket.Depature}</Text>
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
          <Text style={styles.locationText}>{ticket.Arrive}</Text>
        </View>
        {ticket.Passenger && (
          <View style={styles.detailBox}>
            <View style={{ width: "50%" }}>
              <Text style={styles.inforText}>Passenger</Text>
              <Text style={styles.detailText}>{ticket.Passenger}</Text>
            </View>
            {ticket.seatNO && (
              <View
                style={{ width: "50%", alignItems: "center", display: "flex" }}
              >
                <Text style={styles.inforText}>Quantity</Text>
                <Text style={styles.detailText}>{ticket?.seatNO.length}</Text>
              </View>
            )}
          </View>
        )}
      </View>
    </View>
  </View>
);
