import axios from "axios";
import secureLocalStorage from "react-secure-storage"


const apiRemota = "";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use((config) => {
    const token = secureLocalStorage.getItem("Token");

    if(token){
        config.headers.Authorization = "Bearer " + token;
    }
    return config;
});