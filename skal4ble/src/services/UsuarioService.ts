import { api } from "./api/api";

export interface Usuario {
    usuarioId: string,
    nomeUsuario: string,
    emailPessoal: string,
    tipoUsuario: string,
    cargo: string,
    atuacao: string,
    imagem: string,


}
interface ListarFuncionarios{
    nomeUsuario:string,
    emailPessoal:string,
    cargo:string,
    atuacao:string
}

export async function ListarFuncionarios(funcionario: ListarFuncionarios) {
    try {
        const response = await api.get('/Usuario', {
            params: {
                nome: funcionario.nomeUsuario,
                nomeGithub: funcionario.emailPessoal,
                cargo: funcionario.cargo,
                atuacao: funcionario.atuacao
            }
        });
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error("Erro ao listar funcionários:", error);
        throw error;
    }
}