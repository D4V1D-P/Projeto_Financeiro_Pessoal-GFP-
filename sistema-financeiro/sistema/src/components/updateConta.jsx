import React, { useState, useEffect } from "react"
import axios from "axios"
import Loader from "./spiner"

const UpdateConta = (props) => {
    const conta = props.conta
    const [nome, setNome] = useState("")
    const [btn, setBtn] = useState("Atualizar")
    const [descricao_banco, setDescricao_banco] = useState("")
    const [saldo, setSaldo] = useState("")

  useEffect(() => {
    if (conta) {
    setNome(conta.banco_nome)
    setDescricao_banco(conta.descricao_banco) // Descomente se necessário
    setSaldo(conta.saldo) // Descomente se necessário
    }
  }, [conta])

  const handleSubmit = async (e) => {
  e.preventDefault()
  if (!conta) return
  setBtn(<Loader />)

  try {
    const payload = {
        banco_nome: nome,
        descricao_banco: descricao_banco,
        saldo: conta.saldo,
    }

    const response = await axios.put(
        `http://localhost:8000/api/Conta/${conta.id_conta}`,
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
          <div className="row mb-4">
            <div className="col-md-12 campoLabel">
              <label className="label">Descrição Banco</label>
              <input
                type="text"
                required
                value={descricao_banco}
                onChange={(e) => setDescricao_banco(e.target.value)}
              />
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-md-12 campoLabel">
              <label className="label">Saldo</label>
              <input
                type="text"
                required
                value={saldo}
                onChange={(e) => setSaldo(e.target.value)}
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

export default UpdateConta
