import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  profileContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    paddingTop: -20,
    padding: 80,
  },
  avatarStyle: {
    height: 100,
    width: 100,
    borderRadius: 50,
    marginBottom: 20,
  },

  genderButton: {
    flexDirection: "row",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 20,
    width: "100%",
  },
  buttonGender: {
    marginTop: 2,
    paddingVertical: 12,
    paddingHorizontal: 20,
    width: "30%",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "gray",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonActive: {
    backgroundColor: "#4D5995",
  },
  buttonText: {},
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 200,
  },
});
