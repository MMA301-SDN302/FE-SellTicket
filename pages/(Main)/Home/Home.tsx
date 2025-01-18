import { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Switch } from "react-native"; 
import { styles } from "./HomeStyle";
import TextInputCommon from "../../../components/TextInputCommon/TextInputCommon";
import { MaterialIcons } from "@expo/vector-icons";
import useNavigate from "../../../components/Navigate/Navigate";

const recentSearches = [
  { id: "1", from: "Hồ Chí Minh", to: "Hà Nội", date: "20/01/2025" },
  { id: "2", from: "Đà Lạt", to: "Sài Gòn", date: "15/01/2025" },
  { id: "3", from: "Hà Tĩnh", to: "Huế", date: "22/01/2025" },
  { id: "4", from: "Nha Trang", to: "Hà Nội", date: "17/01/2025" },
  { id: "5", from: "Phú Quốc", to: "Đà Nẵng", date: "12/01/2025" },
  { id: "6", from: "Vũng Tàu", to: "Hà Nội", date: "25/01/2025" },
  { id: "7", from: "Cần Thơ", to: "Đà Lạt", date: "18/01/2025" },
  { id: "8", from: "Hải Phòng", to: "Sài Gòn", date: "19/01/2025" },
  { id: "9", from: "Quy Nhơn", to: "Phú Quốc", date: "16/01/2025" },
  { id: "10", from: "Hà Nội", to: "Nha Trang", date: "21/01/2025" }
];

export const Home = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState<Date>(new Date());
  const [isRoundTrip, setIsRoundTrip] = useState(false);
  const [isError, setIsError] = useState(false);

  const { navigateTo } = useNavigate();

  const handleRecentSearchClick = (search: { from: string; to: string; date: string }) => {
    setFrom(search.from);
    setTo(search.to);

    const parsedDate = new Date(search.date.split("/").reverse().join("-"));
    if (!isNaN(parsedDate.getTime())) {
      setDate(parsedDate);
    } else {
      console.error("Ngày không hợp lệ", search.date);
    }
  };

  const handleSubmit = () => {
    if (!from || !to || !date) {
      setIsError(true);
      return;
    }

    const formattedDate = date.toLocaleDateString("vi-VN");

    navigateTo("Route", {
      from,
      to,
      date: formattedDate,
      isRoundTrip,
    });
  };

  return (
    <View style={styles.homeContainer}> 


      <View style={styles.header}>
        <Text style={styles.headerTitle}>Vexedatnhathanhtinh!</Text>
      </View>


      <View style={styles.searchForm}>
        <TextInputCommon
          textTitle="Nơi xuất phát:"
          placeholder="Nhập nơi xuất phát"
          value={from}
          setValue={setFrom}
          type="name"
          showError={isError && !from}
          errorMess="Vui lòng nhập nơi xuất phát."
          setIsError={setIsError}
        />
        <TextInputCommon
          textTitle="Bạn muốn đi đâu?"
          placeholder="Nhập nơi đến"
          value={to}
          setValue={setTo}
          type="name"
          showError={isError && !to}
          errorMess="Vui lòng nhập nơi đến."
          setIsError={setIsError}
        />
        <TextInputCommon
          textTitle="Ngày đi"
          placeholder="Chọn ngày"
          valueDate={date}
          setValueDate={setDate}
          type="date"
          showError={isError && !date}
          errorMess="Vui lòng chọn ngày đi."
          setIsError={setIsError}
        />
        <View style={styles.roundTrip}>
          <Text style={styles.roundTripLabel}>Khứ hồi</Text>
          <Switch
            value={isRoundTrip}
            onValueChange={(value) => setIsRoundTrip(value)}
            trackColor={{ false: "#ddd", true: "#007bff" }}
            thumbColor={isRoundTrip ? "#fff" : "#fff"}
          />
        </View>
        <TouchableOpacity style={styles.searchButton} onPress={handleSubmit}>
          <Text style={styles.searchButtonText}>Tìm kiếm</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.additionalInfo}>
        <View style={styles.infoItem}>
          <MaterialIcons name="check-circle" size={20} color="green" />
          <Text style={styles.infoText}>Chắc chắn có chỗ</Text>
        </View>
        <View style={styles.infoItem}>
          <MaterialIcons name="support-agent" size={20} color="blue" />
          <Text style={styles.infoText}>Hỗ trợ 24/7</Text>
        </View>
        <View style={styles.infoItem}>
          <MaterialIcons name="local-offer" size={20} color="red" />
          <Text style={styles.infoText}>Nhiều ưu đãi</Text>
        </View>
        <View style={styles.infoItem}>
          <MaterialIcons name="credit-card" size={20} color="purple" />
          <Text style={styles.infoText}>Thanh toán đa dạng</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Tìm kiếm gần đây</Text>

      <FlatList
        style={styles.recentSearches}
        contentContainerStyle={{ paddingBottom: 20 }}
        data={recentSearches}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleRecentSearchClick(item)} style={styles.recentItem}>
            <Text style={styles.recentText}>
              {item.from} → {item.to}
            </Text>
            <Text style={styles.recentDate}>{item.date}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Home;
