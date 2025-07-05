import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { getUsuarioLogado } from "../utils/user";
import Loader from "./spiner";

const AddTipoPag = (props) => {
  const history = useHistory();
  const [nome, setNome] = useState("");
  const [usuario, setUsuario] = useState(null);

  const [btn, setBtn] = useState('Adicionar')

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setBtn(Loader)

    if (!usuario) {
      alert("Usuário não carregado!");
      setBtn("Adicionar")
      return;
    }

    const novoTipoPag = {
      id_usuario: usuario.id_usuario, // agora temos o id
      nome,
      uid: usuario.uid,
    };
    console.log(novoTipoPag);

    axios
      .post("http://localhost:8000/api/tipo_pagamento", novoTipoPag)
      .then(() => {
        alert("Categoria cadastrada com sucesso!");
        history.push("/Categorias");
        setBtn("Adicionar")
      })
      .catch((err) => {
        alert("Erro ao cadastrar categoria: " + err);
        setBtn("Adicionar")
      });
  };

  return (
    <div className="corpoUpdate">
      <form onSubmit={handleSubmit}>
        <div className="areaUpdate p-5">
          <div className="mb-4">
            <h2>Adicionar Tipo de Pagamento</h2>
          </div>
          <div className="row mb-4">
            <div className="col-md-12 campoLabel">
              <label htmlFor="nome" className="label">
                Nome Conta
              </label>
              <input
                type="text"
                name="nome"
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <button className="botao btn-gfp" type="submit">
                {btn}
              </button>
            </div>
            <div className="col-sm-12">
              <button
                onClick={props.onClose}
                className="btn btn-light w-100 mt-2 btn-gfp"
                style={{ borderRadius: "10px" }}
              >
                Voltar
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddTipoPag;
