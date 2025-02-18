import {
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

type ButtonProps = {
  buttonTitle: string;
  buttonStyle?: StyleProp<TextStyle>;
  titleStyle?: StyleProp<TextStyle>;
  onPress: () => void;
  disabled?: boolean;
  options?: TouchableOpacityProps;
};

const Button = ({
  buttonTitle,
  buttonStyle,
  titleStyle,
  onPress,
  options,
  disabled = false,
}: ButtonProps) => {
  return (
    <TouchableOpacity
      style={[
        {
          backgroundColor: "#007BFF",
          padding: 10,
          borderRadius: 16,
          alignItems: "center",
          justifyContent: "center",
          marginTop: 20,
        },
        buttonStyle,
        disabled && { backgroundColor: "#B0C4DE" },
      ]}
      onPress={onPress}
      disabled={disabled}
      {...options}
    >
      <Text
        style={[
          {
            color: "#FFFFFF",
            fontSize: 16,
          },
          titleStyle,
        ]}
      >
        {buttonTitle}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
