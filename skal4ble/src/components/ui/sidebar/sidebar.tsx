"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Users, Briefcase, SquareCheckBig, GraduationCap, Settings } from "lucide-react";
import styles from "./sidebar.module.css";

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
}

const navItems: NavItem[] = [
  { label: "Funcionários", href: "/funcionarios", icon: Users },
  { label: "Projetos", href: "/projetos", icon: Briefcase },
  { label: "To-Do List", href: "/todo", icon: SquareCheckBig },
  { label: "Treinamento", href: "/treinamento", icon: GraduationCap },
  { label: "Configurações", href: "/configuracoes", icon: Settings },
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
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.navItem} ${isActive ? styles.active : ''}`}
            >
              {/* Forçando o size do Lucide para garantir que o SVG não estoure */}
              <Icon size={22} className={styles.icon} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Marca d'água geométrica no fundo */}
      <div className={styles.watermarkContainer}>
        {/* Corrigido de id={styles.img} para className={styles.watermarkSvg} */}
        <img className={styles.watermarkSvg} src="/svg/LogoPreta.svg" alt="Logo Watermark" />
      </div>
    </aside>
  );
};

export default Sidebar;