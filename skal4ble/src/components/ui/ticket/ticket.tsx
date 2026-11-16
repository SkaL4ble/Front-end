import React from 'react';
import { ArrowLeft, Calendar, Flag, Tag, User } from 'lucide-react';
import estilos from './ticket.module.css';

export type StatusTicket = 'Pendentes' | 'Em Andamento' | 'Concluídos' | 'Transferência';
export type PrioridadeTicket = 'Alta' | 'Média' | 'Baixa';

export interface TicketProps {
  id: string;
  titulo: string;
  descricao?: string;
  status: StatusTicket;
  prioridade?: PrioridadeTicket;
  categoria?: string;
  prazo?: string;
  responsavel?: string;
  fotoResponsavel?: string;
  aoVoltar?: () => void;
  aoAvancar?: () => void;
  aoTransferir?: () => void;
  aoMudarPrioridade?: () => void;
}

export default function Ticket({
  id,
  titulo,
  descricao,
  status,
  prioridade = 'Média',
  categoria,
  prazo,
  responsavel,
  fotoResponsavel,
  aoVoltar,
  aoAvancar,
  aoTransferir,
  aoMudarPrioridade,
}: TicketProps) {
  const classeBordaStatus =
    status === 'Pendentes'
      ? estilos.bordaPendente
      : status === 'Em Andamento'
      ? estilos.bordaAndamento
      : status === 'Concluídos'
      ? estilos.bordaConcluido
      : estilos.bordaTransferencia;

  const classePrioridade =
    prioridade === 'Alta'
      ? estilos.prioridadeAlta
      : prioridade === 'Média'
      ? estilos.prioridadeMedia
      : estilos.prioridadeBaixa;

  return (
    <article className={`${estilos.ticket} ${classeBordaStatus}`}>
      <div className={estilos.cabecalho}>
        <div className={estilos.grupoEsquerda}>
          <span className={estilos.codigo}>#{id}</span>
          {categoria && (
            <span className={estilos.categoria}>
              <Tag size={11} />
              {categoria}
            </span>
          )}
        </div>

        <span
          className={`${estilos.badgePrioridade} ${classePrioridade}`}
          onClick={aoMudarPrioridade}
          style={{ cursor: aoMudarPrioridade ? 'pointer' : 'default' }}
          title="Clique para alterar a prioridade"
        >
          <Flag size={11} />
          {prioridade}
        </span>
      </div>

      <h4 className={estilos.titulo}>{titulo}</h4>
      {descricao && <p className={estilos.descricao}>{descricao}</p>}

      {prazo && (
        <div className={estilos.linhaPrazo}>
          <Calendar size={13} />
          <span>Entrega: {prazo}</span>
        </div>
      )}

      <div className={estilos.rodape}>
        <div className={estilos.infoFuncionario}>
          <div className={estilos.avatarContainer}>
            {fotoResponsavel ? (
              <img
                src={fotoResponsavel}
                alt={responsavel || 'Funcionário'}
                className={estilos.fotoAvatar}
              />
            ) : (
              <User size={15} />
            )}
          </div>
          <span className={estilos.nomeFuncionario}>
            {responsavel || 'Não atribuído'}
          </span>
        </div>

        <div className={estilos.acoes}>
          {/* Botão para voltar o ticket para a etapa anterior */}
          {status !== 'Pendentes' && aoVoltar && (
            <button
              type="button"
              className={estilos.botaoSecundario}
              onClick={aoVoltar}
              title="Voltar etapa"
            >
              <ArrowLeft size={14} />
            </button>
          )}

          {status !== 'Concluídos' && aoAvancar && (
            <button
              type="button"
              className={estilos.botaoMover}
              onClick={aoAvancar}
            >
              {status === 'Pendentes'
                ? 'Iniciar'
                : status === 'Transferência'
                ? 'Aceitar'
                : 'Concluir'}
            </button>
          )}

          {status !== 'Concluídos' && aoTransferir && (
            <button
              type="button"
              className={estilos.botaoSecundario}
              onClick={aoTransferir}
              title="Transferir Ticket"
            >
              <img src="/icon/ITransfer.svg" alt="Transferir" className={estilos.iconeMini} />
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
