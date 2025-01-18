import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
  busContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  leftSide: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  centerSide: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rightSide: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  middleSpace: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  hallway: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#999",
  },
  seatItem: {
    margin: 5,
    padding: 15,
    borderWidth: 1,
    borderRadius: 5,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  seatNumber: {
    fontSize: 18,
    fontWeight: "600",
  },
  available: {
    backgroundColor: "#e0ffe0",  // Màu cho ghế có sẵn
    borderColor: "#32CD32",
  },
  unavailable: {
    backgroundColor: "#f4f4f4",  // Màu cho ghế đã chọn
    borderColor: "#ddd",
  },
  selected: {
    backgroundColor: "#ADD8E6",  // Màu khi ghế được chọn
    borderColor: "#007bff",
  },
});
