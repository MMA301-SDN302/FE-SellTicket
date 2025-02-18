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
    marginTop: 12,
  },
});
