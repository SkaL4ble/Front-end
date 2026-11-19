import { api } from "./api/api";

export interface Usuario {
  id: string;
  nome: string;
  emailPessoal: string;
  senha: string;
  nomeGithub: string;
  emailGithub: string;
  cargo: string;
  atuacao: string;
  Ativo: boolean;
}
interface ListarFuncionarios{
    nome:string,
    nomeGithub:string,
    cargo:string,
    atuacao:string
}

export async function ListarFuncionarios(funcionario: ListarFuncionarios) {
    try {
        const response = await api.get('/funcionarios', {
            params: {
                nome: funcionario.nome,
                nomeGithub: funcionario.nomeGithub,
                cargo: funcionario.cargo,
                atuacao: funcionario.atuacao
            }
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao listar funcionários:", error);
        throw error;
    }
}