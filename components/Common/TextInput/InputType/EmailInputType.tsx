import { DimensionValue, StyleProp, TextInput, TextInputProps, TextStyle, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../TextInputCommonStyle";
import TitleInput from "./TitleInput";
import { IInputTypeProps } from "./type";

const EmailInputType = ({
    options,
    w,
    style,
    value = '',
    title = '',
    placeholder = "Input Your Email",
    icon = "mail",
    onChangeText,
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
                    editable
                    value={typeof value === 'string' ? value : value.toString()}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    {...options} />

            </TouchableOpacity>
        </>
    )
}

export default EmailInputType;