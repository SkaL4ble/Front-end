"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import { ListaP } from "@/src/components/ui/(listas)/lista-projetos/lista";
import { Projeto } from "@/src/@types/projeto";
import FilterMenu, { FilterField } from "@/src/components/ui/filter/FilterMenu";

const MS_PER_DAY = 1000 * 60 * 60 * 24;

const normalizeText = (text: string) =>
  text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

const parseDateSafe = (dateStr?: string | null) => {
  if (!dateStr || dateStr === "N/A") return NaN;

  if (dateStr.includes("/")) {
    const [day, month, year] = dateStr.split("/").map(Number);
    if (!day || !month || !year) return NaN;
    return new Date(year, month - 1, day).getTime();
  }

  const parsed = Date.parse(dateStr);
  if (Number.isNaN(parsed)) return NaN;
  const d = new Date(parsed);
  return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
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
  const [projects] = useState<Projeto[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null
  );
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [today, setToday] = useState<number | null>(null);
  const filtersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const now = new Date();
    setToday(
      new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()
    );
  }, []);

  const activeFiltersCount = useMemo(
    () => Object.values(filters).filter(Boolean).length,
    [filters]
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filtersRef.current &&
        !filtersRef.current.contains(event.target as Node)
      ) {
        setIsFiltersOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleClearFilters = () => {
    setFilters(INITIAL_FILTERS);
  };

  const filteredProjects = useMemo(() => {
    const normalizedSearch = normalizeText(searchQuery);

    return projects.filter((project) => {
      if (normalizedSearch) {
        const matchesName = normalizeText(project.nome ?? "").includes(
          normalizedSearch
        );
        if (!matchesName) return false;
      }

      if (filters.createdAt && today !== null) {
        const createdTime = parseDateSafe(project.dataCriacao);
        if (Number.isNaN(createdTime)) return false;
        const daysAgo = Math.floor((today - createdTime) / MS_PER_DAY);

        if (filters.createdAt === "7d" && (daysAgo < 0 || daysAgo > 7))
          return false;
        if (filters.createdAt === "30d" && (daysAgo < 0 || daysAgo > 30))
          return false;
        if (filters.createdAt === "90d" && (daysAgo < 0 || daysAgo > 90))
          return false;
        if (filters.createdAt === "mais-90d" && daysAgo <= 90) return false;
      }

      if (filters.deadline && today !== null) {
        const deadlineTime = parseDateSafe(project.prazo);
        if (Number.isNaN(deadlineTime)) return false;
        const daysUntil = Math.floor((deadlineTime - today) / MS_PER_DAY);
        const isCompleted = normalizeText(project.status ?? "") === "concluido";

        if (filters.deadline === "atrasados" && (daysUntil >= 0 || isCompleted))
          return false;
        if (filters.deadline === "7d" && (daysUntil < 0 || daysUntil > 7))
          return false;
        if (filters.deadline === "30d" && (daysUntil < 0 || daysUntil > 30))
          return false;
        if (filters.deadline === "mais-30d" && daysUntil <= 30) return false;
      }

      if (filters.collaborators) {
        const count = Number(project.quantidadeColaboradores ?? 0);
        if (filters.collaborators === "na" && count !== 0) return false;
        if (filters.collaborators === "1-4" && (count < 1 || count > 4))
          return false;
        if (filters.collaborators === "5-8" && (count < 5 || count > 8))
          return false;
        if (filters.collaborators === "9+" && count < 9) return false;
      }

      if (filters.type) {
        const normalizedType = normalizeText(project.nomeTipo ?? "");
        if (filters.type === "eficiencia" && normalizedType !== "eficiencia") {
          return false;
        }
        if (
          filters.type === "nivelamento" &&
          !normalizedType.includes("nivelamento")
        ) {
          return false;
        }
      }

      if (filters.status) {
        const normalizedStatus = normalizeText(project.status ?? "");
        const deadlineTime = parseDateSafe(project.prazo);
        const isCompleted =
          normalizedStatus === "concluido" || normalizedStatus === "concluidos";
        const isOverdue =
          normalizedStatus === "atrasado" ||
          normalizedStatus === "atrasados" ||
          (!isCompleted &&
            today !== null &&
            !Number.isNaN(deadlineTime) &&
            deadlineTime < today);

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
  }, [searchQuery, filters, projects, today]);

  const handleSelectProject = (project: Projeto) => {
    setSelectedProjectId((prev) =>
      prev === project.projetoId ? null : project.projetoId
    );
  };

  return (
    <>
      <header className="header-projetos">
        <h1>Lista de Projetos</h1>
      </header>

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

        <div ref={filtersRef} className="filter-wrapper">
          <button
            type="button"
            className="filter-toggle-btn"
            onClick={() => setIsFiltersOpen((prev) => !prev)}
            aria-expanded={isFiltersOpen}
            aria-controls="menu-filtros-projetos"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="7" y1="12" x2="17" y2="12" />
              <line x1="10" y1="18" x2="14" y2="18" />
            </svg>

            <span>Filtros</span>

            {activeFiltersCount > 0 && (
              <span className="filter-badge">{activeFiltersCount}</span>
            )}

            <img
              src="/icon/IDown.svg"
              alt=""
              className={`button-icon filter-chevron ${isFiltersOpen ? "open" : ""}`}
            />
          </button>

          {isFiltersOpen && (
            <FilterMenu
              id="menu-filtros-projetos"
              ariaLabel="Filtros de projetos"
              fields={PROJECT_FILTER_FIELDS}
              values={filters}
              onChange={handleFilterChange}
              onClear={handleClearFilters}
            />
          )}
        </div>
      </div>

      <section
        className="row flex-1"
        style={{ minHeight: 0, alignItems: "stretch" }}
      >
        <div style={{ flex: 1, minWidth: 0, height: "95%" }}>
          <ListaP
            projects={filteredProjects}
            onSelectProject={handleSelectProject}
            selectedProjectId={selectedProjectId}
          />
        </div>
      </section>
    </>
  );
}