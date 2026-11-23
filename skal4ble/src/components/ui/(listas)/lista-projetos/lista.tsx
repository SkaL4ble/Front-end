import React from 'react';
import styles from './lista.module.css';
import { Projeto } from '@/src/@types/projeto';

export type ProjectType = 'Eficiência' | 'Nivelamento';
export type ProjectStatus = 'Em Andamento' | 'Atrasado' | 'Concluído';

interface ListaPProps {
  projects: Projeto[];
  onSelectProject?: (project: Projeto) => void;
  selectedProjectId?: string | null;
}

export function ListaP({
  projects,
  onSelectProject,
  selectedProjectId,
}: ListaPProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.headerGrid}>
        <span>Nome</span>
        <span>Criação</span>
        <span>Prazo</span>
        <span>N° de Colaboradores</span>
        <span>Tipo</span>
        <span>Status</span>
      </div>

      <div className={styles.scrollContainer}>
        {projects.map((project) => {
          const isSelected = selectedProjectId === project.projetoId;

          return (
            <article
              key={project.projetoId}
              onClick={() => onSelectProject?.(project)}
              className={`${styles.rowCard} ${isSelected ? styles.selectedCard : ''}`}
              style={{ cursor: onSelectProject ? 'pointer' : 'default' }}
            >
              <strong className={styles.name}>{project.nome}</strong>
              <span>{project.dataCriacao}</span>
              <span>{project.prazo}</span>
              <span>{project.quantidadeColaboradores}</span>
              <span>{project.nomeTipo}</span>
              <span>{project.status}</span>
            </article>
          );
        })}
      </div>
    </div>
  );
}