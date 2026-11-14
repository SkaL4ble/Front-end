"use client";

import React, { useState } from 'react';
import { Sidebar } from '@/src/components/ui/sidebar/sidebar';
import { ListaP, Project } from '@/src/components/ui/(listas)/lista-projetos/lista';
import { CustomPieChart, PieDataItem } from '@/src/components/ui/(graficos)/pie/CustomPieChart';

const mockProjects: Project[] = Array.from({ length: 10 }, (_, index) => ({
  id: String(index + 1),
  name: 'Projeto Exemplo',
  createdAt: '19/07/2026',
  collaboratorsCount: 7,
  status: 'Em Andamento',
}));

// Dados de exemplo vinculados ao projeto selecionado
const getProjectChartData = (project: Project): PieDataItem[] => [
  { id: 0, value: 4, label: '.NET (C#)' },
  { id: 1, value: 1, label: 'Dockerfile' },
  { id: 3, value: 2, label: 'CSS' },
  { id: 4, value: 2, label: 'TypeScript' },
];

export default function ListagemProjetos() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleSelectProject = (project: Project) => {
    setSelectedProject((prev) => (prev?.id === project.id ? null : project));
  };

  return (
    <main>
      <Sidebar />
      <section className='column flex-1 padding-sidebar hidden'>
        <header>
          <div>
            <h1>Projetos</h1>
          </div>

          <section className='row'>
            <div className='campo-select'>
              <select className="select">
                <option value="">N° de Colaboradores</option>
                <option value="">N/A</option>
                <option value="">1-4</option>
                <option value="">5-8</option>
              </select>
              <img src="/icon/IDown.svg" alt="" className='button-icon' />
            </div>

            <div className='campo-select'>
              <select className="select">
                <option value="">Status</option>
                <option value="">Todos</option>
                <option value="">Ativos</option>
                <option value="">Concluídos</option>
              </select>
              <img src="/icon/IDown.svg" alt="" className='button-icon' />
            </div>

            <div className='campo-select'>
              <select className="select">
                <option value="">Tipo</option>
                <option value="">Todos</option>
                <option value="">Eficiência</option>
                <option value="">Nivelamento de Conhecimento</option>
              </select>
              <img src="/icon/IDown.svg" alt="" className='button-icon' />
            </div>

            <div>
              <button className='big-button'>
                <img src="/icon/I+Projeto.svg" alt="" className="button-icon-big" />
                <span>Novo Projeto</span>
              </button>
            </div>
          </section>
        </header>

        <div className='row' style={{ padding: "1rem 0rem" }}>
          <div className='campo-form'>
            <img src="/icon/IPesquisa.svg" alt="" className="input-icon" />
            <input type="text" id="pesquisa" className="input" placeholder=" " />
            <label htmlFor="pesquisa" className='label'>Pesquise o Projeto</label>
          </div>
        </div>

        <section
          className="row flex-1"
          style={{ minHeight: 0, alignItems: 'stretch', gap: '2rem' }}
        >
          <div style={{ flex: 1, minWidth: 0, height: '95%' }}>
            <ListaP
              projects={mockProjects}
              onSelectProject={handleSelectProject}
              selectedProjectId={selectedProject?.id ?? null}
            />
          </div>

          <div style={{ height: '95%', minHeight: 0 }}>
            {selectedProject ? (
              <div
                key={`details-${selectedProject.id}`}
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
                  {selectedProject.name}
                </h2>

                <div className='row'>
                  <button>
                    <img src="/icon/IDetalhes.svg" alt="" className="button-icon" />
                    <span>Detalhes</span>
                  </button>

                  <button className='button'>
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
                  <CustomPieChart data={getProjectChartData(selectedProject)} />
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