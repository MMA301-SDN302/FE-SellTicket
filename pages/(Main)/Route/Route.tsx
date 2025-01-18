import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons"; 
import { styles } from "./RouteStyle";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { RouteProp } from "@react-navigation/native";
import type { RootStackParamList } from "../../../types/NavigationTypes";
import useNavigate from "../../../components/Navigate/Navigate";

type RouteScreenProp = StackNavigationProp<RootStackParamList, "Route">;
type RouteScreenRouteProp = RouteProp<RootStackParamList, "Route">;

type Props = {
  navigation: RouteScreenProp;
  route: RouteScreenRouteProp;
};

// Dữ liệu mảng busRoutes với travelTime
const busRoutes = [
  { id: "1", busName: "Bus A", time: "08:00 AM", price: "100,000 VND", travelTime: 5 },
  { id: "2", busName: "Bus B", time: "10:00 AM", price: "120,000 VND", travelTime: 4 },
  { id: "3", busName: "Bus C", time: "02:00 PM", price: "110,000 VND", travelTime: 6 },
];

const Route = ({ navigation, route }: Props) => {
  const { from = "", to = "", date = "" } = route.params || {};

  // Hàm chọn chuyến xe và chuyển thông tin sang màn hình Booking
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
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Route Bus</Text>

        {from && to && date ? (
          <Text style={styles.subHeader}>
            {from} → {to} - Ngày: {date}
          </Text>
        ) : (
          <Text style={styles.subHeader}>Thông tin chưa có sẵn</Text>
        )}
      </View>

      <FlatList
        data={busRoutes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.routeItem}
            onPress={() => handleSelectRoute(item)}  // Gọi hàm khi chọn chuyến
          >
            <View>
              <Text style={styles.busName}>{item.busName}</Text>
              <Text style={styles.busDetails}>Thời gian: {item.time}</Text>
              <Text style={styles.busDetails}>Giá: {item.price}</Text>
              <Text style={styles.busDetails}>Thời gian đến: {item.travelTime} giờ</Text>  
            </View>
            <MaterialIcons name="arrow-forward" size={24} color="#007bff" />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Route;
