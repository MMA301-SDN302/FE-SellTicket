import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Alert, ScrollView, ActivityIndicator } from "react-native";
import { styles } from "./BookingStyle";
import type { RouteProp } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { RootStackParamList } from "../../../types/NavigationTypes";
import useNavigate from "../../../components/Navigate/Navigate";
import useApi from "../../../hooks/useApi";
import { MaterialIcons } from "@expo/vector-icons";

type BookingScreenProp = StackNavigationProp<RootStackParamList, "Booking">;
type BookingScreenRouteProp = RouteProp<RootStackParamList, "Booking">;

type Props = {
  navigation: BookingScreenProp;
  route: BookingScreenRouteProp;
};

const Booking = ({ route }: Props) => {
  const { from, to, date, routeName, time, price, travelTime, routeId, policy } = route.params || {};
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [seatsFloor1, setSeatsFloor1] = useState<any[]>([]);
  const [seatsFloor2, setSeatsFloor2] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { navigateTo, goBack } = useNavigate();
  const { fetchData } = useApi<any>({ url: "/seat/getSeat", method: "GET" });
  const { fetchData: fetchCheckSeat } = useApi<any>({ url: "/v1/api/checkSeat", method: "GET" });

  useEffect(() => {
    if (routeId && from && to) {
      setLoading(true);
      fetchData({ routeId, from, to })
        .then((res) => {
          if (res?.seatMap) {         
            setSeatsFloor1([...res.seatMap.floor1]);
            setSeatsFloor2([...res.seatMap.floor2]);
          } else {
            console.error("Không tìm thấy seatMap trong response!");
          }
  
          setError(null);
        })
        .catch((err) => {
          console.error(" Lỗi khi gọi API:", err);
          setError(err.message || "Lỗi khi tải ghế");
        })
        .finally(() => setLoading(false));
    }
  }, [routeId, from, to]);
  
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getUTCDate().toString().padStart(2, "0")}/${(date.getUTCMonth() + 1)
      .toString()
      .padStart(2, "0")}/${date.getUTCFullYear()} ${date.getUTCHours().toString().padStart(2, "0")}:${date.getUTCMinutes()
      .toString()
      .padStart(2, "0")}`;
  }; 

  const handleSelectSeat = async (seatId: string) => {
    try {
      // const res = await fetchCheckSeat({ seatId }); // Gọi API kiểm tra ghế
      // if (res?.isBooked) {
      //   Alert.alert("Thông báo", "Ghế này đã được đặt, vui lòng chọn ghế khác!");
      //   return;
      // }
  
      setSelectedSeats((prevSeats) =>
        prevSeats.includes(seatId) ? prevSeats.filter((id) => id !== seatId) : [...prevSeats, seatId]
      );
    } catch (error) {
      console.error("Lỗi khi kiểm tra ghế:", error);
      Alert.alert("Lỗi", "Không thể kiểm tra ghế, vui lòng thử lại sau!");
    }
  };  

  const handleFinishBooking = () => {
    if (selectedSeats.length === 0) {
      Alert.alert("Thông báo", "Vui lòng chọn ít nhất 1 chỗ ngồi!");
      return;
    }
  
    const seatList = selectedSeats
      .map((seatId) => {
        const seat = [...seatsFloor1, ...seatsFloor2].find((s) => s.id === seatId);
        return seat ? seat.seatNumber : seatId; 
      })
      .join(", ");
  
    Alert.alert(
      "Xác nhận đặt chỗ",
      `Bạn có muốn đặt ghế: ${seatList}?`,
      [
        { text: "Hủy", style: "cancel" },
        {
          text: "Xác nhận",
          onPress: () => {
            navigateTo("PlaceOrder", {
              from,
              to,
              date,
              routeName,
              time,
              price,
              travelTime,
              selectedSeats,
              policy,
            });
          },
        },
      ]
    );
  };  

  const renderSeat = (seat: any) => (
    <TouchableOpacity
      key={seat.id}
      style={[
        styles.seatItem,
        seat.isAvailable ? styles.available : styles.unavailable, 
        selectedSeats.includes(seat.id) && seat.isAvailable && styles.selected, 
      ]}
      onPress={() => seat.isAvailable && handleSelectSeat(seat.id)}
      disabled={!seat.isAvailable} 
    >
      <Text style={styles.seatNumber}>{seat.seatNumber}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}> 
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <MaterialIcons name="event-seat" size={28} color="#fff" />
            <Text style={styles.header}>Chọn chỗ của bạn</Text>
          </View>
  
          <View style={styles.infoBox}>
            <Text style={styles.subHeader}>
              <MaterialIcons name="directions-bus" size={18} color="#007bff" /> Xe:
              <Text style={styles.highlight}> {routeName}</Text>
            </Text>
            <Text style={styles.subHeader}>
              <MaterialIcons name="place" size={18} color="#007bff" /> Từ:
              <Text style={styles.highlight}> {from}</Text> → Đến:
              <Text style={styles.highlight}> {to}</Text>
            </Text>
            <Text style={styles.subHeader}>
              <MaterialIcons name="access-time" size={18} color="#007bff" /> Giờ khởi hành:
              <Text style={styles.highlight}> {formatDateTime(time)}</Text>
            </Text>
            <Text style={styles.subHeader}>
              <MaterialIcons name="attach-money" size={18} color="#007bff" /> Giá vé:
              <Text style={styles.highlight}> {price?.toLocaleString()} VNĐ</Text>
            </Text>
          </View>
  
          {loading || error ? (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", width: "100%" }}>
              {loading ? (
                <ActivityIndicator size="large" color="#007bff" />
              ) : (
                <Text style={{ textAlign: "center", color: "red", fontSize: 16 }}>{error}</Text>
              )}
            </View>
          ) : (
            <View style={{ alignItems: "center", width: "100%" }}>
              {[{ floor: 1, seats: seatsFloor1 }, { floor: 2, seats: seatsFloor2 }].map(({ floor, seats }) => (
                <View key={floor} style={styles.floorContainer}>
                  <Text style={styles.floorLabel}>Tầng {floor}</Text>
                  {seats.length === 0 ? (
                    <Text style={{ textAlign: "center", color: "gray", marginBottom: 10 }}>Không có chỗ trống</Text>
                  ) : (
                    <View style={styles.busContainer}>
                      {[0, 6, 12].map((startIdx) => (
                        <React.Fragment key={startIdx}>
                          <View style={styles.seatRow}>{seats.slice(startIdx, startIdx + 6).map(renderSeat)}</View>
                          {startIdx < 12 && <View style={styles.narrowHallway} />}
                        </React.Fragment>
                      ))}
                    </View>
                  )}
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.finishButton}
            onPress={() => {
              if (seatsFloor1.length === 0 && seatsFloor2.length === 0) {
                goBack();
              } else {
                handleFinishBooking();
              }
            }}
          >
            <MaterialIcons name={seatsFloor1.length === 0 && seatsFloor2.length === 0 ? "arrow-back" : "check-circle"} size={22} color="#fff" />
            <Text style={styles.finishButtonText}>
              {seatsFloor1?.length === 0 && seatsFloor2?.length === 0 ? "Quay lại" : "Xác nhận chỗ ngồi"}
            </Text>
          </TouchableOpacity>
      </View>
    </View>
    
  );
}  
export default Booking;
