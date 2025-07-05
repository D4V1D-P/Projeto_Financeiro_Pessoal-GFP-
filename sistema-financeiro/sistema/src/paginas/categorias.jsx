import React, { useEffect, useState } from "react";
import { auth } from "../firebase"
import axios from "axios";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddCategoria from "../components/addCategoria";
import { getUsuarioLogado } from "../utils/user";
import Loader from '../components/spiner2'
import UpdateCategoria from "../components/updateCategoria";


function Categorias() {
  
  const [isAdd, setIsAdd] = useState(false)
  const [categorias, setCategorias] = useState([]) // categorias combinadas
  const [isLoading, setIsLoading] = useState(true)
  const [uid, setUid] = useState("");
  const [id_usuario, setIdUsuario] = useState("");
  const [isUpdate, setIsUpdate] = useState(false)
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null)


  const modalCategoria = () => {
    setIsAdd(true)
  }

  const Fechar = () => {
    setIsAdd(false)
    setIsUpdate(false)
  }

  const AtualizarCategoria = (categoria) => {
    setCategoriaSelecionada(categoria)
    setIsUpdate(true)
  }

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
  }

  fetchUser();
}, []);

  
  useEffect(() => {
  if (!uid || !id_usuario) return; // aguarda carregar

  const fetchCategorias = async () => {
    try {
      const params = { uid, id_usuario };
      
      const [resEntrada, resSaida] = await Promise.all([
        axios.get("http://localhost:8000/api/categorias-entrada-usuario", { params }),
        axios.get("http://localhost:8000/api/categorias-saida-usuario", { params })
      ]);

      const catEntrada = resEntrada.data.map(cat => ({
        ...cat,
        tipo: "Receita"
      }));

      const catSaida = resSaida.data.map(cat => ({
        ...cat,
        tipo: "Despesa"
      }));

      setCategorias([...catEntrada, ...catSaida]);
      setIsLoading(false);
    } catch (error) {
      console.error("Erro ao buscar categorias:", error);
      alert("Erro ao carregar categorias");
      setIsLoading(false);
    }
  };

  fetchCategorias();
}, [uid, id_usuario]);


  return (
    <div className="campo mx-4">
      {isAdd && <AddCategoria onClose={Fechar} />}
      {isUpdate && categoriaSelecionada && ( <UpdateCategoria categoria={categoriaSelecionada} onClose={Fechar}/>)}

      <div className="div3 w-80">
        <div className="row mb-4 w-60">
          <div className="col-sm-6">
            <h2>Categorias</h2>
          </div>
          <div className="col-sm-6">
            <button className="btn btn-primary float-end2" onClick={modalCategoria}>
              Adicionar Categoria +
            </button>
          </div>
        </div>

        <h5>Histórico de Categorias</h5>
        <table className="table w-60 shadow1 mt-4">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Categoria</th>
              <th scope="col">Tipo</th>
              <th scope="col">Modificar</th>
              <th scope="col">Deletar</th>
            </tr>
          </thead>
          {isLoading && <Loader />}
          <tbody>
            {categorias.map((cat, index) => (
              <tr key={index}>
                <th scope="row" className="v-a">{index + 1}</th>
                <td className="v-a fw-bolder">{cat.nome}</td>
                <td className={`v-a fw-medium ${cat.tipo === "Receita" ? "text-success" : "text-danger"}`}>
                  {cat.tipo}
                </td>
                <td className="v-a">
                  <button onClick={() => AtualizarCategoria(cat)} className="btn mb-2 mt-2 align-middle">
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      style={{ color: "#204A77", height: "18px" }}
                    />
                  </button>
                </td>
                <td className="v-a">
                  <button onClick={() => Handledelete(cat)} className="btn mb-2 mt-2 align-middle">
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
  )

  function Handledelete(categoria) {
  const confirmDelete = window.confirm('Deseja apagar o dado?')
  if (!confirmDelete) return

  const rota = categoria.tipo === "Receita" ? "categoria_entrada" : "CategoriaSaida"
  const id = categoria.id_Categoria_entrada || categoria.id_Categoria_saida

  axios.delete(`http://localhost:8000/api/${rota}/${id}`)
    .then(() => {
      alert('Dado apagado com sucesso!')
      setCategorias(prev =>
        prev.filter(cat => {
          const catId = cat.id_Categoria_entrada || cat.id_Categoria_saida
          return !(catId === id && cat.tipo === categoria.tipo)
        })
      )
    })
    .catch(err => {
      alert('Erro ao apagar categoria')
      console.error(err)
    })
}

}

export default Categorias
