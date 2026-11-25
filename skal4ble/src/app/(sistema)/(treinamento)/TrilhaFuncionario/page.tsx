'use client';

import React, { useMemo, useState } from 'react';
import styles from './trilha.module.css';

export type EloId = 'bronze' | 'prata' | 'ouro' | 'platina';

interface DivisaoElo {
  id: EloId;
  nome: string;
  icone: string;
  recompensa: string;
  descricaoRecompensa: string;
  requisito: string;
}

const ICONES_ELO: Record<EloId, string> = {
  bronze: '/icon/badges/Bronze.svg',
  prata: '/icon/badges/Prata.svg',
  ouro: '/icon/badges/Ouro.svg',
  platina: '/icon/badges/Platina.svg',
};

const DIVISOES: DivisaoElo[] = [
  {
    id: 'bronze',
    nome: 'Bronze',
    icone: ICONES_ELO.bronze,
    recompensa: 'Kit Boas-Vindas',
    descricaoRecompensa: 'Acesso completo à trilha técnica e badge inicial no perfil.',
    requisito: 'Divisão inicial',
  },
  {
    id: 'prata',
    nome: 'Prata',
    icone: ICONES_ELO.prata,
    recompensa: 'Vale Livro ou Curso',
    descricaoRecompensa: 'Auxílio de até R$ 150 em livros técnicos ou cursos da stack.',
    requisito: 'Concluir módulo base + 3 entregas',
  },
  {
    id: 'ouro',
    nome: 'Ouro',
    icone: ICONES_ELO.ouro,
    recompensa: 'Upgrade de Setup',
    descricaoRecompensa: 'Periférico ergonômico ou acessório para estação de trabalho.',
    requisito: 'Concluir trilha intermediária + code reviews',
  },
  {
    id: 'platina',
    nome: 'Platina',
    icone: ICONES_ELO.platina,
    recompensa: 'Day Off + Certificação',
    descricaoRecompensa: '1 dia de folga remunerada e custeio de certificação oficial.',
    requisito: 'Domínio completo da trilha + mentoria',
  },
];

