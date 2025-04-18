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
    elevation: 4,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  swapButton: {
    position: "absolute",
    right: 10,
    top: height * 0.035,
    transform: [{ translateX: width * 0.07 }],
    backgroundColor: "#E0E0E0",
    padding: 8,
    borderRadius: 20,
    elevation: 3,
  },
  roundTrip: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: height * 0.015,
  },
  roundTripLabel: {
    fontSize: width * 0.045,
    fontWeight: "500",
    color: "#333",
  },
  searchButton: {
    backgroundColor: "#007AFF",
    paddingVertical: height * 0.018,
    borderRadius: 12,
    alignItems: "center",
    marginTop: height * 0.015,
  },
  searchButtonText: {
    color: "#fff",
    fontSize: width * 0.05,
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: width * 0.045,
    fontWeight: "bold",
    color: "#333",
    marginTop: height * 0.02,
    marginBottom: height * 0.01,
  },
  recentSearches: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: height * 0.01,
    paddingHorizontal: width * 0.04,
    elevation: 3,
  },
  recentItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: height * 0.012,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  recentText: {
    fontSize: width * 0.042,
    color: "#333",
    fontWeight: "500",
  },
  recentDate: {
    fontSize: width * 0.035,
    color: "#666",
  },
  suggestionsContainer: {
    position: "absolute",
    top: height * 0.15, 
    left: 0,
    right: 0, 
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 5, 
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    maxHeight: 200, 
    overflow: "hidden", 
    zIndex: 1000, 
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
});
