import React, { useEffect, useState } from "react";
import { View, Button, TouchableOpacity, Text } from "react-native";
import { TextInputCommonProps } from "../TextInput/InputType/type";
import useFormBasic from "../../../hooks/useFormBasic";
import { FormAreaProps, FormErrors } from "./Type";
import ButtonCommon from "../Button/ButtonCommon";
import { useChanges } from "../../../hooks/useChanges";

const FormArea = <T extends Record<string, any>>({
  children,
  onSubmit,
  initialValues,
  buttonTitle = "Submit",
  wrapStyle = {},
  titleStyle = {},
  disableChange = false,
}: FormAreaProps<T>) => {
  const tempValues = initialValues;
  const { handleSubmit, values, handleChange, errorsMessage } =
    useFormBasic<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors<T>>({});
  if (disableChange)
    disableChange = JSON.stringify(values) === JSON.stringify(tempValues);

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
            pattern: child.props.pattern || undefined,
            patternMess: child.props.patternMess || "",
            errorName: child.props.errorName || child.props.fieldName,
            isMatch: child.props.isMatch || "",
          },
        }));
      }
    });
  }, [children]);
  const render = () => {
    return React.Children.map(children, (child) => {
      if (React.isValidElement<TextInputCommonProps>(child)) {
        return React.cloneElement<TextInputCommonProps>(child, {
          onChangeText: (value: string | string[]) =>
            handleChange(child.props.fieldName, value as any),
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
      <ButtonCommon
        title={buttonTitle}
        onPress={() => handleSubmit(onSubmit, errors)}
        titleStyle={titleStyle}
        disabled={disableChange}
      />
    </View>
  );
};

export default FormArea;
