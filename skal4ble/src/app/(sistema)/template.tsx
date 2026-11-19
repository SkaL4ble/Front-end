"use client";

import { usePathname } from "next/navigation";

export default function SistemaTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <section
      key={pathname}
      className="column flex-1 padding-sidebar hidden page-enter"
    >
      {children}
    </section>
  );
}