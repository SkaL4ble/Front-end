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
  resgatado?: boolean;
}

// Substitua apenas os caminhos abaixo pelos arquivos reais da sua pasta public/
const ICONES_ELO: Record<EloId, string> = {
  bronze: '/icon/elos/bronze.png',
  prata: '/icon/elos/prata.png',
  ouro: '/icon/elos/ouro.png',
  platina: '/icon/elos/platina.png',
};

const DIVISOES_INICIAIS: DivisaoElo[] = [
  {
    id: 'bronze',
    nome: 'Bronze',
    icone: ICONES_ELO.bronze,
    recompensa: 'Kit Boas-Vindas',
    descricaoRecompensa: 'Acesso completo à trilha técnica e badge inicial no perfil.',
    requisito: 'Divisão inicial',
    resgatado: true,
  },
  {
    id: 'prata',
    nome: 'Prata',
    icone: ICONES_ELO.prata,
    recompensa: 'Vale Livro ou Curso',
    descricaoRecompensa: 'Auxílio de até R\$ 150 em livros técnicos ou cursos da stack.',
    requisito: 'Concluir módulo base + 3 entregas',
    resgatado: false,
  },
  {
    id: 'ouro',
    nome: 'Ouro',
    icone: ICONES_ELO.ouro,
    recompensa: 'Upgrade de Setup',
    descricaoRecompensa: 'Periférico ergonômico ou acessório para estação de trabalho.',
    requisito: 'Concluir trilha intermediária + code reviews',
    resgatado: false,
  },
  {
    id: 'platina',
    nome: 'Platina',
    icone: ICONES_ELO.platina,
    recompensa: 'Day Off + Certificação',
    descricaoRecompensa: '1 dia de folga remunerada e custeio de certificação oficial.',
    requisito: 'Domínio completo da trilha + mentoria',
    resgatado: false,
  },
];

