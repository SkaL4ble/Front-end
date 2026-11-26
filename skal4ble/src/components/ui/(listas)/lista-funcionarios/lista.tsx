"use client";

import React, { useState } from "react";
import Link from "next/link";
import styles from "./lista.module.css";
import { Usuario } from "@/src/@types/usuario";

type MemberItem = Usuario & {
  canTeach?: boolean;
  train?: string;
};

interface ListaFProps {
  members: MemberItem[];
  onSelectMember?: (member: MemberItem) => void;
  selectedMemberId?: string | null;
}

const AVATAR_COLORS = [
  "#5E35B1",
  "#1E88E5",
  "#00897B",
  "#D81B60",
  "#8E24AA",
  "#3949AB",
  "#039BE5",
  "#6D4C41",
];

const getInitials = (name?: string) => {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
};

const getAvatarColor = (seed?: string) => {
  const text = seed || "default";
  let hash = 0;
  for (let i = 0; i < text.length; i += 1) {
    hash = text.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % AVATAR_COLORS.length;
  return AVATAR_COLORS[index];
};

const formatAptidaoEnsinar = (member: MemberItem) => {
  if (member.train) return member.train;
  if (typeof member.canTeach === "boolean") {
    return member.canTeach ? "Sim" : "Não";
  }
  return "Não";
};

function MemberAvatar({ member }: { member: MemberItem }) {
  const [imgError, setImgError] = useState(false);
  const hasImage = Boolean(member.imagem?.trim()) && !imgError;

  if (hasImage) {
    return (
      <img
        src={member.imagem}
        alt={`Foto de ${member.nomeUsuario}`}
        className={styles.avatar}
        onError={() => setImgError(true)}
      />
    );
  }

  const initials = getInitials(member.nomeUsuario);
  const bgColor = getAvatarColor(member.usuarioId || member.nomeUsuario);

  return (
    <span
      className={`${styles.avatar} ${styles.avatarInitials}`}
      style={{ backgroundColor: bgColor }}
      aria-label={`Iniciais de ${member.nomeUsuario}`}
    >
      {initials}
    </span>
  );
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
        <span>Nome</span>
        <span>Cargo</span>
        <span>Afinidade</span>
        <span>Aptidão p/Ensinar</span>
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
              className={`${styles.rowCard} ${isSelected ? styles.selectedCard : ""}`}
              style={{ cursor: onSelectMember ? "pointer" : "default" }}
            >
              {/* Foto ou iniciais à esquerda integrada ao nome */}
              <div className={styles.nameCell}>
                <MemberAvatar member={member} />
                <span className={styles.name}>{member.nomeUsuario}</span>
              </div>

              <span>{member.cargo}</span>
              <span>{member.atuacao}</span>
              <span>{formatAptidaoEnsinar(member)}</span>

              <div
                className={styles.cardActions}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Link 1: Detalhes do funcionário */}
                <Link
                  href={`/funcionarios/${member.usuarioId}`}
                  className={styles.actionIconBtn}
                  title="Detalhes do funcionário"
                  aria-label="Detalhes do funcionário"
                >
                  <img src="/icon/IDetalhes.svg" alt="Detalhes" />
                </Link>

                {/* Link 2: Editar funcionário */}
                <Link
                  href={`/funcionarios/editar/${member.usuarioId}`}
                  className={styles.actionIconBtn}
                  title="Editar funcionário"
                  aria-label="Editar funcionário"
                >
                  <img src="/icon/ITreinoW.svg" alt="Editar" />
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};