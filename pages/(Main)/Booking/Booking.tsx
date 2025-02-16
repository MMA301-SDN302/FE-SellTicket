import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { styles } from "./BookingStyle";
import type { RouteProp } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { RootStackParamList } from "../../../types/NavigationTypes";
import useNavigate from "../../../components/Navigate/Navigate";
import { MaterialIcons } from "@expo/vector-icons";

type BookingScreenProp = StackNavigationProp<RootStackParamList, "Booking">;
type BookingScreenRouteProp = RouteProp<RootStackParamList, "Booking">;

type Props = {
  navigation: BookingScreenProp;
  route: BookingScreenRouteProp;
};

// Hàm tạo danh sách ghế xe
const generateSeats = (floor: number) =>
  ["A", "B", "C"].flatMap((row) =>
    Array.from({ length: 8 }, (_, index) => ({
      id: `${row}${index + 1 + (floor - 1) * 8}`,
      seatNumber: `${row}${index + 1 + (floor - 1) * 8}`,
      isAvailable: true,
    }))
  );

const seatsFloor1 = generateSeats(1);
const seatsFloor2 = generateSeats(2);

const Booking = ({ route }: Props) => {
  const { from = "", to = "", date = "", busName = "", time = "", price = "", travelTime = 0 } = route.params || {};
  
  const [selectedSeats, setSelectedSeats] = React.useState<string[]>([]);
  const { navigateTo } = useNavigate();

  const handleSelectSeat = (seatId: string) => {
    setSelectedSeats((prevSeats) =>
      prevSeats.includes(seatId)
        ? prevSeats.filter((id) => id !== seatId)
        : [...prevSeats, seatId]
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
      {/* Header */}
      <View style={styles.headerContainer}>
        <MaterialIcons name="event-seat" size={28} color="#fff" />
        <Text style={styles.header}>Chọn Ghế</Text>
      </View>

      {/* Thông tin chuyến xe */}
      <View style={styles.infoBox}>
        <Text style={styles.subHeader}>
          <MaterialIcons name="place" size={18} color="#007bff" /> 
          <Text style={styles.highlight}> {from}</Text> → 
          <Text style={styles.highlight}> {to}</Text> {"\n"}

          <MaterialIcons name="event" size={18} color="#007bff" /> Ngày:  
          <Text style={styles.highlight}> {date}</Text> {"\n"}

          <MaterialIcons name="directions-bus" size={18} color="#007bff" /> Xe:  
          <Text style={styles.highlight}> {busName}</Text> {"\n"}

          <MaterialIcons name="access-time" size={18} color="#007bff" /> Thời gian:  
          <Text style={styles.highlight}> {time}</Text> {"\n"}

          <MaterialIcons name="hourglass-bottom" size={18} color="#007bff" /> Di chuyển:  
          <Text style={styles.highlight}> {travelTime} giờ</Text>
        </Text>
      </View>

      {/* Sơ đồ ghế */}
      <View style={styles.sheetStyles}>
        {[{ floor: 1, seats: seatsFloor1 }, { floor: 2, seats: seatsFloor2 }].map(({ floor, seats }) => (
          <View key={floor} style={styles.floorContainer}>
            <Text style={styles.floorLabel}>Tầng {floor}</Text>
            <View style={styles.busContainer}>
              {[0, 8, 16].map((startIdx) => (
                <React.Fragment key={startIdx}>
                  <View style={styles.seatRow}>{seats.slice(startIdx, startIdx + 8).map(renderSeat)}</View>
                  {startIdx < 16 && <View style={styles.narrowHallway} />}
                </React.Fragment>
              ))}
            </View>
          </View>
        ))}
      </View>

      {/* Nút hoàn tất */}
      <TouchableOpacity style={styles.finishButton} onPress={handleFinishBooking}>
        <MaterialIcons name="check-circle" size={22} color="#fff" />
        <Text style={styles.finishButtonText}>Hoàn tất</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Booking;
