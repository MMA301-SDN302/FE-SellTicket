import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";
import { AsyncStorageLocal } from "../utils/AsyncStorageLocal";
import type { UserResponse } from "../pages/(Auth)/SignIn/Types";

// Định nghĩa kiểu cho Context
type AuthContextType = {
  userToken: string | null;
  isLoading: boolean;
  login: (token: string) => void;
  logout: () => void;
  userInfo: UserResponse | undefined;
  setUserInfo: React.Dispatch<React.SetStateAction<UserResponse | undefined>>;
};

// Tạo Context với kiểu dữ liệu
export const AuthContext = createContext<AuthContextType | null>(null);

// Định nghĩa kiểu cho AuthProvider props
type AuthProviderProps = {
  children: ReactNode;
};

// Tạo Provider
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userInfo, setUserInfo] = useState<UserResponse | undefined>(undefined);

  // Hàm đăng nhập
  const login = (token: string) => {
    setUserToken(token);
    AsyncStorageLocal.set("userToken", token);

    const userData: UserResponse = {
      userId: "abc",
      dateOfBirth: new Date("2003-04-27"),
      displayName: "Thanh Thuy",
      email: "ntthanhthuy@gmail.com",
      phoneNumber: "0123456789",
      gender: "Female",
      avatar: require("../assets/Auth.png"),
    };

    setUserInfo(userData);
    AsyncStorageLocal.set("userInfo", JSON.stringify(userData));
    setIsLoading(false);
  };

  // Hàm đăng xuất
  const logout = () => {
    setUserToken(null);
    setUserInfo(undefined);
    AsyncStorageLocal.remove("userToken");
    setIsLoading(false);
  };

  // Kiểm tra trạng thái đăng nhập khi khởi động ứng dụng
  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorageLocal.get("userToken");
      if (token) {
        login(token);
      }
      setIsLoading(false);
    };

    checkLoginStatus();
  }, []);

  return (
    <AuthContext.Provider
      value={{ userToken, isLoading, login, logout, userInfo, setUserInfo }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook sử dụng AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
