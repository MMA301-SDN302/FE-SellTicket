import {
  DimensionValue,
  StyleProp,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import TitleInput from "./TitleInput";
import { styles } from "../TextInputCommonStyle";
import { checkboxList, IInputTypeProps } from "./type";
import CheckBox from "@react-native-community/checkbox";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useEffect, useState } from "react";

const CheckBoxInputType = ({
  options,
  w,
  style,
  onChangeText,
  value,
  title = "",
  placeholder = "",
  icon = "pencil",
  checkBoxOptions,
}: IInputTypeProps) => {
  const { defaultValue, labels = [], type } = checkBoxOptions || {};
  const [checked, setChecked] = useState<Array<checkboxList>>([]);

  const handleSingleCheckBox = (index: number) => {
    setChecked((prev) => {
      const newChecked = prev.map((item, i) => {
        if (i === index) {
          return {
            ...item,
            checked: true,
          };
        }
        return {
          ...item,
          checked: false,
        };
      });
      return newChecked;
    });
    onChangeText && onChangeText(labels[index].value);
  };

  useEffect(() => {
    if (defaultValue) {
      labels?.forEach((item: any) => {
        if (defaultValue.includes(item.value)) {
          setChecked((prev) => [
            ...prev,
            {
              title: item.title,
              value: item.value,
              checked: true,
            },
          ]);
        } else {
          setChecked((prev) => [
            ...prev,
            {
              title: item.title,
              value: item.value,
              checked: false,
            },
          ]);
        }
      });
    }
  }, []);
  if (type === "single") {
    return (
      <View
        style={[
          styles.textInputContainer,
          {
            borderWidth: 0,
            flexWrap: "wrap",
            justifyContent: "space-between",
          },
          style,
        ]}
      >
        {labels?.map((item: any, index: any) => {
          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.buttonGender,
                checked[index]?.checked && styles.buttonActive,
              ]}
              onPress={() => handleSingleCheckBox(index)}
            >
              <Text style={checked[index]?.checked && styles.buttonText}>
                {item.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
  return <>hello</>;
};

export default CheckBoxInputType;
