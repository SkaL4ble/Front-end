import { ListarFuncionarios, Usuario } from "../@types/usuario";
import { api } from "./api/api";

export const UsuarioService = {
    async ListarFuncionario(): Promise<Usuario>{
        const response = await api.get<Usuario>("Usuario");

        return response.data
    }
}