import { Platform, StyleSheet } from "react-native";
fontFamily: Platform.OS === "android" ? "Inter" : "sans-serif";

export const styles = StyleSheet.create({
  headerContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 100,
    paddingTop: 20,
  },
  welcomeText: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  welcomeTextName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0c1440",
  },
  welcomeTextHello: {
    fontSize: 16,
    color: "#0c1440",
  },
  welcomeTitle: {
    textAlign: "center",
    color: "#9c9eab",
    fontSize: 18,
    fontWeight: "500",
    fontFamily: "Inter",
    lineHeight: 20,
    gap: 5,
  },
  userName: {
    textAlign: "center",
    color: "#022e2f",
    fontSize: 24,
    fontWeight: "800",
    fontFamily: "Inter",
    lineHeight: 26,
    maxWidth: 150,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    height: 100,
  },
  drawerContent: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },

  menuBox: {
    width: 40,
    height: 40,
    borderRadius: "50%",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  logoStyle: {
    height: "100%",
    width: 100,
    resizeMode: "contain",
  },
  avatarStyle: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  iconContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
    marginTop: 10,
  },
  iconButton: {
    padding: 4,
    position: 'relative'
  }
});
