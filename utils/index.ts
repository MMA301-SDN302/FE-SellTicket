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

export function CheckUserAccount(email: string, password?: string) {
  if (password === undefined) {
    if (email === "admin@gmail.com") {
      return true;
    }
  } else if (email === "admin@gmail.com" && password === "12345678") {
    return true;
  }
  return false;
}
export const checkFormError = (fields: string[], isError: boolean) => {
  const hasError =
    fields.map((field) => field === "").includes(true) || isError;
  return hasError;
};
