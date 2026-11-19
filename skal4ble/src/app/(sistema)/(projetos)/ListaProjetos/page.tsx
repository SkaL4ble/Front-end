"use client";

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { ListaP} from '@/src/components/ui/(listas)/lista-projetos/lista';
import { projetoService } from '@/src/services/api/projetoService';
import { Projeto } from '@/src/@types/projeto';

const MS_PER_DAY = 1000 * 60 * 60 * 24;

// Normaliza texto para comparação sem diferenciar acentos ou maiúsculas/minúsculas
const normalizeText = (text: string) =>
  text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();

// Converte "DD/MM/AAAA" para timestamp à meia-noite local
const parseDateBR = (dateStr: string) => {
  const [day, month, year] = dateStr.split('/').map(Number);
  return new Date(year, month - 1, day).getTime();
};

const INITIAL_FILTERS = {
  createdAt: '',
  deadline: '',
  collaborators: '',
  type: '',
  status: '',
};

type FilterKey = keyof typeof INITIAL_FILTERS;

export default function ListagemProjetos() {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [projetos, setProjetos] = useState<Projeto[]>([]);

  const filtersRef = useRef<HTMLDivElement>(null);

  const activeFiltersCount = Object.values(filters).filter(Boolean).length;

  const handleFilterChange = (key: FilterKey, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value === 'nenhum' ? '' : value,
    }));
  };

  const handleClearFilters = () => {
    setFilters(INITIAL_FILTERS);
  };

  const projects = useMemo(() => projetos, [projetos]);

  const filteredProjects = useMemo(() => {
    const normalizedSearch = normalizeText(searchQuery);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();


    return projects.filter((project) => {
      // 1. Filtro por texto (nome)
      if (normalizedSearch) {
        const matchesName = normalizeText(project.nome).includes(normalizedSearch);
        if (!matchesName) return false;
      }

      // 2. Filtro por Criação
      if (filters.createdAt) {
        const createdTime = parseDateBR(project.dataCriacao);
        const daysAgo = Math.floor((today - createdTime) / MS_PER_DAY);

        if (filters.createdAt === '7d' && (daysAgo < 0 || daysAgo > 7)) return false;
        if (filters.createdAt === '30d' && (daysAgo < 0 || daysAgo > 30)) return false;
        if (filters.createdAt === '90d' && (daysAgo < 0 || daysAgo > 90)) return false;
        if (filters.createdAt === 'mais-90d' && daysAgo <= 90) return false;
      }

      // 3. Filtro por Prazo
      if (filters.deadline) {
        const deadlineTime = parseDateBR(project.prazo);
        const daysUntil = Math.floor((deadlineTime - today) / MS_PER_DAY);
        const isCompleted = normalizeText(project.status) === 'concluido';

        if (filters.deadline === 'atrasados' && (daysUntil >= 0 || isCompleted)) return false;
        if (filters.deadline === '7d' && (daysUntil < 0 || daysUntil > 7)) return false;
        if (filters.deadline === '30d' && (daysUntil < 0 || daysUntil > 30)) return false;
        if (filters.deadline === 'mais-30d' && daysUntil <= 30) return false;
      }

      // 4. Filtro por N° de Colaboradores
      if (filters.collaborators) {
        const count = 10; 
        //if (filters.collaborators === 'na' && count !== 0) return false;
        if (filters.collaborators === '1-4' && (count < 1 || count > 4)) return false;
        if (filters.collaborators === '5-8' && (count < 5 || count > 8)) return false;
        if (filters.collaborators === '9+' && count < 9) return false;
      }

      // 5. Filtro por Tipo
      if (filters.type) {
        const normalizedType = normalizeText(project.nomeTipo);
        if (filters.type === 'eficiencia' && normalizedType !== 'eficiencia') {
          return false;
        }
        if (filters.type === 'nivelamento' && normalizedType !== 'nivelamento') {
          return false;
        }
      }

      // 6. Filtro por Status
      if (filters.status) {
        const normalizedStatus = normalizeText(project.status);
        const deadlineTime = parseDateBR(project.prazo);
        const isCompleted =
          normalizedStatus === 'concluido' || normalizedStatus === 'concluidos';
        const isOverdue =
          normalizedStatus === 'atrasado' ||
          normalizedStatus === 'atrasados' ||
          (!isCompleted && deadlineTime < today);

        if (
          filters.status === 'em andamento' &&
          normalizedStatus !== 'em andamento'
        ) {
          return false;
        }
        if (filters.status === 'atrasados' && !isOverdue) {
          return false;
        }
        if (filters.status === 'concluidos' && !isCompleted) {
          return false;
        }
      }

      return true;
    });
  }, [searchQuery, filters, projects]);

  const handleSelectProject = (project: Projeto) => {
    console.log('Projeto clicado:', project);
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

  useEffect(() => {
      async function ListarProjetos() {
      const projetos = await projetoService.ListarProjetos(); 
      setProjetos(projetos);
    }

    ListarProjetos();
  },[]);

  return (
    <>
        <header className='header-projetos'>
          <h1>Lista de Projetos</h1>
        </header>

        {/* Pesquisa e filtros abaixo da linha, alinhados à esquerda com o título */}
        <div className='projetos-controls'>
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
            <label htmlFor="pesquisa" className='label'>Pesquise...</label>

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

          <div ref={filtersRef} className='filter-wrapper'>
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

                {/* Criação */}
                <div className='campo-select'>
                  <select
                    className="select"
                    value={filters.createdAt}
                    onChange={(e) => handleFilterChange('createdAt', e.target.value)}
                  >
                    <option value="" disabled hidden>Criação</option>
                    <option value="nenhum">Nenhum</option>
                    <option value="7d">Últimos 7 dias</option>
                    <option value="30d">Últimos 30 dias</option>
                    <option value="90d">Últimos 3 meses</option>
                    <option value="mais-90d">Mais de 3 meses</option>
                  </select>
                  <img src="/icon/IDown.svg" alt="" className='button-icon' />
                </div>

                {/* Prazo */}
                <div className='campo-select'>
                  <select
                    className="select"
                    value={filters.deadline}
                    onChange={(e) => handleFilterChange('deadline', e.target.value)}
                  >
                    <option value="" disabled hidden>Prazo</option>
                    <option value="nenhum">Nenhum</option>
                    <option value="atrasados">Atrasados</option>
                    <option value="7d">Próximos 7 dias</option>
                    <option value="30d">Próximos 30 dias</option>
                    <option value="mais-30d">Mais de 30 dias</option>
                  </select>
                  <img src="/icon/IDown.svg" alt="" className='button-icon' />
                </div>

                {/* N° de Colaboradores */}
                <div className='campo-select'>
                  <select
                    className="select"
                    value={filters.collaborators}
                    onChange={(e) => handleFilterChange('collaborators', e.target.value)}
                  >
                    <option value="" disabled hidden>N° de Colaboradores</option>
                    <option value="nenhum">Nenhum</option>
                    <option value="na">0</option>
                    <option value="1-4">1-4</option>
                    <option value="5-8">5-8</option>
                    <option value="9+">9+</option>
                  </select>
                  <img src="/icon/IDown.svg" alt="" className='button-icon' />
                </div>

                {/* Tipo */}
                <div className='campo-select'>
                  <select
                    className="select"
                    value={filters.type}
                    onChange={(e) => handleFilterChange('type', e.target.value)}
                  >
                    <option value="" disabled hidden>Tipo</option>
                    <option value="nenhum">Nenhum</option>
                    <option value="eficiencia">Eficiência</option>
                    <option value="nivelamento">Nivelamento</option>
                  </select>
                  <img src="/icon/IDown.svg" alt="" className='button-icon' />
                </div>

                {/* Status */}
                <div className='campo-select'>
                  <select
                    className="select"
                    value={filters.status}
                    onChange={(e) => handleFilterChange('status', e.target.value)}
                  >
                    <option value="" disabled hidden>Status</option>
                    <option value="nenhum">Nenhum</option>
                    <option value="em andamento">Em Andamento</option>
                    <option value="atrasados">Atrasados</option>
                    <option value="concluidos">Concluídos</option>
                  </select>
                  <img src="/icon/IDown.svg" alt="" className='button-icon' />
                </div>
              </div>
            )}
          </div>
        </div>

        <section
          className="row flex-1"
          style={{ minHeight: 0, alignItems: 'stretch' }}
        >
          <div style={{ flex: 1, minWidth: 0, height: '95%' }}>
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