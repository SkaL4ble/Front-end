"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./sidebar.module.css";

interface NavItem {
  label: string;
  href: string;
  iconSrc: string;
}

const navItems: NavItem[] = [
  { label: "Funcionários", href: "/funcionarios", iconSrc: "/icon/IFuncionarios.svg" },
  { label: "Projetos", href: "/projetos", iconSrc: "/icon/IProjetos.svg" },
  { label: "To-Do List", href: "/to-do", iconSrc: "/icon/IToDoList.svg" },
  { label: "Treinamento", href: "/treinamento", iconSrc: "/icon/ITreino.svg" },
  { label: "Configurações", href: "/configuracoes", iconSrc: "/icon/IConfiguracoes.svg" },
];

export const Sidebar = () => {
  const pathname = usePathname();
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

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
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              title={item.label}
              aria-label={item.label}
              onClick={() => setIsMobileOpen(false)}
              className={`${styles.navItem} ${isActive ? styles.active : ""}`}
            >
              <img
                src={item.iconSrc}
                alt=""
                className={styles.icon}
              />
              <span className={styles.navLabel}>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Marca d'água geométrica no fundo */}
      <div className={styles.watermarkContainer}>
        <img className={styles.watermarkSvg} src="/svg/LogoPreta.svg" alt="Logo Watermark" />
      </div>
    </aside>
  );
};

export default Sidebar;