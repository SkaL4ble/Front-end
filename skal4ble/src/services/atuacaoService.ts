import { api } from "./api/api";
import { atuacao } from "@/src/@types/atuacao";

export const atuacaoService = {
    async ListarAtuacao(): Promise<atuacao[]>{
        const response = await api.get<atuacao[]>("Atuacao");
        
        return response.data
    }
}