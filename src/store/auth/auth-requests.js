import { instance } from "../../api/axios";

export const requestAuthRegister = (data) => {
  return instance.post("api/v1/auth/register", {
    ...data,
  });
};

export const requestAuthLogin = (data) => {
  return instance.post("api/v1/auth/authenticate", {
    ...data,
  });
};

export const requestAuthRefreshToken = (token) => {
  if (!token) return;
  return instance.post("api/v1/auth/refresh-token", null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
