"use client";

import React from 'react';
import Link from 'next/link';
import styles from './lista.module.css';
import { Projeto } from '@/src/@types/projeto';

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
  projects: Projeto[];
  onSelectProject?: (project: Projeto) => void;
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
          const isSelected = selectedProjectId === project.projetoId;

          return (
            <div
              key={project.projetoId}
              onClick={onSelectProject ? () => onSelectProject(project) : undefined}
              className={`${styles.rowCard} ${isSelected ? styles.selectedCard : ''}`}
              style={onSelectProject ? { cursor: 'pointer' } : undefined}
            >
              <strong className={styles.name}>{project.nome}</strong>
              <span>{project.dataCriacao}</span>
              <span>{project.prazo}</span>
              <span>{project.quantidadeColaboradores}</span>
              <span>{project.nomeTipo}</span>
              <span>{project.status}</span>

              <div className={styles.cardActions}>
                {/* Link 1: Detalhes do projeto */}
                <Link
                  href={`/projetos/${project.projetoId}`}
                  className={styles.actionIconBtn}
                  title="Detalhes do projeto"
                  aria-label="Detalhes do projeto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <img src="/icon/IDetalhes.svg" alt="Detalhes" />
                </Link>

                {/* Link 2: Documentação do projeto (ajuste o href e o src do ícone) */}
                <Link
                  href={`/projetos/documentacao/${project.projetoId}`}
                  className={styles.actionIconBtn}
                  title="Documentação do projeto"
                  aria-label="Documentação do projeto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <img src="/icon/IDocs.svg" alt="Documentação" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};