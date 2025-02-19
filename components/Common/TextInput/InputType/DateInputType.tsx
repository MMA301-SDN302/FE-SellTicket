import { TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { styles } from "../TextInputCommonStyle";
import TitleInput from "./TitleInput";
import { useState } from "react";
import { IInputTypeProps } from "./type";

const DateInputType = ({
  options,
  w,
  style,
  value,
  title = "",
  icon = "calendar",
  onChangeText,
  placeholder = "Chọn ngày",
}: IInputTypeProps) => {
  const [show, setShow] = useState(false);

  const showDatepicker = () => {
    setShow(true);
  };

  const onChange = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setShow(false);
      onChangeText && onChangeText(selectedDate.toISOString());
    }
  };

  const formatDate = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  return (
    <>
      {show && (
        <DateTimePicker
          display="spinner"
          value={value ? new Date(value) : new Date()}
          mode={"date"}
          onChange={(_, date) => onChange(date ?? new Date())}
        />
      )}
      <TitleInput title={title} />
      <TouchableOpacity
        style={[styles.textInputContainer, { width: w ?? "100%" }]}
        onPress={showDatepicker}
      >
        <>
          <Ionicons name={icon} size={24} color="#4D5995" />
          <TextInput
            style={style}
            selectionColor={"gray"}
            editable={false}
            value={value ? formatDate(new Date(value)) : ""}
            placeholder={placeholder}
            {...options}
          />
        </>
      </TouchableOpacity>
    </>
  );
};

export default DateInputType;
