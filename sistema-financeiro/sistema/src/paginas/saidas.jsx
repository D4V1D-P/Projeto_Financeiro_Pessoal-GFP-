import React, { useEffect, useState } from "react";
import axios from "axios";
//import Tableentradas from "../components/tableentradas";
import { getUsuarioLogado } from "../utils/user";

const Entradas = () => {
  const [categoria, setCategoria] = useState("");
  const [valor, setValor] = useState("");
  const [data, setData] = useState("");
  const [descricao, setDescricao] = useState("");
  const [conta, setConta] = useState("");
  const [pag, setPag] = useState("");

  const [uid, setUid] = useState("");
  const [id_usuario, setIdUsuario] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [contas, setContas] = useState([]);
  const [pagamentos, setPagamentos] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUsuarioLogado();
      if (user) {
        setUid(user.uid);
        setIdUsuario(user.id_usuario);
      } else {
        alert("Usuário não encontrado ou não logado");
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (!uid || !id_usuario) return;

    const params = { uid, id_usuario };

    const fetchCategoria = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/categorias-saida-usuario",
          { params }
        );
        setCategorias(response.data);
      } catch (error) {
        console.error("Erro ao buscar categorias", error);
      }
    };

    const fetchConta = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/contas-usuario",
          { params }
        );
        setContas(response.data);
      } catch (error) {
        console.error("Erro ao buscar contas", error);
      }
    };

    const fetchPagamentos = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/tipo-pagamento-usuario",
          { params }
        );
        setPagamentos(response.data);
      } catch (error) {
        console.error("Erro ao buscar tipos de pagamento", error);
      }
    };

    fetchCategoria();
    fetchConta();
    fetchPagamentos();
  }, [uid, id_usuario]);

  const Enviardados = (e) => {
    if (!categoria || !conta || !pag) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    e.preventDefault();
    const novaSaida = {
      id_usuario: id_usuario,
      id_Categoria_saida: categoria,
      valor,
      data,
      descricao,
      id_Tipo_pagamento: pag,
      id_conta: conta,
      status: "ativo",
      uid: uid,
    };
    console.log(novaSaida);
    axios
      .post("http://localhost:8000/api/despesas", novaSaida)
      .then(() => {
        alert("entrada adicionada!");
      })
      .catch((erro) => {
        alert("erro ao cadastrar saida" + erro);
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
                <label htmlFor="id_Categoria_entrada" className="label">
                  categoria
                </label>
                <select
                  name="id_Categoria_entrada"
                  id="id_Categoria_entrada"
                  required
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                >
                  <option value="">Selecione uma categoria</option>
                  {categorias.map((e) => (
                    <option
                      key={e.id_Categoria_entrada}
                      value={e.id_Categoria_entrada}
                    >
                      {e.nome}
                    </option>
                  ))}
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
                <label htmlFor="id_Categoria_entrada" className="label">
                  Tipo Pagamento
                </label>
                <select
                  name="id_Tipo_pagamento"
                  id="id_Tipo_pagamento"
                  value={pag}
                  onChange={(e) => setPag(e.target.value)}
                  required
                >
                  <option value="">Selecione um tipo de pagamento</option>
                  {pagamentos.map((e) => (
                    <option
                      key={e.id_Tipo_pagamento}
                      value={e.id_Tipo_pagamento}
                    >
                      {e.nome}
                    </option>
                  ))}
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
                  required
                >
                  <option value="">Selecione uma conta</option>
                  {contas.map((e) => (
                    <option key={e.id_conta} value={e.id_conta}>
                      {e.banco_nome}
                    </option>
                  ))}
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
      {/* <Tableentradas /> */}
    </>
  );
};

export default Entradas;
