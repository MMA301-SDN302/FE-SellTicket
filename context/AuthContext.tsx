// AuthContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from 'react';

// Định nghĩa kiểu cho Context
type AuthContextType = {
    userToken: string | null;
    isLoading: boolean;
    login: (token: string) => void;
    logout: () => void;
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

    // Hàm đăng nhập
    const login = (token: string) => {
        setUserToken(token);
        // Lưu token vào AsyncStorage hoặc SecureStore nếu cần
        // AsyncStorage.setItem('userToken', token);
        setIsLoading(false);
    };

    // Hàm đăng xuất
    const logout = () => {
        setUserToken(null);
        // Xóa token từ AsyncStorage hoặc SecureStore nếu cần
        // AsyncStorage.removeItem('userToken');
        setIsLoading(false);
    };

    // Kiểm tra trạng thái đăng nhập khi khởi động ứng dụng
    useEffect(() => {
        const checkLoginStatus = async () => {
            // Kiểm tra xem có token trong AsyncStorage hoặc SecureStore không
            // const token = await AsyncStorage.getItem('userToken');
            const token = null; // Thay bằng logic lấy token từ AsyncStorage
            if (token) {
                setUserToken(token);
            }
            setIsLoading(false);
        };

        checkLoginStatus();
    }, []);

    return (
        <AuthContext.Provider value={{ userToken, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};