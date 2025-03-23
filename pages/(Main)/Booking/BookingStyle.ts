import { StyleSheet, Dimensions} from "react-native";

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#007bff",
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 10,
  },
  infoBox: {
    backgroundColor: "#f8f9fa",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 3,
  },
  highlight: {
    fontWeight: "bold",
    color: "#007bff",
  },
  subHeader: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
    marginBottom: 20,
  },
  floorContainer: {
    marginBottom: 20,
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: "#f2f2f2",
    width: width * 0.8,
  },
  floorLabel: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  headerTitle: {
  fontSize: 20,
  fontWeight: "bold",
  textAlign: "center",
  marginBottom: 10,
},

  sheetStyles: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    display: "flex",
    flexWrap: "wrap"
  },
  busContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  seatRow: {
    flexDirection: "column",
    alignItems: "center",
  },
  narrowHallway: {
    width: 20,
    backgroundColor: "#ddd",
    marginHorizontal: 5,
    borderRadius: 30,
  },
  seatItem: {
    margin: 4,
    padding: 10,
    borderWidth: 1,
    borderRadius: 15,
    width: width * 0.15,
    height: height * 0.1,
    justifyContent: "center",
    alignItems: "center",
  },
  seatNumber: {
    fontSize: 16,
    fontWeight: "600",
  },
  available: {
    backgroundColor: "#e0ffe0",
    borderColor: "#32CD32",
  },
  unavailable: {
    backgroundColor: "#f4f4f4",
    borderColor: "#ddd",
  },
  selected: {
    backgroundColor: "#ADD8E6",
    borderColor: "#007bff",
  },
  finishButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    elevation: 5,
  },
  finishButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 10,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#fff",  // Nền trắng để không bị che mất nội dung
    paddingVertical: 10,
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
  confirmed: { 
    backgroundColor: "red", 
    borderColor: "darkred",
  },
  pending: { 
    backgroundColor: "yellow", 
    borderColor: "gold",
  },
  complete: { 
    backgroundColor: "#d3d3d3", 
    borderColor: "#a9a9a9",
  },
});
