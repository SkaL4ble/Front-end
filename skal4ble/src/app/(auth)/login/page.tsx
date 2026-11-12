import React from 'react';
import { Lock, Mail } from 'lucide-react';
import estilos from './login.module.css';

export default function LoginPage() {
  return (
    <main className='main'>
      <section className={estilos.painelLogo}>
        <div className={estilos.overlayConteudo}>
          <p className={estilos.rotuloBoasVindas}>Bem</p>
          <p className={estilos.rotuloBoasVindas}>vindo(a) ao</p>
          <h1 className={estilos.tituloDestaque}>Skal4ble!</h1>
        </div>
      </section>

      <section className='flex-1 padding-sidebar hidden column'>
        <div className='flex-1 padding-sidebar hidden column'>
          <div className='column flex-1 padding-sidebar hidden'>
          <h1 className='margin-login'>Login</h1>

          <div className='column padding-sidebar hidden'>
           
                <p className='margin-left'>Email</p>
                <input type="email" placeholder="email@email.com" className='input-login'/>

                <p className='margin-left'>Senha</p>
                <input type="password" placeholder="••••••••" className='input-login'/>



            <button type="submit" className='botao-login'>
              Entrar
            </button>
            <a href="#" className='linkRecuperarSenha'>
              Esqueceu sua senha?
            </a>
          </div>
        </div>
        </div>
      </section>
    </main>
  );
}