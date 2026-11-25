import { Sidebar } from "@/src/components/ui/sidebar/sidebar";
import { AuthGuard } from "@/src/app/(auth)/authGuard";

export default function SistemaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <main>
        <Sidebar />
        {children}
      </main>
    </AuthGuard>
  );
}