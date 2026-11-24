import { api } from "./api";
import { TipoProjeto } from "@/src/@types/tipoProjeto";

export const TipoProjetoService = {
    async ListarStatusProjeto(): Promise<TipoProjeto[]>{
        const response = await api.get<TipoProjeto[]>("TipoProjeto");
        
        return response.data
    }
}