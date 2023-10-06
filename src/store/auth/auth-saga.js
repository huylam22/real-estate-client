import { takeEvery, takeLatest } from "redux-saga/effects";
import {
  authLogOut,
  authLogin,
  authRefreshToken,
  authRegister,
} from "./auth-slice";
import handleAuthRegister, {
  handleAuthLogin,
  handleAuthRefreshToken,
  handleAuthLogout,
} from "./auth-handlers";

export default function* authSaga() {
  yield takeLatest(authRegister.type, handleAuthRegister);
  yield takeEvery(authLogin.type, handleAuthLogin);
  yield takeEvery(authRefreshToken.type, handleAuthRefreshToken);
  yield takeLatest(authLogOut.type, handleAuthLogout);
}
