import React from 'react';

export default function ToDoPage() {
  return (
    <>
      <header className="header-projetos">
        <h1>To-Do List</h1>

        <div className="row" style={{ gap: '1rem' }}>
          <div className="campo-select">
            <select className="select">
              <option value="">Tickets</option>
              <option value="">Todos</option>
            </select>
            <img src="/icon/IDown.svg" alt="" className="button-icon" />
          </div>

          <button className="big-button">
            <img
              src="/icon/ITrocarProjeto.svg"
              alt=""
              className="button-icon-big"
            />
            <span>Trocar Projeto</span>
          </button>
        </div>
      </header>

      <h2 style={{ marginBottom: '0.5rem' }}>*Nome do Projeto*</h2>

      <section
        className="row flex-1"
        style={{ padding: '1rem', overflowX: 'auto', margin: '0 -1rem' }}
      >
        <div className="column container-25op flex-1">
          <h3>Pendentes</h3>
          <div className="column flex-1">{/* Seus cards aqui */}</div>
          <button className="button-todo">
            <img src="/icon/IAdd.svg" alt="" className="button-icon" />
            <span>Adicionar Ticket</span>
          </button>
        </div>

        <div className="column container-25op flex-1">
          <h3>Em Andamento</h3>
          <div className="column flex-1">{/* Seus cards aqui */}</div>
          <button className="button-todo">
            <img src="/icon/IAdd.svg" alt="" className="button-icon" />
            <span>Adicionar Ticket</span>
          </button>
        </div>

        <div className="column container-25op flex-1">
          <h3>Concluídos</h3>
          <div className="column flex-1">{/* Seus cards aqui */}</div>
          <button className="button-todo">
            <img src="/icon/IAdd.svg" alt="" className="button-icon" />
            <span>Adicionar Ticket</span>
          </button>
        </div>

        <div className="column container-25op flex-1">
          <h3>Transferência</h3>
          <div className="column flex-1">{/* Seus cards aqui */}</div>
          <button className="button-todo">
            <img src="/icon/ITransfer.svg" alt="" className="button-icon" />
            <span>Pedir Transferência</span>
          </button>
        </div>
      </section>
    </>
  );
}