import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
    marginBottom: 40,
  },
  imageSignUp: {
    width: "100%",
    height: 220,
  },
  // modalView: {
  //   width: "80%",
  //   display: "flex",
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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
