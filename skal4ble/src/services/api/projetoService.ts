import { Projeto } from "@/src/@types/projeto";
import { api } from "./api";

export const projetoService = {
    async ListarProjetos(): Promise<Projeto[]> {
        const response = await api.get<Projeto[]>("Projeto");
        
        return response.data;
    }
}