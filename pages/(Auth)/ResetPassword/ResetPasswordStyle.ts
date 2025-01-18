import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
