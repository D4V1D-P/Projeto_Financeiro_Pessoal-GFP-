import { auth } from "../firebase"
import axios from "axios"

export const getUsuarioLogado = async () => {
  const currentUser = auth.currentUser
  if (!currentUser) return null

  const uid = currentUser.uid

  const response = await axios.get("http://localhost:8000/api/usuarios")
  const usuarios = response.data.data || response.data
  const userEncontrado = usuarios.find((u) => u.uid === uid)

  return userEncontrado || null
}
