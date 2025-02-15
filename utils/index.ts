const validateEmail = (email: string) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};
export function ValidateEmail(email: string) {
  if (email == "") {
    return "Please input email";
  } else if (!validateEmail(email)) {
    return "Please input email format";
  }
  return "";
}
export function ValidatePassword(password: string) {
  if (password === "") {
    return "Please input password";
  } else if (password.length < 8) {
    return "Password must be at least 8 characters";
  }
  return "";
}

export function ValidateUserName(userName: string) {
  if (userName === "") {
    return "Please input your name";
  }
  return "";
}
//
export function CheckUserAccount(phone: string, password?: string) {
  if (password === undefined) {
    if (phone === "admin") {
      return true;
    }
  } else if (phone === "admin" && password === "12345678") {
    return true;
  }
  return false;
}
export const checkFormError = (fields: string[]) => {
  const hasError = fields
    .map((field) => {
      return field !== "";
    })
    .includes(true);

  return hasError;
};
export const CheckConfirmPassword = (
  password: string,
  confirmPassword: string
) => {
  return password !== confirmPassword ? "New password is not double" : "";
};

export const ValidateText = (text: string, fieldName: string) => {
  if (text === "") {
    return `Please input ${fieldName}`;
  }
  return "";
};

export const validateVietnamesePhoneNumber = (phone: string) => {
  const re = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
  const isValid = re.test(phone);
  if (!isValid) {
    return "Please input VietNam phone number";
  }
  return "";
};
