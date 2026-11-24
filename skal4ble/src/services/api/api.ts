import axios from "axios";
import secureLocalStorage from "react-secure-storage"

const apiLocal = "https://localhost:7225/api/";

const apiRemota = "";

export const api = axios.create({
    baseURL: apiLocal
})

api.interceptors.request.use((config) => {
    const token = secureLocalStorage.getItem("Token");

    if(token){
        config.headers.Authorization = "Bearer " + token;
    }

    console.log(config)
    return config;
});

