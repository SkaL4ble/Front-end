"use client";

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Sidebar } from '@/src/components/ui/sidebar/sidebar';
import { ListaP, Project } from '@/src/components/ui/(listas)/lista-projetos/lista';
import { CustomPieChart, PieDataItem } from '@/src/components/ui/(graficos)/pie/CustomPieChart';

type ProjectItem = Project & {
  type?: string;
};

const mockProjects: ProjectItem[] = [
  { id: '1', name: 'Portal Administrativo', createdAt: '19/07/2026', collaboratorsCount: 7, status: 'Em Andamento', type: 'Eficiência' },
  { id: '2', name: 'Onboarding Técnico', createdAt: '22/07/2026', collaboratorsCount: 3, status: 'Em Andamento', type: 'Nivelamento de Conhecimento' },
  { id: '3', name: 'Migração Cloud API', createdAt: '02/08/2026', collaboratorsCount: 6, status: 'Concluído', type: 'Eficiência' },
  { id: '4', name: 'Design System Interno', createdAt: '10/08/2026', collaboratorsCount: 2, status: 'Concluído', type: 'Nivelamento de Conhecimento' },
  { id: '5', name: 'Pesquisa de Arquitetura', createdAt: '15/08/2026', collaboratorsCount: 0, status: 'Em Andamento', type: 'Nivelamento de Conhecimento' },
  { id: '6', name: 'Automação de Deploy', createdAt: '21/08/2026', collaboratorsCount: 5, status: 'Em Andamento', type: 'Eficiência' },
  { id: '7', name: 'Dashboard Analytics', createdAt: '01/09/2026', collaboratorsCount: 4, status: 'Concluído', type: 'Eficiência' },
  { id: '8', name: 'Workshop React & Next', createdAt: '12/09/2026', collaboratorsCount: 8, status: 'Em Andamento', type: 'Nivelamento de Conhecimento' },
];

const getProjectChartData = (project: Project): PieDataItem[] => [
  { id: 0, value: 4, label: '.NET (C#)' },
  { id: 1, value: 1, label: 'Dockerfile' },
  { id: 3, value: 2, label: 'CSS' },
  { id: 4, value: 2, label: 'TypeScript' },
];

// Normaliza texto para comparação sem diferenciar acentos ou maiúsculas/minúsculas
const normalizeText = (text: string) =>
  text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();

