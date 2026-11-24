import { ErrorScreen } from '@/src/components/ui/error/ErrorScreen';

export default function NotFound() {
  return (
    <ErrorScreen
      code="404"
      badge="Rota Inexistente"
      title="Página não encontrada"
      description="O endereço que você tentou acessar não existe, foi movido ou está temporariamente indisponível."
    />
  );
}