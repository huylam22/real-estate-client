import { instance } from "../api/axios";
import { authUpdateUser } from "../store/auth/auth-slice";
import { getToken, saveToken } from "../utils/auth";

export default function useRefreshToken() {
  async function refresh() {
    const { refresh_token } = getToken();
    if (!refresh_token) return null;
    const response = await instance.post("api/v1/auth/refresh-token", null, {
      headers: {
        Authorization: `Bearer ${refresh_token}`,
      },
    });
    if (!response.data) return null;
    saveToken(response.data.access_token, response.data.refresh_token);
    authUpdateUser((prev) => ({
      ...prev,
      accessToken: response?.data?.access_token,
      refreshToken: response?.data?.refresh_token,
    }));
    return response?.data?.access_token || "";
  }
  return refresh;
}
