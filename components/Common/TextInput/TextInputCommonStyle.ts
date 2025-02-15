import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  textInputContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: 44,
    width: "100%",
    paddingLeft: 10,

    borderColor: "gray",
    borderWidth: 1,
    gap: 10,
  },
  textError: {
    color: "red",
    fontSize: 12,
    alignItems: "flex-start",
    width: "100%",
  },
  containerStylePhone: {
    height: 44,

    width: "100%",
    borderColor: "gray",
    backgroundColor: "",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  countryPickerButtonStyle: {
    backgroundColor: "",
    height: "100%",
    width: "15%",
    borderColor: "gray",
    borderRightWidth: 1,
  },
  textContainerStyle: {
    backgroundColor: "",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
