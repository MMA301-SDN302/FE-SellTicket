import { View, Text, FlatList, TouchableOpacity, useWindowDimensions } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { styles, scaledSize } from "./RouteStyle";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { RouteProp } from "@react-navigation/native";
import type { RootStackParamList } from "../../../types/NavigationTypes";

type RouteScreenProp = StackNavigationProp<RootStackParamList, "Route">;
type RouteScreenRouteProp = RouteProp<RootStackParamList, "Route">;

type Props = {
  navigation: RouteScreenProp;
  route: RouteScreenRouteProp;
};

// Danh sách các chuyến xe (dữ liệu mẫu)
const busRoutes = [
  { id: "1", busName: "Bus A", time: "08:00 AM", price: "100,000 VND", travelTime: 5 },
  { id: "2", busName: "Bus B", time: "10:00 AM", price: "120,000 VND", travelTime: 4 },
  { id: "3", busName: "Bus C", time: "02:00 PM", price: "110,000 VND", travelTime: 6 },
];

const Route = ({ navigation, route }: Props) => {
  const { width } = useWindowDimensions(); // Lấy chiều rộng màn hình
  const { from = "", to = "", date = "" } = route.params || {};

  const handleSelectRoute = (selectedBus: { busName: string; time: string; price: string; travelTime: number }) => {
    navigation.navigate("Booking", {
      from,
      to,
      date,
      busName: selectedBus.busName,
      time: selectedBus.time,
      price: selectedBus.price,
      travelTime: selectedBus.travelTime, 
    });
  };

  return (
    <View style={styles.container}>
      {/* Tiêu đề màn hình */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { fontSize: scaledSize(20, width) }]}>Chọn chuyến xe</Text>
        {from && to && date ? (
          <Text style={[styles.subHeader, { fontSize: scaledSize(16, width) }]}>
            {from} → {to} - Ngày: {date}
          </Text>
        ) : (
          <Text style={[styles.subHeader, { fontSize: scaledSize(16, width) }]}>Thông tin chưa có sẵn</Text>
        )}
      </View>

      {/* Danh sách chuyến xe */}
      <FlatList
        data={busRoutes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={[styles.routeItem, { width: width * 0.9 }]} onPress={() => handleSelectRoute(item)}>
            <View>
              <Text style={[styles.busName, { fontSize: scaledSize(18, width) }]}>{item.busName}</Text>
              <Text style={styles.busDetails}>Thời gian: {item.time}</Text>
              <Text style={styles.busDetails}>Giá: {item.price}</Text>
              <Text style={styles.busDetails}>Thời gian đến: {item.travelTime} giờ</Text>
            </View>
            <MaterialIcons name="arrow-forward" size={24} color="#007bff" />
          </TouchableOpacity>
        )}
        contentContainerStyle={{ alignItems: "center" }} // Canh giữa các item
      />
    </View>
  );
};

export default Route;
