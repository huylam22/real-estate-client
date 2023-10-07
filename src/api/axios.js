import axios from "axios";
import { getToken } from "../utils/auth";
// import { apiURL } from "./propertyApi";

export const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const axiosPrivate = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
    "Cache-Contyrol": "no-cache",
  },
});
