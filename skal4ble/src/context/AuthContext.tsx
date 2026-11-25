"use client";

import { jwtDecode } from "jwt-decode";
import { AuthContextData, Login, UsuarioAuth, UsuarioPayload } from "../@types/autenticacao";
import { autenticacaoService, NEXT_PUBLIC_TOKEN_KEY} from "../services/api/autenticacaoService";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import secureLocalStorage from "react-secure-storage";
import { useRouter } from "next/navigation";


const AuthContext = createContext<AuthContextData | null>(null)

const CLAIM = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/";
const CLAIM_ROLE = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";

export function decodificarToken(token: string): UsuarioAuth | null{
    try{
        const decoded = jwtDecode<UsuarioPayload>(token)

         if (decoded.exp && decoded.exp * 1000 < Date.now()) return null;

        return{
            nome: decoded[`${CLAIM}name` as keyof UsuarioPayload] as string || "",
            email: decoded[`${CLAIM}emailaddress` as keyof UsuarioPayload] as string || "",
            usuarioId: decoded[`${CLAIM}nameidentifier` as keyof UsuarioPayload] as string || "",
            role: decoded[CLAIM_ROLE],
        }
    } catch{
        return null;
    }
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const router = useRouter();
    const [usuario, setUsuario] = useState<UsuarioAuth | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const tokenSalvo = secureLocalStorage.getItem(NEXT_PUBLIC_TOKEN_KEY);

        if (typeof tokenSalvo === "string") {
            const usuarioDecodificado = decodificarToken(tokenSalvo);

            if (usuarioDecodificado) {
                setToken(tokenSalvo);
                setUsuario(usuarioDecodificado);
            } else {
                secureLocalStorage.removeItem(NEXT_PUBLIC_TOKEN_KEY); // inválido ou expirado
            }
        }

        setLoading(false);
    }, []);

    async function login(dados: Login) {
        const novoToken = await autenticacaoService.Login(dados); // já salva o token

        const usuarioDecodificado = decodificarToken(novoToken);
        if (!usuarioDecodificado) throw new Error("Token inválido");

        setToken(novoToken);
        setUsuario(usuarioDecodificado);
    }

    async function logout() {
        secureLocalStorage.removeItem(NEXT_PUBLIC_TOKEN_KEY);
        setToken(null);
        setUsuario(null);
        router.replace("/Login"); // ajuste para a sua rota de login
    }

    return (
        <AuthContext.Provider value={{ usuario, token, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth deve ser usado dentro de um AuthProvider");
    return context;
}