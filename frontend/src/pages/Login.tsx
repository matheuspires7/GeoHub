import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api/api";

const Login: React.FC = () => {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const entrar = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");

    try {
      const { data } = await api.post("/auth/login", { usuario, senha });
      localStorage.setItem("token", data.token);
      localStorage.setItem("nome", data.nome);
      navigate("/");
    } catch {
      setErro("Invalid username or password");
    }
  };

  return (
    <div className="page flex min-h-screen flex-col justify-center">
      <h1 className="page-title text-5xl">GeoHub</h1>
      <p className="-mt-4 mb-6 text-center text-gray-400">Sign in to continue</p>

      {erro && <p className="alert-error">{erro}</p>}

      <form onSubmit={entrar} className="card mx-auto w-full max-w-md">
        <div className="mb-4">
          <label htmlFor="usuario" className="form-label">
            Username
          </label>
          <input
            type="text"
            id="usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            className="form-input"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="senha" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="form-input"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-full">
          Sign in
        </button>
      </form>
    </div>
  );
};

export default Login;
