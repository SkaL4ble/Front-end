'use client';

import React, { useState } from 'react';
import styles from './to-do.module.css';
import { Sidebar } from '../../components/ui/sidebar/sidebar';
import Ticket, { PrioridadeTicket, StatusTicket } from '../../components/ui/ticket/ticket';

interface ItemTicket {
  id: string;
  titulo: string;
  descricao: string;
  status: StatusTicket;
  prioridade: PrioridadeTicket;
  categoria?: string;
  prazo?: string;
  responsavel: string;
  fotoResponsavel?: string;
}

export default function ToDoPage() {
  const [filtro, setFiltro] = useState<'tickets' | 'todos'>('todos');

  const [tickets, setTickets] = useState<ItemTicket[]>([
    {
      id: '01',
      titulo: 'Criar tela de Detalhes',
      descricao: 'Implementar cards de perfil, desempenho e ferramentas.',
      status: 'Em Andamento',
      prioridade: 'Alta',
      categoria: 'Front-end',
      prazo: '20/11/2026',
      responsavel: 'Ana Silva',
    },
    {
      id: '02',
      titulo: 'Integrar API de Login',
      descricao: 'Conectar autenticação com o back-end da L4.',
      status: 'Pendentes',
      prioridade: 'Média',
      categoria: 'Back-end',
      prazo: '22/11/2026',
      responsavel: 'Carlos Souza',
    },
    {
      id: '03',
      titulo: 'Estilizar Tela de Login',
      descricao: 'Ajustar brilho roxo e alinhamento dos inputs.',
      status: 'Concluídos',
      prioridade: 'Baixa',
      categoria: 'UI/UX',
      prazo: '15/11/2026',
      responsavel: 'Dev Jr',
    },
  ]);

  // Alterna a prioridade ao clicar na etiqueta do card (Baixa -> Média -> Alta)
  const alternarPrioridade = (idDoTicket: string) => {
    setTickets((listaAtual) =>
      listaAtual.map((ticket) => {
        if (ticket.id !== idDoTicket) return ticket;

        let novaPrioridade: PrioridadeTicket = 'Média';
        if (ticket.prioridade === 'Baixa') novaPrioridade = 'Média';
        if (ticket.prioridade === 'Média') novaPrioridade = 'Alta';
        if (ticket.prioridade === 'Alta') novaPrioridade = 'Baixa';

        return { ...ticket, prioridade: novaPrioridade };
      })
    );
  };

  // Move o ticket para a próxima etapa do fluxo
  const avancarTicket = (id: string) => {
    setTickets((listaAtual) =>
      listaAtual.map((ticket) => {
        if (ticket.id !== id) return ticket;
        if (ticket.status === 'Pendentes') return { ...ticket, status: 'Em Andamento' };
        if (ticket.status === 'Transferência') return { ...ticket, status: 'Em Andamento' };
        if (ticket.status === 'Em Andamento') return { ...ticket, status: 'Concluídos' };
        return ticket;
      })
    );
  };

  const voltarTicket = (id: string) => {
  setTickets((listaAtual) =>
    listaAtual.map((ticket) => {
      if (ticket.id !== id) return ticket;
      if (ticket.status === 'Concluídos') return { ...ticket, status: 'Em Andamento' };
      if (ticket.status === 'Em Andamento') return { ...ticket, status: 'Pendentes' };
      if (ticket.status === 'Transferência') return { ...ticket, status: 'Pendentes' };
      return ticket;
    })
  );
};

  // Envia o ticket para a coluna de Transferência
  const transferirTicket = (id: string) => {
    setTickets((listaAtual) =>
      listaAtual.map((ticket) =>
        ticket.id === id ? { ...ticket, status: 'Transferência' } : ticket
      )
    );
  };

  // Adiciona um novo ticket já permitindo escolher a prioridade
  const adicionarTicket = (statusDestino: StatusTicket) => {
    const tituloNovo = window.prompt(`Título do novo ticket em "${statusDestino}":`);
    if (!tituloNovo || !tituloNovo.trim()) return;

    const descricaoNova = window.prompt('Descrição breve (opcional):') || '';
    const prioridadeDigitada = window.prompt('Prioridade (Alta, Média ou Baixa):', 'Média');

    let prioridadeEscolhida: PrioridadeTicket = 'Média';
    if (prioridadeDigitada) {
      const textoLimpo = prioridadeDigitada.trim().toLowerCase();
      if (textoLimpo === 'alta') prioridadeEscolhida = 'Alta';
      if (textoLimpo === 'baixa') prioridadeEscolhida = 'Baixa';
    }

    const proximoNumero = String(tickets.length + 1).padStart(2, '0');

    const novoTicket: ItemTicket = {
      id: proximoNumero,
      titulo: tituloNovo.trim(),
      descricao: descricaoNova.trim(),
      status: statusDestino,
      prioridade: prioridadeEscolhida,
      responsavel: 'Dev Jr',
    };

    setTickets((listaAtual) => [...listaAtual, novoTicket]);
  };

  const listarPorStatus = (statusColuna: StatusTicket) => {
    if (filtro === 'tickets' && statusColuna === 'Concluídos') {
      return [];
    }
    return tickets.filter((t) => t.status === statusColuna);
  };

  const estiloListaCards: React.CSSProperties = {
    width: '100%',
    gap: '0.75rem',
    overflowY: 'auto',
    margin: '0.75rem 0',
    paddingRight: '0.25rem',
  };

  const colunas: { titulo: StatusTicket; textoBotao: string; iconeBotao: string }[] = [
    { titulo: 'Pendentes', textoBotao: 'Adicionar Ticket', iconeBotao: '/icon/IAdd.svg' },
    { titulo: 'Em Andamento', textoBotao: 'Adicionar Ticket', iconeBotao: '/icon/IAdd.svg' },
    { titulo: 'Concluídos', textoBotao: 'Adicionar Ticket', iconeBotao: '/icon/IAdd.svg' },
    { titulo: 'Transferência', textoBotao: 'Pedir Transferência', iconeBotao: '/icon/ITransfer.svg' },
  ];

  return (
    <main>
      <Sidebar />
      <section className='column flex-1 padding-sidebar hidden'>
        <header>
          <div className='column'>
            <h1>To-Do List</h1>
            <h2>*Nome do Projeto*</h2>
          </div>

          <div className='row' style={{ marginRight: '1rem', transform: 'translateY(-50%)' }}>
            <div className='campo-select'>
              <select
                className='select'
                value={filtro}
                onChange={(e) => setFiltro(e.target.value as 'tickets' | 'todos')}
              >
                <option value='todos'>Todos</option>
                <option value='tickets'>Tickets (Ativos)</option>
              </select>
              <img src='/icon/IDown.svg' alt='' className='button-icon' />
            </div>
            <div>
              <button type='button' className='big-button'>
                <img src='/icon/ITrocarProjeto.svg' alt='' className='button-icon-big' />
                <span>Trocar Projeto</span>
              </button>
            </div>
          </div>
        </header>

        <section
          className='row flex-1'
          style={{ padding: '1rem', overflowX: 'auto', marginLeft: '-1rem', minHeight: 0 }}
        >
          {colunas.map((coluna) => (
            <div key={coluna.titulo} className='column container-25op flex-1'>
              <h3>{coluna.titulo}</h3>
              <div className='column flex-1' style={estiloListaCards}>
                {listarPorStatus(coluna.titulo).map((ticket) => (
                  <Ticket
                    key={ticket.id}
                    {...ticket}
                    aoVoltar={
                      coluna.titulo !== 'Pendentes'
                        ? () => voltarTicket(ticket.id)
                        : undefined
                    }
                    aoAvancar={
                      coluna.titulo !== 'Concluídos'
                        ? () => avancarTicket(ticket.id)
                        : undefined
                    }
                    aoTransferir={
                      coluna.titulo !== 'Concluídos' && coluna.titulo !== 'Transferência'
                        ? () => transferirTicket(ticket.id)
                        : undefined
                    }
                    aoMudarPrioridade={() => alternarPrioridade(ticket.id)}
                  />
                ))}
              </div>

              <button
                type='button'
                className='button-todo'
                onClick={() => adicionarTicket(coluna.titulo)}
              >
                <img src={coluna.iconeBotao} alt='' className='button-icon' />
                <span>{coluna.textoBotao}</span>
              </button>
            </div>
          ))}
        </section>
      </section>
    </main>
  );
}
