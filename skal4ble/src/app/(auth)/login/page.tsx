'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import estilos from './login.module.css';

export default function LoginPage() {
  const [mostrarSenha, setMostrarSenha] = useState(false);

  return (
    <main>
      {/* Painel Esquerdo: Boas-vindas e Marca */}
      <section className={estilos.painelLogo}>
        <div className={estilos.overlayConteudo}>
          <p className={estilos.rotuloBoasVindas}>Bem</p>
          <p className={estilos.rotuloBoasVindas}>vindo(a) ao</p>
          <h1 className={estilos.tituloDestaque}>SkaL4ble!</h1>
        </div>
      </section>

      {/* Painel Direito: Formulário de Login */}
      <section className={estilos.painelFormulario}>
        <div className={estilos.caixaLogin}>
          <h1 className={estilos.tituloLogin}>Login</h1>

          <form className={estilos.formulario}>
            {/* Campo Email */}
            <div className="form-group">
              <h3>Email:</h3>
              <div className={estilos.campoComIcone}>
                <Mail className={estilos.iconeEsquerda} size={18} />
                <input
                  type="email"
                  placeholder="email@email.com"
                  className={`input-pill ${estilos.inputComIcone}`}
                  required
                />
              </div>
            </div>

            {/* Campo Senha */}
            <div className="form-group">
              <h3>Senha:</h3>
              <div className={estilos.campoComIcone}>
                <Lock className={estilos.iconeEsquerda} size={18} />
                <input
                  type={mostrarSenha ? 'text' : 'password'}
                  placeholder="••••••••••••"
                  className={`input-pill ${estilos.inputComIcone} ${estilos.inputSenha}`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setMostrarSenha((prev) => !prev)}
                  className={estilos.botaoOlho}
                  aria-label="Mostrar ou ocultar senha"
                >
                  {mostrarSenha ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Ações */}
            <div className={estilos.acoesLogin}>
              <button type="submit" className={`big-button ${estilos.botaoEntrar}`}>
                Entrar
              </button>

              <Link href="/recuperar-senha" className={estilos.linkRecuperarSenha}>
                Esqueceu sua senha?
              </Link>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}