"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function CadastroFuncionarios() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica de cadastro aqui
  };

  return (
    <>
      <header className="header-form">
        <h1>Novo Funcionário</h1>
      </header>

      <form
        onSubmit={handleSubmit}
        className="container-25op form-card flex-1"
      >
        <div className="form-grid">
          {/* Coluna Esquerda */}
          <div className="column" style={{ gap: "1.1rem" }}>
            <div className="form-group">
              <h3>Nome</h3>
              <input type="text" name="nome" className="input-pill" required />
            </div>

            <div className="form-group">
              <h3>E-mail Pessoal</h3>
              <input
                type="email"
                name="emailPessoal"
                className="input-pill"
                required
              />
            </div>

            <div className="form-group">
              <h3>Atuação</h3>
              <div className="campo-select">
                <select
                  name="atuacao"
                  id="atuacao"
                  className="select select-pill"
                  defaultValue=""
                  required
                >
                  <option value="" disabled hidden></option>
                  <option value="front-end">Front-End</option>
                  <option value="back-end">Back-End</option>
                  <option value="full-stack">Full-Stack</option>
                </select>
                <img src="/icon/IDown.svg" alt="" className="button-icon" />
              </div>
            </div>

            <div className="form-group">
              <h3>Cargo</h3>
              <div className="campo-select">
                <select
                  name="cargo"
                  id="cargo"
                  className="select select-pill"
                  defaultValue=""
                  required
                >
                  <option value="" disabled hidden></option>
                  <option value="desenvolvedor">Desenvolvedor</option>
                  <option value="designer">Designer</option>
                  <option value="gerente">Gerente</option>
                </select>
                <img src="/icon/IDown.svg" alt="" className="button-icon" />
              </div>
            </div>
          </div>

          {/* Coluna Direita */}
          <div className="column" style={{ gap: "1.1rem" }}>
            <div className="form-group">
              <h3>Nome do Github</h3>
              <input
                type="text"
                name="githubUser"
                className="input-pill"
                required
              />
            </div>

            <div className="form-group">
              <h3>E-mail do Github</h3>
              <input
                type="email"
                name="githubEmail"
                className="input-pill"
                required
              />
            </div>

            <div className="form-group">
              <h3>Data de Inserção</h3>
              <input
                type="date"
                name="dataInsercao"
                className="input-pill"
                required
              />
            </div>

            <div className="form-group">
              <h3>Apto a Ensinar</h3>
              <div className="campo-select">
                <select
                  name="aptoEnsinar"
                  id="aptoEnsinar"
                  className="select select-pill"
                  defaultValue=""
                  required
                >
                  <option value="" disabled hidden></option>
                  <option value="sim">Sim</option>
                  <option value="nao">Não</option>
                </select>
                <img src="/icon/IDown.svg" alt="" className="button-icon" />
              </div>
            </div>
          </div>
        </div>

        <div className="form-group-center">
          <h3>Anexar foto</h3>
          <input
            type="file"
            name="foto"
            accept="image/*"
            className="file-pill"
          />
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