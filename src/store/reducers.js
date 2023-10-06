import authReducer from "./auth/auth-slice";
import { combineReducers } from "@reduxjs/toolkit";

export const reducer = combineReducers({
  auth: authReducer,
});
