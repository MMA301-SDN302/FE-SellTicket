import React, { useEffect, useState } from "react";
import { View, Button, TouchableOpacity, Text } from "react-native";
import { TextInputCommonProps } from "../TextInput/InputType/type";
import useFormBasic from "../../../hooks/useFormBasic";
import { FormAreaProps, FormErrors } from "./Type";

const FormArea = <T extends Record<string, any>>({
    children,
    onSubmit,
    initialValues,
    buttonTitle = "Submit",
    wrapStyle = {},
    buttonStyle = {},
    titleStyle = {},
}: FormAreaProps<T>) => {
    const { handleSubmit, values, handleChange, errorsMessage } =
        useFormBasic<T>(initialValues);
    const [errors, setErrors] = useState<FormErrors<T>>({});

    useEffect(() => {
        React.Children.map(children, (child) => {
            if (
                React.isValidElement<TextInputCommonProps>(child) &&
                child.props.fieldName
            ) {
                setErrors((prev) => ({
                    ...prev,
                    [child.props.fieldName]: {
                        required: child.props.required || false,
                        minLength: child.props.minLength || 0,
                        maxLength: child.props.maxLength || 200,
                        pattern: child.props.pattern || "",
                        patternMess: child.props.patternMess || "",
                        errorName: child.props.errorName || child.props.fieldName,
                    },
                }));
            }
        });
    }, [children]);
    const render = () => {
        return React.Children.map(children, (child) => {
            if (React.isValidElement<TextInputCommonProps>(child)) {
                return React.cloneElement<TextInputCommonProps>(child, {
                    onChangeText: (value: string) =>
                        handleChange(child.props.fieldName, value),
                    value: values[child.props.fieldName],
                    error: errorsMessage[child.props.fieldName],
                });
            }
            return child;
        });
    };

    return (
        <View
            style={[
                {
                    width: "100%",
                    padding: 10,
                    justifyContent: "center",
                    alignItems: "center",
                },
                wrapStyle,
            ]}
        >
            {render()}
            <TouchableOpacity
                style={[{
                    backgroundColor: '#007BFF',
                    padding: 10,
                    borderRadius: 5,
                    alignItems: 'center',
                    justifyContent: 'center',
                }, buttonStyle]}
                onPress={() => handleSubmit(onSubmit, errors)}
            >
                <Text style={[{
                    color: '#FFFFFF',
                    fontSize: 16
                }, titleStyle]} > {buttonTitle} </Text>
            </TouchableOpacity>
        </View>
    );
};

export default FormArea;
