export interface Usuario {
    usuarioId: string,
    nomeUsuario: string,
    emailPessoal: string,
    tipoUsuario: string,
    cargo: string,
    atuacao: string,
    imagem: string,


}
export interface ListarFuncionarios{
    usuarioId: string,
    nomeUsuario:string,
    emailPessoal:string,
    cargo:string,
    atuacao:string
}