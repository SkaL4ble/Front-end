"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  ListaF,
  Member,
} from "@/src/components/ui/(listas)/lista-funcionarios/lista";
import FilterMenu, { FilterField } from "@/src/components/ui/filter/FilterMenu";

type MemberItem = Member & {
  canTeach?: boolean;
};

const mockMembers: MemberItem[] = [
  { id: "1", name: "Kayo", role: "DEV Pleno", affinity: "Full-Stack", avatarUrl: "/avatars/kayo.png", canTeach: true },
  { id: "2", name: "Mariana Silva", role: "DEV Sênior", affinity: "Back-End", avatarUrl: "/avatars/kayo.png", canTeach: true },
  { id: "3", name: "Lucas Andrade", role: "DEV Júnior", affinity: "Front-End", avatarUrl: "/avatars/kayo.png", canTeach: false },
  { id: "4", name: "Beatriz Costa", role: "Tech Lead", affinity: "Full-Stack", avatarUrl: "/avatars/kayo.png", canTeach: true },
  { id: "5", name: "Rafael Souza", role: "DEV Pleno", affinity: "Back-End", avatarUrl: "/avatars/kayo.png", canTeach: false },
  { id: "6", name: "Camila Rocha", role: "DEV Sênior", affinity: "Front-End", avatarUrl: "/avatars/kayo.png", canTeach: true },
  { id: "7", name: "Pedro Henrique", role: "DEV Júnior", affinity: "Back-End", avatarUrl: "/avatars/kayo.png", canTeach: false },
  { id: "8", name: "Juliana Lima", role: "DEV Pleno", affinity: "Front-End", avatarUrl: "/avatars/kayo.png", canTeach: true },
];

const normalizeText = (text: string) =>
  text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

const INITIAL_FILTERS = {
  affinity: "",
  role: "",
  canTeach: "",
};

const EMPLOYEE_FILTER_FIELDS: FilterField[] = [
  {
    key: "affinity",
    label: "Atuação",
    placeholder: "Todas as atuações",
    options: [
      { value: "back-end", label: "Back-End" },
      { value: "full-stack", label: "Full-Stack" },
      { value: "front-end", label: "Front-End" },
    ],
  },
  {
    key: "role",
    label: "Cargo",
    placeholder: "Todos os cargos",
    options: [
      { value: "dev junior", label: "DEV Júnior" },
      { value: "dev pleno", label: "DEV Pleno" },
      { value: "dev senior", label: "DEV Sênior" },
      { value: "tech lead", label: "Tech Lead" },
    ],
  },
  {
    key: "canTeach",
    label: "Apto a Ensinar",
    placeholder: "Todos",
    options: [
      { value: "sim", label: "Sim" },
      { value: "nao", label: "Não" },
    ],
  },
];

export default function ListagemFuncionarios() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const filtersRef = useRef<HTMLDivElement>(null);

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

  const filteredMembers = useMemo(() => {
    const normalizedSearch = normalizeText(searchQuery);

    return mockMembers.filter((member) => {
      if (normalizedSearch) {
        const matchesName = normalizeText(member.name).includes(normalizedSearch);
        const matchesRoleText = normalizeText(member.role ?? "").includes(
          normalizedSearch
        );
        const matchesAffinityText = normalizeText(
          member.affinity ?? ""
        ).includes(normalizedSearch);

        if (!matchesName && !matchesRoleText && !matchesAffinityText) {
          return false;
        }
      }

      if (filters.affinity) {
        const normalizedAffinity = normalizeText(member.affinity ?? "");
        if (normalizedAffinity !== filters.affinity) return false;
      }

      if (filters.role) {
        const normalizedRole = normalizeText(member.role ?? "");
        if (normalizedRole !== filters.role) return false;
      }

      if (filters.canTeach) {
        const isMentor = Boolean(member.canTeach);
        if (filters.canTeach === "sim" && !isMentor) return false;
        if (filters.canTeach === "nao" && isMentor) return false;
      }

      return true;
    });
  }, [searchQuery, filters]);

  const membersForList = useMemo<Member[]>(
    () =>
      filteredMembers.map(({ canTeach, ...member }) => ({
        ...member,
        train: member.train ?? (canTeach ? "Sim" : "Não"),
      })),
    [filteredMembers]
  );

  return (
    <>
      <header className="header-projetos">
        <h1>Lista de Funcionários</h1>
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
            aria-controls="menu-filtros-funcionarios"
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
              id="menu-filtros-funcionarios"
              ariaLabel="Filtros de funcionários"
              fields={EMPLOYEE_FILTER_FIELDS}
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
        <div style={{ flex: 1, minWidth: 0, width: "100%", height: "95%" }}>
          <ListaF members={membersForList} />
        </div>
      </section>
    </>
  );
}