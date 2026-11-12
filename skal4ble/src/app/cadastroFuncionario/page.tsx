import Sidebar from "../../components/ui/sidebar/sidebar";
import Styles from './cadastro.module.css'
export default function CadastroFuncionarios() {
  return (
    <main>
      <Sidebar />
      <section className='column flex-1 padding-sidebar hidden column'>
        <h1>Cadastro de Funcionários</h1>
        <section className="container-25op flex-1">
          <section className="column">
            <section className='row'>
              <div className="column flex-1 margin-left">
                <div className='column'>
                  <h3>Nome</h3>
                  <input type="text" />
                </div>
                <div className='column'>
                  <h3>E-mail pessoal</h3>
                  <input type="email" />
                </div>
                <div className='column'>
                  <h3>Atuação</h3>
                  <select name="atuação" id="atuação">
                    <option value="">Selecione uma atuação</option>
                    <option value="front-end">Front-end</option>
                    <option value="back-end">Back-end</option>
                  </select>
                </div>
                <div className='column'>
                  <h3>Cargo</h3>
                  <select name="cargo" id="cargo">
                    <option value="">Selecione um cargo</option>
                    <option value="desenvolvedor">Desenvolvedor</option>
                    <option value="designer">Designer</option>
                    <option value="gerente">Gerente</option>
                  </select>
                </div>
                <div className='column'>
                  <h3>Anexar Foto</h3>
                  <input className="anexar-foto" type="file" accept="image/*" />
                </div>
              </div>
              <div className="column flex-1">
                <div className='column'>
                  <h3>Nome do Github</h3>
                  <input type="text" />
                </div>
                <div className="column">
                  <div className="column">
                    <h3>Email do Github</h3>
                    <input type="email" />
                  </div>
                  <div className="column">
                    <h3>Data de inserção</h3>
                    <input type="date" />
                  </div>
                  <div className="column">
                    <h3>Apto a ensinar</h3>
                    <select name="aptoEnsinar" id="aptoEnsinar">
                      <option value="">Selecione uma opção</option>
                      <option value="sim">Sim</option>
                      <option value="nao">Não</option>
                    </select>
                  </div>
                </div>
              </div>
            </section>
          </section>
          <div className="row">
            <button className="big-button-voltar margin-left-button">Voltar</button>
            <button className="big-button">Cadastrar</button>
          </div>
        </section>
      </section>
    </main>
  );
}
