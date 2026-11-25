//! Esse page.tsx não pertence a nenhuma tela em especifíco,
//! entenda ele como uma forma de configurar rotas.
import { redirect, RedirectType } from 'next/navigation';

export default function Login() {
  redirect('/Login', RedirectType.replace);
}