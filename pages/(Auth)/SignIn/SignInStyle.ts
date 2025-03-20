import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  signInContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    width: 309,
  },
  imageSignIn: {
    width: " 100%",
    height: 233,
  },

  textForgotContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },

  titleWelcome: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  buttonContinue: {
    width: "100%",
    textAlign: "center",
    borderRadius: 20,
  },

  textRememberMe: {
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
    paddingTop: 2,

    color: "#A0A0A0",
    width: "100%",
    marginBottom: 24,
    gap: 5,
  },
});
