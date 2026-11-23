"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./sidebar.module.css";

interface SubNavItem {
  label: string;
  href: string;
}

interface NavItem {
  label: string;
  href?: string;
  iconSrc: string;
  subItems?: SubNavItem[];
}

const navItems: NavItem[] = [
  {
    label: "Funcionários",
    iconSrc: "/icon/IFuncionarios.svg",
    subItems: [
      { label: "Lista de Funcionários", href: "/ListaFuncionarios" },
      { label: "Novo Funcionário", href: "/NovoFuncionario" },
    ],
  },
  {
    label: "Projetos",
    iconSrc: "/icon/IProjetos.svg",
    subItems: [
      { label: "Lista de Projetos", href: "/ListaProjetos" },
      { label: "Novo Projeto", href: "/NovoProjeto" },
    ],
  },
  { label: "To-Do List", href: "/to-do", iconSrc: "/icon/IToDoList.svg" },
  { label: "Treinamento", href: "/treinamento", iconSrc: "/icon/ITreino.svg" },
  { label: "Configurações", href: "/configuracoes", iconSrc: "/icon/IConfiguracoes.svg" },
];

export const Sidebar = () => {
  const pathname = usePathname();
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  const toggleMenu = (label: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  return (
    <aside
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`${styles.sidebar} ${isHovered ? styles.sidebarExpanded : ""} ${
        isMobileOpen ? styles.sidebarOpen : ""
      }`}
    >
      {/* Título / Logo + Botão Mobile */}
      <div className={styles.topBar}>
        <div className={styles.header}>
          <h1 className={styles.logo}>
            <span className={styles.logoShort}>L4</span>
            <span className={styles.logoFull}>SkaL4ble</span>
          </h1>
        </div>

        <button
          type="button"
          className={styles.mobileToggle}
          onClick={() => setIsMobileOpen((prev) => !prev)}
          aria-expanded={isMobileOpen}
          aria-label="Abrir ou fechar menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Navegação */}
      <nav className={`${styles.nav} ${isMobileOpen ? styles.navOpen : ""}`}>
        {navItems.map((item) => {
          const hasSubItems = Boolean(item.subItems?.length);
          const isChildActive = item.subItems?.some((sub) => pathname === sub.href);
          const isActive = item.href ? pathname === item.href : Boolean(isChildActive);
          const isMenuOpen = openMenus[item.label] ?? Boolean(isChildActive);

          if (hasSubItems) {
            return (
              <div key={item.label} className={styles.navGroup}>
                <div
                  role="button"
                  tabIndex={0}
                  title={item.label}
                  aria-expanded={isMenuOpen}
                  onClick={() => toggleMenu(item.label)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      toggleMenu(item.label);
                    }
                  }}
                  className={`${styles.navItem} ${styles.navTrigger} ${
                    isActive ? styles.active : ""
                  }`}
                >
                  <img src={item.iconSrc} alt="" className={styles.icon} />
                  <span className={styles.navLabel}>{item.label}</span>
                  <svg
                    className={`${styles.chevron} ${isMenuOpen ? styles.chevronOpen : ""}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>

                {isMenuOpen && (
                  <div className={styles.subMenu}>
                    {item.subItems!.map((sub) => {
                      const isSubActive = pathname === sub.href;

                      return (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          onClick={() => setIsMobileOpen(false)}
                          className={`${styles.subNavItem} ${
                            isSubActive ? styles.subActive : ""
                          }`}
                        >
                          {sub.label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href!}
              title={item.label}
              aria-label={item.label}
              onClick={() => setIsMobileOpen(false)}
              className={`${styles.navItem} ${isActive ? styles.active : ""}`}
            >
              <img src={item.iconSrc} alt="" className={styles.icon} />
              <span className={styles.navLabel}>{item.label}</span>
            </Link>
          );
        })}1
      </nav>

      {/* Marca d'água geométrica no fundo */}
      <div className={styles.watermarkContainer}>
        <img className={styles.watermarkSvg} src="/svg/LogoPreta.svg" alt="Logo Watermark" />
      </div>
    </aside>
  );
};

export default Sidebar;