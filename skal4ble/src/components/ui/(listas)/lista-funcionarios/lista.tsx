"use client";

import React from 'react';
import styles from './lista.module.css';
import { Usuario } from '@/src/@types/usuario';

interface ListaFProps {
  members: Usuario[];
  onSelectMember?: (member: Usuario) => void;
  selectedMemberId?: Usuario['usuarioId'] | null;
}

export const ListaF: React.FC<ListaFProps> = ({
  members,
  onSelectMember,
  selectedMemberId,
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.headerGrid}>
        <span>Nome</span>
        <span>Cargo</span>
        <span>Afinidade</span>
        <span>Email Github</span>
        <span />
      </div>

      {/* Lista de cards */}
      <div className={styles.scrollContainer}>
        {members.map((member) => {
          const isSelected = selectedMemberId === member.usuarioId;

          return (
            <article
              key={member.usuarioId}
              onClick={() => onSelectMember?.(member)}
              className={`${styles.rowCard} ${isSelected ? styles.selectedCard : ''}`}
              style={{ cursor: onSelectMember ? 'pointer' : 'default' }}
            >
              <div className={styles.nameCell}>
                <img
                  src={member.imagem || '/avatars/kayo.png'}
                  alt={member.nomeUsuario}
                  className={styles.avatar}
                />
                <strong className={styles.name}>{member.nomeUsuario}</strong>
              </div>

              <span>{member.cargo}</span>

              <span>{member.atuacao}</span>

              <span>{member.emailPessoal}</span>

            </article>
          );
        })}
      </div>
    </div>
  );
};