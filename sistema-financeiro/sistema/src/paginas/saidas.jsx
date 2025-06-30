import React, { useEffect, useState } from "react";
import axios from "axios";
//import Tableentradas from "../components/tableentradas";
import { getUsuarioLogado } from "../utils/user";

const Saidas = () => {
  const [categoria, setCategoria] = useState("");
  const [valor, setValor] = useState("");
  const [data, setData] = useState("");
  const [descricao, setDescricao] = useState("");
  const [conta, setConta] = useState("");
  const [pag, setPag] = useState("");

  const [usuario, setUsuario] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const [contas, setContas] = useState([]);
  const [pagamentos, setPagamentos] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUsuarioLogado();
      if (user) {
        setUsuario(user);
      } else {
        alert("Usuário não encontrado ou não logado");
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (!usuario) return;
    const fetchCategoria = async () => {
      const response = await axios.get(
        "http://localhost:8000/api/CategoriaSaida"
      );
      const categoriasUsuario = response.data.data.filter(
        (i) => usuario.uid === i.uid
      );
      console.log(categoriasUsuario);
      setCategorias(categoriasUsuario);
    };
    fetchCategoria();
  }, [usuario]);

  useEffect(() => {
    if (!usuario) return;
    const fetchConta = async () => {
      const response = await axios.get("http://localhost:8000/api/Conta");
      const contasUsuario = response.data.data.filter(
        (i) => usuario.uid === i.uid
      );
      setContas(contasUsuario);
    };
    fetchConta();
  }, [usuario]);

  useEffect(() => {
    if (!usuario) return;
    const fetchTipoPag = async () => {
      const response = await axios.get(
        "http://localhost:8000/api/tipo_pagamento"
      );
      const pagamentosUsuario = response.data.data.filter(
        (i) => usuario.uid === i.uid
      );
      setPagamentos(pagamentosUsuario);
    };
    fetchTipoPag();
  }, [usuario]);

  const Enviardados = (e) => {
    e.preventDefault();
    const novaSaida = {
      id_usuario: usuario.id_usuario,
      id_Categoria_saida: categoria,
      valor,
      data,
      descricao,
      id_Tipo_pagamento: pag,
      id_conta: conta,
      status: "ativo",
      uid: usuario.uid,
    };
    console.log(novaSaida);
    axios
      .post("http://localhost:8000/api/despesas", novaSaida)
      .then(() => {
        alert("despesa adicionada!");
      })
      .catch((erro) => {
        alert("erro ao cadastrar despesa" + erro);
      });
  };

  return (
    <>
      <div className="campo2 mt-5 mx-5">
        <h2 className="mt-4 m-225">Saidas</h2>
        <form onSubmit={Enviardados}>
          <div className="formcadastro">
            <h5>Adicionar nova despesa</h5>
            <div className="row mb-3 mt-4">
              <div className="col-md-6 r campoLabel">
                <label htmlFor="id_Categoria_saida" className="label">
                  categoria
                </label>
                <select
                  name="id_Categoria_saida"
                  id="id_Categoria_saida"
                  required
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                >
                  {categorias.length !== 0 ? (
                    categorias.map((e) => (
                      <option key={e.id_Categoria_saida} value={e.id_Categoria_saida} >
                        {e.nome}
                      </option>
                    ))
                  ) : (
                    <option value="">carregando...</option>
                  )}
                </select>
              </div>
              <div className="col-md-6 campoLabel">
                <label htmlFor="data" className="label">
                  data
                </label>
                <input
                  required
                  type="date"
                  id="data"
                  className="input"
                  value={data}
                  onChange={(e) => setData(e.target.value)}
                />
              </div>
            </div>
            <div className="row mb-3 gap-3">
              <div className="col-md-12 r campoLabel">
                <label htmlFor="id_Categoria_saida" className="label">
                  Tipo Pagamento
                </label>
                <select
                  name="id_Categoria_saida"
                  id="id_Categoria_saida"
                  value={pag}
                  onChange={(e) => setPag(e.target.value)}
                >
                  {pagamentos.length !== 0 ? (
                    pagamentos.map((e) => (
                      <option key={e.id_Tipo_pagamento} value={e.id_Tipo_pagamento}>
                        {e.nome}
                      </option>
                    ))
                  ) : (
                    <option value="">carregando...</option>
                  )}
                </select>
              </div>
              <div className="col-md-12 campoLabel">
                <label htmlFor="valor" className="label">
                  Valor
                </label>
                <input
                  type="number"
                  className="input"
                  id="valor"
                  name="valor"
                  value={valor}
                  onChange={(e) => setValor(e.target.value)}
                />
              </div>
            </div>
            <div className="row mb-3 gap-3">
              <div className="col-md-12 r campoLabel">
                <label htmlFor="id_conta" className="label">
                  Conta
                </label>
                <select
                  name="id_conta"
                  id="id_conta"
                  value={conta}
                  onChange={(e) => setConta(e.target.value)}
                >
                  {contas.length !== 0 ? (
                    contas.map((e) => (
                      <option key={e.id_conta} value={e.id_conta}>
                        {e.banco_nome}
                      </option>
                    ))
                  ) : (
                    <option value="">carregando...</option>
                  )}
                </select>
              </div>
              <div className="col-md-12 campoLabel">
                <label htmlFor="descricao" className="label">
                  descrição
                </label>
                <textarea
                  id="descricao"
                  name="descricao"
                  style={{ width: "100%", height: "100px" }}
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                ></textarea>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <button className="botao fw-medium" type="submit">
                  Cadastrar
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      {/* <Tablesaidas/> */}
    </>
  );
};

export default Saidas;
