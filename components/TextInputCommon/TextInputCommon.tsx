import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  DimensionValue,
  TouchableOpacity,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import PhoneInput from "react-native-phone-number-input";

import { styles } from "./TextInputCommonStyle";
import { ValidateEmail, ValidatePassword, ValidateUserName } from "../../utils";

type typeTextInput = "phone" | "email" | "name" | "password" | "date" | null;

interface textInputCommonProps {
  type: typeTextInput;
  value?: string;
  setValue?: React.Dispatch<React.SetStateAction<string>>;
  valueDate?: Date;
  setValueDate?: React.Dispatch<React.SetStateAction<Date>>;
  setIsError?: React.Dispatch<React.SetStateAction<boolean>>;
  errorMess?: string;
  newError?: string;
  placeholder?: string;
  w?: DimensionValue | undefined;
  iconMaterial?: string;
  iconIon?: string;
  textTitle?: string;
  showError: boolean;
}

const TextInputCommon = ({
  type,
  value,
  setValue,
  errorMess,
  valueDate,
  setValueDate,
  showError, // true: show error
  placeholder,
  w, // width
  iconMaterial,
  iconIon,
  textTitle,
  setIsError,
  newError,
}: textInputCommonProps) => {
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (selectedDate: Date | undefined) => {
    const currentDate = selectedDate;
    setShow(false);
    currentDate && setValueDate && setValueDate(currentDate);
  };

  const showMode = (currentMode: any) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const [showPassword, setShowPassword] = useState(!(type == "password"));
  const phoneInput = useRef<PhoneInput>(null);
  const [valid, setValid] = useState(false);

  // Hàm định dạng ngày theo định dạng dd/MM/yyyy
  const formatDate = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  if (newError && newError != "") {
    errorMess = newError;
  } else if (showError) {
    switch (type) {
      case "email":
        errorMess = ValidateEmail(value || "");
        break;
      case "password":
        errorMess = ValidatePassword(value || "");
        break;
      case "name":
        errorMess = ValidateUserName(value || "");
        break;
      case "phone":
        if (!valid) {
          errorMess = "Phone number not correct format";
        }
        break;
      case "date":
        if (!valueDate) {
          errorMess = "Please select a date.";
        }
        break;
      default:
        errorMess = "";
        break;
    }

    const hasError = errorMess !== "";
    setIsError && setIsError(hasError);
  }

  if (!iconMaterial || !iconIon) {
    switch (type) {
      case "email":
        iconMaterial = "email";
        break;
      case "password":
        iconIon = "key";
        break;
      case "name":
        iconIon = "person-sharp";
        break;
      case "phone":
        iconIon = "call";
        break;
      case "date":
        iconIon = "calendar";
        break;
      default:
        break;
    }
  }

  if (!placeholder) {
    switch (type) {
      case "email":
        placeholder = "Input email";
        break;
      case "phone":
        placeholder = "Input phone";
        break;
      case "name":
        placeholder = "Input your name";
        break;
      case "password":
        placeholder = "Input password";
        break;
      default:
        break;
    }
  }

  return (
    <View
      style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        width: "100%",
      }}
    >
      {/* Show date */}
      {show && (
        <DateTimePicker
          display="spinner"
          value={valueDate || new Date(1598051730000)}
          mode={"date"}
          onChange={(_, date) => onChange(date)}
        />
      )}
      {/* Title */}
      {textTitle && (
        <Text
          style={{
            color: "gray",
            paddingBottom: 3,
          }}
        >
          {textTitle}
        </Text>
      )}
      {/* Phone */}
      {type == "phone" ? (
        <View style={[styles.textInputContainer, { width: w ?? "100%" }]}>
          <Ionicons name={iconIon as any} size={24} color="#4D5995" />

          <PhoneInput
            ref={phoneInput}
            containerStyle={styles.containerStylePhone}
            countryPickerButtonStyle={styles.countryPickerButtonStyle}
            textContainerStyle={styles.textContainerStyle}
            textInputStyle={{
              backgroundColor: "",
              height: 44,
            }}
            defaultValue={value}
            placeholder={"Input phone number"}
            defaultCode="VN"
            layout="second"
            onChangeText={(text) => {
              setValue && setValue(text);
              const checkValid = phoneInput.current?.isValidNumber(text);
              setValid(checkValid ? checkValid : false);
            }}
            autoFocus
          />
        </View>
      ) : (
        <TouchableOpacity
          style={[styles.textInputContainer, { width: w ?? "100%" }]}
          onPress={() => {
            type == "date" && showDatepicker();
          }}
        >
          <>
            {iconMaterial && (
              <MaterialCommunityIcons
                name={iconMaterial as any}
                size={24}
                color="#4D5995"
              />
            )}
            {iconIon && (
              <Ionicons name={iconIon as any} size={24} color="#4D5995" />
            )}

            <TextInput
              style={{ width: 220, height: "100%", borderColor: "gray" }}
              placeholder={placeholder}
              selectionColor={"gray"}
              editable={type != "date"}
              value={
                type == "date" && valueDate
                  ? formatDate(valueDate) // Hiển thị ngày dạng dd/MM/yyyy
                  : value
              }
              onChangeText={(text) => {
                setValue && setValue(text);
              }}
              secureTextEntry={type == "password" && !showPassword}
            />
            {type == "password" && (
              <TouchableOpacity
                style={{ marginRight: 10 }}
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
            )}
          </>
        </TouchableOpacity>
      )}
      <Text style={styles.textError}>{showError && errorMess}</Text>
    </View>
  );
};

export default TextInputCommon;
