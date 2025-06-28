import React, { useState } from "react"
import { Link } from "react-router-dom/cjs/react-router-dom"
import { useEffect } from "react"
import { faPlusCircle, faMinusCircle, faChartSimple, faListCheck, faCreditCard, faMoneyBill, faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../css/style.css'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { useLocation } from 'react-router-dom'
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Sidebar = () => {
    const location = useLocation()
    useEffect(() => {
        const menuItems = document.querySelectorAll('.areaMenu')

        menuItems.forEach(menuItem => {
            const path = menuItem.getAttribute('data-path')
            if (location.pathname.includes(path)) {
                menuItem.classList.add('active')
            } else {
                menuItem.classList.remove('active')
            }
        })
    }, [location.pathname])

    const history = useHistory()

    const Sair = async () => {
    try {
      await signOut(auth);
      history.replace("/");
      console.log("Logout realizado com sucesso!");
    } catch (error) {
      console.log(error);
    }
  };
  
  const [nome, setNome] = useState('Carregando...')

  useEffect(() => {
    const auth = getAuth()
    const db = getFirestore()

    const usuarioSalvo = localStorage.getItem("usuario")
    if (usuarioSalvo) {
      const dados = JSON.parse(usuarioSalvo)
      setNome(dados.nome_usuario || "Usuário sem nome")
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const docRef = doc(db, "usuarios", user.uid)
          const docSnap = await getDoc(docRef)
          if (docSnap.exists()) {
            const data = docSnap.data()
            setNome(data.nome_usuario || "Usuário sem nome")

            localStorage.setItem("usuario", JSON.stringify({
              uid: user.uid,
              email: user.email,
              nome_usuario: data.nome_usuario,
              id_usuario: user.id_usuario || null
            }))
          } else {
            setNome("Usuário não encontrado")
          }
        } catch (error) {
          console.error("Erro ao buscar dados do Firestore:", error)
          setNome("Erro ao buscar dados")
        }
      } else {
        setNome("Nenhum usuário logado")
        localStorage.removeItem("usuario")
      }
    })

    return () => unsubscribe()
  }, [])

    return (
        <>
            <div id="sidebar" className="d-flex flex-column justify-content-between">
                <div className="menu">
                    <div className="d-md-block2">
                        <div data-path='/Entradas' className="areaMenu pb-2 pt-2 pl-1" >
                            <Link to='/Entradas' className="Link">
                                <button data-path='/Entradas' className="areaMenu">
                                    <FontAwesomeIcon icon={faPlusCircle} color="#003366" style={{ marginRight: '5px', fontSize: '16px' }} />
                                    <span id="text-navbar">Entradas</span>
                                </button>
                            </Link>
                        </div>
                        <div data-path='/Saidas' className="areaMenu pb-2 pt-2 pl-1" >
                            <Link to='/Saidas' className="Link">
                                <button data-path='/Saidas' className="areaMenu">
                                    <FontAwesomeIcon icon={faMinusCircle} color="#003366" style={{ marginRight: '5px', fontSize: '16px' }} />
                                    <span id="text-navbar">Saidas</span>
                                </button>
                            </Link>
                        </div>
                        <div data-path='/Dashboard' className="areaMenu pb-2 pt-2 pl-1" >
                            <Link to='/Dashboard' className="Link">
                                <button data-path='/Dashboard' className="areaMenu">
                                    <FontAwesomeIcon icon={faChartSimple} color="#003366" style={{ marginRight: '5px', fontSize: '16px' }} />
                                    <span id="text-navbar">Dashboard</span>
                                </button>
                            </Link>
                        </div>
                        <div data-path='/Categorias' className="areaMenu pb-2 pt-2 pl-1" >
                            <Link to='/Categorias' className="Link">
                                <button data-path='/Categorias' className="areaMenu">
                                    <FontAwesomeIcon icon={faListCheck} color="#003366" style={{ marginRight: '5px', fontSize: '16px' }} />
                                    <span id="text-navbar">Categorias</span>
                                </button>
                            </Link>
                        </div>
                        <div data-path='/Contas' className="areaMenu pb-2 pt-2 pl-1" >
                            <Link to='/Contas' className="Link">
                                <button data-path='/Contas' className="areaMenu">
                                    <FontAwesomeIcon icon={faCreditCard} color="#003366" style={{ marginRight: '5px', fontSize: '16px' }} />
                                    <span id="text-navbar">Contas</span>
                                </button>
                            </Link>
                        </div>
                        <div data-path='/TPPagamento' className="areaMenu pb-2 pt-2 pl-1" >
                            <Link to='/TPPagamento' className="Link">
                                <button data-path='/TPPagamento' className="areaMenu">
                                    <FontAwesomeIcon icon={faMoneyBill} color="#003366" style={{ marginRight: '5px', fontSize: '16px' }} />
                                    <span id="text-navbar">Tipo de Pagamento</span>
                                </button>
                            </Link>
                        </div>
                        <div data-path='/Relatorio' className="areaMenu pb-2 pt-2 pl-1" >
                            <button data-path='/Relatorio' className="areaMenu">
                                <NavDropdown title="Relatório" id="navbarScrollingDropdown" className="anavbar">
                                    <Link to='/Relatorio' className="Link">
                                        <NavDropdown.Item><Link data-path='/tableentradas' to='/tableentradas'>• Entradas</Link>
                                        </NavDropdown.Item>
                                        <NavDropdown.Item><Link data-path='/tablesaidas' to='/tablesaidas'>• Saídas</Link></NavDropdown.Item>
                                    </Link>
                                </NavDropdown>
                            </button>
                        </div>
                    </div>

                    <div className="d-md-none2">
                        {/* Nav superior para telas pequenas */}
                        <div className="nav-superior">

                            <FontAwesomeIcon icon={faBars} className="icon-menu"/>

                            <NavDropdown id="navbarScrollingDropdown" className="navbar-dropdown">
                                <Link to='/Entradas' className="Link">
                                    <NavDropdown.Item href="/Entradas"><FontAwesomeIcon icon={faPlusCircle} color="#003366" /> Entradas</NavDropdown.Item>
                                </Link>
                                <Link to='/Saidas' className="Link">
                                    <NavDropdown.Item href="/Saidas"><FontAwesomeIcon icon={faMinusCircle} color="#003366" /> Saídas</NavDropdown.Item>
                                </Link>
                                <Link to='/Dashboard' className="Link">
                                    <NavDropdown.Item href="/Dashboard"><FontAwesomeIcon icon={faChartSimple} color="#003366" /> Dashboard</NavDropdown.Item>
                                </Link>
                                <Link to='/Categorias' className="Link">
                                    <NavDropdown.Item href="/Categorias"><FontAwesomeIcon icon={faListCheck} color="#003366" /> Categorias</NavDropdown.Item>
                                </Link>
                                <Link to='/Contas' className="Link">
                                    <NavDropdown.Item href="/Contas"><FontAwesomeIcon icon={faCreditCard} color="#003366" /> Contas</NavDropdown.Item>
                                </Link>

                                <Link to='/TPPagamento' className="Link">
                                    <NavDropdown.Item href="/TPPagamento"><FontAwesomeIcon icon={faMoneyBill} color="#003366" /> Tipo de Pagamento</NavDropdown.Item>
                                </Link>
                                <Link to='/Tableentradas' className="Link">
                                    <NavDropdown.Item href="/Tableentradas"><FontAwesomeIcon icon={faChartSimple} color="#003366" /> Relatório entradas</NavDropdown.Item>
                                </Link>
                                <Link to='/Tablesaidas' className="Link">
                                    <NavDropdown.Item href="/Tablesaidas"><FontAwesomeIcon icon={faChartSimple} color="#003366" /> Relatório saidas</NavDropdown.Item>
                                </Link>
                                <button className="botao mb-3" onClick={Sair}>sair</button>

                            </NavDropdown>

                        </div>
                    </div>
                    <button className="botao mb-3 btnnav" onClick={Sair}>{nome}</button>
                </div>
            </div>
        </>
    )


}

export default Sidebar