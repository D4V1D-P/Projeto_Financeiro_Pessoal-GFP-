import React, { useEffect, useState } from "react";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom/cjs/react-router-dom";
import AddTipoPag from "../components/addTipoPag";
import axios from "axios";
//import Tableentradas from "../components/tableentradas";
import { getUsuarioLogado } from "../utils/user";
import Loader from '../components/spiner2'

function TPPagamento() {
  const [isAdd, setIsAdd] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const Adicionar = () => {
    setIsAdd(true)
  }

  const Fechar = () => {
    setIsAdd(false)
  }

  const [usuario, setUsuario] = useState(null);
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

    const [pagamentos, setPagamentos] = useState([]);

    useEffect(() => {
      if (!usuario) return;
      const fetchTipoPag = async () => {
        const response = await axios.get(
          "http://localhost:8000/api/tipo_pagamento"
        );
        const pagamentosUsuario = response.data.data.filter(
          (i) => usuario.uid === i.uid
        );
        setIsLoading(false)
        setPagamentos(pagamentosUsuario);
      };
      fetchTipoPag();
    }, [usuario]);

  return (
    <div className="campo mx-4">
      {isAdd && <AddTipoPag onClose={Fechar}/>}
      <div className="div3 w-80">
        <div className="row mb-4 w-60">
          <div className="col-sm-6">
            <h2>Tipo de Pagamento</h2>
            </div>
          <div className="col-sm-6">
            <button className="btn btn-primary float-end2" onClick={Adicionar}>Adicionar Tipo de Pagamento +</button>
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
            {pagamentos.map((e, i)=>(
              <tr key={i}>
                <th scope="row" className="v-a"> {i} </th>
                <td className="v-a fw-bolder">{e.nome}</td>
                <td className="v-a">
                  <Link to={`/`} className="mb-2 mt-2 align-middle">
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      style={{ color: "#204A77", height: "18px" }}
                    />
                  </Link>
                </td>
                <td className="v-a">
                  <button className="btn mb-2 mt-2 align-middle">
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
  );
}

export default TPPagamento;
