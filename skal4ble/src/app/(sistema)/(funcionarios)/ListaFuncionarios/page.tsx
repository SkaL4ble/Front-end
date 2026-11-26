"use client";

import React, { useState, useMemo } from "react";
import { ListaF } from "@/src/components/ui/(listas)/lista-funcionarios/lista";
import { Usuario } from "@/src/@types/usuario";
import { mockUsuarios } from "@/src/@types/mock";
import FilterMenu, { FilterField } from "@/src/components/ui/filter/FilterMenu";

// Normaliza texto para comparação sem diferenciar acentos ou maiúsculas/minúsculas
const normalizeText = (text: string) =>
  text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

const INITIAL_FILTERS = {
  atuacao: "",
  cargo: "",
};

const EMPLOYEE_FILTER_FIELDS: FilterField[] = [
  {
    key: "atuacao",
    label: "Atuação",
    placeholder: "Todas as atuações",
    options: [
      { value: "back-end", label: "Back-End" },
      { value: "full-stack", label: "Full-Stack" },
      { value: "front-end", label: "Front-End" },
    ],
  },
  {
    key: "cargo",
    label: "Cargo",
    placeholder: "Todos os cargos",
    options: [
      { value: "dev junior", label: "DEV Júnior" },
      { value: "dev pleno", label: "DEV Pleno" },
      { value: "dev senior", label: "DEV Sênior" },
      { value: "tech lead", label: "Tech Lead" },
    ],
  },
];

export default function ListagemFuncionarios() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [members] = useState<Usuario[]>(mockUsuarios);
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleClearFilters = () => {
    setFilters(INITIAL_FILTERS);
  };

  const filteredMembers = useMemo(() => {
    const normalizedSearch = normalizeText(searchQuery);

    return members.filter((member) => {
      if (normalizedSearch) {
        const matchesName = normalizeText(member.nomeUsuario ?? "").includes(
          normalizedSearch
        );
        const matchesRole = normalizeText(member.cargo ?? "").includes(
          normalizedSearch
        );
        const matchesAffinity = normalizeText(member.atuacao ?? "").includes(
          normalizedSearch
        );
        const matchesEmailOrGithub = normalizeText(
          member.emailPessoal ?? ""
        ).includes(normalizedSearch);

        if (
          !matchesName &&
          !matchesRole &&
          !matchesAffinity &&
          !matchesEmailOrGithub
        ) {
          return false;
        }
      }

      if (filters.atuacao) {
        const normalizedAffinity = normalizeText(member.atuacao ?? "");
        if (normalizedAffinity !== filters.atuacao) return false;
      }

      if (filters.cargo) {
        const normalizedRole = normalizeText(member.cargo ?? "");
        if (normalizedRole !== filters.cargo) return false;
      }

      return true;
    });
  }, [searchQuery, filters, members]);

  const handleSelectMember = (member: Usuario) => {
    setSelectedMemberId((prev) =>
      prev === member.usuarioId ? null : member.usuarioId
    );
  };

  return (
    <>
      <header className="header-projetos">
        <h1>Lista de Funcionários</h1>
      </header>

      {/* Pesquisa e menu de filtros alinhados abaixo do cabeçalho */}
      <div className="projetos-controls">
        <div className="campo-form header-search">
          <img src="/icon/IPesquisa.svg" alt="" className="input-icon" />
          <input
            type="text"
            id="pesquisa"
            className="input"
            placeholder=" "
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <label htmlFor="pesquisa" className="label">
            Pesquise...
          </label>

          {searchQuery && (
            <button
              type="button"
              className="search-clear-btn"
              onClick={() => setSearchQuery("")}
              aria-label="Limpar pesquisa"
            >
              ×
            </button>
          )}
        </div>

        <FilterMenu
          id="menu-filtros-funcionarios"
          ariaLabel="Filtros de funcionários"
          fields={EMPLOYEE_FILTER_FIELDS}
          values={filters}
          onChange={handleFilterChange}
          onClear={handleClearFilters}
        />
      </div>

      <section
        className="row flex-1"
        style={{ minHeight: 0, alignItems: "stretch" }}
      >
        <div style={{ flex: 1, minWidth: 0, width: "100%", height: "95%" }}>
          <ListaF
            members={filteredMembers}
            onSelectMember={handleSelectMember}
            selectedMemberId={selectedMemberId}
          />
        </div>
      </section>
    </>
  );
}