export default function ListagemProjetos() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    collaborators: '',
    status: '',
    type: '',
  });

  const filtersRef = useRef<HTMLDivElement>(null);

  const activeFiltersCount = Object.values(filters).filter(Boolean).length;

  const filteredProjects = useMemo(() => {
    const normalizedSearch = normalizeText(searchQuery);

    return mockProjects.filter((project) => {
      // 1. Filtro por texto (nome ou status)
      if (normalizedSearch) {
        const matchesName = normalizeText(project.name).includes(normalizedSearch);
        const matchesStatusText = normalizeText(project.status).includes(normalizedSearch);
        if (!matchesName && !matchesStatusText) return false;
      }

      // 2. Filtro por N° de Colaboradores
      if (filters.collaborators) {
        const count = project.collaboratorsCount ?? 0;
        if (filters.collaborators === 'na' && count !== 0) return false;
        if (filters.collaborators === '1-4' && (count < 1 || count > 4)) return false;
        if (filters.collaborators === '5-8' && (count < 5 || count > 8)) return false;
      }

      // 3. Filtro por Status
      if (filters.status && filters.status !== 'todos') {
        const normalizedStatus = normalizeText(project.status);
        if (
          filters.status === 'ativos' &&
          normalizedStatus !== 'em andamento' &&
          normalizedStatus !== 'ativo' &&
          normalizedStatus !== 'ativos'
        ) {
          return false;
        }
        if (
          filters.status === 'concluidos' &&
          normalizedStatus !== 'concluido' &&
          normalizedStatus !== 'concluidos'
        ) {
          return false;
        }
      }

      // 4. Filtro por Tipo
      if (filters.type && filters.type !== 'todos') {
        const normalizedType = normalizeText(project.type ?? '');
        if (filters.type === 'eficiencia' && normalizedType !== 'eficiencia') {
          return false;
        }
        if (filters.type === 'nivelamento' && !normalizedType.includes('nivelamento')) {
          return false;
        }
      }

      return true;
    });
  }, [searchQuery, filters]);

  // Evita manter aberto no painel lateral um projeto que saiu dos resultados filtrados
  const visibleSelectedProject = useMemo(() => {
    if (!selectedProject) return null;
    return filteredProjects.some((p) => p.id === selectedProject.id)
      ? selectedProject
      : null;
  }, [selectedProject, filteredProjects]);

  const handleSelectProject = (project: Project) => {
    setSelectedProject((prev) => (prev?.id === project.id ? null : project));
  };

  const handleClearFilters = () => {
    setFilters({ collaborators: '', status: '', type: '' });
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (filtersRef.current && !filtersRef.current.contains(event.target as Node)) {
        setIsFiltersOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsFiltersOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <main>
      <Sidebar />
      <section className='column flex-1 padding-sidebar hidden'>
        <header className='header-projetos'>
          <div>
            <h1>Projetos</h1>
          </div>

          <div ref={filtersRef} className='header-actions'>
            {/* Barra de pesquisa integrada ao header */}
            <div className='campo-form header-search'>
              <img src="/icon/IPesquisa.svg" alt="" className="input-icon" />
              <input
                type="text"
                id="pesquisa"
                className="input"
                placeholder=" "
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <label htmlFor="pesquisa" className='label'>Pesquise o Projeto</label>

              {searchQuery && (
                <button
                  type="button"
                  className='search-clear-btn'
                  onClick={() => setSearchQuery('')}
                  aria-label="Limpar pesquisa"
                >
                  ×
                </button>
              )}
            </div>

            <button
              type="button"
              className='filter-toggle-btn'
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
                <span className='filter-badge'>{activeFiltersCount}</span>
              )}

              <img
                src="/icon/IDown.svg"
                alt=""
                className={`button-icon filter-chevron ${isFiltersOpen ? 'open' : ''}`}
              />
            </button>

            <button type="button" className='big-button'>
              <img src="/icon/I+Projeto.svg" alt="" className="button-icon-big" />
              <span>Novo Projeto</span>
            </button>

            {/* Menu Expansível */}
            {isFiltersOpen && (
              <div
                id="menu-filtros-projetos"
                className='filters-dropdown'
                role="region"
                aria-label="Filtros de projetos"
              >
                <div className='filters-dropdown-header'>
                  <span>Filtrar por</span>
                  {activeFiltersCount > 0 && (
                    <button
                      type="button"
                      className='filters-clear-btn'
                      onClick={handleClearFilters}
                    >
                      Limpar
                    </button>
                  )}
                </div>

                <div className='campo-select'>
                  <select
                    className="select"
                    value={filters.collaborators}
                    onChange={(e) =>
                      setFilters((prev) => ({ ...prev, collaborators: e.target.value }))
                    }
                  >
                    <option value="">N° de Colaboradores</option>
                    <option value="na">N/A</option>
                    <option value="1-4">1-4</option>
                    <option value="5-8">5-8</option>
                  </select>
                  <img src="/icon/IDown.svg" alt="" className='button-icon' />
                </div>

                <div className='campo-select'>
                  <select
                    className="select"
                    value={filters.status}
                    onChange={(e) =>
                      setFilters((prev) => ({ ...prev, status: e.target.value }))
                    }
                  >
                    <option value="">Status</option>
                    <option value="todos">Todos</option>
                    <option value="ativos">Ativos</option>
                    <option value="concluidos">Concluídos</option>
                  </select>
                  <img src="/icon/IDown.svg" alt="" className='button-icon' />
                </div>

                <div className='campo-select'>
                  <select
                    className="select"
                    value={filters.type}
                    onChange={(e) =>
                      setFilters((prev) => ({ ...prev, type: e.target.value }))
                    }
                  >
                    <option value="">Tipo</option>
                    <option value="todos">Todos</option>
                    <option value="eficiencia">Eficiência</option>
                    <option value="nivelamento">Nivelamento de Conhecimento</option>
                  </select>
                  <img src="/icon/IDown.svg" alt="" className='button-icon' />
                </div>
              </div>
            )}
          </div>
        </header>

        <section
          className="row flex-1"
          style={{ minHeight: 0, alignItems: 'stretch', gap: '2rem' }}
        >
          <div style={{ flex: 1, minWidth: 0, height: '95%' }}>
            <ListaP
              projects={filteredProjects}
              onSelectProject={handleSelectProject}
              selectedProjectId={visibleSelectedProject?.id ?? null}
            />
          </div>

          <div style={{ height: '95%', minHeight: 0 }}>
            {visibleSelectedProject ? (
              <div
                key={`details-${visibleSelectedProject.id}`}
                className="container-25op panel-enter"
                style={{
                  width: '420px',
                  height: '100%',
                  flexShrink: 0,
                  padding: 'clamp(1rem, 2.2vh, 1.5rem)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                }}
              >
                <h2
                  style={{
                    fontFamily: 'var(--font-chakra-petch)',
                    fontSize: '1.6rem',
                    fontStyle: 'normal',
                    margin: 0,
                    flexShrink: 0,
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center'
                  }}
                >
                  {visibleSelectedProject.name}
                </h2>

                <div className='row'>
                  <button type="button">
                    <img src="/icon/IDetalhes.svg" alt="" className="button-icon" />
                    <span>Detalhes</span>
                  </button>

                  <button type="button" className='button'>
                    <img src="/icon/ITrocarProjeto.svg" alt="" className="button-icon" />
                    <span>To-Do List</span>
                  </button>
                </div>

                <div
                  style={{
                    flex: 1,
                    minHeight: 0,
                    minWidth: 0,
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <CustomPieChart data={getProjectChartData(visibleSelectedProject)} />
                </div>
              </div>
            ) : (
              <div
                key="empty"
                className="container-25op panel-enter"
                style={{ width: '420px', height: '100%', flexShrink: 0 }}
              />
            )}
          </div>
        </section>
      </section>
    </main>
  );
}