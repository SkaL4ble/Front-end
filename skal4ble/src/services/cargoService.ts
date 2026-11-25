import { api } from "./api/api";
import { cargo } from "@/src/@types/cargo";

export const cargoService = {
    async ListarCargo(): Promise<cargo[]>{
        const response = await api.get<cargo[]>("Cargo");
        
        return response.data
    }
}