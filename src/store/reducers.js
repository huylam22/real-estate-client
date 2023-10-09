import authReducer from "./auth/auth-slice";
import { combineReducers } from "@reduxjs/toolkit";
import globalSlice from "./globalSlice";

export const reducer = combineReducers({
  auth: authReducer,
  global: globalSlice,
});
