
"use client";

import React from "react";
import styles from "./lista.module.css";

import { Usuario } from "@/src/@types/usuario";

type UsuarioLista = Usuario & {
    avatarUrl?: string | null;
    emailGithub?: string | null;
    emailGit?: string | null;
    nomeGithub?: string | null;
    fotoPerfil?: string | null;
};

interface ListaFProps {
    members: UsuarioLista[];
    onSelectMember?: (member: UsuarioLista) => void;
    selectedMemberId?: Usuario["usuarioId"] | null;
}

function obterCargo(cargo: unknown): string {
    if (typeof cargo === "string") {
        return cargo || "Não definido";
    }

    if (cargo && typeof cargo === "object" && "nomeCargo" in cargo) {
        return String(cargo.nomeCargo || "Não definido");
    }

    return "Não definido";
}

function obterAtuacao(atuacao: unknown): string {
    if (typeof atuacao === "string") {
        return atuacao || "Não definido";
    }

    if (
        atuacao &&
        typeof atuacao === "object" &&
        "nomeAtuacao" in atuacao
    ) {
        return String(atuacao.nomeAtuacao || "Não definido");
    }

    return "Não definido";
}

export const ListaF: React.FC<ListaFProps> = ({
    members,
    onSelectMember,
    selectedMemberId,
}) => {

    return (
        <div className={styles.wrapper}>

            {/* Cabeçalho da listagem */}

            <div className={styles.headerGrid}>
                <span>Nome</span>
                <span>Cargo</span>
                <span>Afinidade</span>
                <span>Email Github</span>
                <span />
            </div>

            {/* Lista de funcionários */}

            <div className={styles.scrollContainer}>

                {members.length === 0 ? (

                    <div className={styles.emptyState}>
                        <p>Nenhum funcionário encontrado.</p>
                    </div>

                ) : (

                    members.map((member) => {

                        const isSelected =
                            String(selectedMemberId) ===
                            String(member.usuarioId);

                        const nomeCargo = obterCargo(member.cargo);

                        const nomeAtuacao = obterAtuacao(member.atuacao);

                        const imagem =
                            member.avatarUrl ||
                            member.fotoPerfil ||
                            member.imagem ||
                            "/avatars/kayo.png";

                        const emailGithub =
                            member.emailGithub ||
                            member.emailGit ||
                            member.emailPessoal ||
                            "Não informado";

                        return (
                            <article
                                key={member.usuarioId}
                                onClick={() => onSelectMember?.(member)}
                                onKeyDown={(e) => {
                                    if (
                                        onSelectMember &&
                                        (e.key === "Enter" || e.key === " ")
                                    ) {
                                        e.preventDefault();
                                        onSelectMember(member);
                                    }
                                }}
                                role={onSelectMember ? "button" : undefined}
                                tabIndex={onSelectMember ? 0 : undefined}
                                aria-pressed={
                                    onSelectMember ? isSelected : undefined
                                }
                                className={`${styles.rowCard} ${
                                    isSelected ? styles.selectedCard : ""
                                }`}
                                style={{
                                    cursor: onSelectMember
                                        ? "pointer"
                                        : "default",
                                }}
                            >

                                {/* Nome e imagem */}

                                <div className={styles.nameCell}>

                                    <img
                                        src={imagem}
                                        alt={member.nomeUsuario}
                                        className={styles.avatar}
                                        onError={(e) => {
                                            e.currentTarget.src =
                                                "/avatars/kayo.png";
                                        }}
                                    />

                                    <strong className={styles.name}>
                                        {member.nomeUsuario || "Sem nome"}
                                    </strong>

                                </div>

                                {/* Cargo */}

                                <span>
                                    {nomeCargo}
                                </span>

                                {/* Atuação */}

                                <span>
                                    {nomeAtuacao}
                                </span>

                                {/* E-mail do GitHub */}

                                <span>
                                    {emailGithub}
                                </span>

                            </article>
                        );
                    })

                )}

            </div>
        </div>
    );
};
