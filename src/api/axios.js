import axios from "axios";
import { useAuthStore } from "../store/authStore";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

API.interceptors.request.use(
  (config) => {

    const {
      accessToken
    } = useAuthStore.getState();

    if (accessToken) {

      config.headers.Authorization =
        `Bearer ${accessToken}`;

    }

    config.headers[
      "x-device-info"
    ] = navigator.userAgent;

    return config;

  }
);

API.interceptors.response.use(

  (response) => response,

  async (error) => {

    const originalRequest =
      error.config;

    if (
      originalRequest?.url?.includes(
        "/api/auth/refresh-token"
      )
    ) {

      return Promise.reject(
        error
      );

    }

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {

      originalRequest._retry = true;

      try {

        const {
          refreshToken
        } = useAuthStore.getState();

        const res =
          await axios.post(

            `${import.meta.env.VITE_API_URL}/api/auth/refresh-token`,

            {
              refreshToken,
            }

          );

        const accessToken =
          res.data.data.accessToken;

        useAuthStore
          .getState()
          .setAccessToken(
            accessToken
          );

        originalRequest.headers.Authorization =
          `Bearer ${accessToken}`;

        return API(
          originalRequest
        );

      } catch {

        useAuthStore
          .getState()
          .logout();

        window.location.href =
          "/login";

      }

    }

    return Promise.reject(
      error
    );

  }

);

export default API;