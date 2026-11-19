import React from 'react';
import { Briefcase, Calendar, ChevronDown, Code2, Layers, Mail, Pencil, Route } from 'lucide-react';
import { CustomPieChart, type PieDataItem } from '@/src/components/ui/(graficos)/pie/CustomPieChart';
import estilos from './detalhes-funcionarios.module.css';

export default function DetalhesFuncionariosPage() {
  const metricasDesempenho = [
    { nome: 'Complexidade', valor: 82 },
    { nome: 'Qualidade', valor: 94 },
    { nome: 'Quantidade', valor: 76 },
    { nome: 'Velocidade', valor: 88 },

    /* Exemplo de dados isso vai ser chamado na API posteriormente */
  ];

  const dadosFerramentas: PieDataItem[] = [
    { id: 'csharp', label: 'C# (40%)', value: 40, color: 'var(--roxo-escuro1)' },
    { id: 'python', label: 'Python (35%)', value: 35, color: 'var(--roxo-claro1)' },
    { id: 'javascript', label: 'JavaScript (25%)', value: 25, color: 'var(--verde)' },

    /* Exemplo de dados isso vai ser chamado na API posteriormente */
  ];

  const informacoesGerais = [
    {
      id: 'cargo',
      rotulo: 'Cargo',
      valor: 'Desenvolvedor Júnior',
      icone: Briefcase,
    },
    {
      id: 'especialidade',
      rotulo: 'Especialidade',
      valor: 'Full-Stack',
      icone: Layers,
    },
    {
      id: 'tempo-empresa',
      rotulo: 'Tempo de Empresa',
      valor: 'Na L4 desde 24/09/2007',
      icone: Calendar,
    },
    {
      id: 'aptidao',
      rotulo: 'Aptidão',
      valor: 'C# • Python • JavaScript',
      icone: Code2,
    },
  ];

  const resumoAptidao = {
    destaque: 'Boa base em desenvolvimento Full-Stack com foco em C# e JavaScript/TypeScript.',
    pontosFortes: [
      'Estruturação de APIs e regras de negócio',
      'Componentização de interfaces e consumo de dados',
      'Boa adaptação a novas stacks e entregas recorrentes',
    ],
    observacao: 'Pronto para avançar na trilha de arquitetura e escalabilidade.',
  };

  return (
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

        {/* COLUNA 1: Funcionário (topo) + Informações Gerais (baixo) */}
        <div className={estilos.colunaDupla}>
          <section className={`${estilos.card} ${estilos.cardPerfilCompacto}`}>
            <div className={estilos.containerFoto}>
              <img
                src="/icon/IShouldFuncionario.SVG"
                alt="Foto do Funcionário"
                className={estilos.fotoFuncionario}
              />
            </div>

            <div className={estilos.campoCompacto}>
              <p className={estilos.rotulo}>Gmail</p>
              <div className={estilos.valorBoxCompacto}>
                <Mail className={estilos.icone} size={16} />
                <p className={estilos.textoValor}>ShouldBe@gmail.com</p>
              </div>
            </div>

            <div className={estilos.campoCompacto}>
              <p className={estilos.rotulo}>Nome do GitHub</p>
              <div className={estilos.valorBoxCompacto}>
                <Code2 className={estilos.icone} size={16} />
                <p className={estilos.textoValor}>@usuario</p>
              </div>
            </div>

            <div className={estilos.campoCompacto}>
              <p className={estilos.rotulo}>Email</p>
              <div className={estilos.valorBoxCompacto}>
                <Mail className={estilos.icone} size={16} />
                <p className={estilos.textoValor}>email@skal4ble.com</p>
              </div>
            </div>
          </section>

          <section className={`${estilos.card} ${estilos.cardFlex} ${estilos.cardInfoGerais}`}>
            <h2 className={estilos.subtituloCard}>Informações Gerais</h2>

            <div className={estilos.listaInfoGerais}>
              {informacoesGerais.map((item) => {
                const Icone = item.icone;
                return (
                  <div key={item.id} className={estilos.itemInfoGeral}>
                    <span className={estilos.rotuloInfoGeral}>{item.rotulo}</span>
                    <div className={estilos.valorBoxInfoGeral}>
                      <Icone className={estilos.icone} size={16} />
                      <span className={estilos.textoInfoGeral}>{item.valor}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <button type="button" className={`${estilos.botaoPrimario} ${estilos.botaoTrilha}`}>
              <Route size={16} />
              Trilha de aptidão
            </button>
          </section>
        </div>

        {/* COLUNA 2: Gráfico de Desempenho (topo) + Resumo de Aptidão (baixo) */}
        <div className={estilos.colunaDupla}>
          <section className={estilos.card}>
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

          <section className={`${estilos.card} ${estilos.cardFlex} ${estilos.cardResumoAptidao}`}>
            <h2 className={estilos.subtituloCard}>Resumo de Aptidão</h2>
            <div className={`${estilos.areaInterna} ${estilos.resumoAptidaoBox}`}>
              <p className={estilos.resumoDestaque}>{resumoAptidao.destaque}</p>
              <ul className={estilos.listaAptidao}>
                {resumoAptidao.pontosFortes.map((ponto) => (
                  <li key={ponto}>{ponto}</li>
                ))}
              </ul>
              <p className={estilos.resumoRodape}>{resumoAptidao.observacao}</p>
            </div>
          </section>
        </div>

        {/* COLUNA 3: Ferramentas com CustomPieChart */}
        <section className={`${estilos.card} ${estilos.cardFlex}`}>
          <h2 className={estilos.subtituloCard}>Ferramentas</h2>
          <div className={estilos.areaInterna}>
            <CustomPieChart data={dadosFerramentas} />
          </div>
        </section>

      </div>
    </section>
  );
}