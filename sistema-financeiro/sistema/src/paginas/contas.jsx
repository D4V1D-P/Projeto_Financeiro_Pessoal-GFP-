import React, { useEffect, useState } from "react";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom/cjs/react-router-dom";
import AddConta from "../components/addConta";
import axios from "axios";
import { getUsuarioLogado } from "../utils/user";
import Loader from '../components/spiner2'

function Contas() {

  const [isAdd, setIsAdd] = useState(false)
  const [contas, setContas] = useState([])
  const [usuario, setUsuario] = useState(null);
   const [isLoading, setIsLoading] = useState(true)

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
      const fetchConta = async () => {
        const response = await axios.get("http://localhost:8000/api/Conta");
        const contasUsuario = response.data.data.filter(
          (i) => usuario.uid === i.uid
        );
        setIsLoading(false)
        setContas(contasUsuario);
      };
      fetchConta();
    }, [usuario]);

  const adicionarConta = () => {
    setIsAdd(true)
    console.log("aaaaaaaa")
  }

  const Fechar = () => {
    setIsAdd(false)
  }
  return (
    <div className="campo mx-4">
      {isAdd && <AddConta onClose={Fechar} />}
      <div className="div3 w-80 ">
        <div className="row mb-4 w-60">
          <div className="col-sm-6"><h2>Contas</h2></div>
          <div className="col-sm-6"><button className="btn btn-primary float-end2" onClick={adicionarConta}>Adicionar Conta +</button></div>
        </div>
        <h5>Histórico de Contas</h5>
        <table className="table w-60 shadow1 mt-4">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Conta</th>
              <th scope="col">Descrição</th>
              <th scope="col">Preço</th>
              <th scope="col">Modificar</th>
              <th scope="col">Deletar</th>
            </tr>
          </thead>
          {isLoading && <Loader />}
          <tbody>
            {contas.map((e, i) => (
              <tr key={i}>
                <th scope="row" className="v-a"> {i + 1} </th>
                <td className="v-a fw-bolder">{e.banco_nome}</td>
                <td className="v-a fw-medium">{e.descricao_banco}</td>
                <td className="v-a fw-medium">{e.saldo}</td>
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

export default Contas;
