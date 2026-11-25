'use client';

import Link from 'next/link';

interface ErrorScreenProps {
  code?: string;
  badge?: string;
  title?: string;
  description?: string;
  digest?: string;
  reset?: () => void;
  /** Use true se renderizar dentro do grupo (sistema) para não somar duas alturas de tela */
  embedded?: boolean;
}

export function ErrorScreen({
  code = 'ERRO',
  badge = 'Falha no Sistema',
  title = 'Algo deu errado',
  description = 'Não foi possível concluir esta ação ou acessar a página solicitada no SkaL4ble.',
  digest,
  embedded = false,
}: ErrorScreenProps) {
  const isNotFound = code === '404';

  const badgeColor = isNotFound ? 'var(--roxo-escuro1)' : 'var(--vermelho)';
  const badgeBg = isNotFound
    ? 'rgba(57, 12, 136, 0.12)'
    : 'rgba(242, 56, 31, 0.12)';
  const badgeBorder = isNotFound
    ? 'rgba(57, 12, 136, 0.3)'
    : 'rgba(242, 56, 31, 0.35)';

  return (
    <section
      className={`${
        embedded ? 'flex-1 min-h-[80vh]' : 'min-h-screen w-full'
      } flex items-center justify-center p-6`}
    >
      <div
        className="panel-enter relative overflow-hidden flex flex-col items-center text-center max-w-lg w-full p-10"
        style={{
          background:
            'linear-gradient(180deg, rgba(255, 253, 244, 0.80) 50%, rgba(188, 177, 248, 0.80) 100%)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderRadius: 'var(--borda)',
          boxShadow: 'var(--sombra)',
          color: 'var(--preto)',
        }}
      >
        {/* Marca d'água da logo adaptada para o fundo claro */}
        <img
          src="/svg/LogoPreta.svg"
          alt=""
          aria-hidden="true"
          className="pointer-events-none select-none absolute -bottom-8 -right-8 w-56 opacity-[0.08]"
        />

        <span
          className="text-xs font-bold uppercase tracking-[0.25em] px-3 py-1 rounded-full mb-4"
          style={{
            fontFamily: 'var(--font-sansation), system-ui, sans-serif',
            backgroundColor: badgeBg,
            color: badgeColor,
            border: `1px solid ${badgeBorder}`,
          }}
        >
          {badge}
        </span>

        <h1
          className="text-6xl md:text-7xl font-bold tracking-tight mb-2 not-italic"
          style={{
            fontFamily: 'var(--font-chakra-petch), system-ui, sans-serif',
            color: isNotFound ? 'var(--roxo-escuro1)' : 'var(--vermelho)',
          }}
        >
          {code}
        </h1>

        <h2
          className="text-xl md:text-2xl font-bold mb-3 not-italic"
          style={{ color: 'var(--preto)' }}
        >
          {title}
        </h2>

        <p
          className="text-sm md:text-base mb-6 max-w-md leading-relaxed opacity-85"
          style={{
            fontFamily: 'var(--font-sansation), system-ui, sans-serif',
            color: 'var(--preto)',
          }}
        >
          {description}
        </p>

        {digest && (
          <code
            className="text-xs px-3 py-1.5 rounded-lg bg-black/10 border border-black/15 mb-6"
            style={{ color: 'var(--preto)' }}
          >
            Código técnico: {digest}
          </code>
        )}

        <div className="w-full flex items-center justify-center z-10 mt-2">
          <Link
            href="/login"
            className="big-button flex items-center justify-center font-bold text-center no-underline"
            style={{
              color: 'var(--branco)',
              width: '68%',
              minWidth: '13rem',
              padding: '0.6rem 1.5rem',
            }}
          >
            Voltar para o Login
          </Link>
        </div>
      </div>
    </section>
  );
}