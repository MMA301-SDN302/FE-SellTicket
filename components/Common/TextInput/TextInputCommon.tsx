import { View, Text } from "react-native";

import { styles } from "./TextInputCommonStyle";
import PhoneInputType from "./InputType/PhoneInputType";
import DateInputType from "./InputType/DateInputType";
import { TextInputCommonProps } from "./InputType/type";
import EmailInputType from "./InputType/EmailInputType";
import PasswordInputType from "./InputType/PasswordInputType";
import TextInputType from "./InputType/TextInputType";
import { useState } from "react";
import CheckBoxInputType from "./InputType/CheckBoxType";

const TextInputCommon = ({
  type,
  value,
  onChangeText,
  placeholder,
  w, // width
  textTitle,
  options,
  style,
  icon,
  error = "",
  checkBoxOptions,
}: TextInputCommonProps) => {
  const inputComponent: { [key: string]: any } = {
    phone: (
      <PhoneInputType
        value={typeof value === "string" ? value : ""}
        w={w}
        options={options}
        style={style}
        title={textTitle || ""}
        placeholder={placeholder}
        onChangeText={onChangeText}
        icon={icon}
      />
    ),
    date: (
      <DateInputType
        value={value instanceof Date ? value : new Date()}
        title={textTitle || ""}
        options={options}
        placeholder={placeholder}
        onChangeText={onChangeText}
        w={w}
        style={style}
      />
    ),
    email: (
      <EmailInputType
        value={typeof value === "string" ? value : ""}
        w={w}
        style={style}
        options={options}
        title={textTitle || ""}
        placeholder={placeholder}
        onChangeText={onChangeText}
        icon={icon}
      />
    ),
    text: (
      <TextInputType
        value={typeof value === "string" ? value : ""}
        w={w}
        style={style}
        options={options}
        title={textTitle || ""}
        placeholder={placeholder}
        onChangeText={onChangeText}
        icon={icon}
      />
    ),
    password: (
      <PasswordInputType
        value={typeof value === "string" ? value : ""}
        w={w}
        style={style}
        options={options}
        title={textTitle || ""}
        placeholder={placeholder}
        onChangeText={onChangeText}
        icon={icon}
      />
    ),
    checkbox: (
      <CheckBoxInputType
        value={typeof value === "string" ? value : ""}
        w={w}
        style={style}
        options={options}
        title={textTitle || ""}
        placeholder={placeholder}
        onChangeText={onChangeText}
        icon={icon}
        checkBoxOptions={checkBoxOptions}
      />
    ),
  };

  return (
    <View
      style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "flex-end",
        width: w ?? "100%",
        height: 70,
      }}
    >
      {inputComponent[type as string]}
      <Text style={styles.textError}>{error}</Text>
    </View>
  );
};

export default TextInputCommon;
