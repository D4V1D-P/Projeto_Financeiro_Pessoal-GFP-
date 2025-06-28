import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { auth } from '../firebase'
import axios from 'axios'

const AddCategoria = (props) => {
  const history = useHistory()
  const [nome, setNome] = useState('')
  const [usuario, setUsuario] = useState(null)
  const [categoria, setCategoria] = useState('')

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const currentUser = auth.currentUser
        if (!currentUser) {
          alert("Usuário não autenticado")
          return
        }

        const uid = currentUser.uid

        // Busca todos os usuários do Laravel
        const response = await axios.get('http://localhost:8000/api/usuarios')
        const usuarios = response.data.data || response.data

        // Procura o usuário pelo UID
        const userEncontrado = usuarios.find((u) => u.uid === uid)

        if (userEncontrado) {
          setUsuario(userEncontrado)
        } else {
          alert("Usuário não encontrado na API")
        }

      } catch (err) {
        console.error("Erro ao buscar usuários:", err)
        alert("Erro ao buscar dados do usuário")
      }
    }

    fetchUsuario()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!usuario) {
      alert("Usuário não carregado!")
      return
    }

    const novaCategoria = {
      id_usuario: usuario.id_usuario, // agora temos o id
      nome,
      uid: usuario.uid,
      status: 'ativo'
    }

    categoria === "Receita" ? 
    axios.post('http://localhost:8000/api/categoria_entrada', novaCategoria)
      .then(() => {
        alert('Categoria cadastrada com sucesso!')
        history.push('/Categorias')
      })
      .catch((err) => {
        alert('Erro ao cadastrar categoria: ' + err)
      }) : axios.post('http://localhost:8000/api/CategoriaSaida', novaCategoria)
      .then(() => {
        alert('Categoria cadastrada com sucesso!')
        history.push('/Categorias')
      })
      .catch((err) => {
        alert('Erro ao cadastrar categoria: ' + err)
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
            <div className="col-md-12 campoLabel">
              <label htmlFor="nome" className="label">Categoria</label>
              <input
                type="text"
                name="nome"
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-md-12 campoLabel">
              <label htmlFor="nome" className="label">Tipo</label>
              <select name="" id="" value={categoria} onChange={(e) => setCategoria(e.target.value)} required>
                <option value=""></option>
                <option value="Despesa">Despesa</option>
                <option value="Receita">Receita</option>
              </select>
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
