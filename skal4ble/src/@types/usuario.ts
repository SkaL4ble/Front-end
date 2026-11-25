export interface Usuario {
    usuarioId: string,
    nomeUsuario: string;
    nomeGithub: string;
    emailPessoal: string;
    emailGithub: string;
    atuacaoId: number;
    cargoId: number;
    dataInsercao?: string | Date;
    aptoAEnsinar: boolean;
    fotoFuncionario?: string;
}

export interface ListarUsuarios{
    usuarioId: string,
    nomeUsuario:string,
    emailPessoal:string,
    cargo:string,
    atuacao:string
}

export interface CriarFuncionario {
    nomeUsuario: string;
    nomeGithub: string;
    emailPessoal: string;
    emailGithub: string;
    atuacaoId: number;
    cargoId: number;
    dataInsercao?: string | Date;
    aptoAEnsinar: boolean;
    fotoFuncionario?: string;
}