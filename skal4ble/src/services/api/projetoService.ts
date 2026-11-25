import { CriarProjeto, Projeto } from "@/src/@types/projeto";
import { api } from "./api";

export const projetoService = {
    async ListarProjetos(): Promise<Projeto[]> {
        const response = await api.get<Projeto[]>("Projeto");

        return response.data;
    },

    async cadastrarProjeto(dados: CriarProjeto): Promise<void> {
        try {
            const formData = new FormData();

            formData.append("Nome", dados.nomeProjeto);
            formData.append("Descricao", dados.descricao ?? "");
            formData.append("Prazo", dados.prazo ?? "");
            formData.append("LinkRepositorio", dados.linkRepositorio);
            formData.append("StatusId", dados.statusProjetoId.toString());
            formData.append("TipoId", dados.tipoProjetoId.toString());

            console.log(Object.fromEntries(formData));
            await api.post("Projeto", formData);

        } catch (error: any) {
            throw new Error(
                error.response?.data?.message || "Erro ao cadastrar projeto."
            );
        }
    },
}
