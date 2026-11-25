"use client";

import React, { useState, useMemo } from "react";
import {
  ListaP,
  Project,
} from "@/src/components/ui/(listas)/lista-projetos/lista";
import FilterMenu, { FilterField } from "@/src/components/ui/filter/FilterMenu";

const mockProjects: Project[] = [
  { id: "1", name: "Portal Administrativo", createdAt: "10/11/2026", deadline: "20/11/2026", collaboratorsCount: 7, status: "Em Andamento", type: "Eficiência" },
  { id: "2", name: "Onboarding Técnico", createdAt: "25/10/2026", deadline: "05/12/2026", collaboratorsCount: 3, status: "Em Andamento", type: "Nivelamento" },
  { id: "3", name: "Migração Cloud API", createdAt: "02/08/2026", deadline: "28/08/2026", collaboratorsCount: 6, status: "Concluído", type: "Eficiência" },
  { id: "4", name: "Design System Interno", createdAt: "10/08/2026", deadline: "05/09/2026", collaboratorsCount: 2, status: "Concluído", type: "Nivelamento" },
  { id: "5", name: "Pesquisa de Arquitetura", createdAt: "01/11/2026", deadline: "10/01/2027", collaboratorsCount: 0, status: "Em Andamento", type: "Nivelamento" },
  { id: "6", name: "Automação de Deploy", createdAt: "21/08/2026", deadline: "10/10/2026", collaboratorsCount: 5, status: "Atrasado", type: "Eficiência" },
  { id: "7", name: "Dashboard Analytics", createdAt: "01/09/2026", deadline: "25/09/2026", collaboratorsCount: 4, status: "Concluído", type: "Eficiência" },
  { id: "8", name: "Workshop React & Next", createdAt: "12/09/2026", deadline: "30/10/2026", collaboratorsCount: 8, status: "Atrasado", type: "Nivelamento" },
];

const MS_PER_DAY = 1000 * 60 * 60 * 24;

// Normaliza texto para comparação sem diferenciar acentos ou maiúsculas/minúsculas
const normalizeText = (text: string) =>
  text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

// Converte "DD/MM/AAAA" para timestamp à meia-noite local
const parseDateBR = (dateStr: string) => {
  const [day, month, year] = dateStr.split("/").map(Number);
  return new Date(year, month - 1, day).getTime();
};

const INITIAL_FILTERS = {
  createdAt: "",
  deadline: "",
  collaborators: "",
  type: "",
  status: "",
};

const PROJECT_FILTER_FIELDS: FilterField[] = [
  {
    key: "createdAt",
    label: "Criação",
    placeholder: "Todas as datas",
    options: [
      { value: "7d", label: "Últimos 7 dias" },
      { value: "30d", label: "Últimos 30 dias" },
      { value: "90d", label: "Últimos 3 meses" },
      { value: "mais-90d", label: "Mais de 3 meses" },
    ],
  },
  {
    key: "deadline",
    label: "Prazo",
    placeholder: "Todos os prazos",
    options: [
      { value: "atrasados", label: "Atrasados" },
      { value: "7d", label: "Próximos 7 dias" },
      { value: "30d", label: "Próximos 30 dias" },
      { value: "mais-30d", label: "Mais de 30 dias" },
    ],
  },
  {
    key: "collaborators",
    label: "N° de Colaboradores",
    placeholder: "Qualquer quantidade",
    options: [
      { value: "na", label: "0" },
      { value: "1-4", label: "1-4" },
      { value: "5-8", label: "5-8" },
      { value: "9+", label: "9+" },
    ],
  },
  {
    key: "type",
    label: "Tipo",
    placeholder: "Todos os tipos",
    options: [
      { value: "eficiencia", label: "Eficiência" },
      { value: "nivelamento", label: "Nivelamento" },
    ],
  },
  {
    key: "status",
    label: "Status",
    placeholder: "Todos os status",
    options: [
      { value: "em andamento", label: "Em Andamento" },
      { value: "atrasados", label: "Atrasados" },
      { value: "concluidos", label: "Concluídos" },
    ],
  },
];

