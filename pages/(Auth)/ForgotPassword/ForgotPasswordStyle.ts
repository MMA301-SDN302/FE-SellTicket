import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  forgotPasswordContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    width: 309,
  },

  imageForgotPassword: {
    width: " 100%",
    height: 233,
  },

  textInputContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: 44,
    width: "100%",
    paddingLeft: 10,

    borderColor: "gray",
    borderWidth: 1,
    gap: 10,
  },

  textForgotContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },

  title: {
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

  textError: {
    color: "red",
    fontSize: 12,

    alignItems: "flex-start",
    width: "100%",
  },
});
