import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  signInContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 309,
  },
  imageSignIn: {
    width: "100%",
    height: 233,
  },
  textInputContainer: {
    height: 44,
    width: 320,
    borderColor: "gray",
    borderWidth: 1,
    paddingLeft: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    gap: 10,
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
});
