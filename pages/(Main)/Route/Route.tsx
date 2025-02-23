import { View, Text, FlatList, TouchableOpacity, useWindowDimensions, ActivityIndicator } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { styles, scaledSize } from "./RouteStyle";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { RouteProp } from "@react-navigation/native";
import type { RootStackParamList } from "../../../types/NavigationTypes";
import { useEffect, useState } from "react";

type RouteScreenProp = StackNavigationProp<RootStackParamList, "Route">;
type RouteScreenRouteProp = RouteProp<RootStackParamList, "Route">;

type Props = {
  navigation: RouteScreenProp;
  route: RouteScreenRouteProp;
};

const Route = ({ navigation, route }: Props) => {
  const { width } = useWindowDimensions();
  const { from = "", to = "", date = "" } = route.params || {};

  const [busRoutes, setBusRoutes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(
          `http://192.168.0.2:8080/v1/api/route/search?startLocation=${encodeURIComponent(from)}&endLocation=${encodeURIComponent(to)}&date=${encodeURIComponent(date)}`
        );
        const data = await response.json();
        if (data.status === "success") {
          setBusRoutes(data.data || []);
        } else {
          setError("Không tìm thấy chuyến xe nào.");
        }
      } catch (err) {
        setError("Lỗi khi tải dữ liệu.");
      } finally {
        setLoading(false);
      }
    };

    fetchRoutes();
  }, [from, to, date]);

  const calculateTravelTime = (startTime: string, endTime: string) => {
    let start = new Date(startTime).getTime();
    let end = new Date(endTime).getTime();
    if (end < start) {
      end += 24 * 60 * 60 * 1000; 
    }
    const diffMs = end - start;
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m`;
  };
  
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); 
    const year = date.getFullYear();
    
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    
    const amPm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
  
    return `${day}/${month}/${year} ${String(hours).padStart(2, "0")}:${minutes}:${seconds} ${amPm}`;
  };
  
  const handleSelectRoute = (selectedBus: any) => {
    navigation.navigate("Booking", {
      from,
      to,
      date,
      busName: selectedBus.name,
      time: selectedBus.routeStartTime,
      price: selectedBus.price,
      travelTime: new Date(selectedBus.routeEndTime).getTime() - new Date(selectedBus.routeStartTime).getTime(),
    });
  };

  return (
    <View style={styles.container}>
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

      {loading ? (
        <ActivityIndicator size="large" color="#007bff" style={{ marginTop: 20 }} />
      ) : error ? (
        <Text style={{ textAlign: "center", color: "red", marginTop: 20 }}>{error}</Text>
      ) : (
        <FlatList
          data={busRoutes}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity style={[styles.routeItem, { width: width * 0.9 }]} onPress={() => handleSelectRoute(item)}>
              <View>
                <Text style={[styles.busName, { fontSize: scaledSize(width * 0.05, width) }]}>{item.car.car_code}</Text>
                <Text style={styles.busDetails}>Nhà xe: {item.car.bus_company_id.bus_company_name}</Text>
                <Text style={styles.busDetails}>Số ghế còn lại: {item.remainingSeat}/{item.car.amount_seat}</Text>
                <Text style={styles.busDetails}>Giờ đi: {formatDateTime(item.routeStartTime)}</Text>
                <Text style={styles.busDetails}>Giờ đến: {formatDateTime(item.routeEndTime)}</Text>
                <Text style={styles.busDetails}>Thời gian di chuyển: {calculateTravelTime(item.routeStartTime, item.routeEndTime)}</Text>
                <Text style={styles.busDetails}>Giá: {item.price.toLocaleString()} VNĐ</Text>
              </View>
              <MaterialIcons name="arrow-forward" size={24} color="#007bff" />
            </TouchableOpacity>
          )}
          contentContainerStyle={{ alignItems: "center" }}
        />
      )}
    </View>
  );
};

export default Route;
