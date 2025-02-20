import React, { createContext, useState, useEffect, ReactNode } from "react";
import { AsyncStorageLocal } from "../utils/AsyncStorageLocal";

interface UserInfo {
  user: {
    userId: string;
    dateOfBirth?: string;
    displayName: string;
    email?: string;
    phoneNumber: string;
    gender: string;
    avatar?: string;
  };
  token: {
    accessToken: string;
    refreshToken: string;
  };
}

// Định nghĩa kiểu cho Context
type AuthContextType = {
  isLoading: boolean;
  saveUser: (userInfo: UserInfo) => Promise<void>;
  clearUser: () => Promise<void>;
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
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userInfo, setUserInfo] = useState<UserInfo | undefined>(undefined);

  // Hàm đăng nhập
  const saveUser = async (userInfo: UserInfo) => {
    await AsyncStorageLocal.set("access_token", userInfo.token.accessToken);
    await AsyncStorageLocal.set("refresh_token", userInfo.token.refreshToken);
    await AsyncStorageLocal.set("user", JSON.stringify(userInfo.user));
    setUserInfo(userInfo);
    setIsLoading(false);
  };

  // Hàm đăng xuất
  const clearUser = async () => {
    setUserInfo(undefined);
    await AsyncStorageLocal.remove("access_token");
    await AsyncStorageLocal.remove("refresh_token");
    await AsyncStorageLocal.remove("user");
    setIsLoading(false);
  };

  // Kiểm tra trạng thái đăng nhập khi khởi động ứng dụng
  useEffect(() => {
    const checkLoginStatus = async () => {
      const accessToken = await AsyncStorageLocal.get("access_token");
      const refreshToken = await AsyncStorageLocal.get("refresh_token");
      const user = await AsyncStorageLocal.get("user");
      if (accessToken && refreshToken && user) {
        setUserInfo({
          user: JSON.parse(user),
          token: { accessToken, refreshToken },
        });
      }
      setIsLoading(false);
    };

    checkLoginStatus();
  }, []);

  const value = React.useMemo(
    () => ({ isLoading, saveUser, clearUser, userInfo, setUserInfo }),
    [isLoading, saveUser, clearUser, userInfo, setUserInfo]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook sử dụng AuthContext
