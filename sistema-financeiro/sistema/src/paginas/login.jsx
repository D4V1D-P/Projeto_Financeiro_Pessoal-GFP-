import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { useHistory } from "react-router-dom";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import axios from 'axios'

import Loader from '../components/spiner'


function Login({navigation}) {
  const history = useHistory();
  const [isCadastro, setIsCadastro] = useState(false);

  const [email, setEmail] = useState("");
  const [nome_usuario, setNome_Usuario] = useState("");
  const [password, setPassword] = useState("");
  const [telefone, setTelefone] = useState("");
  const [error, setError] = useState("");

  const [btnCadastro, setBtnCadastro] = useState('Cadastrar')
  const [btnLogin, setBtnLogin] = useState('Fazer Login')

const handleLogin = async (e) => {
  e.preventDefault();
  setBtnLogin(Loader);

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const token = await user.getIdToken();

    // (opcional) Buscar dados do MySQL com o uid
    const response = await axios.get(`http://localhost:8000/api/usuarios`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const usuario = response.data.data.find(u => u.uid === user.uid);

    // 💾 Salva no localStorage
    localStorage.setItem("usuario", JSON.stringify({
      uid: user.uid,
      email: user.email,
      nome_usuario: usuario?.nome_usuario || '',
      id_usuario: usuario?.id_usuario || null
    }));

    history.replace("/Dashboard");

  } catch (err) {
    console.error("Erro no login:", err);
    setError("Erro ao fazer o login: " + err.message);
    alert("Erro ao fazer o login: " + err.message);
  } finally {
    setBtnLogin('Fazer Login');
  }
};



const handleCadastro = async (e) => {
  e.preventDefault();
  setBtnCadastro(Loader);

  if (!nome_usuario || !email || !password || !telefone) {
    setError("Todos os campos são obrigatórios.");
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Salvar no Firestore
    await setDoc(doc(db, "usuarios", user.uid), {
      nome_usuario,
      telefone,
    });

    // Pegar token do Firebase
    const token = await user.getIdToken();

    // Enviar para backend Laravel
    const response = await axios.post('http://localhost:8000/api/registrar', {
      nome_usuario,
      telefone,
      email
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    // 💾 Agora sim! Salva os dados no localStorage
    localStorage.setItem("usuario", JSON.stringify({
      uid: user.uid,
      email: email,
      nome_usuario: nome_usuario,
      id_usuario: response.data.data?.id_usuario || null // se o backend retornar isso
    }));

    alert("Usuário cadastrado com sucesso!");
    history.replace("/Dashboard");

  } catch (err) {
    console.error("Erro no cadastro:", err);
    setError("Erro ao cadastrar: " + err.message);
    alert("Erro ao cadastrar: " + err.message);
  } finally {
    setBtnCadastro('Cadastrar');
  }
};

  const toggleFormulario = () => {
    setIsCadastro((prev) => !prev);
  };

  return (
    <div className="bg-login">
      {isCadastro ? (
        <form onSubmit={handleCadastro}>
          <div className="card-login gap-3">
            <p className="text-login">Faça seu cadastro</p>
            <div className="campoLabel w-100">
              <label htmlFor="nome" className="label">
                Nome
              </label>
              <input
                required
                type="text"
                id="nome"
                name="nome_usuario"
                className="input"
                placeholder="Insira seu nome"
                onChange={(e)=>setNome_Usuario(e.target.value)}
                value={nome_usuario}
              />
            </div>
            <div className="campoLabel w-100">
              <label htmlFor="email" className="label">
                E-mail
              </label>
              <input
                required
                type="email"
                id="email"
                name="email"
                className="input"
                placeholder="Insira seu email"
                onChange={(e)=>setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div className="campoLabel w-100">
              <label htmlFor="telefone" className="label">
                Telefone
              </label>
              <input
                required
                type="number"
                id="telefone"
                name="telefone"
                className="input"
                placeholder="Insira seu telefone"
                onChange={(e)=>setTelefone(e.target.value)}
                value={telefone}
              />
            </div>
            <div className="campoLabel w-100">
              <label htmlFor="senha" className="label">
                Senha
              </label>
              <input
                required
                type="password"
                id="password"
                name="password"
                className="input"
                placeholder="Crie sua senha"
                onChange={(e)=>setPassword(e.target.value)}
                value={password}
              />
            </div>
            <button className="botao btn-gfp" type="submit">
              {btnCadastro}
            </button>
            {error ? <p className="text-danger">{error}</p> : null}
          </div>
        </form>
      ) : (
        <form onSubmit={handleLogin}>
          <div className="card-login gap-3">
            <p className="text-login">Faça seu login</p>
            <div className="campoLabel w-100">
              <label htmlFor="email" className="label">
                E-mail
              </label>
              <input
                required
                type="email"
                id="email"
                name="email"
                className="input"
                placeholder="Insira seu email"
                onChange={(e)=>setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div className="campoLabel w-100">
              <label htmlFor="password" className="label">
                Senha
              </label>
              <input
                required
                type="password"
                id="password"
                name="password"
                className="input"
                placeholder="Insira sua senha"
                onChange={(e)=>setPassword(e.target.value)}
                value={password}
              />
            </div>
            <a href="#ooo" className="align-self-end text-esqueciminhasenha">
              esqueci minha senha
            </a>
            <button className="botao btn-gfp" type="submit">
              {btnLogin}
            </button>
              {error ? <p className="text-danger">{error}</p> : null}
          </div>
        </form>
      )}

      <button onClick={toggleFormulario} className="mt-2 btn text-light">
        {isCadastro
          ? "Já tem login? (Fazer login)"
          : "Não tem login? (Cadastrar)"}
      </button>
    </div>
  );
}

export default Login;
