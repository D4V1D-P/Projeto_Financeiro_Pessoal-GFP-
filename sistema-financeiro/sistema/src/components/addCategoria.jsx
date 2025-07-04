import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { getUsuarioLogado } from "../utils/user";
import Loader from "./spiner";

const AddCategoria = (props) => {
  const history = useHistory();
  const [nome, setNome] = useState("");
  const [categoria, setCategoria] = useState("");
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

    const novaCategoria = {
      id_usuario: usuario.id_usuario, // agora temos o id
      nome,
      uid: usuario.uid,
      status: "ativo",
    };
    console.log(novaCategoria);

    if (categoria === "Receita") {
      axios
        .post("http://localhost:8000/api/categoria_entrada", novaCategoria)
        .then(() => {
          alert("Categoria cadastrada com sucesso!");
          history.push("/Categorias");
        })
        .catch((err) => {
          alert("Erro ao cadastrar categoria: " + err);
        });
    } else if (categoria === "Despesa") {
      axios
        .post("http://localhost:8000/api/CategoriaSaida", novaCategoria)
        .then(() => {
          alert("Categoria cadastrada com sucesso!");
          setBtn("Adicionar")
          history.push("/Categorias");
        })
        .catch((err) => {
          alert("Erro ao cadastrar categoria: " + err);
          setBtn("Adicionar")
        });
    } else {
      alert("selecione um tipo de categoria");
      setBtn("Adicionar")
    }
  };

  return (
    <div className="corpoUpdate">
      <form onSubmit={handleSubmit}>
        <div className="areaUpdate p-5">
          <div className="mb-4">
            <h2>Adicionar categoria</h2>
          </div>
          <div className="row mb-4">
            <div className="col-md-12 campoLabel">
              <label htmlFor="nome" className="label">
                Categoria
              </label>
              <input
                type="text"
                name="nome"
                onChange={(e) => setNome(e.target.value)}
              />
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-md-12 campoLabel">
              <label htmlFor="nome" className="label">
                Tipo
              </label>
              <select
                name=""
                id=""
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                required
              >
                <option value=""></option>
                <option value="Despesa">Despesa</option>
                <option value="Receita">Receita</option>
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <button className="botao" type="submit">
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

export default AddCategoria;
