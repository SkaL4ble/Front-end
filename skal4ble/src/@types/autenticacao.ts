export interface Login{
    email: string,
    senha: string
}

export interface LoginResponse{
    token: string
}

export interface UsuarioPayload {
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"?: string,
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"?: string,
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"?: string,
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"?: string,
    exp?: number,
    iss?: string,
    aud?: string
}

export interface UsuarioAuth {
    nome: string,
    email: string,
    usuarioId: string,
    role?: string
}

export interface AuthContextData{
    usuario: UsuarioAuth | null,
    token: string | null,
    loading: boolean,
    login: (dados: Login) => Promise<void>,
    logout: () => Promise<void>;
}