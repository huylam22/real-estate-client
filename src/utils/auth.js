import Cookies from "js-cookie";

const domain = "master.dct2mhtymjoyx.amplifyapp.com";
const accessTokenKey = "app_access_token";
const refreshTokenKey = "app_refresh_token";
const objectCookies = {
  expires: 30,
  domain: domain,
};

export const saveToken = (access_token, refresh_token) => {
  if (access_token && refresh_token) {
    Cookies.set(accessTokenKey, access_token, { ...objectCookies });
    Cookies.set(refreshTokenKey, refresh_token, { ...objectCookies });
  } else {
    Cookies.remove(accessTokenKey, {
      ...objectCookies,
      path: "/",
      domain: domain,
    });
    Cookies.remove(refreshTokenKey, {
      ...objectCookies,
      path: "/",
      domain: domain,
    });
  }
};

export const getToken = () => {
  const access_token = Cookies.get(accessTokenKey);
  const refresh_token = Cookies.get(refreshTokenKey);
  return { access_token, refresh_token };
};

export const logOut = () => {
  const access_token = Cookies.get(accessTokenKey);
  if (access_token) {
    Cookies.remove(accessTokenKey, {
      ...objectCookies,
      path: "/",
      domain: domain,
    });
    Cookies.remove(refreshTokenKey, {
      ...objectCookies,
      path: "/",
      domain: domain,
    });
  }
};
