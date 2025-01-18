import React, { useState } from "react";
import type { StackNavigationProp } from "@react-navigation/stack";
import { View, Text, TouchableOpacity, FlatList, Switch, Image, ScrollView } from "react-native";
import { styles } from "./HomeStyle";
import type { RootStackParamList } from "../../../types/NavigationTypes";
import TextInputCommon from "../../../components/TextInputCommon/TextInputCommon";
import Icon from "react-native-vector-icons/MaterialIcons";

type HomeProp = StackNavigationProp<RootStackParamList, "Home">;

type Props = {
  navigation: HomeProp;
};

const recentSearches = [
  { id: "1", from: "Hồ Chí Minh", to: "Đà Nẵng", date: "T7, 18/01/2025" },
  { id: "2", from: "Đà Lạt - Lâm Đồng", to: "Đà Nẵng", date: "T2, 13/01/2025" },
];

export const Home = ({ navigation }: Props) => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [isRoundTrip, setIsRoundTrip] = useState(false);

  // Hàm xử lý click vào tìm kiếm gần đây
  const handleRecentSearchClick = (search: { from: string; to: string; date: string }) => {
    setFrom(search.from);
    setTo(search.to);
    setDate(search.date);
  };

  return (
    <View style={styles.homeContainer}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Vexedatnhathanhtinh!</Text>
      </View>

      {/* Search Form */}
      <View style={styles.searchForm}>
        <TextInputCommon textTitle="Nơi xuất phát:" style={styles.input} placeholder="Nhập nơi xuất phát" value={from} onChangeText={setFrom} />
        <TextInputCommon style={styles.input} textTitle="Bạn muốn đi đâu?" placeholder="Nhập nơi đến" value={to} onChangeText={setTo} />
        <TextInputCommon textTitle="Ngày đi" style={styles.input} placeholder="Chọn ngày" value={date} onChangeText={setDate} />
        <View style={styles.roundTrip}>
          <Text style={styles.roundTripLabel}>Khứ hồi</Text>
          <Switch value={isRoundTrip} onValueChange={(value) => setIsRoundTrip(value)} trackColor={{ false: "#ddd", true: "#007bff" }} thumbColor={isRoundTrip ? "#fff" : "#fff"} />
        </View>
        <TouchableOpacity style={styles.searchButton}>
          <Text style={styles.searchButtonText}>Tìm kiếm</Text>
        </TouchableOpacity>
      </View>

      <View>
        <Text style={styles.warning}>
            Cam kết hoàn 150% nếu nhà xe không cung cấp dịch vụ vận chuyển
        </Text>
      </View>

      {/* Additional Info */}
      <View style={styles.additionalInfo}>
        <View style={styles.infoItem}>
          <Icon name="check-circle" size={20} color="green" />
          <Text style={styles.infoText}>Chắc chắn có chỗ</Text>
        </View>
        <View style={styles.infoItem}>
          <Icon name="support-agent" size={20} color="blue" />
          <Text style={styles.infoText}>Hỗ trợ 24/7</Text>
        </View>
        <View style={styles.infoItem}>
          <Icon name="local-offer" size={20} color="red" />
          <Text style={styles.infoText}>Nhiều ưu đãi</Text>
        </View>
        <View style={styles.infoItem}>
          <Icon name="credit-card" size={20} color="purple" />
          <Text style={styles.infoText}>Thanh toán đa dạng</Text>
        </View>
      </View>

      {/* Recent Searches */}
      <View style={styles.recentSearches}>
        <Text style={styles.sectionTitle}>Tìm kiếm gần đây</Text>
        <FlatList
          data={recentSearches}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleRecentSearchClick(item)} style={styles.recentItem}>
              <Text style={styles.recentText}>{item.from} → {item.to}</Text>
              <Text style={styles.recentDate}>{item.date}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

export default Home;
