import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 8,
  },
  box: {
    width: 50,
    height: 50,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    justifyContent: "space-evenly",
  },
  button: {
    paddingHorizontal: 8,
    paddingVertical: 10,
    borderRadius: 4,
    backgroundColor: "#fff",
    alignSelf: "flex-start",
    marginHorizontal: "1%",
    marginBottom: 6,
    textAlign: "center",
  },
  selected: {
    backgroundColor: "#82ABDD",
    borderWidth: 0,
  },
  buttonLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: "#4D5995",
  },
  selectedLabel: {
    color: "white",
  },
  label: {
    color: "#0c1440",
    textAlign: "center",
    marginBottom: 10,
    fontSize: 28,
  },
});