export default function ToDoPage() {
  const [divisoes, setDivisoes] = useState<DivisaoElo[]>(DIVISOES_INICIAIS);

  // Estado mockado da posição atual do funcionário na trilha
  const [eloAtualId] = useState<EloId>('prata');
  const [progressoNoEloAtual] = useState<number>(60); // 0 a 100% rumo ao próximo elo
  const [eloSelecionadoId, setEloSelecionadoId] = useState<EloId>('prata');

  const funcionario = {
    nome: 'Kayo',
  };

  const indiceEloAtual = useMemo(
    () => divisoes.findIndex((d) => d.id === eloAtualId),
    [divisoes, eloAtualId]
  );

  const eloAtual = divisoes[indiceEloAtual] ?? divisoes[0];
  const proximoElo = divisoes[indiceEloAtual + 1] ?? null;

  const eloSelecionado = useMemo(
    () => divisoes.find((d) => d.id === eloSelecionadoId) ?? eloAtual,
    [divisoes, eloSelecionadoId, eloAtual]
  );

  // Calcula a largura da barra alinhada ao centro de cada uma das 4 colunas (12.5%, 37.5%, 62.5%, 87.5%)
  const percentualBarra = useMemo(() => {
    const total = divisoes.length;
    if (total === 0 || indiceEloAtual < 0) return 0;

    const passoColuna = 100 / total; // 25% por coluna
    const centroAtual = passoColuna * indiceEloAtual + passoColuna / 2;

    if (!proximoElo) {
      return 100;
    }

    const avanco = (Math.min(100, Math.max(0, progressoNoEloAtual)) / 100) * passoColuna;
    return centroAtual + avanco;
  }, [divisoes.length, indiceEloAtual, proximoElo, progressoNoEloAtual]);

  const handleResgatarRecompensa = (id: EloId) => {
    setDivisoes((prev) =>
      prev.map((divisao) =>
        divisao.id === id ? { ...divisao, resgatado: true } : divisao
      )
    );
  };

  const indiceSelecionado = divisoes.findIndex((d) => d.id === eloSelecionado.id);
  const eloSelecionadoAlcancado = indiceSelecionado <= indiceEloAtual;

  return (
    <div className={styles.pageWrapper}>
      <header className='header-projetos'>
        <h1>Trilha de {funcionario.nome}</h1>
      </header>

      <div className={styles.centerStage}>
        <section className={`${styles.eloHeroCard} panel-enter`}>
          {/* Destaque do Elo Atual */}
          <div className={styles.eloSummary}>
            <p className={styles.eloGreeting}>Olá {funcionario.nome}, seu elo atual é</p>

            <div className={styles.currentEloShowcase}>
              <div className={styles.currentEloIconFrame}>
                <img
                  src={eloAtual.icone}
                  alt={`Elo ${eloAtual.nome}`}
                  className={styles.currentEloImg}
                />
              </div>
              <span className={styles.eloBigName}>{eloAtual.nome}</span>
            </div>

            <p className={styles.eloNextHint}>
              {proximoElo ? (
                <>
                  <strong>{progressoNoEloAtual}% concluído</strong> rumo à divisão{' '}
                  <strong>{proximoElo.nome}</strong> ({proximoElo.recompensa})
                </>
              ) : (
                <strong>Você alcançou o elo máximo da trilha!</strong>
              )}
            </p>
          </div>

          {/* Barra Horizontal de Divisões */}
          <div className={styles.trackArea}>
            <div className={styles.progressTrack}>
              <div
                className={styles.progressFill}
                style={{ width: `${Math.min(100, Math.max(0, percentualBarra))}%` }}
              />

              <div className={styles.milestonesOverlay}>
                {divisoes.map((divisao, index) => {
                  const alcancado = index <= indiceEloAtual;
                  const selecionado = divisao.id === eloSelecionado.id;

                  return (
                    <div key={divisao.id} className={styles.dotCell}>
                      <button
                        type='button'
                        onClick={() => setEloSelecionadoId(divisao.id)}
                        className={`${styles.milestoneDot} ${
                          alcancado ? styles.dotUnlocked : styles.dotLocked
                        } ${selecionado ? styles.dotSelected : ''}`}
                        title={`Divisão ${divisao.nome}`}
                      >
                        {alcancado ? (
                          <span className={styles.innerCheck} />
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

            {/* Ícones e Nomes dos 4 Elos abaixo da barra */}
            <div className={styles.milestonesLabelsGrid}>
              {divisoes.map((divisao, index) => {
                const alcancado = index <= indiceEloAtual;
                const atual = divisao.id === eloAtual.id;
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

                    <div className={styles.eloIconBox}>
                      <img
                        src={divisao.icone}
                        alt={divisao.nome}
                        className={styles.eloEmblemImg}
                      />
                    </div>

                    <span className={styles.rewardTitle}>{divisao.recompensa}</span>

                    {atual && <span className={styles.currentTag}>Elo Atual</span>}

                    {!atual && alcancado && !divisao.resgatado && (
                      <span className={styles.claimBadge}>Disponível</span>
                    )}

                    {divisao.resgatado && divisao.id !== 'bronze' && (
                      <span className={styles.claimedBadge}>Resgatado ✓</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Rodapé com Detalhes & Resgate da Divisão Selecionada */}
          <div className={styles.selectedRewardBar}>
            <div className={styles.selectedRewardInfo}>
              <span className={styles.selectedTag}>Divisão {eloSelecionado.nome}</span>
              <strong>{eloSelecionado.recompensa}:</strong>
              <span>{eloSelecionado.descricaoRecompensa}</span>
            </div>

            {eloSelecionadoAlcancado ? (
              eloSelecionado.resgatado ? (
                <span className={styles.statusDoneText}>Recompensa resgatada ✓</span>
              ) : (
                <button
                  type='button'
                  className='button-todo'
                  onClick={() => handleResgatarRecompensa(eloSelecionado.id)}
                >
                  Resgatar Recompensa
                </button>
              )
            ) : (
              <span className={styles.statusLockedText}>
                Requisito: {eloSelecionado.requisito}
              </span>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}