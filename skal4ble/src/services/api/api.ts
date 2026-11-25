import axios from "axios";
import secureLocalStorage from "react-secure-storage";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

if (!baseURL) {
  throw new Error("NEXT_PUBLIC_API_URL não foi configurada.");
}

export const api = axios.create({
  baseURL,
});

api.interceptors.request.use((config) => {
  const token = secureLocalStorage.getItem(
    process.env.NEXT_PUBLIC_TOKEN_KEY || "token"
  );

  console.log(config)

  if (typeof token === "string" && token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});