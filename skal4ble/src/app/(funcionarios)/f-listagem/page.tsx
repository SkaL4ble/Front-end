"use client";

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Sidebar } from '@/src/components/ui/sidebar/sidebar';
import { ListaF, Member } from '@/src/components/ui/(listas)/lista-funcionarios/lista';
import { OverviewPanel } from '@/src/components/ui/overview/overview';

type MemberItem = Member & {
  canTeach?: boolean;
};

const mockMembers: MemberItem[] = [
  { id: '1', name: 'Kayo', github: 'Kayolol', role: 'DEV Pleno', affinity: 'Full-Stack', avatarUrl: '/avatars/kayo.png', canTeach: true },
  { id: '2', name: 'Mariana Silva', github: 'marisilva', role: 'DEV Sênior', affinity: 'Back-End', avatarUrl: '/avatars/kayo.png', canTeach: true },
  { id: '3', name: 'Lucas Andrade', github: 'lucasdev', role: 'DEV Júnior', affinity: 'Front-End', avatarUrl: '/avatars/kayo.png', canTeach: false },
  { id: '4', name: 'Beatriz Costa', github: 'biacosta', role: 'Tech Lead', affinity: 'Full-Stack', avatarUrl: '/avatars/kayo.png', canTeach: true },
  { id: '5', name: 'Rafael Souza', github: 'rafasouza', role: 'DEV Pleno', affinity: 'Back-End', avatarUrl: '/avatars/kayo.png', canTeach: false },
  { id: '6', name: 'Camila Rocha', github: 'camirocha', role: 'DEV Sênior', affinity: 'Front-End', avatarUrl: '/avatars/kayo.png', canTeach: true },
  { id: '7', name: 'Pedro Henrique', github: 'pedroh', role: 'DEV Júnior', affinity: 'Back-End', avatarUrl: '/avatars/kayo.png', canTeach: false },
  { id: '8', name: 'Juliana Lima', github: 'julialima', role: 'DEV Pleno', affinity: 'Front-End', avatarUrl: '/avatars/kayo.png', canTeach: true },
];

// Normaliza texto para comparação sem diferenciar acentos ou maiúsculas/minúsculas
const normalizeText = (text: string) =>
  text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();

export default function ListagemFuncionarios() {
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    affinity: '',
    role: '',
    canTeach: '',
  });

  const filtersRef = useRef<HTMLDivElement>(null);

  const activeFiltersCount = Object.values(filters).filter(Boolean).length;

  const filteredMembers = useMemo(() => {
    const normalizedSearch = normalizeText(searchQuery);

    return mockMembers.filter((member) => {
      // 1. Filtro por texto (nome, GitHub ou cargo)
      if (normalizedSearch) {
        const matchesName = normalizeText(member.name).includes(normalizedSearch);
        const matchesGithub = normalizeText(member.github ?? '').includes(normalizedSearch);
        const matchesRoleText = normalizeText(member.role ?? '').includes(normalizedSearch);

        if (!matchesName && !matchesGithub && !matchesRoleText) return false;
      }

      // 2. Filtro por Atuação
      if (filters.affinity && filters.affinity !== 'todos') {
        const normalizedAffinity = normalizeText(member.affinity ?? '');
        if (normalizedAffinity !== filters.affinity) return false;
      }

      // 3. Filtro por Cargo
      if (filters.role && filters.role !== 'todos') {
        const normalizedRole = normalizeText(member.role ?? '');
        if (normalizedRole !== filters.role) return false;
      }

      // 4. Filtro por Apto a Ensinar
      if (filters.canTeach && filters.canTeach !== 'todos') {
        const isMentor = Boolean(member.canTeach);
        if (filters.canTeach === 'sim' && !isMentor) return false;
        if (filters.canTeach === 'nao' && isMentor) return false;
      }

      return true;
    });
  }, [searchQuery, filters]);

  // Se o funcionário selecionado sair dos resultados filtrados, volta para o OverviewPanel
  const visibleSelectedMember = useMemo(() => {
    if (!selectedMember) return null;
    return filteredMembers.some((m) => m.id === selectedMember.id)
      ? selectedMember
      : null;
  }, [selectedMember, filteredMembers]);

  const handleSelectMember = (member: Member) => {
    setSelectedMember((prev) => (prev?.id === member.id ? null : member));
  };

  const handleClearFilters = () => {
    setFilters({ affinity: '', role: '', canTeach: '' });
  };

  // Fecha o menu de filtros ao clicar fora ou pressionar Escape
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
            <h1>Funcionários</h1>
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
              <label htmlFor="pesquisa" className='label'>Pesquise o Funcionário</label>

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

            <button type="button" className='big-button'>
              <img src="/icon/I+Funcionario.svg" alt="" className="button-icon-big" />
              <span>Novo Funcionário</span>
            </button>

            {/* Menu Expansível */}
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
                    onChange={(e) =>
                      setFilters((prev) => ({ ...prev, affinity: e.target.value }))
                    }
                  >
                    <option value="">Atuação</option>
                    <option value="todos">Todos</option>
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
                    onChange={(e) =>
                      setFilters((prev) => ({ ...prev, role: e.target.value }))
                    }
                  >
                    <option value="">Cargo</option>
                    <option value="todos">Todos</option>
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
                    onChange={(e) =>
                      setFilters((prev) => ({ ...prev, canTeach: e.target.value }))
                    }
                  >
                    <option value="">Apto a Ensinar</option>
                    <option value="todos">Todos</option>
                    <option value="sim">Sim</option>
                    <option value="nao">Não</option>
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
            <ListaF
              members={filteredMembers}
              onSelectMember={handleSelectMember}
              selectedMemberId={visibleSelectedMember?.id ?? null}
            />
          </div>

          <div style={{ height: '95%' }}>
            {visibleSelectedMember ? (
              <div
                key={`details-${visibleSelectedMember.id}`}
                className="container-25op panel-enter"
                style={{ width: '420px', height: '100%', flexShrink: 0 }}
              />
            ) : (
              <div
                key="overview"
                className="panel-enter"
                style={{ height: '100%' }}
              >
                <OverviewPanel
                  totalEmployees={mockMembers.length}
                  assignedTickets={248}
                  toolsCount={8}
                  productivityAvg={82}
                />
              </div>
            )}
          </div>
        </section>
      </section>
    </main>
  );
}