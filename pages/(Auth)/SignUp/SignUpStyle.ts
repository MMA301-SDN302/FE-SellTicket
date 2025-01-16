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

  textInputContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,

    height: 44,
    width: 320,
    borderColor: "gray",
    borderWidth: 1,
    paddingLeft: 10,
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
    marginBottom: 95,
  },

  buttonContinue: {
    width: "100%",
    gap: 16,
    borderRadius: 20,
  },

  textError: {
    color: "red",
    fontSize: 12,

    width: "100%",
    alignItems: "flex-start",
  },
});
