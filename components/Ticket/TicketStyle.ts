import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  ticketContainer: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",

    width: "100%",
    height: 50,
    backgroundColor: "#2a3266",

    borderBottomWidth: 1,
    borderCurve: "continuous",
    borderBottomColor: "gray",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  headerText: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",

    marginLeft: "15%",
    letterSpacing: 5,
  },
  priceBox: {
    display: "flex",
    justifyContent: "center",

    backgroundColor: "#fff",
    height: "100%",
    width: "40%",

    borderBottomLeftRadius: 40,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 10,
  },
  price: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    display: "flex",
  },
  priceText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#c4230e",
  },
  detailTicket: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",

    width: "50%",
    borderRightWidth: 1,
    borderStyle: "dashed",
    height: "auto",
    gap: 20,
  },
  detailBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",

    width: "100%",
    gap: 10,
    padding: 5,
  },
  location: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",

    width: "50%",
    height: 150,
  },
  locationText: {
    fontWeight: "bold",
    fontSize: 24,
    color: "#0c1440",
  },
  inforTicket: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",

    width: "100%",
  },
  inforText: {
    fontSize: 18,
    color: "gray",
  },
  detailText: {
    fontSize: 18,
    color: "#0c1440",
    fontWeight: "bold",
    width: "auto",
  },
  dateText: {
    color: "#0c1440",
  },
});
