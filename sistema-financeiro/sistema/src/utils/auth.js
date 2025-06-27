export function getUsuarioLogado() {
  const usuario = localStorage.getItem("usuario")
  return usuario ? JSON.parse(usuario) : null
}
