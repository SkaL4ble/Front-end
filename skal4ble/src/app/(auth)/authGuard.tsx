"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/context/AuthContext";

interface AuthGuardProps {
  children: ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const { token, loading } = useAuth();

  useEffect(() => {
    if (!loading && !token) {
      router.replace("/Login");
    }
  }, [loading, token, router]);

  // Enquanto o token salvo ainda está sendo carregado
  if (loading) {
    return null;
  }

  if (!token) {
    return null;
  }

  return <>{children}</>;
}