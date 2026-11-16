import React from 'react';
import { Briefcase, Calendar, ChevronDown, Code2, Layers, Mail, Pencil, Route } from 'lucide-react';
import Sidebar from '../../components/ui/sidebar/sidebar';
import estilos from './detalhes-funcionarios.module.css';

export default function DetalhesFuncionariosPage() {
  const metricasDesempenho = [
    { nome: 'Complexidade', valor: 82 },
    { nome: 'Qualidade', valor: 94 },
    { nome: 'Quantidade', valor: 76 },
    { nome: 'Velocidade', valor: 88 }, 

    /*Exemplo de dados isso vai ser chamado na API posteriormente*/
  ];

  return (
    <main>
      <Sidebar />
      <section className={estilos.conteudoPagina}>
        <div className={estilos.cabecalhoPagina}>
          <h1 className={estilos.tituloPagina}>Detalhes do Funcionário</h1>
          <button type="button" className={estilos.botaoPrimario}>
            <Pencil size={18} />
            Editar
          </button>
        </div>

        {/* Grade de 3 Colunas */}
        <div className={estilos.gradePrincipal}>
          
          {/* COLUNA 1: Funcionário + Resumo de Aptidão */}
          <div className={estilos.colunaDupla}>
            <section className={estilos.card}>
              <div className={estilos.containerFoto}>
                <img
                  src="/icon/IShouldFuncionario.SVG"
                  alt="Foto do Funcionário  "
                  className={estilos.fotoFuncionario}
                />
              </div>

              <div className={estilos.campoCompacto}>
                <p className={estilos.rotulo}>Gmail</p>
                <div className={estilos.valorBoxCompacto}>
                  <Mail className={estilos.icone} size={18} />
                  <p className={estilos.textoValor}>ShouldBe@gmail.com</p>
                </div>
              </div>

              <div className={estilos.campoCompacto}>
                <p className={estilos.rotulo}>Nome do GitHub</p>
                <div className={estilos.valorBoxCompacto}>
                  <Code2 className={estilos.icone} size={18} />
                  <p className={estilos.textoValor}>@usuario</p>
                </div>
              </div>

              <div className={estilos.campoCompacto}>
                <p className={estilos.rotulo}>Email</p>
                <div className={estilos.valorBoxCompacto}>
                  <Mail className={estilos.icone} size={18} />
                  <p className={estilos.textoValor}>email@skal4ble.com</p>
                </div>
              </div>
            </section>

            <section className={`${estilos.card} ${estilos.cardFlex}`}>
              <h2 className={estilos.subtituloCard}>Resumo de Aptidão</h2>
              <div className={estilos.areaInterna}></div>
            </section>
          </div>

          {/* COLUNA 2: Informações Gerais + Gráfico de Desempenho */}
          <div className={estilos.colunaDupla}>
            <section className={estilos.card}>
              <h2 className={estilos.subtituloCard}>Informações Gerais</h2>

              <div className={estilos.campoPadrao}>
                <p className={estilos.rotulo}>Cargo</p>
                <div className={estilos.valorBoxPadrao}>
                  <Briefcase className={estilos.icone} size={22} />
                  <p className={estilos.textoValor}>Desenvolvedor Júnior</p>
                </div>
              </div>

              <div className={estilos.campoPadrao}>
                <p className={estilos.rotulo}>Especialidade</p>
                <div className={estilos.valorBoxPadrao}>
                  <Layers className={estilos.icone} size={22} />
                  <p className={estilos.textoValor}>Full-Stack</p>
                </div>
              </div>

              <div className={estilos.campoPadrao}>
                <p className={estilos.rotulo}>Tempo de Empresa</p>
                <div className={estilos.valorBoxPadrao}>
                  <Calendar className={estilos.icone} size={22} />
                  <p className={estilos.textoValor}>Na L4 desde 24/09/2007</p>
                </div>
              </div>

              <div className={estilos.campoPadrao}>
                <p className={estilos.rotulo}>Aptidão</p>
                <div className={estilos.valorBoxPadrao}>
                  <Code2 className={estilos.icone} size={22} />
                  <p className={estilos.textoValor}>Aptidão com C#/Python/Javascript</p>
                </div>
              </div>

              <button type="button" className={`${estilos.botaoPrimario} ${estilos.botaoTrilha}`}>
                <Route size={18} />
                Trilha de aptidão
              </button>
            </section>

            {/* Card 4: Gráfico de Desempenho */}
            <section className={`${estilos.card} ${estilos.cardFlex}`}>
              <div className={estilos.cabecalhoCard}>
                <h2 className={estilos.subtituloCardSemBorda}>Gráfico de Desempenho</h2>
                <button type="button" className={`${estilos.botaoPrimario} ${estilos.botaoPeriodo}`}>
                  <Calendar size={22} />
                  Período
                  <ChevronDown size={22} />
                </button>
              </div>

              <div className={`${estilos.areaInterna} ${estilos.containerGraficoBarras}`}>
                {metricasDesempenho.map((item) => (
                  <div key={item.nome} className={estilos.colunaBarra}>
                    <span className={estilos.valorBarra}>{item.valor}%</span>
                    <div className={estilos.trilhoBarra}>
                      <div
                        className={estilos.preenchimentoBarra}
                        style={{ height: `${item.valor}%` }}
                      />
                    </div>
                    <p className={estilos.rotuloBarra}>{item.nome}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* COLUNA 3: Ferramentas com Gráfico de Pizza */}
          <section className={`${estilos.card} ${estilos.cardFlex}`}>
            <h2 className={estilos.subtituloCard}>Ferramentas</h2>
            <div className={`${estilos.areaInterna} ${estilos.containerPizza}`}>
              {/* Gráfico de Pizza em SVG (C# 40%, Python 35%, JavaScript 25%) */}
              <svg viewBox="0 0 120 120" className={estilos.graficoPizza}>
                <circle cx="60" cy="60" r="45" fill="transparent" stroke="var(--roxo-claro3)" strokeWidth="22" />
                {/* C# - 40% (113.1 de 282.7) */}
                <circle
                  cx="60"
                  cy="60"
                  r="45"
                  fill="transparent"
                  stroke="var(--roxo-escuro1)"
                  strokeWidth="22"
                  strokeDasharray="113.1 282.7"
                  strokeDashoffset="0"
                  transform="rotate(-90 60 60)"
                />
                {/* Python - 35% (99.0 de 282.7) */}
                <circle
                  cx="60"
                  cy="60"
                  r="45"
                  fill="transparent"
                  stroke="var(--roxo-claro1)"
                  strokeWidth="22"
                  strokeDasharray="99.0 282.7"
                  strokeDashoffset="-113.1"
                  transform="rotate(-90 60 60)"
                />
                {/* JavaScript - 25% (70.7 de 282.7) */}
                <circle
                  cx="60"
                  cy="60"
                  r="45"
                  fill="transparent"
                  stroke="var(--verde)"
                  strokeWidth="22"
                  strokeDasharray="70.7 282.7"
                  strokeDashoffset="-212.1"
                  transform="rotate(-90 60 60)"
                />
              </svg>

              {/* Legenda das Tecnologias */}
              <div className={estilos.legendaPizza}>
                <div className={estilos.itemLegenda}>
                  <span className={estilos.bolinhaCor} style={{ backgroundColor: 'var(--roxo-escuro1)' }} />
                  <p>C# (40%)</p>
                </div>
                <div className={estilos.itemLegenda}>
                  <span className={estilos.bolinhaCor} style={{ backgroundColor: 'var(--roxo-claro1)' }} />
                  <p>Python (35%)</p>
                </div>
                <div className={estilos.itemLegenda}>
                  <span className={estilos.bolinhaCor} style={{ backgroundColor: 'var(--verde)' }} />
                  <p>JavaScript (25%)</p>
                </div>
              </div>
            </div>
          </section>

        </div>
      </section>
    </main>
  );
}
