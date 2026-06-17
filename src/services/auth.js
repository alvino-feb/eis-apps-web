import API from "../api/axios";

export const login =
  async (payload) => {

    const { data } =
      await API.post(
        "/api/auth/login",
        payload
      );

    return data;

  };

export const refreshToken =
  async (refreshToken) => {

    const { data } =
      await API.post(
        "/api/auth/refresh-token",
        {
          refreshToken,
        }
      );

    return data;

  };

export const logout =
  async () => {

    const { data } =
      await API.post(
        "/api/auth/logout"
      );

    return data;

  };