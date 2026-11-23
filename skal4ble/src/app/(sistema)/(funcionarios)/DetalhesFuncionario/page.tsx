'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  Briefcase,
  Calendar,
  Check,
  Code2,
  Layers,
  Mail,
  Pencil,
  Route,
  X,
} from 'lucide-react';
import { CustomPieChart, type PieDataItem } from '@/src/components/ui/(graficos)/pie/CustomPieChart';
import estilos from './detalhes-funcionarios.module.css';

type PeriodoKey = '30d' | '90d' | '12m';

interface MetricaDesempenho {
  nome: string;
  valor: number;
  cor: string;
}

const PERIODOS: { value: PeriodoKey; label: string }[] = [
  { value: '30d', label: 'Últimos 30 dias' },
  { value: '90d', label: 'Últimos 90 dias' },
  { value: '12m', label: 'Últimos 12 meses' },
];

const DADOS_POR_PERIODO: Record<
  PeriodoKey,
  {
    metricas: MetricaDesempenho[];
    ferramentas: PieDataItem[];
  }
> = {
  '30d': {
    metricas: [
      { nome: 'Complexidade', valor: 82, cor: 'var(--roxo-escuro1)' },
      { nome: 'Qualidade', valor: 94, cor: 'var(--roxo-claro1)' },
      { nome: 'Quantidade', valor: 76, cor: 'var(--verde)' },
      { nome: 'Velocidade', valor: 88, cor: 'var(--roxo-escuro2)' },
    ],
    ferramentas: [
      { id: 'csharp', label: 'C# (40%)', value: 40, color: 'var(--roxo-escuro1)' },
      { id: 'python', label: 'Python (35%)', value: 35, color: 'var(--roxo-claro1)' },
      { id: 'javascript', label: 'JavaScript (25%)', value: 25, color: 'var(--verde)' },
    ],
  },
  '90d': {
    metricas: [
      { nome: 'Complexidade', valor: 86, cor: 'var(--roxo-escuro1)' },
      { nome: 'Qualidade', valor: 91, cor: 'var(--roxo-claro1)' },
      { nome: 'Quantidade', valor: 84, cor: 'var(--verde)' },
      { nome: 'Velocidade', valor: 85, cor: 'var(--roxo-escuro2)' },
    ],
    ferramentas: [
      { id: 'csharp', label: 'C# (45%)', value: 45, color: 'var(--roxo-escuro1)' },
      { id: 'python', label: 'Python (30%)', value: 30, color: 'var(--roxo-claro1)' },
      { id: 'javascript', label: 'JavaScript (25%)', value: 25, color: 'var(--verde)' },
    ],
  },
  '12m': {
    metricas: [
      { nome: 'Complexidade', valor: 79, cor: 'var(--roxo-escuro1)' },
      { nome: 'Qualidade', valor: 92, cor: 'var(--roxo-claro1)' },
      { nome: 'Quantidade', valor: 89, cor: 'var(--verde)' },
      { nome: 'Velocidade', valor: 83, cor: 'var(--roxo-escuro2)' },
    ],
    ferramentas: [
      { id: 'csharp', label: 'C# (38%)', value: 38, color: 'var(--roxo-escuro1)' },
      { id: 'python', label: 'Python (32%)', value: 32, color: 'var(--roxo-claro1)' },
      { id: 'javascript', label: 'JavaScript (30%)', value: 30, color: 'var(--verde)' },
    ],
  },
};

