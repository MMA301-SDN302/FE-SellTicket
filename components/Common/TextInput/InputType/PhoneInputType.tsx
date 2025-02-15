import { DimensionValue, StyleProp, TextStyle, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import PhoneInput, { PhoneInputProps } from "react-native-phone-number-input";
import { StyleSheet } from "react-native";
import TitleInput from "./TitleInput";
import { IInputTypeProps } from "./type";

const PhoneInputType = ({
  options,
  w,
  style,
  value,
  title = "",
  placeholder = "Input your phone number",
  icon = "call",
  onChangeText,
}: IInputTypeProps) => {
  return (
    <>
      <TitleInput title={title} />
      <View style={[styles.textInputContainer, { width: w ?? "100%" }]}>
        <Ionicons name={icon} size={24} color="#4D5995" />
        <PhoneInput
          containerStyle={styles.containerStylePhone}
          countryPickerButtonStyle={styles.countryPickerButtonStyle}
          textContainerStyle={styles.textContainerStyle}
          textInputStyle={{
            backgroundColor: "",
            height: 44,
            ...(style as object),
          }}
          defaultCode="VN"
          layout="second"
          disableArrowIcon={true}
          value={value as string}
          onChangeText={onChangeText}
          placeholder={placeholder}
          {...options}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
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
  containerStylePhone: {
    height: 44,
    width: "100%",
    borderColor: "gray",
    backgroundColor: "",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  countryPickerButtonStyle: {
    height: "100%",
    width: "15%",
    borderColor: "gray",
    borderRightWidth: 1,
  },
  textContainerStyle: {
    backgroundColor: "",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PhoneInputType;
