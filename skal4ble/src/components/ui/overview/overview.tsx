import React from 'react';
import styles from './overview.module.css';

interface OverviewPanelProps {
  totalEmployees: number;
  assignedTickets: number;
  toolsCount: number;
  productivityAvg: number;
}

export function OverviewPanel({
  totalEmployees,
  assignedTickets,
  toolsCount,
  productivityAvg,
}: OverviewPanelProps) {
  return (
    <aside className={`container-25op ${styles.overviewContainer}`}>
      <h2 className={styles.title}>Visão Geral dos Funcionários</h2>

      <div className={styles.statsGrid}>
        {/* Card 1: Funcionários */}
        <div className={styles.statCard}>
          <div className={styles.cardHeader}>
            <img src="/icon/overview/IFuncionarios.svg" alt="" className='button-icon' />
            <span>Funcionários</span>
          </div>
          <span className={styles.metricValue}>{totalEmployees}</span>
          <span className={styles.metricSubtitle}>Desenvolvedores Cadastrados</span>
        </div>

        {/* Card 2: Tickets Atribuídos */}
        <div className={styles.statCard}>
          <div className={styles.cardHeader}>
            <img src="/icon/overview/ITicket.svg" alt="" className='button-icon' />
            <span>Tickets</span>
          </div>
          <span className={styles.metricValue}>{assignedTickets}</span>
          <span className={styles.metricSubtitle}>Em Todos os Projetos</span>
        </div>

        {/* Card 3: Ferramentas */}
        <div className={styles.statCard}>
          <div className={styles.cardHeader}>
            <img src="/icon/overview/ICode.svg" alt="" className='button-icon' />
            <span>Ferramentas</span>
          </div>
          <span className={styles.metricValue}>{toolsCount}</span>
          <span className={styles.metricSubtitle}>Tecnologias Identificadas</span>
        </div>

        {/* Card 4: Produtividade */}
        <div className={styles.statCard}>
          <div className={styles.cardHeader}>
            <img src="/icon/overview/IProd.svg" alt="" className='button-icon' />
            <span>Produtividade</span>
          </div>
          <span className={styles.metricValue}>{productivityAvg}%</span>
          <span className={styles.metricSubtitle}>Média Geral</span>
        </div>
      </div>
    </aside>
  );
}