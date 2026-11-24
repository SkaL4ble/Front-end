import { StatusProjeto } from "@/src/@types/statusProjeto";
import { api } from "./api";

export const StatusProjetoService = {
    async ListarStatusProjeto(): Promise<StatusProjeto[]>{
        const response = await api.get<StatusProjeto[]>("StatusProjeto");

        return response.data
    }
}