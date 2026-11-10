import React from 'react';
import styles from './to-do.module.css'
import { Sidebar } from '@/src/components/ui/sidebar/sidebar';

export default function ToDoPage() {
  return (
    <main>
      <Sidebar />
      <section className='column flex-1 padding-sidebar hidden'>
        <header>
          <div className='column'>
            <h1>To-Do List</h1>
            <h2>*Nome do Projeto*</h2>
          </div>

          <div className='row'>
            <div style={{ alignSelf: 'center' }}>
              <button>Tickets</button>
            </div>
            <div>
              <button className='big-button'>Trocar Projeto</button>
            </div>
          </div>
        </header>

        <section className='row flex-1'
        style={{ padding: '1rem', overflowX: 'auto', marginLeft: '-1rem' }}>
          
          <div className='column container-25op flex-1'>
            <h3>Pendentes</h3>
            <div className='column flex-1'>
              {/* Seus cards aqui */}
            </div>
            <button className='button-todo'>
              <img src="/icon/IAdd.svg" alt="" className="button-icon" />
              <span>Adicionar Ticket</span>
            </button>
          </div>

          <div className='column container-25op flex-1'>
            <h3>Em Andamento</h3>
            <div className='column flex-1'>
              {/* Seus cards aqui */}
            </div>
            <button className='button-todo'>
              <img src="/icon/IAdd.svg" alt="" className="button-icon" />
              <span>Adicionar Ticket</span>
            </button>
          </div>

          <div className='column container-25op flex-1'>
            <h3>Concluídos</h3>
            <div className='column flex-1'>
              {/* Seus cards aqui */}
            </div>
            <button className='button-todo'>
              <img src="/icon/IAdd.svg" alt="" className="button-icon" />
              <span>Adicionar Ticket</span>
            </button>
          </div>

          <div className='column container-25op flex-1'>
            <h3>Transferência</h3>
            <div className='column flex-1'>
              {/* Seus cards aqui */}
            </div>
            <button className='button-todo'>
              <img src="/icon/ITransfer.svg" alt="" className="button-icon" />
              <span>Pedir Transferência</span>
            </button>
          </div>

        </section>
      </section>
    </main>
  );
}