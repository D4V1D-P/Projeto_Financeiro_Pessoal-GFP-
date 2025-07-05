import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { getUsuarioLogado } from "../utils/user";
import { auth } from "../firebase";

const Tableentradas = () => {
    const [entradas, setEntradas] = useState([]);
    const [id_usuario, setIdUsuario] = useState("");
    const [uid, setUid] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUsuarioLogado();
      const currentUser = auth.currentUser;

      if (user) {
        setIdUsuario(user.id_usuario);
        setUid(user.uid);
      } else if (currentUser) {
        setUid(currentUser.uid);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (!uid || !id_usuario) return;

    const fetchPagamentos = async () => {
      try {
        const params = { uid, id_usuario };
        const response = await axios.get(
          "http://localhost:8000/api/receitas-usuario",
          { params }
        );
        setEntradas(response.data);
      } catch (err) {
        console.error("Erro ao buscar receitas:", err);
        alert("Erro ao ao buscar receitas.");
      }
    };

    fetchPagamentos();
  }, [uid, id_usuario]);

  // const [entradas, setEntradas] = useState([])
  // useEffect(() => {
  //     axios.get('http://localhost:3005/todasentradas')
  //         .then((resposta) => {
  //             setEntradas(resposta.data)
  //         })
  //         .catch(() => {
  //             alert('erro ao buscar dados')
  //         })
  // }, [])

  // const [startData, setStartData] = useState('')
  // const [endData, setEndData] = useState('')
  // const params = { startData, endData }

  // const Filtrar = () => {
  //     if (startData === '' || endData === '') {
  //         alert('Preencha os campos de data')
  //         return
  //     }
  //     axios.get('http://localhost:3005/filtroreceitas', { params })
  //         .then((resposta) => {
  //             setEntradas(resposta.data)
  //         })
  //         .catch(() => {
  //             alert('erro ao buscar dados')
  //         })
  // }
  return (
    <>
      <div className="campo overflow mx-52">
        <div className="div3">
          <h2>Tabela de Entradas</h2>
        </div>
        {/* <div className="div3 filtroDashboard">
          <div>
            <label>Data Início</label>
            <input
              type="date"
              value={startData}
              onChange={(e) => setStartData(e.target.value)}
              className="form-control"
            />
          </div>
          <div>
            <label>Data Fim</label>
            <input
              type="date"
              value={endData}
              onChange={(e) => setEndData(e.target.value)}
              className="form-control"
            />
          </div>
          <button
            onClick={Filtrar}
            className="btn mt-4"
            style={{ backgroundColor: "#003366", color: "#fff" }}
          >
            Filtrar
          </button>
        </div> */}
        <div className="div2">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Categoria</th>
                <th scope="col">Valor</th>
                <th scope="col">Data</th>
                <th scope="col">Pagamento</th>
                <th scope="col">Conta</th>
                <th scope="col">Descrição</th>
                <th scope="col">Modificar</th>
                <th scope="col">Deletar</th>
              </tr>
            </thead>
            <tbody>
              {entradas.map((entradas, i) => (
                <tr key={entradas.id}>
                  <th scope="row" className="v-a">
                    {i + 1}
                  </th>
                  <td className="v-a fw-bolder">
                    {entradas.nome_categoria === null ? 'categoria não definida' : entradas.nome_categoria}
                    </td>
                  <td className="v-a text-success fw-medium">
                    R$ {entradas.valor}
                  </td>
                  <td className="v-a">
                    {new Date(entradas.data).toLocaleDateString(
                      "pt-BR",
                      {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      }
                    )}
                  </td>
                  <td className="v-a">
                    {entradas.tipo_pagamento === null ? 'pagamento não definido' : entradas.tipo_pagamento}
                    </td>
                  <td className="v-a">
                    {entradas.nome_conta === null ? 'conta não definida' : entradas.nome_conta}
                    </td>
                  <td className="v-a">
                    <div
                      style={{
                        maxWidth: "220px",
                        whiteSpace: "nowrap",
                        overflowX: "auto",
                        textOverflow: "ellipsis",
                        display: "block",
                      }}
                    >
                      {entradas.descricao}
                    </div>
                  </td>
                  <td className="v-a">
                    <Link
                      to={`/updateentrada/${entradas.id}`}
                      className="mb-2 mt-2 align-middle"
                    >
                      <FontAwesomeIcon
                        icon={faPenToSquare}
                        style={{ color: "#204A77", height: "18px" }}
                      />
                    </Link>
                  </td>
                  <td className="v-a">
                    <button
                      onClick={(e) => Handledelete(entradas.id)}
                      className="btn mb-2 mt-2 align-middle"
                    >
                      <FontAwesomeIcon
                        icon={faTrashCan}
                        style={{ color: "#E9332E", height: "18px" }}
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
  function Handledelete(id) {
    const confirm = window.confirm("Deseja apagar o receita?");
    if (confirm) {
      axios.delete("http://localhost:8000/api/receitas/" + id).then((res) => {
        alert("receita apagada com sucesso!");
      });
    }
  }
};

export default Tableentradas;
