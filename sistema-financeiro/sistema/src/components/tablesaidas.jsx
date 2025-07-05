import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { getUsuarioLogado } from "../utils/user";
import { auth } from "../firebase";

const Tablesaidas = () => {
  const [saidas, setSaidas] = useState([]);

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
          "http://localhost:8000/api/despesas-usuario",
          { params }
        );
        setSaidas(response.data);
      } catch (err) {
        console.error("Erro ao buscar despesas:", err);
        alert("Erro ao ao buscar despesas.");
      }
    };

    fetchPagamentos();
  }, [uid, id_usuario]);


  return (
    <>
      <div className="campo overflow mx-52">
              <div className="div3">
                <h2>Tabela de Saidas</h2>
              </div>
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
                    {saidas.map((saidas, i) => (
                      <tr key={saidas.id}>
                        <th scope="row" className="v-a">
                          {i + 1}
                        </th>
                        <td className="v-a fw-bolder">
                          {saidas.nome_categoria === null ? 'categoria não definida' : saidas.nome_categoria}
                          </td>
                        <td className="v-a text-success fw-medium">
                          R$ {saidas.valor}
                        </td>
                        <td className="v-a">
                          {new Date(saidas.data).toLocaleDateString(
                            "pt-BR",
                            {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            }
                          )}
                        </td>
                        <td className="v-a">
                          {saidas.tipo_pagamento === null ? 'pagamento não definido' : saidas.tipo_pagamento}
                          </td>
                        <td className="v-a">
                          {saidas.nome_conta === null ? 'conta não definida' : saidas.nome_conta}
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
                            {saidas.descricao}
                          </div>
                        </td>
                        <td className="v-a">
                          <Link
                            to={`/updateentrada/${saidas.id}`}
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
                            onClick={(e) => Handledelete(saidas.id)}
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
    const confirma = window.confirm("Deseja apagar o dado?");
    if (confirma) {
      axios.delete("http://localhost:8000/api/despesas/" + id).then((res) => {
        alert("dado apagado com sucesso!");
      });
    }
  }
};

export default Tablesaidas;
