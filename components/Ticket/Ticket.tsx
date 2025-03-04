import { View, Text, Button, TouchableOpacity, Alert } from "react-native";
import { styles } from "./TicketStyle";
import { Ionicons } from "@expo/vector-icons";
import ButtonCommon from "../Common/Button/ButtonCommon";
import useApi from "../../hooks/useApi";
import { ApiConstant } from "../../data/ApiConstant";
import type { TicketResponse } from "./type";

type TicketProps = TicketResponse & {
  onCancel: () => Promise<void>;
};

export function Ticket({ onCancel, ...ticket }: TicketProps) {
  const { fetchData } = useApi({
    method: "DELETE",
    url: `${ApiConstant.Ticket}/${ticket._id}`,
  });
  async function CancelTicket() {
    if (!ticket._id) {
      console.error("Lỗi: _id không tồn tại");
      return;
    }
    Alert.alert("Hủy vé", `Bạn muốn hủy vé ${ticket.ticket_No}?`, [
      { text: "Không", style: "cancel" },
      {
        text: "Có",
        onPress: async () => {
          try {
            console.log("Hủy vé với _id:", ticket._id);
            await fetchData();
            if (onCancel) {
              onCancel();
            }
          } catch (err) {
            console.error("Lỗi khi hủy vé:", err);
          }
        },
      },
    ]);
  }

  function GenerateQRCode() {}

  return (
    <View style={styles.ticketContainer}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Vé xe ô tô</Text>

        <View style={styles.priceBox}>
          {ticket.ticket_price == undefined ? (
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
              {new Intl.NumberFormat("en-US").format(ticket.ticket_price) ??
                " > 100,000 "}
              VND
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.inforTicket}>
        <View style={styles.detailTicket}>
          <View style={styles.detailBox}>
            {ticket.ticket_No && (
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
                  {ticket.ticket_No}
                </Text>
              </View>
            )}
            {ticket.ticket_No && (
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
                  {ticket.ticket_No}
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
                {ticket.trip_id.tripStartTime?.toLocaleTimeString("vi-VN", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
              <Text
                style={styles.dateText}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {ticket.trip_id.tripStartTime?.toLocaleDateString("vi-VN", {})}
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
                {ticket.trip_id.tripEndTime?.toLocaleTimeString("vi-VN", {
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
                  {ticket.trip_id.tripEndTime?.toLocaleDateString("vi-VN", {})}
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
              {ticket.trip_id.depature}
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
              {ticket.trip_id.arrive}
            </Text>
          </View>
        </View>
      </View>
      {ticket.ticket_status == "confirmed" && (
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
      {ticket.ticket_status == "pending" && (
        <View style={styles.buttonCurrent}>
          <ButtonCommon
            title="Thanh toán"
            isActive={true}
            onPress={() => GenerateQRCode()}
            backgroundColor="#f0f0f0"
            textColor="black"
            activeBackgroundColor="#4D5995"
            activeTextColor="#fff"
            buttonStyle={{ width: "40%" }}
          />
          <ButtonCommon
            title="Hủy đặt vé"
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
