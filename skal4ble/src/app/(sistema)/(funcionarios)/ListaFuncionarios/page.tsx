
"use client";

import { useState, useRef, useEffect, useMemo } from "react";

import { ListaF } from "@/src/components/ui/(listas)/lista-funcionarios/lista";
import { OverviewPanel } from "@/src/components/ui/overview/overview";

import { Usuario } from "@/src/@types/usuario";
import { cargo } from "@/src/@types/cargo";
import { atuacao } from "@/src/@types/atuacao";

import { UsuarioService } from "@/src/services/UsuarioService";
import { cargoService } from "@/src/services/cargoService";
import { atuacaoService } from "@/src/services/atuacaoService";

// Extensão dos dados utilizados na listagem
type UsuarioItem = Usuario & {
    id?: string;
    name?: string;
    github?: string;
    role?: string;
    affinity?: string;
    avatarUrl?: string;
    canTeach?: boolean;
};

// Normaliza textos para facilitar as comparações
const normalizeText = (text?: string | null) =>
    (text ?? "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();

// Converte o valor de aptidão para boolean
const normalizeBoolean = (value: unknown): boolean => {
    if (typeof value === "boolean") return value;

    if (typeof value === "number") return value !== 0;

    const normalized = normalizeText(String(value ?? ""));

    return ["true", "1", "sim", "yes"].includes(normalized);
};

// Filtros iniciais
const INITIAL_FILTERS = {
    affinity: "",
    role: "",
    canTeach: "",
};

type FilterKey = keyof typeof INITIAL_FILTERS;

export default function ListagemFuncionarios() {

    // Lista de funcionários
    const [usuarios, setUsuarios] = useState<UsuarioItem[]>([]);

    // Listas utilizadas nos filtros
    const [cargos, setCargos] = useState<cargo[]>([]);
    const [atuacoes, setAtuacoes] = useState<atuacao[]>([]);

    // Carregamentos
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingFilters, setIsLoadingFilters] = useState(true);

    // Controle da seleção de funcionário
    const [selectedMember, setSelectedMember] = useState<Usuario | null>(null);

    // Controle dos filtros e pesquisa
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [filters, setFilters] = useState(INITIAL_FILTERS);

    const filtersRef = useRef<HTMLDivElement>(null);

    const activeFiltersCount = Object.values(filters).filter(Boolean).length;

    // ==========================================
    // CARREGAR FUNCIONÁRIOS
    // ==========================================

    useEffect(() => {

        async function fetchMembers() {

            try {
                setIsLoading(true);

                const response = await UsuarioService.ListarUsuarios({
                    nome: "",
                    nomeGithub: "",
                    cargo: "",
                });

                console.log("Resposta da API de usuários:", response);

                const formattedMembers: UsuarioItem[] = response.map(
                    (item: any) => {

                        const nomeCargo =
                            typeof item.cargo === "string"
                                ? item.cargo
                                : item.cargo?.nomeCargo ?? "Não definido";

                        const nomeAtuacao =
                            typeof item.atuacao === "string"
                                ? item.atuacao
                                : item.atuacao?.nomeAtuacao ?? "Não definido";

                        const nomeUsuario =
                            item.nomeUsuario ?? item.nome ?? "Sem nome";

                        const aptoEnsinar = normalizeBoolean(
                            item.aptoEnsinar ?? item.aptoAEnsinar
                        );

                        return {
                            ...item,

                            usuarioId: String(
                                item.usuarioId ?? item.id ?? ""
                            ),

                            nomeUsuario,

                            cargo: nomeCargo,

                            atuacao: nomeAtuacao,

                            id: String(
                                item.id ?? item.usuarioId ?? ""
                            ),

                            name: nomeUsuario,

                            github: item.nomeGithub ?? "",

                            role: nomeCargo,

                            affinity: nomeAtuacao,

                            avatarUrl:
                                item.fotoPerfil ??
                                item.imagem ??
                                "/avatars/kayo.png",

                            canTeach: aptoEnsinar,
                        };
                    }
                );

                setUsuarios(formattedMembers);

            } catch (error) {
                console.error(
                    "Erro ao carregar funcionários:",
                    error
                );
            } finally {
                setIsLoading(false);
            }
        }

        fetchMembers();

    }, []);

    // ==========================================
    // CARREGAR CARGOS E ATUAÇÕES
    // ==========================================

    useEffect(() => {

        async function fetchFilters() {

            try {
                setIsLoadingFilters(true);

                const [listaCargos, listaAtuacoes] = await Promise.all([
                    cargoService.ListarCargo(),
                    atuacaoService.ListarAtuacao(),
                ]);

                console.log("Cargos recebidos:", listaCargos);
                console.log("Atuações recebidas:", listaAtuacoes);

                setCargos(listaCargos);
                setAtuacoes(listaAtuacoes);

            } catch (error) {
                console.error(
                    "Erro ao carregar cargos e atuações:",
                    error
                );
            } finally {
                setIsLoadingFilters(false);
            }
        }

        fetchFilters();

    }, []);

    // ==========================================
    // ALTERAR FILTROS
    // ==========================================

    const handleFilterChange = (
        key: FilterKey,
        value: string
    ) => {

        setFilters((prev) => ({
            ...prev,
            [key]: value === "nenhum" ? "" : value,
        }));

    };

    // ==========================================
    // LIMPAR FILTROS
    // ==========================================

    const handleClearFilters = () => {
        setFilters(INITIAL_FILTERS);
    };

    // ==========================================
    // FILTRAR FUNCIONÁRIOS
    // ==========================================

    const filteredMembers = useMemo(() => {

        const normalizedSearch = normalizeText(searchQuery);

        return usuarios.filter((usuario) => {

            // Pesquisa geral
            if (normalizedSearch) {

                const matchesName = normalizeText(
                    usuario.nomeUsuario
                ).includes(normalizedSearch);

                const matchesGithub = normalizeText(
                    usuario.github ?? ""
                ).includes(normalizedSearch);

                const matchesCargo = normalizeText(
                    usuario.cargo ?? ""
                ).includes(normalizedSearch);

                const matchesAtuacao = normalizeText(
                    usuario.atuacao ?? ""
                ).includes(normalizedSearch);

                if (
                    !matchesName &&
                    !matchesGithub &&
                    !matchesCargo &&
                    !matchesAtuacao
                ) {
                    return false;
                }
            }

            // Filtro de atuação
            if (filters.affinity) {

                const normalizedAffinity = normalizeText(
                    usuario.atuacao
                );

                if (normalizedAffinity !== filters.affinity) {
                    return false;
                }
            }

            // Filtro de cargo
            if (filters.role) {

                const normalizedRole = normalizeText(
                    usuario.cargo
                );

                if (normalizedRole !== filters.role) {
                    return false;
                }
            }

            // Filtro de aptidão para ensinar
            if (filters.canTeach) {

                const isMentor = Boolean(usuario.canTeach);

                if (
                    filters.canTeach === "sim" &&
                    !isMentor
                ) {
                    return false;
                }

                if (
                    filters.canTeach === "nao" &&
                    isMentor
                ) {
                    return false;
                }
            }

            return true;
        });

    }, [searchQuery, filters, usuarios]);

    // ==========================================
    // FUNCIONÁRIO SELECIONADO
    // ==========================================

    const visibleSelectedMember = useMemo(() => {

        if (!selectedMember) return null;

        return filteredMembers.some(
            (member) =>
                member.usuarioId === selectedMember.usuarioId
        )
            ? selectedMember
            : null;

    }, [selectedMember, filteredMembers]);

    // ==========================================
    // SELECIONAR FUNCIONÁRIO
    // ==========================================

    const handleSelectMember = (usuario: Usuario) => {

        setSelectedMember((prev) =>
            prev?.usuarioId === usuario.usuarioId
                ? null
                : usuario
        );

    };

    // ==========================================
    // FECHAR FILTROS AO CLICAR FORA
    // ==========================================

    useEffect(() => {

        function handleClickOutside(event: MouseEvent) {

            if (
                filtersRef.current &&
                !filtersRef.current.contains(event.target as Node)
            ) {
                setIsFiltersOpen(false);
            }

        }

        function handleKeyDown(event: KeyboardEvent) {

            if (event.key === "Escape") {
                setIsFiltersOpen(false);
            }

        }

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        document.addEventListener(
            "keydown",
            handleKeyDown
        );

        return () => {

            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );

            document.removeEventListener(
                "keydown",
                handleKeyDown
            );

        };

    }, []);

    // ==========================================
    // TELA
    // ==========================================

    return (
        <>

            {/* Cabeçalho */}

            <header className="header-projetos">
                <h1>Lista de Funcionários</h1>
            </header>

            {/* Pesquisa e filtros */}

            <div className="projetos-controls">

                {/* Pesquisa */}

                <div className="campo-form header-search">

                    <img
                        src="/icon/IPesquisa.svg"
                        alt=""
                        className="input-icon"
                    />

                    <input
                        type="text"
                        id="pesquisa"
                        className="input"
                        placeholder=" "
                        value={searchQuery}
                        onChange={(e) =>
                            setSearchQuery(e.target.value)
                        }
                    />

                    <label
                        htmlFor="pesquisa"
                        className="label"
                    >
                        Pesquise...
                    </label>

                    {searchQuery && (

                        <button
                            type="button"
                            className="search-clear-btn"
                            onClick={() => setSearchQuery("")}
                            aria-label="Limpar pesquisa"
                        >
                            ×
                        </button>

                    )}

                </div>

                {/* Menu de filtros */}

                <div
                    ref={filtersRef}
                    className="filter-wrapper"
                >

                    <button
                        type="button"
                        className="filter-toggle-btn"
                        onClick={() =>
                            setIsFiltersOpen((prev) => !prev)
                        }
                        aria-expanded={isFiltersOpen}
                        aria-controls="menu-filtros-funcionarios"
                    >

                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                        >
                            <line
                                x1="4"
                                y1="6"
                                x2="20"
                                y2="6"
                            />

                            <line
                                x1="7"
                                y1="12"
                                x2="17"
                                y2="12"
                            />

                            <line
                                x1="10"
                                y1="18"
                                x2="14"
                                y2="18"
                            />

                        </svg>

                        <span>Filtros</span>

                        {activeFiltersCount > 0 && (

                            <span className="filter-badge">
                                {activeFiltersCount}
                            </span>

                        )}

                        <img
                            src="/icon/IDown.svg"
                            alt=""
                            className={`button-icon filter-chevron ${
                                isFiltersOpen ? "open" : ""
                            }`}
                        />

                    </button>

                    {/* Conteúdo do menu */}

                    {isFiltersOpen && (

                        <div
                            id="menu-filtros-funcionarios"
                            className="filters-dropdown"
                            role="region"
                            aria-label="Filtros de funcionários"
                        >

                            <div className="filters-dropdown-header">

                                <span>Filtrar por</span>

                                {activeFiltersCount > 0 && (

                                    <button
                                        type="button"
                                        className="filters-clear-btn"
                                        onClick={handleClearFilters}
                                    >
                                        Limpar
                                    </button>

                                )}

                            </div>

                            {/* FILTRO DE ATUAÇÃO */}

                            <div className="campo-select">

                                <select
                                    className="select"
                                    value={filters.affinity}
                                    onChange={(e) =>
                                        handleFilterChange(
                                            "affinity",
                                            e.target.value
                                        )
                                    }
                                    disabled={isLoadingFilters}
                                >

                                    <option
                                        value=""
                                        disabled
                                        hidden
                                    >
                                        {isLoadingFilters
                                            ? "Carregando atuações..."
                                            : "Atuação"}
                                    </option>

                                    <option value="nenhum">
                                        Nenhum
                                    </option>

                                    {atuacoes.map((item) => (

                                        <option
                                            key={item.atuacaoId}
                                            value={normalizeText(
                                                item.nomeAtuacao
                                            )}
                                        >
                                            {item.nomeAtuacao}
                                        </option>

                                    ))}

                                </select>

                                <img
                                    src="/icon/IDown.svg"
                                    alt=""
                                    className="button-icon"
                                />

                            </div>

                            {/* FILTRO DE CARGO */}

                            <div className="campo-select">

                                <select
                                    className="select"
                                    value={filters.role}
                                    onChange={(e) =>
                                        handleFilterChange(
                                            "role",
                                            e.target.value
                                        )
                                    }
                                    disabled={isLoadingFilters}
                                >

                                    <option
                                        value=""
                                        disabled
                                        hidden
                                    >
                                        {isLoadingFilters
                                            ? "Carregando cargos..."
                                            : "Cargo"}
                                    </option>

                                    <option value="nenhum">
                                        Nenhum
                                    </option>

                                    {cargos.map((item) => (

                                        <option
                                            key={item.cargoId}
                                            value={normalizeText(
                                                item.nomeCargo
                                            )}
                                        >
                                            {item.nomeCargo}
                                        </option>

                                    ))}

                                </select>

                                <img
                                    src="/icon/IDown.svg"
                                    alt=""
                                    className="button-icon"
                                />

                            </div>

                            {/* FILTRO DE APTIDÃO PARA ENSINAR */}

                            <div className="campo-select">

                                <select
                                    className="select"
                                    value={filters.canTeach}
                                    onChange={(e) =>
                                        handleFilterChange(
                                            "canTeach",
                                            e.target.value
                                        )
                                    }
                                >

                                    <option
                                        value=""
                                        disabled
                                        hidden
                                    >
                                        Apto a Ensinar
                                    </option>

                                    <option value="nenhum">
                                        Nenhum
                                    </option>

                                    <option value="sim">
                                        Sim
                                    </option>

                                    <option value="nao">
                                        Não
                                    </option>

                                </select>

                                <img
                                    src="/icon/IDown.svg"
                                    alt=""
                                    className="button-icon"
                                />

                            </div>

                        </div>

                    )}

                </div>

            </div>

            {/* Lista de funcionários e painel de indicadores */}

            <section
                className="row flex-1"
                style={{
                    minHeight: 0,
                    alignItems: "stretch",
                    gap: "2rem",
                }}
            >

                {/* Lista */}

                <div
                    style={{
                        flex: 1,
                        minWidth: 0,
                        height: "95%",
                    }}
                >

                    {isLoading ? (

                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: "100%",
                            }}
                        >
                            <p>Carregando funcionários...</p>
                        </div>

                    ) : (

                        <ListaF
                            members={filteredMembers}
                            onSelectMember={handleSelectMember}
                            selectedMemberId={
                                visibleSelectedMember?.usuarioId ?? null
                            }
                        />

                    )}

                </div>

                {/* Painel lateral */}

                <div style={{ height: "95%" }}>

                    {visibleSelectedMember ? (

                        <div
                            key={`details-${visibleSelectedMember.usuarioId}`}
                            className="container-25op panel-enter"
                            style={{
                                width: "420px",
                                height: "100%",
                                flexShrink: 0,
                            }}
                        />

                    ) : (

                        <div
                            key="overview"
                            className="panel-enter"
                            style={{
                                height: "100%",
                            }}
                        >

                            <OverviewPanel
                                totalEmployees={usuarios.length}
                                assignedTickets={248}
                                toolsCount={8}
                                productivityAvg={82}
                            />

                        </div>

                    )}

                </div>

            </section>

        </>
    );
}
