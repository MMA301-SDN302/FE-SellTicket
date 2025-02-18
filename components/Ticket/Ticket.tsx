import { View, Text, Button, TouchableOpacity } from "react-native";
import { styles } from "./TicketStyle";
import { Ionicons } from "@expo/vector-icons";
import ButtonCommon from "../Common/Button/ButtonCommon";
import { useState } from "react";

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
export function Ticket(ticket: TicketProps) {
  const [ticketStatus, setTicketStatus] = useState(ticket.status);

  function CancelTicket() {
    ticket.status = "CANCEL";
  }
  function GenerateQRCode() {}

  return (
    <View style={styles.ticketContainer}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Vé xe ô tô</Text>

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
              Đặt cọc
            </Text>
          ) : (
            <></>
          )}
          <View style={styles.price}>
            <Text
              style={styles.priceText}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {ticket.Price ?? " > 100,000 VND"}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.inforTicket}>
        <View style={styles.detailTicket}>
          <View style={styles.detailBox}>
            {ticket.seatNO && (
              <View style={styles.detailTime}>
                <Text
                  style={styles.inforText}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  Số ghế
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
              <View style={styles.detailTime}>
                <Text
                  style={styles.inforText}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  Vé số
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
            <View style={styles.detailTime}>
              <Text
                style={styles.inforText}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                Giờ khởi hành
              </Text>
              <Text
                style={styles.detailText}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {ticket.DepatureTime?.toLocaleTimeString("vi-VN", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
              <Text
                style={styles.dateText}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {ticket.DepatureTime?.toLocaleDateString("vi-VN", {})}
              </Text>
            </View>
            <View style={styles.detailTime}>
              <Text
                style={styles.inforText}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                Giờ đến
              </Text>
              <Text
                style={styles.detailText}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {ticket.ArriveTime?.toLocaleTimeString("vi-VN", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
              <Text
                style={styles.dateText}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                <Text
                  style={styles.dateText}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {ticket.ArriveTime?.toLocaleDateString("vi-VN", {})}
                </Text>
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
      {ticket.status == "CURRENT" && (
        <View style={styles.buttonCurrent}>
          <ButtonCommon
            title="Mã QR"
            isActive={true}
            onPress={() => GenerateQRCode()}
            backgroundColor="#f0f0f0"
            textColor="black"
            activeBackgroundColor="#4D5995"
            activeTextColor="#fff"
            buttonStyle={{ width: "40%" }}
          />
          <ButtonCommon
            title="Hủy vé"
            isActive={true}
            onPress={() => CancelTicket()}
            backgroundColor="#fff"
            borderColor="blue"
            activeTextColor="#fff"
            buttonStyle={{ width: "40%", backgroundColor: "#ff4747" }}
          />
        </View>
      )}
    </View>
  );
}
