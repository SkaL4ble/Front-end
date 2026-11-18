"use client";

import React from 'react';
import Link from 'next/link';
import styles from './lista.module.css';

export type ProjectType = 'Eficiência' | 'Nivelamento';

export interface Project {
  id: string;
  name: string;
  createdAt: string;
  deadline: string;
  collaboratorsCount: number;
  type: ProjectType;
  status: string;
}

interface ListaPProps {
  projects: Project[];
  onSelectProject?: (project: Project) => void;
  selectedProjectId?: string | null;
}

export const ListaP: React.FC<ListaPProps> = ({
  projects,
  onSelectProject,
  selectedProjectId,
}) => {
  return (
    <div className={styles.wrapper}>
      {/* Cabeçalho da lista */}
      <div className={styles.headerGrid}>
        <span>Nome</span>
        <span>Criação</span>
        <span>Prazo</span>
        <span>N° de Colaboradores</span>
        <span>Tipo</span>
        <span>Status</span>
        <span />
      </div>

      {/* Lista de cards */}
      <div className={styles.scrollContainer}>
        {projects.map((project) => {
          const isSelected = selectedProjectId === project.id;

          return (
            <div
              key={project.id}
              onClick={onSelectProject ? () => onSelectProject(project) : undefined}
              className={`${styles.rowCard} ${isSelected ? styles.selectedCard : ''}`}
              style={onSelectProject ? { cursor: 'pointer' } : undefined}
            >
              <span className={styles.name}>{project.name}</span>
              <span>{project.createdAt}</span>
              <span>{project.deadline}</span>
              <span>{project.collaboratorsCount}</span>
              <span>{project.type}</span>
              <span>{project.status}</span>

              <div className={styles.cardActions}>
                {/* Link 1: Detalhes do projeto */}
                <Link
                  href={`/projetos/${project.id}`}
                  className={styles.actionIconBtn}
                  title="Detalhes do projeto"
                  aria-label="Detalhes do projeto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <img src="/icon/IDetalhes.svg" alt="Detalhes" />
                </Link>

                {/* Link 2: Documentação do projeto (ajuste o href e o src do ícone) */}
                <Link
                  href={`/projetos/documentacao/${project.id}`}
                  className={styles.actionIconBtn}
                  title="Documentação do projeto"
                  aria-label="Documentação do projeto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <img src="/icon/IDocumentacao.svg" alt="Documentação" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};