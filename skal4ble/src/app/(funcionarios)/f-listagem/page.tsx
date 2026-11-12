import React from 'react';
import { Sidebar } from '@/src/components/ui/sidebar/sidebar';

export default function ListagemFuncionarios() {
  return (
    <main>
      <Sidebar />
      <section className='column flex-1 padding-sidebar hidden'>
        <header>
          <div>
            <h1>Funcionários</h1>
          </div>

          <div>
            <button className='big-button'>
              <img src="/icon/I+Funcionario.svg" alt="" className="button-icon-big" />
              <span>Cadastrar Funcionário</span>
            </button>
          </div>
        </header>

        <div className='row'
        style={{ padding: "1rem 0rem" }}>
          <div className='campo-form'>
            <img src="/icon/IPesquisa.svg" alt="" className="input-icon" />
            <input type="text" id="pesquisa" className="input" placeholder=" " />
            <label htmlFor="pesquisa" className='label'>Pesquise o Funcionário</label>
          </div>

          <div className='campo-select'>
            <select className="select">
              <option value="">Atuação</option>
              <option value="">Todos</option>
              <option value="">Back-End</option>
              <option value="">Full-Stack</option>
              <option value="">Front-End</option>
            </select>
            <img src="/icon/IDown.svg" alt="" className='button-icon' />
          </div>

          <div className='campo-select'>
            <select className="select">
              <option value="">Cargo</option>
              <option value="">Todos</option>
            </select>
            <img src="/icon/IDown.svg" alt="" className='button-icon' />
          </div>

          <div className='campo-select'>
            <select className="select">
              <option value="">Apto a Ensinar</option>
              <option value="">Todos</option>
            </select>
            <img src="/icon/IDown.svg" alt="" className='button-icon' />
          </div>
        </div>
      </section>
    </main>
  );
}