export default function DetalhesFuncionariosPage() {
  /* Exemplo de dados isso vai ser chamado na API posteriormente */
  const [nomeFuncionario, setNomeFuncionario] = useState('Funcionário');
  const [perfilForm, setPerfilForm] = useState({
    emailGithub: 'ShouldBe@gmail.com',
    nomeGithub: '@usuario',
    email: 'email@skal4ble.com',
  });
  const [infoGeralForm, setInfoGeralForm] = useState({
    cargo: 'Desenvolvedor Júnior',
    especialidade: 'Full-Stack',
    tempoEmpresa: 'Na L4 desde 24/09/2007',
    aptidao: 'C# • Python • JavaScript',
  });

  const [periodoSelecionado, setPeriodoSelecionado] = useState<PeriodoKey>('30d');
  const [isPeriodoOpen, setIsPeriodoOpen] = useState(false);
  const [isEditarOpen, setIsEditarOpen] = useState(false);
  const [modoEdicaoAtivo, setModoEdicaoAtivo] = useState(false);

  const periodoRef = useRef<HTMLDivElement | null>(null);
  const editarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (periodoRef.current && !periodoRef.current.contains(target)) {
        setIsPeriodoOpen(false);
      }
      if (editarRef.current && !editarRef.current.contains(target)) {
        setIsEditarOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const metricasDesempenho = DADOS_POR_PERIODO[periodoSelecionado].metricas;
  const dadosFerramentas = DADOS_POR_PERIODO[periodoSelecionado].ferramentas;
  const periodoAtualLabel =
    PERIODOS.find((item) => item.value === periodoSelecionado)?.label ?? 'Últimos 30 dias';

  const activePeriodoCount = periodoSelecionado !== '30d' ? 1 : 0;
  const activeEditarCount = modoEdicaoAtivo ? 1 : 0;

  const resumoAptidao = {
    destaque: 'Boa base em desenvolvimento Full-Stack com foco em C# e JavaScript/TypeScript.',
    pontosFortes: [
      'Estruturação de APIs e regras de negócio',
      'Componentização de interfaces e consumo de dados',
      'Boa adaptação a novas stacks e entregas recorrentes',
    ],
    observacao: 'Pronto para avançar na trilha de arquitetura e escalabilidade.',
  };

  const dadosPerfil = [
    {
      id: 'email-github',
      rotulo: 'Email do GitHub',
      valor: perfilForm.emailGithub,
      icone: Mail,
      onChange: (valor: string) => setPerfilForm((prev) => ({ ...prev, emailGithub: valor })),
    },
    {
      id: 'nome-github',
      rotulo: 'Nome do GitHub',
      valor: perfilForm.nomeGithub,
      icone: Code2,
      onChange: (valor: string) => setPerfilForm((prev) => ({ ...prev, nomeGithub: valor })),
    },
    {
      id: 'email',
      rotulo: 'Email',
      valor: perfilForm.email,
      icone: Mail,
      onChange: (valor: string) => setPerfilForm((prev) => ({ ...prev, email: valor })),
    },
  ];

  const informacoesGerais = [
    {
      id: 'cargo',
      rotulo: 'Cargo',
      valor: infoGeralForm.cargo,
      icone: Briefcase,
      onChange: (valor: string) => setInfoGeralForm((prev) => ({ ...prev, cargo: valor })),
    },
    {
      id: 'especialidade',
      rotulo: 'Especialidade',
      valor: infoGeralForm.especialidade,
      icone: Layers,
      onChange: (valor: string) => setInfoGeralForm((prev) => ({ ...prev, especialidade: valor })),
    },
    {
      id: 'tempo-empresa',
      rotulo: 'Tempo de Empresa',
      valor: infoGeralForm.tempoEmpresa,
      icone: Calendar,
      onChange: (valor: string) => setInfoGeralForm((prev) => ({ ...prev, tempoEmpresa: valor })),
    },
    {
      id: 'aptidao',
      rotulo: 'Aptidão',
      valor: infoGeralForm.aptidao,
      icone: Code2,
      onChange: (valor: string) => setInfoGeralForm((prev) => ({ ...prev, aptidao: valor })),
    },
  ];

  function handleAtivarEdicao() {
    setModoEdicaoAtivo(true);
    setIsEditarOpen(false);
  }

  function handleSalvarEdicao() {
    setModoEdicaoAtivo(false);
    setIsEditarOpen(false);
  }

  function handleCancelarEdicao() {
    setNomeFuncionario('Funcionário');
    setPerfilForm({
      emailGithub: 'ShouldBe@gmail.com',
      nomeGithub: '@usuario',
      email: 'email@skal4ble.com',
    });
    setInfoGeralForm({
      cargo: 'Desenvolvedor Júnior',
      especialidade: 'Full-Stack',
      tempoEmpresa: 'Na L4 desde 24/09/2007',
      aptidao: 'C# • Python • JavaScript',
    });
    setModoEdicaoAtivo(false);
    setIsEditarOpen(false);
  }

  return (
    <section className={estilos.conteudoPagina}>
      <div className={estilos.cabecalhoPagina}>
        <h1 className={estilos.tituloPagina}>Detalhes do Funcionário</h1>

        <div className={estilos.barraAcoesTopo}>
          {modoEdicaoAtivo && (
            <div className={estilos.acoesEdicaoAtiva}>
              <button
                type="button"
                className={estilos.botaoSecundario}
                onClick={handleCancelarEdicao}
              >
                <X size={16} />
                <span>Cancelar</span>
              </button>
              <button
                type="button"
                className={estilos.botaoConfirmar}
                onClick={handleSalvarEdicao}
              >
                <Check size={16} />
                <span>Salvar</span>
              </button>
            </div>
          )}

          {/* Filtro / Menu de Editar no mesmo formato */}
          <div ref={editarRef} className={`${estilos.filterWrapper} filter-wrapper`}>
            <button
              type="button"
              className={`${estilos.filterToggleBtn} filter-toggle-btn`}
              onClick={() => setIsEditarOpen((prev) => !prev)}
              aria-expanded={isEditarOpen}
              aria-controls="menu-editar-funcionario"
            >
              <Pencil size={18} strokeWidth={2.2} aria-hidden="true" />
              <span>Editar</span>

              {activeEditarCount > 0 && (
                <span className={`${estilos.filterBadge} filter-badge`}>Editando</span>
              )}

              <img
                src="/icon/IDown.svg"
                alt=""
                className={`${estilos.buttonIcon} ${estilos.filterChevron} button-icon filter-chevron ${
                  isEditarOpen ? `${estilos.open} open` : ''
                }`}
              />
            </button>

            {isEditarOpen && (
              <div id="menu-editar-funcionario" className={estilos.dropdownMenu}>
                <button
                  type="button"
                  className={estilos.dropdownItem}
                  onClick={handleAtivarEdicao}
                >
                  <span>Habilitar edição dos campos</span>
                </button>
                <button
                  type="button"
                  className={estilos.dropdownItem}
                  onClick={handleSalvarEdicao}
                >
                  <span>Salvar alterações</span>
                </button>
                <button
                  type="button"
                  className={estilos.dropdownItem}
                  onClick={handleCancelarEdicao}
                >
                  <span>Restaurar valores originais</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Grade de 3 Colunas */}
      <div className={estilos.gradePrincipal}>
        {/* COLUNA 1: Container único com Nome + Foto original + Dados + Informações Gerais */}
        <section className={`${estilos.card} ${estilos.cardPerfilUnico}`}>
          {modoEdicaoAtivo ? (
            <input
              type="text"
              aria-label="Nome do Funcionário"
              value={nomeFuncionario}
              onChange={(e) => setNomeFuncionario(e.target.value)}
              className={estilos.inputTituloCard}
            />
          ) : (
            <h2 className={estilos.subtituloCard}>{nomeFuncionario}</h2>
          )}

          <div className={estilos.containerFoto}>
            <img
              src="/icon/IShouldFuncionario.SVG"
              alt="Foto do Funcionário"
              className={estilos.fotoFuncionario}
            />
          </div>

          <div className={estilos.listaCampos}>
            {dadosPerfil.map((item) => {
              const Icone = item.icone;
              return (
                <div key={item.id} className={estilos.campoItem}>
                  <label className={estilos.rotuloCampo} htmlFor={item.id}>
                    {item.rotulo}
                  </label>
                  <div className={estilos.inputWrapper}>
                    <Icone className={estilos.icone} size={16} />
                    <input
                      id={item.id}
                      type="text"
                      readOnly={!modoEdicaoAtivo}
                      value={item.valor}
                      onChange={(e) => item.onChange(e.target.value)}
                      className={estilos.inputCampo}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className={estilos.divisorSecao}>
            <h2 className={estilos.subtituloSecaoInterna}>Informações Gerais</h2>
          </div>

          <div className={estilos.listaCampos}>
            {informacoesGerais.map((item) => {
              const Icone = item.icone;
              return (
                <div key={item.id} className={estilos.campoItem}>
                  <label className={estilos.rotuloCampo} htmlFor={item.id}>
                    {item.rotulo}
                  </label>
                  <div className={estilos.inputWrapper}>
                    <Icone className={estilos.icone} size={16} />
                    <input
                      id={item.id}
                      type="text"
                      readOnly={!modoEdicaoAtivo}
                      value={item.valor}
                      onChange={(e) => item.onChange(e.target.value)}
                      className={estilos.inputCampo}
                    />
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

        {/* COLUNA 2: Gráfico de Desempenho (topo) + Resumo de Aptidão (baixo) */}
        <div className={estilos.colunaDupla}>
          <section className={estilos.card}>
            <div className={estilos.cabecalhoCard}>
              <h2 className={estilos.subtituloCardSemBorda}>Gráfico de Desempenho</h2>

              {/* Filtro de Período no mesmo formato */}
              <div ref={periodoRef} className={`${estilos.filterWrapper} filter-wrapper`}>
                <button
                  type="button"
                  className={`${estilos.filterToggleBtn} ${estilos.filterToggleBtnCompacto} filter-toggle-btn`}
                  onClick={() => setIsPeriodoOpen((prev) => !prev)}
                  aria-expanded={isPeriodoOpen}
                  aria-controls="menu-periodo-funcionario"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <line x1="4" y1="6" x2="20" y2="6" />
                    <line x1="7" y1="12" x2="17" y2="12" />
                    <line x1="10" y1="18" x2="14" y2="18" />
                  </svg>

                  <span>Período</span>

                  {activePeriodoCount > 0 && (
                    <span className={`${estilos.filterBadge} filter-badge`}>
                      {periodoSelecionado}
                    </span>
                  )}

                  <img
                    src="/icon/IDown.svg"
                    alt=""
                    className={`${estilos.buttonIcon} ${estilos.filterChevron} button-icon filter-chevron ${
                      isPeriodoOpen ? `${estilos.open} open` : ''
                    }`}
                  />
                </button>

                {isPeriodoOpen && (
                  <div id="menu-periodo-funcionario" className={estilos.dropdownMenu}>
                    {PERIODOS.map((opcao) => {
                      const selecionado = opcao.value === periodoSelecionado;
                      return (
                        <button
                          key={opcao.value}
                          type="button"
                          className={`${estilos.dropdownItem} ${
                            selecionado ? estilos.dropdownItemAtivo : ''
                          }`}
                          onClick={() => {
                            setPeriodoSelecionado(opcao.value);
                            setIsPeriodoOpen(false);
                          }}
                        >
                          <span>{opcao.label}</span>
                          {selecionado && <Check size={15} />}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Formato A ativo por padrão (você pode trocar pelo Formato B ou C acima) */}
            <div className={`${estilos.areaInterna} ${estilos.formatoA}`}>
              <div className={estilos.palcoBarrasA}>
                {metricasDesempenho.map((item) => (
                  <div key={item.nome} className={estilos.colunaBarraA}>
                    <span className={estilos.valorBarra}>{item.valor}%</span>
                    <div className={estilos.trilhoBarraA}>
                      <div
                        className={estilos.preenchimentoBarra}
                        style={{ height: `${item.valor}%`, background: item.cor }}
                      />
                    </div>
                    <span className={estilos.rotuloCurtoA}>{item.nome}</span>
                  </div>
                ))}
              </div>

              <div className={estilos.legendaGradeA}>
                {metricasDesempenho.map((item) => (
                  <div key={item.nome} className={estilos.itemLegenda}>
                    <span className={estilos.bolinhaCor} style={{ backgroundColor: item.cor }} />
                    <p>
                      {item.nome} ({item.valor}%)
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className={`${estilos.card} ${estilos.cardResumoAptidao}`}>
            <h2 className={estilos.subtituloCard}>Resumo de Aptidão</h2>
            <div className={`${estilos.areaInterna} ${estilos.resumoAptidaoBox}`}>
              <p className={estilos.resumoDestaque}>{resumoAptidao.destaque}</p>
              <ul className={estilos.listaAptidao}>
                {resumoAptidao.pontosFortes.map((ponto) => (
                  <li key={ponto}>{ponto}</li>
                ))}
              </ul>
              <p className={estilos.resumoRodape}>
                {resumoAptidao.observacao} ({periodoAtualLabel})
              </p>
            </div>
          </section>
        </div>

        {/* COLUNA 3: Ferramentas com CustomPieChart */}
        <section className={`${estilos.card} ${estilos.cardFerramentas}`}>
          <h2 className={estilos.subtituloCard}>Ferramentas</h2>
          <div className={estilos.areaInterna}>
            <CustomPieChart data={dadosFerramentas} />
          </div>
        </section>
      </div>
    </section>
  );
}