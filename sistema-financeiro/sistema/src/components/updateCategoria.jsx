import React, { useState, useEffect } from "react"
import axios from "axios"
import Loader from "./spiner"

const UpdateCategoria = (props) => {
  const categoria = props.categoria
  const [nome, setNome] = useState("")
  const [btn, setBtn] = useState("Atualizar")
  const [tipoCat, setTipoCat] = useState("")

  useEffect(() => {
    if (categoria) {
      setNome(categoria.nome)
      setTipoCat(categoria.tipo)
    }
  }, [categoria])

  const handleSubmit = async (e) => {
  e.preventDefault()
  if (!categoria) return
  setBtn(<Loader />)

  try {
    const payload = {
      nome,
      id_usuario: categoria.id_usuario
    }

    let response

    if (tipoCat === "Receita") {
      response = await axios.put(
        `http://localhost:8000/api/categoria_entrada/${categoria.id_Categoria_entrada}`,
        payload
      )
    } else {
      response = await axios.put(
        `http://localhost:8000/api/CategoriaSaida/${categoria.id_Categoria_saida}`,
        payload
      )
    }

    alert(response.data.mensagem)
    props.onClose()
  } catch (error) {
    alert("Erro ao atualizar categoria")
    console.error(error)
  } finally {
    setBtn("Atualizar")
  }
}


  return (
    <div className="corpoUpdate">
      <form onSubmit={handleSubmit}>
        <div className="areaUpdate p-5">
          <div className="mb-4">
            <h2>Atualizar Categoria</h2>
          </div>
          <div className="row mb-4">
            <div className="col-md-12 campoLabel">
              <label className="label">Nome</label>
              <input
                type="text"
                required
                value={nome}
                onChange={(e) => setNome(e.target.value)}
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
  )
}

export default UpdateCategoria
