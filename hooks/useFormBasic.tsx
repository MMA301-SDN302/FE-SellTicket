import { useEffect, useState } from "react";
import { ErrorCondition, FormErrors } from "../components/Common/Form/Type";

type UseFormReturn<T> = {
  values: T;
  handleChange: (name: keyof T, value: string) => void;
  handleSubmit: (
    callback: (values: T) => void,
    errorCondition: FormErrors<T>
  ) => void;
  errorsMessage: {
    [key: string]: string;
  };
};

export type ErrorMessages = {
  [key: string]: string;
};

const useFormBasic = <T extends Record<string, any>>(
  initialValues: T
): UseFormReturn<T> => {
  const [values, setValues] = useState<T>(initialValues);
  const [errorsMessage, setErrorsMessage] = useState<ErrorMessages>({});
  const handleChange = (name: keyof T, value: string | Array<string>) => {
    setValues({
      ...values,
      [name]: value,
    });
  };

  const checkCondition = (errorCondition: FormErrors<T>) => {
    let errorsMessage: ErrorMessages = {};
    Object.keys(errorCondition).forEach((key) => {
      const mess = handleErrors(key, errorCondition[key]!);

      if (mess) {
        errorsMessage = {
          ...errorsMessage,
          [key]: mess,
        };
      }
    });
    setErrorsMessage(errorsMessage);
    return errorsMessage;
  };

  const handleErrors = (key: string, condition: ErrorCondition | undefined) => {
    const value = values[key];

    if (condition?.required && value === "") {
      return `Vui lòng nhập ${condition.errorName}`;
    } else if (condition?.minLength && value.length < condition.minLength) {
      return `${condition.errorName} phải có ít nhất ${condition.minLength} ký tự`;
    } else if (condition?.maxLength && value.length > condition.maxLength) {
      return `${condition.errorName} không được vượt quá ${condition.maxLength} ký tự`;
    } else if (condition?.pattern && !condition.pattern?.test(value)) {
      return condition.patternMess;
    }
    return null;
  };
  const handleSubmit = (
    callback: (values: T) => void,
    errorCondition: FormErrors<T>
  ) => {
    const mess = checkCondition(errorCondition);

    if (Object.keys(mess).length === 0) {
      callback(values);
    }
  };

  return {
    values,
    handleChange,
    handleSubmit,
    errorsMessage,
  };
};

export default useFormBasic;
