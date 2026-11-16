import React from 'react';
import styles from './lista.module.css';

export type ProjectType = 'Eficiência' | 'Nivelamento';
export type ProjectStatus = 'Em Andamento' | 'Atrasado' | 'Concluído';

export interface Project {
  id: string;
  name: string;
  createdAt: string;
  deadline: string;
  collaboratorsCount: number;
  type: ProjectType;
  status: ProjectStatus | (string & {});
}

interface ListaPProps {
  projects: Project[];
  onSelectProject?: (project: Project) => void;
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
          const isSelected = selectedProjectId === project.id;

          return (
            <article
              key={project.id}
              onClick={() => onSelectProject?.(project)}
              className={`${styles.rowCard} ${isSelected ? styles.selectedCard : ''}`}
              style={{ cursor: onSelectProject ? 'pointer' : 'default' }}
            >
              <strong className={styles.name}>{project.name}</strong>
              <span>{project.createdAt}</span>
              <span>{project.deadline}</span>
              <span>{project.collaboratorsCount}</span>
              <span>{project.type}</span>
              <span>{project.status}</span>
            </article>
          );
        })}
      </div>
    </div>
  );
}