import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  headerContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 100,
    paddingTop: 10,
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
});
