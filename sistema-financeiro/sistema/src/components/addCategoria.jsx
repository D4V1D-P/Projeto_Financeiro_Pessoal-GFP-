import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { getUsuarioLogado } from '../utils/auth'
import useAuth from "../hooks/useAuth"

const AddCategoria = (props) => {
  const history = useHistory()
  const [nome, setNome] = useState('')

  const usuario = getUsuarioLogado()

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!usuario) {
      alert("Usuário não logado!")
      return
    }

    const novaCategoria = {
      id_usuario: usuario.id_usuario,
      nome,
      uid: usuario.uid,
      status: 'ativo'
    }
    console.log(novaCategoria)
    console.log(usuario.id_usuario)
    console.log(usuario.uid)
    console.log(nome)

    axios.post('http://localhost:8000/api/categoria_entrada', novaCategoria)
      .then(() => {
        alert('Categoria cadastrada com sucesso!')
        history.push('/Categorias')
      })
      .catch((err) => {
        alert('Erro ao cadastrar categoria'+err)
      })
  }

  return (
    <div className="corpoUpdate">
      <form onSubmit={handleSubmit}>
        <div className="areaUpdate p-5">
          <div className="mb-4">
            <h2>Adicionar categoria</h2>
          </div>
          <div className="row mb-4">
            <div className="col-12 campoLabel">
              <label htmlFor="nome" className="label">Categoria</label>
              <input
                type="text"
                name="nome"
                className="input"
                onChange={(e) => setNome(e.target.value)}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <button className="botao" type="submit">Adicionar</button>
            </div>
            <div className="col-sm-12">
                <button onClick={props.onClose} className="btn btn-light w-100 mt-2" style={{ borderRadius: '10px' }}>Voltar</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default AddCategoria
