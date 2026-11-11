"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./sidebar.module.css";

interface NavItem {
  label: string;
  href: string;
  iconSrc: string; // Atualizado de React.ComponentType para string
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

  return (
    <aside className={styles.sidebar}>
      {/* Título / Logo */}
      <div className={styles.header}>
        <h1 className={styles.logo}>SkaL4ble</h1>
      </div>

      {/* Navegação */}
      <nav className={styles.nav}>
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.navItem} ${isActive ? styles.active : ''}`}
            >
              <img 
                src={item.iconSrc} 
                alt={item.label} 
                className={styles.icon} 
              />
              <span>{item.label}</span>
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