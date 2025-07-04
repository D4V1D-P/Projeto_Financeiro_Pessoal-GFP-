import React, { useEffect, useState } from "react";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom/cjs/react-router-dom";
import AddTipoPag from "../components/addTipoPag";
import axios from "axios";
import { getUsuarioLogado } from "../utils/user";
import Loader from '../components/spiner2';
import { auth } from "../firebase";

function TPPagamento() {
  const [isAdd, setIsAdd] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [pagamentos, setPagamentos] = useState([]);
  const [id_usuario, setIdUsuario] = useState("");
  const [uid, setUid] = useState("");

  const Adicionar = () => setIsAdd(true);
  const Fechar = () => setIsAdd(false);

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
        const response = await axios.get("http://localhost:8000/api/tipo-pagamento-usuario", { params });
        setPagamentos(response.data);
      } catch (err) {
        console.error("Erro ao buscar tipos de pagamento:", err);
        alert("Erro ao buscar tipos de pagamento.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPagamentos();
  }, [uid, id_usuario]);

  return (
    <div className="campo mx-4">
      {isAdd && <AddTipoPag onClose={Fechar} />}
      <div className="div3 w-80">
        <div className="row mb-4 w-60">
          <div className="col-sm-6">
            <h2>Tipo de Pagamento</h2>
          </div>
          <div className="col-sm-6">
            <button className="btn btn-primary float-end2" onClick={Adicionar}>
              Adicionar Tipo de Pagamento +
            </button>
          </div>
        </div>
        <h5>Histórico de Tipo de Pagamento</h5>
        <table className="table w-60 shadow1 mt-4">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">TP Pagamento</th>
              <th scope="col">Modificar</th>
              <th scope="col">Deletar</th>
            </tr>
          </thead>
          {isLoading && <Loader />}
          <tbody>
            {pagamentos.map((e, i) => (
              <tr key={i}>
                <th scope="row" className="v-a"> {i + 1} </th>
                <td className="v-a fw-bolder">{e.nome}</td>
                <td className="v-a">
                  <Link to={`/`} className="mb-2 mt-2 align-middle">
                    <FontAwesomeIcon icon={faPenToSquare} style={{ color: "#204A77", height: "18px" }} />
                  </Link>
                </td>
                <td className="v-a">
                  <button onClick={() => Handledelete(e)} className="btn mb-2 mt-2 align-middle">
                    <FontAwesomeIcon icon={faTrashCan} style={{ color: "#E9332E", height: "18px" }} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

    function Handledelete(e) {
    const confirm = window.confirm(`Deseja apagar o tipo de pagamento ${e.nome}?`);
    if (!confirm) return;
    console.log(`http://localhost:8000/api/tipo_pagamento/${e.id_Tipo_pagamento}`)
    axios.delete(`http://localhost:8000/api/tipo_pagamento/${e.id_Tipo_pagamento}`).then(() => {
      alert("tipo de pagamento apagado com sucesso!");
    });
  }

}

export default TPPagamento;