export default function ListagemProjetos() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [projetos, setProjetos] = useState<Projeto[]>([]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleClearFilters = () => {
    setFilters(INITIAL_FILTERS);
  };

  const projects = useMemo(() => projetos, [projetos]);

  const filteredProjects = useMemo(() => {
    const normalizedSearch = normalizeText(searchQuery);
    const now = new Date();
    const today = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    ).getTime();


    return projects.filter((project) => {
      // 1. Filtro por texto (nome)
      if (normalizedSearch) {
        const matchesName = normalizeText(project.name).includes(
          normalizedSearch
        );
        if (!matchesName) return false;
      }

      // 2. Filtro por Criação
      if (filters.createdAt) {
        const createdTime = parseDateBR(project.dataCriacao);
        const daysAgo = Math.floor((today - createdTime) / MS_PER_DAY);

        if (filters.createdAt === "7d" && (daysAgo < 0 || daysAgo > 7))
          return false;
        if (filters.createdAt === "30d" && (daysAgo < 0 || daysAgo > 30))
          return false;
        if (filters.createdAt === "90d" && (daysAgo < 0 || daysAgo > 90))
          return false;
        if (filters.createdAt === "mais-90d" && daysAgo <= 90) return false;
      }

      // 3. Filtro por Prazo
      if (filters.deadline) {
        const deadlineTime = parseDateBR(project.prazo);
        const daysUntil = Math.floor((deadlineTime - today) / MS_PER_DAY);
        const isCompleted = normalizeText(project.status) === "concluido";

        if (filters.deadline === "atrasados" && (daysUntil >= 0 || isCompleted))
          return false;
        if (filters.deadline === "7d" && (daysUntil < 0 || daysUntil > 7))
          return false;
        if (filters.deadline === "30d" && (daysUntil < 0 || daysUntil > 30))
          return false;
        if (filters.deadline === "mais-30d" && daysUntil <= 30) return false;
      }

      // 4. Filtro por N° de Colaboradores
      if (filters.collaborators) {
        const count = project.collaboratorsCount ?? 0;
        if (filters.collaborators === "na" && count !== 0) return false;
        if (filters.collaborators === "1-4" && (count < 1 || count > 4))
          return false;
        if (filters.collaborators === "5-8" && (count < 5 || count > 8))
          return false;
        if (filters.collaborators === "9+" && count < 9) return false;
      }

      // 5. Filtro por Tipo
      if (filters.type) {
        const normalizedType = normalizeText(project.type);
        if (filters.type === "eficiencia" && normalizedType !== "eficiencia") {
          return false;
        }
        if (
          filters.type === "nivelamento" &&
          normalizedType !== "nivelamento"
        ) {
          return false;
        }
      }

      // 6. Filtro por Status
      if (filters.status) {
        const normalizedStatus = normalizeText(project.status);
        const deadlineTime = parseDateBR(project.prazo);
        const isCompleted =
          normalizedStatus === "concluido" || normalizedStatus === "concluidos";
        const isOverdue =
          normalizedStatus === "atrasado" ||
          normalizedStatus === "atrasados" ||
          (!isCompleted && deadlineTime < today);

        if (
          filters.status === "em andamento" &&
          normalizedStatus !== "em andamento"
        ) {
          return false;
        }
        if (filters.status === "atrasados" && !isOverdue) {
          return false;
        }
        if (filters.status === "concluidos" && !isCompleted) {
          return false;
        }
      }

      return true;
    });
  }, [searchQuery, filters, projects]);

  const handleSelectProject = (project: Project) => {
    console.log("Projeto clicado:", project);
  };

  return (
    <>
      <header className="header-projetos">
        <h1>Lista de Projetos</h1>
      </header>

      {/* Pesquisa e filtros abaixo da linha, alinhados à esquerda com o título */}
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
          id="menu-filtros-projetos"
          ariaLabel="Filtros de projetos"
          fields={PROJECT_FILTER_FIELDS}
          values={filters}
          onChange={handleFilterChange}
          onClear={handleClearFilters}
        />
      </div>

      <section
        className="row flex-1"
        style={{ minHeight: 0, alignItems: "stretch" }}
      >
        <div style={{ flex: 1, minWidth: 0, height: "95%" }}>
          <ListaP
            projects={filteredProjects}
            onSelectProject={handleSelectProject}
            selectedProjectId={null}
          />
        </div>
      </section>
    </>
  );
}