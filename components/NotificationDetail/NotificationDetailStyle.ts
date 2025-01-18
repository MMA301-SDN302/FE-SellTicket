import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: "90%",
    backgroundColor: "#f9f9f9",
    borderRadius: 15,
    marginVertical: 3,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  box: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  detailMess: {
    flex: 1,
    marginLeft: 15,
  },
  mess: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  time: {
    fontSize: 14,
    color: "#777",
    marginTop: 5,
  },
  icon: {
    backgroundColor: "#eaf4ff",
    padding: 10,
    borderRadius: 25,
  },
  statusIcon: {
    marginLeft: 10,
  },
});
