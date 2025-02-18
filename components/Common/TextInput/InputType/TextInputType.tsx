import {
  DimensionValue,
  StyleProp,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import TitleInput from "./TitleInput";
import { styles } from "../TextInputCommonStyle";
import { IInputTypeProps } from "./type";

const TextInputType = ({
  options,
  w,
  style,
  onChangeText,
  value,
  title = "",
  placeholder = "",
  icon = "pencil",
}: IInputTypeProps) => {
  return (
    <>
      <TitleInput title={title} />
      <TouchableOpacity
        style={[styles.textInputContainer, { width: w ?? "100%" }]}
      >
        <Ionicons name={icon} size={24} color="#4D5995" />
        <TextInput
          style={{
            width: "90%",
            height: "100%",
            borderColor: "gray",
            ...(style as object),
          }}
          selectionColor={"gray"}
          value={value as string}
          onChangeText={onChangeText}
          placeholder={placeholder}
          {...options}
        />
      </TouchableOpacity>
    </>
  );
};

export default TextInputType;
