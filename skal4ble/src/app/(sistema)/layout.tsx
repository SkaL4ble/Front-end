import { Sidebar } from "@/src/components/ui/sidebar/sidebar";

export default function SistemaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <Sidebar />
      {children}
    </main>
  );
}