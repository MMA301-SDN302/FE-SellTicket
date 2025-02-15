import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  signUpContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 309,
  },

  imageSignUp: {
    width: "100%",
    height: 233,
  },

  textForgotContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",

    marginBottom: 40,
    width: 320,
  },

  titleWelcome: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 32,
  },

  buttonContinue: {
    width: "100%",
    gap: 16,
    borderRadius: 20,
  },
});
