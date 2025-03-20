import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "auto",
    borderRadius: 4,
    marginHorizontal: 10,
    backgroundColor: "white",
  },
  box: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
    position: "relative"
  },
  icon: {
    padding: 10,
    backgroundColor: "#f0f4f9",
    borderRadius: 50,
    marginRight: 10
  },
  detailMess: {
    flex: 1,
    paddingRight: 15
  },
  mess: {
    color: "#333",
    fontSize: 14,
    marginBottom: 4
  },
  unreadMess: {
    fontWeight: "bold",
    color: "#000"
  },
  time: {
    color: "#999",
    fontSize: 12
  },
  statusIcon: {
    position: "absolute",
    top: 10,
    right: 10
  }
});
