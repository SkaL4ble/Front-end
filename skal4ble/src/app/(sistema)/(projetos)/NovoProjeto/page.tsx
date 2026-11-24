"use client";

import React, { useEffect, useEffectEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { StatusProjetoService } from "@/src/services/api/statusProjetoService";
import { StatusProjeto } from "@/src/@types/statusProjeto";
import { TipoProjetoService } from "@/src/services/api/tipoProjeto";
import { TipoProjeto } from "@/src/@types/tipoProjeto";
import { CriarProjeto } from "@/src/@types/projeto";
import { projetoService } from "@/src/services/api/projetoService";

export default function CadastroProjetos() {
  const router = useRouter();
  const [status, setStatus] = useState<StatusProjeto[]>([]);
  const [tipo, setTipo] = useState<TipoProjeto[]>([]);

  const [nome, setNome] = useState<string>("");
  const [prazo, setPrazo] = useState<string>("");
  const [linkRepositorio, setLinkRepositorio] = useState<string>("");
  const [statusSelecionado, setStatusSelecionado] = useState<number>(1);
  const [tipoSelecionado, setTipoSelecionado] = useState<number>(1);
  const [descricao, setDescricao] = useState<string>("");


  async function listarStatus() {
    const listaStatus = await StatusProjetoService.ListarStatusProjeto();
    setStatus(listaStatus)
  }

    async function listarTipo() {
    const listaTipo = await TipoProjetoService.ListarStatusProjeto();
    setTipo(listaTipo)
  }

  async function SalvarProduto(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try{
      const dados: CriarProjeto = {
        nomeProjeto : nome,
        prazo,
        linkRepositorio,
        statusProjetoId: statusSelecionado,
        tipoProjetoId: tipoSelecionado,
        descricao,
      }

      await projetoService.cadastrarProjeto(dados)
    } catch(error: any){
      console.log(error);
    }
  }

  useEffect(() =>{
    listarStatus();
    listarTipo();
  },[])
  return (
    <>
      <header className="header-form">
        <h1>Novo Projeto</h1>
      </header>

      <form
        onSubmit={SalvarProduto}
        className="container-25op form-card flex-1"
      >
        <div className="form-grid">
          {/* Coluna Esquerda */}
          <div className="column" style={{ gap: "1.1rem" }}>
            <div className="form-group">
              <h3>Nome</h3>
              <input
              value={nome}
              onChange={(e) => setNome(e.target.value)}
                type="text"
                name="nome"
                className="input-card"
                required
              />
            </div>

            <div className="form-group">
              <h3>Prazo</h3>
              <input
              value={prazo}
              onChange={(e) => setPrazo(e.target.value)}
                type="date"
                name="prazo"
                className="input-card"
                required
              />
            </div>

            <div className="form-group">
              <h3>Link do repositório</h3>
              <input
              value={linkRepositorio}
              onChange={(e) => setLinkRepositorio(e.target.value)}
                type="url"
                name="linkRepositorio"
                className="input-card"
              />
            </div>
          </div>

          {/* Coluna Direita */}
          <div className="column" style={{ gap: "1.1rem" }}>

            <div className="form-group">
              <h3>Status</h3>
              <div className="campo-select">
                <select
                value={statusSelecionado}
                onChange={(e) => setStatusSelecionado(Number(e.target.value))}
                  name="status"
                  id="status"
                  className="select select-card"
                  defaultValue=""
                  required
                >
                  {status.map((item) => 
                    <option value={item.statusProjetoId} key={item.statusProjetoId}>{item.nomeStatusProjeto}</option>
                  )}
                </select>
                <img src="/icon/IDown.svg" alt="" className="button-icon" />
              </div>
            </div>

            <div className="form-group">
              <h3>Descrição</h3>
              <input
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                type="text"
                name="descricao"
                className="input-card"
                required
              />
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button
            type="button"
            onClick={() => router.back()}
            className="big-button-voltar"
          >
            Voltar
          </button>
          <button type="submit" className="big-button">
            Cadastrar
          </button>
        </div>
      </form>
    </>
  );
}