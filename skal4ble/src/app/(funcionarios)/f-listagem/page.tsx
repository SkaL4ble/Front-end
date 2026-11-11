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

        <div className='row'>
          <div className='campo-form'>
            <img src="/icon/IPesquisa.svg" alt="" className="input-icon" />
            <input type="text" id="pesquisa" className="input" placeholder=" " />
            <label htmlFor="pesquisa" className='label'>Pesquise o Funcionário</label>
          </div>

          <div>
            <select className="select">
              <option value="">Filtrar por Departamento</option>
              <option value="rh">Recursos Humanos</option>
              <option value="financeiro">Financeiro</option>
              <option value="TI">TI</option>
            </select>
          </div>

          <div>
            <select className="select">
              <option value="">Filtrar por Departamento</option>
              <option value="rh">Recursos Humanos</option>
              <option value="financeiro">Financeiro</option>
              <option value="TI">TI</option>
            </select>
          </div>
        </div>
      </section>
    </main>
  );
}