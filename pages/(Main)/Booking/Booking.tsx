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
  const { from, to, date, busName, time, price, travelTime, routeId } = route.params || {};
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [seats, setSeats] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { navigateTo } = useNavigate();

  const { fetchData } = useApi<any[]>({
    url: "/seat/getSeat",
    method: "GET",
  });

  useEffect(() => {
    if (routeId && from && to) {
      setLoading(true);
      fetchData({ routeId, from, to })
        .then((res) => {
          setSeats(res || []);
          setError(null);
        })
        .catch((err) => setError(err.message || "Lỗi khi tải ghế"))
        .finally(() => setLoading(false));
    }
  }, [routeId, from, to]);

  const handleSelectSeat = (seatId: string) => {
    setSelectedSeats((prevSeats) =>
      prevSeats.includes(seatId) ? prevSeats.filter((id) => id !== seatId) : [...prevSeats, seatId]
    );
  };

  const handleFinishBooking = () => {
    if (selectedSeats.length === 0) {
      Alert.alert("Thông báo", "Vui lòng chọn ít nhất 1 chỗ ngồi!");
      return;
    }

    navigateTo("PlaceOrder", {
      from,
      to,
      date,
      busName,
      time,
      price,
      travelTime,
      selectedSeats,
    });
  };

  // **Giữ nguyên định dạng ngày tháng**
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${date.getFullYear()} ${date.getHours().toString().padStart(2, "0")}:${date.getMinutes()
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <MaterialIcons name="event-seat" size={28} color="#fff" />
          <Text style={styles.header}>Chọn chỗ của bạn</Text>
        </View>

        {/* Thông tin chuyến xe */}
        <View style={styles.infoBox}>
          <Text style={styles.subHeader}>
            <MaterialIcons name="directions-bus" size={18} color="#007bff" /> Xe:
            <Text style={styles.highlight}> {busName}</Text>
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
          <Text style={styles.subHeader}>
            <MaterialIcons name="timer" size={18} color="#007bff" /> Thời gian di chuyển:
            <Text style={styles.highlight}> {Math.floor(travelTime / 3600000)} giờ {Math.floor((travelTime % 3600000) / 60000)} phút</Text>
          </Text>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#007bff" style={{ marginTop: 20 }} />
        ) : error ? (
          <Text style={{ textAlign: "center", color: "red", marginTop: 20 }}>{error}</Text>
        ) : (
          <View style={styles.sheetStyles}>
            {seats.map((seat) => (
              <TouchableOpacity
                key={seat.id}
                style={[
                  styles.seatItem,
                  seat.isAvailable ? styles.available : styles.unavailable,
                  selectedSeats.includes(seat.id) && styles.selected,
                ]}
                onPress={() => seat.isAvailable && handleSelectSeat(seat.id)}
                disabled={!seat.isAvailable}
              >
                <Text style={styles.seatNumber}>{seat.seatNumber}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <TouchableOpacity style={styles.finishButton} onPress={handleFinishBooking}>
          <MaterialIcons name="check-circle" size={22} color="#fff" />
          <Text style={styles.finishButtonText}>Hoàn tất</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Booking;
