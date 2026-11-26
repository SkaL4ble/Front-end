export interface Projeto 
{
  projetoId: string,
  nome: string,
  descricao: string,
  linkRepositorio: string,
  autorId: string,
  nomeAutor: string,
  statusId: number,
  status: string,
  tipoId: number,
  nomeTipo: string,
  prazo: string,
  quantidadeColaboradores: number,
  dataCriacao: string
}

export interface CriarProjeto {
  nomeProjeto: string;
  prazo: string | null;
  descricao: string | null;
  linkRepositorio: string;
  statusProjetoId: number;
  tipoProjetoId: number;
}

export interface StatusProjeto{
    statusProjetoId: number,
    nomeStatusProjeto: string
}

export interface TipoProjeto{
    tipoProjetoId: number,
    nomeTipoProjeto: string
}