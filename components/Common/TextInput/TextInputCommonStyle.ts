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
    height: 20,
    fontSize: 12,
    alignItems: "flex-start",
    width: "100%",
    marginTop: 5,
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
  buttonGender: {
    marginTop: 2,
    paddingVertical: 10,
    width: "30%",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "gray",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonActive: {
    backgroundColor: "#D6E9FF",
    color: "#0E73F6",
  },
  buttonText: {
    color: "#0E73F6",
  },
});
