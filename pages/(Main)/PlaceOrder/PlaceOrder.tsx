import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { Ticket, TicketProps } from "../../../components/Ticket/Ticket"; 
import { RootStackParamList } from "../../../types/NavigationTypes";
import { RouteProp } from "@react-navigation/native";

type PlaceOrderRouteProp = RouteProp<RootStackParamList, "PlaceOrder">;

type PlaceOrderProps = {
  route: PlaceOrderRouteProp;
};

const convertToDate = (dateStr: string): Date => {
  const [day, month, year] = dateStr.split("/").map(Number);
  return new Date(year, month - 1, day); 
};

const addHours = (date: Date, hours: number): Date => {
  const newDate = new Date(date);
  newDate.setHours(newDate.getHours() + hours); 
  return newDate;
};


const PlaceOrder = ({ route }: PlaceOrderProps) => {
  const { from = '', to = '', date = '', busName = '', time = '', price = '', selectedSeats = [], travelTime = 0 } = route.params;
  
  const start = convertToDate(date); 
  const end = addHours(start, travelTime);

  const tickets: TicketProps[] = selectedSeats.map((seat) => ({
    seatNO: [seat],
    DepatureTime: start,
    ArriveTime: end,
    Arrive: to,
    Depature: from,
    Passenger: "Tên Hành Khách", 
    Price: price,
    status: "Đã đặt",
    Quantity: selectedSeats.length,
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Đặt Vé Thành Công</Text>
      <Text style={styles.subHeader}>
        Xe: {busName} - {from} → {to} - Ngày: {date} - Giờ: {time} - Thời gian di chuyển: {travelTime} giờ
      </Text>

      <ScrollView contentContainerStyle={styles.ticketsContainer}>
        {tickets.map((ticket, index) => (
          <View key={index} style={styles.ticketWrapper}>
            <Ticket {...ticket} /> 
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
    marginBottom: 20,
  },
  ticketsContainer: {
    flexDirection: "column", // Sắp xếp vé theo cột
    justifyContent: "flex-start", // Đảm bảo vé được căn chỉnh ở trên cùng
  },
  ticketWrapper: {
    width: "100%", // Mỗi vé chiếm toàn bộ chiều rộng
    marginBottom: 20, // Thêm khoảng cách giữa các vé
  },
});

export default PlaceOrder;
