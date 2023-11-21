import { call, put } from "redux-saga/effects";
import {
  requestAuthRegister,
  requestAuthLogin,
  requestAuthRefreshToken,
} from "./auth-requests";
import { toast } from "react-toastify";
import { authUpdateUser } from "./auth-slice";
import { getToken, logOut, saveToken } from "../../utils/auth";
// import { authUpdateUser } from "./auth-slice";

export default function* handleAuthRegister(action) {
  const { payload } = action;
  try {
    const response = yield call(requestAuthRegister, payload);
    if (response.status === 200) {
      saveToken(response.data.access_token, response.data.refresh_token);
      toast.success(
        "Create new account successfully! Redirecting to home page"
      );
      yield put(
        authUpdateUser({
          user: response.data.user,
          accessToken: response.data.access_token,
          refreshToken: response.data.refresh_token,
        })
      );
    }
    // console.log(response);
  } catch (error) {
    toast.error(error.response.data.errorMessage);
  }
  yield 1;
}

function* handleAuthLogin(action) {
  try {
    const response = yield call(requestAuthLogin, action.payload);
    if (response.data.access_token && response.data.refresh_token) {
      saveToken(response.data.access_token, response.data.refresh_token);
      yield put(
        authUpdateUser({
          user: response.data.user,
          accessToken: response.data.access_token,
          refreshToken: response.data.refresh_token,
        })
      );
    }
    toast.success("Login successfully!");
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.errorMessage);
  }
  yield 1;
}

function* handleAuthRefreshToken({ payload }) {
  try {
    const response = yield call(requestAuthRefreshToken, payload);
    // console.log(response);
    if (response) {
      saveToken(response.data.access_token, response.data.refresh_token);
      yield put(
        authUpdateUser({
          user: response.data.user,
          accessToken: response.data.access_token,
          refreshToken: response.data.refresh_token,
        })
      );
    } else {
    }
  } catch (error) {}
}

function* handleAuthLogout() {
  yield put(authUpdateUser({}));
  logOut();
  toast.success("Logout successfully!");
}

export { handleAuthLogin, handleAuthRefreshToken, handleAuthLogout };
