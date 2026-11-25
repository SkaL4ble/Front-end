
import { Usuario } from "../@types/usuario";
import { CriarFuncionario } from "../@types/usuario";
import { api } from "./api/api";

export const UsuarioService = {
    async ListarUsuarios(params?: any): Promise<Usuario[]> {
        const response = await api.get<Usuario[]>("Usuario", {
            params
        });

        return response.data;
    },

    async CadastrarUsuario(
        dados: CriarFuncionario
    ): Promise<Usuario> {
        const response = await api.post<Usuario>("Usuario", dados);

        return response.data;
    }
};
