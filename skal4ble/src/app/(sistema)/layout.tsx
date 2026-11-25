import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Sidebar } from "@/src/components/ui/sidebar/sidebar";

export default async function SistemaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  if (!token) {
    redirect("/login");
  }

  return (
    <main>
      <Sidebar />
      {children}
    </main>
  );
}