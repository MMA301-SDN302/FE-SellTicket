import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 5,
    backgroundColor: "#82ABDD",
    paddingTop: 10,
  },
  containerView: {
    alignItems: "center",
    gap: 20,
    color: "red",
  },
  textNoDisplay: {
    fontSize: 20,
    marginTop: "5%",
    color: "#0c1440",
    fontStyle: "italic",
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 50,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#0c1440",
  },
  errorContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 50,
  },
  errorText: {
    fontSize: 16,
    color: "#ff0000",
    textAlign: "center",
    marginBottom: 15,
  },
  retryButton: {
    backgroundColor: "#0c1440",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  retryButtonText: {
    color: "white",
    fontSize: 16,
  }
});

