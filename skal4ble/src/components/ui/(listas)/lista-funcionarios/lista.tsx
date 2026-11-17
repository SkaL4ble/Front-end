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
  onSelectMember: (member: Member) => void;
  selectedMemberId: string | null;
}

export const ListaF: React.FC<ListaFProps> = ({
  members,
  onSelectMember,
  selectedMemberId,
}) => {
  return (
    <div className={styles.wrapper}>
      {/* Cabeçalho da lista */}
      <div className={styles.headerGrid}>
        {selectedMemberId ? (
          <div className={styles.headerActions}>
            {/* Link 1: Detalhes do funcionário */}
            <Link
              href={`/funcionarios/${selectedMemberId}`}
              className={styles.actionIconBtn}
              title="Detalhes do funcionário"
              aria-label="Detalhes do funcionário"
            >
              <img src="/icon/IDetalhes.svg" alt="Detalhes" />
            </Link>

            {/* Link 2: Cadastrar / Editar funcionário */}
            <Link
              href={`/funcionarios/editar/${selectedMemberId}`}
              className={styles.actionIconBtn}
              title="Editar funcionário"
              aria-label="Editar funcionário"
            >
              <img src="/icon/IEditar.svg" alt="Editar" />
            </Link>
          </div>
        ) : (
          <span />
        )}

        <span>Nome</span>
        <span>Cargo</span>
        <span>Afinidade</span>
        <span>Aptidão p/Ensinar</span>
      </div>

      {/* Lista de cards */}
      <div className={styles.scrollContainer}>
        {members.map((member) => {
          const isSelected = selectedMemberId === member.id;

          return (
            <div
              key={member.id}
              onClick={() => onSelectMember(member)}
              className={`${styles.rowCard} ${isSelected ? styles.selectedCard : ''}`}
              style={{ cursor: 'pointer' }}
            >
              <img
                src={member.avatarUrl || '/avatars/default.png'}
                alt={member.name}
                className={styles.avatar}
              />

              <span className={styles.name}>{member.name}</span>

              <span>{member.role}</span>
              <span>{member.affinity}</span>
              <span>{member.train}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};