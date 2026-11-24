import { Usuario } from "../@types/usuario";
import { api } from "./api/api";

export const UsuarioService = {
    async ListarUsuarios(params?: any): Promise<Usuario[]> {
        const response = await api.get<Usuario[]>("Usuario", { params });
        return response.data;
    }
};