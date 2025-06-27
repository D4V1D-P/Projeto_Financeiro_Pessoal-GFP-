import { useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../firebase"
import axios from "axios"

export default function useAuth() {
  const [usuario, setUsuario] = useState(null)
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const token = await user.getIdToken()
          const uid = user.uid

          const response = await axios.get('http://localhost:8000/api/usuarios', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })

          const usuarioFiltrado = response.data.data.find(u => u.uid === uid)

          if (usuarioFiltrado) {
            setUsuario({ ...usuarioFiltrado, token })
          } else {
            setUsuario(null)
          }
        } catch (erro) {
          console.error("Erro ao carregar usuário autenticado:", erro)
          setUsuario(null)
        }
      } else {
        setUsuario(null)
      }

      setCarregando(false)
    })

    return () => unsubscribe()
  }, [])

  return { usuario, carregando }
}
