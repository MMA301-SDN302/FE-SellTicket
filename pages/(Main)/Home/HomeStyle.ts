import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#007bff",
    padding: 25,
  },
  headerTitle: {
    backgroundColor: "#007bff",
    padding: 5,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    width: 80,
    height: 30,
  },
  clock: {
    color: "#fff",
    fontSize: 18,
  },

  searchForm: {
    padding: 20,
    backgroundColor: "#fff",
    marginTop: -15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    elevation: 5,
  },
  inputLabel: {
    fontSize: 14,
    color: "#0c1440",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#0c1440",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
    color: "#4D5995",
  },
  roundTrip: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  roundTripLabel: {
    fontSize: 16,
    color: "#333",
  },
  searchButton: {
    backgroundColor: "#0c1440",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  searchButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  recentSearches: {
    paddingLeft: 30,
    marginTop: 5,
  },
  recentItem: {
    marginBottom: 10,
  },
  recentText: {
    fontSize: 16,
    color: "#333",
  },
  recentDate: {
    fontSize: 14,
    color: "#999",
  },

  warning: {
    color: "#black",
    backgroundColor: "yellow",
    fontSize: 14,
    padding: 20,
    margin: 7,
    textAlign: "center",
    borderRadius: 10,
  },

  additionalInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  infoItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    margin: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    elevation: 5,
  },
  infoText: {
    fontSize: 16,
    color: "#333",
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    padding: 20,
  },
});