export default function ToDoPage() {
  // Estado mockado da posição atual do funcionário na trilha
  const [eloAtualId] = useState<EloId>('prata');
  const [progressoNoEloAtual] = useState<number>(60); // 0 a 100% rumo ao próximo elo
  const [eloSelecionadoId, setEloSelecionadoId] = useState<EloId>('prata');

  const funcionario = {
    nome: 'Kayo',
  };

  const indiceEloAtual = useMemo(
    () => DIVISOES.findIndex((d) => d.id === eloAtualId),
    [eloAtualId]
  );

  const eloAtual = DIVISOES[indiceEloAtual] ?? DIVISOES[0];
  const proximoElo = DIVISOES[indiceEloAtual + 1] ?? null;

  const eloSelecionado = useMemo(
    () => DIVISOES.find((d) => d.id === eloSelecionadoId) ?? eloAtual,
    [eloSelecionadoId, eloAtual]
  );

  // Calcula a largura da barra alinhada ao centro de cada uma das 4 colunas
  const percentualBarra = useMemo(() => {
    const total = DIVISOES.length;
    if (total === 0 || indiceEloAtual < 0) return 0;

    const passoColuna = 100 / total; // 25% por coluna
    const centroAtual = passoColuna * indiceEloAtual + passoColuna / 2;

    if (!proximoElo) {
      return 100;
    }

    const avanco = (Math.min(100, Math.max(0, progressoNoEloAtual)) / 100) * passoColuna;
    return centroAtual + avanco;
  }, [indiceEloAtual, proximoElo, progressoNoEloAtual]);

  const indiceSelecionado = DIVISOES.findIndex((d) => d.id === eloSelecionado.id);
  const eloSelecionadoAlcancado = indiceSelecionado <= indiceEloAtual;

  return (
    <div className={styles.pageWrapper}>
      <header className='header-projetos'>
        <h1>Trilha de {funcionario.nome}</h1>
      </header>

      <section className={`container-25op ${styles.eloContainer} panel-enter`}>
        {/* Linha Superior: Elo Atual à esquerda + Detalhes do Elo Selecionado à direita */}
        <div className={styles.topRow}>
          <div className={styles.eloSummary}>
            <p className={styles.eloGreeting}>Olá {funcionario.nome}, seu elo atual é:</p>

            <div className={styles.currentEloShowcase}>
              <img
                src={eloAtual.icone}
                alt={`Elo ${eloAtual.nome}`}
                className={styles.currentEloImg}
              />
              <span className={styles.eloBigName}>{eloAtual.nome}</span>
            </div>

            <p className={styles.eloNextHint}>
              {proximoElo ? (
                <>
                  <strong>{progressoNoEloAtual}% concluído</strong> rumo à divisão{' '}
                  <strong>{proximoElo.nome}.</strong>
                </>
              ) : (
                <strong>Você alcançou o elo máximo da trilha!</strong>
              )}
            </p>
          </div>

          {/* Card de Detalhes da Divisão Selecionada */}
          <aside className={styles.selectedRewardCard}>
            <div className={styles.selectedCardHeader}>
              <span className={styles.selectedTag}>Divisão {eloSelecionado.nome}</span>

              {eloSelecionadoAlcancado ? (
                <span className={styles.statusDoneText}>Divisão alcançada ✓</span>
              ) : (
                <span className={styles.statusLockedBadge}>Divisão bloqueada</span>
              )}
            </div>

            <div className={styles.selectedCardBody}>
              <h2 className={styles.selectedRewardTitle}>{eloSelecionado.recompensa}</h2>
              <p className={styles.selectedRewardDesc}>
                {eloSelecionado.descricaoRecompensa}
              </p>
            </div>

            <div className={styles.selectedCardFooter}>
              <strong>Requisito:</strong>
              <span>{eloSelecionado.requisito}</span>
            </div>
          </aside>
        </div>

        {/* Barra Horizontal de Divisões */}
        <div className={styles.trackArea}>
          <div className={styles.progressTrack}>
            <div
              className={styles.progressFill}
              style={{ width: `${Math.min(100, Math.max(0, percentualBarra))}%` }}
            />

            <div className={styles.milestonesOverlay}>
              {DIVISOES.map((divisao, index) => {
                const alcancado = index <= indiceEloAtual;
                const atual = divisao.id === eloAtual.id;
                const selecionado = divisao.id === eloSelecionado.id;

                return (
                  <div key={divisao.id} className={styles.dotCell}>
                    <button
                      type='button'
                      onClick={() => setEloSelecionadoId(divisao.id)}
                      className={`${styles.milestoneDot} ${
                        atual
                          ? styles.dotCurrent
                          : alcancado
                          ? styles.dotUnlocked
                          : styles.dotLocked
                      } ${selecionado ? styles.dotSelected : ''}`}
                      title={
                        atual
                          ? `Divisão ${divisao.nome} (Elo atual)`
                          : `Divisão ${divisao.nome}`
                      }
                    >
                      {atual ? (
                        <svg
                          viewBox='0 0 24 24'
                          fill='currentColor'
                          className={styles.currentPinIcon}
                        >
                          <path d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z' />
                        </svg>
                      ) : alcancado ? (
                        <svg
                          viewBox='0 0 24 24'
                          fill='none'
                          stroke='currentColor'
                          strokeWidth='3'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          className={styles.checkIcon}
                        >
                          <polyline points='20 6 9 17 4 12' />
                        </svg>
                      ) : (
                        <svg
                          viewBox='0 0 24 24'
                          fill='currentColor'
                          className={styles.lockIcon}
                        >
                          <path d='M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z' />
                        </svg>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Escudos e Nomes dos 4 Elos abaixo da barra */}
          <div className={styles.milestonesLabelsGrid}>
            {DIVISOES.map((divisao, index) => {
              const alcancado = index <= indiceEloAtual;
              const selecionado = divisao.id === eloSelecionado.id;

              return (
                <div
                  key={divisao.id}
                  onClick={() => setEloSelecionadoId(divisao.id)}
                  className={`${styles.milestoneItem} ${
                    alcancado ? styles.itemUnlocked : styles.itemLocked
                  } ${selecionado ? styles.itemSelected : ''}`}
                >
                  <span className={styles.eloTierTitle}>{divisao.nome}</span>

                  <img
                    src={divisao.icone}
                    alt={divisao.nome}
                    className={styles.eloEmblemImg}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}