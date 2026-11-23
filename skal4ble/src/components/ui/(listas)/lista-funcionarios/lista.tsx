"use client";

import React from 'react';
import Link from 'next/link';
import styles from './lista.module.css';

export interface Member {
  id: string;
  name: string;
  role?: string;
  affinity?: string;
  train?: string;
  avatarUrl?: string;
}

interface ListaFProps {
  members: Member[];
}

export const ListaF: React.FC<ListaFProps> = ({ members }) => {
  return (
    <div className={styles.wrapper}>
      {/* Cabeçalho da lista */}
      <div className={styles.headerGrid}>
        <span>Nome</span>
        <span>Cargo</span>
        <span>Afinidade</span>
        <span>Aptidão p/Ensinar</span>
        <span />
      </div>

      {/* Lista de cards */}
      <div className={styles.scrollContainer}>
        {members.map((member) => (
          <div key={member.id} className={styles.rowCard}>
            {/* Foto à esquerda integrada ao nome */}
            <div className={styles.nameCell}>
              <img
                src={member.avatarUrl || '/avatars/default.png'}
                alt={member.name}
                className={styles.avatar}
              />
              <span className={styles.name}>{member.name}</span>
            </div>

            <span>{member.role}</span>
            <span>{member.affinity}</span>
            <span>{member.train}</span>

            <div className={styles.cardActions}>
              {/* Link 1: Detalhes do funcionário */}
              <Link
                href={`/funcionarios/${member.id}`}
                className={styles.actionIconBtn}
                title="Detalhes do funcionário"
                aria-label="Detalhes do funcionário"
              >
                <img src="/icon/IDetalhes.svg" alt="Detalhes" />
              </Link>

              {/* Link 2: Editar funcionário */}
              <Link
                href={`/funcionarios/editar/${member.id}`}
                className={styles.actionIconBtn}
                title="Editar funcionário"
                aria-label="Editar funcionário"
              >
                <img src="/icon/ITreinoW.svg" alt="Editar" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};