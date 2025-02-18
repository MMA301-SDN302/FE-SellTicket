import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";
import { AsyncStorageLocal } from "../utils/AsyncStorageLocal";

interface UserInfo {
  _id: string;
  dateOfBirth: string;
  displayName: string;
  email?: string;
  phoneNumber: string;
  gender: string;
  avatar: string;
}

// Định nghĩa kiểu cho Context
type AuthContextType = {
  userToken: string | null;
  isLoading: boolean;
  login: (token: string) => void;
  logout: () => void;
  userInfo: UserInfo | undefined;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo | undefined>>;
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
  const [userInfo, setUserInfo] = useState<UserInfo | undefined>(undefined);

  // Hàm đăng nhập
  const login = (token: string) => {
    setUserToken(token);
    AsyncStorageLocal.set("userToken", token);
    setUserInfo({
      _id: "abc",
      dateOfBirth: "ssdazsd",
      displayName: "Thanh Thuy",
      email: "string",
      phoneNumber: "string",
      gender: "string",
      avatar: "../assets/Auth.png",
    });
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
        setUserToken(token);
        setUserInfo({
          _id: "abc",
          dateOfBirth: "ssdazsd",
          displayName: "Thanh Thuy",
          email: "string",
          phoneNumber: "string",
          gender: "string",
          avatar: "../assets/Auth.png",
        });
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
