import React from "react";
import { View, Text, TouchableOpacity, Button, StyleSheet } from "react-native";
import { styles } from "./BookingStyle"; // Sử dụng các style đã tạo từ trước
import type { RouteProp } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { RootStackParamList } from "../../../types/NavigationTypes";
import useNavigate from "../../../components/Navigate/Navigate";

type BookingScreenProp = StackNavigationProp<RootStackParamList, "Booking">;
type BookingScreenRouteProp = RouteProp<RootStackParamList, "Booking">;

type Props = {
  navigation: BookingScreenProp;
  route: BookingScreenRouteProp;
};

// Dữ liệu ghế xe (vẫn giữ nguyên như cũ)
const seats = [
  ...Array(10).fill(null).map((_, index) => ({
    id: `A${index + 1}`,
    seatNumber: `A${index + 1}`,
    isAvailable: true,
  })),
  ...Array(10).fill(null).map((_, index) => ({
    id: `B${index + 1}`,
    seatNumber: `B${index + 1}`,
    isAvailable: true,
  })),
  ...Array(10).fill(null).map((_, index) => ({
    id: `C${index + 1}`,
    seatNumber: `C${index + 1}`,
    isAvailable: true,
  })),
];

const Booking = ({ navigation, route }: Props) => {
  // Lấy thông tin từ route.params, bao gồm travelTime
  const { from = '', to = '', date = '', busName = '', time = '', price = '', travelTime = 0 } = route.params || {};
  
  const [selectedSeats, setSelectedSeats] = React.useState<string[]>([]); // Giữ danh sách ghế đã chọn
  const { navigateTo } = useNavigate();

  const handleSelectSeat = (seatId: string) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((id) => id !== seatId)); // Bỏ chọn ghế
    } else {
      setSelectedSeats([...selectedSeats, seatId]); // Chọn ghế
    }
  };

  const handleFinishBooking = () => {
    // Chuyển tất cả các thông tin đã chọn đến trang PlaceOrder
    navigateTo("PlaceOrder", {
      from,
      to,
      date,
      busName,
      time,
      price,
      travelTime,  // Truyền travelTime
      selectedSeats,
    });
  };

  const renderSeat = (item: any) => {
    const isSelected = selectedSeats.includes(item.id);
    return (
      <TouchableOpacity
        key={item.id} 
        style={[
          styles.seatItem,
          item.isAvailable ? styles.available : styles.unavailable,
          isSelected && styles.selected,
        ]}
        onPress={() => item.isAvailable && handleSelectSeat(item.id)}
        disabled={!item.isAvailable}
      >
        <Text style={styles.seatNumber}>{item.seatNumber}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Chọn Ghế</Text>
      <Text style={styles.subHeader}>
        {from} → {to} - Ngày: {date} - Xe: {busName} - Thời gian: {time} - Thời gian di chuyển: {travelTime} giờ
      </Text>

      {/* Tạo giao diện xe giường nằm */}
      <View style={styles.busContainer}>
        <View style={styles.leftSide}>
          {seats.slice(0, 10).map((item) => renderSeat(item))}
        </View>
        <View style={styles.middleSpace}>
          <Text style={styles.hallway}>Hành Lang</Text>
        </View>
        <View style={styles.centerSide}>
          {seats.slice(10, 20).map((item) => renderSeat(item))}
        </View>
        <View style={styles.middleSpace}>
          <Text style={styles.hallway}>Hành Lang</Text>
        </View>
        <View style={styles.rightSide}>
          {seats.slice(20, 30).map((item) => renderSeat(item))}
        </View>
      </View>

      <Button title="Hoàn tất" onPress={handleFinishBooking} />
    </View>
  );
};

export default Booking;
