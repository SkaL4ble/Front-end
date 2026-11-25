import secureLocalStorage from "react-secure-storage";
import { Login, LoginResponse } from "@/src/@types/autenticacao";
import { api } from "./api";

export const NEXT_PUBLIC_TOKEN_KEY = "Token";

export const autenticacaoService = {
    async Login(dados: Login): Promise<string> {
        try {
            const response = await api.post<LoginResponse>("Autenticacao/login", dados);
            const token = response.data.token;

            secureLocalStorage.setItem(NEXT_PUBLIC_TOKEN_KEY, token);
            return token;
        } catch {
            throw new Error("Email ou senha inválidos");
        }
    }
}