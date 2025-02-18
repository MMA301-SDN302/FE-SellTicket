import { TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../TextInputCommonStyle";
import TitleInput from "./TitleInput";
import { useState } from "react";
import { IInputTypeProps } from "./type";

const PasswordInputType = ({
  options,
  w,
  style,
  value,
  title = "",
  placeholder = "Nhập mật khẩu",
  icon = "key",
  onChangeText,
}: IInputTypeProps) => {
  const [showPassword, setShowPassword] = useState(false);
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
            paddingRight: 56,
            ...(style as object),
          }}
          selectionColor={"gray"}
          value={value as string}
          onChangeText={onChangeText}
          placeholder={placeholder}
          secureTextEntry={!showPassword}
          {...options}
        />
        <TouchableOpacity
          style={{ position: "absolute", right: 10 }}
          onPress={() => {
            setShowPassword(!showPassword);
          }}
        >
          <Ionicons
            name={showPassword ? "eye" : "eye-off"}
            size={24}
            color="#4D5995"
          />
        </TouchableOpacity>
      </TouchableOpacity>
    </>
  );
};

export default PasswordInputType;
