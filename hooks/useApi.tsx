import { useCallback, useEffect, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";
import ERROR_CODES from "../data/ErrorCode";
import { AsyncStorageLocal } from "../utils/AsyncStorageLocal";
import { ErrorResponse } from "../types/ApiTypes";
import { useSpinner } from "./useSpinner";
import { useAuth } from "./useAuth";
type useApiReturn<ResponseType> = {
  data: ResponseType;
  loading: boolean;
  error: ErrorResponse;
  fetchData: (payload?: Record<string, any>) => Promise<ResponseType>;
};

type useApiProps = {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  security?: boolean;
  disableSpinner?: boolean;
  options?: AxiosRequestConfig<any>;
};

const useApi = <ResponseType extends Record<string, any>>({
  url,
  method,
  security = false,
  disableSpinner = false,
  options,
}: useApiProps): useApiReturn<ResponseType> => {
  const [data, setData] = useState<ResponseType>({} as ResponseType);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorResponse>({} as ErrorResponse);
  const { userInfo, setUserInfo } = useAuth();
  const { showSpinner, hideSpinner } = useSpinner();

  const AxiosInstant = axios.create({
    baseURL: "http://",
    timeout: 15000, // 15 second timeout
  });

  AxiosInstant.interceptors.response.use((response: any) => {
    return response;
  });

  const handleError = useCallback(async (error: any, payload: any) => {
    // Check for network errors
    if (error.message === 'Network Error') {
      setLoading(false);
      const networkError: ErrorResponse = {
        status: '0',
        code: 0,
        message: 'Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng của bạn.',
        error_code: 'NETWORK_ERROR',
      };
      setError(networkError);
      return networkError;
    }
    
    // Check for timeout
    if (error.code === 'ECONNABORTED') {
      setLoading(false);
      const timeoutError: ErrorResponse = {
        status: '408',
        code: 408,
        message: 'Yêu cầu đã hết thời gian chờ. Vui lòng thử lại sau.',
        error_code: 'REQUEST_TIMEOUT',
      };
      setError(timeoutError);
      return timeoutError;
    }
    
    if (error.code === 403 && error.error_code === ERROR_CODES.JWT_EXPIRED) {
      try {
        const res = await axios.post(
          "http://192.168.1.208:8080/v1/api/auth/refresh-token",
          {
            refreshToken: userInfo?.token.refreshToken,
          },
          { timeout: 10000 } // 10 second timeout for token refresh
        );
        setUserInfo({
          token: {
            accessToken: res.data?.metadata?.accessToken,
            refreshToken: res.data?.metadata?.refreshToken,
          },
          user: userInfo!.user,
        });

        await AsyncStorageLocal.set(
          "access_token",
          res.data?.metadata?.accessToken
        );
        await AsyncStorageLocal.set(
          "refresh_token",
          res.data?.metadata?.refreshToken
        );
        // Call the original API again after refreshing the token
        await fetchData(payload);
      } catch (err: any) {
        // Handle logout or other error scenarios
        setLoading(false);
        const refreshError: ErrorResponse = {
          status: err.response?.status?.toString() || '401',
          code: 401,
          message: 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.',
          error_code: 'AUTH_REFRESH_FAILED',
        };
        setError(refreshError);
        return refreshError;
      }
    } else {
      setLoading(false);
      const customError: ErrorResponse = {
        status: error.status?.toString() || error.response?.status?.toString() || '500',
        code: typeof error.code === 'number' ? error.code : 500,
        message: error.message || 'Đã xảy ra lỗi. Vui lòng thử lại sau.',
        error_code: error.error_code || 'UNKNOWN_ERROR',
      };
      setError(customError);
      return customError;
    }
  }, []);

  const fetchData = useCallback(
    async (payload?: Record<string, any>) => {
      setLoading(true);
      if (!disableSpinner) {
        showSpinner();
      }

      let configOptions: AxiosRequestConfig = {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 15000, // 15 second timeout
      };

      // Log payload for debugging
      console.log(`Preparing API request to ${url} with payload:`, payload);

      if (method === "GET" && payload) {
        configOptions = {
          ...configOptions,
          params: payload,
        };
      } else if (payload) {
        // Ensure payload is properly formatted for POST/PUT/etc
        configOptions = {
          ...configOptions,
          data: payload,
        };
        
        // For POST methods, log the final request data
        if (method === "POST") {
          console.log(`POST request data for ${url}:`, JSON.stringify(payload));
        }
      }
      
      if (userInfo?.token?.accessToken && security) {
        configOptions = {
          ...configOptions,
          headers: {
            ...configOptions.headers,
            Authorization: `Bearer ${userInfo.token.accessToken}`,
          },
        };
      }

      // Get the host from environment or use fallback
      const host = process.env.EXPO_PUBLIC_HOST || "http://192.168.1.208:8080";
      console.log("API Host:", host);

      try {
        console.log(`Making API request to: ${host}${url} with payload:`, payload);
        const res = await axios({
          method,
          url: `${host}${url}`,
          ...configOptions,
          ...options,
        });
        
        // Validate response data structure
        if (!res.data || res.data === undefined) {
          throw new Error('Invalid response format');
        }
        
        console.log(`API response from ${url}:`, res.data);
        
        setData(res.data?.metadata as ResponseType);
        setLoading(false);
        return Promise.resolve(res.data?.metadata as ResponseType);
      } catch (error: any) {
        console.log('API Error:', error);
        const errors = await handleError(error?.response?.data || error, payload);
        setLoading(false);
        if (!disableSpinner) {
          hideSpinner();
        }
        return Promise.reject(errors);
      } finally {
        if (!disableSpinner) {
          hideSpinner();
        }
        setLoading(false);
      }
    },
    [url, method, options, security]
  );

  return { data, loading, error, fetchData };
};

export default useApi;
