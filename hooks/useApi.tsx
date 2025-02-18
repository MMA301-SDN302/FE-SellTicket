import { useCallback, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";
import ERROR_CODES from "../data/ErrorCode";
import { AsyncStorageLocal } from "../utils/AsyncStorageLocal";
import { ErrorResponse } from "../types/ApiTypes";
type useApiReturn<ResponseType> = {
  data: ResponseType;
  loading: boolean;
  error: ErrorResponse;
  fetchData: (payload?: Record<string, any>) => Promise<ResponseType>;
};

type useApiProps = {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  options?: AxiosRequestConfig<any>;
};

const useApi = <ResponseType extends Record<string, any>>({
  url,
  method,
  options,
}: useApiProps): useApiReturn<ResponseType> => {
  const [data, setData] = useState<ResponseType>({} as ResponseType);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorResponse>({} as ErrorResponse);

  const handleError = useCallback(async (error: any, payload: any) => {
    if (error.code === 403 && error.error_code === ERROR_CODES.JWT_EXPIRED) {
      const refreshToken = await AsyncStorageLocal.get("refresh_token");
      try {
        const res = await axios.post(
          "http://10.12.32.63:8080/v1/api/auth/refresh-token",
          {
            refreshToken,
          }
        );
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
        setError(err.response?.data || { message: "Failed to refresh token" });
      }
    } else {
      setLoading(false);
      const customError: ErrorResponse = {
        status: error.status,
        code: error.code,
        message: error.message,
        error_code: error.message,
      };
      setError(customError);
      return customError;
    }
  }, []);

  const fetchData = useCallback(
    async (payload?: Record<string, any>) => {
      setLoading(true);

      let configOptions: AxiosRequestConfig = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      if (method === "GET" && payload) {
        configOptions = {
          ...configOptions,
          params: payload,
        };
      } else {
        configOptions = {
          ...configOptions,
          data: payload,
        };
      }

      console.log(2);
      const host = process.env.EXPO_PUBLIC_HOST;

      try {
        const res = await axios({
          method,
          url: `${host}${url}`,
          ...configOptions,
          ...options,
        });
        setData(res.data?.metadata as ResponseType);
        setLoading(false);
        return Promise.resolve(res.data?.metadata as ResponseType);
      } catch (error: any) {
        console.log(error);

        const errors = await handleError(error?.response?.data, payload);
        return Promise.reject(errors);
      }
    },
    [url, method, options, handleError]
  );

  return { data, loading, error, fetchData };
};

export default useApi;
