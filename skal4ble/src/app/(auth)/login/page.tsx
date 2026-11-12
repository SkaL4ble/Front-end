import React from 'react';
import { Lock, Mail } from 'lucide-react';
import estilos from './login.module.css';

export default function LoginPage() {
  return (
    <main className={estilos.conteinerPrincipal}>
      <section className={estilos.painelLogo}>
        <div className={estilos.overlayConteudo}>
  <p className={estilos.rotuloBoasVindas}>Bem</p>
  <p className={estilos.rotuloBoasVindas}>vindo(a) ao</p>
  <h1 className={estilos.tituloDestaque}>Skal4ble!</h1>
</div>
      </section>

      <section className={estilos.painelFormulario}>
        <div className={estilos.cartaoFormulario}>
          <h2 className={estilos.titulo}>Login</h2>

          <form className={estilos.formulario}>
            <label className={estilos.campo}>
              <span>Email</span>
              <div className={estilos.entradaComIcone}>
                <Mail className={estilos.iconeEntrada} size={18} />
                <input type="email" placeholder="email@email.com" />
              </div>
            </label>

            <label className={estilos.campo}>
              <span>Senha</span>
              <div className={estilos.entradaComIcone}>
                <Lock className={estilos.iconeEntrada} size={18} />
                <input type="password" placeholder="••••••••" />
              </div>
            </label>

            

            <button type="submit" className={estilos.botaoPrimario}>
              Entrar
            </button>
            <a href="#" className='linkRecuperarSenha'>
              Esqueceu sua senha?
            </a>
          </form>
        </div>
      </section>
    </main>
  );
}