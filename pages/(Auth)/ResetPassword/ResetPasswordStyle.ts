import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  centeredView: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: 45,
    width: "80%",
    justifyContent: "center",
    marginBottom: 40,
  },
  imageSignUp: {
    width: "100%",
    height: 220,
  },
  modalView: {
    width: "90%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modalText: {
    textAlign: "center",
    width: "80%",
    fontSize: 24,
  },
  buttonContinue: {
    width: "65%",
    gap: 16,
    borderRadius: 20,
    marginBottom: 10,
    marginTop: 40,
  },
});
