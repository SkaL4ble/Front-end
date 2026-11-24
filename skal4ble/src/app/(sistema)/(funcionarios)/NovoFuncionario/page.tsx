"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function CadastroFuncionarios() {
  const router = useRouter();
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica de cadastro aqui
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSelectedFileName(file ? file.name : null);
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
        {/* Seção 1: Dados Pessoais */}
        <section className="form-section-card">
          <div className="form-section-header">
            <img
              src="/icon/PLACEHOLDER_DADOS_PESSOAIS.svg"
              alt=""
              className="form-section-icon"
            />
            <h3>Dados Pessoais</h3>
          </div>

          <div className="form-section-grid-2">
            <div className="form-group">
              <label htmlFor="nome" className="form-field-label">
                Nome <span className="required-mark">*</span>
              </label>
              <div className="input-with-icon">
                <img
                  src="/icon/PLACEHOLDER_NOME.svg"
                  alt=""
                  className="input-leading-icon"
                />
                <input
                  id="nome"
                  type="text"
                  name="nome"
                  placeholder="Nome completo"
                  className="input-card has-icon"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="emailPessoal" className="form-field-label">
                E-mail Pessoal <span className="required-mark">*</span>
              </label>
              <div className="input-with-icon">
                <img
                  src="/icon/PLACEHOLDER_EMAIL.svg"
                  alt=""
                  className="input-leading-icon"
                />
                <input
                  id="emailPessoal"
                  type="email"
                  name="emailPessoal"
                  placeholder="exemplo@email.com"
                  className="input-card has-icon"
                  required
                />
              </div>
            </div>
          </div>
        </section>

        {/* Seção 2: Dados do GitHub */}
        <section className="form-section-card">
          <div className="form-section-header">
            <img
              src="/icon/PLACEHOLDER_DADOS_GITHUB.svg"
              alt=""
              className="form-section-icon"
            />
            <h3>Dados do GitHub</h3>
          </div>

          <div className="form-section-grid-2">
            <div className="form-group">
              <label htmlFor="githubUser" className="form-field-label">
                Nome do GitHub <span className="required-mark">*</span>
              </label>
              <div className="input-with-icon">
                <img
                  src="/icon/PLACEHOLDER_GITHUB.svg"
                  alt=""
                  className="input-leading-icon"
                />
                <input
                  id="githubUser"
                  type="text"
                  name="githubUser"
                  placeholder="ex.: kevssiamilena"
                  className="input-card has-icon"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="githubEmail" className="form-field-label">
                E-mail do GitHub <span className="required-mark">*</span>
              </label>
              <div className="input-with-icon">
                <img
                  src="/icon/PLACEHOLDER_EMAIL.svg"
                  alt=""
                  className="input-leading-icon"
                />
                <input
                  id="githubEmail"
                  type="email"
                  name="githubEmail"
                  placeholder="ex.: user@github.com"
                  className="input-card has-icon"
                  required
                />
              </div>
            </div>
          </div>
        </section>

        {/* Seção 3: Informações Profissionais + Ensino e Registro (lado a lado) */}
        <div className="form-sections-row">
          {/* Sub-card Esquerdo */}
          <section className="form-section-card">
            <div className="form-section-header">
              <img
                src="/icon/PLACEHOLDER_INFO_PROFISSIONAIS.svg"
                alt=""
                className="form-section-icon"
              />
              <h3>Informações Profissionais</h3>
            </div>

            <div className="form-section-grid-2">
              <div className="form-group">
                <label htmlFor="atuacao" className="form-field-label">
                  Atuação <span className="required-mark">*</span>
                </label>
                <div className="campo-select">
                  <select
                    name="atuacao"
                    id="atuacao"
                    className="select select-card"
                    defaultValue=""
                    required
                  >
                    <option value="" disabled>
                      Selecione
                    </option>
                    <option value="front-end">Front-End</option>
                    <option value="back-end">Back-End</option>
                    <option value="full-stack">Full-Stack</option>
                  </select>
                  <img src="/icon/IDown.svg" alt="" className="button-icon" />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="cargo" className="form-field-label">
                  Cargo <span className="required-mark">*</span>
                </label>
                <div className="campo-select">
                  <select
                    name="cargo"
                    id="cargo"
                    className="select select-card"
                    defaultValue=""
                    required
                  >
                    <option value="" disabled>
                      Selecione
                    </option>
                    <option value="desenvolvedor">Desenvolvedor</option>
                    <option value="designer">Designer</option>
                    <option value="gerente">Gerente</option>
                  </select>
                  <img src="/icon/IDown.svg" alt="" className="button-icon" />
                </div>
              </div>
            </div>
          </section>

          {/* Sub-card Direito */}
          <section className="form-section-card">
            <div className="form-section-header">
              <img
                src="/icon/PLACEHOLDER_ENSINO_REGISTRO.svg"
                alt=""
                className="form-section-icon"
              />
              <h3>Ensino e Registro</h3>
            </div>

            <div className="form-section-grid-2">
              <div className="form-group">
                <label htmlFor="dataInsercao" className="form-field-label">
                  Data de Inserção <span className="required-mark">*</span>
                </label>
                <input
                  id="dataInsercao"
                  type="date"
                  name="dataInsercao"
                  className="input-card"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="aptoEnsinar" className="form-field-label">
                  Apto a Ensinar <span className="required-mark">*</span>
                </label>
                <div className="campo-select">
                  <select
                    name="aptoEnsinar"
                    id="aptoEnsinar"
                    className="select select-card"
                    defaultValue=""
                    required
                  >
                    <option value="" disabled>
                      Selecione
                    </option>
                    <option value="sim">Sim</option>
                    <option value="nao">Não</option>
                  </select>
                  <img src="/icon/IDown.svg" alt="" className="button-icon" />
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Seção 4: Foto do Funcionário */}
        <section className="form-section-card">
          <div className="form-section-header">
            <img
              src="/icon/PLACEHOLDER_FOTO_HEADER.svg"
              alt=""
              className="form-section-icon"
            />
            <h3>Foto do Funcionário</h3>
          </div>

          <div
            className={`file-dropzone ${isDragging ? "dragging" : ""}`}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={() => setIsDragging(false)}
          >
            <input
              type="file"
              name="foto"
              accept="image/*"
              onChange={handleFileChange}
              className="file-dropzone-input"
            />
            <img
              src="/icon/PLACEHOLDER_UPLOAD.svg"
              alt=""
              className="file-dropzone-icon"
            />
            <div className="file-dropzone-text">
              <span className="file-dropzone-title">
                {selectedFileName ?? "Clique ou arraste um arquivo aqui"}
              </span>
              <span className="file-dropzone-subtitle">
                Formatos: JPG, PNG ou GIF (máx. 2 MB)
              </span>
            </div>
          </div>
        </section>

        {/* Botões alinhados à direita */}
        <div className="form-actions-end">
          <button
            type="button"
            onClick={() => router.back()}
            className="big-button-voltar"
          >
            Voltar
          </button>
          <button type="submit" className="big-button">
            <img
              src="/icon/PLACEHOLDER_SALVAR.svg"
              alt=""
              className="button-icon"
            />
            Cadastrar
          </button>
        </div>
      </form>
    </>
  );
}