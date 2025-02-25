import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Switch,
  ScrollView,
  Image,
} from "react-native";
import { styles } from "./HomeStyle";
import { MaterialIcons } from "@expo/vector-icons";
import TextInputCommon from "../../../components/Common/TextInput/TextInputCommon";
import useNavigate from "../../../components/Navigate/Navigate";

const recentSearches = [
  { id: "1", from: "Hồ Chí Minh", to: "Hà Nội", date: "20/01/2025" },
  { id: "2", from: "Đà Lạt", to: "Sài Gòn", date: "15/01/2025" },
  { id: "3", from: "Hà Nội", to: "Đà Nẵng", date: "22/01/2025" },
  { id: "4", from: "Nha Trang", to: "Hà Nội", date: "17/01/2025" },
];

export const Home = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState<Date>(new Date());
  const [isRoundTrip, setIsRoundTrip] = useState(false);
  const [isError, setIsError] = useState(false);

  const { navigateTo } = useNavigate();

  const handleSwapLocations = () => {
    setFrom(to);
    setTo(from);
  };

  const handleRecentSearchClick = (search: { from: string; to: string; date: string }) => {
    setFrom(search.from);
    setTo(search.to);
    const parsedDate = new Date(search.date.split("/").reverse().join("-"));
    if (!isNaN(parsedDate.getTime())) setDate(parsedDate);
  };

  const handleSubmit = () => {
    if (!from || !to || !date) {
      setIsError(true);
      return;
    }
    const formattedDate = date.toLocaleDateString("vi-VN");
    navigateTo("Route", { from, to, date: formattedDate, isRoundTrip });
  };

  return (
    <ScrollView>
      <View style={styles.homeContainer}>
        <Image
          source={{ uri: "https://s3-alpha-sig.figma.com/img/aa6f/4ca4/e50c079c9646512591856a96f337f9f8?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=CUmf73QXMmyF3vu7HsGrOyIXI87c~1BmJb2dAfLqn8KZHcfRIMlGW5RBmKTsGSEl99tKCQ2FwH1Pqp7iNNUq-K0Bp3858gZi-70No7kIWbVJ4YERhERArHekr-UYECrBIGEo775qg5-9KeUlLHQP8azYgYOhBc7VLouavY9~xvOFNuD9iF-~x5Us~md6pZrUu782vnFvUiYaJcEUr4c1u8rATz73vySgUYGs6lkKcFhLOljk--JX-hYXDCyDRhh4lnpso5-ZFj8w18an8dbY7CpRZu2q1mBaD-VTp4MGJfisGFfbQxe-aRcL9vssb-Qe-jJWsNu3TrNm3Jw1NsfjIA__" }}
          style={styles.headerImage}
        />

        <View style={styles.searchForm}>
          <View style={styles.inputContainer}>
            <TextInputCommon
              textTitle="Nơi xuất phát:"
              placeholder="Nhập nơi xuất phát"
              value={from}
              type="text"
              error={isError && !from ? "Vui lòng nhập nơi xuất phát." : ""}
              fieldName="from"
              onChangeText={setFrom}
            />
            <TouchableOpacity onPress={handleSwapLocations} style={styles.swapButton}>
              <MaterialIcons name="swap-vert" size={24} color="#007AFF" />
            </TouchableOpacity>
          </View>

          <TextInputCommon
            textTitle="Bạn muốn đi đâu?"
            placeholder="Nhập nơi đến"
            value={to}
            type="text"
            error={isError && !to ? "Vui lòng nhập nơi đến." : ""}
            fieldName="to"
            onChangeText={setTo}
          />
          
          <TextInputCommon
            textTitle="Ngày đi"
            placeholder="Chọn ngày"
            value={date}
            type="date"
            error={isError && !date ? "Vui lòng chọn ngày đi." : ""}
            fieldName="date"
            onChangeText={(text) => {
              const parsedDate = new Date(text);
              if (!isNaN(parsedDate.getTime())) {
                setDate(parsedDate);
              }
            }}
          />

          <View style={styles.roundTrip}>
            <Text style={styles.roundTripLabel}>Khứ hồi</Text>
            <Switch value={isRoundTrip} onValueChange={setIsRoundTrip} />
          </View>

          <TouchableOpacity style={styles.searchButton} onPress={handleSubmit}>
            <Text style={styles.searchButtonText}>Tìm kiếm</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Tìm kiếm gần đây</Text>

        <FlatList
          style={styles.recentSearches}
          contentContainerStyle={{ paddingBottom: 20 }}
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
    </ScrollView>
  );
};

export default Home;
