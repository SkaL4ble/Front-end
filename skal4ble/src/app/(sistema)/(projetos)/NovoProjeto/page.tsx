"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  FolderKanban,
  CalendarClock,
  Link2,
  FileText,
  ChevronDown,
  Code2,
  Check,
  X,
  Search,
} from "lucide-react";

const TECNOLOGIAS_DISPONIVEIS = [
  "JavaScript",
  "TypeScript",
  "Python",
  "Dockerfile",
  "Docker",
  "React",
  "Next.js",
  "Node.js",
  "Java",
  "C#",
  "Go",
  "PostgreSQL",
  "MySQL",
  "MongoDB",
  "Tailwind CSS",
  "HTML / CSS",
  "Git",
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

export default function CadastroProjetos() {
  const router = useRouter();
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
  const [isTechOpen, setIsTechOpen] = useState(false);
  const [techSearch, setTechSearch] = useState("");
  const multiselectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        multiselectRef.current &&
        !multiselectRef.current.contains(event.target as Node)
      ) {
        setIsTechOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsTechOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const toggleTech = (tech: string) => {
    setSelectedTechs((prev) =>
      prev.includes(tech) ? prev.filter((item) => item !== tech) : [...prev, tech]
    );
  };

  const removeTech = (tech: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedTechs((prev) => prev.filter((item) => item !== tech));
  };

  const filteredTechs = TECNOLOGIAS_DISPONIVEIS.filter((tech) =>
    tech.toLowerCase().includes(techSearch.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Lógica de cadastro aqui (selectedTechs contém o array de tecnologias escolhidas)
  };

  return (
    <>
      <header className="header-form">
        <h1>Novo Projeto</h1>
      </header>

      <form
        onSubmit={handleSubmit}
        className="container-25op form-card flex-1 panel-enter"
      >
        {/* Seção 1: Dados do Projeto */}
        <section className="form-section-card">
          <div className="form-section-header">
            <FolderKanban
              size={18}
              strokeWidth={2.3}
              className="form-section-icon"
            />
            <h3>Dados do Projeto</h3>
          </div>

          <div className="form-section-grid-2">
            <div className="form-group">
              <label htmlFor="nome" className="form-field-label">
                Nome <span className="required-mark">*</span>
              </label>
              <div className="input-with-icon">
                <FolderKanban
                  size={16}
                  strokeWidth={2}
                  className="input-leading-icon"
                />
                <input
                  id="nome"
                  type="text"
                  name="nome"
                  placeholder="ex.: Sistema SkaL4ble"
                  className="input-card has-icon"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="tipo" className="form-field-label">
                Tipo de Projeto <span className="required-mark">*</span>
              </label>
              <div className="campo-select">
                <select
                  name="tipo"
                  id="tipo"
                  className="select select-card"
                  defaultValue=""
                  required
                >
                  <option value="" disabled>
                    Selecione
                  </option>
                  <option value="nivelamento">Nivelamento</option>
                  <option value="eficiencia">Eficiência</option>
                </select>
                <ChevronDown
                  size={17}
                  strokeWidth={2.4}
                  className="select-chevron-icon"
                />
              </div>
            </div>

            {/* Multiselect de Tecnologias ocupando a largura total da seção */}
            <div className="form-group" style={{ gridColumn: "1 / -1" }}>
              <label
                id="tecnologias-label"
                className="form-field-label"
                onClick={() => setIsTechOpen((prev) => !prev)}
              >
                Tecnologias <span className="required-mark">*</span>
              </label>

              <div className="multiselect-wrapper" ref={multiselectRef}>
                {/* Input invisível para validação nativa do formulário */}
                <input
                  type="text"
                  name="tecnologias"
                  value={selectedTechs.join(", ")}
                  onChange={() => {}}
                  required
                  tabIndex={-1}
                  aria-hidden="true"
                  className="multiselect-hidden-validator"
                />

                <div
                  role="combobox"
                  aria-expanded={isTechOpen}
                  aria-labelledby="tecnologias-label"
                  tabIndex={0}
                  onClick={() => setIsTechOpen((prev) => !prev)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setIsTechOpen((prev) => !prev);
                    }
                  }}
                  className={`input-card multiselect-trigger ${
                    isTechOpen ? "is-open" : ""
                  }`}
                >
                  <div className="multiselect-values">
                    <Code2
                      size={16}
                      strokeWidth={2}
                      className="multiselect-leading-icon"
                    />

                    {selectedTechs.length === 0 ? (
                      <span className="multiselect-placeholder">
                        Selecione as tecnologias (ex.: JavaScript, Python, Dockerfile...)
                      </span>
                    ) : (
                      <div className="multiselect-tags">
                        {selectedTechs.map((tech) => (
                          <span key={tech} className="multiselect-tag">
                            {tech}
                            <button
                              type="button"
                              aria-label={`Remover ${tech}`}
                              onClick={(e) => removeTech(tech, e)}
                              className="multiselect-tag-remove"
                            >
                              <X size={13} strokeWidth={2.4} />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <ChevronDown
                    size={17}
                    strokeWidth={2.4}
                    className={`multiselect-chevron ${isTechOpen ? "rotate" : ""}`}
                  />
                </div>

                {isTechOpen && (
                  <div className="multiselect-dropdown">
                    <div className="multiselect-search-box">
                      <Search size={15} strokeWidth={2} />
                      <input
                        type="text"
                        value={techSearch}
                        onChange={(e) => setTechSearch(e.target.value)}
                        placeholder="Filtrar tecnologia..."
                        className="multiselect-search-input"
                        autoFocus
                      />
                    </div>

                    <div className="multiselect-options" role="listbox">
                      {filteredTechs.length === 0 ? (
                        <div className="multiselect-empty">
                          Nenhuma tecnologia encontrada
                        </div>
                      ) : (
                        filteredTechs.map((tech) => {
                          const isSelected = selectedTechs.includes(tech);
                          return (
                            <button
                              key={tech}
                              type="button"
                              role="option"
                              aria-selected={isSelected}
                              onClick={() => toggleTech(tech)}
                              className={`multiselect-option ${
                                isSelected ? "selected" : ""
                              }`}
                            >
                              <span className="multiselect-checkbox">
                                {isSelected && (
                                  <Check size={13} strokeWidth={3} />
                                )}
                              </span>
                              <span>{tech}</span>
                            </button>
                          );
                        })
                      )}
                    </div>

                    {selectedTechs.length > 0 && (
                      <div className="multiselect-footer">
                        <span>
                          {selectedTechs.length}{" "}
                          {selectedTechs.length === 1
                            ? "selecionada"
                            : "selecionadas"}
                        </span>
                        <button
                          type="button"
                          onClick={() => setSelectedTechs([])}
                          className="multiselect-clear-btn"
                        >
                          Limpar tudo
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Seção 2: Cronograma e Status + Repositório */}
        <div className="form-sections-row">
          <section className="form-section-card">
            <div className="form-section-header">
              <CalendarClock
                size={18}
                strokeWidth={2.3}
                className="form-section-icon"
              />
              <h3>Cronograma e Status</h3>
            </div>

            <div className="form-section-grid-2">
              <div className="form-group">
                <label htmlFor="prazo" className="form-field-label">
                  Prazo <span className="required-mark">*</span>
                </label>
                <input
                  id="prazo"
                  type="date"
                  name="prazo"
                  className="input-card"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="status" className="form-field-label">
                  Status <span className="required-mark">*</span>
                </label>
                <div className="campo-select">
                  <select
                    name="status"
                    id="status"
                    className="select select-card"
                    defaultValue=""
                    required
                  >
                    <option value="" disabled>
                      Selecione
                    </option>
                    <option value="pendente">Pendente</option>
                    <option value="em-andamento">Em Andamento</option>
                    <option value="concluido">Concluído</option>
                  </select>
                  <ChevronDown
                    size={17}
                    strokeWidth={2.4}
                    className="select-chevron-icon"
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="form-section-card">
            <div className="form-section-header">
              <GithubIcon size={18} className="form-section-icon" />
              <h3>Repositório</h3>
            </div>

            <div className="form-group">
              <label htmlFor="linkRepositorio" className="form-field-label">
                Link do repositório
              </label>
              <div className="input-with-icon">
                <Link2
                  size={16}
                  strokeWidth={2}
                  className="input-leading-icon"
                />
                <input
                  id="linkRepositorio"
                  type="url"
                  name="linkRepositorio"
                  placeholder="https://github.com/usuario/repositorio"
                  className="input-card has-icon"
                />
              </div>
            </div>
          </section>
        </div>

        {/* Seção 3: Descrição Ampla */}
        <section className="form-section-card">
          <div className="form-section-header">
            <FileText
              size={18}
              strokeWidth={2.3}
              className="form-section-icon"
            />
            <h3>Escopo e Detalhes</h3>
          </div>

          <div className="form-group">
            <label htmlFor="descricao" className="form-field-label">
              Descrição <span className="required-mark">*</span>
            </label>
            <textarea
              id="descricao"
              name="descricao"
              rows={5}
              placeholder="Descreva detalhadamente o objetivo do projeto, contexto, requisitos técnicos e entregas esperadas..."
              className="input-card textarea-card"
              required
            />
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
    </>
  );
}