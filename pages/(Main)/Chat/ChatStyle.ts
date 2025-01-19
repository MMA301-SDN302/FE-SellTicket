import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chatList: {
    padding: 10,
  },
  chatItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: "#f0f0f0",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  chatInfo: {
    flex: 1,
  },
  chatName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  chatMessage: {
    fontSize: 14,
    color: "#555",
  },
  chatTime: {
    fontSize: 12,
    color: "#fff",
  },
  seen: {
    fontSize: 12,
    color: "#fff",
  },
});
