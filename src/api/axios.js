import axios from "axios";
import { getToken } from "../utils/auth";
import { apiURL } from "./propertyApi";
const { access_token } = getToken();
export const instance = axios.create({
  baseURL: `${apiURL}`,
});

export const axiosPrivate = axios.create({
  baseURL: `${apiURL}`,
  headers: {
    "Content-Type": "application/json",
    "Cache-Contyrol": "no-cache",
  },
});
