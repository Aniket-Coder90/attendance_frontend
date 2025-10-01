import { Dispatch, Middleware, MiddlewareAPI } from "@reduxjs/toolkit";
import axios from "axios";

import { TRootState } from "../types/store";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

// Variable to hold the promise while refreshing the token
let isRefreshing = false;
let failedQueue: Array<() => void> = [];

const setupInterceptors = (storeApi: MiddlewareAPI<Dispatch, TRootState>) => {
  // Response interceptor
  axiosInstance.interceptors.response.use(
    (response) => {
      // Estimate response size in KB
      let responseSize = 0;
      try {
        const stringifiedData = JSON.stringify(response.data);
        responseSize = new TextEncoder().encode(stringifiedData).length / 1024;
      } catch (err) {
        console.warn("Failed to calculate response size", err);
      }

      return response;
    },
    async (error) => {
      if (axios.isCancel(error)) {
        return Promise.reject(error);
      }
      // If responseType is 'blob' and response data is Blob
      return Promise.reject(error);
    }
  );
};

const apiMiddleware: Middleware<object, TRootState> = (storeApi) => {
  setupInterceptors(storeApi);
  return (next) => (action) => {
    next(action);
  };
};

export default axiosInstance;
export { apiMiddleware };
