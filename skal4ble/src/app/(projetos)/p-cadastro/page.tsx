import Sidebar from "../../../components/ui/sidebar/sidebar";
export default function CadastroProjetos() {
    return (
        <main>
            <Sidebar />
            <section className='column flex-1 padding-sidebar hidden column'>
                <h1>Cadastro de Projetos</h1>
                <section className="container-25op flex-1">
                    <section className="column">
                        <section className='row'>
                            <div className="column flex-1 margin-left">
                                <div className='column'>
                                    <h3>Nome</h3>
                                    <input type="text" />
                                </div>
                                <div className='column'>
                                    <h3>Prazo</h3>
                                    <input type="date" />
                                </div>
                            </div>
                            <div className="column flex-1">
                                <div className='column'>
                                    <h3>Autor</h3>
                                    <input type="text" />
                                </div>
                                <div className="column">
                                    <div className="column">
                                        <h3>Status</h3>
                                        <select name="status" id="status">
                                            <option value="">Selecione um status</option>
                                            <option value="pendente">Pendente</option>
                                            <option value="em-andamento">Em Andamento</option>
                                            <option value="concluido">Concluído</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <div className="column margin-left">
                            <div className="column">
                                <h3>Link do repositório</h3>
                                <input type="url" className="link"/>
                            </div>
                            <div className="column">
                                <h3>Descrição</h3>
                                <input type="text" className="descricao" />
                            </div>

                        </div>
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
