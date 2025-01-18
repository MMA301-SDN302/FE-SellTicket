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
    marginBottom: 45,
  },

  buttonContinue: {
    width: "100%",
    gap: 16,
    borderRadius: 20,
    marginBottom: 10,
  },

  textRememberMe: {
    flexDirection: "row",
    display: "flex",
    alignItems: "center",

    color: "#A0A0A0",
    width: "100%",
    marginBottom: 40,
    gap: 5,
  },
});
