import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: "#F8F9FB",
    paddingHorizontal: width * 0.04,
    paddingTop: height * 0.02,
  },
  headerImage: {
    width: "100%",
    height: height * 0.25,
    resizeMode: "cover",
    borderRadius: 12,
    marginBottom: 12,
  },
  searchForm: {
    backgroundColor: "#fff",
    padding: width * 0.05,
    borderRadius: 15,
    marginTop: -height * 0.015,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: width * 0.035,
    fontSize: width * 0.045,
    color: "#333",
    backgroundColor: "#F9FAFC",
  },
  roundTrip: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: height * 0.015,
  },
  roundTripLabel: {
    fontSize: width * 0.045,
    color: "#333",
  },
  searchButton: {
    backgroundColor: "#007AFF",
    paddingVertical: height * 0.018,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#007AFF",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  searchButtonText: {
    color: "#fff",
    fontSize: width * 0.05,
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: width * 0.05,
    fontWeight: "bold",
    color: "#333",
    marginTop: height * 0.03,
    paddingHorizontal: width * 0.03,
  },
  recentSearches: {
    paddingVertical: 10,
    paddingHorizontal: width * 0.03,
  },
  recentItem: {
    backgroundColor: "#fff",
    padding: width * 0.045,
    borderRadius: 12,
    marginBottom: width * 0.03,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  recentText: {
    fontSize: width * 0.045,
    fontWeight: "600",
    color: "#333",
  },
  recentDate: {
    fontSize: width * 0.04,
    color: "#888",
    marginTop: 3,
  },
});
