"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function CadastroProjetos() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica de cadastro aqui
  };

  return (
    <>
      <header className="header-form">
        <h1>Novo Projeto</h1>
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
              <input
                type="text"
                name="nome"
                className="input-card"
                required
              />
            </div>

            <div className="form-group">
              <h3>Prazo</h3>
              <input
                type="date"
                name="prazo"
                className="input-card"
                required
              />
            </div>

            <div className="form-group">
              <h3>Link do repositório</h3>
              <input
                type="url"
                name="linkRepositorio"
                className="input-card"
              />
            </div>
          </div>

          {/* Coluna Direita */}
          <div className="column" style={{ gap: "1.1rem" }}>
            <div className="form-group">
              <h3>Autor</h3>
              <input
                type="text"
                name="autor"
                className="input-card"
                required
              />
            </div>

            <div className="form-group">
              <h3>Status</h3>
              <div className="campo-select">
                <select
                  name="status"
                  id="status"
                  className="select select-card"
                  defaultValue=""
                  required
                >
                  <option value="" disabled hidden></option>
                  <option value="pendente">Pendente</option>
                  <option value="em-andamento">Em Andamento</option>
                  <option value="concluido">Concluído</option>
                </select>
                <img src="/icon/IDown.svg" alt="" className="button-icon" />
              </div>
            </div>

            <div className="form-group">
              <h3>Descrição</h3>
              <input
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