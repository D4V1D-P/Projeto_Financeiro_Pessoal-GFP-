import React from 'react'
import { useState, useEffect } from "react"
import axios from "axios"
import Loader from "./spiner"

const UpdatePagamento = (props) => {
   const tipoPag = props.tipoPag
  const [nome, setNome] = useState("")
  const [btn, setBtn] = useState("Atualizar")

  useEffect(() => {
    if (tipoPag) {
    setNome(tipoPag.nome)
    }
  }, [tipoPag])

  const handleSubmit = async (e) => {
  e.preventDefault()
  if (!tipoPag) return
  setBtn(<Loader />)

  try {
    const payload = {
        nome,
    }

    const response = await axios.put(
        `http://localhost:8000/api/tipo_pagamento/${tipoPag.id_Tipo_pagamento}`,
        payload
    )
    
    alert(response.data.mensagem)
    props.onClose()
  } catch (error) {
    alert("Erro ao atualizar conta")
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
            <h2>Atualizar Conta</h2>
          </div>
          <div className="row mb-4">
            <div className="col-md-12 campoLabel">
              <label className="label">Nome Banco</label>
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

export default UpdatePagamento