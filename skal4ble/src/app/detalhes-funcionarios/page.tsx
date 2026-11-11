import React from 'react';
import { Briefcase,  Mail, Pencil, User } from 'lucide-react';
import Sidebar from '../../components/ui/sidebar/sidebar';
import estilos from './detalhes-funcionarios.module.css';

export default function DetalhesFuncionariosPage() {
  return (
    <main>
      <Sidebar />
      <section className={`column flex-1 padding-sidebar hidden ${estilos.conteudoPagina}`}>
        <div className={`column ${estilos.cabecalhoPagina}`}>
          <h1 className={estilos.tituloPagina}>Detalhes do Funcionário</h1>
          <button type="button" className={estilos.botaoEditar}>
            <Pencil size={16} />
            Editar
          </button>
        </div>

        {/* Grade principal dividida em 3 colunas */}
        <div className={`row flex-1 ${estilos.gradeCards}`}>
          
          {/* COLUNA 1: Card 1 (Funcionário) + Card 2 (Resumo de Aptidão) */}
          <div className={`column ${estilos.colunaCards} ${estilos.colunaEsquerda}`}>
            <section className={`container-25op column ${estilos.card}`}>
              <div className={estilos.containerFoto}>
                <img
                  src="/avatar-placeholder.png"
                  alt="Foto do Funcionário"
                  className={estilos.fotoFuncionario}
                />
              </div>

              <label className={`column ${estilos.campo}`}>
                <span>Gmail</span>
                <div className={estilos.entradaComIcone}>
                  <Mail className={estilos.iconeEntrada} size={18} />
                  <input type="email" placeholder="funcionario@gmail.com" />
                </div>
              </label>

              <label className={`column ${estilos.campo}`}>
                <span>Nome do GitHub</span>
                <div className={estilos.entradaComIcone}>
                  {/* <Github className={estilos.iconeEntrada} size={18} /> */}
                  <input type="text" placeholder="@usuario" />
                </div>
              </label>

              <label className={`column ${estilos.campo}`}>
                <span>Email</span>
                <div className={estilos.entradaComIcone}>
                  <Mail className={estilos.iconeEntrada} size={18} />
                  <input type="email" placeholder="email@skal4ble.com" />
                </div>
              </label>
            </section>

            <section className={`container-25op column flex-1 ${estilos.card}`}>
              <h2 className={estilos.subtituloCard}>Resumo de Aptidão</h2>
              <div className={estilos.areaConteudoCard}>
                {/* Conteúdo do resumo de aptidão */}
              </div>
            </section>
          </div>

          {/* COLUNA 2: Card 3 (Informações Gerais) + Card 4 (Gráfico de Desempenho) */}
          <div className={`column flex-1 ${estilos.colunaCards} ${estilos.colunaMeio}`}>
            <section className={`container-25op column ${estilos.card}`}>
              <h2 className={estilos.subtituloCard}>Informações Gerais</h2>

              <label className={`column ${estilos.campo}`}>
                <span>Nome</span>
                <div className={estilos.entradaComIcone}>
                  <User className={estilos.iconeEntrada} size={18} />
                  <input type="text" placeholder="Nome completo" />
                </div>
              </label>

              <label className={`column ${estilos.campo}`}>
                <span>Cargo</span>
                <div className={estilos.entradaComIcone}>
                  <Briefcase className={estilos.iconeEntrada} size={18} />
                  <input type="text" placeholder="Ex: Desenvolvedor Front-end" />
                </div>
              </label>
            </section>

            <section className={`container-25op column flex-1 ${estilos.card}`}>
              <h2 className={estilos.subtituloCard}>Gráfico de Desempenho</h2>
              <div className={estilos.areaConteudoCard}>
                {/* Componente do gráfico de desempenho */}
              </div>
            </section>
          </div>

          {/* COLUNA 3: Card 5 (Ferramentas ocupando a altura inteira restante) */}
          <section className={`container-25op column flex-1 ${estilos.card} ${estilos.colunaDireita}`}>
            <h2 className={estilos.subtituloCard}>Ferramentas</h2>
            <div className={estilos.areaConteudoCard}>
              {/* Lista ou grade de ferramentas */}
            </div>
          </section>

        </div>
      </section>
    </main>
  );
}
