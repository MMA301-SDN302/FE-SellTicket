import { useState } from 'react';
import { ErrorCondition, FormErrors } from '../components/Common/Form/Type';

type UseFormReturn<T> = {
  values: T;
  handleChange: (name: keyof T, value: string) => void;
  handleSubmit: (callback: (values: T) => void, errorCondition: FormErrors<T>) => void;
  errorsMessage: {
    [key: string]: string;
  };
};

type ErrorMessages = {
  [key: string]: string;
}

const useFormBasic = <T extends Record<string, any>>(initialValues: T): UseFormReturn<T> => {
  const [values, setValues] = useState<T>(initialValues);
  const [errorsMessage, setErrorsMessage] = useState<ErrorMessages>({});
  const handleChange = (name: keyof T, value: string) => {
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
  }

  const handleErrors = (key: string, condition: ErrorCondition | undefined) => {
    const value = values[key];
    if (condition?.required && value === "") {
      return `${condition?.errorName} is required`;
    }
    if (condition?.minLength && value.length < condition.minLength) {
      return `${condition.errorName} must be at least ${condition.minLength} characters`;
    }
    if (condition?.maxLength && value.length > condition.maxLength) {
      return `${condition.errorName} must be at most ${condition.maxLength} characters`;
    }
    if (condition?.pattern && !new RegExp(condition?.pattern).test(value)) {
      return condition.patternMess;
    }
    return null;

  }
  const handleSubmit = (callback: (values: T) => void, errorCondition: FormErrors<T>) => {
    checkCondition(errorCondition);
    if (Object.keys(errorsMessage).length === 0) {
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
