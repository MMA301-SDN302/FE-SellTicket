import { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, useWindowDimensions, ActivityIndicator } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { styles, scaledSize } from "./RouteStyle";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { RouteProp } from "@react-navigation/native";
import type { RootStackParamList } from "../../../types/NavigationTypes";
import useApi from "../../../hooks/useApi";

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
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { fetchData } = useApi<any[]>({
    url: "/routes/search",
    method: "GET",
  });

  useEffect(() => {
    if (from && to && date) {
      setLoading(true);
      fetchData({ startLocation: from, endLocation: to, date })
        .then((res) => {
          setBusRoutes(res || []);
          setError(null);
        })
        .catch((err) => {
          setError(err.message || "Lỗi khi tải dữ liệu");
        })
        .finally(() => setLoading(false));
    }
  }, [from, to, date]);

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getUTCDate().toString().padStart(2, "0")}/${(date.getUTCMonth() + 1)
      .toString()
      .padStart(2, "0")}/${date.getUTCFullYear()} ${date.getUTCHours().toString().padStart(2, "0")}:${date.getUTCMinutes()
      .toString()
      .padStart(2, "0")}`;
  };  

  const handleSelectRoute = (selectedRoute: any) => {
    navigation.navigate("Booking", {
      from,
      to,
      date,
      routeName: selectedRoute.name, 
      time: selectedRoute.timeStartLocationPart, 
      price: selectedRoute.pricePart, 
      travelTime:
        new Date(selectedRoute.timeEndLocationPart).getTime() - 
        new Date(selectedRoute.timeStartLocationPart).getTime(),
      routeId: selectedRoute._id,
      policy: selectedRoute.policy || "Không có chính sách", 
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { fontSize: scaledSize(20, width) }]}>Chọn chuyến xe</Text>
        {from && to && date ? (
          <Text style={[styles.subHeader, { fontSize: scaledSize(16, width) }]}> {from} → {to} - Ngày: {date} </Text>
        ) : (
          <Text style={[styles.subHeader, { fontSize: scaledSize(16, width) }]}>Thông tin chưa có sẵn</Text>
        )}
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#007bff" style={{ marginTop: 20 }} />
      ) : error ? (
        <Text style={{ textAlign: "center", color: "red", marginTop: 20 }}>{error}</Text>
      ) : busRoutes.length === 0 ? (
        <Text style={{ textAlign: "center", marginTop: 20 }}>Không tìm thấy chuyến xe</Text>
      ) : (
        <FlatList
          data={busRoutes}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.routeItem, { width: width * 0.9 }]}
              onPress={() => handleSelectRoute(item)}
            >
              <View>
                <Text style={[styles.busName, { fontSize: scaledSize(width * 0.05, width) }]}>{item.name}</Text>
                <Text style={styles.busDetails}>Số ghế còn lại: {item.remainingSeat}</Text>
                <Text style={styles.busDetails}>Giá: {item.pricePart.toLocaleString()} VND</Text>
                <Text style={styles.busDetails}>Đi: {formatDateTime(item.timeStartLocationPart)}</Text>
                <Text style={styles.busDetails}>Đến: {formatDateTime(item.timeEndLocationPart)}</Text>
                <Text style={styles.busDetails}>Chính sách: {item.policy || "Không có thông tin"}</Text>
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