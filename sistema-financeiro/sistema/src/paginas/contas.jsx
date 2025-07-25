import React, { useEffect, useState } from "react";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddConta from "../components/addConta";
import axios from "axios";
import { getUsuarioLogado } from "../utils/user";
import Loader from "../components/spiner2";
import { auth } from "../firebase";
import UpdateConta from "../components/updateConta";

function Contas() {
  const [isAdd, setIsAdd] = useState(false);
  const [contas, setContas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [id_usuario, setIdUsuario] = useState("");
  const [uid, setUid] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [contaSelecionada, setContaSelecionada] = useState(null);

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

    const fetchConta = async () => {
      try {
        const params = { uid, id_usuario };
        const response = await axios.get(
          "http://localhost:8000/api/contas-usuario",
          { params }
        );
        setContas(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Erro ao buscar contas:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchConta();
  }, [uid, id_usuario]);

  const adicionarConta = () => {
    setIsAdd(true);
    console.log("aaaaaaaa");
  };

 const Fechar = () => {
  setIsAdd(false);
  setIsUpdate(false);
};


  const AtualizarConta = (e) => {
    setContaSelecionada(e);
    setIsUpdate(true);
  }
  return (
    <div className="campo mx-4">
      {isAdd && <AddConta onClose={Fechar} />}
      {isUpdate &&  <UpdateConta conta={contaSelecionada} onClose={Fechar}/>}
      <div className="div3 w-80 ">
        <div className="row mb-4 w-60">
          <div className="col-sm-6">
            <h2>Contas</h2>
          </div>
          <div className="col-sm-6">
            <button
              className="btn btn-primary float-end2"
              onClick={adicionarConta}
            >
              Adicionar Conta +
            </button>
          </div>
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
                <th scope="row" className="v-a">
                  {i + 1}
                </th>
                <td className="v-a fw-bolder">{e.banco_nome}</td>
                <td className="v-a fw-medium">{e.descricao_banco}</td>
                <td className="v-a fw-medium">{e.saldo}</td>
                <td className="v-a">
                  <button onClick={()=> AtualizarConta(e)}  className="mb-2 mt-2 btn align-middle">
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      style={{ color: "#204A77", height: "18px" }}
                    />
                  </button>
                </td>
                <td className="v-a">
                  <button
                    onClick={() => Handledelete(e)}
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
  );

  function Handledelete(e) {
    const confirm = window.confirm(`Deseja apagar a conta ${e.banco_nome}?`);
    if (!confirm) return;
    console.log(`http://localhost:8000/api/Conta/${e.id_conta}`)
    axios.delete(`http://localhost:8000/api/Conta/${e.id_conta}`).then(() => {
      alert("Conta apagada com sucesso!");
    });
  }
}

export default Contas;
