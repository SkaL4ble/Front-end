// NovoProjeto/SegundaEtapa/page.tsx
"use client";

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { ListaF, Member } from '@/src/components/ui/(listas)/lista-funcionarios/lista';

type MemberItem = Member & {
  canTeach?: boolean;
};

const mockMembers: MemberItem[] = [
  { id: '2', name: 'Mariana Silva', role: 'DEV Sênior', affinity: 'Back-End', avatarUrl: '/avatars/kayo.png', canTeach: true },
  { id: '3', name: 'Lucas Andrade', role: 'DEV Júnior', affinity: 'Front-End', avatarUrl: '/avatars/kayo.png', canTeach: false },
  { id: '4', name: 'Beatriz Costa', role: 'Tech Lead', affinity: 'Full-Stack', avatarUrl: '/avatars/kayo.png', canTeach: true },
];

// Normaliza texto para comparação sem diferenciar acentos ou maiúsculas/minúsculas
const normalizeText = (text: string) =>
  text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();

const INITIAL_FILTERS = {
  affinity: '',
  role: '',
  canTeach: '',
};

type FilterKey = keyof typeof INITIAL_FILTERS;

export default function SegundaEtapa() {
  const router = useRouter();

  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState(INITIAL_FILTERS);

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

  const filteredMembers = useMemo(() => {
    const normalizedSearch = normalizeText(searchQuery);

    return mockMembers.filter((member) => {
      if (normalizedSearch) {
        const matchesName = normalizeText(member.name).includes(normalizedSearch);
        const matchesRoleText = normalizeText(member.role ?? '').includes(normalizedSearch);
        if (!matchesName && !matchesRoleText) return false;
      }

      if (filters.affinity && normalizeText(member.affinity ?? '') !== filters.affinity) return false;
      if (filters.role && normalizeText(member.role ?? '') !== filters.role) return false;

      if (filters.canTeach) {
        const isMentor = Boolean(member.canTeach);
        if (filters.canTeach === 'sim' && !isMentor) return false;
        if (filters.canTeach === 'nao' && isMentor) return false;
      }

      return true;
    });
  }, [searchQuery, filters]);

  const membersForList = useMemo(
    () =>
      filteredMembers.map((member) => ({
        ...member,
        train: member.train ?? (member.canTeach ? 'Sim' : 'Não'),
      })),
    [filteredMembers]
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (filtersRef.current && !filtersRef.current.contains(event.target as Node)) {
        setIsFiltersOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setIsFiltersOpen(false);
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleCadastrar = () => {
    // Lógica de cadastro do projeto aqui
  };

  return (
    <>
      <header className='header-form'>
        <h1>Cadastro de Projeto</h1>
      </header>

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
              <span className='filter-badge'>{activeFiltersCount}</span>
            )}

            <img
              src="/icon/IDown.svg"
              alt=""
              className={`button-icon filter-chevron ${isFiltersOpen ? 'open' : ''}`}
            />
          </button>

          {isFiltersOpen && (
            <div
              id="menu-filtros-funcionarios"
              className='filters-dropdown'
              role="region"
              aria-label="Filtros de funcionários"
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
                  value={filters.affinity}
                  onChange={(e) => handleFilterChange('affinity', e.target.value)}
                >
                  <option value="" disabled hidden>Atuação</option>
                  <option value="nenhum">Nenhum</option>
                  <option value="back-end">Back-End</option>
                  <option value="full-stack">Full-Stack</option>
                  <option value="front-end">Front-End</option>
                </select>
                <img src="/icon/IDown.svg" alt="" className='button-icon' />
              </div>

              <div className='campo-select'>
                <select
                  className="select"
                  value={filters.role}
                  onChange={(e) => handleFilterChange('role', e.target.value)}
                >
                  <option value="" disabled hidden>Cargo</option>
                  <option value="nenhum">Nenhum</option>
                  <option value="dev junior">DEV Júnior</option>
                  <option value="dev pleno">DEV Pleno</option>
                  <option value="dev senior">DEV Sênior</option>
                  <option value="tech lead">Tech Lead</option>
                </select>
                <img src="/icon/IDown.svg" alt="" className='button-icon' />
              </div>

              <div className='campo-select'>
                <select
                  className="select"
                  value={filters.canTeach}
                  onChange={(e) => handleFilterChange('canTeach', e.target.value)}
                >
                  <option value="" disabled hidden>Apto a Ensinar</option>
                  <option value="nenhum">Nenhum</option>
                  <option value="sim">Sim</option>
                  <option value="nao">Não</option>
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
        <div style={{ flex: 1, minWidth: 0, width: '100%', height: '100%' }}>
          <ListaF members={membersForList} />
        </div>
      </section>

      <div className="form-actions">
        <button
          type="button"
          onClick={() => router.back()}
          className="big-button-voltar"
        >
          Voltar
        </button>
        <button type="button" onClick={handleCadastrar} className="big-button">
          Cadastrar
        </button>
      </div>
    </>
  );
}