import React from 'react';
import { Sidebar } from '@/src/components/ui/sidebar/sidebar';
import { ListaF, Member } from '@/src/components/ui/(listas)/lista-funcionarios/lista';
import { OverviewPanel } from '@/src/components/ui/overview/overview';

const mockMembers: Member[] = Array.from({ length: 12 }, (_, index) => ({
  id: String(index + 1),
  name: 'Kayo',
  github: 'Kayolol',
  role: 'DEV Pleno',
  affinity: 'Full-Stack',
  avatarUrl: '/avatars/kayo.png',
}));

export default function ListagemFuncionarios() {
  return (
    <main>
      <Sidebar />
      <section className='column flex-1 padding-sidebar hidden'>
        <header>
          <div>
            <h1>Funcionários</h1>
          </div>

          <section className='row'>
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
            
            <div>
              <button className='big-button'>
                <img src="/icon/I+Funcionario.svg" alt="" className="button-icon-big" />
                <span>Novo Funcionário</span>
              </button>
            </div>
          </section>

        </header>

        <div className='row'
        style={{ padding: "1rem 0rem" }}>
          <div className='campo-form'>
            <img src="/icon/IPesquisa.svg" alt="" className="input-icon" />
            <input type="text" id="pesquisa" className="input" placeholder=" " />
            <label htmlFor="pesquisa" className='label'>Pesquise o Funcionário</label>
          </div>
        </div>

        <section className="row flex-1"
        style={{ minHeight: 0, alignItems: 'center', gap: '2rem' }}>
          <div style={{ flex: 1, minWidth: 0, height: '100%' }}>
            <ListaF members={mockMembers} /> {/* MUDAR NO CONSUMO */}
          </div>

          <OverviewPanel totalEmployees={mockMembers.length} assignedTickets={248}
            toolsCount={8} productivityAvg={82}/>
        </section>
      </section>
    </main>
  );
}