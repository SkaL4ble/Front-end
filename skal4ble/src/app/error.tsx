'use client';

import { useEffect } from 'react';
import { ErrorScreen } from '@/src/components/ui/error/ErrorScreen';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Erro capturado:', error);
  }, [error]);

  return (
    <ErrorScreen
      code="500"
      badge="Falha Inesperada"
      title="Algo deu errado"
      description="Ocorreu um erro ao carregar esta tela. Você pode tentar recarregar o módulo ou voltar para a área principal."
      digest={error.digest}
      reset={reset}
    />
  );
}