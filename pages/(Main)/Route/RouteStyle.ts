import { StyleSheet, Dimensions } from "react-native";

// Lấy kích thước màn hình
const { width, height } = Dimensions.get("window");

// Hàm điều chỉnh kích thước font chữ theo màn hình
export const scaledSize = (size: number, screenWidth: number) => {
  const baseWidth = 375; // Kích thước chuẩn của iPhone
  return Math.round((size * screenWidth) / baseWidth);
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: width * 0.04, // Điều chỉnh padding theo màn hình
    backgroundColor: "#f9f9f9",
  },
  header: {
    marginBottom: height * 0.02,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: scaledSize(20, width),
    fontWeight: "bold",
    color: "#333",
  },
  subHeader: {
    fontSize: scaledSize(16, width),
    color: "#666",
    marginTop: height * 0.01,
    textAlign: "center",
  },
  routeItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: width * 0.05,
    marginVertical: height * 0.01,
    borderRadius: 15,
    borderColor: "green",
    borderWidth: width*0.005,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  busName: {
    fontSize: scaledSize(18, width),
    fontWeight: "bold",
    color: "#007bff",
  },
  busDetails: {
    fontSize: scaledSize(14, width),
    color: "#555",
    marginTop: height * 0.005,
  },
});
