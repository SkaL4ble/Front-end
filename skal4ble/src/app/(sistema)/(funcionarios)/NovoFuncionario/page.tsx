"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  Briefcase,
  GraduationCap,
  Camera,
  Upload,
  Eye,
  X,
} from "lucide-react";
import CustomSelect from "@/src/components/ui/select/CustomSelect";

const ATUACAO_OPTIONS = [
  { value: "front-end", label: "Front-End" },
  { value: "back-end", label: "Back-End" },
  { value: "full-stack", label: "Full-Stack" },
];

const CARGO_OPTIONS = [
  { value: "desenvolvedor", label: "Desenvolvedor" },
  { value: "designer", label: "Designer" },
  { value: "gerente", label: "Gerente" },
];

const APTO_ENSINAR_OPTIONS = [
  { value: "sim", label: "Sim" },
  { value: "nao", label: "Não" },
];

function GithubIcon({
  size = 18,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

export default function CadastroFuncionarios() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl(null);
      setIsPreviewOpen(false);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [selectedFile]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica de cadastro aqui
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setSelectedFile(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0] ?? null;
    if (file) {
      setSelectedFile(file);
      if (fileInputRef.current && e.dataTransfer.files) {
        fileInputRef.current.files = e.dataTransfer.files;
      }
    }
  };

  return (
    <>
      <header className="header-form">
        <h1>Novo Funcionário</h1>
      </header>

      <form
        onSubmit={handleSubmit}
        className="container-25op form-card flex-1 panel-enter"
      >
        {/* Seção 1: Dados (Pessoais + GitHub) */}
        <section className="form-section-card">
          <div className="form-section-header">
            <User size={18} strokeWidth={2.3} className="form-section-icon" />
            <h3>Dados</h3>
          </div>

          <div className="form-section-grid-2">
            <div className="form-group">
              <label htmlFor="nome" className="form-field-label">
                Nome <span className="required-mark">*</span>
              </label>
              <div className="input-with-icon">
                <User size={16} strokeWidth={2} className="input-leading-icon" />
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
                <Mail size={16} strokeWidth={2} className="input-leading-icon" />
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

            <div className="form-group">
              <label htmlFor="githubUser" className="form-field-label">
                Nome do GitHub <span className="required-mark">*</span>
              </label>
              <div className="input-with-icon">
                <GithubIcon size={16} className="input-leading-icon" />
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
                <Mail size={16} strokeWidth={2} className="input-leading-icon" />
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

        {/* Seção 2: Informações Profissionais + Ensino e Registro */}
        <div className="form-sections-row">
          <section className="form-section-card">
            <div className="form-section-header">
              <Briefcase
                size={18}
                strokeWidth={2.3}
                className="form-section-icon"
              />
              <h3>Informações Profissionais</h3>
            </div>

            <div className="form-section-grid-2">
              <div className="form-group">
                <label htmlFor="atuacao" className="form-field-label">
                  Atuação <span className="required-mark">*</span>
                </label>
                <CustomSelect
                  id="atuacao"
                  name="atuacao"
                  dropdownTitle="Atuação"
                  options={ATUACAO_OPTIONS}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="cargo" className="form-field-label">
                  Cargo <span className="required-mark">*</span>
                </label>
                <CustomSelect
                  id="cargo"
                  name="cargo"
                  dropdownTitle="Cargo"
                  options={CARGO_OPTIONS}
                  required
                />
              </div>
            </div>
          </section>

          <section className="form-section-card">
            <div className="form-section-header">
              <GraduationCap
                size={18}
                strokeWidth={2.3}
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
                <CustomSelect
                  id="aptoEnsinar"
                  name="aptoEnsinar"
                  dropdownTitle="Apto a Ensinar"
                  options={APTO_ENSINAR_OPTIONS}
                  required
                />
              </div>
            </div>
          </section>
        </div>

        {/* Seção 3: Foto do Funcionário */}
        <section className="form-section-card">
          <div className="form-section-header">
            <Camera size={18} strokeWidth={2.3} className="form-section-icon" />
            <h3>Foto do Funcionário</h3>
          </div>

          <div
            className={`file-dropzone ${isDragging ? "dragging" : ""} ${
              selectedFile ? "has-file" : ""
            }`}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
          >
            <input
              ref={fileInputRef}
              type="file"
              name="foto"
              accept="image/*"
              onChange={handleFileChange}
              className="file-dropzone-input"
            />

            <div className="file-dropzone-content">
              <div className="file-dropzone-badge">
                <Upload size={21} strokeWidth={2.2} />
              </div>
              <div className="file-dropzone-text">
                <span className="file-dropzone-title">
                  {selectedFile
                    ? selectedFile.name
                    : "Clique ou arraste uma foto aqui"}
                </span>
                <span className="file-dropzone-subtitle">
                  {selectedFile
                    ? `${(selectedFile.size / 1024).toFixed(0)} KB — clique para substituir`
                    : "Formatos aceitos: JPG, PNG ou WEBP (máx. 2 MB)"}
                </span>
              </div>
            </div>

            {selectedFile && previewUrl && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsPreviewOpen(true);
                }}
                className="file-preview-btn"
              >
                <Eye size={16} strokeWidth={2.2} />
                Visualizar
              </button>
            )}
          </div>
        </section>

        {/* Rodapé de Ações */}
        <div className="form-actions-start">
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

      {/* Modal de Preview da Foto */}
      {isPreviewOpen && selectedFile && previewUrl && (
        <div
          className="image-preview-overlay"
          onClick={() => setIsPreviewOpen(false)}
        >
          <div
            className="image-preview-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="image-preview-header">
              <h3>Preview da Foto</h3>
              <button
                type="button"
                aria-label="Fechar preview"
                onClick={() => setIsPreviewOpen(false)}
                className="image-preview-close"
              >
                <X size={18} strokeWidth={2.4} />
              </button>
            </div>

            <div className="image-preview-frame">
              <img
                src={previewUrl}
                alt={`Preview de ${selectedFile.name}`}
                className="image-preview-img"
              />
            </div>

            <div className="image-preview-meta">
              <span className="image-preview-filename">{selectedFile.name}</span>
              <span>{(selectedFile.size / 1024).toFixed(0)} KB</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}